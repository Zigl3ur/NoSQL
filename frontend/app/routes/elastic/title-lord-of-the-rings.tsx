import type { Route } from "../+types/index";

import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title:
        "NoSQL - ElasticSearch Movies With 'Lord of the Rings' or 'Hobbit'",
    },
  ];
}

export default function TextSearchLordOfTheRingsRoute() {
  return (
    <QueryPage
      headerTitle="ElasticSearch"
      title="Search Movies with 'Lord of the Rings' or 'Hobbit'"
      description="Search for movies that have 'Lord of the Rings' or 'Hobbit' in the title."
      queryJson={`{
  "query": {
    "bool": {
      "should": [
        {
          "match_phrase": {
            "title": "Lord of the Rings"
          }
        },
        {
          "match_phrase": {
            "title": "Hobbit"
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
            should: [
              {
                match_phrase: {
                  title: "Lord of the Rings",
                },
              },
              {
                match_phrase: {
                  title: "Hobbit",
                },
              },
            ],
          },
        },
      }}
    />
  );
}
