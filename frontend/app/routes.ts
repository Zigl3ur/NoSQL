import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layout.tsx", [
    index("./routes/index.tsx"),
    route("/find-one", "./routes/find-one/custom.tsx"),
    route("/find-one/title", "./routes/find-one/title.tsx"),
    route("/find-one/rated-genre", "./routes/find-one/rated-genre.tsx"),
    route("/find-one/actor-recent-movie", "./routes/find-one/actor.tsx"),
  ]),
] satisfies RouteConfig;
