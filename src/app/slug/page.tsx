"use client";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { ExportHubV2 } from "@/components/export-hub-v2";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { slugGuideContent } from "@/content/slug-guide";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";

export default function SlugGenerator() {
  useToolTracker("slug", "Slug Generator", "text");
  const analytics = useAnalytics();
  const [input, setInput] = useState("Hello World! This is a Test String 123");
  const [separator, setSeparator] = useState("-");
  const [lowercase, setLowercase] = useState(true);
  
  const slug = useMemo(() => {
    const result = input
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove special chars
      .trim()
      .replace(/\s+/g, separator); // Replace spaces
    
    return lowercase ? result.toLowerCase() : result;
  }, [input, separator, lowercase]);

    
  const randomize = useCallback(() => {
    const samples = [
      "How to Build a Modern Web Application in 2024",
      "10 Tips for Better Code Quality & Performance",
      "Understanding JavaScript Async/Await Patterns",
      "Quick Guide to Docker Container Management",
      "Best Practices for REST API Design",
      "Introduction to Machine Learning with Python",
    ];
    const randomText = samples[Math.floor(Math.random() * samples.length)];
    setInput(randomText);
    
    // Random separator
    const seps = ["-", "_", "."];
    const randomSep = seps[Math.floor(Math.random() * seps.length)];
    setSeparator(randomSep);
    
    // Random case
    const randomLowercase = Math.random() > 0.3; // 70% lowercase
    setLowercase(randomLowercase);
    
    analytics.trackToolUsage('slug-generator', { action: 'randomize', separator: randomSep });
  }, [analytics]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 text-white flex items-center justify-center text-sm hover:opacity-80 transition">
              🔗
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">Slug Generator</h1>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-accent-foreground mb-2 block">Input Text</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to convert to slug..."
              className="h-24 bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div>
              <label className="text-sm font-medium text-accent-foreground mb-2 block">Separator</label>
              <div className="flex gap-2">
                {["-", "_", "."].map((sep) => (
                  <button
                    key={sep}
                    onClick={() => setSeparator(sep)}
                    className={`px-4 py-2 rounded-lg border text-sm font-mono ${
                      separator === sep
                        ? "bg-green-600 border-green-500 text-white"
                        : "bg-card border-border text-accent-foreground hover:border-border"
                    }`}
                  >
                    {sep === "-" ? "hyphen" : sep === "_" ? "underscore" : "dot"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-accent-foreground mb-2 block">Case</label>
              <button
                onClick={() => setLowercase(!lowercase)}
                className={`px-4 py-2 rounded-lg border text-sm ${
                  lowercase
                    ? "bg-green-600 border-green-500 text-white"
                    : "bg-card border-border text-accent-foreground"
                }`}
              >
                {lowercase ? "lowercase" : "Preserve Case"}
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-card border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Generated Slug</span>
              {slug && (
                <ExportHubV2
                  content={slug}
                  toolName="Slug Generator"
                  formats={["copy", "txt"]}
                  variant="buttons"
                />
              )}
            </div>
            <div className="font-mono text-lg text-green-400 break-all">{slug || "—"}</div>
            <div className="text-xs text-muted-foreground mt-2">{slug.length} characters</div>
          </div>
        </div>

        <RelatedTools currentPath="/slug" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={slugGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-slug" title={slugGuideContent.introduction.title} subtitle="Understanding URL slug generation" variant="default">
            <MarkdownContent content={slugGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use slug generation" variant="default">
            <FeatureGrid features={slugGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={slugGuideContent.howToUse.title} subtitle="Master URL-safe slug creation" variant="minimal">
            <HowToSchema name={`How to use ${slugGuideContent.toolName}`} description="Step-by-step guide to slug generation" steps={slugGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${slugGuideContent.toolPath}`} />
            <MarkdownContent content={slugGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={slugGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={slugGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={slugGuideContent.security.content} />
          </GeoSection>

          {slugGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(slugGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={slugGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Generate URL-friendly slugs from any text.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Slug Generator"
        description="Free URL slug generator. Create SEO-friendly slugs from article titles, product names, or any text."
        url="https://openkit.tools/slug"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={slugGuideContent.lastUpdated}
        version={slugGuideContent.version}
        aggregateRating={{ratingValue: "4.8", ratingCount: "1876", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Slug Generator', url: 'https://openkit.tools/slug' },
        ]}
      />
    </main>
  );
}
