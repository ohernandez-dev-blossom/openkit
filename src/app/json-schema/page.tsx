"use client";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { FileCode2, Copy, Check, RefreshCw, Settings2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
import { jsonSchemaGuideContent } from "@/content/json-schema-guide";
import { useAnalytics } from "@/hooks/use-analytics";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { SHORTCUTS } from "@/lib/keyboard-shortcuts";

interface SchemaOptions {
  draft: "draft-04" | "draft-07" | "2020-12";
  required: boolean;
  examples: boolean;
  descriptions: boolean;
  additionalProperties: boolean;
  title: string;
}

function inferSchema(value: unknown, options: SchemaOptions, _key?: string): Record<string, unknown> {
  if (value === null) {
    return { type: "null" };
  }

  if (value === undefined) {
    return {};
  }

  const t = typeof value;

  if (t === "boolean") {
    const schema: Record<string, unknown> = { type: "boolean" };
    if (options.examples) schema.examples = [value];
    return schema;
  }

  if (t === "number") {
    const isInt = Number.isInteger(value);
    const schema: Record<string, unknown> = { type: isInt ? "integer" : "number" };
    if (options.examples) schema.examples = [value];
    return schema;
  }

  if (t === "string") {
    const schema: Record<string, unknown> = { type: "string" };
    const s = value as string;

    // Detect formats
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(s)) {
      schema.format = "date-time";
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
      schema.format = "date";
    } else if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(s)) {
      schema.format = "email";
    } else if (/^https?:\/\//.test(s)) {
      schema.format = "uri";
    } else if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s)) {
      schema.format = "uuid";
    } else if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(s)) {
      schema.format = "ipv4";
    }

    if (options.examples) schema.examples = [s.length > 50 ? s.slice(0, 50) + "..." : s];
    return schema;
  }

  if (Array.isArray(value)) {
    const schema: Record<string, unknown> = { type: "array" };

    if (value.length === 0) {
      schema.items = {};
    } else {
      // Check if all items have the same shape
      const itemSchemas = value.map((item) => inferSchema(item, options));

      // Simple check: if all same type, use the first one
      const types = itemSchemas.map((s) => JSON.stringify(s));
      const uniqueTypes = [...new Set(types)];

      if (uniqueTypes.length === 1) {
        schema.items = itemSchemas[0];
      } else {
        // Try to merge object schemas
        const allObjects = value.every((v) => typeof v === "object" && v !== null && !Array.isArray(v));
        if (allObjects) {
          schema.items = mergeObjectSchemas(
            value as Record<string, unknown>[],
            options
          );
        } else {
          // Mixed types — use anyOf
          const seen = new Set<string>();
          const unique: Record<string, unknown>[] = [];
          for (const s of itemSchemas) {
            const key = JSON.stringify(s);
            if (!seen.has(key)) {
              seen.add(key);
              unique.push(s);
            }
          }
          schema.items = unique.length === 1 ? unique[0] : { anyOf: unique };
        }
      }
    }

    if (options.examples && value.length > 0) {
      schema.examples = [value.slice(0, 2)];
    }

    return schema;
  }

  if (t === "object") {
    return inferObjectSchema(value as Record<string, unknown>, options);
  }

  return {};
}

function inferObjectSchema(
  obj: Record<string, unknown>,
  options: SchemaOptions
): Record<string, unknown> {
  const properties: Record<string, unknown> = {};
  const required: string[] = [];

  for (const [key, val] of Object.entries(obj)) {
    properties[key] = inferSchema(val, options, key);
    if (options.descriptions) {
      (properties[key] as Record<string, unknown>).description = `The ${key} field`;
    }
    if (options.required && val !== null && val !== undefined) {
      required.push(key);
    }
  }

  const schema: Record<string, unknown> = {
    type: "object",
    properties,
  };

  if (required.length > 0) {
    schema.required = required;
  }

  if (!options.additionalProperties) {
    schema.additionalProperties = false;
  }

  return schema;
}

