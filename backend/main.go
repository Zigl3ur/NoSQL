package main

import (
	"log"
	"nosql/backend/config"
	"nosql/backend/internal/api/routes"
	"nosql/backend/internal/db"

	"github.com/gin-gonic/gin"
)

func main() {

	// get config
	config, err := config.LoadConfig()
	if err != nil {
		log.Fatalln(err)
	}

	// db init
	client, err := db.Connect(config.MongoUri)
	if err != nil {
		log.Fatalln(err)
	}
	defer db.Close(client)

	router := gin.Default()

	routes.Setup(router, client, *config)

	router.Run(":" + config.Port)
}
