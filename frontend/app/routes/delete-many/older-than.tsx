import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Delete Many Older Than" }];
}

export default function DeleteManyOlderThanRoute() {
  return (
    <QueryPage
      headerTitle="Delete Many"
      title="Delete Many Older Than "
      description="Delete movies if they are older than a given Date"
      queryJson={`db.movies.deleteMany({ release_date: { $lt: "2020-01-01" } });`}
      endpoint="/api/mongo/delete-many"
      method="DELETE"
      body={{ delete: [{ release_date: { $lt: "2020-01-01" } }] }}
    />
  );
}
