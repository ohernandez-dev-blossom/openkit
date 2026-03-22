"use client";
import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import { FileText, Copy, AlertCircle, CheckCircle2, ArrowDownUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RelatedTools } from "@/components/related-tools";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import jsYaml from "js-yaml";

const SAMPLE_YAML = `# Server configuration
server:
  host: 0.0.0.0
  port: 8080
  ssl:
    enabled: true
    cert: /etc/ssl/cert.pem
    key: /etc/ssl/key.pem

database:
  driver: postgres
  host: localhost
  port: 5432
  name: myapp_production
  pool:
    min: 5
    max: 20

logging:
  level: info
  format: json
  outputs:
    - stdout
    - file: /var/log/app.log

features:
  - name: dark-mode
    enabled: true
    rollout: 100
  - name: beta-api
    enabled: false
    rollout: 10`;

function sortObjectKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortObjectKeys);
  if (obj !== null && typeof obj === "object") {
    const sorted: Record<string, unknown> = {};
    for (const key of Object.keys(obj as Record<string, unknown>).sort()) {
      sorted[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
    }
    return sorted;
  }
  return obj;
}

interface ValidationResult {
  valid: boolean;
  error?: string;
  errorLine?: number;
  documentCount?: number;
  keyCount?: number;
}

function validateYaml(input: string): ValidationResult {
  if (!input.trim()) return { valid: false, error: "Input is empty" };
  try {
    const docs = jsYaml.loadAll(input);
    let keyCount = 0;
    const countKeys = (obj: unknown): number => {
      if (Array.isArray(obj)) return obj.reduce((sum: number, item: unknown) => sum + countKeys(item), 0);
      if (obj !== null && typeof obj === "object") {
        return Object.keys(obj as Record<string, unknown>).reduce(
          (sum: number, key: string) => sum + 1 + countKeys((obj as Record<string, unknown>)[key]), 0
        );
      }
      return 0;
    };
    for (const doc of docs) keyCount += countKeys(doc);
    return { valid: true, documentCount: docs.length, keyCount };
  } catch (e) {
    const yamlError = e as { mark?: { line?: number }; message?: string };
    return {
      valid: false,
      error: yamlError.message || "Invalid YAML",
      errorLine: yamlError.mark?.line !== undefined ? yamlError.mark.line + 1 : undefined,
    };
  }
}

