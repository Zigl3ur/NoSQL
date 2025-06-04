package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
	"tmdb-script/types"
)

func main() {

	args := os.Args
	if len(args) < 2 {
		log.Fatalln("Usage: ./bin <nbr of pages to fetch>")
	}

	loopCount, err := strconv.Atoi(args[1])
	if err != nil {
		log.Fatalln("Make sure you pass a number in the arg")
	}

	bearer := os.Getenv("TMDB_API_KEY")

	genresList, err := getGenre(bearer)
	if err != nil {
		log.Fatalln(err)
	}

	var movieList []types.FormatedData

	for i := 0; i < loopCount; i++ {
		url := "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=" + strconv.Itoa(i+1) + "&sort_by=popularity.desc"

		req, _ := http.NewRequest("GET", url, nil)

		req.Header.Add("accept", "application/json")
		req.Header.Add("Authorization", "Bearer "+bearer)

		res, err := http.DefaultClient.Do(req)

		if err != nil {
			log.Fatalln("Error while fetching TMDB api")
		}

		// if rate limit break and write to file
		if res.StatusCode == 429 {
			break
		}

		defer res.Body.Close()
		body, err := io.ReadAll(res.Body)
		if err != nil {
			log.Fatalln("Error while reading body", err)
		}

		// store api response to base struct
		var bodydata types.BodyData
		err = json.Unmarshal(body, &bodydata)

		if err != nil {
			log.Fatalln("Error while unmarshall body json")
		}

		// loop over movies to get genre name based on id
		for _, movie := range bodydata.Results {
			var genresName []string
			for _, genreId := range movie.GenresId {
				genresName = append(genresName, genresList[genreId])
			}

			cast, err := getCast(bearer, movie.Id)
			if err != nil {
				log.Fatalln(err)
			}

			// create a new movie struct with genres name array and add it to the list
			outputMovie := types.FormatedData{
				Title:       movie.Title,
				Language:    movie.Language,
				ReleaseDate: movie.ReleaseDate,
				Genres:      genresName,
				Description: movie.Description,
				Actors:      cast["actors"],
				Directors:   cast["directors"],
				Popularity:  movie.Popularity,
				Rating:      movie.Rating,
				VoteCount:   movie.VoteCount,
			}
			movieList = append(movieList, outputMovie)
		}

		fmt.Println("page", i+1)

		time.Sleep(250 * time.Millisecond) // ensure no rate limit
	}

	fileData, err := json.MarshalIndent(movieList, "", "  ")
	if err != nil {
		log.Fatalln("Error while marshallIndent movieList to JSON:", err)
	}

	err = os.WriteFile("movies.json", fileData, 0644)
	if err != nil {
		log.Println("Error writing movies.json:", err)
	}

}

// function that fetch TMDB api to get genres names based on id
// return array of the genres name
func getGenre(bearer string) (map[int]string, error) {

	url := "https://api.themoviedb.org/3/genre/movie/list?language=en"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("accept", "application/json")
	req.Header.Add("Authorization", "Bearer "+bearer)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, errors.New("Error while fetching TMDB api")
	}

	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, errors.New("Error while reading genres body")
	}

	var genres types.GenreBodyData
	if err = json.Unmarshal(body, &genres); err != nil {
		return nil, errors.New("Error while unmarshall genres body json")
	}

	genresMap := make(map[int]string, len(genres.Genres))
	for i := range genres.Genres {
		genresMap[genres.Genres[i].Id] = genres.Genres[i].Name
	}

	return genresMap, nil
}

// function that fetch TMDB api to get cast and crew and extract directors and actors
// return a hash map whith directors and actors array
func getCast(bearer string, movieId int) (map[string][]string, error) {

	url := "https://api.themoviedb.org/3/movie/" + strconv.Itoa(movieId) + "/credits"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("accept", "application/json")
	req.Header.Add("Authorization", "Bearer "+bearer)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, errors.New("Error while fetching TMDB api")
	}

	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	if err != nil {
		return nil, errors.New("Error while reading crew body")
	}

	var crew types.CrewData
	if err = json.Unmarshal(body, &crew); err != nil {
		return nil, errors.New("Error while unmarshall crew body json")
	}

	returnMap := make(map[string][]string)

	for _, member := range crew.Cast {

		if member.Type == "Acting" {
			returnMap["actors"] = append(returnMap["actors"], member.Name)
		}
	}

	for _, member := range crew.Crew {
		if member.Job == "Director" {
			returnMap["directors"] = append(returnMap["directors"], member.Name)
		}
	}

	return returnMap, nil
}
