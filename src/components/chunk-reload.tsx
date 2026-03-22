"use client";

import { useEffect } from "react";

/**
 * Global handler for ChunkLoadError after deploys.
 * When Next.js tries to load a JS chunk that no longer exists
 * (because a new build changed the hashes), this catches the error
 * and reloads the page once to fetch fresh chunks.
 */
export function ChunkReloadHandler() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const msg = event.message || "";
      const isChunkError =
        msg.includes("Loading chunk") ||
        msg.includes("ChunkLoadError") ||
        msg.includes("Loading CSS chunk") ||
        (event.error?.name === "ChunkLoadError");

      if (isChunkError) {
        // Only reload once per session to avoid infinite loops
        const key = "chunk-reload-attempted";
        if (!sessionStorage.getItem(key)) {
          sessionStorage.setItem(key, "1");
          window.location.reload();
        }
      }
    };

    // Also handle unhandled promise rejections (dynamic imports)
    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const msg =
        typeof reason === "string"
          ? reason
          : reason?.message || reason?.toString() || "";

      const isChunkError =
        msg.includes("Loading chunk") ||
        msg.includes("ChunkLoadError") ||
        msg.includes("Loading CSS chunk") ||
        reason?.name === "ChunkLoadError";

      if (isChunkError) {
        const key = "chunk-reload-attempted";
        if (!sessionStorage.getItem(key)) {
          sessionStorage.setItem(key, "1");
          window.location.reload();
        }
      }
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return null;
}
