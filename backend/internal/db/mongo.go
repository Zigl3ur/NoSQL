package db

import (
	"context"
	"errors"
	"time"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"go.mongodb.org/mongo-driver/v2/mongo/readpref"
)

type MongoCtx struct {
	Client *mongo.Client
}

// connect to mongodb with provided conn string,
// return the client
func (mctx *MongoCtx) Connect(mongoUrl string) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	client, err := mongo.Connect(options.Client().ApplyURI(mongoUrl))

	if err != nil {
		return err
	}

	if err = client.Ping(ctx, readpref.Primary()); err != nil {
		client.Disconnect(ctx)
		return err
	}

	mctx.Client = client
	return nil
}

// close the given mongodb client
func (mctx *MongoCtx) Close() error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if mctx.Client == nil {
		return errors.New("mongodb client is not initialized")
	}

	return mctx.Client.Disconnect(ctx)
}
