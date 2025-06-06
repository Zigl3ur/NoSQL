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

// handler to call the db method findOne with given param in body
func (m *MovieHandler) HandlerGetOne(c *gin.Context) {

	filter := bson.D{}
	projection := bson.D{}

	bodyData := utils.BodyToBson(c)
	if bodyData == nil {
		return
	}

	// ensure field find-one
	array, ok := bodyData[0].Value.(bson.A)
	if !ok && bodyData[0].Key != "find-one" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to parse find-one field",
		})
		return
	}

	// pipeline is filter + projection (if present)
	pipeline := utils.ArrayToBson(array)
	filter = pipeline[0]

	// if pipeline as projection assign it
	if len(pipeline) > 1 {
		projection = pipeline[1]
	}

	result, err := m.movieRepository.GetOne(filter, projection)
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

	// init var
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
			filter = pipeline[0]

			// if pipeline as projection assign it
			if len(pipeline) > 1 {
				projection = pipeline[1]
			}

		case "sort":
			if value, ok := bodyData[i].Value.(bson.D); ok {
				sort = value
			}
		case "skip":
			skip = utils.FieldAtoi(c, bodyData[i].Value, "skip")
		case "limit":
			limit = utils.FieldAtoi(c, bodyData[i].Value, "limit")
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
	if bodyData[0].Key != "update" {
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

func (m *MovieHandler) HandlerDelete(c *gin.Context, deleteType repository.EditScope) {

	bodyData := utils.BodyToBson(c)
	if bodyData == nil {
		return
	}

	var err error
	switch deleteType {
	case repository.One:
		err = m.movieRepository.Delete(repository.One, bodyData)
	case repository.Many:
		err = m.movieRepository.Delete(repository.Many, bodyData)
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

func (m *MovieHandler) HandlerAggregate(c *gin.Context) {
	bodyData := utils.BodyToBson(c)
	if bodyData == nil {
		return
	}

	if bodyData[0].Key != "aggregation" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "missing aggregate field",
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
