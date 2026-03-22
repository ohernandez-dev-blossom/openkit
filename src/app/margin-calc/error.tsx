"use client";

import { ToolErrorBoundary } from "@/components/tool-error-boundary";

export default function ToolError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ToolErrorBoundary error={error} reset={reset} toolName="Margin Calculator" />;
}
