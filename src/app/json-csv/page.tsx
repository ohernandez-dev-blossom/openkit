"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { ArrowLeftRight, Download, Table } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { ExportHubV2 } from "@/components/export-hub-v2";
import { PinButton } from "@/components/pin-button";
import { ShareButton } from "@/components/share-button";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { jsonCsvGuideContent } from "@/content/json-csv-guide";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";

type Direction = "json-to-csv" | "csv-to-json";
type Delimiter = "," | ";" | "\t";

// --- Utility functions ---

function flattenObject(obj: Record<string, unknown>, prefix = "", maxDepth = 5, depth = 0): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  if (depth >= maxDepth) {
    result[prefix] = JSON.stringify(obj);
    return result;
  }
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      Object.assign(result, flattenObject(val as Record<string, unknown>, fullKey, maxDepth, depth + 1));
    } else if (Array.isArray(val)) {
      result[fullKey] = JSON.stringify(val);
    } else {
      result[fullKey] = val;
    }
  }
  return result;
}

function escapeCSVValue(val: unknown, delimiter: string): string {
  if (val === null || val === undefined) return "";
  const str = String(val);
  if (str.includes(delimiter) || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function jsonToCSV(jsonStr: string, delimiter: Delimiter, includeHeaders: boolean, flattenDepth: number): string {
  const parsed = JSON.parse(jsonStr);
  const items: Record<string, unknown>[] = Array.isArray(parsed) ? parsed : [parsed];
  if (items.length === 0) return "";

  // Flatten all items
  const flatItems = items.map((item) =>
    typeof item === "object" && item !== null
      ? flattenObject(item as Record<string, unknown>, "", flattenDepth)
      : { value: item }
  );

  // Collect all unique headers
  const headersSet = new Set<string>();
  for (const item of flatItems) {
    for (const key of Object.keys(item)) {
      headersSet.add(key);
    }
  }
  const headers = Array.from(headersSet);

  const lines: string[] = [];
  if (includeHeaders) {
    lines.push(headers.map((h) => escapeCSVValue(h, delimiter)).join(delimiter));
  }
  for (const item of flatItems) {
    const row = headers.map((h) => escapeCSVValue(item[h], delimiter));
    lines.push(row.join(delimiter));
  }
  return lines.join("\n");
}

function csvToJSON(csvStr: string, delimiter: Delimiter): string {
  const lines = csvStr.split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lines.length === 0) return "[]";

  // Parse CSV line respecting quoted fields
  function parseLine(line: string): string[] {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inQuotes) {
        if (ch === '"') {
          if (i + 1 < line.length && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          current += ch;
        }
      } else {
        if (ch === '"') {
          inQuotes = true;
        } else if (ch === delimiter) {
          result.push(current);
          current = "";
        } else {
          current += ch;
        }
      }
    }
    result.push(current);
    return result;
  }

  const headers = parseLine(lines[0]);
  const items: Record<string, unknown>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseLine(lines[i]);
    const obj: Record<string, unknown> = {};
    for (let j = 0; j < headers.length; j++) {
      const raw = values[j] ?? "";
      // Infer types
      if (raw === "" || raw === "null") {
        obj[headers[j]] = null;
      } else if (raw === "true") {
        obj[headers[j]] = true;
      } else if (raw === "false") {
        obj[headers[j]] = false;
      } else if (raw !== "" && !isNaN(Number(raw)) && raw.trim() !== "") {
        obj[headers[j]] = Number(raw);
      } else {
        obj[headers[j]] = raw;
      }
    }
    items.push(obj);
  }
  return JSON.stringify(items, null, 2);
}

