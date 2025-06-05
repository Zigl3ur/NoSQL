package repository

import (
	"context"
	"errors"
	"nosql/backend/internal/models"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
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

// get one document from movie collection with given filter
func (mrepo *MovieRepository) GetOne(filter bson.D) (*models.Movie, error) {

	if mrepo.collection == nil {
		return nil, errorCollection
	}

	var result models.Movie
	err := mrepo.collection.FindOne(context.TODO(), filter).Decode(&result)

	if err != nil {
		return nil, err
	}

	return &result, nil
}

// get multiple documents from movie collection with given filter
func (mrepo *MovieRepository) GetMany(filter bson.D) (*[]models.Movie, error) {

	if mrepo.collection == nil {
		return nil, errorCollection
	}

	cursor, err := mrepo.collection.Find(context.TODO(), filter)
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
