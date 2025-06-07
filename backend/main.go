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

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Content-Type"},
	}))

	routes.Setup(router, client, *config)

	router.Run(":" + config.Port)
}
