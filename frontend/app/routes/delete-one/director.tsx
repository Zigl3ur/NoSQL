import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Delete One By Director" }];
}

export default function DeleteOneDirectorRoute() {
  return (
    <QueryPage
      headerTitle="Delete One"
      title="Delete One By Director"
      description="Delete a movie by its Directors"
      queryJson={`db.movies.deleteOne({ directors: "Christopher Nolan" });`}
      endpoint="/api/mongo/delete-one"
      method="DELETE"
      body={{ delete: [{ directors: "Christopher Nolan" }] }}
    />
  );
}
