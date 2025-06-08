import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Find Many By Genres" }];
}

export default function FidnManyWithGenresRouter() {
  return (
    <QueryPage
      headerTitle="Find Many"
      title="Find movies by genres"
      description="Find multiple movies by given genres in the movie collection"
      queryJson={`db.movies.find(
  { genres: { $all: ["Comedy", "Fantasy"] } },
  { title: 1, genres: 1, rating: 1 }
);`}
      endpoint="/api/mongo/find-many"
      method="POST"
      body={{
        "find-many": [
          { genres: { $all: ["Comedy", "Fantasy"] } },
          { title: 1, genres: 1, rating: 1 },
        ],
      }}
    />
  );
}
