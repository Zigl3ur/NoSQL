package db

import (
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
