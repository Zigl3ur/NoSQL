import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Find One Custom" }];
}

export default function CustomFindOneRoute() {
  return (
    <QueryPage
      headerTitle="Find One"
      title="Custom Find-One Query"
      description="Here you can execute a custom find one query on the movie collection"
      custom={true}
      customSkip={true}
      customSort={true}
      placeholder={`[
  { "title": "Star Wars" }, // filter
  { "title": 1, "description": 1 } // projection
]`}
      endpoint="/api/mongo/find-one"
      method="POST"
      body={{ "find-one": [] }}
    />
  );
}
