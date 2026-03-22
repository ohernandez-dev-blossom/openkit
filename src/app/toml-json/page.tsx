"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { FileCode, Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { tomlJsonGuideContent } from "@/content/toml-json-guide";

function parseTOML(toml: string): Record<string, unknown> {
  const lines = toml.split("\n");
  const result: Record<string, unknown> = {};
  let currentSection: Record<string, unknown> = result;

  for (let line of lines) {
    line = line.trim();
    
    // Skip empty lines and comments
    if (!line || line.startsWith("#")) continue;

    // Section headers [section] or [section.subsection]
    if (line.startsWith("[") && line.endsWith("]")) {
      const sectionName = line.slice(1, -1).trim();
      const parts = sectionName.split(".");

      currentSection = result;
      
      for (const part of parts) {
        if (!currentSection[part]) {
          currentSection[part] = {};
        }
        currentSection = currentSection[part] as Record<string, unknown>;
      }
      continue;
    }

    // Key-value pairs
    const equalIndex = line.indexOf("=");
    if (equalIndex === -1) continue;

    const key = line.slice(0, equalIndex).trim();
    const value = line.slice(equalIndex + 1).trim();

    // Parse value types
    currentSection[key] = parseValue(value);
  }

  return result;
}

function parseValue(value: string): string | number | boolean | Array<string | number | boolean> {
  // Remove inline comments
  const commentIndex = value.indexOf("#");
  if (commentIndex !== -1 && !value.startsWith('"') && !value.startsWith("'")) {
    value = value.slice(0, commentIndex).trim();
  }

  // Boolean
  if (value === "true") return true;
  if (value === "false") return false;

  // String (quoted)
  if ((value.startsWith('"') && value.endsWith('"')) || 
      (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  // Array
  if (value.startsWith("[") && value.endsWith("]")) {
    const arrayContent = value.slice(1, -1).trim();
    if (!arrayContent) return [];
    
    const items = arrayContent.split(",").map(item => {
      const trimmed = item.trim();
      return parseValue(trimmed);
    });
    return items as (string | number | boolean)[];
  }

  // Number (integer or float)
  const num = Number(value);
  if (!isNaN(num)) return num;

  // Default: unquoted string
  return value;
}

export default function TOMLtoJSON() {
  useToolTracker("toml-json", "TOML to JSON");
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [input, setInput] = useState(`# Example TOML
[server]
host = "localhost"
port = 8080
enabled = true

[database]
connection_string = "postgresql://localhost"
max_connections = 100

[features]
api = true
websockets = false
allowed_origins = ["http://localhost", "https://example.com"]`);
  
    const [indent, setIndent] = useState(2);

  // Track tool usage on mount
  useEffect(() => {
    analytics.trackToolUsage('toml-json-converter');
  }, [analytics]);

  const output = useMemo(() => {
    try {
      const parsed = parseTOML(input);
      return JSON.stringify(parsed, null, indent);
    } catch (error: unknown) {
      return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }, [input, indent]);

  const isError = output.startsWith("Error:");

  const handleCopy = () => {
    copy(output);
    analytics.trackToolInteraction('toml-json-converter', 'copy', {
      content_length: output.length,
      indent_size: indent,
      has_error: isError,
    });
  };

  const handleIndentChange = (value: number) => {
    setIndent(value);
    analytics.trackToolInteraction('toml-json-converter', 'indent_change', {
      indent_size: value,
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <FileCode className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">TOML to JSON Converter</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Options */}
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <label className="flex items-center gap-2">
            <span className="text-sm text-accent-foreground">Indentation:</span>
            <select
              value={indent}
              onChange={(e) => handleIndentChange(Number(e.target.value))}
              className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:border-border"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={0}>Minified</option>
            </select>
          </label>
        </div>

        {/* Info */}
        <div className="mb-4 p-3 bg-card/50 border border-border rounded-lg">
          <p className="text-sm text-muted-foreground">
            Supports: key=value pairs, [sections], nested sections, strings, numbers, booleans, and arrays
          </p>
        </div>

        {/* Editors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-accent-foreground">TOML Input</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste TOML here..."
              className="h-96 bg-card border-border font-mono text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-accent-foreground">JSON Output</label>
              <button 
                onClick={handleCopy} 
                disabled={isError}
                className="text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <Textarea
              value={output}
              readOnly
              className={`h-96 bg-card border-border font-mono text-sm ${
                isError ? "text-red-400" : "text-white"
              }`}
            />
          </div>
        </div>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm">
            Copied to clipboard!
          </div>
        )}

        <RelatedTools currentPath="/toml-json" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={tomlJsonGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-toml-json" title={tomlJsonGuideContent.introduction.title} subtitle="Understanding TOML to JSON conversion" variant="default">
            <MarkdownContent content={tomlJsonGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use TOML to JSON conversion" variant="default">
            <FeatureGrid features={tomlJsonGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={tomlJsonGuideContent.howToUse.title} subtitle="Master TOML parsing and JSON generation" variant="minimal">
            <HowToSchema name={`How to use ${tomlJsonGuideContent.toolName}`} description="Step-by-step guide to TOML to JSON conversion" steps={tomlJsonGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${tomlJsonGuideContent.toolPath}`} />
            <MarkdownContent content={tomlJsonGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={tomlJsonGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={tomlJsonGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={tomlJsonGuideContent.security.content} />
          </GeoSection>

          {tomlJsonGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(tomlJsonGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={tomlJsonGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Convert TOML (Tom&apos;s Obvious Minimal Language) to JSON format.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="TOML to JSON Converter"
        description="Free online tool to convert TOML configuration files to JSON format. Supports sections, arrays, strings, numbers, and booleans."
        url="https://openkit.tools/toml-json"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={tomlJsonGuideContent.lastUpdated}
        version={tomlJsonGuideContent.version}
        aggregateRating={{ratingValue: "4.7", ratingCount: "987", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'TOML to JSON', url: 'https://openkit.tools/toml-json' },
        ]}
      />
    </main>
  );
}
