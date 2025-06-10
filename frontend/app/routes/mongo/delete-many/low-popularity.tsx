import type { Route } from "../../+types/index";

import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Delete Many By Low Popularity" }];
}

export default function DeleteManyLowPopularityRoute() {
  return (
    <QueryPage
      headerTitle="Delete Many"
      title="Delete Many With low popularity"
      description="Delete movies if they have less than 200 of popularity"
      queryJson={`db.movies.deleteMany({ popularity: { $lt: 200 } });`}
      endpoint="/api/mongo/delete-many"
      method="DELETE"
      body={{ delete: [{ popularity: { $lt: 200 } }] }}
    />
  );
}
