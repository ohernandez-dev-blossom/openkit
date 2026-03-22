"use client";
import { useState, useCallback, useEffect, useRef, useTransition, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { RefreshCw, ChevronRight, ChevronDown, Search, Copy, TreePine, FileText, ChevronsDown, ChevronsUp } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { PresetManager, type PresetData } from "@/components/preset-manager";
import { ExportHubV2 } from "@/components/export-hub-v2";
import { PinButton } from "@/components/pin-button";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { SHORTCUTS } from "@/lib/keyboard-shortcuts";
import { KeyboardHint } from "@/components/keyboard-hint";
import { ShareButton } from "@/components/share-button";
import { useSharedData } from "@/hooks/use-shared-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { jsonGuideContent } from "@/content/json-guide";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";

// --- Syntax Highlighting ---

function highlightJSON(json: string, searchTerm: string): string {
  // Escape HTML first
  const escaped = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Tokenize and colorize
  const highlighted = escaped.replace(
    /("(?:\\.|[^"\\])*")\s*:/g, // keys
    '<span class="json-key">$1</span>:'
  ).replace(
    /:\s*("(?:\\.|[^"\\])*")/g, // string values
    ': <span class="json-string">$1</span>'
  ).replace(
    // standalone strings in arrays
    /(^\s*|[[,]\s*)("(?:\\.|[^"\\])*")(\s*[,\]\n])/gm,
    (match, before, str, after) => {
      // Don't re-highlight if already wrapped
      if (before.includes('json-key') || before.includes('json-string')) return match;
      return `${before}<span class="json-string">${str}</span>${after}`;
    }
  ).replace(
    /\b(-?\d+\.?\d*(?:[eE][+-]?\d+)?)\b/g, // numbers
    '<span class="json-number">$1</span>'
  ).replace(
    /\b(true|false)\b/g, // booleans
    '<span class="json-boolean">$1</span>'
  ).replace(
    /\bnull\b/g, // null
    '<span class="json-null">null</span>'
  );

  // Apply search highlighting
  if (searchTerm) {
    const escapedSearch = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedSearch})`, "gi");
    return highlighted.replace(regex, '<mark class="json-search-match">$1</mark>');
  }

  return highlighted;
}

// --- Tree View ---

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

function getTypeLabel(value: JsonValue): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return `array[${value.length}]`;
  if (typeof value === "object") return `object{${Object.keys(value).length}}`;
  return typeof value;
}

function getTypeColor(value: JsonValue): string {
  if (value === null) return "text-gray-400";
  if (typeof value === "string") return "text-green-400";
  if (typeof value === "number") return "text-blue-400";
  if (typeof value === "boolean") return "text-orange-400";
  if (Array.isArray(value)) return "text-yellow-500";
  return "text-purple-400";
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

interface TreeNodeProps {
  keyName: string | number | null;
  value: JsonValue;
  path: string;
  depth: number;
  searchTerm: string;
  expandedPaths: Set<string>;
  onToggle: (path: string) => void;
}

function TreeNode({ keyName, value, path, depth, searchTerm, expandedPaths, onToggle }: TreeNodeProps) {
  const isExpandable = value !== null && typeof value === "object";
  const isExpanded = expandedPaths.has(path);
  const [copied, setCopied] = useState(false);

  const handleCopyPath = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    copyToClipboard(path);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [path]);

  const matchesSearch = searchTerm && (
    (keyName !== null && String(keyName).toLowerCase().includes(searchTerm.toLowerCase())) ||
    (!isExpandable && String(value).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const highlightText = (text: string): React.ReactNode => {
    if (!searchTerm) return text;
    const escapedSearch = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedSearch})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i} className="bg-yellow-500/40 text-foreground rounded px-0.5">{part}</mark> : part
    );
  };

  const renderValue = () => {
    if (isExpandable) {
      const entries = Array.isArray(value) ? value.map((v, i) => [i, v] as const) : Object.entries(value);
      return (
        <>
          <div
            className={`flex items-center gap-1 group cursor-pointer hover:bg-muted/50 rounded px-1 py-0.5 ${matchesSearch ? "bg-yellow-500/10" : ""}`}
            onClick={() => onToggle(path)}
          >
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />}
            {keyName !== null && (
              <span className="text-purple-400 font-medium">{highlightText(String(keyName))}:</span>
            )}
            <span className={`text-xs ${getTypeColor(value)} opacity-70`}>{getTypeLabel(value)}</span>
            <button
              onClick={handleCopyPath}
              className="opacity-0 group-hover:opacity-100 ml-1 p-0.5 rounded hover:bg-muted transition-opacity"
              title={`Copy path: ${path}`}
            >
              <Copy className="w-3 h-3 text-muted-foreground" />
            </button>
            {copied && <span className="text-xs text-green-400 ml-1">Copied!</span>}
          </div>
          {isExpanded && (
            <div className="ml-4 border-l border-border/50 pl-2">
              {entries.map(([k, v]) => {
                const childPath = Array.isArray(value) ? `${path}[${k}]` : `${path}.${k}`;
                return (
                  <TreeNode
                    key={String(k)}
                    keyName={k}
                    value={v as JsonValue}
                    path={childPath}
                    depth={depth + 1}
                    searchTerm={searchTerm}
                    expandedPaths={expandedPaths}
                    onToggle={onToggle}
                  />
                );
              })}
            </div>
          )}
        </>
      );
    }

    // Leaf node
    return (
      <div
        className={`flex items-center gap-1 group hover:bg-muted/50 rounded px-1 py-0.5 ${matchesSearch ? "bg-yellow-500/10" : ""}`}
        style={{ paddingLeft: "1.125rem" }}
      >
        {keyName !== null && (
          <span className="text-purple-400 font-medium">{highlightText(String(keyName))}:</span>
        )}
        <span className={getTypeColor(value)}>
          {typeof value === "string"
            ? highlightText(`"${value}"`)
            : highlightText(String(value))}
        </span>
        <span className={`text-xs ${getTypeColor(value)} opacity-50 ml-1`}>{getTypeLabel(value)}</span>
        <button
          onClick={handleCopyPath}
          className="opacity-0 group-hover:opacity-100 ml-1 p-0.5 rounded hover:bg-muted transition-opacity"
          title={`Copy path: ${path}`}
        >
          <Copy className="w-3 h-3 text-muted-foreground" />
        </button>
        {copied && <span className="text-xs text-green-400 ml-1">Copied!</span>}
      </div>
    );
  };

  return <div className="font-mono text-sm">{renderValue()}</div>;
}

// Collect all paths from a JSON value for expand all
function collectPaths(value: JsonValue, path: string): string[] {
  const paths: string[] = [];
  if (value !== null && typeof value === "object") {
    paths.push(path);
    const entries = Array.isArray(value) ? value.map((v, i) => [i, v] as const) : Object.entries(value);
    for (const [k, v] of entries) {
      const childPath = Array.isArray(value) ? `${path}[${k}]` : `${path}.${k}`;
      paths.push(...collectPaths(v as JsonValue, childPath));
    }
  }
  return paths;
}

// --- Main Component ---

export default function JSONTools() {
  useToolTracker("json", "JSON Formatter", "formatters");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indentSize, setIndentSize] = useState(2);
  const [viewMode, setViewMode] = useState<"text" | "tree">("text");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set(["$"]));
  const initializedRef = useRef(false);
  const [, startTransition] = useTransition();
  const analytics = useAnalytics();

  // Load shared data from URL
  const sharedData = useSharedData();

  useEffect(() => {
    if (sharedData && sharedData.tool === "json" && !initializedRef.current) {
      const { input: sharedInput, output: sharedOutput, indentSize: sharedIndentSize } = sharedData.data as {
        input?: string;
        output?: string;
        indentSize?: number;
      };

      initializedRef.current = true;
      startTransition(() => {
        if (sharedInput !== undefined) setInput(sharedInput);
        if (sharedOutput !== undefined) setOutput(sharedOutput);
        if (sharedIndentSize !== undefined) setIndentSize(sharedIndentSize);
      });
    }
  }, [sharedData, startTransition]);

  // Parse output for tree view
  const parsedOutput = useMemo((): JsonValue | undefined => {
    if (!output) return undefined;
    try {
      return JSON.parse(output) as JsonValue;
    } catch {
      return undefined;
    }
  }, [output]);

  // All paths for expand/collapse all
  const allPaths = useMemo(() => {
    if (!parsedOutput) return [];
    return collectPaths(parsedOutput, "$");
  }, [parsedOutput]);

  const handleToggle = useCallback((path: string) => {
    setExpandedPaths(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedPaths(new Set(allPaths));
  }, [allPaths]);

  const collapseAll = useCallback(() => {
    setExpandedPaths(new Set(["$"]));
  }, []);

  // Highlighted HTML for text view
  const highlightedOutput = useMemo(() => {
    if (!output) return "";
    return highlightJSON(output, searchTerm);
  }, [output, searchTerm]);

  const lineCount = useMemo(() => {
    if (!output) return 0;
    return output.split("\n").length;
  }, [output]);

  const formatJSON = useCallback(() => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      // Auto-expand root on format
      setExpandedPaths(new Set(["$"]));
      analytics.trackToolUsage('json-formatter', {
        action: 'format',
        inputLength: input.length,
        indentSize
      });
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "Invalid JSON";
      setError(errorMsg);
      setOutput("");
      analytics.trackError('json-parse-error', {
        tool: 'json-formatter',
        errorType: 'parse'
      });
    }
  }, [input, indentSize, analytics]);

  const minifyJSON = useCallback(() => {
    setError("");
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      analytics.trackToolUsage('json-formatter', {
        action: 'minify',
        inputLength: input.length,
        outputLength: minified.length
      });
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : "Invalid JSON";
      setError(errorMsg);
      setOutput("");
      analytics.trackError('json-parse-error', {
        tool: 'json-formatter',
        errorType: 'parse'
      });
    }
  }, [input, analytics]);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
    setSearchTerm("");
    setExpandedPaths(new Set(["$"]));
  }, []);

  const loadSample = useCallback(() => {
    const sample = {
      name: "JSON Formatter",
      version: "1.0.0",
      features: ["Format", "Minify", "Validate"],
      config: { indent: 2, darkMode: true }};
    setInput(JSON.stringify(sample));
  }, []);

  // Preset management
  const handleLoadPreset = useCallback((data: PresetData) => {
    if (data.input !== undefined && data.input !== null && typeof data.input === 'string') setInput(data.input);
    if (data.indentSize !== undefined && data.indentSize !== null && typeof data.indentSize === 'number') setIndentSize(data.indentSize);
    setOutput("");
    setError("");
  }, []);

  const getCurrentState = useCallback((): PresetData => {
    return {
      input,
      indentSize};
  }, [input, indentSize]);

  // Keyboard shortcuts
  useKeyboardShortcut(SHORTCUTS.execute, formatJSON, { enabled: !!input });
  useKeyboardShortcut(SHORTCUTS.clear, clearAll);
  useKeyboardShortcut(SHORTCUTS.sample, loadSample);
  useKeyboardShortcut(SHORTCUTS.copy, () => {
    if (output) navigator.clipboard.writeText(output);
  }, { enabled: !!output });

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Syntax highlighting styles */}
      <style jsx global>{`
        .json-key { color: #c084fc; }
        .json-string { color: #4ade80; }
        .json-number { color: #60a5fa; }
        .json-boolean { color: #fb923c; }
        .json-null { color: #9ca3af; font-style: italic; }
        .json-search-match { background: rgba(234, 179, 8, 0.4); color: inherit; border-radius: 2px; padding: 0 2px; }
      `}</style>

      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center font-bold text-sm hover:opacity-80 transition">
              {"{}"}
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">JSON Formatter</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadSample}
              className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Sample</span>
            </button>
            <PinButton toolHref="/json" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Button onClick={formatJSON} className="min-h-[44px] bg-blue-600 hover:bg-blue-700 text-white" size="sm">
            Format
            <KeyboardHint shortcut={SHORTCUTS.execute} />
          </Button>
          <Button onClick={minifyJSON} className="min-h-[44px] bg-zinc-600 hover:bg-zinc-700 text-white border-0" size="sm">
            Minify
          </Button>
          {output && (
            <ExportHubV2
              content={output}
              toolName="JSON Formatter"
              formats={["copy", "txt", "json"]}
              variant="buttons"
            />
          )}
          <ShareButton
            toolId="json"
            data={{ input, output, indentSize }}
            variant="outline"
            className="min-h-[44px] border-border hover:bg-muted"
            disabled={!input && !output}
          />
          <Button onClick={clearAll} className="min-h-[44px] bg-transparent hover:bg-muted text-accent-foreground hover:text-foreground" size="sm">
            Clear
            <KeyboardHint shortcut={SHORTCUTS.clear} />
          </Button>
          <Button onClick={loadSample} className="min-h-[44px] bg-transparent hover:bg-muted text-accent-foreground hover:text-foreground" size="sm">
            Sample
            <KeyboardHint shortcut={SHORTCUTS.sample} />
          </Button>
          <div className="ml-auto flex items-center gap-2 text-sm">
            <span className="hidden sm:inline text-accent-foreground">Indent:</span>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="bg-muted border border-border rounded px-2 py-1 text-foreground text-sm"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
            </select>
          </div>
        </div>

        {/* Preset Manager */}
        <div className="mb-6 pb-4 border-b border-border">
          <PresetManager
            toolName="json-formatter"
            currentState={getCurrentState()}
            onLoadPreset={handleLoadPreset}
          />
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            <span className="font-medium">Error:</span> {error}
          </div>
        )}

        {/* Editor Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-accent-foreground">Input</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className="h-[400px] sm:h-[500px] bg-card border-border font-mono text-sm resize-none focus:border-blue-500 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          {/* Output */}
          <div className="space-y-2">
            {/* Output header with view toggle and search */}
            <div className="flex items-center justify-between gap-2">
              <label className="text-sm font-medium text-accent-foreground">Output</label>
              <div className="flex items-center gap-2">
                {/* Search */}
                {output && (
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search..."
                      className="pl-7 pr-2 py-1 text-xs bg-muted border border-border rounded w-32 sm:w-40 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-blue-500"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                )}
                {/* View mode toggle */}
                {output && parsedOutput !== undefined && (
                  <div className="flex items-center bg-muted rounded-lg p-0.5">
                    <button
                      onClick={() => setViewMode("text")}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition ${viewMode === "text" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Text
                    </button>
                    <button
                      onClick={() => setViewMode("tree")}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition ${viewMode === "tree" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      <TreePine className="w-3.5 h-3.5" />
                      Tree
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tree view controls */}
            {output && viewMode === "tree" && parsedOutput !== undefined && (
              <div className="flex items-center gap-2">
                <Button onClick={expandAll} variant="outline" size="sm" className="h-7 text-xs px-2 border-border">
                  <ChevronsDown className="w-3 h-3 mr-1" />
                  Expand All
                </Button>
                <Button onClick={collapseAll} variant="outline" size="sm" className="h-7 text-xs px-2 border-border">
                  <ChevronsUp className="w-3 h-3 mr-1" />
                  Collapse All
                </Button>
              </div>
            )}

            {/* Output content */}
            {viewMode === "text" || !parsedOutput ? (
              /* Text view with syntax highlighting */
              output ? (
                <div className="h-[400px] sm:h-[500px] bg-card border border-border rounded-md overflow-auto">
                  <div className="flex min-h-full">
                    {/* Line numbers */}
                    <div className="flex-shrink-0 py-3 px-2 text-right select-none border-r border-border/50 bg-muted/30">
                      {Array.from({ length: lineCount }, (_, i) => (
                        <div key={i} className="text-xs leading-5 text-muted-foreground font-mono">
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    {/* Highlighted code */}
                    <pre className="flex-1 py-3 px-3 overflow-x-auto">
                      <code
                        className="text-sm leading-5 font-mono text-foreground"
                        dangerouslySetInnerHTML={{ __html: highlightedOutput }}
                      />
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="h-[400px] sm:h-[500px] bg-card border border-border rounded-md flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Formatted JSON will appear here...</span>
                </div>
              )
            ) : (
              /* Tree view */
              <div className="h-[400px] sm:h-[500px] bg-card border border-border rounded-md overflow-auto p-3">
                <TreeNode
                  keyName={null}
                  value={parsedOutput}
                  path="$"
                  depth={0}
                  searchTerm={searchTerm}
                  expandedPaths={expandedPaths}
                  onToggle={handleToggle}
                />
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        {output && (
          <div className="mt-6 flex flex-wrap gap-4 sm:gap-6 text-sm text-muted-foreground">
            <span>Input: <span className="text-foreground font-medium">{input.length}</span> chars</span>
            <span>Output: <span className="text-foreground font-medium">{output.length}</span> chars</span>
            <span>Change: <span className="text-foreground font-medium">
              {input.length > 0 ? Math.round(((output.length - input.length) / input.length) * 100) : 0}%
            </span></span>
          </div>
        )}

        {/* GEO Content - Professional Design System */}
        <GeoContentLayout>
          {/* Quick Start Guide */}
          <GeoSection
            id="quick-start"
            title="Quick Start Guide"
            subtitle="Get up and running in 30 seconds"
            variant="highlight"
          >
            <QuickStartGuide steps={jsonGuideContent.quickStartSteps} />
          </GeoSection>

          {/* What is JSON Section */}
          <GeoSection
            id="what-is-json"
            title={jsonGuideContent.introduction.title}
            subtitle="Understanding the universal data format for web APIs"
            variant="default"
          >
            <MarkdownContent content={jsonGuideContent.introduction.content} />
          </GeoSection>

          {/* Use Cases - Feature Grid */}
          <GeoSection
            id="use-cases"
            title="Common Use Cases"
            subtitle="How developers use JSON formatting daily"
            variant="default"
          >
            <FeatureGrid
              features={jsonGuideContent.useCases.map(uc => ({
                title: uc.title,
                description: uc.description
              }))}
              columns={2}
            />
          </GeoSection>

          {/* How to Use This Tool */}
          <GeoSection
            id="how-to-use"
            title={jsonGuideContent.howToUse.title}
            subtitle="Master all features and keyboard shortcuts"
            variant="minimal"
          >
            <HowToSchema
              name={`How to use ${jsonGuideContent.toolName}`}
              description="Step-by-step guide to formatting JSON data"
              steps={jsonGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${jsonGuideContent.toolPath}`}
            />
            <MarkdownContent content={jsonGuideContent.howToUse.content} />
          </GeoSection>

          {/* FAQ */}
          <GeoSection
            id="faq"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about JSON formatting"
            variant="default"
          >
            <ToolFAQ faqs={jsonGuideContent.faqs} />
          </GeoSection>

          {/* Security & Privacy */}
          <GeoSection
            id="security"
            title={jsonGuideContent.security.title}
            subtitle="Your data never leaves your browser"
            variant="highlight"
          >
            <MarkdownContent content={jsonGuideContent.security.content} />
          </GeoSection>

          {/* Statistics - Stats Bar */}
          {jsonGuideContent.stats && (
            <GeoSection
              id="stats"
              title="By the Numbers"
              subtitle="Performance metrics and capabilities"
              variant="minimal"
            >
              <StatsBar
                stats={Object.entries(jsonGuideContent.stats).map(([label, value]) => ({
                  label,
                  value
                }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        {/* Related Tools */}
        <RelatedTools currentPath="/json" />

        {/* Last Updated */}
        <LastUpdated date={jsonGuideContent.lastUpdated} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Fast, private JSON formatting. No data leaves your browser.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="JSON Formatter & Validator"
        description="Free online JSON formatter, beautifier, and validator. Format and minify JSON with syntax highlighting."
        url="https://openkit.tools/json"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={jsonGuideContent.lastUpdated}
        version={jsonGuideContent.version}
        aggregateRating={{
          ratingValue: "4.8",
          ratingCount: "2847",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'JSON Formatter', url: 'https://openkit.tools/json' },
        ]}
      />
    </main>
  );
}
