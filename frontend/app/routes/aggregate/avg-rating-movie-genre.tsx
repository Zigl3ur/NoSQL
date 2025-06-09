import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Aggregate Avg Rating Genre" }];
}

export default function AggregateRatingGenreRoute() {
  return (
    <QueryPage
      headerTitle="Aggregate"
      title="Average Rating By Genre"
      description="Aggregate movies to get the rating by genre and movie count"
      queryJson={`db.movies.aggregate([
  { $unwind: "$genres" },
  { 
    $group: { 
      _id: "$genres", 
      avgRating: { $avg: "$rating" }, 
      movieCount: { $sum: 1 } 
    } 
  },
  { $sort: { avgRating: -1 } },
  { $project: { genre: "$_id", avgRating: { $round: ["$avgRating", 2] }, movieCount: 1, _id: 0 } }
]);`}
      endpoint="/api/mongo/aggregate"
      method="POST"
      body={{
        aggregation: [
          { $unwind: "$genres" },
          {
            $group: {
              _id: "$genres",
              avgRating: { $avg: "$rating" },
              movieCount: { $sum: 1 },
            },
          },
          { $sort: { avgRating: -1 } },
          {
            $project: {
              genre: "$_id",
              avgRating: { $round: ["$avgRating", 2] },
              movieCount: 1,
              _id: 0,
            },
          },
        ],
      }}
    />
  );
}
