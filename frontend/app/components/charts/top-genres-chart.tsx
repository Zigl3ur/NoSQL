import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { useState, useEffect, useMemo } from "react";

export const description = "Top genres by total votes";

const chartConfig = {
  total_votes: {
    label: "Total Votes",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function TopGenresBarsChart() {
  const [chartData, setChartData] = useState<
    Array<{ genre: string; total_votes: number }>
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
              by_genre: {
                terms: {
                  field: "genres",
                  order: { total_votes: "desc" },
                },
                aggs: {
                  total_votes: { sum: { field: "vote_count" } },
                },
              },
            },
            size: 0,
          }),
        }
      );

      const data = await res.json();
      const genres = data.aggregations.by_genre.buckets.map((bucket: any) => ({
        genre: bucket.key,
        total_votes: bucket.total_votes.value,
      }));
      setChartData(genres);
    };
    getData();
  }, []);

  const totalVotes = useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.total_votes, 0),
    [chartData]
  );

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>All Genres by Total Votes</CardTitle>
          <CardDescription>
            Showing all genres ranked by total vote count
          </CardDescription>
        </div>
        <div className="flex">
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">Total Votes</span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {totalVotes.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="genre"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="total_votes"
                  labelFormatter={(value) => `Genre: ${value}`}
                />
              }
            />
            <Bar dataKey="total_votes" fill="var(--color-total_votes)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
