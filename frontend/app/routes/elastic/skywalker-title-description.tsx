import type { Route } from "../+types/index";

import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - ElasticSearch Movies With 'Skiwalker'" }];
}

export default function TextSearchSkywalkerRoute() {
  return (
    <QueryPage
      headerTitle="ElasticSearch"
      title="Search Movies with 'Skywalker'"
      description="Search for movies that have 'Skywalker' in the title or description."
      queryJson={`{
  "query": {
    "multi_match": {
      "query": "Skywalker",
      "fields": ["title", "description"]
    }
  }
}`}
      endpoint="/api/elastic/search"
      method="POST"
      body={{
        query: {
          multi_match: {
            query: "Skywalker",
            fields: ["title", "description"],
          },
        },
      }}
    />
  );
}
