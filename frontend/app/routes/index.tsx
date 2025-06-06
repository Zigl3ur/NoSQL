import Index from "~/pages";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Home" }];
}

export default function IndexRoute() {
  return <Index />;
}
