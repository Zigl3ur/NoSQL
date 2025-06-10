import type { Route } from "../../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Find Many By Actors High Rating" }];
}

export default function FidnManyActorRatingRoute() {
  return (
    <QueryPage
      headerTitle="Find Many"
      title="Find movies with high rating by actors"
      description="Find multiple movies by given actors who has movies with high ratings"
      queryJson={`db.movies.find(
  { actors: { $in: ["Jason Momoa", "Jack Black"] }, rating: { $gte: 6.5 } },
  { title: 1, actors: 1, rating: 1 }
).limit(3);`}
      endpoint="/api/mongo/find-many"
      method="POST"
      body={{
        "find-many": [
          {
            actors: {
              $in: ["Jason Momoa", "Jack Black"],
            },
            rating: { $gte: 6.5 },
          },
          { title: 1, actors: 1, rating: 1 },
        ],
        limit: 3,
      }}
    />
  );
}
