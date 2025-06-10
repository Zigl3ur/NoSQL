import type { Route } from "../+types/index";

import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - ElasticSearch Custom" }];
}

export default function ElasticSearchCustomRoute() {
  return (
    <QueryPage
      headerTitle="ElasticSearch"
      title="Custom ElasticSearch Query"
      description="Here you can execute a custom ElasticSearch query"
      custom="elastic"
      placeholder={`{
  "query": {
    "multi_match": {
      "query": "adventure",
      "fields": ["title", "description"]
    }
  },
  "size": 10
}`}
      endpoint="/api/elastic/search"
      method="POST"
      body={{}}
    />
  );
}
