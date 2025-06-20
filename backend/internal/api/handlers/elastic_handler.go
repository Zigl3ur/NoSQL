package handlers

import (
	"encoding/json"
	"net/http"
	"nosql/backend/internal/db"

	"github.com/elastic/go-elasticsearch/v9"
	"github.com/gin-gonic/gin"
)

type ElasticHandler struct {
	esClient *elasticsearch.Client
}

// get the elastic handler
func NewElasticHandler(esClient *elasticsearch.Client) *ElasticHandler {
	return &ElasticHandler{
		esClient: esClient,
	}
}

// handler that recreate the index with the data
func (h *ElasticHandler) HandlerInit(c *gin.Context) {

	// false so we dont wait for elasticsearch to be started
	err := db.ElasticInitData(h.esClient, false)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Index created successfully",
	})
}

// // handler that return the count of documents in the "movies" index
// func (h *ElasticHandler) HandlerCount(c *gin.Context) {

// 	res, err := h.esClient.Count(
// 		h.esClient.Count.WithIndex("movies"),
// 	)
// 	if err != nil {
// 		c.JSON(500, gin.H{"error": err.Error()})
// 		return
// 	}
// 	defer res.Body.Close()

// 	var result map[string]any
// 	if err := json.NewDecoder(res.Body).Decode(&result); err != nil {
// 		c.JSON(500, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{
// 		"count": result["count"],
// 	})
// 	return
// }

// handler that search in the "movies" index
func (h *ElasticHandler) HandlerSearch(c *gin.Context) {

	res, err := h.esClient.Search(
		h.esClient.Search.WithIndex("movies"),
		h.esClient.Search.WithBody(c.Request.Body),
		h.esClient.Search.WithPretty(),
	)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	defer res.Body.Close()

	if res.IsError() {
		var errRes map[string]any
		if err := json.NewDecoder(res.Body).Decode(&errRes); err != nil {
			c.JSON(500, gin.H{"error": "Invalid JSON response from Elasticsearch"})
			return
		}
		c.JSON(res.StatusCode, gin.H{"error": errRes["error"]})
		return
	}

	var result map[string]any
	if err := json.NewDecoder(res.Body).Decode(&result); err != nil {
		c.JSON(500, gin.H{"error": "Invalid JSON response from Elasticsearch"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"hits":         result["hits"].(map[string]any)["hits"],
		"total":        result["hits"].(map[string]any)["total"],
		"aggregations": result["aggregations"],
	})
}
