import type { Route } from "../+types/index";

import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - ElasticSearch Movies With Popular Actors" }];
}

export default function MoviesPopularActorsRoute() {
  return (
    <QueryPage
      headerTitle="ElasticSearch"
      title="Search Movies with Popular Actors"
      description="Search for movies that have given actors."
      queryJson={`{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "actors": "Tom Holland"
          }
        },
        {
          "match": {
            "actors": "Zendaya"
          }
        }
      ]
    }
  }
}`}
      endpoint="/api/elastic/search"
      method="POST"
      body={{
        query: {
          bool: {
            must: [
              {
                match: {
                  actors: "Tom Holland",
                },
              },
              {
                match: {
                  actors: "Zendaya",
                },
              },
            ],
          },
        },
      }}
    />
  );
}
