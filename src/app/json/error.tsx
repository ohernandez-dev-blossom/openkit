"use client";

import { ToolErrorBoundary } from "@/components/tool-error-boundary";

export default function JSONError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ToolErrorBoundary error={error} reset={reset} toolName="JSON Formatter" />;
}
