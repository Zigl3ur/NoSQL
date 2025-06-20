import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ResetButtonProps {
  type: "MongoDB" | "ElasticSearch";
  endpoint: string;
}

export default function ResetButton({ type, endpoint }: ResetButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const reset = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}${endpoint}`,
        {
          method: "PUT",
        }
      );

      if (response.ok)
        toast.success("Success", {
          description: `Successfully reseted ${type} data`,
          closeButton: true,
          position: "top-right",
        });
    } catch (err) {
      toast.error("Error", {
        description: `Failed to reset ${type} data`,
        closeButton: true,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="destructive" onClick={reset}>
      {loading && <Loader2 className="animate-spin" />}
      Reset {type}
    </Button>
  );
}
