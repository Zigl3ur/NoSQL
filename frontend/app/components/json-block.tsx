import { CheckIcon, Clipboard } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

interface JsonProps {
  title: string;
  content: string;
}

export default function JsonBlock({ title, content }: JsonProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
  };

  useEffect(() => {
    setTimeout(() => setCopied(false), 1500);
  }, [copied]);

  return (
    <div className="flex flex-col w-full gap-2">
      <p className="text-xl">{title}</p>
      <div className="border-2 p-2 pr-12 rounded-md bg-accent min-h-14 max-h-180 overflow-y-auto relative h-full">
        <Button
          variant="outline"
          className="absolute top-2 right-2"
          size={"icon"}
          onClick={copy}
        >
          {copied ? (
            <CheckIcon className="transition-all duration-300 animate-in fade-in-0 zoom-in-75" />
          ) : (
            <Clipboard className="transition-all duration-300 animate-in fade-in-0 zoom-in-75" />
          )}
        </Button>
        <pre className="text-wrap">{content}</pre>
      </div>
    </div>
  );
}
