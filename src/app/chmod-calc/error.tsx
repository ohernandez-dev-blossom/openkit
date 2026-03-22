"use client";

import { ToolErrorBoundary } from "@/components/tool-error-boundary";

export default function ChmodCalcError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ToolErrorBoundary error={error} reset={reset} toolName="chmod Calculator Pro" />;
}
