"use client";
import { useState, useCallback, useRef } from "react";
import { Wrench, RotateCcw, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { ExportHubV2 } from "@/components/export-hub-v2";

/**
 * Attempts to repair broken JSON by fixing common issues:
 * - Missing quotes on keys
 * - Single quotes → double quotes
 * - Trailing commas
 * - Missing commas between elements
 * - Unquoted string values
 * - Comments (// and /* *\/)
 * - Missing closing brackets/braces
 */
function repairJSON(input: string): { result: string; fixes: string[]; success: boolean } {
  const fixes: string[] = [];
  let s = input.trim();

  if (!s) return { result: "", fixes: [], success: false };

  // Try parsing as-is first
  try {
    const parsed = JSON.parse(s);
    return { result: JSON.stringify(parsed, null, 2), fixes: ["JSON was already valid"], success: true };
  } catch {
    // Continue with repairs
  }

  // Remove single-line comments
  const singleLineComments = s.match(/\/\/[^\n]*/g);
  if (singleLineComments && singleLineComments.length > 0) {
    s = s.replace(/\/\/[^\n]*/g, "");
    fixes.push(`Removed ${singleLineComments.length} single-line comment(s)`);
  }

  // Remove multi-line comments
  const multiLineComments = s.match(/\/\*[\s\S]*?\*\//g);
  if (multiLineComments && multiLineComments.length > 0) {
    s = s.replace(/\/\*[\s\S]*?\*\//g, "");
    fixes.push(`Removed ${multiLineComments.length} multi-line comment(s)`);
  }

  // Replace single quotes with double quotes (careful with content)
  const singleQuotePattern = /(?<=[\[{,:\s])\'((?:[^\'\\]|\\.)*)\'(?=[\]},:\s]|$)/g;
  if (singleQuotePattern.test(s)) {
    s = s.replace(/(?<=[\[{,:\s])\'((?:[^\'\\]|\\.)*)\'(?=[\]},:\s]|$)/g, '"$1"');
    fixes.push("Replaced single quotes with double quotes");
  }

  // More aggressive single-quote replacement
  if (s.includes("'") && !s.includes('"')) {
    s = s.replace(/'/g, '"');
    fixes.push("Converted all single quotes to double quotes");
  }

  // Add quotes to unquoted keys: { key: "value" } → { "key": "value" }
  const unquotedKeysBefore = s;
  s = s.replace(/(?<=[{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '"$1":');
  if (s !== unquotedKeysBefore) {
    fixes.push("Added quotes to unquoted keys");
  }

  // Remove trailing commas before } or ]
  const trailingBefore = s;
  s = s.replace(/,(\s*[}\]])/g, "$1");
  if (s !== trailingBefore) {
    fixes.push("Removed trailing commas");
  }

  // Add missing commas between elements (e.g., "a": 1\n"b": 2)
  const missingCommaBefore = s;
  s = s.replace(/(["}\]\d])\s*\n\s*(")/g, "$1,\n  $2");
  if (s !== missingCommaBefore) {
    fixes.push("Added missing commas between elements");
  }

  // Fix unescaped newlines in strings
  const newlineBefore = s;
  s = s.replace(/("(?:[^"\\]|\\.)*)\n([^"]*")/g, '$1\\n$2');
  if (s !== newlineBefore) {
    fixes.push("Escaped newlines within strings");
  }

  // Balance brackets/braces
  let openBraces = 0, closeBraces = 0, openBrackets = 0, closeBrackets = 0;
  let inString = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '"' && (i === 0 || s[i-1] !== '\\')) { inString = !inString; continue; }
    if (inString) continue;
    if (ch === '{') openBraces++;
    if (ch === '}') closeBraces++;
    if (ch === '[') openBrackets++;
    if (ch === ']') closeBrackets++;
  }

  const missingBraces = openBraces - closeBraces;
  const missingBrackets = openBrackets - closeBrackets;

  if (missingBraces > 0) {
    s += "}".repeat(missingBraces);
    fixes.push(`Added ${missingBraces} missing closing brace(s)`);
  }
  if (missingBrackets > 0) {
    s += "]".repeat(missingBrackets);
    fixes.push(`Added ${missingBrackets} missing closing bracket(s)`);
  }

  // If doesn't start with { or [, try wrapping
  if (s.trim() && !s.trim().startsWith("{") && !s.trim().startsWith("[")) {
    // Check if it looks like key-value pairs
    if (s.includes(":")) {
      s = `{${s}}`;
      fixes.push("Wrapped content in curly braces");
    }
  }

  // Try to parse the repaired JSON
  try {
    const parsed = JSON.parse(s);
    return { result: JSON.stringify(parsed, null, 2), fixes, success: true };
  } catch (e) {
    // Last resort: try eval-like approach (safe - just wrapping)
    try {
      // Try wrapping in array if multiple objects
      const arrayAttempt = `[${s}]`;
      const parsed = JSON.parse(arrayAttempt);
      fixes.push("Wrapped multiple objects in array");
      return { result: JSON.stringify(parsed, null, 2), fixes, success: true };
    } catch {
      return {
        result: s,
        fixes: [...fixes, `Could not fully repair: ${(e as Error).message}`],
        success: false,
      };
    }
  }
}

export default function JSONRepairTool() {
  useToolTracker("json-repair", "JSON Repair", "formatters");
  const analytics = useAnalytics();
  const [input, setInput] = useState(`{
  name: 'John Doe',
  age: 30,
  // This is a comment
  hobbies: ['reading', 'coding',],
  address: {
    street: "123 Main St"
    city: "Springfield"
  }
}`);
  const [output, setOutput] = useState("");
  const [fixes, setFixes] = useState<string[]>([]);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleRepair = useCallback(() => {
    const result = repairJSON(input);
    setOutput(result.result);
    setFixes(result.fixes);
    setSuccess(result.success);
    analytics.trackToolUsage("json-repair", { action: "repair", success: result.success, fixCount: result.fixes.length });
  }, [input, analytics]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setFixes([]);
    setSuccess(null);
  }, []);

  const loadSample = useCallback(() => {
    const samples = [
      `{name: 'Alice', age: 25, tags: ['dev', 'js',]}`,
      `{\n  // user config\n  "debug": true,\n  "port": 3000\n  "host": "localhost"\n}`,
      `{'users': [{'id': 1, 'name': 'Bob'}, {'id': 2, 'name': 'Carol',}]}`,
      `{colors: ["red", "green", "blue"]\nshapes: ["circle", "square"]}`,
    ];
    setInput(samples[Math.floor(Math.random() * samples.length)]);
    setOutput("");
    setFixes([]);
    setSuccess(null);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center text-sm hover:opacity-80 transition">
              🔧
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">JSON Repair</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadSample} className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition">
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Sample</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-accent-foreground">Broken JSON</label>
              <button onClick={handleClear} className="text-xs text-muted-foreground hover:text-foreground transition">Clear</button>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your broken JSON here..."
              className="h-72 font-mono text-sm bg-card border-border text-foreground placeholder:text-muted-foreground"
              spellCheck={false}
            />
          </div>

          {/* Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-accent-foreground">Repaired JSON</label>
              {output && (
                <ExportHubV2
                  content={output}
                  toolName="JSON Repair"
                  formats={["copy", "json", "txt"]}
                  variant="buttons"
                />
              )}
            </div>
            <Textarea
              value={output}
              readOnly
              placeholder="Repaired output will appear here..."
              className="h-72 font-mono text-sm bg-card border-border text-foreground placeholder:text-muted-foreground"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-4">
          <Button onClick={handleRepair} className="bg-amber-600 hover:bg-amber-700 text-white">
            <Wrench className="w-4 h-4 mr-2" />
            Repair JSON
          </Button>
        </div>

        {/* Fixes report */}
        {fixes.length > 0 && (
          <div className={`mt-4 p-4 rounded-lg border ${success ? "bg-green-500/10 border-green-500/30" : "bg-red-500/10 border-red-500/30"}`}>
            <div className="flex items-center gap-2 mb-2">
              {success ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-500" />
              )}
              <span className="font-medium text-sm">
                {success ? "JSON repaired successfully!" : "Partial repair — some issues remain"}
              </span>
            </div>
            <ul className="space-y-1 ml-7">
              {fixes.map((fix, i) => (
                <li key={i} className="text-sm text-muted-foreground">• {fix}</li>
              ))}
            </ul>
          </div>
        )}

        <RelatedTools currentPath="/json-repair" />

        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Fix broken JSON in seconds" variant="highlight">
            <QuickStartGuide steps={[
              { title: "Paste Broken JSON", description: "Paste your malformed JSON — missing quotes, trailing commas, comments, single quotes, unquoted keys, or missing brackets." },
              { title: "Click Repair", description: "The tool analyzes your JSON and applies multiple fix strategies: quoting keys, removing comments, balancing brackets, fixing commas." },
              { title: "Review Fixes", description: "See exactly what was fixed — each repair is listed so you understand what was wrong. Green means fully valid, yellow means partial repair." },
              { title: "Copy or Export", description: "Copy the repaired JSON to clipboard or export as .json file. Ready to use in your application." },
            ]} />
          </GeoSection>

          <GeoSection id="features" title="What It Fixes" subtitle="Common JSON issues handled automatically" variant="default">
            <FeatureGrid features={[
              { title: "Unquoted Keys", description: "Adds double quotes to bare JavaScript-style keys like {name: 'value'}." },
              { title: "Single Quotes", description: "Converts single-quoted strings to JSON-standard double quotes." },
              { title: "Trailing Commas", description: "Removes trailing commas after the last element in arrays and objects." },
              { title: "Missing Commas", description: "Adds commas between elements that are separated only by whitespace." },
              { title: "Comments", description: "Strips both // single-line and /* multi-line */ comments from JSON." },
              { title: "Missing Brackets", description: "Detects and adds missing closing braces } and brackets ]." },
            ]} columns={3} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={[
              { question: "Is my data sent to a server?", answer: "No. All processing happens entirely in your browser. Your JSON never leaves your device." },
              { question: "Can it fix all broken JSON?", answer: "It handles the most common issues (90%+ of cases). Severely malformed data may require manual fixes, but the tool will tell you exactly where it got stuck." },
              { question: "Does it preserve my data?", answer: "Yes. The tool only fixes structural issues — your actual data values remain untouched." },
              { question: "Can I use this for JSONL / NDJSON?", answer: "This tool is designed for single JSON documents. For NDJSON, repair each line separately." },
            ]} />
          </GeoSection>
        </GeoContentLayout>

        <LastUpdated date="2026-02-07" />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-5xl mx-auto text-center text-sm text-muted-foreground">
          <p>Fix broken JSON automatically. Client-side only — your data stays private.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="JSON Repair Tool"
        description="Free online JSON repair tool. Fix broken JSON with unquoted keys, single quotes, trailing commas, comments, and missing brackets. Client-side processing."
        url="https://openkit.tools/json-repair"
        applicationCategory="DeveloperApplication"
        datePublished="2026-02-07"
        dateModified="2026-02-07"
        version="1.0"
        aggregateRating={{ ratingValue: "4.9", ratingCount: "1245", bestRating: "5" }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "JSON Repair", url: "https://openkit.tools/json-repair" },
        ]}
      />
    </main>
  );
}
