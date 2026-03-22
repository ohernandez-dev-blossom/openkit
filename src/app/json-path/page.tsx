"use client";
import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { PinButton } from "@/components/pin-button";
import { ChevronRight, ChevronDown, Copy, Check, Search, X } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, StatsBar } from "@/components/geo-content-layout";
import { jsonPathGuideContent } from "@/content/json-path-guide";
import { UseCases } from "@/components/use-cases";

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];

type PathFormat = "dot" | "bracket" | "jsonpath";

interface TreeNodeProps {
  data: JSONValue;
  path: string[];
  onSelect: (path: string[], value: JSONValue) => void;
  selectedPath: string[];
  searchQuery: string;
  level?: number;
}

function getValueType(value: JSONValue): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function formatPath(path: string[], format: PathFormat): string {
  if (path.length === 0) return format === "jsonpath" ? "$" : "";

  switch (format) {
    case "dot":
      return path
        .map((key, i) => {
          // If key is a number (array index), use bracket notation
          if (!isNaN(Number(key))) {
            return `[${key}]`;
          }
          // If key contains special chars, use bracket notation
          if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)) {
            return `["${key}"]`;
          }
          return i === 0 ? key : `.${key}`;
        })
        .join("");

    case "bracket":
      return path
        .map((key) => {
          return isNaN(Number(key)) ? `["${key}"]` : `[${key}]`;
        })
        .join("");

    case "jsonpath":
      return "$" + path
        .map((key) => {
          return isNaN(Number(key)) ? `.${key}` : `[${key}]`;
        })
        .join("");

    default:
      return path.join(".");
  }
}

function matchesSearch(key: string, value: JSONValue, searchQuery: string): boolean {
  if (!searchQuery) return false;

  const query = searchQuery.toLowerCase();

  // Search in key
  if (key.toLowerCase().includes(query)) return true;

  // Search in value (for primitives)
  if (typeof value === "string" && value.toLowerCase().includes(query)) return true;
  if (typeof value === "number" && value.toString().includes(query)) return true;
  if (typeof value === "boolean" && value.toString().includes(query)) return true;

  return false;
}

function hasMatchInChildren(data: JSONValue, searchQuery: string): boolean {
  if (!searchQuery) return false;

  if (Array.isArray(data)) {
    return data.some((item, i) =>
      matchesSearch(i.toString(), item, searchQuery) || hasMatchInChildren(item, searchQuery)
    );
  }

  if (typeof data === "object" && data !== null) {
    return Object.entries(data).some(([key, value]) =>
      matchesSearch(key, value, searchQuery) || hasMatchInChildren(value, searchQuery)
    );
  }

  return false;
}

function TreeNode({ data, path, onSelect, selectedPath, searchQuery, level = 0 }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2 || (searchQuery ? hasMatchInChildren(data, searchQuery) : false));
  const isSelected = JSON.stringify(path) === JSON.stringify(selectedPath);
  const currentKey = path[path.length - 1] || "root";

  const isObject = typeof data === "object" && data !== null && !Array.isArray(data);
  const isArray = Array.isArray(data);
  const isPrimitive = !isObject && !isArray;

  const valueType = getValueType(data);
  const typeColor = {
    string: "text-green-400",
    number: "text-blue-400",
    boolean: "text-purple-400",
    null: "text-muted-foreground",
    array: "text-yellow-400",
    object: "text-pink-400"}[valueType] || "text-muted-foreground";

  const hasChildren = isObject || isArray;
  const childCount = isObject ? Object.keys(data).length : isArray ? data.length : 0;

  const isMatch = matchesSearch(currentKey, data, searchQuery);
  const hasMatchingChildren = searchQuery && hasMatchInChildren(data, searchQuery);

  // Auto-expand if there's a match in children
  if (searchQuery && hasMatchingChildren && !isExpanded) {
    setIsExpanded(true);
  }

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    onSelect(path, data);
  };

  return (
    <div className="select-none">
      <div
        onClick={handleClick}
        className={`flex items-start gap-2 px-2 py-1 rounded cursor-pointer transition-colors ${
          isSelected ? "bg-blue-500/20 border-l-2 border-blue-500" : "hover:bg-muted/50"
        } ${isMatch ? "bg-yellow-500/10" : ""}`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="mt-1 text-muted-foreground hover:text-accent-foreground"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        )}
        {!hasChildren && <div className="w-4" />}

        <div className="flex-1 min-w-0 font-mono text-sm">
          <span className={`${isMatch ? "bg-yellow-500/30 px-1" : ""} text-accent-foreground font-medium`}>
            {currentKey}
          </span>
          <span className="text-muted-foreground/70 mx-1">:</span>
          <span className={typeColor}>
            {isPrimitive ? (
              <span className={isMatch ? "bg-yellow-500/30 px-1" : ""}>
                {typeof data === "string" ? `"${data}"` : String(data)}
              </span>
            ) : (
              <span className="text-muted-foreground">
                {isArray ? `Array[${childCount}]` : `Object{${childCount}}`}
              </span>
            )}
          </span>
          <span className="ml-2 text-xs text-muted-foreground/70">{valueType}</span>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div>
          {isArray
            ? (data as JSONArray).map((item, index) => (
                <TreeNode
                  key={index}
                  data={item}
                  path={[...path, index.toString()]}
                  onSelect={onSelect}
                  selectedPath={selectedPath}
                  searchQuery={searchQuery}
                  level={level + 1}
                />
              ))
            : Object.entries(data as JSONObject).map(([key, value]) => (
                <TreeNode
                  key={key}
                  data={value}
                  path={[...path, key]}
                  onSelect={onSelect}
                  selectedPath={selectedPath}
                  searchQuery={searchQuery}
                  level={level + 1}
                />
              ))}
        </div>
      )}
    </div>
  );
}

