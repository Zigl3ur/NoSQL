import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Find-One Custom" }];
}

export default function CustomFindOneRoute() {
  return (
    <QueryPage
      headerTitle="Custom Find-One"
      title="Custom Find-One Query"
      description="Here you can execute a custom find one query on the movie collection"
      queryJson={{
        test: [{ a: "a" }],
      }}
      endpoint="/api/mongo/find-one"
      body={{ "find-one": [] }}
    />
  );
}
