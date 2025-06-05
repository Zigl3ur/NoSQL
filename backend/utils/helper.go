package utils

import (
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/bson"
)

// transform json to bson
func jsonBson(jsonData []byte) (bson.D, error) {
	var result bson.D

	if err := bson.UnmarshalExtJSON(jsonData, true, &result); err != nil {
		return nil, err
	}
	return result, nil
}

// convert the body from gin context to bson
func BodyToBson(c *gin.Context) bson.D {

	bodyBytes, err := io.ReadAll(c.Request.Body)
	defer c.Request.Body.Close()

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to ready body",
		})
		return nil
	}

	bson, err := jsonBson(bodyBytes)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Invalid JSON format",
		})
		return nil
	}

	return bson
}

// transform bson.A to a bson.D struct
func ArrayToBson(array bson.A) []bson.D {
	var result []bson.D

	for _, elt := range array {
		if obj, ok := elt.(bson.D); ok {
			result = append(result, obj)
		}
	}

	return result
}
