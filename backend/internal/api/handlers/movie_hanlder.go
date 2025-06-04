package handlers

import (
	"errors"
	"nosql/backend/internal/repository"
)

type MovieHandler struct {
	movireRepository *repository.MovieRepository
}

var errorCollection = errors.New("movie handler is not defined, call func NewMovieHandler before using handler")

// get the movie handler
func NewMovieHandler(movireRepository *repository.MovieRepository) *MovieHandler {
	return &MovieHandler{movireRepository: movireRepository}
}
