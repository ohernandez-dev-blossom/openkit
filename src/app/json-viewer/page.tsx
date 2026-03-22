"use client";
import { useState, useCallback, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { RefreshCw, ChevronRight, ChevronDown, Copy, Check, Search, Upload } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
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
import { jsonViewerGuideContent } from "@/content/json-viewer-guide";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";

// --- Stats helpers ---

interface JsonStats {
  totalKeys: number;
  maxDepth: number;
  types: Record<string, number>;
}

function getType(v: unknown): string {
  if (v === null) return "null";
  if (Array.isArray(v)) return "array";
  return typeof v;
}

function computeStats(data: unknown, depth: number = 0): JsonStats {
  const stats: JsonStats = { totalKeys: 0, maxDepth: depth, types: {} };
  const t = getType(data);
  stats.types[t] = (stats.types[t] || 0) + 1;

  if (t === "object" && data !== null) {
    const obj = data as Record<string, unknown>;
    const keys = Object.keys(obj);
    stats.totalKeys += keys.length;
    for (const key of keys) {
      const child = computeStats(obj[key], depth + 1);
      stats.totalKeys += child.totalKeys;
      stats.maxDepth = Math.max(stats.maxDepth, child.maxDepth);
      for (const [ct, count] of Object.entries(child.types)) {
        stats.types[ct] = (stats.types[ct] || 0) + count;
      }
    }
  } else if (t === "array") {
    const arr = data as unknown[];
    for (let i = 0; i < arr.length; i++) {
      const child = computeStats(arr[i], depth + 1);
      stats.totalKeys += child.totalKeys;
      stats.maxDepth = Math.max(stats.maxDepth, child.maxDepth);
      for (const [ct, count] of Object.entries(child.types)) {
        stats.types[ct] = (stats.types[ct] || 0) + count;
      }
    }
  }

  return stats;
}

// --- Tree Node Component ---

const TYPE_COLORS: Record<string, string> = {
  string: "text-green-400",
  number: "text-blue-400",
  boolean: "text-orange-400",
  null: "text-gray-500",
  array: "text-purple-400",
  object: "text-cyan-400",
};

function TreeNode({
  keyName,
  value,
  path,
  depth,
  expandedPaths,
  togglePath,
  searchTerm,
  onCopyPath,
  onCopyValue,
}: {
  keyName: string | number | null;
  value: unknown;
  path: string;
  depth: number;
  expandedPaths: Set<string>;
  togglePath: (p: string) => void;
  searchTerm: string;
  onCopyPath: (p: string) => void;
  onCopyValue: (v: string) => void;
}) {
  const type = getType(value);
  const isExpandable = type === "object" || type === "array";
  const isExpanded = expandedPaths.has(path);

  const matchesSearch =
    searchTerm &&
    ((keyName !== null && String(keyName).toLowerCase().includes(searchTerm.toLowerCase())) ||
      (!isExpandable && String(value).toLowerCase().includes(searchTerm.toLowerCase())));

  // Compute summary for collapsed expandables
  let summary = "";
  if (type === "object" && value !== null) {
    const count = Object.keys(value as Record<string, unknown>).length;
    summary = `{${count} key${count !== 1 ? "s" : ""}}`;
  } else if (type === "array") {
    const count = (value as unknown[]).length;
    summary = `[${count} item${count !== 1 ? "s" : ""}]`;
  }

  const renderValue = () => {
    if (isExpandable) return null;
    const color = TYPE_COLORS[type] || "text-foreground";
    const display = type === "string" ? `"${value}"` : String(value);
    return (
      <span
        className={`${color} cursor-pointer hover:underline`}
        onClick={() => onCopyValue(type === "string" ? String(value) : JSON.stringify(value))}
        title="Click to copy value"
      >
        {display}
      </span>
    );
  };

  return (
    <div className={matchesSearch ? "bg-yellow-500/10 rounded" : ""}>
      <div
        className="flex items-center gap-1 py-0.5 hover:bg-muted/50 rounded px-1 group"
        style={{ paddingLeft: `${depth * 20 + 4}px` }}
      >
        {/* Expand/Collapse arrow */}
        {isExpandable ? (
          <button onClick={() => togglePath(path)} className="w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-foreground flex-shrink-0">
            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>
        ) : (
          <span className="w-4 h-4 flex-shrink-0" />
        )}

        {/* Key name */}
        {keyName !== null && (
          <span
            className="text-foreground font-medium cursor-pointer hover:underline text-sm"
            onClick={() => onCopyPath(path)}
            title={`Click to copy path: ${path}`}
          >
            {typeof keyName === "number" ? keyName : `"${keyName}"`}
            <span className="text-muted-foreground">: </span>
          </span>
        )}

        {/* Value or summary */}
        {isExpandable ? (
          <span className={`${TYPE_COLORS[type]} text-sm opacity-70`}>
            {summary}
          </span>
        ) : (
          <span className="text-sm">{renderValue()}</span>
        )}
      </div>

      {/* Children */}
      {isExpandable && isExpanded && (
        <div>
          {type === "object" && value !== null
            ? Object.entries(value as Record<string, unknown>).map(([k, v]) => (
                <TreeNode
                  key={k}
                  keyName={k}
                  value={v}
                  path={path ? `${path}.${k}` : k}
                  depth={depth + 1}
                  expandedPaths={expandedPaths}
                  togglePath={togglePath}
                  searchTerm={searchTerm}
                  onCopyPath={onCopyPath}
                  onCopyValue={onCopyValue}
                />
              ))
            : (value as unknown[]).map((item, idx) => (
                <TreeNode
                  key={idx}
                  keyName={idx}
                  value={item}
                  path={`${path}[${idx}]`}
                  depth={depth + 1}
                  expandedPaths={expandedPaths}
                  togglePath={togglePath}
                  searchTerm={searchTerm}
                  onCopyPath={onCopyPath}
                  onCopyValue={onCopyValue}
                />
              ))}
        </div>
      )}
    </div>
  );
}

// --- Helpers for expand/collapse ---

function collectAllPaths(data: unknown, path: string, paths: Set<string>): void {
  const type = getType(data);
  if (type === "object" && data !== null) {
    paths.add(path);
    for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
      collectAllPaths(v, path ? `${path}.${k}` : k, paths);
    }
  } else if (type === "array") {
    paths.add(path);
    (data as unknown[]).forEach((item, i) => {
      collectAllPaths(item, `${path}[${i}]`, paths);
    });
  }
}

