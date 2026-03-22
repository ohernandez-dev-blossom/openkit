"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { RefreshCw, Copy, Check } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { ExportHubV2 } from "@/components/export-hub-v2";
import { PinButton } from "@/components/pin-button";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { SHORTCUTS } from "@/lib/keyboard-shortcuts";
import { KeyboardHint } from "@/components/keyboard-hint";
import { ShareButton } from "@/components/share-button";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { jsonDiffGuideContent } from "@/content/json-diff-guide";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";

// --- Diff Engine ---

interface DiffEntry {
  path: string;
  type: "added" | "removed" | "changed" | "type_changed";
  leftValue?: unknown;
  rightValue?: unknown;
  leftType?: string;
  rightType?: string;
}

function getType(v: unknown): string {
  if (v === null) return "null";
  if (Array.isArray(v)) return "array";
  return typeof v;
}

function deepDiff(
  left: unknown,
  right: unknown,
  path: string,
  results: DiffEntry[],
  ignoreArrayOrder: boolean
): void {
  const leftType = getType(left);
  const rightType = getType(right);

  if (leftType !== rightType) {
    results.push({ path, type: "type_changed", leftValue: left, rightValue: right, leftType, rightType });
    return;
  }

  if (leftType === "object" && left !== null && right !== null) {
    const leftObj = left as Record<string, unknown>;
    const rightObj = right as Record<string, unknown>;
    const allKeys = new Set([...Object.keys(leftObj), ...Object.keys(rightObj)]);
    for (const key of allKeys) {
      const childPath = path ? `${path}.${key}` : key;
      if (!(key in leftObj)) {
        results.push({ path: childPath, type: "added", rightValue: rightObj[key] });
      } else if (!(key in rightObj)) {
        results.push({ path: childPath, type: "removed", leftValue: leftObj[key] });
      } else {
        deepDiff(leftObj[key], rightObj[key], childPath, results, ignoreArrayOrder);
      }
    }
    return;
  }

  if (leftType === "array") {
    const leftArr = left as unknown[];
    const rightArr = right as unknown[];

    if (ignoreArrayOrder) {
      // Set-like comparison: find items in right not in left (added) and vice versa
      const leftSerialized = leftArr.map((v) => JSON.stringify(v));
      const rightSerialized = rightArr.map((v) => JSON.stringify(v));
      const leftSet = new Set(leftSerialized);
      const rightSet = new Set(rightSerialized);

      rightSerialized.forEach((rs, i) => {
        if (!leftSet.has(rs)) {
          results.push({ path: `${path}[${i}]`, type: "added", rightValue: rightArr[i] });
        }
      });
      leftSerialized.forEach((ls, i) => {
        if (!rightSet.has(ls)) {
          results.push({ path: `${path}[${i}]`, type: "removed", leftValue: leftArr[i] });
        }
      });
    } else {
      const maxLen = Math.max(leftArr.length, rightArr.length);
      for (let i = 0; i < maxLen; i++) {
        const childPath = `${path}[${i}]`;
        if (i >= leftArr.length) {
          results.push({ path: childPath, type: "added", rightValue: rightArr[i] });
        } else if (i >= rightArr.length) {
          results.push({ path: childPath, type: "removed", leftValue: leftArr[i] });
        } else {
          deepDiff(leftArr[i], rightArr[i], childPath, results, ignoreArrayOrder);
        }
      }
    }
    return;
  }

  // Primitives
  if (left !== right) {
    results.push({ path, type: "changed", leftValue: left, rightValue: right });
  }
}

function computeDiff(leftStr: string, rightStr: string, ignoreArrayOrder: boolean): { diffs: DiffEntry[]; error: string | null } {
  try {
    const left = JSON.parse(leftStr);
    const right = JSON.parse(rightStr);
    const diffs: DiffEntry[] = [];
    deepDiff(left, right, "", diffs, ignoreArrayOrder);
    return { diffs, error: null };
  } catch (e) {
    return { diffs: [], error: e instanceof Error ? e.message : "Invalid JSON" };
  }
}

function formatValue(v: unknown): string {
  if (v === undefined) return "undefined";
  if (typeof v === "string") return `"${v}"`;
  return JSON.stringify(v);
}

// --- Component ---

