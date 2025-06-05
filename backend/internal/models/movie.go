package models

import (
	"go.mongodb.org/mongo-driver/v2/bson"
)

type Movie struct {
	ID          bson.ObjectID `bson:"_id" json:"id"`
	Title       string        `bson:"title" json:"title"`
	Language    string        `bson:"language" json:"language"`
	ReleaseDate string        `bson:"release_date" json:"release_date"`
	Genres      []string      `bson:"genres" json:"genres"`
	Description string        `bson:"description" json:"description"`
	Actors      []string      `bson:"actors" json:"actors"`
	Directors   []string      `bson:"directors" json:"directors"`
	Popularity  float64       `bson:"popularity" json:"popularity"`
	Rating      float64       `bson:"rating" json:"rating"`
	VoteCount   int64         `bson:"vote_count" json:"vote_count"`
}
