/**
 * Usage Tracker - Privacy-friendly, 100% client-side analytics
 * Tracks tool usage in localStorage for recent tools feature
 */

export interface ToolUsage {
  slug: string;
  name: string;
  visits: number;
  firstVisit: string;
  lastVisit: string;
  totalTimeSpent: number; // in seconds
  category?: string;
}

export interface UsageStats {
  tools: Record<string, ToolUsage>;
  totalVisits: number;
  totalTools: number;
  firstUse: string;
}

const STORAGE_KEY = "openkit_usage";
const SESSION_START_KEY = "openkit_session_start";

/**
 * Get all usage data from localStorage
 */
export function getUsageData(): UsageStats {
  if (typeof window === "undefined") {
    return {
      tools: {},
      totalVisits: 0,
      totalTools: 0,
      firstUse: new Date().toISOString(),
    };
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return {
        tools: {},
        totalVisits: 0,
        totalTools: 0,
        firstUse: new Date().toISOString(),
      };
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading usage data:", error);
    return {
      tools: {},
      totalVisits: 0,
      totalTools: 0,
      firstUse: new Date().toISOString(),
    };
  }
}

/**
 * Save usage data to localStorage
 */
function saveUsageData(data: UsageStats): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving usage data:", error);
  }
}

/**
 * Track a tool visit
 */
export function trackToolVisit(slug: string, name: string, category?: string): void {
  if (typeof window === "undefined") return;

  const data = getUsageData();
  const now = new Date().toISOString();

  if (!data.tools[slug]) {
    // First visit to this tool
    data.tools[slug] = {
      slug,
      name,
      visits: 1,
      firstVisit: now,
      lastVisit: now,
      totalTimeSpent: 0,
      category,
    };
    data.totalTools++;
  } else {
    // Update existing tool
    data.tools[slug].visits++;
    data.tools[slug].lastVisit = now;
    if (category && !data.tools[slug].category) {
      data.tools[slug].category = category;
    }
  }

  data.totalVisits++;
  
  // Set first use date if not set
  if (!data.firstUse) {
    data.firstUse = now;
  }

  saveUsageData(data);

  // Start session timer
  sessionStorage.setItem(SESSION_START_KEY, Date.now().toString());

  // Dispatch event for same-window updates (e.g., RecentTools component)
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("tool-visited"));
  }
}

/**
 * Track time spent on current page (call on unmount/beforeunload)
 */
export function trackTimeSpent(slug: string): void {
  if (typeof window === "undefined") return;

  const startTime = sessionStorage.getItem(SESSION_START_KEY);
  if (!startTime) return;

  const timeSpent = Math.floor((Date.now() - parseInt(startTime)) / 1000);
  
  const data = getUsageData();
  if (data.tools[slug]) {
    data.tools[slug].totalTimeSpent += timeSpent;
    saveUsageData(data);
  }

  sessionStorage.removeItem(SESSION_START_KEY);
}

/**
 * Get most used tools
 */
export function getMostUsedTools(limit = 10): ToolUsage[] {
  const data = getUsageData();
  return Object.values(data.tools)
    .sort((a, b) => b.visits - a.visits)
    .slice(0, limit);
}

/**
 * Get recently used tools
 */
export function getRecentlyUsedTools(limit = 10): ToolUsage[] {
  const data = getUsageData();
  return Object.values(data.tools)
    .sort((a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime())
    .slice(0, limit);
}

/**
 * Get usage stats for a date range
 */
export function getDateRangeStats(days: number): {
  tools: ToolUsage[];
  totalVisits: number;
} {
  const data = getUsageData();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const tools = Object.values(data.tools).filter(
    (tool) => new Date(tool.lastVisit) >= cutoffDate
  );

  return {
    tools,
    totalVisits: tools.reduce((sum, tool) => sum + tool.visits, 0),
  };
}

/**
 * Get category usage breakdown
 */
export function getCategoryStats(): Record<string, number> {
  const data = getUsageData();
  const categories: Record<string, number> = {};

  Object.values(data.tools).forEach((tool) => {
    const category = tool.category || "uncategorized";
    categories[category] = (categories[category] || 0) + tool.visits;
  });

  return categories;
}

/**
 * Clear all usage data (for privacy/reset)
 */
export function clearUsageData(): void {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(SESSION_START_KEY);
}

/**
 * Export usage data as JSON
 */
export function exportUsageData(): string {
  const data = getUsageData();
  return JSON.stringify(data, null, 2);
}

/**
 * Calculate days since first use
 */
export function getDaysSinceFirstUse(): number {
  const data = getUsageData();
  if (!data.firstUse) return 0;
  
  const first = new Date(data.firstUse);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - first.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
