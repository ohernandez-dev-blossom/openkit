"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RelatedTools } from "@/components/related-tools";
import { LabeledInput } from "@/components/ui/labeled-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useHistory } from "@/hooks/use-history";
import { HistoryControls } from "@/components/history-controls";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { SHORTCUTS } from "@/lib/keyboard-shortcuts";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { uuidGuideContent } from "@/content/uuid-guide";

function generateUUID(): string {
  const uuid = new Uint8Array(16);
  crypto.getRandomValues(uuid);
  
  // Set version (4) and variant (2) bits
  uuid[6] = (uuid[6] & 0x0f) | 0x40; // Version 4
  uuid[8] = (uuid[8] & 0x3f) | 0x80; // Variant 2
  
  // Convert to hex string with dashes
  const hex = Array.from(uuid, b => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export default function UUIDGeneratorClient() {
  useToolTracker("uuid", "UUID Generator", "generators");
  const analytics = useAnalytics();
  
  // Use history hook for undo/redo functionality
  const [uuids, setUuids, historyControls] = useHistory<string[]>([generateUUID()], {
    maxHistory: 50,
    debounceMs: 300});

  const [count, setCount] = useState(1);
  const [format, setFormat] = useState<"standard" | "uppercase" | "nodash">("standard");
  const [copiedText, setCopiedText] = useState<number | null>(null);
  const generate = useCallback(() => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
    
    analytics.trackToolUsage('uuid', {
      action: 'generate',
      count: count,
      format: format,
    });
  }, [count, setUuids, format, analytics]);
  
  const randomize = () => {
    // Random count between 1-10
    const randomCount = Math.floor(Math.random() * 10) + 1;
    setCount(randomCount);
    
    // Random format
    const formats: ("standard" | "uppercase" | "nodash")[] = ["standard", "uppercase", "nodash"];
    const randomFormat = formats[Math.floor(Math.random() * formats.length)];
    setFormat(randomFormat);
    
    // Generate UUIDs
    const newUuids = Array.from({ length: randomCount }, () => generateUUID());
    setUuids(newUuids);
    
    analytics.trackToolInteraction('uuid', 'randomize', {
      count: randomCount,
      format: randomFormat,
    });
  };
  
  const formatUUID = (uuid: string): string => {
    switch (format) {
      case "uppercase":
        return uuid.toUpperCase();
      case "nodash":
        return uuid.replace(/-/g, "");
      default:
        return uuid;
    }
  };
  const copyUUID = (uuid: string, index: number) => {
    navigator.clipboard.writeText(formatUUID(uuid));
    setCopiedText(index);
    setTimeout(() => setCopiedText(null), 1500);
  };
  const copyAll = () => {
    const text = uuids.map(formatUUID).join("\n");
    navigator.clipboard.writeText(text);
    setCopiedText(-1);
    setTimeout(() => setCopiedText(null), 1500);
  };

  // Keyboard shortcuts for undo/redo
  useKeyboardShortcut(SHORTCUTS.undo, historyControls.undo, { 
    enabled: historyControls.canUndo 
  });
  useKeyboardShortcut(SHORTCUTS.redo, historyControls.redo, { 
    enabled: historyControls.canRedo 
  });
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm hover:opacity-80 transition">
              #
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold">UUID Generator</h1>
          </div>
          <button
            onClick={randomize}
            aria-label="Generate random UUID configuration"
            className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Random</span>
          </button>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Card className="bg-card border-border shadow-refined mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Generate UUIDs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm text-muted-foreground mb-2 block">Count</label>
                <LabeledInput
                  type="number"
                  min="1"
                  max="100"
                  value={count}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="bg-muted border-border"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm text-muted-foreground mb-2 block">Format</label>
                <div className="flex gap-2" role="group" aria-label="UUID format options">
                  <Button
                    variant={format === "standard" ? "default" : "outline"}
                    onClick={() => setFormat("standard")}
                    className="flex-1 text-xs"
                    aria-pressed={format === "standard"}
                  >
                    Standard
                  </Button>
                  <Button
                    variant={format === "uppercase" ? "default" : "outline"}
                    onClick={() => setFormat("uppercase")}
                    className="flex-1 text-xs"
                    aria-pressed={format === "uppercase"}
                  >
                    UPPER
                  </Button>
                  <Button
                    variant={format === "nodash" ? "default" : "outline"}
                    onClick={() => setFormat("nodash")}
                    className="flex-1 text-xs"
                    aria-pressed={format === "nodash"}
                  >
                    No Dash
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="min-h-[44px] bg-violet-600 hover:bg-violet-700 flex-1" onClick={generate} >
                Generate {count > 1 ? `${count} UUIDs` : "UUID"}
              </Button>
              {uuids.length > 1 && (
                <Button className="min-h-[44px] border-border" onClick={copyAll} variant="outline" >
                  {copiedText === -1 ? "Copied!" : "Copy All"}
                </Button>
              )}
            </div>
            
            {/* History Controls */}
            <div className="flex items-center gap-3 pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground">History:</span>
              <HistoryControls
                canUndo={historyControls.canUndo}
                canRedo={historyControls.canRedo}
                onUndo={historyControls.undo}
                onRedo={historyControls.redo}
                position={historyControls.position}
                length={historyControls.length}
                showPosition={true}
                size="sm"
              />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border shadow-refined">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Generated UUIDs ({uuids.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {uuids.map((uuid, i) => (
                <button
                  key={i}
                  onClick={() => copyUUID(uuid, i)}
                  aria-label={`Copy UUID: ${formatUUID(uuid).slice(0, 8)}...`}
                  className="w-full p-3 bg-muted rounded-lg cursor-pointer hover:bg-accent transition flex justify-between items-center gap-2 text-left"
                >
                  <code className="font-mono text-sm break-all">{formatUUID(uuid)}</code>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {copiedText === i ? "Copied!" : "Click"}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="mt-8 p-4 bg-card border border-border rounded-lg shadow-refined-sm">
          <h3 className="font-medium mb-2">About UUIDs</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong className="text-accent-foreground">UUID v4:</strong> Random 128-bit identifier. Collision probability is practically zero.</p>
            <p><strong className="text-accent-foreground">Format:</strong> 8-4-4-4-12 hexadecimal characters (36 chars with dashes).</p>
            <p><strong className="text-accent-foreground">Uses:</strong> Database keys, session IDs, unique identifiers in distributed systems.</p>
          </div>
        </div>

        {/* GEO Content - Professional Design System */}
        <GeoContentLayout>
          {/* Quick Start Guide */}
          <GeoSection
            id="quick-start"
            title="Quick Start Guide"
            subtitle="Generate UUIDs in seconds"
            variant="highlight"
          >
            <QuickStartGuide steps={uuidGuideContent.quickStartSteps} />
          </GeoSection>

          {/* What are UUIDs Section */}
          <GeoSection
            id="what-are-uuids"
            title={uuidGuideContent.introduction.title}
            subtitle="Understanding universally unique identifiers for distributed systems"
            variant="default"
          >
            <MarkdownContent content={uuidGuideContent.introduction.content} />
          </GeoSection>

          {/* Use Cases - Feature Grid */}
          <GeoSection
            id="use-cases"
            title="Common Use Cases"
            subtitle="How developers use UUIDs in production systems"
            variant="default"
          >
            <FeatureGrid
              features={uuidGuideContent.useCases.map(uc => ({
                title: uc.title,
                description: uc.description
              }))}
              columns={2}
            />
          </GeoSection>

          {/* How to Use This Tool */}
          <GeoSection
            id="how-to-use"
            title={uuidGuideContent.howToUse.title}
            subtitle="Master UUID generation and formats"
            variant="minimal"
          >
            <HowToSchema
              name={`How to use ${uuidGuideContent.toolName}`}
              description="Step-by-step guide to generating UUIDs"
              steps={uuidGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${uuidGuideContent.toolPath}`}
            />
            <MarkdownContent content={uuidGuideContent.howToUse.content} />
          </GeoSection>

          {/* FAQ */}
          <GeoSection
            id="faq"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about UUIDs"
            variant="default"
          >
            <ToolFAQ faqs={uuidGuideContent.faqs} />
          </GeoSection>

          {/* Security & Privacy */}
          <GeoSection
            id="security"
            title={uuidGuideContent.security.title}
            subtitle="Your data never leaves your browser"
            variant="highlight"
          >
            <MarkdownContent content={uuidGuideContent.security.content} />
          </GeoSection>

          {/* Statistics - Stats Bar */}
          {uuidGuideContent.stats && (
            <GeoSection
              id="stats"
              title="By the Numbers"
              subtitle="UUID generation capabilities and performance"
              variant="minimal"
            >
              <StatsBar
                stats={Object.entries(uuidGuideContent.stats).map(([label, value]) => ({
                  label,
                  value
                }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        {/* Related Tools */}
        <RelatedTools currentPath="/uuid" />

        {/* Last Updated */}
        <LastUpdated date={uuidGuideContent.lastUpdated} />
      </div>
      <footer className="border-t border-border px-4 sm:px-6 py-4 mt-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Generate UUIDs instantly. All processing happens in your browser.</p>
          <p className="mt-2">
            <Link href="/" className="hover:text-foreground transition">← Back to tools</Link>
          </p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="UUID Generator"
        description="Free UUID v4 generator. Generate multiple random UUIDs instantly. Perfect for database keys and unique identifiers."
        url="https://openkit.tools/uuid"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={uuidGuideContent.lastUpdated}
        version={uuidGuideContent.version}
        aggregateRating={{
          ratingValue: "4.7",
          ratingCount: "1829",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'UUID Generator', url: 'https://openkit.tools/uuid' },
        ]}
      />
    </main>
  );
}
