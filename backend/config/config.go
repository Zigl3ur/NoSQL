package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port       string
	MongoUri   string
	MongoDb    string
	ElasticUrl string
}

// load config by .env file or env var,
// return config
func LoadConfig() *Config {
	// for dev it load .env file
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	port := os.Getenv("PORT")
	mongoUri := os.Getenv("MONGO_URI")
	mongoDb := os.Getenv("MONGO_DB")
	elasticUrl := os.Getenv("ELASTIC_URL")

	switch {
	case port == "":
		port = "8080"
	case mongoUri == "":
		log.Fatalln("mongodb uri is empty, please provide one in env var")
	case mongoDb == "":
		log.Fatalln("mongodb name is empty, please provide one in env var")
	case elasticUrl == "":
		log.Fatalln("elasticsearch url is empty, please provide one in env var")
	}

	return &Config{
		Port:       port,
		MongoUri:   mongoUri,
		MongoDb:    mongoDb,
		ElasticUrl: elasticUrl,
	}
}
