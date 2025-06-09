import { useState } from "react";
import JsonBlock from "./json-block";
import Header from "./navigation/header";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import CustomQueryForm from "./custom-query-form";

interface PageProps {
  headerTitle: string;
  title: string;
  description: string;
  queryJson?: string;
  custom?: boolean;
  customLimit?: boolean;
  customSort?: boolean;
  customSkip?: boolean;
  placeholder?: string;
  endpoint: string;
  method: "POST" | "PUT" | "DELETE";
  body: Object;
}

export default function QueryPage({
  headerTitle,
  title,
  description,
  queryJson,
  custom,
  customLimit,
  customSort,
  customSkip,
  placeholder,
  method,
  endpoint,
  body,
}: PageProps) {
  const [customQuery, setCustomQuery] = useState<string>("");
  const [limit, setLimit] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [skip, setSkip] = useState<string>("");

  const [response, setResponse] = useState<Object>({});
  const [loading, setLoading] = useState<boolean>(false);

  const query = async () => {
    setLoading(true);
    try {
      const tag = Object.keys(body)[0];
      let customBody;
      if (custom) {
        customBody = {
          [tag]: JSON.parse(customQuery || "[]"),
          sort: JSON.parse(sort || "{}"),
          skip: parseInt(skip),
          limit: parseInt(limit),
        };
      }

      const data = await fetch(`${import.meta.env.VITE_BACKEND}${endpoint}`, {
        method: method,
        body: JSON.stringify(custom ? customBody : body),
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
          {custom ? (
            <CustomQueryForm
              filterProjPlaceholder={placeholder || ""}
              filterProj={customQuery}
              onChangeFilterProj={setCustomQuery}
              limit={customLimit ? limit : undefined}
              onChangeLimit={customLimit ? setLimit : undefined}
              sort={customSort ? sort : undefined}
              onChangeSort={customSort ? setSort : undefined}
              skip={customSkip ? skip : undefined}
              onChangeSkip={customSkip ? setSkip : undefined}
            />
          ) : (
            <JsonBlock title="Query" fit={true} content={queryJson || ""} />
          )}
          <JsonBlock
            title="Result"
            content={JSON.stringify(response, null, 2)}
          />
        </div>
        <div className="flex justify-center sm:justify-end">
          <Button onClick={query} className="w-full sm:w-auto min-w-[120px]">
            {loading && <Loader2 className="animate-spin mr-2" />}Query
          </Button>
        </div>
      </div>
    </>
  );
}
