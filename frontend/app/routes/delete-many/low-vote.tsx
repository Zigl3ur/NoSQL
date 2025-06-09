import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Delete Many With Low Vote Count" }];
}

export default function DeleteManyLowVoteRoute() {
  return (
    <QueryPage
      headerTitle="Delete Many"
      title="Delete Many With low votes"
      description="Delete movies if it has less than 100 votes"
      queryJson={`db.movies.deleteMany({ vote_count: { $lt: 100 } });`}
      endpoint="/api/mongo/delete-many"
      method="DELETE"
      body={{ delete: [{ vote_count: { $lt: 100 } }] }}
    />
  );
}
