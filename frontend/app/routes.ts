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
  ]),
] satisfies RouteConfig;
