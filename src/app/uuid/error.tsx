"use client";

import { ToolErrorBoundary } from "@/components/tool-error-boundary";

export default function UUIDError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ToolErrorBoundary error={error} reset={reset} toolName="UUID Generator" />;
}
