import type { Route } from "../+types/index";
import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Update One Movie Vote Count" }];
}

export default function UpdateOneVoteCountRoute() {
  return (
    <QueryPage
      headerTitle="Update One"
      title="Update a movie by increasing its vote count"
      description="Update a movie in the movie collection by its vote count with the given value "
      queryJson={`db.movies.updateOne(
  { title: "Pacific Rim" },
  { $inc: { vote_count: 76 } }
);`}
      endpoint="/api/mongo/update-one"
      method="PUT"
      body={{
        update: [{ title: "Pacific Rim" }, { $inc: { vote_count: 76 } }],
      }}
    />
  );
}
