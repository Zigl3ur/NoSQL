import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Find-One Custom" }];
}

export default function FindTitleRoute() {
  return (
    <QueryPage
      headerTitle="Find-One By Title"
      title="Find By Title Query"
      description="Find a movie in the collection by its title"
      queryJson={`db.movies.findOne(
  { title: "Pacific Rim" }
)`}
      endpoint="/api/mongo/find-one"
      body={{ "find-one": [{ title: "Pacific Rim" }] }}
    />
  );
}
