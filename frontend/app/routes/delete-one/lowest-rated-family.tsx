import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Delete One Lowest Rated Family" }];
}

export default function DeleteOneLowestRatedFamilyRoute() {
  return (
    <QueryPage
      headerTitle="Delete One"
      title="Delete One Lowest Rated Family"
      description="Delete the lowest rated family movie in the collection by its genre"
      queryJson={`db.movies.deleteOne({ genres: "Family" });`}
      endpoint="/api/mongo/delete-one"
      method="DELETE"
      body={{ delete: [{ genres: "Family" }] }}
    />
  );
}