export default function YAMLFormatter() {
  useToolTracker("yaml", "YAML Formatter", "formatters");
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [input, setInput] = useState(SAMPLE_YAML);
  const [indentSize, setIndentSize] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);
  const [flowLevel, setFlowLevel] = useState(-1);
  const [lineWidth, setLineWidth] = useState(80);

  useEffect(() => { analytics.trackToolUsage("yaml-formatter"); }, [analytics]);

  const validation = useMemo(() => validateYaml(input), [input]);

  const output = useMemo(() => {
    if (!input.trim()) return "";
    try {
      const docs = jsYaml.loadAll(input);
      return docs
        .map((doc) => {
          const data = sortKeys ? sortObjectKeys(doc) : doc;
          return jsYaml.dump(data, {
            indent: indentSize,
            lineWidth: lineWidth,
            flowLevel: flowLevel >= 0 ? flowLevel : -1,
            noRefs: true,
            sortKeys: false,
          });
        })
        .join("---\n");
    } catch { return ""; }
  }, [input, indentSize, sortKeys, flowLevel, lineWidth]);

  const handleFormat = useCallback(() => {
    if (output) {
      setInput(output);
      analytics.trackEvent("tool_interaction", "format", { sortKeys: String(sortKeys), indentSize });
    }
  }, [output, analytics, sortKeys, indentSize]);

  const handleMinify = useCallback(() => {
    if (!input.trim()) return;
    try {
      const docs = jsYaml.loadAll(input);
      const minified = docs
        .map((doc) => jsYaml.dump(doc, { flowLevel: 0, lineWidth: -1, noRefs: true }))
        .join("---\n");
      setInput(minified);
      analytics.trackEvent("tool_interaction", "minify");
    } catch { /* invalid yaml */ }
  }, [input, analytics]);

  const handleToJson = useCallback(() => {
    if (!input.trim()) return;
    try {
      const doc = jsYaml.load(input);
      copy(JSON.stringify(doc, null, 2));
      analytics.trackEvent("tool_interaction", "convert_to_json");
    } catch { /* invalid yaml */ }
  }, [input, copy, analytics]);

  const lineCount = input.split("\n").length;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <StructuredData
        type="WebApplication"
        name="YAML Formatter & Validator"
        description="Format, validate, and beautify YAML online for free. Sort keys, adjust indentation, detect errors with line numbers."
        url="https://openkit.tools/yaml"
        applicationCategory="DeveloperApplication"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://openkit.tools" },
          { name: "YAML Formatter", url: "https://openkit.tools/yaml" },
        ]}
      />
      <HowToSchema
        name="How to Format YAML"
        description="Format and validate YAML documents online"
        steps={[
          { name: "Paste YAML", text: "Paste your YAML content into the input area" },
          { name: "Configure options", text: "Set indent size, sort keys, and line width" },
          { name: "Format", text: "Click Format to beautify the YAML or copy the formatted output" },
        ]}
      />

      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <FileText className="w-5 h-5" />
              <span className="text-sm">OpenKit.tools</span>
            </Link>
            <span className="text-muted-foreground">/</span>
            <h1 className="text-lg font-semibold">YAML Formatter & Validator</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Validation status */}
        <div className="mb-4 flex items-center gap-4 text-sm">
          {validation.valid ? (
            <div className="flex items-center gap-2 text-green-500">
              <CheckCircle2 className="w-4 h-4" />
              <span>Valid YAML{validation.documentCount && validation.documentCount > 1 ? ` (${validation.documentCount} documents)` : ""}{validation.keyCount ? ` — ${validation.keyCount} keys` : ""}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-500">
              <AlertCircle className="w-4 h-4" />
              <span>{validation.error}{validation.errorLine ? ` (line ${validation.errorLine})` : ""}</span>
            </div>
          )}
          <span className="text-muted-foreground ml-auto">{lineCount} line{lineCount !== 1 ? "s" : ""} · {input.length} chars</span>
        </div>

        {/* Controls */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Indent:</label>
            <select value={indentSize} onChange={(e) => setIndentSize(Number(e.target.value))} className="bg-card border border-border rounded px-2 py-1 text-sm">
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Line width:</label>
            <select value={lineWidth} onChange={(e) => setLineWidth(Number(e.target.value))} className="bg-card border border-border rounded px-2 py-1 text-sm">
              <option value={60}>60</option>
              <option value={80}>80</option>
              <option value={120}>120</option>
              <option value={-1}>No wrap</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-muted-foreground">Flow level:</label>
            <select value={flowLevel} onChange={(e) => setFlowLevel(Number(e.target.value))} className="bg-card border border-border rounded px-2 py-1 text-sm">
              <option value={-1}>Block (default)</option>
              <option value={0}>Inline all</option>
              <option value={1}>Inline from depth 1</option>
              <option value={2}>Inline from depth 2</option>
            </select>
          </div>
          <button onClick={() => setSortKeys(!sortKeys)} className={`flex items-center gap-1.5 px-3 py-1 rounded text-sm border transition-colors ${sortKeys ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:text-foreground"}`}>
            <ArrowDownUp className="w-3.5 h-3.5" />Sort keys
          </button>
        </div>

        {/* Input / Output */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Input</label>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={() => setInput(SAMPLE_YAML)}>Sample</Button>
                <Button variant="ghost" size="sm" onClick={() => setInput("")}>Clear</Button>
              </div>
            </div>
            <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste your YAML here..." className="font-mono text-sm h-80 resize-y bg-card" spellCheck={false} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Formatted Output</label>
              <Button variant="ghost" size="sm" onClick={() => { if (output) copy(output); }} disabled={!output}>
                <Copy className="w-3.5 h-3.5 mr-1.5" />{isCopied ? "Copied!" : "Copy"}
              </Button>
            </div>
            <Textarea value={output} readOnly className="font-mono text-sm h-80 resize-y bg-muted/50" spellCheck={false} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mt-4">
          <Button onClick={handleFormat} disabled={!validation.valid}>Format & Apply</Button>
          <Button variant="outline" onClick={handleMinify} disabled={!validation.valid}>Minify</Button>
          <Button variant="outline" onClick={handleToJson} disabled={!validation.valid}>Copy as JSON</Button>
        </div>

        {/* Guide */}
        <div className="mt-12 space-y-8">
          <QuickStartGuide steps={[
            { title: "Paste YAML", description: "Paste or type your YAML content into the input area on the left." },
            { title: "Real-time Validation", description: "The formatter validates in real-time and shows errors with line numbers above the editor." },
            { title: "Configure Options", description: "Adjust indent size, line width, flow level, or toggle key sorting using the controls." },
            { title: "Format & Apply", description: "Click \"Format & Apply\" to replace your input with the formatted output, or copy the output directly." },
          ]} />

          <ToolFAQ faqs={[
            { question: "Does this tool send my YAML to a server?", answer: "No. All formatting and validation happens entirely in your browser. No data is ever sent to our servers." },
            { question: "Can I format multi-document YAML files?", answer: "Yes. The formatter handles multi-document YAML (separated by ---) and formats each document independently." },
            { question: "What YAML specification is supported?", answer: "This tool uses js-yaml which supports YAML 1.2 (core schema). It handles anchors, aliases, tags, multi-line strings, and all standard YAML features." },
            { question: "What does Flow Level do?", answer: "Flow level controls how deeply nested objects are displayed. \"Block\" (default) uses the standard indented style. \"Inline all\" puts everything on one line." },
            { question: "Can I convert YAML to JSON?", answer: "Yes! Click \"Copy as JSON\" to parse the YAML and copy the equivalent JSON to your clipboard." },
          ]} />

          <LastUpdated date="2026-02-06" />
        </div>

        <RelatedTools currentPath="/yaml" />
      </div>
    </main>
  );
}
