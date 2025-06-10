import type { Route } from "../../+types/index";

import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Update One Movie Rating" }];
}

export default function UpdateManyBoostRatingRoute() {
  return (
    <QueryPage
      headerTitle="Update Many"
      title="Update movies with specific genre and popularity"
      description="Update movies by increasing rating for specific genres and popularity"
      queryJson={`db.movies.updateMany(
  { popularity: { $gte: 600 }, genres: { $in: ["Adventure", "Fantasy"] } },
  { $inc: { rating: 0.5 } }
);`}
      endpoint="/api/mongo/update-many"
      method="PUT"
      body={{
        update: [
          {
            popularity: { $gte: 600 },
            genres: { $in: ["Adventure", "Fantasy"] },
          },
          { $inc: { rating: 0.5 } },
        ],
      }}
    />
  );
}
