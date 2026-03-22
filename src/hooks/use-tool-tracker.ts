import { useEffect } from "react";
import { trackToolVisit, trackTimeSpent } from "@/lib/usage-tracker";

/**
 * Hook to automatically track tool usage
 * Call this at the top of any tool page component
 */
export function useToolTracker(slug: string, name: string, category?: string) {
  useEffect(() => {
    // Track visit on mount
    trackToolVisit(slug, name, category);

    // Track time spent on unmount
    return () => {
      trackTimeSpent(slug);
    };
  }, [slug, name, category]);
}
