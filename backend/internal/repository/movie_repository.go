package repository

import (
	"context"
	"errors"
	"nosql/backend/internal/models"
	"os"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type MovieRepository struct {
	collection *mongo.Collection
}

type EditScope string

const (
	One  EditScope = "one"
	Many EditScope = "many"
)

var (
	errorCollection      = errors.New("collection is not defined")
	errorNoMatch         = errors.New("no documents matched the query")
	errorNoUpdate        = errors.New("no documents were updated")
	errorInvalidEditType = errors.New("invalid update type")
)

// get the movie collection
func NewMovieRepo(client *mongo.Client, dbName string) *MovieRepository {
	return &MovieRepository{collection: client.Database(dbName).Collection("movies")}
}

// delete the movie collection
func (mrepo *MovieRepository) DeleteCollection() error {
	if mrepo.collection == nil {
		return errorCollection
	}

	err := mrepo.collection.Drop(context.TODO())
	if err != nil {
		return err
	}

	return nil
}

// initialize the movie collection with data
func (mrepo *MovieRepository) InitCollection() error {

	json, err := os.ReadFile("../movies.json")
	if err != nil {
		return err
	}

	var movies []models.Movie
	if err = bson.UnmarshalExtJSON(json, true, &movies); err != nil {
		return err
	}

	if len(movies) > 0 {
		_, err = mrepo.collection.InsertMany(context.TODO(), movies)
		if err != nil {
			return err
		}
	}

	return nil
}

// get one document from movie collection with given filter
func (mrepo *MovieRepository) GetOne(filter, projection, sort bson.D, skip int64) (*models.Movie, error) {

	if mrepo.collection == nil {
		return nil, errorCollection
	}

	opts := options.FindOne().SetProjection(projection).SetSort(sort).SetSkip(skip)
	var result models.Movie
	err := mrepo.collection.FindOne(context.TODO(), filter, opts).Decode(&result)

	if err != nil {
		return nil, err
	}

	return &result, nil
}

// get multiple documents from movie collection with given filter
func (mrepo *MovieRepository) GetMany(filter, projection, sort bson.D, skip, limit int64) (*[]models.Movie, error) {

	if mrepo.collection == nil {
		return nil, errorCollection
	}

	opts := options.Find().SetProjection(projection).SetSort(sort).SetSkip(int64(skip)).SetLimit(limit)
	cursor, err := mrepo.collection.Find(context.TODO(), filter, opts)
	if err != nil {
		return nil, err
	}

	var result []models.Movie
	if err = cursor.All(context.TODO(), &result); err != nil {
		return nil, err
	}

	if result == nil {
		return nil, mongo.ErrNoDocuments
	}

	return &result, nil
}

// update one or more documents from movie collection with given filter and updated data
func (mrepo *MovieRepository) Update(updateType EditScope, filter, update bson.D) error {

	if mrepo.collection == nil {
		return errorCollection
	}

	var result *mongo.UpdateResult
	var err error

	switch updateType {
	case One:
		result, err = mrepo.collection.UpdateOne(context.TODO(), filter, update)
	case Many:
		result, err = mrepo.collection.UpdateMany(context.TODO(), filter, update)
	default:
		return errorInvalidEditType
	}

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return errorNoMatch
	}

	if result.ModifiedCount == 0 {
		return errorNoUpdate
	}

	return nil
}

// update one or more documents from movie collection with given filter and updated data
func (mrepo *MovieRepository) Delete(deleteType EditScope, filter bson.D) error {

	if mrepo.collection == nil {
		return errorCollection
	}

	var result *mongo.DeleteResult
	var err error

	switch deleteType {
	case One:
		result, err = mrepo.collection.DeleteOne(context.TODO(), filter)
	case Many:
		result, err = mrepo.collection.DeleteMany(context.TODO(), filter)
	default:
		return errorInvalidEditType
	}

	if err != nil {
		return err
	}

	if result.DeletedCount == 0 {
		return errorNoMatch
	}

	return nil
}

// aggregate data of documents from movie collection with given pipeline
func (mrepo *MovieRepository) Aggregate(pipeline []bson.D) (*[]bson.M, error) {

	cursor, err := mrepo.collection.Aggregate(context.TODO(), pipeline)
	if err != nil {
		return nil, err
	}

	var results []bson.M
	if err = cursor.All(context.TODO(), &results); err != nil {
		return nil, err
	}

	return &results, nil
}
