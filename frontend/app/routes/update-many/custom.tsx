import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Update Many Custom" }];
}

export default function CustomUpdateManyRoute() {
  return (
    <QueryPage
      headerTitle="Update Many"
      title="Custom Update-Many Query"
      description="Here you can execute a custom update many query on the movie collection"
      custom={true}
      placeholder={`[
  { "title" : { "$regex": "star wars"} }, // filter
  { "$set": {"description" : "A movie about wars in the stars" } } // updated data
]`}
      endpoint="/api/mongo/update-many"
      method="PUT"
      body={{ update: [] }}
    />
  );
}
