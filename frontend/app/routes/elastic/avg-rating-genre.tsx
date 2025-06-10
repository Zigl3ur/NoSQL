import type { Route } from "../+types/index";

import QueryPage from "~/components/query-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - ElasticSearch Average Rating by Genre" }];
}

export default function AverageRatingGenreRoute() {
  return (
    <QueryPage
      headerTitle="ElasticSearch"
      title="Aggregate Movies by Genre with Average Rating"
      description="Aggregate movies by genre and average rating"
      queryJson={`{
  "query": {
    "match_all": {}
  },
  "aggs": {
    "by_genre": {
      "terms": {
        "field": "genres",
        "size": 10
      },
      "aggs": {
        "avg_rating": {
          "avg": {
            "field": "rating"
          }
        }
      }
    }
  }
}`}
      endpoint="/api/elastic/search"
      method="POST"
      body={{
        query: {
          match_all: {},
        },
        aggs: {
          by_genre: {
            terms: {
              field: "genres",
              size: 10,
            },
            aggs: {
              avg_rating: {
                avg: {
                  field: "rating",
                },
              },
            },
          },
        },
      }}
    />
  );
}
