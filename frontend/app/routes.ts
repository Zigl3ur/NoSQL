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
    route("/find-one", "./routes/find-one/custom.tsx"),
    route("/find-one/title", "./routes/find-one/title.tsx"),
    route("/find-one/rated-genre", "./routes/find-one/rated-genre.tsx"),
    route("/find-one/actor-recent-movie", "./routes/find-one/actor.tsx"),

    // find-many
    route("/find-many", "./routes/find-many/custom.tsx"),
    route("/find-many/genres", "./routes/find-many/genres.tsx"),
    route(
      "/find-many/recent-popular",
      "./routes/find-many/high-popularity.tsx"
    ),
    route(
      "/find-many/actors-high-rating",
      "./routes/find-many/actors-high-rating.tsx"
    ),

    // update-one
    route("/update-one", "./routes/update-one/custom.tsx"),
    route("/update-one/rating", "./routes/update-one/rating.tsx"),
    route("/update-one/genres", "./routes/update-one/genres.tsx"),
    route("/update-one/vote-count", "./routes/update-one/vote-count.tsx"),

    // update-many
    route("/update-many", "./routes/update-many/custom.tsx"),
    route("/update-many/rating", "./routes/update-many/popularity.tsx"),
    route("/update-many/popularity", "./routes/update-many/rating.tsx"),
    route("/update-many/language", "./routes/update-many/language.tsx"),

    // delete-one
    route("/delete-one", "./routes/delete-one/custom.tsx"),
    route("/delete-one/title", "./routes/delete-one/title.tsx"),
    route("/delete-one/director", "./routes/delete-one/director.tsx"),
    route("/delete-one/genre", "./routes/delete-one/genre.tsx"),

    // delete-many
    route("/delete-many", "./routes/delete-many/custom.tsx"),
    route("/delete-many/low-vote", "./routes/delete-many/low-vote.tsx"),
    route(
      "/delete-many/low-popularity",
      "./routes/delete-many/low-popularity.tsx"
    ),
    route("/delete-many/older-than", "./routes/delete-many/older-than.tsx"),

    // aggregate
    route("/aggregate", "./routes/aggregate/custom.tsx"),
    route(
      "/aggregate/avg-rating-movie-genre",
      "./routes/aggregate/avg-rating-movie-genre.tsx"
    ),
    route(
      "/aggregate/top-5-directors",
      "./routes/aggregate/top-5-directors.tsx"
    ),
    route(
      "/aggregate/group-release-popularity",
      "./routes/aggregate/group-release-popularity.tsx"
    ),
  ]),
] satisfies RouteConfig;
