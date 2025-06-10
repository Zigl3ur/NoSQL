import type { Route } from "../../+types/index";

import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Update Many Popularity" }];
}

export default function UpdateManyPopularityRoute() {
  return (
    <QueryPage
      headerTitle="Update Many"
      title="Update a movie popularity by actors"
      description="Update a movie by increasing its popularity depending on present actors"
      queryJson={`db.movies.updateMany(
  { actors: { $in: ["Jack Black", "Emma Myers"] } },
  { $inc: { popularity: 25 } }
);`}
      endpoint="/api/mongo/update-many"
      method="PUT"
      body={{
        update: [
          { actors: { $in: ["Jack Black", "Emma Myers"] } },
          { $inc: { popularity: 25 } },
        ],
      }}
    />
  );
}
