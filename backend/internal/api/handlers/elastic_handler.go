package handlers

import (
	"bytes"
	"encoding/json"
	"net/http"
	"os"

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

	// delete old index
	res, err := h.esClient.Indices.Delete(
		[]string{"movies"},
		h.esClient.Indices.Delete.WithIgnoreUnavailable(true),
	)

	if err != nil || res.IsError() {
		c.JSON(500, gin.H{"error": "Failed to delete index"})
		return
	}
	defer res.Body.Close()

	// index mapping
	mapping := `{
		"mappings": {
			"properties": {
				"title": { "type": "text" },
				"language": { "type": "text" },
				"release_date": { "type": "date" },
				"genres": { "type": "keyword" },
				"description": { "type": "text" },
				"actors": { "type": "keyword" },
				"directors": { "type": "keyword" },
				"popularity": { "type": "float" },
				"rating": { "type": "float" },
				"vote_count": { "type": "integer" }
			}
		}
	}`

	// create index with the mapping
	res, err = h.esClient.Indices.Create(
		"movies",
		h.esClient.Indices.Create.WithBody(bytes.NewReader([]byte(mapping))),
	)

	if err != nil || res.IsError() {
		c.JSON(500, gin.H{"error": "Failed to create index"})
		return
	}
	defer res.Body.Close()

	bulkJson, err := os.ReadFile("./bulk-movies.json")

	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to read bulk JSON file"})
	}

	// insert the bulk data
	res, err = h.esClient.Bulk(
		bytes.NewReader(bulkJson),
	)

	if err != nil || res.IsError() {
		c.JSON(500, gin.H{"error": "Failed to insert bulk data"})
		return
	}
	defer res.Body.Close()

	c.JSON(http.StatusOK, gin.H{
		"message": "Index created successfully",
	})
	return
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
	return
}
