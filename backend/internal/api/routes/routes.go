package routes

import (
	"nosql/backend/config"
	"nosql/backend/internal/api/handlers"
	"nosql/backend/internal/repository"

	"github.com/elastic/go-elasticsearch/v9"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

func Setup(r *gin.Engine, client *mongo.Client, esClient *elasticsearch.Client, config config.Config) {

	movieRepo := repository.NewMovieRepo(client, config.MongoDb)
	movieHandler := handlers.NewMovieHandler(movieRepo)

	elasticHandler := handlers.NewElasticHandler(esClient)

	mongo := r.Group("/api/mongo")
	{
		mongo.POST("/find-one", movieHandler.HandlerGetOne)
		mongo.POST("/find-many", movieHandler.HandlerGetMany)
		mongo.PUT("/update-one", func(c *gin.Context) {
			movieHandler.HandlerUpdate(c, repository.One)
		})
		mongo.PUT("/update-many", func(c *gin.Context) {
			movieHandler.HandlerUpdate(c, repository.Many)
		})
		mongo.DELETE("/delete-one", func(c *gin.Context) {
			movieHandler.HandlerDelete(c, repository.One)
		})
		mongo.DELETE("/delete-many", func(c *gin.Context) {
			movieHandler.HandlerDelete(c, repository.Many)
		})
		mongo.POST("/aggregate", movieHandler.HandlerAggregate)
	}

	elastic := r.Group("/api/elastic")
	{
		elastic.GET("/count", elasticHandler.HandlerCount)
		elastic.GET("/search", elasticHandler.HandlerSearch)
	}
}
