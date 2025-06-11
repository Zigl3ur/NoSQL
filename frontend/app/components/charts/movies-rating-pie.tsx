import { Pie, PieChart } from "recharts";
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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

export const description = "Movies distribution by rating ranges";

const chartConfig = {
  count: {
    label: "Movies",
  },
  "0.0-2.0": {
    label: "0.0-2.0",
    color: "var(--chart-1)",
  },
  "2.0-4.0": {
    label: "2.0-4.0",
    color: "var(--chart-2)",
  },
  "4.0-6.0": {
    label: "4.0-6.0",
    color: "var(--chart-3)",
  },
  "6.0-8.0": {
    label: "6.0-8.0",
    color: "var(--chart-4)",
  },
  "8.0-10.0": {
    label: "8.0-10.0",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function MoviesRatingPie() {
  const [chartData, setChartData] = useState<
    Array<{ rating_range: string; count: number; fill: string }>
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
              by_rating_range: {
                range: {
                  field: "rating",
                  ranges: [
                    { from: 0, to: 2 },
                    { from: 2, to: 4 },
                    { from: 4, to: 6 },
                    { from: 6, to: 8 },
                    { from: 8, to: 10 },
                  ],
                },
              },
            },
            size: 0,
          }),
        }
      );

      const data = await res.json();
      const colorMap: { [key: string]: string } = {
        "0.0-2.0": "var(--color-chart-1)",
        "2.0-4.0": "var(--color-chart-2)",
        "4.0-6.0": "var(--color-chart-3)",
        "6.0-8.0": "var(--color-chart-4)",
        "8.0-10.0": "var(--color-chart-5)",
      };

      const ratings = data.aggregations.by_rating_range.buckets.map(
        (bucket: any) => ({
          rating_range: bucket.key,
          count: bucket.doc_count,
          fill: colorMap[bucket.key],
        })
      );
      setChartData(ratings);
    };
    getData();
  }, []);

  const totalMovies = useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.count, 0),
    [chartData]
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0 border-b">
        <CardTitle>Movies by Rating Range</CardTitle>
        <CardDescription>Distribution across rating ranges</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="count" hideLabel />}
            />
            <Pie data={chartData} dataKey="count" />
            <ChartLegend
              content={<ChartLegendContent nameKey="rating_range" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Total Movies: {totalMovies.toLocaleString()}{" "}
        </div>
        <div className="text-muted-foreground leading-none">
          Showing movie distribution across rating ranges
        </div>
      </CardFooter>
    </Card>
  );
}
