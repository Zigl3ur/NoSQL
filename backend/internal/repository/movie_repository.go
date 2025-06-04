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

var errorCollection = errors.New("collection is not defined, call func NewMovieRepo before doing queries on movie collection")

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
	if err := mrepo.collection.FindOne(context.TODO(), filter).Decode(&result); err != nil {
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

	return &result, nil
}
