"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { tools } from "@/lib/tool-registry";

/**
 * Global top navbar shown on ALL pages.
 * - Tool pages: Breadcrumb navigation
 */
export function ToolBreadcrumb() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Don't show on homepage (HeroSection has its own navbar)
  if (isHome) return null;

  // Find the tool by path
  const currentTool = tools.find((t) => t.href === pathname);

  // Fallback: generate name from slug if tool not found
  const segments = pathname.split("/").filter(Boolean);
  const toolSlug = segments[0] || "";
  const toolName = currentTool?.name || toolSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const categoryName = currentTool?.category
    ? currentTool.category.charAt(0).toUpperCase() + currentTool.category.slice(1)
    : null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-border/50 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
        {/* Left: Breadcrumb */}
        <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors rounded px-1.5 py-0.5 -ml-1.5 hover:bg-muted"
              >
                <Home className="w-3 h-3" />
                <span>Home</span>
              </Link>
            </li>

            {categoryName && categoryName !== "All" && (
              <>
                <li className="flex items-center">
                  <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
                </li>
                <li>
                  <Link
                    href={`/?category=${currentTool?.category}`}
                    className="hover:text-foreground transition-colors rounded px-1.5 py-0.5 hover:bg-muted"
                  >
                    {categoryName}
                  </Link>
                </li>
              </>
            )}

            <li className="flex items-center">
              <ChevronRight className="w-3 h-3 text-muted-foreground/50" />
            </li>
            <li>
              <span className="text-foreground/70 font-medium px-1.5 py-0.5">
                {toolName}
              </span>
            </li>
          </ol>

      </div>
    </nav>
  );
}
