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

	bodyData := utils.BodyToBson(c)
	if bodyData == nil {
		return
	}

	result, err := m.movieRepository.GetOne(bodyData)
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

	bodyData := utils.BodyToBson(c)
	if bodyData == nil {
		return
	}

	result, err := m.movieRepository.GetMany(bodyData)
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
func (m *MovieHandler) HandlerUpdate(c *gin.Context, EditType repository.EditScope) {

	bodyData := utils.BodyToBson(c)
	if bodyData == nil {
		return
	}

	// check for filter and update fields
	if bodyData[0].Key != "filter" || bodyData[1].Key != "update" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "missing filter and / or update fields",
		})
		return
	}

	// ensure filter and update have bson.D type
	filter, filterOk := bodyData[0].Value.(bson.D)
	update, updateOk := bodyData[1].Value.(bson.D)
	if !filterOk || !updateOk {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to parse filter / update fields",
		})
		return
	}

	var err error
	switch EditType {
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
