import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layout.tsx", [
    index("./routes/index.tsx"),

    // find-one
    route("/mongo/find-one", "./routes/mongo/find-one/custom.tsx"),
    route("/mongo/find-one/title", "./routes/mongo/find-one/title.tsx"),
    route(
      "/mongo/find-one/rated-genre",
      "./routes/mongo/find-one/rated-genre.tsx"
    ),
    route(
      "/mongo/find-one/actor-recent-movie",
      "./routes/mongo/find-one/actor.tsx"
    ),

    // find-many
    route("/mongo/find-many", "./routes/mongo/find-many/custom.tsx"),
    route("/mongo/find-many/genres", "./routes/mongo/find-many/genres.tsx"),
    route(
      "/mongo/find-many/recent-popular",
      "./routes/mongo/find-many/high-popularity.tsx"
    ),
    route(
      "/mongo/find-many/actors-high-rating",
      "./routes/mongo/find-many/actors-high-rating.tsx"
    ),

    // update-one
    route("/mongo/update-one", "./routes/mongo/update-one/custom.tsx"),
    route("/mongo/update-one/rating", "./routes/mongo/update-one/rating.tsx"),
    route("/mongo/update-one/genres", "./routes/mongo/update-one/genres.tsx"),
    route(
      "/mongo/update-one/vote-count",
      "./routes/mongo/update-one/vote-count.tsx"
    ),

    // update-many
    route("/mongo/update-many", "./routes/mongo/update-many/custom.tsx"),
    route(
      "/mongo/update-many/rating",
      "./routes/mongo/update-many/popularity.tsx"
    ),
    route(
      "/mongo/update-many/popularity",
      "./routes/mongo/update-many/rating.tsx"
    ),
    route(
      "/mongo/update-many/language",
      "./routes/mongo/update-many/language.tsx"
    ),

    // delete-one
    route("/mongo/delete-one", "./routes/mongo/delete-one/custom.tsx"),
    route("/mongo/delete-one/title", "./routes/mongo/delete-one/title.tsx"),
    route(
      "/mongo/delete-one/director",
      "./routes/mongo/delete-one/director.tsx"
    ),
    route("/mongo/delete-one/genre", "./routes/mongo/delete-one/genre.tsx"),

    // delete-many
    route("/mongo/delete-many", "./routes/mongo/delete-many/custom.tsx"),
    route(
      "/mongo/delete-many/low-vote",
      "./routes/mongo/delete-many/low-vote.tsx"
    ),
    route(
      "/mongo/delete-many/low-popularity",
      "./routes/mongo/delete-many/low-popularity.tsx"
    ),
    route(
      "/mongo/delete-many/older-than",
      "./routes/mongo/delete-many/older-than.tsx"
    ),

    // aggregate
    route("/mongo/aggregate", "./routes/mongo/aggregate/custom.tsx"),
    route(
      "/mongo/aggregate/avg-rating-movie-genre",
      "./routes/mongo/aggregate/avg-rating-movie-genre.tsx"
    ),
    route(
      "/mongo/aggregate/top-5-directors",
      "./routes/mongo/aggregate/top-5-directors.tsx"
    ),
    route(
      "/mongo/aggregate/group-release-popularity",
      "./routes/mongo/aggregate/group-release-popularity.tsx"
    ),

    // elasticsearch
    route("/elastic-search", "./routes/elastic/custom.tsx"),
    route(
      "/elastic-search/recent-high-rated-family",
      "./routes/elastic/recent-high-rated-family.tsx"
    ),
    route(
      "/elastic-search/movies-popular-actors",
      "./routes/elastic/movies-popular-actors.tsx"
    ),
    route(
      "/elastic-search/avg-rating-genre",
      "./routes/elastic/avg-rating-genre.tsx"
    ),
    route(
      "/elastic-search/adventure-movies-high-votes",
      "./routes/elastic/adventure-movies-high-votes.tsx"
    ),
    route(
      "/elastic-search/title-lord-of-the-rings",
      "./routes/elastic/title-lord-of-the-rings.tsx"
    ),
    route(
      "/elastic-search/skywalker-title-description",
      "./routes/elastic/skywalker-title-description.tsx"
    ),
  ]),
] satisfies RouteConfig;