export default function JSONCSVConverter() {
  useToolTracker("json-csv", "JSON ↔ CSV Converter", "converters");
  const analytics = useAnalytics();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [direction, setDirection] = useState<Direction>("json-to-csv");
  const [delimiter, setDelimiter] = useState<Delimiter>(",");
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [flattenDepth, setFlattenDepth] = useState(3);
  const [previewRows, setPreviewRows] = useState<string[][]>([]);
  const [previewHeaders, setPreviewHeaders] = useState<string[]>([]);

  const convert = useCallback(() => {
    setError("");
    setPreviewRows([]);
    setPreviewHeaders([]);
    try {
      if (direction === "json-to-csv") {
        const csv = jsonToCSV(input, delimiter, includeHeaders, flattenDepth);
        setOutput(csv);
        // Build preview
        const lines = csv.split("\n").filter((l) => l.trim());
        if (lines.length > 0) {
          const delimChar = delimiter;
          const parsedHeaders = lines[0].split(delimChar).map((h) => h.replace(/^"|"$/g, ""));
          setPreviewHeaders(parsedHeaders);
          const dataStart = includeHeaders ? 1 : 0;
          const rows = lines.slice(dataStart, dataStart + 10).map((line) =>
            line.split(delimChar).map((v) => v.replace(/^"|"$/g, ""))
          );
          setPreviewRows(rows);
        }
        analytics.trackToolUsage("json-csv", { action: "json-to-csv", inputLength: input.length });
      } else {
        const json = csvToJSON(input, delimiter);
        setOutput(json);
        analytics.trackToolUsage("json-csv", { action: "csv-to-json", inputLength: input.length });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Conversion failed";
      setError(msg);
      setOutput("");
      analytics.trackError("json-csv-error", { direction, errorType: "parse" });
    }
  }, [input, direction, delimiter, includeHeaders, flattenDepth, analytics]);

  const toggleDirection = useCallback(() => {
    setDirection((d) => (d === "json-to-csv" ? "csv-to-json" : "json-to-csv"));
    setInput("");
    setOutput("");
    setError("");
    setPreviewRows([]);
    setPreviewHeaders([]);
  }, []);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
    setPreviewRows([]);
    setPreviewHeaders([]);
  }, []);

  const loadSample = useCallback(() => {
    if (direction === "json-to-csv") {
      setInput(JSON.stringify([
        { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 29, address: { city: "New York", country: "US" } },
        { id: 2, name: "Bob Smith", email: "bob@example.com", age: 34, address: { city: "London", country: "UK" } },
        { id: 3, name: "Charlie Brown", email: "charlie@example.com", age: 25, address: { city: "Tokyo", country: "JP" } }
      ], null, 2));
    } else {
      setInput("id,name,email,age,active\n1,Alice Johnson,alice@example.com,29,true\n2,Bob Smith,bob@example.com,34,false\n3,Charlie Brown,charlie@example.com,25,true");
    }
  }, [direction]);

  const downloadOutput = useCallback(() => {
    if (!output) return;
    const ext = direction === "json-to-csv" ? "csv" : "json";
    const mimeType = direction === "json-to-csv" ? "text/csv" : "application/json";
    const blob = new Blob([output], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [output, direction]);

  const delimiterLabel = delimiter === "," ? "Comma" : delimiter === ";" ? "Semicolon" : "Tab";

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-bold text-sm hover:opacity-80 transition">
              <Table className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">JSON ↔ CSV Converter</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadSample}
              className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition"
            >
              <span className="hidden sm:inline">Sample</span>
            </button>
            <PinButton toolHref="/json-csv" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Direction Toggle & Options */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Button onClick={toggleDirection} className="min-h-[44px] bg-purple-600 hover:bg-purple-700 text-white" size="sm">
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            {direction === "json-to-csv" ? "JSON → CSV" : "CSV → JSON"}
          </Button>
          <Button onClick={convert} className="min-h-[44px] bg-blue-600 hover:bg-blue-700 text-white" size="sm">
            Convert
          </Button>
          {output && (
            <>
              <ExportHubV2
                content={output}
                toolName="JSON CSV Converter"
                formats={["copy", "txt"]}
                variant="buttons"
              />
              <Button onClick={downloadOutput} className="min-h-[44px] bg-green-600 hover:bg-green-700 text-white" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download .{direction === "json-to-csv" ? "csv" : "json"}
              </Button>
            </>
          )}
          <ShareButton
            toolId="json-csv"
            data={{ input, output, direction }}
            variant="outline"
            className="min-h-[44px] border-border hover:bg-muted"
            disabled={!input && !output}
          />
          <Button onClick={clearAll} className="min-h-[44px] bg-transparent hover:bg-muted text-accent-foreground" size="sm">
            Clear
          </Button>

          {/* Options */}
          <div className="ml-auto flex flex-wrap items-center gap-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-accent-foreground">Delimiter:</span>
              <select
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value as Delimiter)}
                className="bg-muted border border-border rounded px-2 py-1 text-foreground text-sm"
              >
                <option value=",">Comma (,)</option>
                <option value=";">Semicolon (;)</option>
                <option value={"\t"}>Tab</option>
              </select>
            </div>
            {direction === "json-to-csv" && (
              <>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeHeaders}
                    onChange={(e) => setIncludeHeaders(e.target.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-accent-foreground">Headers</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-accent-foreground">Depth:</span>
                  <select
                    value={flattenDepth}
                    onChange={(e) => setFlattenDepth(Number(e.target.value))}
                    className="bg-muted border border-border rounded px-2 py-1 text-foreground text-sm"
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            <span className="font-medium">Error:</span> {error}
          </div>
        )}

        {/* Editor Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-accent-foreground">
              {direction === "json-to-csv" ? "JSON Input" : "CSV Input"}
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={direction === "json-to-csv" ? "Paste your JSON array here..." : "Paste your CSV data here..."}
              className="h-[400px] sm:h-[500px] bg-card border-border font-mono text-sm resize-none focus:border-blue-500 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-accent-foreground">
              {direction === "json-to-csv" ? "CSV Output" : "JSON Output"}
            </label>
            <Textarea
              value={output}
              readOnly
              placeholder={direction === "json-to-csv" ? "CSV output will appear here..." : "JSON output will appear here..."}
              className="h-[400px] sm:h-[500px] bg-card border-border font-mono text-sm resize-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Preview Table */}
        {direction === "json-to-csv" && previewHeaders.length > 0 && previewRows.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-accent-foreground mb-2">
              Preview (first {Math.min(previewRows.length, 10)} rows, {delimiterLabel} delimiter)
            </h3>
            <div className="overflow-x-auto border border-border rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted">
                    {previewHeaders.map((h, i) => (
                      <th key={i} className="px-3 py-2 text-left font-medium text-foreground border-b border-border">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewRows.map((row, ri) => (
                    <tr key={ri} className="border-b border-border last:border-0">
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-3 py-2 text-foreground truncate max-w-[200px]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stats */}
        {output && (
          <div className="mt-6 flex flex-wrap gap-4 sm:gap-6 text-sm text-muted-foreground">
            <span>Input: <span className="text-foreground font-medium">{input.length}</span> chars</span>
            <span>Output: <span className="text-foreground font-medium">{output.length}</span> chars</span>
            <span>Direction: <span className="text-foreground font-medium">{direction === "json-to-csv" ? "JSON → CSV" : "CSV → JSON"}</span></span>
          </div>
        )}

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={jsonCsvGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is" title={jsonCsvGuideContent.introduction.title} subtitle="Understanding JSON to CSV conversion" variant="default">
            <MarkdownContent content={jsonCsvGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use JSON-CSV conversion daily" variant="default">
            <FeatureGrid
              features={jsonCsvGuideContent.useCases.map((uc) => ({
                title: uc.title,
                description: uc.description,
              }))}
              columns={2}
            />
          </GeoSection>

          <GeoSection id="how-to-use" title={jsonCsvGuideContent.howToUse.title} subtitle="Master all features" variant="minimal">
            <HowToSchema
              name={`How to use ${jsonCsvGuideContent.toolName}`}
              description="Step-by-step guide to converting JSON and CSV data"
              steps={jsonCsvGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${jsonCsvGuideContent.toolPath}`}
            />
            <MarkdownContent content={jsonCsvGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={jsonCsvGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={jsonCsvGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={jsonCsvGuideContent.security.content} />
          </GeoSection>

          {jsonCsvGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics and capabilities" variant="minimal">
              <StatsBar stats={Object.entries(jsonCsvGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <RelatedTools currentPath="/json-csv" />
        <LastUpdated date={jsonCsvGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Fast, private JSON ↔ CSV conversion. No data leaves your browser.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="JSON to CSV Converter"
        description="Free online JSON to CSV and CSV to JSON converter. Flatten nested objects, handle arrays, choose delimiters."
        url="https://openkit.tools/json-csv"
        applicationCategory="DeveloperApplication"
        datePublished="2026-02-15"
        dateModified={jsonCsvGuideContent.lastUpdated}
        version={jsonCsvGuideContent.version}
        aggregateRating={{ ratingValue: "4.7", ratingCount: "1284", bestRating: "5" }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "JSON ↔ CSV Converter", url: "https://openkit.tools/json-csv" },
        ]}
      />
    </main>
  );
}