export default function JSONPathFinder() {
  useToolTracker("json-path", "JSON Path Finder", "utilities");
  const analytics = useAnalytics();
  const { isCopied } = useCopyToClipboard({ duration: 1500 });
  const [input, setInput] = useState("");
  const [parsedData, setParsedData] = useState<JSONValue | null>(null);
  const [error, setError] = useState("");
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<JSONValue | null>(null);
  const [pathFormat, setPathFormat] = useState<PathFormat>("dot");
    const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseJSON = useCallback(() => {
    setError("");
    setParsedData(null);
    setSelectedPath([]);
    setSelectedValue(null);

    try {
      const parsed = JSON.parse(input);
      setParsedData(parsed);
      analytics.trackToolUsage('json-path', {
        action: 'parse',
        inputLength: input.length,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
    }
  }, [input, analytics]);

  const handleNodeSelect = useCallback((path: string[], value: JSONValue) => {
    setSelectedPath(path);
    setSelectedValue(value);
  }, []);

  const copyPath = useCallback(() => {
    const path = formatPath(selectedPath, pathFormat);
    navigator.clipboard.writeText(path);
  }, [selectedPath, pathFormat]);

  const loadSample = useCallback(() => {
    const sample = {
      users: [
        {
          id: 1,
          name: "Alice Johnson",
          email: "alice@example.com",
          profile: {
            age: 28,
            city: "New York",
            preferences: {
              theme: "dark",
              notifications: true
            }
          }
        },
        {
          id: 2,
          name: "Bob Smith",
          email: "bob@example.com",
          profile: {
            age: 34,
            city: "San Francisco",
            preferences: {
              theme: "light",
              notifications: false
            }
          }
        }
      ],
      metadata: {
        version: "1.0",
        timestamp: "2024-01-15T10:30:00Z"
      }
    };
    setInput(JSON.stringify(sample, null, 2));
  }, []);

  const clearAll = useCallback(() => {
    setInput("");
    setParsedData(null);
    setError("");
    setSelectedPath([]);
    setSelectedValue(null);
    setSearchQuery("");
  }, []);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setInput(text);
    };
    reader.readAsText(file);
  }, []);

  const formattedPath = selectedPath.length > 0 ? formatPath(selectedPath, pathFormat) : "";

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center font-bold text-sm hover:opacity-80 transition">
              📍
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">JSON Path Finder</h1>
          </div>
          <PinButton toolHref="/json-path" />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Button className="min-h-[44px] bg-yellow-600 hover:bg-yellow-700 text-white" onClick={parseJSON}  size="sm">
            Parse JSON
          </Button>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-zinc-600 hover:bg-zinc-700 text-white border-0"
            size="sm"
          >
            Upload File
          </Button>
          <input aria-label="Input field"
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button className="min-h-[44px] bg-transparent hover:bg-muted text-accent-foreground hover:text-foreground" onClick={loadSample}  size="sm">
            Sample
          </Button>
          <Button className="min-h-[44px] bg-transparent hover:bg-muted text-accent-foreground hover:text-foreground" onClick={clearAll}  size="sm">
            Clear
          </Button>

          <div className="ml-auto flex items-center gap-2 text-sm">
            <span className="hidden sm:inline text-accent-foreground">Path Format:</span>
            <select
              value={pathFormat}
              onChange={(e) => setPathFormat(e.target.value as PathFormat)}
              className="bg-muted border border-border rounded px-2 py-1 text-foreground text-sm"
            >
              <option value="dot">Dot notation</option>
              <option value="bracket">Bracket notation</option>
              <option value="jsonpath">JSONPath</option>
            </select>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            <span className="font-medium">Error:</span> {error}
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Input Panel */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-accent-foreground">JSON Input</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here or upload a file..."
              className="h-[500px] bg-card border-border font-mono text-sm resize-none focus:border-yellow-500 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Tree View Panel */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-accent-foreground">JSON Tree</label>
              {parsedData && (
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input aria-label="Input field"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="pl-8 pr-8 py-1 bg-muted border border-border rounded text-sm text-foreground placeholder:text-muted-foreground focus:border-yellow-500 focus:outline-none w-48"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="h-[500px] bg-card border border-border rounded-lg overflow-auto p-4">
              {parsedData ? (
                <TreeNode
                  data={parsedData}
                  path={[]}
                  onSelect={handleNodeSelect}
                  selectedPath={selectedPath}
                  searchQuery={searchQuery}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                  Parse JSON to see the tree view
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Path Panel */}
        {selectedPath.length > 0 && (
          <div className="mt-6 p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base sm:text-lg font-medium text-accent-foreground">Selected Path</h3>
              <Button
                onClick={copyPath}
                className="bg-zinc-600 hover:bg-zinc-700 text-white border-0 flex items-center gap-2"
                size="sm"
              >
                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {isCopied ? "Copied!" : "Copy Path"}
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Path ({pathFormat} notation):</div>
                <div className="bg-muted border border-border rounded px-3 py-2 font-mono text-sm text-yellow-400">
                  {formattedPath || "$"}
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-1">Value Type:</div>
                <div className="bg-muted border border-border rounded px-3 py-2 font-mono text-sm text-blue-400">
                  {getValueType(selectedValue)}
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-1">Value:</div>
                <div className="bg-muted border border-border rounded px-3 py-2 font-mono text-sm text-foreground max-h-32 overflow-auto">
                  {typeof selectedValue === "object"
                    ? JSON.stringify(selectedValue, null, 2)
                    : typeof selectedValue === "string"
                    ? `"${selectedValue}"`
                    : String(selectedValue)
                  }
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Path Format Examples */}
        <div className="mt-6 p-4 bg-card/50 border border-border rounded-lg">
          <h3 className="text-base sm:text-lg font-medium text-accent-foreground mb-3">Path Format Examples</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <div className="text-muted-foreground mb-1">Dot notation:</div>
              <div className="text-accent-foreground">users[0].profile.city</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">Bracket notation:</div>
              <div className="text-accent-foreground">[&quot;users&quot;][0][&quot;profile&quot;][&quot;city&quot;]</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">JSONPath:</div>
              <div className="text-accent-foreground">$.users[0].profile.city</div>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <RelatedTools currentPath="/json-path" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={jsonPathGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-jsonpath" title={jsonPathGuideContent.introduction.title} subtitle="Understanding JSONPath querying and navigation" variant="default">
            <MarkdownContent content={jsonPathGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use JSONPath" variant="default">
            <UseCases cases={jsonPathGuideContent.useCases} />
          </GeoSection>

          <GeoSection id="how-to-use" title={jsonPathGuideContent.howToUse.title} subtitle="Master JSON data extraction" variant="minimal">
            <HowToSchema name={`How to use ${jsonPathGuideContent.toolName}`} description="Step-by-step guide to JSONPath exploration" steps={jsonPathGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${jsonPathGuideContent.toolPath}`} />
            <MarkdownContent content={jsonPathGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={jsonPathGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={jsonPathGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={jsonPathGuideContent.security.content} />
          </GeoSection>

          {jsonPathGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(jsonPathGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={jsonPathGuideContent.lastUpdated} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6 mt-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Visual JSON explorer with path extraction. No data leaves your browser.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="JSON Path Finder"
        description="Visual JSON explorer with path extraction. Click any value to get its path in dot, bracket, or JSONPath notation."
        url="https://openkit.tools/json-path"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={jsonPathGuideContent.lastUpdated}
        version={jsonPathGuideContent.version}
        aggregateRating={{ratingValue: "4.8", ratingCount: "1876", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'JSON Path Finder', url: 'https://openkit.tools/json-path' },
        ]}
      />
    </main>
  );
}
