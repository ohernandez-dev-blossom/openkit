"use client";

import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { loremGuideContent } from "@/content/lorem-guide";
import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw } from "lucide-react";
import { ExportHubV2 } from "@/components/export-hub-v2";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "at", "vero", "eos",
  "accusamus", "iusto", "odio", "dignissimos", "ducimus", "blanditiis",
  "praesentium", "voluptatum", "deleniti", "atque", "corrupti", "quos", "dolores",
  "quas", "molestias", "excepturi", "obcaecati", "cupiditate", "provident",
  "similique", "mollitia", "animi", "perspiciatis", "unde", "omnis", "iste",
  "natus", "error", "quasi", "architecto", "beatae", "vitae", "dicta", "explicabo"
];

const CLASSIC_FIRST = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

type OutputType = "paragraphs" | "sentences" | "words";

function generateWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function generateSentence(minWords = 8, maxWords = 15): string {
  const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const words = Array.from({ length: wordCount }, generateWord);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(minSentences = 4, maxSentences = 8): string {
  const sentenceCount = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
  return Array.from({ length: sentenceCount }, () => generateSentence()).join(" ");
}

export default function Home() {
  useToolTracker("lorem", "Lorem Ipsum Generator", "generators");
  const analytics = useAnalytics();
  const [count, setCount] = useState(3);
  const [outputType, setOutputType] = useState<OutputType>("paragraphs");
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [error] = useState<string | null>(null);

  const generated = useMemo(() => {
    try {
      let result: string[] = [];

      if (outputType === "paragraphs") {
        result = Array.from({ length: count }, (_, i) => {
          if (i === 0 && startWithLorem) {
            return CLASSIC_FIRST + " " + generateParagraph(3, 6);
          }
          return generateParagraph();
        });
      } else if (outputType === "sentences") {
        result = Array.from({ length: count }, (_, i) => {
          if (i === 0 && startWithLorem) {
            return CLASSIC_FIRST;
          }
          return generateSentence();
        });
      } else {
        const words = Array.from({ length: count }, generateWord);
        if (startWithLorem && count >= 2) {
          words[0] = "lorem";
          words[1] = "ipsum";
        }
        result = [words.join(" ")];
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Text generation failed';
      analytics.trackError('lorem_generation_failed', {
        count,
        outputType,
        startWithLorem,
        error: errorMessage
      });
      return [];
    }
  }, [count, outputType, startWithLorem, analytics]);

  const outputText = outputType === "words"
    ? generated[0]
    : generated.join("\n\n");

  const randomize = useCallback(() => {
    const randomCount = Math.floor(Math.random() * 10) + 1;
    const types: OutputType[] = ["paragraphs", "sentences", "words"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomStart = Math.random() > 0.5;

    setCount(randomCount);
    setOutputType(randomType);
    setStartWithLorem(randomStart);
    analytics.trackToolUsage('lorem-ipsum', { action: 'randomize', outputType: randomType, count: randomCount });
  }, [analytics]);


  const stats = useMemo(() => {
    try {
      const words = outputText.split(/\s+/).filter(w => w.length > 0).length;
      const chars = outputText.length;
      const paragraphs = generated.length;
      return { words, chars, paragraphs };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Stats calculation failed';
      analytics.trackError('lorem_stats_failed', {
        outputType,
        count,
        error: errorMessage
      });
      return { words: 0, chars: 0, paragraphs: 0 };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outputText, generated]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm">
              Lm
            </div>
            <h1 className="text-xl font-semibold">Lorem Ipsum Generator</h1>
          </div>
          <button
            onClick={randomize}
            className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Random</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">
              <strong>Error:</strong> {error}
            </p>
            <p className="text-red-400/70 text-xs mt-1">
              Try adjusting the count or refreshing the page.
            </p>
          </div>
        )}

        {/* Controls */}
        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <CardTitle>Generate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Output Type */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-20">Generate</span>
              <Select value={outputType} onValueChange={(v) => setOutputType(v as OutputType)}>
                <SelectTrigger className="w-40 bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-muted border-border">
                  <SelectItem value="paragraphs">Paragraphs</SelectItem>
                  <SelectItem value="sentences">Sentences</SelectItem>
                  <SelectItem value="words">Words</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Count Slider */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Count</span>
                <span className="font-mono">{count}</span>
              </div>
              <Slider
                value={[count]}
                min={1}
                max={outputType === "words" ? 100 : 10}
                step={1}
                onValueChange={([v]) => setCount(v)}
              />
            </div>

            {/* Options */}
            <div className="flex items-center gap-3">
              <label htmlFor="page-input-167" className="flex items-center gap-2 cursor-pointer">
                <input id="page-input-167"
                  type="checkbox"
                  checked={startWithLorem}
                  onChange={(e) => setStartWithLorem(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-muted text-amber-500 focus:ring-amber-500"
                />
                <span className="text-sm text-accent-foreground">Start with &quot;Lorem ipsum...&quot;</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {outputText && (
                <ExportHubV2
                  content={outputText}
                  toolName="Lorem Ipsum Generator"
                  formats={["copy", "txt", "md"]}
                  variant="buttons"
                />
              )}
              <Button
                onClick={() => setCount(c => c)}
                variant="outline"
                className="border-border"
              >
                Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-card rounded-lg border border-border text-center">
            <p className="text-2xl font-bold font-mono">{stats.paragraphs}</p>
            <p className="text-sm sm:text-xs text-muted-foreground">Paragraphs</p>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border text-center">
            <p className="text-2xl font-bold font-mono">{stats.words}</p>
            <p className="text-sm sm:text-xs text-muted-foreground">Words</p>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border text-center">
            <p className="text-2xl font-bold font-mono">{stats.chars}</p>
            <p className="text-sm sm:text-xs text-muted-foreground">Characters</p>
          </div>
        </div>

        {/* Output */}
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="prose prose-invert prose-zinc max-w-none">
              {generated.map((para, i) => (
                <p key={i} className="text-accent-foreground leading-relaxed mb-4 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        <RelatedTools currentPath="/lorem" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={loremGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-lorem" title={loremGuideContent.introduction.title} subtitle="Understanding placeholder text generation" variant="default">
            <MarkdownContent content={loremGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use Lorem Ipsum" variant="default">
            <FeatureGrid features={loremGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={loremGuideContent.howToUse.title} subtitle="Master placeholder text generation" variant="minimal">
            <HowToSchema name={`How to use ${loremGuideContent.toolName}`} description="Step-by-step guide to Lorem Ipsum generation" steps={loremGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${loremGuideContent.toolPath}`} />
            <MarkdownContent content={loremGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={loremGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={loremGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={loremGuideContent.security.content} />
          </GeoSection>

          {loremGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(loremGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={loremGuideContent.lastUpdated} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6 mt-12">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Generate placeholder text for design mockups. No data stored.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Lorem Ipsum Generator"
        description="Free Lorem Ipsum placeholder text generator. Create paragraphs, sentences, or words for design mockups and development."
        url="https://openkit.tools/lorem"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={loremGuideContent.lastUpdated}
        version={loremGuideContent.version}
        aggregateRating={{ratingValue: "4.7", ratingCount: "1543", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Lorem Ipsum Generator', url: 'https://openkit.tools/lorem' },
        ]}
      />
    </main>
  );
}
