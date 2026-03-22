"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Code, Copy, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { xmlFormatGuideContent } from "@/content/xml-format-guide";

type IndentType = "2" | "4";

export default function XMLFormatter() {
  useToolTracker("xml-format", "XML Formatter", "formatters");
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [input, setInput] = useState('<?xml version="1.0"?><root><item>Hello</item><item>World</item></root>');
  const [indentType, setIndentType] = useState<IndentType>("2");

  // Track tool usage on mount
  useEffect(() => {
    analytics.trackToolUsage('xml-formatter');
  }, [analytics]);
  
  const formatXML = (xml: string, indentSize: number): string => {
    const PADDING = " ".repeat(indentSize);
    const reg = /(>)(<)(\/*)/g;
    let formatted = "";
    let pad = 0;

    // Add newlines between tags
    xml = xml.replace(reg, "$1\n$2$3");

    // Split into lines
    const lines = xml.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      let indent = 0;

      // Decrease indent for closing tags
      if (line.match(/^<\/\w/)) {
        pad = Math.max(0, pad - 1);
      }

      // Set current indent
      indent = pad;

      // Add line with proper indentation
      formatted += PADDING.repeat(indent) + line + "\n";

      // Increase indent for opening tags (but not self-closing or closing tags)
      if (line.match(/^<\w[^>]*[^\/]>.*$/)) {
        pad++;
      }
      // Keep same indent for self-closing tags or single-line tags
      else if (line.match(/^<\w[^>]*\/>/)) {
        // Self-closing tag - no change
      }
      // Opening tag on its own line
      else if (line.match(/^<\w/) && !line.match(/^<\w[^>]*>.*<\//)) {
        if (!line.match(/\/>/)) {
          pad++;
        }
      }
    }

    return formatted.trim();
  };

  const output = useMemo(() => {
    try {
      if (!input.trim()) return "";

      const indentSize = parseInt(indentType);
      return formatXML(input, indentSize);
    } catch (e) {
      return "Error formatting XML: " + (e instanceof Error ? e.message : "Invalid XML");
    }
  }, [input, indentType]);

  const stats = useMemo(() => {
    const inputLines = input.split("\n").length;
    const outputLines = output.split("\n").length;
    const inputChars = input.length;
    const outputChars = output.length;
    return { inputLines, outputLines, inputChars, outputChars };
  }, [input, output]);

  
  const clear = () => {
    setInput("");
    analytics.trackToolInteraction('xml-formatter', 'clear');
  };

  const handleCopy = () => {
    copy(output);
    analytics.trackToolInteraction('xml-formatter', 'copy', {
      content_length: output.length,
      indent_type: indentType,
    });
  };

  const handleIndentChange = (newIndent: IndentType) => {
    setIndentType(newIndent);
    analytics.trackToolInteraction('xml-formatter', 'indent_change', {
      indent_type: newIndent,
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <Code className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">XML Formatter</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Options */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-accent-foreground">Indentation:</label>
            <select
              value={indentType}
              onChange={(e) => handleIndentChange(e.target.value as IndentType)}
              className="px-3 py-1.5 bg-card border border-border rounded text-sm focus:outline-none focus:border-border"
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
            </select>
          </div>

          <button
            onClick={clear}
            className="ml-auto px-3 py-1.5 bg-card hover:bg-muted border border-border rounded text-sm flex items-center gap-2 transition"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mb-4 text-sm">
          <span className="text-muted-foreground">
            Input: <span className="text-white font-medium">{stats.inputLines} lines</span>
          </span>
          <span className="text-muted-foreground">
            Output: <span className="text-green-400 font-medium">{stats.outputLines} lines</span>
          </span>
          <span className="text-muted-foreground">
            Characters: <span className="text-blue-400 font-medium">{stats.inputChars} → {stats.outputChars}</span>
          </span>
        </div>

        {/* Editors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-accent-foreground">Input XML</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste messy XML here..."
              className="h-96 bg-card border-border font-mono text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-accent-foreground">Formatted XML</label>
              <button onClick={handleCopy} className="text-muted-foreground hover:text-foreground transition">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <Textarea
              value={output}
              readOnly
              className="h-96 bg-card border-border font-mono text-sm text-foreground"
            />
          </div>
        </div>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm shadow-lg">
            Copied!
          </div>
        )}

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={xmlFormatGuideContent.quickStartSteps} />
          </GeoSection>
          <GeoSection id="what-is" title={xmlFormatGuideContent.introduction.title} subtitle="Understanding XML formatting" variant="default">
            <MarkdownContent content={xmlFormatGuideContent.introduction.content} />
          </GeoSection>
          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use XML formatting" variant="default">
            <FeatureGrid features={xmlFormatGuideContent.useCases.map(uc => ({ title: uc.title, description: uc.description }))} columns={2} />
          </GeoSection>
          <GeoSection id="how-to-use" title={xmlFormatGuideContent.howToUse.title} subtitle="Master all features" variant="minimal">
            <HowToSchema name={`How to use ${xmlFormatGuideContent.toolName}`} description="Step-by-step guide" steps={xmlFormatGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${xmlFormatGuideContent.toolPath}`} />
            <MarkdownContent content={xmlFormatGuideContent.howToUse.content} />
          </GeoSection>
          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={xmlFormatGuideContent.faqs} />
          </GeoSection>
          <GeoSection id="security" title={xmlFormatGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={xmlFormatGuideContent.security.content} />
          </GeoSection>
          {xmlFormatGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(xmlFormatGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <RelatedTools currentPath="/xml-format" />
        <LastUpdated date={xmlFormatGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Format and beautify XML with proper indentation and structure.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="XML Formatter"
        description="Free online XML formatter and beautifier. Format messy XML with proper indentation and structure."
        url="https://openkit.tools/xml-format"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={xmlFormatGuideContent.lastUpdated}
        version={xmlFormatGuideContent.version}
        aggregateRating={{ ratingValue: "4.7", ratingCount: "1500", bestRating: "5" }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "XML Formatter", url: "https://openkit.tools/xml-format" },
        ]}
      />
    </main>
  );
}
