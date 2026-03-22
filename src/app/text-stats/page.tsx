"use client";

import Link from "next/link";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Copy, Check } from "lucide-react";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { textStatsGuideContent } from "@/content/text-stats-guide";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";

export default function TextStats() {
  useToolTracker("text-stats", "Text Statistics");
  const { isCopied } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [text, setText] = useState("");
  
  const stats = useMemo(() => {
    const trimmed = text.trim();
    
    // Basic counts
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const sentences = trimmed ? (trimmed.match(/[.!?]+/g) || []).length || (trimmed ? 1 : 0) : 0;
    const paragraphs = trimmed ? trimmed.split(/\n\n+/).filter(Boolean).length : 0;
    const lines = text ? text.split("\n").length : 0;
    
    // Reading & speaking time
    const readingTimeMin = words > 0 ? Math.ceil(words / 200) : 0;
    const speakingTimeMin = words > 0 ? Math.ceil(words / 150) : 0;
    
    // Word analysis
    const wordList = trimmed.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const uniqueWords = new Set(wordList).size;
    
    // Average word length
    const avgWordLength = wordList.length > 0 
      ? (wordList.reduce((sum, w) => sum + w.length, 0) / wordList.length).toFixed(2)
      : "0";
    
    // Longest word
    const longestWord = wordList.reduce((longest, word) => 
      word.length > longest.length ? word : longest, "");
    
    // Word frequency (top 10)
    const wordFreq: Record<string, number> = {};
    wordList.forEach(w => {
      wordFreq[w] = (wordFreq[w] || 0) + 1;
    });
    const topWords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    
    // Character frequency
    const charFreq: Record<string, number> = {};
    text.toLowerCase().split('').forEach(c => {
      if (c.match(/[a-z]/)) {
        charFreq[c] = (charFreq[c] || 0) + 1;
      }
    });
    const charFreqArray = Object.entries(charFreq)
      .sort((a, b) => b[1] - a[1]);
    
    // Readability scores
    const syllableCount = (word: string): number => {
      word = word.toLowerCase();
      if (word.length <= 3) return 1;
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      word = word.replace(/^y/, '');
      const matches = word.match(/[aeiouy]{1,2}/g);
      return matches ? matches.length : 1;
    };
    
    const totalSyllables = wordList.reduce((sum, word) => sum + syllableCount(word), 0);
    
    // Flesch Reading Ease: 206.835 - 1.015 * (words/sentences) - 84.6 * (syllables/words)
    const fleschReadingEase = sentences > 0 && words > 0
      ? 206.835 - 1.015 * (words / sentences) - 84.6 * (totalSyllables / words)
      : 0;
    
    // Flesch-Kincaid Grade Level: 0.39 * (words/sentences) + 11.8 * (syllables/words) - 15.59
    const fleschKincaidGrade = sentences > 0 && words > 0
      ? 0.39 * (words / sentences) + 11.8 * (totalSyllables / words) - 15.59
      : 0;
    
    // Interpret Flesch Reading Ease
    const getReadabilityLevel = (score: number): string => {
      if (score >= 90) return "Very Easy (5th grade)";
      if (score >= 80) return "Easy (6th grade)";
      if (score >= 70) return "Fairly Easy (7th grade)";
      if (score >= 60) return "Standard (8th-9th grade)";
      if (score >= 50) return "Fairly Difficult (10th-12th grade)";
      if (score >= 30) return "Difficult (College)";
      return "Very Difficult (College graduate)";
    };
    
    return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      readingTimeMin,
      speakingTimeMin,
      uniqueWords,
      avgWordLength,
      longestWord,
      topWords,
      charFreqArray,
      fleschReadingEase: fleschReadingEase.toFixed(1),
      fleschKincaidGrade: fleschKincaidGrade.toFixed(1),
      readabilityLevel: getReadabilityLevel(fleschReadingEase)};
  }, [text]);

  const copyStatsSummary = () => {
    analytics.trackToolUsage("text-stats", { action: "copy_summary" });
    const summary = `Text Statistics Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━
Basic Counts:
• Words: ${stats.words}
• Characters: ${stats.characters} (${stats.charactersNoSpaces} without spaces)
• Sentences: ${stats.sentences}
• Paragraphs: ${stats.paragraphs}
• Lines: ${stats.lines}

Reading & Speaking:
• Reading time: ${stats.readingTimeMin} min (200 wpm)
• Speaking time: ${stats.speakingTimeMin} min (150 wpm)

Advanced Stats:
• Unique words: ${stats.uniqueWords}
• Average word length: ${stats.avgWordLength} characters
• Longest word: ${stats.longestWord} (${stats.longestWord.length} chars)

Readability:
• Flesch Reading Ease: ${stats.fleschReadingEase}
• Flesch-Kincaid Grade: ${stats.fleschKincaidGrade}
• Level: ${stats.readabilityLevel}
━━━━━━━━━━━━━━━━━━━━━━━━━━`;
    
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(summary);
    }
  };

  const clear = () => {
    setText("");
    analytics.trackToolUsage("text-stats", { action: "clear" });
  };
  const pasteText = async () => {
    if (typeof window === 'undefined' || !navigator.clipboard) return;
    const t = await navigator.clipboard.readText();
    setText(t);
    analytics.trackToolUsage("text-stats", { action: "paste" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center hover:opacity-80 transition">
              <BarChart3 className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold">Text Stats Analyzer</h1>
          </div>
          <div className="flex gap-2">
            <Button className="min-h-[44px] border-border" onClick={pasteText} variant="outline" size="sm" >
              Paste
            </Button>
            <Button className="min-h-[44px] text-muted-foreground" onClick={clear} variant="ghost" size="sm" >
              Clear
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">        {/* Primary Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold font-mono text-cyan-400">{stats.words}</p>
              <p className="text-xs text-muted-foreground mt-1">Words</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold font-mono text-blue-400">{stats.characters}</p>
              <p className="text-xs text-muted-foreground mt-1">Characters</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold font-mono text-purple-400">{stats.sentences}</p>
              <p className="text-xs text-muted-foreground mt-1">Sentences</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold font-mono text-green-400">{stats.paragraphs}</p>
              <p className="text-xs text-muted-foreground mt-1">Paragraphs</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold font-mono text-yellow-400">{stats.lines}</p>
              <p className="text-xs text-muted-foreground mt-1">Lines</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-4 text-center">
              <p className="text-2xl font-bold font-mono text-pink-400">{stats.charactersNoSpaces}</p>
              <p className="text-xs text-muted-foreground mt-1">No Spaces</p>
            </CardContent>
          </Card>
        </div>

        {/* Text Input */}
        <Card className="bg-card border-border mb-6">
          <CardContent className="pt-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[250px] bg-muted border-border text-base resize-none focus:border-cyan-500 font-mono"
              placeholder="Type or paste your text here to analyze..."
            />
          </CardContent>
        </Card>

        {/* Advanced Stats Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Reading & Speaking Time */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                Reading & Speaking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Reading time (200 wpm)</span>
                <span className="font-mono font-semibold">{stats.readingTimeMin} min</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Speaking time (150 wpm)</span>
                <span className="font-mono font-semibold">{stats.speakingTimeMin} min</span>
              </div>
            </CardContent>
          </Card>

          {/* Word Analysis */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                Word Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Unique words</span>
                <span className="font-mono font-semibold">{stats.uniqueWords}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Average word length</span>
                <span className="font-mono font-semibold">{stats.avgWordLength} chars</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Longest word</span>
                <span className="font-mono font-semibold text-xs truncate max-w-[150px]" title={stats.longestWord}>
                  {stats.longestWord || "—"} {stats.longestWord && `(${stats.longestWord.length})`}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Readability Scores */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Readability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Flesch Reading Ease</span>
                <span className="font-mono font-semibold">{stats.fleschReadingEase}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Flesch-Kincaid Grade</span>
                <span className="font-mono font-semibold">{stats.fleschKincaidGrade}</span>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">Level:</p>
                <p className="text-sm font-medium text-green-400 mt-1">{stats.readabilityLevel}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Words & Character Frequency */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Top 10 Words */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Most Frequent Words (Top 10)</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.topWords.length > 0 ? (
                <div className="space-y-2">
                  {stats.topWords.map(([word, count], i) => (
                    <div key={word} className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-5 font-mono">{i + 1}.</span>
                      <div className="flex-1 bg-muted rounded-full h-7 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-600/70 to-cyan-500/50 flex items-center px-3"
                          style={{
                            width: `${(count / stats.topWords[0][1]) * 100}%`,
                            minWidth: "80px"}}
                        >
                          <span className="text-sm font-mono truncate">{word}</span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground w-10 text-right font-mono">{count}×</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm text-center py-4">No words to analyze yet</p>
              )}
            </CardContent>
          </Card>

          {/* Character Frequency */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Character Frequency (A-Z)</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.charFreqArray.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto pr-2">
                  {stats.charFreqArray.map(([char, count]) => (
                    <div key={char} className="flex items-center gap-2 text-sm">
                      <span className="font-mono font-bold text-cyan-400 w-6">{char.toUpperCase()}</span>
                      <div className="flex-1 bg-muted rounded-full h-5 overflow-hidden">
                        <div
                          className="h-full bg-cyan-600/50"
                          style={{
                            width: `${(count / stats.charFreqArray[0][1]) * 100}%`,
                            minWidth: "20px"}}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-8 text-right font-mono">{count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm text-center py-4">No characters to analyze yet</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Copy Stats Summary Button */}
        <div className="flex justify-center mb-6">
          <Button
            onClick={copyStatsSummary}
            variant="outline"
            className="border-border hover:border-cyan-500 hover:bg-cyan-500/10 transition-all"
            disabled={!text.trim()}
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Stats Summary
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Related Tools */}
      <RelatedTools currentPath="/text-stats" />

      {/* GEO Content */}
      <GeoContentLayout>
        <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
          <QuickStartGuide steps={textStatsGuideContent.quickStartSteps} />
        </GeoSection>

        <GeoSection id="what-is-text-stats" title={textStatsGuideContent.introduction.title} subtitle="Understanding advanced text analysis" variant="default">
          <MarkdownContent content={textStatsGuideContent.introduction.content} />
        </GeoSection>

        <GeoSection id="use-cases" title="Common Use Cases" subtitle="How writers use text statistics" variant="default">
          <FeatureGrid features={textStatsGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
        </GeoSection>

        <GeoSection id="how-to-use" title={textStatsGuideContent.howToUse.title} subtitle="Master readability analysis" variant="minimal">
          <HowToSchema name={`How to use ${textStatsGuideContent.toolName}`} description="Step-by-step guide to text statistics" steps={textStatsGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${textStatsGuideContent.toolPath}`} />
          <MarkdownContent content={textStatsGuideContent.howToUse.content} />
        </GeoSection>

        <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
          <ToolFAQ faqs={textStatsGuideContent.faqs} />
        </GeoSection>

        <GeoSection id="security" title={textStatsGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
          <MarkdownContent content={textStatsGuideContent.security.content} />
        </GeoSection>

        {textStatsGuideContent.stats && (
          <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
            <StatsBar stats={Object.entries(textStatsGuideContent.stats).map(([label, value]) => ({label, value}))} />
          </GeoSection>
        )}
      </GeoContentLayout>

      <LastUpdated date={textStatsGuideContent.lastUpdated} />

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6 mt-8">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Advanced text statistics with readability scores. All processing happens in your browser.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Text Stats Analyzer | OpenKit.tools"
        description="Comprehensive text analysis tool with word count, character frequency, readability scores (Flesch-Kincaid), and advanced statistics."
        url="https://openkit.tools/text-stats"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={textStatsGuideContent.lastUpdated}
        version={textStatsGuideContent.version}
        aggregateRating={{ratingValue: "4.8", ratingCount: "1645", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: 'https://openkit.tools' },
          { name: 'Text Stats Analyzer', url: 'https://openkit.tools/text-stats' },
        ]}
      />
    </main>
  );
}
