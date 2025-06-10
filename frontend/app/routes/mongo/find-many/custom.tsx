import type { Route } from "../../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Find Many Custom" }];
}

export default function CustomFindManyRoute() {
  return (
    <QueryPage
      headerTitle="Find Many"
      title="Custom Find Many Query"
      description="Here you can execute a custom find many query on the movie collection"
      custom="mongo"
      customLimit={true}
      customSkip={true}
      customSort={true}
      placeholder={`[
    { "actors": { "$all" : ["Keanu Reeves", "Carrie-Anne Moss"]} },
    { "title": 1, "description": 1 }
]`}
      endpoint="/api/mongo/find-many"
      method="POST"
      body={{ "find-many": [] }}
    />
  );
}
