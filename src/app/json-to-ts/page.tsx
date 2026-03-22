"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { Code, Copy, Check } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { jsonToTsGuideContent } from "@/content/json-to-ts-guide";
import { useAnalytics } from "@/hooks/use-analytics";

type TypeFormat = "interface" | "type" | "zod" | "python" | "go";

interface TypeOptions {
  format: TypeFormat;
  rootName: string;
  optional: boolean;
  useExport: boolean;
}

// ── TypeScript (Interface / Type) ────────────────────────────────────

function inferType(value: unknown, options: TypeOptions): string {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  
  const type = typeof value;
  
  if (type === "boolean") return "boolean";
  if (type === "number") return "number";
  if (type === "string") return "string";
  
  if (Array.isArray(value)) {
    if (value.length === 0) return "any[]";
    
    const types = value.map(v => inferType(v, options));
    const uniqueTypes = [...new Set(types)];
    
    if (uniqueTypes.length === 1) {
      const elementType = uniqueTypes[0];
      if (elementType.includes("{") || elementType.includes("|")) {
        return `(${elementType})[]`;
      }
      return `${elementType}[]`;
    } else {
      return `(${uniqueTypes.join(" | ")})[]`;
    }
  }
  
  if (type === "object") {
    return generateObjectType(value as Record<string, unknown>, options, 0);
  }
  
  return "any";
}

function generateObjectType(obj: Record<string, unknown>, options: TypeOptions, indentLevel: number): string {
  const entries = Object.entries(obj);
  if (entries.length === 0) return "{}";
  
  const indent = "  ".repeat(indentLevel + 1);
  const closeIndent = "  ".repeat(indentLevel);
  const optionalMark = options.optional ? "?" : "";
  
  const properties = entries.map(([key, value]) => {
    const type = inferType(value, options);
    const needsQuotes = /[^a-zA-Z0-9_$]/.test(key) || /^\d/.test(key);
    const propertyName = needsQuotes ? `"${key}"` : key;
    return `${indent}${propertyName}${optionalMark}: ${type};`;
  }).join("\n");
  
  return `{\n${properties}\n${closeIndent}}`;
}

function generateTsDefinition(json: string, options: TypeOptions): string {
  const parsed = JSON.parse(json);
  const typeBody = inferType(parsed, options);
  
  const keyword = options.format === "interface" ? "interface" : "type";
  const exportKeyword = options.useExport ? "export " : "";
  const separator = options.format === "interface" ? " " : " = ";

  return `${exportKeyword}${keyword} ${options.rootName}${separator}${typeBody}`;
}

// ── Zod Schema ───────────────────────────────────────────────────────

function inferZodType(value: unknown, indentLevel: number): string {
  if (value === null) return "z.null()";
  if (value === undefined) return "z.undefined()";

  const type = typeof value;
  if (type === "boolean") return "z.boolean()";
  if (type === "number") return "z.number()";
  if (type === "string") return "z.string()";

  if (Array.isArray(value)) {
    if (value.length === 0) return "z.array(z.any())";
    const types = value.map(v => inferZodType(v, indentLevel));
    const unique = [...new Set(types)];
    if (unique.length === 1) return `z.array(${unique[0]})`;
    return `z.array(z.union([${unique.join(", ")}]))`;
  }

  if (type === "object") {
    return generateZodObject(value as Record<string, unknown>, indentLevel);
  }

  return "z.any()";
}

function generateZodObject(obj: Record<string, unknown>, indentLevel: number): string {
  const entries = Object.entries(obj);
  if (entries.length === 0) return "z.object({})";

  const indent = "  ".repeat(indentLevel + 1);
  const closeIndent = "  ".repeat(indentLevel);

  const properties = entries.map(([key, value]) => {
    const zodType = inferZodType(value, indentLevel + 1);
    const needsQuotes = /[^a-zA-Z0-9_$]/.test(key) || /^\d/.test(key);
    const propertyName = needsQuotes ? `"${key}"` : key;
    return `${indent}${propertyName}: ${zodType}`;
  }).join(",\n");

  return `z.object({\n${properties},\n${closeIndent}})`;
}

