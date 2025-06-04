package db

import (
	"context"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"go.mongodb.org/mongo-driver/v2/mongo/readpref"
)

// connect to mongodb with provided conn string,
// return the client
func Connect(mongoUrl string) (*mongo.Client, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	client, err := mongo.Connect(options.Client().ApplyURI(mongoUrl))

	if err != nil {
		return nil, err
	}

	if err = client.Ping(ctx, readpref.Primary()); err != nil {
		client.Disconnect(ctx)
		return nil, err
	}

	return client, nil
}

// close the given mongodb client
func Close(client *mongo.Client) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if client == nil {
		return errors.New("mongodb client is not initialized")
	}

	return client.Disconnect(ctx)
}
