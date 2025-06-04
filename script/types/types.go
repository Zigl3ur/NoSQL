package types

type Genre struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

type TMDBApiData struct {
	Id          int      `json:"id"`
	Title       string   `json:"title"`
	Language    string   `json:"original_language"`
	ReleaseDate string   `json:"release_date"`
	GenresId    []int    `json:"genre_ids"`
	Genres      []string `json:"genres"`
	Description string   `json:"overview"`
	Popularity  float32  `json:"popularity"`
	Rating      float32  `json:"vote_average"`
	VoteCount   int      `json:"vote_count"`
}

type FormatedData struct {
	Title       string   `json:"title"`
	Language    string   `json:"language"`
	ReleaseDate string   `json:"release_date"`
	Genres      []string `json:"genres"`
	Description string   `json:"description"`
	Actors      []string `json:"actors"`
	Directors   []string `json:"directors"`
	Popularity  float32  `json:"popularity"`
	Rating      float32  `json:"rating"`
	VoteCount   int      `json:"vote_count"`
}

type CrewData struct {
	Cast []struct {
		Type string `json:"known_for_department"`
		Name string `json:"name"`
	} `json:"cast"`
	Crew []struct {
		Job  string `json:"job"`
		Name string `json:"name"`
	} `json:"crew"`
}

type BodyData struct {
	Page    int           `json:"page"`
	Results []TMDBApiData `json:"results"`
}

type GenreBodyData struct {
	Genres []Genre `json:"genres"`
}
