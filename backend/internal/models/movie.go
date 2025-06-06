package models

import (
	"go.mongodb.org/mongo-driver/v2/bson"
)

type Movie struct {
	ID          bson.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Title       string        `bson:"title,omitempty" json:"title,omitempty"`
	Language    string        `bson:"language,omitempty" json:"language,omitempty"`
	ReleaseDate string        `bson:"release_date,omitempty" json:"release_date,omitempty"`
	Genres      []string      `bson:"genres,omitempty" json:"genres,omitempty"`
	Description string        `bson:"description,omitempty" json:"description,omitempty"`
	Actors      []string      `bson:"actors,omitempty" json:"actors,omitempty"`
	Directors   []string      `bson:"directors,omitempty" json:"directors,omitempty"`
	Popularity  float64       `bson:"popularity,omitempty" json:"popularity,omitempty"`
	Rating      float64       `bson:"rating,omitempty" json:"rating,omitempty"`
	VoteCount   int64         `bson:"vote_count,omitempty" json:"vote_count,omitempty"`
}