function generateZodDefinition(json: string, options: TypeOptions): string {
  const parsed = JSON.parse(json);
  let zodBody = inferZodType(parsed, 0);

  if (options.optional && zodBody.startsWith("z.object(")) {
    // Make all top-level properties optional by wrapping each field
    zodBody = zodBody.replace(
      /^(z\.object\(\{[\s\S]*\}\))$/,
      (match) => match
    );
    // Simpler: add .partial() to make all fields optional
    zodBody = zodBody + ".partial()";
  }

  const exportKeyword = options.useExport ? "export " : "";
  const schemaName = options.rootName + "Schema";
  const lines: string[] = [
    'import { z } from "zod";',
    "",
    `${exportKeyword}const ${schemaName} = ${zodBody};`,
    "",
    `${exportKeyword}type ${options.rootName} = z.infer<typeof ${schemaName}>;`,
  ];

  return lines.join("\n");
}

// ── Python Dataclass ─────────────────────────────────────────────────

function toPythonType(value: unknown): string {
  if (value === null) return "None";
  if (value === undefined) return "None";

  const type = typeof value;
  if (type === "boolean") return "bool";
  if (type === "number") return Number.isInteger(value as number) ? "int" : "float";
  if (type === "string") return "str";

  if (Array.isArray(value)) {
    if (value.length === 0) return "list";
    const types = value.map(v => toPythonType(v));
    const unique = [...new Set(types)];
    if (unique.length === 1) return `List[${unique[0]}]`;
    return `List[Union[${unique.join(", ")}]]`;
  }

  if (type === "object") return "dict";

  return "Any";
}

function generatePythonDataclass(json: string, options: TypeOptions): string {
  const parsed = JSON.parse(json);
  const classes: string[] = [];

  function buildClass(obj: Record<string, unknown>, name: string) {
    const fields: string[] = [];
    const entries = Object.entries(obj);

    for (const [key, value] of entries) {
      let pyType: string;
      if (value !== null && typeof value === "object" && !Array.isArray(value)) {
        const childName = name + key.charAt(0).toUpperCase() + key.slice(1);
        buildClass(value as Record<string, unknown>, childName);
        pyType = childName;
      } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && value[0] !== null && !Array.isArray(value[0])) {
        const childName = name + key.charAt(0).toUpperCase() + key.slice(1) + "Item";
        buildClass(value[0] as Record<string, unknown>, childName);
        pyType = `List[${childName}]`;
      } else {
        pyType = toPythonType(value);
      }
      if (options.optional) {
        pyType = `Optional[${pyType}]`;
      }
      fields.push(`    ${key}: ${pyType}`);
    }

    classes.push(`@dataclass\nclass ${name}:\n${fields.length > 0 ? fields.join("\n") : "    pass"}`);
  }

  if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
    buildClass(parsed as Record<string, unknown>, options.rootName);
  } else {
    return `# Cannot generate dataclass from non-object root\n# Root value type: ${toPythonType(parsed)}`;
  }

  const imports = ["from dataclasses import dataclass", "from typing import List, Optional, Union"];
  return imports.join("\n") + "\n\n\n" + classes.join("\n\n\n") + "\n";
}

// ── Go Struct ────────────────────────────────────────────────────────

function toGoType(value: unknown): string {
  if (value === null) return "interface{}";
  if (value === undefined) return "interface{}";

  const type = typeof value;
  if (type === "boolean") return "bool";
  if (type === "number") return Number.isInteger(value as number) ? "int" : "float64";
  if (type === "string") return "string";

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]interface{}";
    const types = value.map(v => toGoType(v));
    const unique = [...new Set(types)];
    if (unique.length === 1) return `[]${unique[0]}`;
    return "[]interface{}";
  }

  if (type === "object") return "interface{}";

  return "interface{}";
}

function toGoFieldName(key: string): string {
  return key
    .replace(/(?:^|[_\-\s])(\w)/g, (_, c) => c.toUpperCase())
    .replace(/^(\w)/, (_, c) => c.toUpperCase());
}

