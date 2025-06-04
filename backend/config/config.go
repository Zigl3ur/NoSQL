package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	Port     string
	MongoUri string
	MongoDb  string
}

// load config by .env file or env var,
// return config
func LoadConfig() (*Config, error) {
	// for dev it load .env file
	if err := godotenv.Load(); err != nil {
		return nil, err
	}

	port := os.Getenv("PORT")
	mongoUri := os.Getenv("MONGO_URI")
	mongoDb := os.Getenv("MONGO_DB")

	if port == "" {
		port = "8080"
	}

	if mongoUri == "" {
		mongoUri = "mongodb://localhost:27017"
	}

	return &Config{
		Port:     port,
		MongoUri: mongoUri,
		MongoDb:  mongoDb,
	}, nil
}
