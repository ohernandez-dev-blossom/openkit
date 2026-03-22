"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { ArrowLeftRight } from "lucide-react";
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
import { jsonYamlGuideContent } from "@/content/json-yaml-guide";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";

type Direction = "json-to-yaml" | "yaml-to-json";

// --- JSON to YAML (manual implementation, no external deps) ---

function jsonToYaml(value: unknown, indent: number, currentIndent = 0): string {
  const pad = " ".repeat(currentIndent);
  const nextPad = " ".repeat(currentIndent + indent);

  if (value === null) return "null";
  if (value === undefined) return "null";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);

  if (typeof value === "string") {
    // Multiline strings use literal block scalar
    if (value.includes("\n")) {
      const lines = value.split("\n");
      return "|\n" + lines.map((l) => nextPad + l).join("\n");
    }
    // Quote if contains special YAML chars
    if (
      value === "" ||
      value === "true" || value === "false" ||
      value === "null" || value === "~" ||
      value.startsWith("#") ||
      value.includes(": ") ||
      value.includes("{") || value.includes("}") ||
      value.includes("[") || value.includes("]") ||
      value.includes(",") ||
      value.startsWith("'") || value.startsWith('"') ||
      value.startsWith("&") || value.startsWith("*") ||
      value.startsWith("!") || value.startsWith("%") ||
      value.startsWith("@") || value.startsWith("`") ||
      value.startsWith("- ") ||
      /^\d/.test(value) && isNaN(Number(value))
    ) {
      return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
    }
    // Check if it looks like a number or boolean
    if (!isNaN(Number(value)) || value === "yes" || value === "no" || value === "on" || value === "off") {
      return `"${value}"`;
    }
    return value;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const lines: string[] = [];
    for (const item of value) {
      if (typeof item === "object" && item !== null && !Array.isArray(item)) {
        const objKeys = Object.keys(item as Record<string, unknown>);
        if (objKeys.length > 0) {
          const firstKey = objKeys[0];
          const firstVal = jsonToYaml((item as Record<string, unknown>)[firstKey], indent, currentIndent + indent);
          lines.push(`${pad}- ${firstKey}: ${firstVal}`);
          for (let i = 1; i < objKeys.length; i++) {
            const k = objKeys[i];
            const v = jsonToYaml((item as Record<string, unknown>)[k], indent, currentIndent + indent);
            lines.push(`${nextPad}${k}: ${v}`);
          }
        } else {
          lines.push(`${pad}- {}`);
        }
      } else {
        const rendered = jsonToYaml(item, indent, currentIndent + indent);
        lines.push(`${pad}- ${rendered}`);
      }
    }
    return "\n" + lines.join("\n");
  }

  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj);
    if (keys.length === 0) return "{}";
    const lines: string[] = [];
    for (const key of keys) {
      const val = obj[key];
      const renderedVal = jsonToYaml(val, indent, currentIndent + indent);
      // If rendered value starts with newline (object/array), put on next lines
      if (renderedVal.startsWith("\n")) {
        lines.push(`${pad}${key}:${renderedVal}`);
      } else {
        lines.push(`${pad}${key}: ${renderedVal}`);
      }
    }
    if (currentIndent === 0) {
      return lines.join("\n");
    }
    return "\n" + lines.join("\n");
  }

  return String(value);
}

// --- YAML to JSON (basic parser) ---

interface YamlLine {
  indent: number;
  key: string;
  value: string;
  isArrayItem: boolean;
  raw: string;
}

