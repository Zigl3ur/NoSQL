package handlers

import (
	"errors"
	"net/http"
	"nosql/backend/internal/repository"
	"nosql/backend/utils"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/bson"
)

type MovieHandler struct {
	movieRepository *repository.MovieRepository
}

var errorMovieHandler = errors.New("movie handler is not defined")

// get the movie handler
func NewMovieHandler(movireRepository *repository.MovieRepository) *MovieHandler {
	return &MovieHandler{movieRepository: movireRepository}
}

func (m *MovieHandler) HandlerInit(c *gin.Context) {

	err := m.movieRepository.DeleteCollection()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = m.movieRepository.InitCollection()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"success": "successfully initialized movie collection",
	})
	return
}

// handler to call the db method findOne with given param in body
func (m *MovieHandler) HandlerGetOne(c *gin.Context) {

	filter := bson.D{}
	projection := bson.D{}
	sort := bson.D{}
	var skip int64

	bodyData := utils.BodyToBson(c)
	if bodyData == nil {
		return
	}

	// ensure field find-one
	if len(bodyData) < 1 || bodyData[0].Key != "find-one" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to parse find-one field",
		})
		return
	}

	// get keys for each field to give to repository find many
	for i, field := range bodyData {
		switch field.Key {
		case "find-one":
			array, ok := bodyData[0].Value.(bson.A)
			if !ok && bodyData[0].Key != "find-many" {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "failed to parse find-one field",
				})
				return
			}

			// pipeline is filter + projection (if present)
			pipeline := utils.ArrayToBson(array)

			// if pipeline has projection assign it
			if len(pipeline) > 0 {
				// pipeline is filter + projection (if present)
				filter = pipeline[0]

				if len(pipeline) > 1 {
					projection = pipeline[1]
				}
			}

		case "sort":
			if value, ok := bodyData[i].Value.(bson.D); ok {
				sort = value
			}
		case "skip":
			skipInt, ok := bodyData[i].Value.(int32)
			if ok {
				skip = int64(skipInt)
			}
		}
	}

	result, err := m.movieRepository.GetOne(filter, projection, sort, skip)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, result)
	return
}

// handler to call the db method findMany with given param in body
func (m *MovieHandler) HandlerGetMany(c *gin.Context) {

	filter := bson.D{}
	projection := bson.D{}
	sort := bson.D{}
	var skip int64
	var limit int64

	// get body as bson type
	bodyData := utils.BodyToBson(c)
	if bodyData == nil {
		return
	}

	// ensure field find-one
	if len(bodyData) < 1 || bodyData[0].Key != "find-many" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to parse find-many field",
		})
		return
	}

	// get keys for each field to give to repository find many
	for i, field := range bodyData {
		switch field.Key {
		case "find-many":
			array, ok := bodyData[0].Value.(bson.A)
			if !ok && bodyData[0].Key != "find-many" {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "failed to parse find-many field",
				})
				return
			}

			// pipeline is filter + projection (if present)
			pipeline := utils.ArrayToBson(array)

			// if pipeline has projection assign it
			if len(pipeline) > 0 {
				// pipeline is filter + projection (if present)
				filter = pipeline[0]

				if len(pipeline) > 1 {
					projection = pipeline[1]
				}
			}

		case "sort":
			if value, ok := bodyData[i].Value.(bson.D); ok {
				sort = value
			}
		case "skip":
			skipInt, ok := bodyData[i].Value.(int32)
			if ok {
				skip = int64(skipInt)
			}
		case "limit":
			limitInt, ok := bodyData[i].Value.(int32)
			if ok {
				limit = int64(limitInt)
			}
		}
	}

	result, err := m.movieRepository.GetMany(filter, projection, sort, skip, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, result)
	return
}

// handler to call the db method updateOne with given param in body
func (m *MovieHandler) HandlerUpdate(c *gin.Context, editType repository.EditScope) {

	bodyData := utils.BodyToBson(c)
	if bodyData == nil {
		return
	}

	// check for filter update fields
	if len(bodyData) < 1 || bodyData[0].Key != "update" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "missing update field",
		})
		return
	}

	array, ok := bodyData[0].Value.(bson.A)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to parse update field",
		})
		return
	}

	pipeline := utils.ArrayToBson(array)

	// ensure filter and update fields
	if len(pipeline) != 2 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to parse update field",
		})
		return
	}

	filter := pipeline[0]
	update := pipeline[1]

	var err error
	switch editType {
	case repository.One:
		err = m.movieRepository.Update(repository.One, filter, update)
	case repository.Many:
		err = m.movieRepository.Update(repository.Many, filter, update)
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": "successfully updated document(s)",
	})
	return
}

// handler to call the db method deleteOne or Many with given param in body
func (m *MovieHandler) HandlerDelete(c *gin.Context, deleteType repository.EditScope) {

	bodyData := utils.BodyToBson(c)
	if bodyData == nil {
		return
	}

	// check for delete field
	if len(bodyData) < 1 || bodyData[0].Key != "delete" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "missing delete field",
		})
		return
	}

	array, ok := bodyData[0].Value.(bson.A)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to parse delete field",
		})
		return
	}

	pipeline := utils.ArrayToBson(array)

	// ensure filter field
	if len(pipeline) != 1 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to parse delete field",
		})
		return
	}

	filter := pipeline[0]

	var err error
	switch deleteType {
	case repository.One:
		err = m.movieRepository.Delete(repository.One, filter)
	case repository.Many:
		err = m.movieRepository.Delete(repository.Many, filter)
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": "successfully deleted document(s)",
	})
	return
}

// handler to call the db method aggregate with given param in body
func (m *MovieHandler) HandlerAggregate(c *gin.Context) {
	bodyData := utils.BodyToBson(c)
	if bodyData == nil {
		return
	}

	if bodyData[0].Key != "aggregation" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "missing aggregation field",
		})
		return
	}

	array, ok := bodyData[0].Value.(bson.A)
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to parse aggregation field",
		})
		return
	}

	if len(array) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "aggregation pipeline cannot be empty",
		})
		return
	}

	pipeline := utils.ArrayToBson(array)

	result, err := m.movieRepository.Aggregate(pipeline)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, result)
	return
}
