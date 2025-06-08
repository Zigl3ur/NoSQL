import type { Route } from "../+types/root";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Home" }];
}

export default function IndexRoute() {
  return <>Hello</>;
}
