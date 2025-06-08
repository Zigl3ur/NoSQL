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
  ]),
] satisfies RouteConfig;
