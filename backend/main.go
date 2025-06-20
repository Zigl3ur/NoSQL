package main

import (
	"log"
	"nosql/backend/config"
	"nosql/backend/internal/api/routes"
	"nosql/backend/internal/db"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	// get config
	config := config.LoadConfig()

	// db init
	client, err := db.Connect(config.MongoUri)
	if err != nil {
		log.Fatalf("db connection error: %v\n", err)
	}
	defer db.Close(client)

	// elasticsearch init
	elasticClient, err := db.ElasticInit(config.ElasticUrl)
	if err != nil {
		log.Fatalf("elasticsearch client config error: %v\n", err)

	}

	// init elasticsearch data
	err = db.ElasticInitData(elasticClient, true)
	if err != nil {
		log.Fatalf("init elasticsearch error: %v\n", err)
	}

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowAllOrigins: true,
		AllowMethods:    []string{"POST", "PUT", "DELETE"},
		AllowHeaders:    []string{"Content-Type"},
	}))

	routes.Setup(router, client, elasticClient, *config)

	router.Run(":" + config.Port)
}
