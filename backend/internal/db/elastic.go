package db

import (
	"bytes"
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/elastic/go-elasticsearch/v9"
)

// connect to mongodb with provided conn string,
// return the client
func ElasticInit(elasticUrl string) (*elasticsearch.Client, error) {

	cfg := elasticsearch.Config{
		Addresses: []string{
			elasticUrl,
		},
	}

	return elasticsearch.NewClient(cfg)
}

func ElasticInitData(esclient *elasticsearch.Client, init bool) error {

	if init {
		// wait for elasticsearch to be started
		for {
			res, err := esclient.Info()
			if err == nil && res.StatusCode == 200 {
				res.Body.Close()
				fmt.Println("elasticsearch started")
				break
			}
			fmt.Println("waiting for elasticsearch to be started")
			time.Sleep(5 * time.Second)
		}
	}

	// delete old index
	res, err := esclient.Indices.Delete(
		[]string{"movies"},
		esclient.Indices.Delete.WithIgnoreUnavailable(true),
	)

	if err != nil || res.IsError() {
		return errors.New("Failed to delete index")
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
	res, err = esclient.Indices.Create(
		"movies",
		esclient.Indices.Create.WithBody(bytes.NewReader([]byte(mapping))),
	)

	if err != nil || res.IsError() {
		return errors.New("Failed to create index")
	}
	defer res.Body.Close()

	bulkJson, err := os.ReadFile("./bulk-movies.json")

	if err != nil {
		return errors.New("Failed to read bulk JSON file")
	}

	// insert the bulk data
	res, err = esclient.Bulk(
		bytes.NewReader(bulkJson),
	)

	if err != nil || res.IsError() {
		return errors.New("Failed to insert bulk data")
	}
	defer res.Body.Close()

	return nil
}
