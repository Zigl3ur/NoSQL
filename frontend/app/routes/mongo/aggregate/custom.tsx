import type { Route } from "../../+types/index";

import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Aggregate Custom" }];
}

export default function CustomAggregateRoute() {
  return (
    <QueryPage
      headerTitle="Aggregate"
      title="Custom Aggregate Query"
      description="Here you can execute a custom aggregate query on the movie collection"
      custom="mongo"
      placeholder={`[
  {
    $match: {
      release_date: { $gte: "2025-01-01", $lte: "2025-12-31" }
    }
  },
  { $sort: { popularity: -1 } },
  { $limit: 5 },
  {
    $project: {
      title: 1,
      release_date: 1,
      popularity: { $round: ["$popularity", 2] },
      rating: { $round: ["$rating", 2] },
      genres: 1,
      _id: 0
    }
  }
]`}
      endpoint="/api/mongo/aggregate"
      method="POST"
      body={{ aggregation: [] }}
    />
  );
}
