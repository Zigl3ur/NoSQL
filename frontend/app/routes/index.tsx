import Header from "~/components/navigation/header";
import type { Route } from "../+types/root";
import ResetButton from "~/components/reset-button";

export function meta({}: Route.MetaArgs) {
  return [{ title: "NoSQL - Home" }];
}

export default function IndexRoute() {
  return (
    <>
      <Header title="Home" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to the NoSQL App</h1>
        <p className="text-lg">
          This is the home page of the NoSQL application. Explore the features
          and functionalities.
        </p>
        <p className="text-lg mt-4">
          Use the side bar to access different sections of the application.
        </p>
        <p className="text-lg mt-4">
          You can reset/initialize the data in MongoDB and ElasticSearch by
          clicking the buttons below.
        </p>
        <div className="flex flex-col sm:flex-row mt-8 gap-4 max-w-sm sm:max-w-md">
          <ResetButton type="MongoDB" endpoint="/api/mongo/init" />
          <ResetButton type="ElasticSearch" endpoint="/api/elastic/init" />
        </div>
      </main>
    </>
  );
}
