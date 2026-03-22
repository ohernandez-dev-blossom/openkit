"use client";

import { ToolErrorBoundary } from "@/components/tool-error-boundary";

export default function HttpCodesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ToolErrorBoundary error={error} reset={reset} toolName="HTTP Status Codes" />;
}
