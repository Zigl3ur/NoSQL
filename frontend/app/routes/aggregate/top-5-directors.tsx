import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Aggregate Top 5 Directors" }];
}

export default function AggregateTopDirectorsRoute() {
  return (
    <QueryPage
      headerTitle="Aggregate"
      title="Average Top 5 DIrectors"
      description="Aggregate movies to get the top 5 directors by movies vote count"
      queryJson={`db.movies.aggregate([
  { $unwind: "$directors" },
  { 
    $group: { 
      _id: "$directors", 
      totalVotes: { $sum: "$vote_count" }, 
      movies: { $push: "$title" } 
    } 
  },
  { $sort: { totalVotes: -1 } },
  { $limit: 5 },
  { $project: { director: "$_id", totalVotes: 1, movies: 1, _id: 0 } }
]);`}
      endpoint="/api/mongo/aggregate"
      method="POST"
      body={{
        aggregation: [
          { $unwind: "$directors" },
          {
            $group: {
              _id: "$directors",
              totalVotes: { $sum: "$vote_count" },
              movies: { $push: "$title" },
            },
          },
          { $sort: { totalVotes: -1 } },
          { $limit: 5 },
          { $project: { director: "$_id", totalVotes: 1, movies: 1, _id: 0 } },
        ],
      }}
    />
  );
}
