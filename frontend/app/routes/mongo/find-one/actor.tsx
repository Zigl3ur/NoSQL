import type { Route } from "../../+types/index";

import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Find One Actor Recent Movie" }];
}

export default function FindOneActorReventRoute() {
  return (
    <QueryPage
      headerTitle="Find One"
      title="Find the most recent movie of an actor"
      description="Find the most recent movie of a given actor"
      queryJson={`db.movies.findOne(
  { actors: "Jason Momoa", release_date: { $gte: "2025-01-01" } },
  { title: 1, actors: 1, release_date: 1 }
);`}
      endpoint="/api/mongo/find-one"
      method="POST"
      body={{
        "find-one": [
          { actors: "Jason Momoa", release_date: { $gte: "2025-01-01" } },
          { title: 1, actors: 1, release_date: 1 },
        ],
      }}
    />
  );
}