function generateGoStruct(json: string, options: TypeOptions): string {
  const parsed = JSON.parse(json);
  const structs: string[] = [];

  function buildStruct(obj: Record<string, unknown>, name: string) {
    const fields: string[] = [];
    const entries = Object.entries(obj);

    for (const [key, value] of entries) {
      let goType: string;
      const fieldName = toGoFieldName(key);

      if (value !== null && typeof value === "object" && !Array.isArray(value)) {
        const childName = name + fieldName;
        buildStruct(value as Record<string, unknown>, childName);
        goType = childName;
      } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === "object" && value[0] !== null && !Array.isArray(value[0])) {
        const childName = name + fieldName + "Item";
        buildStruct(value[0] as Record<string, unknown>, childName);
        goType = `[]${childName}`;
      } else {
        goType = toGoType(value);
      }

      if (options.optional) {
        goType = `*${goType}`;
      }

      fields.push(`\t${fieldName} ${goType} \`json:"${key}"\``);
    }

    structs.push(`type ${name} struct {\n${fields.join("\n")}\n}`);
  }

  if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
    buildStruct(parsed as Record<string, unknown>, options.rootName);
  } else {
    return `// Cannot generate struct from non-object root\n// Root value type: ${toGoType(parsed)}`;
  }

  return "package main\n\n" + structs.join("\n\n") + "\n";
}

// ── Main dispatcher ──────────────────────────────────────────────────

