import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Update One Movie Genre" }];
}

export default function UpdateOneGenreRoute() {
  return (
    <QueryPage
      headerTitle="Update One"
      title="Update a movie by adding a genre"
      description="Update a movie by adding the given genre to it"
      queryJson={`db.movies.updateOne(
  { title: "Star Wars" },
  { $addToSet: { genres: "Star Wars Trilogy" } }
);`}
      endpoint="/api/mongo/update-one"
      method="PUT"
      body={{
        update: [
          { title: "Star Wars" },
          { $addToSet: { genres: "Star Wars Trilogy" } },
        ],
      }}
    />
  );
}
