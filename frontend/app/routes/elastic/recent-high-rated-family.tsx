import type { Route } from "../+types/index";

import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - ElasticSearch Recent High Rated Family" }];
}

export default function RecentHighRatedFamilyRoute() {
  return (
    <QueryPage
      headerTitle="ElasticSearch"
      title="Search Recent High Rated Family Movies"
      description="Search for movies that are family-friendly with high ratings and were released recently."
      queryJson={`{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "genres": "Family"
          }
        },
        {
          "range": {
            "rating": {
              "gte": 7.0
            }
          }
        },
        {
          "range": {
            "release_date": {
              "gte": "now-1y/d"
            }
          }
        }
      ]
    }
  },
  "sort": [
    {
      "release_date": {
        "order": "desc"
      }
    }
  ]
}`}
      endpoint="/api/elastic/search"
      method="POST"
      body={{
        query: {
          bool: {
            must: [
              {
                match: {
                  genres: "Family",
                },
              },
              {
                range: {
                  rating: {
                    gte: 7.0,
                  },
                },
              },
              {
                range: {
                  release_date: {
                    gte: "now-1y/d",
                  },
                },
              },
            ],
          },
        },
        sort: [
          {
            release_date: {
              order: "desc",
            },
          },
        ],
        size: 10,
      }}
    />
  );
}