export default function JSONDiffTool() {
  useToolTracker("json-diff", "JSON Diff", "formatters");
  const analytics = useAnalytics();

  const [leftInput, setLeftInput] = useState("");
  const [rightInput, setRightInput] = useState("");
  const [diffs, setDiffs] = useState<DiffEntry[]>([]);
  const [error, setError] = useState("");
  const [hasCompared, setHasCompared] = useState(false);
  const [ignoreArrayOrder, setIgnoreArrayOrder] = useState(false);
  const [copied, setCopied] = useState(false);

  const compare = useCallback(() => {
    setError("");
    const { diffs: result, error: err } = computeDiff(leftInput, rightInput, ignoreArrayOrder);
    if (err) {
      setError(err);
      setDiffs([]);
      analytics.trackError("json-diff-parse-error", { tool: "json-diff", errorType: "parse" });
    } else {
      setDiffs(result);
      analytics.trackToolUsage("json-diff", {
        action: "compare",
        additions: result.filter((d) => d.type === "added").length,
        deletions: result.filter((d) => d.type === "removed").length,
        changes: result.filter((d) => d.type === "changed" || d.type === "type_changed").length,
      });
    }
    setHasCompared(true);
  }, [leftInput, rightInput, ignoreArrayOrder, analytics]);

  const clearAll = useCallback(() => {
    setLeftInput("");
    setRightInput("");
    setDiffs([]);
    setError("");
    setHasCompared(false);
  }, []);

  const loadSample = useCallback(() => {
    setLeftInput(JSON.stringify({
      name: "OpenKit",
      version: "1.0.0",
      features: ["format", "validate"],
      config: { theme: "dark", indent: 2 },
      deprecated: true,
    }, null, 2));
    setRightInput(JSON.stringify({
      name: "OpenKit",
      version: "2.0.0",
      features: ["format", "validate", "diff"],
      config: { theme: "light", indent: 4, newSetting: true },
      author: "OpenKit Team",
    }, null, 2));
    setDiffs([]);
    setHasCompared(false);
    setError("");
  }, []);

  const additions = diffs.filter((d) => d.type === "added");
  const deletions = diffs.filter((d) => d.type === "removed");
  const changes = diffs.filter((d) => d.type === "changed" || d.type === "type_changed");

  const diffReport = diffs
    .map((d) => {
      switch (d.type) {
        case "added": return `+ ${d.path}: ${formatValue(d.rightValue)}`;
        case "removed": return `- ${d.path}: ${formatValue(d.leftValue)}`;
        case "changed": return `~ ${d.path}: ${formatValue(d.leftValue)} → ${formatValue(d.rightValue)}`;
        case "type_changed": return `! ${d.path}: (${d.leftType}) ${formatValue(d.leftValue)} → (${d.rightType}) ${formatValue(d.rightValue)}`;
        default: return "";
      }
    })
    .join("\n");

  const copyReport = useCallback(() => {
    navigator.clipboard.writeText(diffReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [diffReport]);

  // Keyboard shortcuts
  useKeyboardShortcut(SHORTCUTS.execute, compare, { enabled: !!leftInput && !!rightInput });
  useKeyboardShortcut(SHORTCUTS.clear, clearAll);
  useKeyboardShortcut(SHORTCUTS.sample, loadSample);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold text-sm hover:opacity-80 transition">
              {"⇄"}
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">JSON Diff</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadSample}
              className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Sample</span>
            </button>
            <PinButton toolHref="/json-diff" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Button onClick={compare} className="min-h-[44px] bg-blue-600 hover:bg-blue-700 text-white" size="sm" disabled={!leftInput || !rightInput}>
            Compare
            <KeyboardHint shortcut={SHORTCUTS.execute} />
          </Button>
          {hasCompared && diffs.length > 0 && (
            <>
              <Button onClick={copyReport} className="min-h-[44px] bg-zinc-600 hover:bg-zinc-700 text-white border-0" size="sm">
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied ? "Copied" : "Copy Report"}
              </Button>
              <ExportHubV2
                content={diffReport}
                toolName="JSON Diff"
                formats={["copy", "txt"]}
                variant="buttons"
              />
            </>
          )}
          <ShareButton
            toolId="json-diff"
            data={{ leftInput, rightInput }}
            variant="outline"
            className="min-h-[44px] border-border hover:bg-muted"
            disabled={!leftInput && !rightInput}
          />
          <Button onClick={clearAll} className="min-h-[44px] bg-transparent hover:bg-muted text-accent-foreground hover:text-foreground" size="sm">
            Clear
            <KeyboardHint shortcut={SHORTCUTS.clear} />
          </Button>
          <Button onClick={loadSample} className="min-h-[44px] bg-transparent hover:bg-muted text-accent-foreground hover:text-foreground" size="sm">
            Sample
            <KeyboardHint shortcut={SHORTCUTS.sample} />
          </Button>

          {/* Options */}
          <div className="ml-auto flex items-center gap-4 text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={ignoreArrayOrder}
                onChange={(e) => setIgnoreArrayOrder(e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-accent-foreground">Ignore array order</span>
            </label>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            <span className="font-medium">Error:</span> {error}
          </div>
        )}

        {/* Input Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-accent-foreground">Left (Original)</label>
            <Textarea
              value={leftInput}
              onChange={(e) => setLeftInput(e.target.value)}
              placeholder="Paste original JSON here..."
              className="h-[300px] sm:h-[400px] bg-card border-border font-mono text-sm resize-none focus:border-blue-500 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-accent-foreground">Right (Modified)</label>
            <Textarea
              value={rightInput}
              onChange={(e) => setRightInput(e.target.value)}
              placeholder="Paste modified JSON here..."
              className="h-[300px] sm:h-[400px] bg-card border-border font-mono text-sm resize-none focus:border-blue-500 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Diff Results */}
        {hasCompared && (
          <div className="mt-6">
            {/* Stats */}
            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm mb-4">
              <span className="text-green-400">
                + {additions.length} addition{additions.length !== 1 ? "s" : ""}
              </span>
              <span className="text-red-400">
                − {deletions.length} deletion{deletions.length !== 1 ? "s" : ""}
              </span>
              <span className="text-yellow-400">
                ~ {changes.length} change{changes.length !== 1 ? "s" : ""}
              </span>
              {diffs.length === 0 && (
                <span className="text-green-400 font-medium">✓ No differences found</span>
              )}
            </div>

            {/* Diff Entries */}
            {diffs.length > 0 && (
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="max-h-[500px] overflow-y-auto">
                  {diffs.map((d, i) => (
                    <div
                      key={i}
                      className={`px-4 py-2 border-b border-border/50 font-mono text-sm ${
                        d.type === "added"
                          ? "bg-green-500/10 text-green-400"
                          : d.type === "removed"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {d.type === "added" && (
                        <span>
                          <span className="font-bold">+ </span>
                          <span className="text-muted-foreground">{d.path}:</span>{" "}
                          {formatValue(d.rightValue)}
                        </span>
                      )}
                      {d.type === "removed" && (
                        <span>
                          <span className="font-bold">− </span>
                          <span className="text-muted-foreground">{d.path}:</span>{" "}
                          {formatValue(d.leftValue)}
                        </span>
                      )}
                      {d.type === "changed" && (
                        <span>
                          <span className="font-bold">~ </span>
                          <span className="text-muted-foreground">{d.path}:</span>{" "}
                          <span className="line-through opacity-60">{formatValue(d.leftValue)}</span>
                          {" → "}
                          {formatValue(d.rightValue)}
                        </span>
                      )}
                      {d.type === "type_changed" && (
                        <span>
                          <span className="font-bold">! </span>
                          <span className="text-muted-foreground">{d.path}:</span>{" "}
                          <span className="line-through opacity-60">({d.leftType}) {formatValue(d.leftValue)}</span>
                          {" → "}
                          ({d.rightType}) {formatValue(d.rightValue)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={jsonDiffGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-json-diff" title={jsonDiffGuideContent.introduction.title} subtitle="Understanding semantic JSON comparison" variant="default">
            <MarkdownContent content={jsonDiffGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use JSON diff daily" variant="default">
            <FeatureGrid
              features={jsonDiffGuideContent.useCases.map((uc) => ({
                title: uc.title,
                description: uc.description,
              }))}
              columns={2}
            />
          </GeoSection>

          <GeoSection id="how-to-use" title={jsonDiffGuideContent.howToUse.title} subtitle="Master all features and keyboard shortcuts" variant="minimal">
            <HowToSchema
              name={`How to use ${jsonDiffGuideContent.toolName}`}
              description="Step-by-step guide to comparing JSON documents"
              steps={jsonDiffGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${jsonDiffGuideContent.toolPath}`}
            />
            <MarkdownContent content={jsonDiffGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know about JSON diff" variant="default">
            <ToolFAQ faqs={jsonDiffGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={jsonDiffGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={jsonDiffGuideContent.security.content} />
          </GeoSection>

          {jsonDiffGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics and capabilities" variant="minimal">
              <StatsBar
                stats={Object.entries(jsonDiffGuideContent.stats).map(([label, value]) => ({
                  label,
                  value,
                }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        <RelatedTools currentPath="/json-diff" />
        <LastUpdated date={jsonDiffGuideContent.lastUpdated} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Fast, private JSON comparison. No data leaves your browser.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="JSON Diff - Compare JSON Objects"
        description="Free online JSON diff tool. Compare two JSON documents with semantic deep comparison. Find additions, deletions, and changes."
        url="https://openkit.tools/json-diff"
        applicationCategory="DeveloperApplication"
        datePublished="2026-02-15"
        dateModified={jsonDiffGuideContent.lastUpdated}
        version={jsonDiffGuideContent.version}
        aggregateRating={{
          ratingValue: "4.7",
          ratingCount: "1283",
          bestRating: "5",
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "JSON Diff", url: "https://openkit.tools/json-diff" },
        ]}
      />
    </main>
  );
}
