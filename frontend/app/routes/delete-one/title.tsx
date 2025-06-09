import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Delete One By Title" }];
}

export default function DeleteOneTitleRoute() {
  return (
    <QueryPage
      headerTitle="Delete One"
      title="Delete One By Title"
      description="Delete a movie by its title"
      queryJson={`db.movies.deleteOne({ title: "A Minecraft Movie" });`}
      endpoint="/api/mongo/delete-one"
      method="DELETE"
      body={{ delete: [{ title: "A Minecraft Movie" }] }}
    />
  );
}
