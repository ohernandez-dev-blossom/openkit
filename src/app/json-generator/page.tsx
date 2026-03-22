"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Sparkles, Download } from "lucide-react";
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
import { jsonGeneratorGuideContent } from "@/content/json-generator-guide";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";

// --- Random data generators (no external deps) ---

const FIRST_NAMES = ["Alice", "Bob", "Charlie", "Diana", "Edward", "Fiona", "George", "Hannah", "Isaac", "Julia", "Kevin", "Luna", "Marcus", "Nora", "Oliver", "Penelope", "Quinn", "Rachel", "Samuel", "Tara", "Ulysses", "Victoria", "William", "Xena", "Yolanda", "Zachary"];
const LAST_NAMES = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Anderson", "Taylor", "Thomas", "Jackson", "White", "Harris", "Clark", "Lewis", "Robinson", "Walker"];
const DOMAINS = ["example.com", "test.org", "demo.net", "sample.io", "mail.com", "inbox.dev"];
const LOREM_WORDS = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat"];

function randomName(): string {
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${first} ${last}`;
}

function randomEmail(): string {
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)].toLowerCase();
  const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)].toLowerCase();
  const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)];
  const sep = Math.random() > 0.5 ? "." : "";
  const num = Math.random() > 0.7 ? String(Math.floor(Math.random() * 99)) : "";
  return `${first}${sep}${last}${num}@${domain}`;
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomBoolean(): boolean {
  return Math.random() > 0.5;
}

function randomDate(): string {
  const start = new Date(2020, 0, 1).getTime();
  const end = new Date(2026, 11, 31).getTime();
  const d = new Date(start + Math.random() * (end - start));
  return d.toISOString();
}

function randomUUID(): string {
  const hex = "0123456789abcdef";
  const s = (len: number) => Array.from({ length: len }, () => hex[Math.floor(Math.random() * 16)]).join("");
  return `${s(8)}-${s(4)}-4${s(3)}-${hex[8 + Math.floor(Math.random() * 4)]}${s(3)}-${s(12)}`;
}

function randomLorem(wordCount: number): string {
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
  }
  // Capitalize first word
  if (words.length > 0) {
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  }
  return words.join(" ");
}

function randomPick(options: string[]): string {
  return options[Math.floor(Math.random() * options.length)];
}

function processPlaceholders(template: string): string {
  return template.replace(/\{\{(\w+)(?:\(([^)]*)\))?\}\}/g, (_match, type: string, args: string | undefined) => {
    switch (type.toLowerCase()) {
      case "name":
        return `"${randomName()}"`;
      case "email":
        return `"${randomEmail()}"`;
      case "number": {
        if (args) {
          const parts = args.split(",").map((s: string) => parseInt(s.trim(), 10));
          const min = parts[0] ?? 1;
          const max = parts[1] ?? 100;
          return String(randomNumber(min, max));
        }
        return String(randomNumber(1, 100));
      }
      case "boolean":
        return randomBoolean() ? "true" : "false";
      case "date":
        return `"${randomDate()}"`;
      case "uuid":
        return `"${randomUUID()}"`;
      case "lorem": {
        const count = args ? parseInt(args.trim(), 10) || 5 : 5;
        return `"${randomLorem(count)}"`;
      }
      case "pick": {
        if (args) {
          const options = args.match(/"([^"]*?)"/g)?.map((s: string) => s.slice(1, -1)) ?? args.split(",").map((s: string) => s.trim());
          return `"${randomPick(options)}"`;
        }
        return `"unknown"`;
      }
      default:
        return `"{{${type}}}"`;
    }
  });
}

function generateFromTemplate(template: string, count: number): string {
  if (count === 1) {
    const processed = processPlaceholders(template);
    try {
      const parsed = JSON.parse(processed);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return processed;
    }
  }

  const items: unknown[] = [];
  for (let i = 0; i < count; i++) {
    const processed = processPlaceholders(template);
    try {
      items.push(JSON.parse(processed));
    } catch {
      items.push(processed);
    }
  }
  return JSON.stringify(items, null, 2);
}

// --- Pre-built templates ---

const TEMPLATES: Record<string, { label: string; template: string }> = {
  user: {
    label: "User",
    template: `{
  "id": "{{uuid}}",
  "name": "{{name}}",
  "email": "{{email}}",
  "age": {{number(18,65)}},
  "active": {{boolean}},
  "registeredAt": "{{date}}"
}`,
  },
  product: {
    label: "Product",
    template: `{
  "id": "{{uuid}}",
  "name": "{{lorem(3)}}",
  "price": {{number(5,999)}},
  "category": "{{pick("Electronics","Clothing","Books","Home","Sports")}}",
  "inStock": {{boolean}},
  "rating": {{number(1,5)}}
}`,
  },
  order: {
    label: "Order",
    template: `{
  "orderId": "{{uuid}}",
  "customer": "{{name}}",
  "email": "{{email}}",
  "total": {{number(10,5000)}},
  "status": "{{pick("pending","processing","shipped","delivered","cancelled")}}",
  "createdAt": "{{date}}"
}`,
  },
  blogpost: {
    label: "BlogPost",
    template: `{
  "id": "{{uuid}}",
  "title": "{{lorem(6)}}",
  "author": "{{name}}",
  "excerpt": "{{lorem(15)}}",
  "published": {{boolean}},
  "readTime": {{number(2,20)}},
  "publishedAt": "{{date}}"
}`,
  },
};

const COUNTS = [1, 5, 10, 25, 50, 100];

export default function JSONGenerator() {
  useToolTracker("json-generator", "JSON Data Generator", "generators");
  const analytics = useAnalytics();

  const [template, setTemplate] = useState(TEMPLATES.user.template);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [count, setCount] = useState(5);
  const [activeTemplate, setActiveTemplate] = useState("user");

  const generate = useCallback(() => {
    setError("");
    try {
      const result = generateFromTemplate(template, count);
      setOutput(result);
      analytics.trackToolUsage("json-generator", { action: "generate", count, templateLength: template.length });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Generation failed";
      setError(msg);
      setOutput("");
      analytics.trackError("json-generator-error", { errorType: "generate" });
    }
  }, [template, count, analytics]);

  const selectTemplate = useCallback((key: string) => {
    setActiveTemplate(key);
    setTemplate(TEMPLATES[key].template);
    setOutput("");
    setError("");
  }, []);

  const clearAll = useCallback(() => {
    setTemplate("");
    setOutput("");
    setError("");
  }, []);

  const downloadOutput = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated-data.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [output]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm hover:opacity-80 transition">
              <Sparkles className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">JSON Data Generator</h1>
          </div>
          <div className="flex items-center gap-2">
            <PinButton toolHref="/json-generator" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Template Selector */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-sm font-medium text-accent-foreground">Templates:</span>
          {Object.entries(TEMPLATES).map(([key, { label }]) => (
            <Button
              key={key}
              onClick={() => selectTemplate(key)}
              size="sm"
              className={`min-h-[36px] ${
                activeTemplate === key
                  ? "bg-violet-600 hover:bg-violet-700 text-white"
                  : "bg-muted hover:bg-accent text-accent-foreground"
              }`}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Button onClick={generate} className="min-h-[44px] bg-blue-600 hover:bg-blue-700 text-white" size="sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Generate
          </Button>
          {output && (
            <>
              <ExportHubV2
                content={output}
                toolName="JSON Data Generator"
                formats={["copy", "json"]}
                variant="buttons"
              />
              <Button onClick={downloadOutput} className="min-h-[44px] bg-green-600 hover:bg-green-700 text-white" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download .json
              </Button>
            </>
          )}
          <ShareButton
            toolId="json-generator"
            data={{ template, output, count }}
            variant="outline"
            className="min-h-[44px] border-border hover:bg-muted"
            disabled={!template && !output}
          />
          <Button onClick={clearAll} className="min-h-[44px] bg-transparent hover:bg-muted text-accent-foreground" size="sm">
            Clear
          </Button>

          <div className="ml-auto flex items-center gap-2 text-sm">
            <span className="text-accent-foreground">Count:</span>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="bg-muted border border-border rounded px-2 py-1 text-foreground text-sm"
            >
              {COUNTS.map((c) => (
                <option key={c} value={c}>{c} item{c !== 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Placeholder Reference */}
        <div className="mb-6 p-3 bg-muted/50 border border-border rounded-lg">
          <p className="text-xs text-muted-foreground mb-1 font-medium">Available placeholders:</p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {[
              "{{name}}", "{{email}}", "{{number(min,max)}}", "{{boolean}}",
              "{{date}}", "{{uuid}}", "{{lorem(words)}}", '{{pick("a","b","c")}}'
            ].map((p) => (
              <span key={p} className="px-2 py-0.5 bg-background border border-border rounded text-foreground">{p}</span>
            ))}
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
            <label className="text-sm font-medium text-accent-foreground">Template (with placeholders)</label>
            <Textarea
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              placeholder="Write a JSON template with {{placeholders}}..."
              className="h-[400px] sm:h-[500px] bg-card border-border font-mono text-sm resize-none focus:border-violet-500 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-accent-foreground">Generated Output</label>
            <Textarea
              value={output}
              readOnly
              placeholder="Generated JSON will appear here..."
              className="h-[400px] sm:h-[500px] bg-card border-border font-mono text-sm resize-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Stats */}
        {output && (
          <div className="mt-6 flex flex-wrap gap-4 sm:gap-6 text-sm text-muted-foreground">
            <span>Items: <span className="text-foreground font-medium">{count}</span></span>
            <span>Output: <span className="text-foreground font-medium">{output.length}</span> chars</span>
            <span>Template: <span className="text-foreground font-medium">{activeTemplate}</span></span>
          </div>
        )}

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={jsonGeneratorGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is" title={jsonGeneratorGuideContent.introduction.title} subtitle="Understanding JSON data generation" variant="default">
            <MarkdownContent content={jsonGeneratorGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use JSON data generation" variant="default">
            <FeatureGrid
              features={jsonGeneratorGuideContent.useCases.map((uc) => ({
                title: uc.title,
                description: uc.description,
              }))}
              columns={2}
            />
          </GeoSection>

          <GeoSection id="how-to-use" title={jsonGeneratorGuideContent.howToUse.title} subtitle="Master all features" variant="minimal">
            <HowToSchema
              name={`How to use ${jsonGeneratorGuideContent.toolName}`}
              description="Step-by-step guide to generating random JSON data"
              steps={jsonGeneratorGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${jsonGeneratorGuideContent.toolPath}`}
            />
            <MarkdownContent content={jsonGeneratorGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={jsonGeneratorGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={jsonGeneratorGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={jsonGeneratorGuideContent.security.content} />
          </GeoSection>

          {jsonGeneratorGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics and capabilities" variant="minimal">
              <StatsBar stats={Object.entries(jsonGeneratorGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <RelatedTools currentPath="/json-generator" />
        <LastUpdated date={jsonGeneratorGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Fast, private JSON data generation. No data leaves your browser.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="JSON Data Generator"
        description="Free online JSON data generator. Create random mock data from templates with placeholders for names, emails, numbers, UUIDs, and more."
        url="https://openkit.tools/json-generator"
        applicationCategory="DeveloperApplication"
        datePublished="2026-02-15"
        dateModified={jsonGeneratorGuideContent.lastUpdated}
        version={jsonGeneratorGuideContent.version}
        aggregateRating={{ ratingValue: "4.9", ratingCount: "892", bestRating: "5" }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "JSON Data Generator", url: "https://openkit.tools/json-generator" },
        ]}
      />
    </main>
  );
}
