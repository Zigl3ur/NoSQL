import { CheckIcon, Clipboard } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

interface JsonProps {
  title: string;
  content: string;
  fit?: boolean;
}

export default function JsonBlock({ title, content, fit }: JsonProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
  };

  useEffect(() => {
    setTimeout(() => setCopied(false), 1500);
  }, [copied]);

  return (
    <div className="flex flex-col w-full gap-2 sm:gap-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-lg sm:text-xl font-medium truncate">{title}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={copy}
          className="flex-shrink-0 h-8 w-8 sm:h-9 sm:w-9"
        >
          {copied ? (
            <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4 transition-all duration-300 animate-in fade-in-0 zoom-in-75" />
          ) : (
            <Clipboard className="h-3 w-3 sm:h-4 sm:w-4 transition-all duration-300 animate-in fade-in-0 zoom-in-75" />
          )}
        </Button>
      </div>
      <div
        className={`border-2 p-3 sm:p-4 rounded-md bg-accent ${
          !fit && "min-h-14 max-h-48 sm:max-h-64 lg:max-h-80"
        } overflow-y-auto`}
      >
        <pre className="text-xs sm:text-sm whitespace-pre-wrap break-words overflow-wrap-anywhere leading-relaxed">
          {content}
        </pre>
      </div>
    </div>
  );
}
