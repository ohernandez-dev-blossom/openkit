"use client";

import Link from "next/link";
import { tools, categories, type Category, type Tool } from "@/lib/tool-registry";
import { Search, ArrowLeft } from "lucide-react";
import { useState, useMemo } from "react";

type CategoryLandingPageProps = {
  /** Category IDs to include tools from */
  categoryIds: Category[];
  /** Page title shown in the hero */
  title: string;
  /** Description shown below the title */
  description: string;
  /** Gradient classes for the title */
  titleGradient: string;
};

export function CategoryLandingPage({
  categoryIds,
  title,
  description,
  titleGradient,
}: CategoryLandingPageProps) {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<Category | "all">("all");

  const filteredByCategory = useMemo(
    () => tools.filter((t) => categoryIds.includes(t.category)),
    [categoryIds]
  );

  const activeCategories = useMemo(
    () => categories.filter((c) => categoryIds.includes(c.id)),
    [categoryIds]
  );

  const filteredTools = useMemo(() => {
    let result = filteredByCategory;

    if (activeFilter !== "all") {
      result = result.filter((t) => t.category === activeFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return result.sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredByCategory, activeFilter, search]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <div className="border-b border-border px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All tools
          </Link>
          <h1
            className={`text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent`}
          >
            {title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 border border-border rounded-full">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {filteredByCategory.length}
              </span>
              <span className="text-sm text-muted-foreground">tools available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Search */}
        <div className="relative mb-6">
          <input
            aria-label="Search tools"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${filteredByCategory.length} tools...`}
            className="w-full px-4 py-2.5 pl-10 bg-card border border-border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground/70"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category filters (if multiple categories) */}
        {activeCategories.length > 1 && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                activeFilter === "all"
                  ? "bg-muted/80 text-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border"
              }`}
            >
              All ({filteredByCategory.length})
            </button>
            {activeCategories.map((cat) => {
              const count = filteredByCategory.filter(
                (t) => t.category === cat.id
              ).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
                    activeFilter === cat.id
                      ? `bg-gradient-to-br ${cat.color} text-white`
                      : "bg-card text-muted-foreground hover:bg-muted border border-border"
                  }`}
                >
                  {cat.icon}
                  <span>
                    {cat.name} ({count})
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Results count */}
        <p className="text-xs text-muted-foreground mb-4">
          {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""}
          {search && " matching your search"}
        </p>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative p-3 bg-card border border-border rounded-xl shadow-refined-sm hover:shadow-refined transition-all duration-200 hover:border-border/80 hover:bg-muted/50"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform text-white`}
                >
                  {tool.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm mb-0.5 group-hover:text-foreground transition truncate">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {tool.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-muted-foreground mb-2">
              No tools found{search && ` for "${search}"`}
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveFilter("all");
              }}
              className="text-sm text-blue-400 hover:text-blue-300 transition"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Privacy note */}
        <div className="mt-12 text-center p-6 bg-card/50 border border-border rounded-xl">
          <p className="text-sm text-muted-foreground">
            🔒 All tools run entirely in your browser. No data is sent to any server.
          </p>
        </div>
      </div>
    </main>
  );
}
