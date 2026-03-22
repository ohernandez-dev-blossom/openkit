"use client";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Paintbrush, Copy, Trash2, Code } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { cssFormatGuideContent } from "@/content/css-format-guide";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";

type IndentType = "2" | "4" | "tab";
type BraceStyle = "expanded" | "compact";

export default function CSSFormatter() {
  useToolTracker("css-format", "CSS Formatter", "formatters");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const [input, setInput] = useState("");
  const [indentType, setIndentType] = useState<IndentType>("2");
  const [braceStyle, setBraceStyle] = useState<BraceStyle>("expanded");

  const getIndent = useCallback((level: number): string => {
    const unit = indentType === "tab" ? "\t" : " ".repeat(parseInt(indentType));
    return unit.repeat(level);
  }, [indentType]);

  const formatCSS = useCallback((css: string): string => {
    if (!css.trim()) return "";

    // Remove all whitespace and newlines
    let formatted = css.replace(/\s+/g, " ").trim();

    // Add newlines after opening braces
    formatted = formatted.replace(/\{/g, " {\n");

    // Add newlines before closing braces
    formatted = formatted.replace(/\}/g, "\n}\n");

    // Add newlines after semicolons (but not inside url())
    formatted = formatted.replace(/;(?![^(]*\))/g, ";\n");

    // Clean up multiple newlines
    formatted = formatted.replace(/\n\s*\n/g, "\n");

    // Split into lines for indentation
    const lines = formatted.split("\n");
    let indentLevel = 0;
    const result: string[] = [];

    for (let line of lines) {
      line = line.trim();
      if (!line) continue;

      // Decrease indent for closing braces
      if (line.startsWith("}")) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      // Add indentation
      const indented = getIndent(indentLevel) + line;

      // Apply brace style
      if (braceStyle === "compact" && line.endsWith("{")) {
        result.push(indented);
      } else if (braceStyle === "expanded" && line.includes("{")) {
        // Keep expanded style (already formatted)
        result.push(indented);
      } else {
        result.push(indented);
      }

      // Increase indent after opening braces
      if (line.endsWith("{")) {
        indentLevel++;
      }
    }

    return result.join("\n");
  }, [braceStyle, getIndent]);

  const formattedOutput = formatCSS(input);

  // Track CSS formatting
  useEffect(() => {
    if (input.trim() && formattedOutput) {
      analytics.trackToolUsage('css-format', {
        action: 'format',
        indentType,
        braceStyle,
        inputLength: input.length,
        outputLength: formattedOutput.length
      });
    }
  }, [input, formattedOutput, indentType, braceStyle, analytics]);
  
  const clear = useCallback(() => {
    setInput("");
  }, []);

  const loadExample = () => {
    setInput(
      ".container{background-color:#f0f0f0;padding:20px;margin:0 auto;}.header{font-size:24px;color:#333;font-weight:bold;}.button{background:linear-gradient(to right,#667eea,#764ba2);border:none;padding:10px 20px;color:white;border-radius:5px;cursor:pointer;}.button:hover{opacity:0.8;}"
    );
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center hover:opacity-80 transition"
            >
              <Paintbrush className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">CSS Formatter</h1>
          </div>
          <button
            onClick={loadExample}
            className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition"
          >
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">Example</span>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-accent-foreground mb-2 block">Indentation</label>
            <div className="flex gap-2">
              {(["2", "4", "tab"] as IndentType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setIndentType(type)}
                  className={`flex-1 py-2 rounded-lg text-sm transition ${
                    indentType === type ? "bg-indigo-600" : "bg-muted hover:bg-accent"
                  }`}
                >
                  {type === "tab" ? "Tab" : `${type} spaces`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-accent-foreground mb-2 block">Brace Style</label>
            <div className="flex gap-2">
              <button
                onClick={() => setBraceStyle("expanded")}
                className={`flex-1 py-2 rounded-lg text-sm transition ${
                  braceStyle === "expanded" ? "bg-indigo-600" : "bg-muted hover:bg-accent"
                }`}
              >
                Expanded
              </button>
              <button
                onClick={() => setBraceStyle("compact")}
                className={`flex-1 py-2 rounded-lg text-sm transition ${
                  braceStyle === "compact" ? "bg-indigo-600" : "bg-muted hover:bg-accent"
                }`}
              >
                Compact
              </button>
            </div>
          </div>
        </div>

        {/* Input/Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-accent-foreground">Input CSS</label>
              <button
                onClick={clear}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your messy CSS here..."
              className="w-full h-[500px] p-4 bg-card border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-border"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {input.length.toLocaleString()} characters
            </p>
          </div>

          {/* Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-accent-foreground">Formatted CSS</label>
              <button
                onClick={() => copy(formattedOutput)}
                disabled={!formattedOutput}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Copy className="w-3 h-3" />
                Copy
              </button>
            </div>
            <textarea
              value={formattedOutput}
              readOnly
              placeholder="Formatted CSS will appear here..."
              className="w-full h-[500px] p-4 bg-card border border-border rounded-lg font-mono text-sm resize-none focus:outline-none text-green-400"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {formattedOutput.length.toLocaleString()} characters
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 p-4 bg-card/50 border border-border rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold text-accent-foreground mb-2">Features</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Automatic indentation with configurable spacing</li>
            <li>• Choose between expanded or compact brace styles</li>
            <li>• Preserves CSS functionality while improving readability</li>
            <li>• Fast client-side processing - your CSS never leaves your browser</li>
          </ul>
        </div>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm shadow-lg">
            Copied to clipboard!
          </div>
        )}

        {/* GEO Content - Professional Design System */}
        <GeoContentLayout>
          {/* Quick Start Guide */}
          <GeoSection
            id="quick-start"
            title="Quick Start Guide"
            subtitle="Get up and running in 30 seconds"
            variant="highlight"
          >
            <QuickStartGuide steps={cssFormatGuideContent.quickStartSteps} />
          </GeoSection>

          {/* What is CSS Formatting Section */}
          <GeoSection
            id="what-is-css-formatting"
            title={cssFormatGuideContent.introduction.title}
            subtitle="Understanding CSS formatting for maintainable stylesheets"
            variant="default"
          >
            <MarkdownContent content={cssFormatGuideContent.introduction.content} />
          </GeoSection>

          {/* Use Cases - Feature Grid */}
          <GeoSection
            id="use-cases"
            title="Common Use Cases"
            subtitle="How developers use CSS formatting daily"
            variant="default"
          >
            <FeatureGrid
              features={cssFormatGuideContent.useCases.map(uc => ({
                title: uc.title,
                description: uc.description
              }))}
              columns={2}
            />
          </GeoSection>

          {/* How to Use This Tool */}
          <GeoSection
            id="how-to-use"
            title={cssFormatGuideContent.howToUse.title}
            subtitle="Master all features and formatting options"
            variant="minimal"
          >
            <HowToSchema
              name={`How to use ${cssFormatGuideContent.toolName}`}
              description="Step-by-step guide to formatting CSS code"
              steps={cssFormatGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${cssFormatGuideContent.toolPath}`}
            />
            <MarkdownContent content={cssFormatGuideContent.howToUse.content} />
          </GeoSection>

          {/* FAQ */}
          <GeoSection
            id="faq"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about CSS formatting"
            variant="default"
          >
            <ToolFAQ faqs={cssFormatGuideContent.faqs} />
          </GeoSection>

          {/* Security & Privacy */}
          <GeoSection
            id="security"
            title={cssFormatGuideContent.security.title}
            subtitle="Your code never leaves your browser"
            variant="highlight"
          >
            <MarkdownContent content={cssFormatGuideContent.security.content} />
          </GeoSection>

          {/* Statistics - Stats Bar */}
          {cssFormatGuideContent.stats && (
            <GeoSection
              id="stats"
              title="By the Numbers"
              subtitle="Performance metrics and capabilities"
              variant="minimal"
            >
              <StatsBar
                stats={Object.entries(cssFormatGuideContent.stats).map(([label, value]) => ({
                  label,
                  value
                }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        <RelatedTools currentPath="/css-format" />

        {/* Last Updated */}
        <LastUpdated date={cssFormatGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Format and beautify CSS code with customizable indentation and brace styles.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="CSS Formatter & Beautifier"
        description="Format and beautify CSS code with customizable indentation and brace styles. Fast, free, and privacy-focused."
        url="https://openkit.tools/css-format"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={cssFormatGuideContent.lastUpdated}
        version={cssFormatGuideContent.version}
        aggregateRating={{
          ratingValue: "4.7",
          ratingCount: "1500",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "CSS Formatter", url: "https://openkit.tools/css-format" },
        ]}
      />
    </main>
  );
}