function mergeObjectSchemas(
  objects: Record<string, unknown>[],
  options: SchemaOptions
): Record<string, unknown> {
  const allKeys = new Set<string>();
  const keyValues: Record<string, unknown[]> = {};

  for (const obj of objects) {
    for (const [key, value] of Object.entries(obj)) {
      allKeys.add(key);
      if (!keyValues[key]) keyValues[key] = [];
      keyValues[key].push(value);
    }
  }

  const properties: Record<string, unknown> = {};
  const required: string[] = [];

  for (const key of allKeys) {
    const values = keyValues[key];
    // Use first non-null value to infer schema
    const representative = values.find((v) => v !== null && v !== undefined) ?? values[0];
    properties[key] = inferSchema(representative, options, key);
    if (options.descriptions) {
      (properties[key] as Record<string, unknown>).description = `The ${key} field`;
    }
    // Only required if present in ALL objects
    if (options.required && values.length === objects.length) {
      required.push(key);
    }
  }

  const schema: Record<string, unknown> = {
    type: "object",
    properties,
  };

  if (required.length > 0) {
    schema.required = required;
  }

  if (!options.additionalProperties) {
    schema.additionalProperties = false;
  }

  return schema;
}

const SAMPLE_JSON = `{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "active": true,
  "created_at": "2026-01-15T10:30:00Z",
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "zip": "62704"
  },
  "tags": ["developer", "admin"],
  "scores": [95, 87, 92]
}`;

const DRAFT_URLS: Record<string, string> = {
  "draft-04": "http://json-schema.org/draft-04/schema#",
  "draft-07": "http://json-schema.org/draft-07/schema#",
  "2020-12": "https://json-schema.org/draft/2020-12/schema",
};

