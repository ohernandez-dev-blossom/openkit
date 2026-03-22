"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
      <p className="text-muted-foreground mb-6">
        There was an error loading the Certificate Decoder tool.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
