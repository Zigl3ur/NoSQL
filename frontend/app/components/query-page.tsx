import { useState } from "react";
import JsonBlock from "./json-block";
import Header from "./navigation/header";
import { Button } from "./ui/button";
import { Loader, Loader2 } from "lucide-react";

interface PageProps {
  headerTitle: string;
  title: string;
  description: string;
  queryJson: string;
  endpoint: string;
  body: Object;
}

export default function QueryPage({
  headerTitle,
  title,
  description,
  queryJson,
  endpoint,
  body,
}: PageProps) {
  const [response, setResponse] = useState<Object>({});
  const [loading, setLoading] = useState<boolean>(false);

  const query = async () => {
    setLoading(true);
    try {
      const data = await fetch(`${import.meta.env.VITE_BACKEND}${endpoint}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await data.json();

      setResponse(json);
    } catch (err) {
      setResponse({
        error: err instanceof Error ? err.message : "An unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title={headerTitle} />
      <div className="space-y-4 p-4 md:p-6 lg:p-8 xl:p-10 max-w-7xl mx-auto">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
          {title}
        </h1>
        <p className="text-sm md:text-base text-gray-600">{description}</p>
        <div className="flex flex-col gap-4 md:gap-6">
          <JsonBlock title="Query" content={queryJson} />
          <JsonBlock
            title="Result"
            content={JSON.stringify(response, null, 2)}
          />
        </div>
        <div className="flex justify-center md:justify-end">
          <Button onClick={query} className="w-full sm:w-auto min-w-[120px]">
            {loading && <Loader2 className="animate-spin mr-2" />}Query
          </Button>
        </div>
      </div>
    </>
  );
}
