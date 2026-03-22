"use client";

import { useState } from "react";
import { parseSharedData, type ShareableData } from "@/lib/share-utils";

// Helper function to parse shared data from URL
function getSharedDataFromURL(): ShareableData | null {
  // Only run on client side
  if (typeof window === "undefined") {
    return null;
  }

  try {
    // Get share parameter from URL
    const url = new URL(window.location.href);
    const shareParam = url.searchParams.get("share");

    if (!shareParam) {
      return null;
    }

    // Parse shared data
    const data = parseSharedData(shareParam);

    // Optional: Clean up URL after loading
    // This removes the share param from browser history
    // Uncomment if you want cleaner URLs after loading
    // if (data) {
    //   const newUrl = new URL(window.location.href);
    //   newUrl.searchParams.delete("share");
    //   window.history.replaceState({}, "", newUrl.toString());
    // }

    return data;
  } catch (error) {
    console.error("Error loading shared data:", error);
    return null;
  }
}

/**
 * Hook to load and parse shared data from URL parameters
 * Automatically reads the "share" query parameter on mount
 *
 * @returns Shared data if present and valid, null otherwise
 *
 * @example
 * ```tsx
 * function MyTool() {
 *   const sharedData = useSharedData();
 *
 *   useEffect(() => {
 *     if (sharedData) {
 *       // Load the shared data into your tool's state
 *       setInput(sharedData.data.input as string);
 *       setMode(sharedData.data.mode as string);
 *     }
 *   }, [sharedData]);
 *
 *   // ... rest of component
 * }
 * ```
 */
export function useSharedData(): ShareableData | null {
  // Use lazy initialization to parse shared data from URL
  const [sharedData] = useState<ShareableData | null>(() => getSharedDataFromURL());

  return sharedData;
}

// Helper function to parse shared data with error handling
function getSharedDataWithState(): {
  sharedData: ShareableData | null;
  isLoading: boolean;
  error: string | null;
} {
  if (typeof window === "undefined") {
    return { sharedData: null, isLoading: false, error: null };
  }

  try {
    const url = new URL(window.location.href);
    const shareParam = url.searchParams.get("share");

    if (!shareParam) {
      return { sharedData: null, isLoading: false, error: null };
    }

    const data = parseSharedData(shareParam);

    if (data) {
      return { sharedData: data, isLoading: false, error: null };
    } else {
      return {
        sharedData: null,
        isLoading: false,
        error: "Invalid or corrupted share link",
      };
    }
  } catch (err) {
    console.error("Error loading shared data:", err);
    return {
      sharedData: null,
      isLoading: false,
      error: "Failed to load shared data",
    };
  }
}

/**
 * Hook variant that provides loading state
 * Useful for showing loading indicators while parsing
 *
 * @returns Object with shared data and loading state
 */
export function useSharedDataWithLoading(): {
  sharedData: ShareableData | null;
  isLoading: boolean;
  error: string | null;
} {
  // Use lazy initialization to parse shared data with state
  const [state] = useState(() => getSharedDataWithState());

  return state;
}
