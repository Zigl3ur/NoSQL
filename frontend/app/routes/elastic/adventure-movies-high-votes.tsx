import type { Route } from "../+types/index";

import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - ElasticSearch Adventure Movies High Votes" }];
}

export default function AdventureMoviesHighVotesRoute() {
  return (
    <QueryPage
      headerTitle="ElasticSearch"
      title="Get Adventure Movies With High Votes"
      description="Search for adventure movies with specific actors a that have a high votes count"
      queryJson={`{
  "query": {
    "bool": {
      "filter": [
        { "term": { "genres": "Adventure" } },
        { "range": { "rating": { "gte": 6.5 } } }
      ],
      "must": {
        "terms": {
          "actors": ["Tom Holland"]
        }
      }
    }
  }
}`}
      endpoint="/api/elastic/search"
      method="POST"
      body={{
        query: {
          bool: {
            filter: [
              { term: { genres: "Adventure" } },
              { range: { rating: { gte: 6.5 } } },
            ],
            must: {
              terms: {
                actors: ["Tom Holland"],
              },
            },
          },
        },
      }}
    />
  );
}
