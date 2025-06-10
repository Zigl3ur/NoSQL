import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Find Many By High Popularity in 2025" }];
}

export default function HighPopularity2025Route() {
  return (
    <QueryPage
      headerTitle="Find Many"
      title="Find movies by high popularity in 2025"
      description="Find multiple movies by there popularity in the year 2025"
      queryJson={`db.movies.find(
  { release_date: { $regex: "^2025" }, popularity: { $gte: 250 } },
  { title: 1, release_date: 1, popularity: 1 }
).sort({ popularity: -1 }).limit(5);`}
      endpoint="/api/mongo/find-many"
      method="POST"
      body={{
        "find-many": [
          { release_date: { $regex: "^2025" }, popularity: { $gte: 250 } },
          { title: 1, release_date: 1, popularity: 1 },
        ],
        sort: { popularity: -1 },
      }}
    />
  );
}
