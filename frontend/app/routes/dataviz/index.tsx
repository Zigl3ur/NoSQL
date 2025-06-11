import { MoviesRatingPie } from "~/components/charts/movies-rating-pie";
import { TopGenresBarsChart } from "~/components/charts/top-genres-chart";
import { YearLineChart } from "~/components/charts/year-line-charts";
import Header from "~/components/navigation/header";

export default function ChartsRoute() {
  return (
    <>
      <Header title="DataViz" />
      <div className="space-y-4 sm:px-4 md:px-6 lg:px-8 xl:px-10 max-w-7xl mx-auto pb-4 sm:pb-6 md:pb-8 lg:pb-10 xl:pb-12">
        <TopGenresBarsChart />
        <MoviesRatingPie />
        <YearLineChart />
      </div>
    </>
  );
}
