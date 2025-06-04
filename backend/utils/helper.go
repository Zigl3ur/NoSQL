package utils

import "go.mongodb.org/mongo-driver/v2/bson"

func JsonBson(jsonData []byte) bson.D {
	var bson bson.D

	if err := bson.UnmarshalJSON(jsonData); err != nil {
		return nil
	}
	return bson
}
