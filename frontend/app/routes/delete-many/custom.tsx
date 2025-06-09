import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Delete Many Custom" }];
}

export default function CustomDeleteManyRoute() {
  return (
    <QueryPage
      headerTitle="Delete Many "
      title="Custom Delete Many Query"
      description="Here you can execute a custom delete many query on the movie collection"
      custom={true}
      placeholder={`[
  { "title": { "$regex": "^Star" } } // filter
]`}
      endpoint="/api/mongo/delete-many"
      method="DELETE"
      body={{ delete: [] }}
    />
  );
}
