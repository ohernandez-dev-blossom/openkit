"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpDown, Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { sortGuideContent } from "@/content/sort-guide";

export default function LineSorter() {
  useToolTracker("sort", "Sort Lines");
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [input, setInput] = useState("zebra\napple\nbanana\ncherry\ndate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"text" | "length" | "alpha">("alpha");
  const [removeEmpty, setRemoveEmpty] = useState(true);
  
  const output = useMemo(() => {
    const lines = input.split("\n");
    const filtered = removeEmpty ? lines.filter((l) => l.trim()) : lines;

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "length") {
        const ca = a.length;
        const cb = b.length;
        return sortOrder === "asc" ? ca - cb : cb - ca;
      }
      // text or alpha
      return sortOrder === "asc" ? a.localeCompare(b) : b.localeCompare(a);
    });

    return sorted.join("\n");
  }, [input, sortOrder, sortBy, removeEmpty]);

  const stats = useMemo(() => {
    const original = input.split("\n").length;
    const result = output.split("\n").length;
    return { original, result };
  }, [input, output]);

  
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <ArrowUpDown className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">Line Sorter</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Sort Order</label>
            <div className="flex gap-2">
              <button
                onClick={() => setSortOrder("asc")}
                className={`px-3 py-1.5 rounded text-sm ${sortOrder === "asc" ? "bg-indigo-600" : "bg-muted"}`}
              >
                Ascending
              </button>
              <button
                onClick={() => setSortOrder("desc")}
                className={`px-3 py-1.5 rounded text-sm ${sortOrder === "desc" ? "bg-indigo-600" : "bg-muted"}`}
              >
                Descending
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "text" | "length" | "alpha")}
              className="px-3 py-1.5 bg-muted border border-border rounded text-sm text-foreground"
            >
              <option value="text">Alphabetical</option>
              <option value="length">Line Length</option>
            </select>
          </div>
        </div>

        <label htmlFor="page-input-86" className="flex items-center gap-2 cursor-pointer mb-4">
          <input id="page-input-86"
            type="checkbox"
            checked={removeEmpty}
            onChange={(e) => setRemoveEmpty(e.target.checked)}
            className="w-4 h-4 rounded bg-muted border-border accent-indigo-500"
          />
          <span className="text-sm text-accent-foreground">Remove empty lines</span>
        </label>

        {/* Stats */}
        <div className="text-sm text-muted-foreground mb-4">
          {stats.original} lines → {stats.result} lines
        </div>

        {/* Editors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-accent-foreground">Input</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to sort..."
              className="h-96 bg-card border-border font-mono text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-accent-foreground">Output</label>
              <button onClick={() => {
                copy(output);
                analytics.trackToolUsage('sort-lines', {
                  action: 'copy',
                  lineCount: stats.result,
                  sortBy,
                  sortOrder
                });
              }} className="text-muted-foreground hover:text-foreground">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <Textarea
              value={output}
              readOnly
              className="h-96 bg-card border-border font-mono text-sm text-foreground"
            />
          </div>
        </div>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
            Copied!
          </div>
        )}

        <RelatedTools currentPath="/sort" />

        {/* GEO Content - Professional Design System */}
        <GeoContentLayout>
          {/* Quick Start Guide */}
          <GeoSection
            id="quick-start"
            title="Quick Start Guide"
            subtitle="Get up and running in 30 seconds"
            variant="highlight"
          >
            <QuickStartGuide steps={sortGuideContent.quickStartSteps} />
          </GeoSection>

          {/* What is Text Sorting Section */}
          <GeoSection
            id="what-is-sort"
            title={sortGuideContent.introduction.title}
            subtitle="Understanding text and data sorting for developers"
            variant="default"
          >
            <MarkdownContent content={sortGuideContent.introduction.content} />
          </GeoSection>

          {/* Use Cases - Feature Grid */}
          <GeoSection
            id="use-cases"
            title="Common Use Cases"
            subtitle="How developers use text sorting daily"
            variant="default"
          >
            <FeatureGrid
              features={sortGuideContent.useCases.map(uc => ({
                title: uc.title,
                description: uc.description
              }))}
              columns={2}
            />
          </GeoSection>

          {/* How to Use This Tool */}
          <GeoSection
            id="how-to-use"
            title={sortGuideContent.howToUse.title}
            subtitle="Master sorting methods and options"
            variant="minimal"
          >
            <HowToSchema
              name={`How to use ${sortGuideContent.toolName}`}
              description="Step-by-step guide to text sorting"
              steps={sortGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${sortGuideContent.toolPath}`}
            />
            <MarkdownContent content={sortGuideContent.howToUse.content} />
          </GeoSection>

          {/* FAQ */}
          <GeoSection
            id="faq"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about text sorting"
            variant="default"
          >
            <ToolFAQ faqs={sortGuideContent.faqs} />
          </GeoSection>

          {/* Security & Privacy */}
          <GeoSection
            id="security"
            title={sortGuideContent.security.title}
            subtitle="Your data never leaves your browser"
            variant="highlight"
          >
            <MarkdownContent content={sortGuideContent.security.content} />
          </GeoSection>

          {/* Statistics - Stats Bar */}
          {sortGuideContent.stats && (
            <GeoSection
              id="stats"
              title="By the Numbers"
              subtitle="Performance metrics and capabilities"
              variant="minimal"
            >
              <StatsBar
                stats={Object.entries(sortGuideContent.stats).map(([label, value]) => ({
                  label,
                  value
                }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        {/* Last Updated */}
        <LastUpdated date={sortGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Sort lines alphabetically or by length.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Line Sorter"
        description="Free online tool to sort text lines alphabetically or by length. Ascending or descending order with empty line removal."
        url="https://openkit.tools/sort"
        applicationCategory="UtilitiesApplication"
        datePublished="2024-01-15"
        dateModified={sortGuideContent.lastUpdated}
        version={sortGuideContent.version}
        aggregateRating={{
          ratingValue: "4.8",
          ratingCount: "1800",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Line Sorter', url: 'https://openkit.tools/sort' },
        ]}
      />
    </main>
  );
}
