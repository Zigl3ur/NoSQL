package main

import (
	"log"
	"nosql/backend/config"
	"nosql/backend/internal/db"

	"github.com/gin-gonic/gin"
)

func main() {
	config, err := config.LoadConfig()

	if err != nil {
		log.Fatalln(err)
	}

	var mongoCtx db.MongoCtx
	if err = mongoCtx.Connect(config.MongoUri); err != nil {
		log.Fatalln(err)
	}
	defer mongoCtx.Close()

	router := gin.Default()
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	router.Run(":" + config.Port)
}
