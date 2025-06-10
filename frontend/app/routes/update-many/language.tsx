import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Update One Movie Vote Count" }];
}

export default function UpdateManyLanguageRoute() {
  return (
    <QueryPage
      headerTitle="Update Many"
      title="Update movies en Language to en-US"
      description="Update movies by updating the language en to en-US"
      queryJson={`db.movies.updateMany(
  { release_date: { $regex: "^2025" } },
  { $set: { language: "en-US" } }
);`}
      endpoint="/api/mongo/update-many"
      method="PUT"
      body={{
        update: [
          { release_date: { $regex: "^2025" } },
          { $set: { language: "en-US" } },
        ],
      }}
    />
  );
}
