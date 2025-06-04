package models

import (
	"go.mongodb.org/mongo-driver/v2/bson"
)

type Movie struct {
	ID          bson.ObjectID `bson:"_id"`
	Title       string        `bson:"title"`
	Language    string        `bson:"language"`
	ReleaseDate string        `bson:"release_date"`
	Genres      []string      `bson:"genres"`
	Description string        `bson:"description"`
	Actors      []string      `bson:"actors"`
	Directors   []string      `bson:"directors"`
	Popularity  float64       `bson:"popularity"`
	Rating      float64       `bson:"rating"`
	VoteCount   int64         `bson:"vote_count"`
}