function parseYamlToJson(yamlStr: string): unknown {
  const lines = yamlStr.split(/\r?\n/);
  const filteredLines: YamlLine[] = [];

  for (const raw of lines) {
    // Skip empty lines and comments
    if (raw.trim() === "" || raw.trim().startsWith("#")) continue;

    const indent = raw.length - raw.trimStart().length;
    let trimmed = raw.trimStart();
    let isArrayItem = false;

    if (trimmed.startsWith("- ")) {
      isArrayItem = true;
      trimmed = trimmed.slice(2);
    } else if (trimmed === "-") {
      isArrayItem = true;
      trimmed = "";
    }

    const colonIdx = trimmed.indexOf(": ");
    let key = "";
    let value = "";

    if (colonIdx >= 0) {
      key = trimmed.slice(0, colonIdx).trim();
      value = trimmed.slice(colonIdx + 2).trim();
    } else if (trimmed.endsWith(":")) {
      key = trimmed.slice(0, -1).trim();
      value = "";
    } else {
      key = "";
      value = trimmed;
    }

    filteredLines.push({ indent, key, value, isArrayItem, raw });
  }

  function parseValue(val: string): unknown {
    if (val === "" || val === "~" || val === "null") return null;
    if (val === "true" || val === "yes") return true;
    if (val === "false" || val === "no") return false;
    if (!isNaN(Number(val)) && val !== "") return Number(val);
    // Remove surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      return val.slice(1, -1);
    }
    // Inline arrays like [a, b, c]
    if (val.startsWith("[") && val.endsWith("]")) {
      try {
        return JSON.parse(val);
      } catch {
        return val.slice(1, -1).split(",").map((s) => parseValue(s.trim()));
      }
    }
    // Inline objects like {a: b}
    if (val.startsWith("{") && val.endsWith("}")) {
      try {
        return JSON.parse(val);
      } catch {
        return val;
      }
    }
    return val;
  }

  function buildStructure(startIdx: number, endIdx: number, baseIndent: number): unknown {
    if (startIdx >= endIdx) return null;

    // Check if this block is an array (first item is array item)
    const isArray = filteredLines[startIdx].isArrayItem;

    if (isArray) {
      const result: unknown[] = [];
      let i = startIdx;
      while (i < endIdx) {
        const line = filteredLines[i];
        if (line.indent < baseIndent) break;
        if (!line.isArrayItem && line.indent === baseIndent) break;

        if (line.isArrayItem && line.indent === baseIndent) {
          // Find the extent of this array item
          let itemEnd = i + 1;
          while (itemEnd < endIdx && filteredLines[itemEnd].indent > baseIndent) {
            itemEnd++;
          }

          if (line.key && line.value !== "") {
            // Array item with key: value, possibly more nested
            const obj: Record<string, unknown> = {};
            obj[line.key] = parseValue(line.value);
            // Process nested keys for this item
            if (i + 1 < itemEnd) {
              const nestedIndent = filteredLines[i + 1].indent;
              const nested = buildStructure(i + 1, itemEnd, nestedIndent);
              if (nested && typeof nested === "object" && !Array.isArray(nested)) {
                Object.assign(obj, nested as Record<string, unknown>);
              }
            }
            result.push(obj);
          } else if (line.key && line.value === "") {
            // Array item with key and nested children
            const obj: Record<string, unknown> = {};
            if (i + 1 < itemEnd) {
              const nestedIndent = filteredLines[i + 1].indent;
              obj[line.key] = buildStructure(i + 1, itemEnd, nestedIndent);
            } else {
              obj[line.key] = null;
            }
            result.push(obj);
          } else {
            // Simple array item
            result.push(parseValue(line.value));
          }
          i = itemEnd;
        } else {
          i++;
        }
      }
      return result;
    } else {
      // Object
      const result: Record<string, unknown> = {};
      let i = startIdx;
      while (i < endIdx) {
        const line = filteredLines[i];
        if (line.indent < baseIndent) break;

        if (line.indent === baseIndent && line.key) {
          // Find children
          let childEnd = i + 1;
          while (childEnd < endIdx && filteredLines[childEnd].indent > baseIndent) {
            childEnd++;
          }

          if (line.value !== "") {
            result[line.key] = parseValue(line.value);
          } else if (childEnd > i + 1) {
            const childIndent = filteredLines[i + 1].indent;
            result[line.key] = buildStructure(i + 1, childEnd, childIndent);
          } else {
            result[line.key] = null;
          }
          i = childEnd;
        } else {
          i++;
        }
      }
      return result;
    }
  }

  if (filteredLines.length === 0) return {};
  const baseIndent = filteredLines[0].indent;
  return buildStructure(0, filteredLines.length, baseIndent);
}

