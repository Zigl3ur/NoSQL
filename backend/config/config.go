package config

import (
	"log"
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

	switch {
	case port == "":
		port = "8080"
	case mongoUri == "":
		log.Fatalln("mongodb uri is empty, please provide one in env var")
	case mongoDb == "":
		log.Fatalln("mongodb name is empty, please provide one in env var")
	}

	return &Config{
		Port:     port,
		MongoUri: mongoUri,
		MongoDb:  mongoDb,
	}, nil
}
