"use client";

import { ToolErrorBoundary } from "@/components/tool-error-boundary";

export default function GradientError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ToolErrorBoundary error={error} reset={reset} toolName="CSS Gradient Generator" />;
}
