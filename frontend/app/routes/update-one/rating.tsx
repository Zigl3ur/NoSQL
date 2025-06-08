import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Update One Movie Rating" }];
}

export default function UpdateOneRatingRoute() {
  return (
    <QueryPage
      headerTitle="Update One"
      title="Update a movie rating"
      description="Update a movie in the movie collection by seting a new rating"
      queryJson={`db.movies.updateOne(
  { title: "Blade Runner" },
  { $set: { rating: 8.7 } }
);`}
      endpoint="/api/mongo/update-one"
      method="PUT"
      body={{
        update: [{ title: "Blade Runner" }, { $set: { rating: 8.7 } }],
      }}
    />
  );
}
