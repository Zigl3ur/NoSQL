package main

import (
	"log"
	"nosql/backend/config"
	"nosql/backend/internal/db"
	"nosql/backend/internal/repository"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/bson"
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

	// movie repo
	movieCollec := repository.NewMovieRepo(client, config.MongoDb)
	movieCollec.GetMany(bson.D{})

	router := gin.Default()
	router.GET("/test", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	router.Run(":" + config.Port)
}
