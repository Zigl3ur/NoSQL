import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Delete One Custom" }];
}

export default function CustomDeleteOneRoute() {
  return (
    <QueryPage
      headerTitle="Delete One"
      title="Custom Delete-One Query"
      description="Here you can execute a custom delete one query on the movie collection"
      custom={true}
      placeholder={`[
  { "title": "A Minecraft Movie" } // filter 
]`}
      endpoint="/api/mongo/delete-one"
      method="DELETE"
      body={{ delete: [] }}
    />
  );
}
