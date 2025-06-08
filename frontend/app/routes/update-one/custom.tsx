import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Update One Custom" }];
}

export default function CustomUpdateOneRoute() {
  return (
    <QueryPage
      headerTitle="Update One"
      title="Custom Update-One Query"
      description="Here you can execute a custom update one query on the movie collection"
      custom={true}
      placeholder={`[
  { "title": "Star Wars" }, // filter
  { "$set": {"description" : "A Movie about wars in the star" } } // updated data
]`}
      endpoint="/api/mongo/update-one"
      method="PUT"
      body={{ update: [] }}
    />
  );
}
