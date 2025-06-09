import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Aggregate Release Year Popularity" }];
}

export default function AggregateReleaseYearRoute() {
  return (
    <QueryPage
      headerTitle="Aggregate"
      title="Average Populairty By Year"
      description="Aggregate movies to get the popularity by year"
      queryJson={`db.movies.aggregate([
{ $addFields: { release_year: { $substr: ["$release_date", 0, 4] } } },
  { 
    $group: { 
      _id: "$release_year", 
      avgPopularity: { $avg: "$popularity" }, 
      movieCount: { $sum: 1 } 
    } 
  },
  { $sort: { _id: -1 } },
  { $project: { year: "$_id", avgPopularity: { $round: ["$avgPopularity", 2] }, movieCount: 1, _id: 0 } }
]);`}
      endpoint="/api/mongo/aggregate"
      method="POST"
      body={{
        aggregation: [
          {
            $addFields: { release_year: { $substr: ["$release_date", 0, 4] } },
          },
          {
            $group: {
              _id: "$release_year",
              avgPopularity: { $avg: "$popularity" },
              movieCount: { $sum: 1 },
            },
          },
          { $sort: { _id: -1 } },
          {
            $project: {
              year: "$_id",
              avgPopularity: { $round: ["$avgPopularity", 2] },
              movieCount: 1,
              _id: 0,
            },
          },
        ],
      }}
    />
  );
}
