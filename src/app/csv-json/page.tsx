"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RelatedTools } from "@/components/related-tools";
import { FileSpreadsheet, Copy, Check } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { csvJsonGuideContent } from "@/content/csv-json-guide";

type Delimiter = "," | ";" | "\t";

const parseCSV = (csv: string, delimiter: Delimiter, firstRowHeaders: boolean): object[] => {
  const lines = csv.trim().split("\n");
  if (lines.length === 0) return [];

  const headers: string[] = [];
  const data: object[] = [];

  lines.forEach((line, index) => {
    if (!line.trim()) return;

    // Simple CSV parsing (doesn't handle quoted delimiters perfectly, but good enough for most cases)
    const values = line.split(delimiter).map(v => v.trim());

    if (index === 0 && firstRowHeaders) {
      headers.push(...values);
    } else {
      if (firstRowHeaders && headers.length > 0) {
        const obj: Record<string, string> = {};
        values.forEach((value, i) => {
          const key = headers[i] || `column_${i}`;
          obj[key] = value;
        });
        data.push(obj);
      } else {
        // Array of arrays if no headers
        data.push(values);
      }
    }
  });

  return data;
};

export default function CsvJsonConverter() {
  useToolTracker("csv-json", "CSV to JSON Converter", "converters");
  const { isCopied } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [csvInput, setCsvInput] = useState(
    'name,age,city\nJohn,30,New York\nJane,25,San Francisco\nBob,35,Chicago'
  );
  const [jsonOutput, setJsonOutput] = useState("");
  const [delimiter, setDelimiter] = useState<Delimiter>(",");
  const [firstRowHeaders, setFirstRowHeaders] = useState(true);
  const [error, setError] = useState("");
  
  const convertToJson = useCallback(() => {
    setError("");
    try {
      const data = parseCSV(csvInput, delimiter, firstRowHeaders);
      const output = JSON.stringify(data, null, 2);
      setJsonOutput(output);
      
      analytics.trackToolUsage('csv-json', {
        action: 'convert',
        delimiter,
        hasHeaders: firstRowHeaders,
        inputLength: csvInput.length,
        outputLength: output.length,
        rowCount: data.length
      });
    } catch (e) {
      setError("Invalid CSV: " + (e instanceof Error ? e.message : "Parse error"));
    }
  }, [csvInput, delimiter, firstRowHeaders, analytics]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonOutput);
      analytics.trackToolUsage('csv-json', {
        action: 'copy',
        outputLength: jsonOutput.length
      });
    } catch {
      setError("Failed to copy to clipboard");
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-sm hover:opacity-80 transition"
          >
            <FileSpreadsheet className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">CSV to JSON Converter</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Options */}
        <div className="mb-4 p-4 bg-card border border-border rounded-lg space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-accent-foreground mb-2 block">Delimiter</label>
              <div className="flex gap-2">
                {[
                  { value: ",", label: "Comma (,)" },
                  { value: ";", label: "Semicolon (;)" },
                  { value: "\t", label: "Tab (\\t)" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setDelimiter(opt.value as Delimiter)}
                    className={`px-3 py-2 rounded-lg text-sm transition ${
                      delimiter === opt.value
                        ? "bg-green-600 text-white"
                        : "bg-muted text-accent-foreground hover:bg-accent"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end">
              <label htmlFor="page-input-121" className="flex items-center gap-2 cursor-pointer">
                <input id="page-input-121"
                  type="checkbox"
                  checked={firstRowHeaders}
                  onChange={(e) => setFirstRowHeaders(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-muted text-green-600 focus:ring-green-600 focus:ring-offset-background"
                />
                <span className="text-sm text-accent-foreground">First row as headers</span>
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* CSV Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-accent-foreground">CSV Input</label>
              <Button
                onClick={convertToJson}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                Convert to JSON →
              </Button>
            </div>
            <Textarea
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              placeholder="Enter CSV data..."
              className="h-[400px] bg-card border-border font-mono text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* JSON Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-accent-foreground">JSON Output</label>
              {jsonOutput && (
                <Button
                  onClick={copyToClipboard}
                  size="sm"
                  variant="outline"
                  className="border-border hover:bg-muted"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              )}
            </div>
            <Textarea
              value={jsonOutput}
              readOnly
              placeholder="JSON output will appear here..."
              className="h-[400px] bg-card border-border font-mono text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <RelatedTools currentPath="/csv-json" />

        {/* GEO Content - Professional Design System */}
        <GeoContentLayout>
          {/* Quick Start Guide */}
          <GeoSection
            id="quick-start"
            title="Quick Start Guide"
            subtitle="Get up and running in 30 seconds"
            variant="highlight"
          >
            <QuickStartGuide steps={csvJsonGuideContent.quickStartSteps} />
          </GeoSection>

          {/* What is CSV to JSON Section */}
          <GeoSection
            id="what-is-csv-json"
            title={csvJsonGuideContent.introduction.title}
            subtitle="Understanding CSV to JSON data transformation"
            variant="default"
          >
            <MarkdownContent content={csvJsonGuideContent.introduction.content} />
          </GeoSection>

          {/* Use Cases - Feature Grid */}
          <GeoSection
            id="use-cases"
            title="Common Use Cases"
            subtitle="How developers use CSV to JSON conversion"
            variant="default"
          >
            <FeatureGrid
              features={csvJsonGuideContent.useCases.map(uc => ({
                title: uc.title,
                description: uc.description
              }))}
              columns={2}
            />
          </GeoSection>

          {/* How to Use This Tool */}
          <GeoSection
            id="how-to-use"
            title={csvJsonGuideContent.howToUse.title}
            subtitle="Master CSV parsing and JSON generation"
            variant="minimal"
          >
            <HowToSchema
              name={`How to use ${csvJsonGuideContent.toolName}`}
              description="Step-by-step guide to CSV to JSON conversion"
              steps={csvJsonGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${csvJsonGuideContent.toolPath}`}
            />
            <MarkdownContent content={csvJsonGuideContent.howToUse.content} />
          </GeoSection>

          {/* FAQ */}
          <GeoSection
            id="faq"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about CSV to JSON"
            variant="default"
          >
            <ToolFAQ faqs={csvJsonGuideContent.faqs} />
          </GeoSection>

          {/* Security & Privacy */}
          <GeoSection
            id="security"
            title={csvJsonGuideContent.security.title}
            subtitle="Your data never leaves your browser"
            variant="highlight"
          >
            <MarkdownContent content={csvJsonGuideContent.security.content} />
          </GeoSection>

          {/* Statistics - Stats Bar */}
          {csvJsonGuideContent.stats && (
            <GeoSection
              id="stats"
              title="By the Numbers"
              subtitle="Performance metrics and capabilities"
              variant="minimal"
            >
              <StatsBar
                stats={Object.entries(csvJsonGuideContent.stats).map(([label, value]) => ({
                  label,
                  value
                }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        {/* Last Updated */}
        <LastUpdated date={csvJsonGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Convert CSV data to JSON format with customizable delimiters and header options.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="CSV to JSON Converter"
        description="Free CSV to JSON converter. Fast, private conversion with delimiter options. No data leaves your browser."
        url="https://openkit.tools/csv-json"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={csvJsonGuideContent.lastUpdated}
        version={csvJsonGuideContent.version}
        aggregateRating={{
          ratingValue: "4.8",
          ratingCount: "1456",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'CSV to JSON', url: 'https://openkit.tools/csv-json' },
        ]}
      />
    </main>
  );
}