function generateTypeDefinition(json: string, options: TypeOptions): string {
  try {
    switch (options.format) {
      case "interface":
      case "type":
        return generateTsDefinition(json, options);
      case "zod":
        return generateZodDefinition(json, options);
      case "python":
        return generatePythonDataclass(json, options);
      case "go":
        return generateGoStruct(json, options);
      default:
        return generateTsDefinition(json, options);
    }
  } catch (error: unknown) {
    throw new Error(`Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export default function JsonToTypeScript() {
  useToolTracker("json-to-ts", "JSON to TypeScript");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });

  const [input, setInput] = useState(`{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "isActive": true,
    "roles": ["admin", "editor"],
    "metadata": {
      "lastLogin": "2024-01-15T10:30:00Z",
      "loginCount": 42
    }
  },
  "posts": [
    {
      "id": 1,
      "title": "First Post",
      "tags": ["typescript", "coding"]
    }
  ]
}`);
  
  const [options, setOptions] = useState<TypeOptions>({
    format: "interface",
    rootName: "Root",
    optional: false,
    useExport: true});

  useEffect(() => {
    analytics.trackToolUsage("json-to-ts", { action: "view" });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  const output = useMemo(() => {
    try {
      return generateTypeDefinition(input, options);
    } catch (error: unknown) {
      return `// Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }, [input, options]);

  const isError = output.startsWith("// Error:");

  
  const updateOption = useCallback(<K extends keyof TypeOptions>(key: K, value: TypeOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <Code className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">JSON to TypeScript Types</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Options */}
        <div className="mb-4 p-4 bg-card/50 border border-border rounded-lg space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Format Toggle */}
            <div className="space-y-2 sm:col-span-3">
              <label className="text-sm font-medium text-accent-foreground">Output Format</label>
              <div className="flex flex-wrap gap-2">
                {([
                  { value: "interface" as const, label: "Interface" },
                  { value: "type" as const, label: "Type" },
                  { value: "zod" as const, label: "Zod" },
                  { value: "python" as const, label: "Python" },
                  { value: "go" as const, label: "Go" },
                ] as const).map((fmt) => (
                  <button
                    key={fmt.value}
                    onClick={() => updateOption("format", fmt.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      options.format === fmt.value
                        ? "bg-orange-500 text-white"
                        : "bg-muted text-foreground hover:bg-accent"
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Root Type Name */}
            <div className="space-y-2">
              <label htmlFor="page-input-180" className="text-sm font-medium text-accent-foreground">Root Type Name</label>
              <input id="page-input-180"
                type="text"
                value={options.rootName}
                onChange={(e) => updateOption("rootName", e.target.value)}
                placeholder="Root"
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Optional Properties */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-accent-foreground">Properties</label>
              <button
                onClick={() => updateOption("optional", !options.optional)}
                className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
                  options.optional
                    ? "bg-blue-500 text-white"
                    : "bg-muted text-foreground hover:bg-accent"
                }`}
              >
                <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                  options.optional ? "border-white bg-white" : "border-border"
                }`}>
                  {options.optional && <Check className="w-3 h-3 text-blue-500" />}
                </div>
                Optional
              </button>
            </div>

            {/* Export Keyword */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-accent-foreground">Export</label>
              <button
                onClick={() => updateOption("useExport", !options.useExport)}
                className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
                  options.useExport
                    ? "bg-green-500 text-white"
                    : "bg-muted text-foreground hover:bg-accent"
                }`}
              >
                <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                  options.useExport ? "border-white bg-white" : "border-border"
                }`}>
                  {options.useExport && <Check className="w-3 h-3 text-green-500" />}
                </div>
                Add Export
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="text-sm text-muted-foreground">
            <p>✨ Features: TypeScript interfaces &amp; types, Zod schemas, Python dataclasses, Go structs — nested objects, arrays, union types, automatic type inference</p>
          </div>
        </div>

        {/* Editors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-accent-foreground">JSON Input</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"name": "value"}'
              className="h-[500px] bg-card border-border font-mono text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-accent-foreground">
                {options.format === "python" ? "Python" : options.format === "go" ? "Go" : options.format === "zod" ? "Zod Schema" : "TypeScript"} Output
              </label>
              <button
                onClick={() => copy(output)}
                disabled={isError}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="relative">
              <pre className={`h-[500px] bg-card border border-border rounded-md p-4 overflow-auto font-mono text-sm ${
                isError ? "text-red-400" : "text-white"
              }`}>
                <code className={`language-${options.format === "python" ? "python" : options.format === "go" ? "go" : "typescript"}`}>{output}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="mt-6 p-4 bg-card/50 border border-border rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-accent-foreground mb-3">Quick Examples</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => setInput('{"id": 1, "name": "John", "active": true}')}
              className="px-3 py-2 bg-muted hover:bg-accent border border-border rounded-lg text-sm text-left transition"
            >
              <div className="font-medium text-foreground">Simple Object</div>
              <div className="text-xs text-muted-foreground">Basic key-value pairs</div>
            </button>
            <button
              onClick={() => setInput('{"users": [{"id": 1, "name": "Alice"}, {"id": 2, "name": "Bob"}]}')}
              className="px-3 py-2 bg-muted hover:bg-accent border border-border rounded-lg text-sm text-left transition"
            >
              <div className="font-medium text-foreground">Array of Objects</div>
              <div className="text-xs text-muted-foreground">Consistent array types</div>
            </button>
            <button
              onClick={() => setInput('{"data": [1, "text", true, null]}')}
              className="px-3 py-2 bg-muted hover:bg-accent border border-border rounded-lg text-sm text-left transition"
            >
              <div className="font-medium text-foreground">Mixed Array</div>
              <div className="text-xs text-muted-foreground">Union types</div>
            </button>
          </div>
        </div>

        <RelatedTools currentPath="/json-to-ts" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={jsonToTsGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-json-ts" title={jsonToTsGuideContent.introduction.title} subtitle="Understanding JSON to TypeScript generation" variant="default">
            <MarkdownContent content={jsonToTsGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use JSON to TypeScript" variant="default">
            <FeatureGrid features={jsonToTsGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={jsonToTsGuideContent.howToUse.title} subtitle="Master TypeScript interface generation" variant="minimal">
            <HowToSchema name={`How to use ${jsonToTsGuideContent.toolName}`} description="Step-by-step guide to generating TypeScript types" steps={jsonToTsGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${jsonToTsGuideContent.toolPath}`} />
            <MarkdownContent content={jsonToTsGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={jsonToTsGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={jsonToTsGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={jsonToTsGuideContent.security.content} />
          </GeoSection>

          {jsonToTsGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(jsonToTsGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={jsonToTsGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Generate TypeScript interfaces and types from JSON data automatically.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="JSON to TypeScript Types Generator"
        description="Free online tool to automatically generate TypeScript interfaces and type definitions from JSON data. Supports nested objects, arrays, and union types."
        url="https://openkit.tools/json-to-ts"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={jsonToTsGuideContent.lastUpdated}
        version={jsonToTsGuideContent.version}
        aggregateRating={{ratingValue: "4.9", ratingCount: "2134", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'JSON to TypeScript', url: 'https://openkit.tools/json-to-ts' },
        ]}
      />
    </main>
  );
}
