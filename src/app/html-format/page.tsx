"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { Code, Copy, X } from "lucide-react";
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
import { htmlFormatGuideContent } from "@/content/html-format-guide";

type IndentType = "2" | "4" | "tab";

export default function HTMLFormatter() {
  useToolTracker("html-format", "HTML Formatter");
  const { isCopied, copy: copyToClipboard } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [input, setInput] = useState("<div><h1>Hello</h1><p>World</p></div>");
  const [indentType, setIndentType] = useState<IndentType>("2");
  const [wrapLength, setWrapLength] = useState(80);
  
  const copy = (text: string) => {
    copyToClipboard(text);
    analytics.trackToolUsage('html-format', {
      action: 'copy',
      outputLength: text.length
    });
  };
  
  const formatHTML = (html: string, indentChar: string): string => {
    let formatted = "";
    let indent = 0;
    
    // Remove extra whitespace
    html = html.replace(/>\s+</g, "><").trim();
    
    // Split by tags
    const tokens = html.split(/(<[^>]+>)/g).filter(token => token.trim());
    
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      
      if (token.startsWith("</")) {
        // Closing tag - decrease indent before
        indent = Math.max(0, indent - 1);
        formatted += indentChar.repeat(indent) + token + "\n";
      } else if (token.startsWith("<")) {
        // Opening or self-closing tag
        const isSelfClosing = token.endsWith("/>") || 
          /^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)(\s|>)/.test(token);
        
        formatted += indentChar.repeat(indent) + token + "\n";
        
        if (!isSelfClosing && !token.startsWith("<!")) {
          indent++;
        }
      } else {
        // Text content
        const trimmed = token.trim();
        if (trimmed) {
          formatted += indentChar.repeat(indent) + trimmed + "\n";
        }
      }
    }
    
    return formatted.trim();
  };

  const output = useMemo(() => {
    try {
      if (!input.trim()) return "";
      
      const indentChar = indentType === "tab" ? "\t" : " ".repeat(parseInt(indentType));
      return formatHTML(input, indentChar);
    } catch {
      return "Error formatting HTML";
    }
  }, [input, indentType]);

  const stats = useMemo(() => {
    const inputLines = input.split("\n").length;
    const outputLines = output.split("\n").length;
    const inputChars = input.length;
    const outputChars = output.length;
    return { inputLines, outputLines, inputChars, outputChars };
  }, [input, output]);

  // Track formatting (only when user actually provides input, not initial state)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (input && output && output !== "Error formatting HTML") {
      analytics.trackToolUsage('html-format', {
        action: 'format',
        indentType,
        inputLength: input.length,
        outputLength: output.length,
        inputLines: stats.inputLines,
        outputLines: stats.outputLines
      });
    }
  }, [output, input, indentType, stats.inputLines, stats.outputLines, analytics]);

  
  const clear = () => {
    setInput("");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <Code className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">HTML Formatter</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Options */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm text-accent-foreground">Indentation:</label>
            <select
              value={indentType}
              onChange={(e) => setIndentType(e.target.value as IndentType)}
              className="px-3 py-1.5 bg-card border border-border rounded text-sm focus:outline-none focus:border-border"
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
              <option value="tab">Tab</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="page-input-109" className="text-sm text-accent-foreground">Wrap length:</label>
            <input id="page-input-109"
              type="number"
              value={wrapLength}
              onChange={(e) => setWrapLength(parseInt(e.target.value) || 80)}
              min="40"
              max="200"
              className="w-20 px-3 py-1.5 bg-card border border-border rounded text-sm focus:outline-none focus:border-border"
            />
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
            <label className="text-sm font-medium text-accent-foreground">Input HTML</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste messy HTML here..."
              className="h-96 bg-card border-border font-mono text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-accent-foreground">Formatted HTML</label>
              <button onClick={() => copy(output)} className="text-muted-foreground hover:text-foreground transition">
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
            <QuickStartGuide steps={htmlFormatGuideContent.quickStartSteps} />
          </GeoSection>
          <GeoSection id="what-is" title={htmlFormatGuideContent.introduction.title} subtitle="Understanding HTML formatting" variant="default">
            <MarkdownContent content={htmlFormatGuideContent.introduction.content} />
          </GeoSection>
          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use HTML formatting daily" variant="default">
            <FeatureGrid features={htmlFormatGuideContent.useCases.map(uc => ({ title: uc.title, description: uc.description }))} columns={2} />
          </GeoSection>
          <GeoSection id="how-to-use" title={htmlFormatGuideContent.howToUse.title} subtitle="Master all features" variant="minimal">
            <HowToSchema name={`How to use ${htmlFormatGuideContent.toolName}`} description="Step-by-step guide" steps={htmlFormatGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${htmlFormatGuideContent.toolPath}`} />
            <MarkdownContent content={htmlFormatGuideContent.howToUse.content} />
          </GeoSection>
          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={htmlFormatGuideContent.faqs} />
          </GeoSection>
          <GeoSection id="security" title={htmlFormatGuideContent.security.title} subtitle="Your code never leaves your browser" variant="highlight">
            <MarkdownContent content={htmlFormatGuideContent.security.content} />
          </GeoSection>
          {htmlFormatGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(htmlFormatGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <RelatedTools currentPath="/html-format" />
        <LastUpdated date={htmlFormatGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Format and beautify HTML with proper indentation.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="HTML Formatter"
        description="Free online HTML formatter and beautifier. Format messy HTML with proper indentation and structure."
        url="https://openkit.tools/html-format"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={htmlFormatGuideContent.lastUpdated}
        version={htmlFormatGuideContent.version}
        aggregateRating={{ ratingValue: "4.7", ratingCount: "1500", bestRating: "5" }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "HTML Formatter", url: "https://openkit.tools/html-format" },
        ]}
      />
    </main>
  );
}
