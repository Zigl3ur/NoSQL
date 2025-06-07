import { useState } from "react";
import JsonBlock from "./json-block";
import Header from "./navigation/header";
import { Button } from "./ui/button";
import { Loader, Loader2 } from "lucide-react";

interface PageProps {
  headerTitle: string;
  title: string;
  description: string;
  queryJson: Object;
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
      <div className="space-y-3 md:m-10">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p>{description}</p>
        <div className="flex flex-col lg:flex-row gap-4">
          <JsonBlock
            title="Query"
            content={JSON.stringify(queryJson, null, 2)}
          />
          <JsonBlock
            title="Result"
            content={JSON.stringify(response, null, 2)}
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={query}>
            {loading && <Loader2 className="animate-spin" />}Query
          </Button>
        </div>
      </div>
    </>
  );
}
