"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
        <p className="text-sm text-muted-foreground mb-4">
          {error.message || "An unexpected error occurred loading converters tools."}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-card border border-border rounded-lg text-sm hover:bg-muted transition"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-4 py-2 bg-card border border-border rounded-lg text-sm hover:bg-muted transition"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