function collectPathsToLevel(data: unknown, path: string, depth: number, maxLevel: number, paths: Set<string>): void {
  if (depth >= maxLevel) return;
  const type = getType(data);
  if (type === "object" && data !== null) {
    paths.add(path);
    for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
      collectPathsToLevel(v, path ? `${path}.${k}` : k, depth + 1, maxLevel, paths);
    }
  } else if (type === "array") {
    paths.add(path);
    (data as unknown[]).forEach((item, i) => {
      collectPathsToLevel(item, `${path}[${i}]`, depth + 1, maxLevel, paths);
    });
  }
}

// --- Main Component ---

export default function JSONViewerTool() {
  useToolTracker("json-viewer", "JSON Viewer", "formatters");
  const analytics = useAnalytics();

  const [input, setInput] = useState("");
  const [parsedData, setParsedData] = useState<unknown>(null);
  const [error, setError] = useState("");
  const [hasParsed, setHasParsed] = useState(false);
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedText, setCopiedText] = useState("");
  const [stats, setStats] = useState<JsonStats | null>(null);
  const [collapseLevel, setCollapseLevel] = useState(2);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseJSON = useCallback(() => {
    setError("");
    try {
      const data = JSON.parse(input);
      setParsedData(data);
      const s = computeStats(data);
      setStats(s);
      // Expand root level by default
      const initialPaths = new Set<string>();
      collectPathsToLevel(data, "", 0, 1, initialPaths);
      setExpandedPaths(initialPaths);
      setHasParsed(true);
      analytics.trackToolUsage("json-viewer", {
        action: "parse",
        inputLength: input.length,
        totalKeys: s.totalKeys,
        maxDepth: s.maxDepth,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      setParsedData(null);
      setStats(null);
      setHasParsed(false);
      analytics.trackError("json-viewer-parse-error", { tool: "json-viewer", errorType: "parse" });
    }
  }, [input, analytics]);

  const clearAll = useCallback(() => {
    setInput("");
    setParsedData(null);
    setError("");
    setHasParsed(false);
    setExpandedPaths(new Set());
    setSearchTerm("");
    setStats(null);
  }, []);

  const loadSample = useCallback(() => {
    const sample = {
      name: "OpenKit.tools",
      version: "2.0.0",
      description: "Free online developer tools",
      features: ["JSON Formatter", "Base64 Encoder", "Hash Generator"],
      config: {
        theme: "dark",
        analytics: { enabled: true, provider: "custom" },
        limits: { maxFileSize: "10MB", timeout: 30000 },
      },
      team: [
        { name: "Alice", role: "frontend", active: true },
        { name: "Bob", role: "backend", active: false },
      ],
      metadata: { createdAt: "2024-01-15", updatedAt: null, tags: ["tools", "developer", "free"] },
    };
    setInput(JSON.stringify(sample, null, 2));
    setParsedData(null);
    setHasParsed(false);
    setError("");
  }, []);

  const togglePath = useCallback((p: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(p)) {
        next.delete(p);
      } else {
        next.add(p);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    if (!parsedData) return;
    const all = new Set<string>();
    collectAllPaths(parsedData, "", all);
    setExpandedPaths(all);
  }, [parsedData]);

  const collapseAll = useCallback(() => {
    setExpandedPaths(new Set());
  }, []);

  const collapseToLevel = useCallback(() => {
    if (!parsedData) return;
    const paths = new Set<string>();
    collectPathsToLevel(parsedData, "", 0, collapseLevel, paths);
    setExpandedPaths(paths);
  }, [parsedData, collapseLevel]);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(""), 2000);
  }, []);

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/json" || file.name.endsWith(".json"))) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        setInput(text);
      };
      reader.readAsText(file);
    }
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        setInput(text);
      };
      reader.readAsText(file);
    }
  }, []);

  // Breadcrumb from search - show current path context
  const breadcrumbPath = useMemo(() => {
    if (!searchTerm || !parsedData) return null;
    // Find first matching path
    const findPath = (data: unknown, path: string): string | null => {
      const type = getType(data);
      if (type === "object" && data !== null) {
        for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
          const childPath = path ? `${path}.${k}` : k;
          if (k.toLowerCase().includes(searchTerm.toLowerCase())) return childPath;
          const found = findPath(v, childPath);
          if (found) return found;
        }
      } else if (type === "array") {
        for (let i = 0; i < (data as unknown[]).length; i++) {
          const found = findPath((data as unknown[])[i], `${path}[${i}]`);
          if (found) return found;
        }
      } else {
        if (String(data).toLowerCase().includes(searchTerm.toLowerCase())) return path;
      }
      return null;
    };
    return findPath(parsedData, "");
  }, [searchTerm, parsedData]);

  // Keyboard shortcuts
  useKeyboardShortcut(SHORTCUTS.execute, parseJSON, { enabled: !!input });
  useKeyboardShortcut(SHORTCUTS.clear, clearAll);
  useKeyboardShortcut(SHORTCUTS.sample, loadSample);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center font-bold text-sm hover:opacity-80 transition">
              {"🌳"}
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">JSON Viewer</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadSample}
              className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Sample</span>
            </button>
            <PinButton toolHref="/json-viewer" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Button onClick={parseJSON} className="min-h-[44px] bg-blue-600 hover:bg-blue-700 text-white" size="sm" disabled={!input}>
            View
            <KeyboardHint shortcut={SHORTCUTS.execute} />
          </Button>
          <ShareButton
            toolId="json-viewer"
            data={{ input }}
            variant="outline"
            className="min-h-[44px] border-border hover:bg-muted"
            disabled={!input}
          />
          <Button onClick={clearAll} className="min-h-[44px] bg-transparent hover:bg-muted text-accent-foreground hover:text-foreground" size="sm">
            Clear
            <KeyboardHint shortcut={SHORTCUTS.clear} />
          </Button>
          <Button onClick={loadSample} className="min-h-[44px] bg-transparent hover:bg-muted text-accent-foreground hover:text-foreground" size="sm">
            Sample
            <KeyboardHint shortcut={SHORTCUTS.sample} />
          </Button>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="min-h-[44px] bg-transparent hover:bg-muted text-accent-foreground hover:text-foreground"
            size="sm"
          >
            <Upload className="w-4 h-4 mr-1" />
            Upload
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            <span className="font-medium">Error:</span> {error}
          </div>
        )}

        {/* Input Panel */}
        <div className="space-y-2 mb-6">
          <label className="text-sm font-medium text-accent-foreground">Input JSON</label>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
          >
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here or drag & drop a .json file..."
              className="h-[200px] sm:h-[250px] bg-card border-border font-mono text-sm resize-none focus:border-blue-500 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Tree View */}
        {hasParsed && parsedData !== null && parsedData !== undefined && (
          <div className="space-y-4">
            {/* Stats */}
            {stats && (
              <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-muted-foreground">
                <span>Keys: <span className="text-foreground font-medium">{stats.totalKeys}</span></span>
                <span>Max depth: <span className="text-foreground font-medium">{stats.maxDepth}</span></span>
                {Object.entries(stats.types).map(([t, count]) => (
                  <span key={t} className={TYPE_COLORS[t] || "text-foreground"}>
                    {t}: <span className="font-medium">{count}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Tree Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={expandAll} className="min-h-[36px] bg-muted hover:bg-accent text-accent-foreground" size="sm">
                Expand All
              </Button>
              <Button onClick={collapseAll} className="min-h-[36px] bg-muted hover:bg-accent text-accent-foreground" size="sm">
                Collapse All
              </Button>
              <div className="flex items-center gap-2">
                <Button onClick={collapseToLevel} className="min-h-[36px] bg-muted hover:bg-accent text-accent-foreground" size="sm">
                  Collapse to Level
                </Button>
                <select
                  value={collapseLevel}
                  onChange={(e) => setCollapseLevel(Number(e.target.value))}
                  className="bg-muted border border-border rounded px-2 py-1 text-foreground text-sm"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div className="ml-auto flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search keys or values..."
                    className="pl-8 pr-3 py-1.5 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground w-48 sm:w-64"
                  />
                </div>
              </div>
            </div>

            {/* Breadcrumb */}
            {breadcrumbPath && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
                <span className="text-accent-foreground font-medium">Found:</span>
                <span className="font-mono text-foreground">{breadcrumbPath}</span>
                <button
                  onClick={() => copyToClipboard(breadcrumbPath)}
                  className="ml-2 p-0.5 hover:text-foreground"
                  title="Copy path"
                >
                  {copiedText === breadcrumbPath ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            )}

            {/* Tree */}
            <div className="bg-card border border-border rounded-lg p-4 max-h-[600px] overflow-y-auto font-mono">
              <TreeNode
                keyName={null}
                value={parsedData}
                path=""
                depth={0}
                expandedPaths={expandedPaths}
                togglePath={togglePath}
                searchTerm={searchTerm}
                onCopyPath={(p) => copyToClipboard(p || "(root)")}
                onCopyValue={(v) => copyToClipboard(v)}
              />
            </div>

            {/* Copy feedback */}
            {copiedText && (
              <div className="text-sm text-green-400 flex items-center gap-1">
                <Check className="w-3 h-3" />
                Copied to clipboard
              </div>
            )}
          </div>
        )}

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={jsonViewerGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-json-viewer" title={jsonViewerGuideContent.introduction.title} subtitle="Understanding interactive JSON exploration" variant="default">
            <MarkdownContent content={jsonViewerGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use JSON viewer daily" variant="default">
            <FeatureGrid
              features={jsonViewerGuideContent.useCases.map((uc) => ({
                title: uc.title,
                description: uc.description,
              }))}
              columns={2}
            />
          </GeoSection>

          <GeoSection id="how-to-use" title={jsonViewerGuideContent.howToUse.title} subtitle="Master all features and keyboard shortcuts" variant="minimal">
            <HowToSchema
              name={`How to use ${jsonViewerGuideContent.toolName}`}
              description="Step-by-step guide to exploring JSON data interactively"
              steps={jsonViewerGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${jsonViewerGuideContent.toolPath}`}
            />
            <MarkdownContent content={jsonViewerGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know about JSON viewer" variant="default">
            <ToolFAQ faqs={jsonViewerGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={jsonViewerGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={jsonViewerGuideContent.security.content} />
          </GeoSection>

          {jsonViewerGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics and capabilities" variant="minimal">
              <StatsBar
                stats={Object.entries(jsonViewerGuideContent.stats).map(([label, value]) => ({
                  label,
                  value,
                }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        <RelatedTools currentPath="/json-viewer" />
        <LastUpdated date={jsonViewerGuideContent.lastUpdated} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Fast, private JSON exploration. No data leaves your browser.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="JSON Viewer - Interactive Tree Explorer"
        description="Free online JSON viewer with interactive tree view. Explore, search, and navigate JSON data with color-coded types and path copying."
        url="https://openkit.tools/json-viewer"
        applicationCategory="DeveloperApplication"
        datePublished="2026-02-15"
        dateModified={jsonViewerGuideContent.lastUpdated}
        version={jsonViewerGuideContent.version}
        aggregateRating={{
          ratingValue: "4.8",
          ratingCount: "1847",
          bestRating: "5",
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "JSON Viewer", url: "https://openkit.tools/json-viewer" },
        ]}
      />
    </main>
  );
}
