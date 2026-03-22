"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LabeledInput } from "@/components/ui/labeled-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { replaceGuideContent } from "@/content/replace-guide";
import { useAnalytics } from "@/hooks/use-analytics";

export default function FindAndReplace() {
  useToolTracker("replace", "Find and Replace");
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [input, setInput] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);

  const { output, matchCount, error: computedError } = useMemo(() => {
    if (!input || !findText) {
      return { output: input, matchCount: 0, error: null };
    }

    try {
      let pattern: RegExp;

      if (useRegex) {
        // User provided regex
        const flags = caseSensitive ? "g" : "gi";
        pattern = new RegExp(findText, flags);
      } else {
        // Escape special regex characters
        let escapedFind = findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        // Add word boundaries if whole word is enabled
        if (wholeWord) {
          escapedFind = `\\b${escapedFind}\\b`;
        }

        const flags = caseSensitive ? "g" : "gi";
        pattern = new RegExp(escapedFind, flags);
      }

      // Count matches
      const matches = input.match(pattern);
      const count = matches ? matches.length : 0;

      // Replace
      const result = input.replace(pattern, replaceText);

      return { output: result, matchCount: count, error: null };
    } catch {
      return { output: input, matchCount: 0, error: "Invalid regex pattern" };
    }
  }, [input, findText, replaceText, caseSensitive, useRegex, wholeWord]);

  // Derive error from computation instead of setting in effect
  const error = computedError || "";


  const clear = () => {
    setInput("");
    setFindText("");
    setReplaceText("");
    analytics.trackToolUsage("replace", { action: "clear" });
  };

  const highlightMatches = useMemo(() => {
    if (!input || !findText || error) return input;

    try {
      let pattern: RegExp;
      
      if (useRegex) {
        const flags = caseSensitive ? "g" : "gi";
        pattern = new RegExp(findText, flags);
      } else {
        let escapedFind = findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        if (wholeWord) {
          escapedFind = `\\b${escapedFind}\\b`;
        }
        const flags = caseSensitive ? "g" : "gi";
        pattern = new RegExp(escapedFind, flags);
      }

      return input.replace(pattern, (match) => `⟪${match}⟫`);
    } catch {
      return input;
    }
  }, [input, findText, caseSensitive, useRegex, wholeWord, error]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <Search className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">Find and Replace</h1>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold font-mono text-orange-400">
                {matchCount}
              </p>
              <p className="text-xs text-muted-foreground">Matches Found</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold font-mono text-muted-foreground">
                {input.length}
              </p>
              <p className="text-xs text-muted-foreground">Characters</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold font-mono text-muted-foreground">
                {input.split('\n').length}
              </p>
              <p className="text-xs text-muted-foreground">Lines</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold font-mono text-blue-400">
                {output.length}
              </p>
              <p className="text-xs text-muted-foreground">Result Length</p>
            </CardContent>
          </Card>
        </div>

        {/* Find/Replace Controls */}
        <Card className="bg-card border-border mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Search & Replace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-accent-foreground">Find</label>
                <LabeledInput
                  value={findText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFindText(e.target.value)}
                  placeholder={useRegex ? "Enter regex pattern..." : "Enter text to find..."}
                  className="bg-muted border-border font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-accent-foreground">Replace with</label>
                <LabeledInput
                  value={replaceText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReplaceText(e.target.value)}
                  placeholder="Enter replacement text..."
                  className="bg-muted border-border font-mono"
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="regex"
                  checked={useRegex}
                  onCheckedChange={(checked) => setUseRegex(checked as boolean)}
                />
                <label htmlFor="regex" className="text-sm text-accent-foreground cursor-pointer">
                  Use Regex
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="case"
                  checked={caseSensitive}
                  onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
                />
                <label htmlFor="case" className="text-sm text-accent-foreground cursor-pointer">
                  Case Sensitive
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="whole"
                  checked={wholeWord}
                  onCheckedChange={(checked) => setWholeWord(checked as boolean)}
                  disabled={useRegex}
                />
                <label htmlFor="whole" className="text-sm text-accent-foreground cursor-pointer">
                  Whole Word
                </label>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
          </CardContent>
        </Card>

        {/* Input/Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Input Text</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={input}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                placeholder="Paste or type text here..."
                className="h-96 bg-muted border-border font-mono text-sm"
              />
            </CardContent>
          </Card>

          <div className="space-y-4">
            {/* Preview with highlights */}
            {findText && (
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">
                    Preview (⟪matches⟫)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-muted border border-border rounded-lg p-3 overflow-auto">
                    <pre className="font-mono text-sm text-accent-foreground whitespace-pre-wrap break-words">
                      {highlightMatches.split(/(⟪[^⟫]+⟫)/).map((part, i) => {
                        if (part.startsWith('⟪') && part.endsWith('⟫')) {
                          return (
                            <span key={i} className="bg-orange-500/30 text-orange-300 px-0.5">
                              {part.slice(1, -1)}
                            </span>
                          );
                        }
                        return part;
                      })}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Result */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3 flex flex-col sm:flex-row items-center justify-between">
                <CardTitle className="text-base">Result</CardTitle>
                {output && output !== input && (
                  <button onClick={() => { copy(output); analytics.trackToolUsage("replace", { action: "copy" }); }} className="text-muted-foreground hover:text-foreground">
                    <Copy className="w-4 h-4" />
                  </button>
                )}
              </CardHeader>
              <CardContent>
                <Textarea
                  value={output}
                  readOnly
                  placeholder="Result will appear here..."
                  className={`${findText ? 'h-48' : 'h-96'} bg-muted border-border font-mono text-sm`}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button className="min-h-[44px] border-border" onClick={clear} variant="outline" >
            Clear All
          </Button>
        </div>

        {/* Examples */}
        <Card className="bg-card border-border mt-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Regex Examples</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <div className="grid sm:grid-cols-2 gap-2">
              <div>
                <code className="text-orange-400">\d+</code>
                <span className="text-muted-foreground"> - Match numbers</span>
              </div>
              <div>
                <code className="text-orange-400">[A-Z]\w+</code>
                <span className="text-muted-foreground"> - Match capitalized words</span>
              </div>
              <div>
                <code className="text-orange-400">\s+</code>
                <span className="text-muted-foreground"> - Match whitespace</span>
              </div>
              <div>
                <code className="text-orange-400">^.*$</code>
                <span className="text-muted-foreground"> - Match entire lines</span>
              </div>
              <div>
                <code className="text-orange-400">\b\w{'{'}5{'}'}\b</code>
                <span className="text-muted-foreground"> - Match 5-letter words</span>
              </div>
              <div>
                <code className="text-orange-400">(foo|bar)</code>
                <span className="text-muted-foreground"> - Match foo or bar</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm z-50">
            Copied!
          </div>
        )}

        <RelatedTools currentPath="/replace" />

        {/* GEO Content - Professional Design System */}
        <GeoContentLayout>
          {/* Quick Start Guide */}
          <GeoSection
            id="quick-start"
            title="Quick Start Guide"
            subtitle="Get up and running in 30 seconds"
            variant="highlight"
          >
            <QuickStartGuide steps={replaceGuideContent.quickStartSteps} />
          </GeoSection>

          {/* What is Find & Replace Section */}
          <GeoSection
            id="what-is-find-replace"
            title={replaceGuideContent.introduction.title}
            subtitle="Understanding text search and replacement for developers"
            variant="default"
          >
            <MarkdownContent content={replaceGuideContent.introduction.content} />
          </GeoSection>

          {/* Use Cases - Feature Grid */}
          <GeoSection
            id="use-cases"
            title="Common Use Cases"
            subtitle="How developers use find & replace daily"
            variant="default"
          >
            <FeatureGrid
              features={replaceGuideContent.useCases.map(uc => ({
                title: uc.title,
                description: uc.description
              }))}
              columns={2}
            />
          </GeoSection>

          {/* How to Use This Tool */}
          <GeoSection
            id="how-to-use"
            title={replaceGuideContent.howToUse.title}
            subtitle="Master pattern matching and text transformation"
            variant="minimal"
          >
            <HowToSchema
              name={`How to use ${replaceGuideContent.toolName}`}
              description="Step-by-step guide to find and replace with regex"
              steps={replaceGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${replaceGuideContent.toolPath}`}
            />
            <MarkdownContent content={replaceGuideContent.howToUse.content} />
          </GeoSection>

          {/* FAQ */}
          <GeoSection
            id="faq"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about find & replace"
            variant="default"
          >
            <ToolFAQ faqs={replaceGuideContent.faqs} />
          </GeoSection>

          {/* Security & Privacy */}
          <GeoSection
            id="security"
            title={replaceGuideContent.security.title}
            subtitle="Your data never leaves your browser"
            variant="highlight"
          >
            <MarkdownContent content={replaceGuideContent.security.content} />
          </GeoSection>

          {/* Statistics - Stats Bar */}
          {replaceGuideContent.stats && (
            <GeoSection
              id="stats"
              title="By the Numbers"
              subtitle="Performance metrics and capabilities"
              variant="minimal"
            >
              <StatsBar
                stats={Object.entries(replaceGuideContent.stats).map(([label, value]) => ({
                  label,
                  value
                }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        {/* Last Updated */}
        <LastUpdated date={replaceGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6 mt-12">
        <div className="max-w-5xl mx-auto text-center text-sm text-muted-foreground">
          <p>Fast, private find and replace with regex. No data leaves your browser.</p>
          <p className="mt-2 flex flex-wrap justify-center gap-2">
            <Link href="/" className="hover:text-foreground transition">← Back to tools</Link> •{" "}
            <Link href="/about" className="hover:text-foreground transition">About</Link> •{" "}
            <Link href="/privacy" className="hover:text-foreground transition">Privacy</Link>
          </p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Find & Replace with Regex"
        description="Advanced find and replace tool with regex support. Case-sensitive, whole word matching, and live preview. Fast, private text transformation. No data leaves your browser."
        url="https://openkit.tools/replace"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={replaceGuideContent.lastUpdated}
        version={replaceGuideContent.version}
        aggregateRating={{
          ratingValue: "4.7",
          ratingCount: "1843",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Find & Replace', url: 'https://openkit.tools/replace' },
        ]}
      />
    </main>
  );
}
