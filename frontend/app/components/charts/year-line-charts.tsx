import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useState, useEffect, useMemo } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

export const description = "Average movie popularity and count by year";

const chartConfig = {
  avg_popularity: {
    label: "Average Popularity",
    color: "var(--chart-1)",
  },
  movie_count: {
    label: "Movie Count",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function YearLineChart() {
  const [chartData, setChartData] = useState<
    Array<{ year: string; avg_popularity: number; movie_count: number }>
  >([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND}/api/elastic/search`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: { match_all: {} },
            aggs: {
              by_year: {
                date_histogram: {
                  field: "release_date",
                  calendar_interval: "year",
                  format: "yyyy",
                  min_doc_count: 1,
                },
                aggs: {
                  avg_popularity: { avg: { field: "popularity" } },
                },
              },
            },
            size: 0,
          }),
        }
      );

      const data = await res.json();
      const yearData = data.aggregations.by_year.buckets
        .map((bucket: any) => ({
          year: bucket.key_as_string,
          avg_popularity: Math.round(bucket.avg_popularity.value * 100) / 100,
          movie_count: bucket.doc_count,
        }))
        .sort((a: any, b: any) => parseInt(a.year) - parseInt(b.year));

      setChartData(yearData);
    };
    getData();
  }, []);

  const maxPopularity = useMemo(
    () => Math.max(...chartData.map((item) => item.avg_popularity)),
    [chartData]
  );

  const maxMovieCount = useMemo(
    () => Math.max(...chartData.map((item) => item.movie_count)),
    [chartData]
  );

  const totalMovies = useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.movie_count, 0),
    [chartData]
  );

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Movies by Year - Popularity & Count</CardTitle>
        <CardDescription>
          Average popularity and movie count trends over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 24,
              left: 24,
              right: 24,
              bottom: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="popularity"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={["dataMin - 1", "dataMax + 1"]}
              tickFormatter={(value) => value.toFixed(2)}
            />
            <YAxis
              yAxisId="count"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => Math.round(value).toString()}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              yAxisId="popularity"
              dataKey="avg_popularity"
              type="monotone"
              stroke="var(--color-avg_popularity)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-avg_popularity)",
                strokeWidth: 2,
                r: 2,
              }}
              activeDot={{
                r: 4,
                fill: "var(--color-avg_popularity)",
              }}
            />
            <Line
              yAxisId="count"
              dataKey="movie_count"
              type="monotone"
              stroke="var(--color-movie_count)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-movie_count)",
                strokeWidth: 2,
                r: 2,
              }}
              activeDot={{
                r: 4,
                fill: "var(--color-movie_count)",
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Peak popularity: {maxPopularity} | Max movies per year:{" "}
          {maxMovieCount}
        </div>
        <div className="text-muted-foreground leading-none">
          Total movies: {totalMovies.toLocaleString()} across {chartData.length}{" "}
          years
        </div>
      </CardFooter>
    </Card>
  );
}
