"use client";

import { ToolErrorBoundary } from "@/components/tool-error-boundary";

export default function SQLFormatError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ToolErrorBoundary error={error} reset={reset} toolName="SQL Formatter" />;
}