export default function JSONYAMLConverter() {
  useToolTracker("json-yaml", "JSON ↔ YAML Converter", "converters");
  const analytics = useAnalytics();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [direction, setDirection] = useState<Direction>("json-to-yaml");
  const [indentSize, setIndentSize] = useState(2);

  const convert = useCallback(() => {
    setError("");
    try {
      if (direction === "json-to-yaml") {
        const parsed = JSON.parse(input);
        const yaml = jsonToYaml(parsed, indentSize);
        setOutput(yaml);
        analytics.trackToolUsage("json-yaml", { action: "json-to-yaml", inputLength: input.length });
      } else {
        const parsed = parseYamlToJson(input);
        setOutput(JSON.stringify(parsed, null, indentSize));
        analytics.trackToolUsage("json-yaml", { action: "yaml-to-json", inputLength: input.length });
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Conversion failed";
      setError(msg);
      setOutput("");
      analytics.trackError("json-yaml-error", { direction, errorType: "parse" });
    }
  }, [input, direction, indentSize, analytics]);

  const toggleDirection = useCallback(() => {
    setDirection((d) => (d === "json-to-yaml" ? "yaml-to-json" : "json-to-yaml"));
    setInput("");
    setOutput("");
    setError("");
  }, []);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError("");
  }, []);

  const loadSample = useCallback(() => {
    if (direction === "json-to-yaml") {
      setInput(JSON.stringify({
        name: "my-app",
        version: "1.0.0",
        services: {
          web: {
            image: "nginx:alpine",
            ports: ["80:80", "443:443"],
            environment: {
              NODE_ENV: "production",
              API_URL: "https://api.example.com"
            }
          },
          database: {
            image: "postgres:15",
            volumes: ["db-data:/var/lib/postgresql/data"],
            environment: {
              POSTGRES_DB: "myapp",
              POSTGRES_PASSWORD: "secret"
            }
          }
        }
      }, null, 2));
    } else {
      setInput(`name: my-app
version: 1.0.0
services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    environment:
      NODE_ENV: production
      API_URL: https://api.example.com
  database:
    image: postgres:15
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: secret`);
    }
  }, [direction]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 text-white flex items-center justify-center font-bold text-xs hover:opacity-80 transition">
              Y
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">JSON ↔ YAML Converter</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadSample}
              className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition"
            >
              <span className="hidden sm:inline">Sample</span>
            </button>
            <PinButton toolHref="/json-yaml" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Button onClick={toggleDirection} className="min-h-[44px] bg-purple-600 hover:bg-purple-700 text-white" size="sm">
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            {direction === "json-to-yaml" ? "JSON → YAML" : "YAML → JSON"}
          </Button>
          <Button onClick={convert} className="min-h-[44px] bg-blue-600 hover:bg-blue-700 text-white" size="sm">
            Convert
          </Button>
          {output && (
            <ExportHubV2
              content={output}
              toolName="JSON YAML Converter"
              formats={["copy", "txt"]}
              variant="buttons"
            />
          )}
          <ShareButton
            toolId="json-yaml"
            data={{ input, output, direction }}
            variant="outline"
            className="min-h-[44px] border-border hover:bg-muted"
            disabled={!input && !output}
          />
          <Button onClick={clearAll} className="min-h-[44px] bg-transparent hover:bg-muted text-accent-foreground" size="sm">
            Clear
          </Button>

          <div className="ml-auto flex items-center gap-2 text-sm">
            <span className="text-accent-foreground">Indent:</span>
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

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            <span className="font-medium">Error:</span> {error}
          </div>
        )}

        {/* Side-by-side Editor Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-accent-foreground">
              {direction === "json-to-yaml" ? "JSON Input" : "YAML Input"}
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={direction === "json-to-yaml" ? "Paste your JSON here..." : "Paste your YAML here..."}
              className="h-[400px] sm:h-[500px] bg-card border-border font-mono text-sm resize-none focus:border-blue-500 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-accent-foreground">
              {direction === "json-to-yaml" ? "YAML Output" : "JSON Output"}
            </label>
            <Textarea
              value={output}
              readOnly
              placeholder={direction === "json-to-yaml" ? "YAML output will appear here..." : "JSON output will appear here..."}
              className="h-[400px] sm:h-[500px] bg-card border-border font-mono text-sm resize-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Stats */}
        {output && (
          <div className="mt-6 flex flex-wrap gap-4 sm:gap-6 text-sm text-muted-foreground">
            <span>Input: <span className="text-foreground font-medium">{input.length}</span> chars</span>
            <span>Output: <span className="text-foreground font-medium">{output.length}</span> chars</span>
            <span>Direction: <span className="text-foreground font-medium">{direction === "json-to-yaml" ? "JSON → YAML" : "YAML → JSON"}</span></span>
          </div>
        )}

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={jsonYamlGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is" title={jsonYamlGuideContent.introduction.title} subtitle="Understanding JSON to YAML conversion" variant="default">
            <MarkdownContent content={jsonYamlGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use JSON-YAML conversion daily" variant="default">
            <FeatureGrid
              features={jsonYamlGuideContent.useCases.map((uc) => ({
                title: uc.title,
                description: uc.description,
              }))}
              columns={2}
            />
          </GeoSection>

          <GeoSection id="how-to-use" title={jsonYamlGuideContent.howToUse.title} subtitle="Master all features" variant="minimal">
            <HowToSchema
              name={`How to use ${jsonYamlGuideContent.toolName}`}
              description="Step-by-step guide to converting JSON and YAML data"
              steps={jsonYamlGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${jsonYamlGuideContent.toolPath}`}
            />
            <MarkdownContent content={jsonYamlGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={jsonYamlGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={jsonYamlGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={jsonYamlGuideContent.security.content} />
          </GeoSection>

          {jsonYamlGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics and capabilities" variant="minimal">
              <StatsBar stats={Object.entries(jsonYamlGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <RelatedTools currentPath="/json-yaml" />
        <LastUpdated date={jsonYamlGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Fast, private JSON ↔ YAML conversion. No data leaves your browser.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="JSON to YAML Converter"
        description="Free online JSON to YAML and YAML to JSON converter. Configurable indentation, multiline string support."
        url="https://openkit.tools/json-yaml"
        applicationCategory="DeveloperApplication"
        datePublished="2026-02-15"
        dateModified={jsonYamlGuideContent.lastUpdated}
        version={jsonYamlGuideContent.version}
        aggregateRating={{ ratingValue: "4.8", ratingCount: "1567", bestRating: "5" }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "JSON ↔ YAML Converter", url: "https://openkit.tools/json-yaml" },
        ]}
      />
    </main>
  );
}
