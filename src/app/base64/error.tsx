"use client";

import { ToolErrorBoundary } from "@/components/tool-error-boundary";

export default function Base64Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ToolErrorBoundary error={error} reset={reset} toolName="Base64 Encoder/Decoder" />;
}
