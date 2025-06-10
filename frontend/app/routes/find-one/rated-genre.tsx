import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Find One Highest Rated" }];
}

export default function FindRatedGenreRoute() {
  return (
    <QueryPage
      headerTitle="Find One"
      title="Find the highest rated movie by genre"
      description="Find the highest rated movie by its genre"
      queryJson={`db.movies.findOne(
  { genres: "Adventure" },
  { title: 1, rating: 1, release_date: 1 },
).sort({ sort: { rating: -1 } });`}
      endpoint="/api/mongo/find-one"
      method="POST"
      body={{
        "find-one": [
          { genres: "Adventure" },
          { title: 1, rating: 1, release_date: 1 },
        ],
        sort: { rating: -1 },
      }}
    />
  );
}
