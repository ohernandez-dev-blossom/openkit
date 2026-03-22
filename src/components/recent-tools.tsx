"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Clock, Trash2 } from "lucide-react";
import { getRecentlyUsedTools, clearUsageData, type ToolUsage } from "@/lib/usage-tracker";

interface Tool {
  name: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  category: string;
  tags: string[];
}

interface RecentToolsProps {
  allTools: Tool[];
  maxItems?: number;
}

export function RecentTools({ allTools, maxItems = 8 }: RecentToolsProps) {
  const [recentTools, setRecentTools] = useState<ToolUsage[]>([]);

  const loadRecentTools = useCallback(() => {
    const recent = getRecentlyUsedTools(maxItems);
    setRecentTools(recent);
  }, [maxItems]);

  useEffect(() => {
    loadRecentTools();

    // Listen for storage changes (when tools are used)
    const handleStorageChange = () => {
      loadRecentTools();
    };

    window.addEventListener("storage", handleStorageChange);
    // Also listen for custom event from same-window updates
    window.addEventListener("tool-visited", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("tool-visited", handleStorageChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClearHistory = () => {
    if (confirm("Clear your recent tools history? This will not affect your pinned tools or usage analytics.")) {
      clearUsageData();
      setRecentTools([]);
    }
  };

  // Map recent tool slugs to full tool data
  const recentToolsData = recentTools
    .map((recentTool) => {
      const tool = allTools.find((t) => t.href === `/${recentTool.slug}`);
      if (!tool) return null;
      return {
        ...tool,
        lastVisit: recentTool.lastVisit,
        visits: recentTool.visits,
      };
    })
    .filter((tool): tool is NonNullable<typeof tool> => tool !== null);

  if (recentToolsData.length === 0) return null;

  const formatTimeAgo = (lastVisit: string) => {
    const now = new Date();
    const visit = new Date(lastVisit);
    const diffMs = now.getTime() - visit.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return `${Math.floor(diffDays / 7)}w ago`;
  };

  return (
    <div className="mb-8" data-section="recent-tools">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <h2 className="text-lg font-semibold">Recent Tools</h2>
          <span className="text-xs text-muted-foreground/70 bg-card/50 px-2 py-0.5 rounded-full">
            {recentToolsData.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleClearHistory}
            className="text-xs text-muted-foreground hover:text-red-400 active:text-red-500 transition-all duration-150 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded px-1"
            title="Clear recent tools history"
            aria-label="Clear recent tools history"
          >
            <Trash2 className="w-3 h-3" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {recentToolsData.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group relative p-3 bg-card border border-border rounded-xl hover:border-border/80 hover:bg-muted/50 transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform text-white`}
              >
                {tool.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm mb-0.5 group-hover:text-white transition truncate">
                  {tool.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTimeAgo(tool.lastVisit)}
                  </span>
                  {tool.visits > 1 && (
                    <>
                      <span>•</span>
                      <span>{tool.visits} visits</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-3 text-xs text-muted-foreground/70 flex items-center gap-1">
        <span>💡</span>
        <span>Recent tools are tracked automatically.</span>
      </div>
    </div>
  );
}
