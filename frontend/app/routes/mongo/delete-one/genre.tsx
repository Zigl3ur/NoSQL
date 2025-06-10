import type { Route } from "../../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Delete One Lowest Rated Family" }];
}

export default function DeleteOneGenreRoute() {
  return (
    <QueryPage
      headerTitle="Delete One"
      title="Delete Oneby Genre"
      description="Delete a movie by its genre"
      queryJson={`db.movies.deleteOne({ genres: "Family" });`}
      endpoint="/api/mongo/delete-one"
      method="DELETE"
      body={{ delete: [{ genres: "Family" }] }}
    />
  );
}