export default function JsonSchemaPage() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const { isCopied, copy } = useCopyToClipboard();
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<SchemaOptions>({
    draft: "draft-07",
    required: true,
    examples: false,
    descriptions: false,
    additionalProperties: true,
    title: "Root",
  });

  useToolTracker("json-schema", "JSON Schema Generator");
  const { trackEvent } = useAnalytics();

  const { schema, parseError } = useMemo(() => {
    if (!input.trim()) {
      return { schema: "", parseError: null };
    }

    try {
      const parsed = JSON.parse(input);

      const baseSchema: Record<string, unknown> = {
        "$schema": DRAFT_URLS[options.draft],
      };

      if (options.title) {
        baseSchema.title = options.title;
      }

      const inferred = inferSchema(parsed, options);

      const fullSchema = { ...baseSchema, ...inferred };
      return { schema: JSON.stringify(fullSchema, null, 2), parseError: null };
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      return { schema: "", parseError: msg };
    }
  }, [input, options]);

  const handleCopy = useCallback(() => {
    if (schema) {
      copy(schema);
      trackEvent("tool_interaction", "copy", { tool_name: "json-schema", draft: options.draft });
    }
  }, [schema, copy, trackEvent, options.draft]);

  const handleLoadSample = useCallback(() => {
    setInput(SAMPLE_JSON);
    trackEvent("tool_interaction", "load_sample", { tool_name: "json-schema" });
  }, [trackEvent]);

  const handleClear = useCallback(() => {
    setInput("");
  }, []);

  useKeyboardShortcut(SHORTCUTS.copy, handleCopy);
  useKeyboardShortcut(SHORTCUTS.clear, handleClear);

  // Count schema stats
  const schemaStats = useMemo(() => {
    if (!schema) return { properties: 0, required: 0, nested: 0 };
    try {
      const parsed = JSON.parse(schema);
      const countProps = (obj: Record<string, unknown>): { props: number; req: number; nested: number } => {
        let props = 0;
        let req = 0;
        let nested = 0;
        if (obj.properties) {
          const p = obj.properties as Record<string, Record<string, unknown>>;
          props += Object.keys(p).length;
          for (const val of Object.values(p)) {
            if (val.type === "object" && val.properties) {
              nested++;
              const sub = countProps(val);
              props += sub.props;
              req += sub.req;
              nested += sub.nested;
            }
          }
        }
        if (Array.isArray(obj.required)) {
          req += obj.required.length;
        }
        return { props, req, nested };
      };
      const stats = countProps(parsed);
      return { properties: stats.props, required: stats.req, nested: stats.nested };
    } catch {
      return { properties: 0, required: 0, nested: 0 };
    }
  }, [schema]);

  return (
    <main className="min-h-screen bg-background">
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://openkit.tools" },
          { name: "JSON Schema Generator", url: "https://openkit.tools/json-schema" },
        ]}
      />
      <StructuredData
        type="WebApplication"
        name="JSON Schema Generator - OpenKit.tools"
        description="Generate JSON Schema from any JSON object. Supports Draft-04, Draft-07, and 2020-12 with format detection, required fields, and examples."
        url="https://openkit.tools/json-schema"
        applicationCategory="DeveloperApplication"
        offers={{ price: "0", priceCurrency: "USD" }}
      />
      <HowToSchema
        name="How to Generate JSON Schema from JSON"
        description="Convert any JSON object into a valid JSON Schema definition"
        steps={[
          { name: "Paste JSON", text: "Paste your JSON object in the input area" },
          { name: "Configure options", text: "Configure schema options (draft version, required fields, format detection)" },
          { name: "View schema", text: "View the generated schema in real-time on the right" },
          { name: "Copy schema", text: "Copy the schema for use in your API validation" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <FileCode2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-2">
              JSON Schema Generator
            </h1>
            <p className="text-muted-foreground mt-1">
              Generate JSON Schema from any JSON object. Supports Draft-04, Draft-07, and 2020-12.
            </p>
          </div>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </Link>
        </div>

        {/* Options bar */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Settings2 className="w-4 h-4" />
            Options
          </button>

          <select
            value={options.draft}
            onChange={(e) =>
              setOptions((o) => ({ ...o, draft: e.target.value as SchemaOptions["draft"] }))
            }
            className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-sm text-foreground"
          >
            <option value="draft-04">Draft-04</option>
            <option value="draft-07">Draft-07</option>
            <option value="2020-12">2020-12</option>
          </select>

          <button
            onClick={handleLoadSample}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Sample
          </button>

          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-lg bg-secondary/50 border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear
          </button>

          {schema && (
            <div className="ml-auto flex items-center gap-3 text-xs text-muted-foreground">
              <span>{schemaStats.properties} properties</span>
              <span>{schemaStats.required} required</span>
              {schemaStats.nested > 0 && <span>{schemaStats.nested} nested</span>}
            </div>
          )}
        </div>

        {/* Options panel */}
        {showOptions && (
          <div className="mb-4 p-4 rounded-xl bg-secondary/30 border border-border">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.required}
                  onChange={(e) => setOptions((o) => ({ ...o, required: e.target.checked }))}
                  className="rounded border-border"
                />
                Required fields
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.examples}
                  onChange={(e) => setOptions((o) => ({ ...o, examples: e.target.checked }))}
                  className="rounded border-border"
                />
                Include examples
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.descriptions}
                  onChange={(e) => setOptions((o) => ({ ...o, descriptions: e.target.checked }))}
                  className="rounded border-border"
                />
                Descriptions
              </label>
              <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.additionalProperties}
                  onChange={(e) =>
                    setOptions((o) => ({ ...o, additionalProperties: e.target.checked }))
                  }
                  className="rounded border-border"
                />
                Additional props
              </label>
              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground whitespace-nowrap">Title:</label>
                <input
                  type="text"
                  value={options.title}
                  onChange={(e) => setOptions((o) => ({ ...o, title: e.target.value }))}
                  className="w-full px-2 py-1 rounded bg-background border border-border text-sm text-foreground"
                  placeholder="Schema title"
                />
              </div>
            </div>
          </div>
        )}

        {/* Main editor area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">JSON Input</label>
              <span className="text-xs text-muted-foreground">
                {input.length > 0 ? `${input.split("\n").length} lines` : "Empty"}
              </span>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className="min-h-[400px] sm:min-h-[500px] font-mono text-sm bg-secondary/30 border-border resize-none"
              spellCheck={false}
            />
            {parseError && (
              <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono">
                {parseError}
              </div>
            )}
          </div>

          {/* Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">JSON Schema</label>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                disabled={!schema}
                className="h-7 text-xs"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3 h-3 mr-1" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-1" /> Copy
                  </>
                )}
              </Button>
            </div>
            <Textarea
              value={schema}
              readOnly
              placeholder="Generated schema will appear here..."
              className="min-h-[400px] sm:min-h-[500px] font-mono text-sm bg-secondary/30 border-border resize-none"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border text-[10px]">Ctrl</kbd>
            +
            <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border text-[10px]">Shift</kbd>
            +
            <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border text-[10px]">C</kbd>
            {" "}Copy schema
          </span>
          <span>
            <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border text-[10px]">Ctrl</kbd>
            +
            <kbd className="px-1.5 py-0.5 rounded bg-secondary border border-border text-[10px]">L</kbd>
            {" "}Clear
          </span>
        </div>

        {/* Quick Start & FAQ */}
        <div className="mt-8 sm:mt-12 space-y-8">
          <QuickStartGuide
            steps={[
              { title: "Paste JSON", description: "Paste a JSON object or array in the input area" },
              { title: "Choose draft", description: "Choose your preferred JSON Schema draft version" },
              { title: "Configure", description: "Configure options: required fields, examples, descriptions" },
              { title: "Copy schema", description: "Copy the generated schema for your API validation" },
            ]}
          />

          <GeoContentLayout>
            <GeoSection title="What is JSON Schema?">
              <MarkdownContent content={jsonSchemaGuideContent} />
            </GeoSection>

            <GeoSection title="Features">
              <FeatureGrid
                features={[
                  { title: "Format Detection", description: "Auto-detects date-time, email, URI, UUID, and IPv4 formats" },
                  { title: "Multiple Drafts", description: "Generate schemas for Draft-04, Draft-07, or 2020-12" },
                  { title: "Nested Objects", description: "Full support for deeply nested objects and arrays" },
                  { title: "Array Inference", description: "Merges array items to create unified schemas" },
                  { title: "Client-side", description: "All processing happens in your browser — nothing leaves your machine" },
                  { title: "Configurable", description: "Toggle required fields, examples, descriptions, and more" },
                ]}
              />
            </GeoSection>

            <GeoSection title="Stats">
              <StatsBar
                stats={[
                  { label: "Supported Drafts", value: "3" },
                  { label: "Format Types", value: "6" },
                  { label: "Processing", value: "Client-side" },
                ]}
              />
            </GeoSection>
          </GeoContentLayout>

          <ToolFAQ
            faqs={[
              {
                question: "What JSON Schema drafts are supported?",
                answer: "We support Draft-04, Draft-07, and the latest 2020-12 specification. Draft-07 is the most widely used.",
              },
              {
                question: "Does this tool detect string formats?",
                answer: "Yes! It automatically detects date-time (ISO 8601), date, email, URI, UUID, and IPv4 formats and adds the appropriate 'format' keyword.",
              },
              {
                question: "How are arrays with mixed types handled?",
                answer: "If all items share the same structure, they're merged into a single schema. For mixed types, it uses 'anyOf' to represent the different schemas.",
              },
              {
                question: "Is my data sent anywhere?",
                answer: "No. All processing happens entirely in your browser. Your JSON never leaves your device.",
              },
              {
                question: "Can I use the generated schema with API validation libraries?",
                answer: "Absolutely. The generated schema is valid JSON Schema and works with Ajv, Joi, Zod (via conversion), and any JSON Schema compatible validator.",
              },
            ]}
          />
        </div>

        <LastUpdated date="2026-02-06" />

        <RelatedTools currentPath="/json-schema" maxVisible={12} />
      </div>
    </main>
  );
}
