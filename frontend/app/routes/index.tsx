import type { Route } from "../+types/root";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Home" }];
}

export default function IndexRoute() {
  return (
    <QueryPage
      headerTitle="Home"
      title="Query"
      description="test"
      queryJson={{
        test: [{ a: "a" }],
      }}
      endpoint="/api/mongo/find-one"
      body={{ "find-one": [] }}
    />
  );
}
