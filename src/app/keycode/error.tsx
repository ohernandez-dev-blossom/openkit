"use client";

import { ToolErrorBoundary } from "@/components/tool-error-boundary";

export default function KeycodeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ToolErrorBoundary error={error} reset={reset} toolName="JavaScript KeyCode" />;
}
