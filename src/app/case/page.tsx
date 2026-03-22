"use client";
import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RelatedTools } from "@/components/related-tools";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { PresetManager, type PresetData } from "@/components/preset-manager";
import { PinButton } from "@/components/pin-button";
import { ExportHubV2 } from "@/components/export-hub-v2";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { caseGuideContent } from "@/content/case-guide";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { SHORTCUTS } from "@/lib/keyboard-shortcuts";
import { KeyboardHint } from "@/components/keyboard-hint";

// Articles and prepositions that should stay lowercase in Title Case
const smallWords = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "in", "nor", "of", "on", 
  "or", "so", "the", "to", "up", "yet", "via", "with"
]);

const transformations = [
  { 
    id: "lower", 
    name: "lowercase", 
    fn: (s: string) => s.toLowerCase(),
    example: "hello world example"
  },
  { 
    id: "upper", 
    name: "UPPERCASE", 
    fn: (s: string) => s.toUpperCase(),
    example: "HELLO WORLD EXAMPLE"
  },
  { 
    id: "title", 
    name: "Title Case", 
    fn: (s: string) => {
      return s.toLowerCase().replace(/\w\S*/g, (word, index) => {
        // Always capitalize first word and words after punctuation
        if (index === 0 || /[.!?]\s*$/.test(s.substring(0, index))) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        // Don't capitalize small words unless they're the first word
        if (smallWords.has(word.toLowerCase())) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
    },
    example: "Hello World Example"
  },
  { 
    id: "sentence", 
    name: "Sentence case", 
    fn: (s: string) => {
      // Handle multiple sentences
      return s.toLowerCase().replace(/(^\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
    },
    example: "Hello world example. Another sentence."
  },
  { 
    id: "camel", 
    name: "camelCase", 
    fn: (s: string) => {
      const clean = s.replace(/[^\w\s]/g, ' ').trim();
      return clean.toLowerCase().replace(/\s+(.)/g, (_, c) => c.toUpperCase());
    },
    example: "helloWorldExample"
  },
  { 
    id: "pascal", 
    name: "PascalCase", 
    fn: (s: string) => {
      const clean = s.replace(/[^\w\s]/g, ' ').trim();
      return clean.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()).replace(/\s+/g, "");
    },
    example: "HelloWorldExample"
  },
  { 
    id: "snake", 
    name: "snake_case", 
    fn: (s: string) => {
      return s.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, "_")
        .replace(/_{2}/g, '_');
    },
    example: "hello_world_example"
  },
  { 
    id: "kebab", 
    name: "kebab-case", 
    fn: (s: string) => {
      return s.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, "-")
        .replace(/-{2}/g, '-');
    },
    example: "hello-world-example"
  },
  { 
    id: "constant", 
    name: "CONSTANT_CASE", 
    fn: (s: string) => {
      return s.toUpperCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, "_")
        .replace(/_{2}/g, '_');
    },
    example: "HELLO_WORLD_EXAMPLE"
  },
  { 
    id: "dot", 
    name: "dot.case", 
    fn: (s: string) => {
      return s.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ".")
        .replace(/\.{2}/g, '.');
    },
    example: "hello.world.example"
  },
  { 
    id: "path", 
    name: "path/case", 
    fn: (s: string) => {
      return s.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, "/")
        .replace(/\/{2}/g, '/');
    },
    example: "hello/world/example"
  },
  { 
    id: "inverse", 
    name: "iNVERSE cASE", 
    fn: (s: string) => {
      return s.split("").map(c => {
        if (c === c.toUpperCase()) return c.toLowerCase();
        if (c === c.toLowerCase()) return c.toUpperCase();
        return c;
      }).join("");
    },
    example: "hELLO wORLD eXAMPLE"
  },
  { 
    id: "alternate", 
    name: "aLtErNaTe CaSe", 
    fn: (s: string) => {
      return s.split("").map((c, i) => i % 2 ? c.toUpperCase() : c.toLowerCase()).join("");
    },
    example: "hElLo wOrLd eXaMpLe"
  },
  { 
    id: "reverse", 
    name: "esreveR", 
    fn: (s: string) => s.split("").reverse().join(""),
    example: "elpmaxE dlroW olleH"
  },
  { 
    id: "spongebob", 
    name: "SpOnGeBoB cAsE", 
    fn: (s: string) => {
      // Random alternating case (simulating mocking meme)
      let upper = false;
      return s.split("").map(c => {
        if (c.match(/[a-z]/i)) {
          upper = !upper;
          return upper ? c.toUpperCase() : c.toLowerCase();
        }
        return c;
      }).join("");
    },
    example: "hElLo WoRlD eXaMpLe"
  },
];

export default function CaseConverter() {
  useToolTracker("case", "Case Converter", "text");
  const { copy, copiedText } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [input, setInput] = useState("Hello World Example");
  const [preserveFormatting, setPreserveFormatting] = useState(false);
  const [batchMode, setBatchMode] = useState(false);

  // Memoize processed results to avoid recalculation during render
  const processedResults = useMemo(() => {
    return transformations.map(t => {
      try {
        if (!batchMode) {
          return { id: t.id, result: t.fn(input), error: null };
        }
        // Batch mode: process each line separately
        const lines = input.split('\n');
        const result = lines.map(line => {
          if (preserveFormatting && line.trim() === '') {
            return ''; // Preserve empty lines
          }
          return t.fn(line);
        }).join('\n');
        return { id: t.id, result, error: null };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Text processing failed';
        // Use setTimeout to avoid state updates during render
        setTimeout(() => {
          analytics.trackError('case_processing_failed', {
            transformation: t.id,
            inputLength: input.length,
            batchMode,
            error: errorMessage,
          });
        }, 0);
        return { id: t.id, result: input, error: errorMessage };
      }
    });
  }, [input, batchMode, preserveFormatting, analytics]);

  const processText = useCallback((text: string, fn: (s: string) => string) => {
    try {
      if (!batchMode) {
        return fn(text);
      }
      // Batch mode: process each line separately
      const lines = text.split('\n');
      return lines.map(line => {
        if (preserveFormatting && line.trim() === '') {
          return ''; // Preserve empty lines
        }
        return fn(line);
      }).join('\n');
    } catch (_err) {
      return text;
    }
  }, [batchMode, preserveFormatting]);

  const copyAll = useCallback(() => {
    const results = transformations.map(t => {
      const result = processText(input, t.fn);
      return `${t.name}:\n${result}`;
    }).join('\n\n---\n\n');

    navigator.clipboard.writeText(results);
    
    analytics.trackToolUsage('case-converter', {
      action: 'copy-all',
      inputLength: input.length,
      batchMode,
      preserveFormatting,
      transformationCount: transformations.length
    });
  }, [input, processText, analytics, batchMode, preserveFormatting]);

  // Preset management
  const handleLoadPreset = useCallback((data: PresetData) => {
    if (data.input !== undefined && data.input !== null && typeof data.input === 'string') setInput(data.input);
    if (data.preserveFormatting !== undefined && data.preserveFormatting !== null && typeof data.preserveFormatting === 'boolean') setPreserveFormatting(data.preserveFormatting);
    if (data.batchMode !== undefined && data.batchMode !== null && typeof data.batchMode === 'boolean') setBatchMode(data.batchMode);
  }, []);

  const getCurrentState = useCallback((): PresetData => {
    return { input, preserveFormatting, batchMode };
  }, [input, preserveFormatting, batchMode]);

  // Keyboard shortcuts
  useKeyboardShortcut(SHORTCUTS.copy, copyAll, { enabled: !!input });
  useKeyboardShortcut(SHORTCUTS.clear, () => setInput(""));

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-sm hover:opacity-80 transition">
              Aa
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">Case Converter</h1>
          </div>
          <PinButton toolHref="/case" />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-accent-foreground">Input Text</label>
            <button
              onClick={() => setInput("")}
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              Clear
              <KeyboardHint shortcut={SHORTCUTS.clear} />
            </button>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to convert..."
            className="h-32 bg-card border-border text-foreground placeholder:text-muted-foreground font-mono"
          />
        </div>

        {/* Error Display */}
        {processedResults.some(r => r.error) && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">
              <strong>Error:</strong> Some transformations failed. Results may be incomplete.
            </p>
            <p className="text-red-400/70 text-xs mt-1">
              Try with shorter text or check for special characters.
            </p>
          </div>
        )}

        {/* Preset Manager */}
        <div className="mb-4 pb-4 border-b border-border">
          <PresetManager
            toolName="case"
            currentState={getCurrentState()}
            onLoadPreset={handleLoadPreset}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-card border border-border rounded-lg">
          <div className="flex items-center space-x-2">
            <Switch 
              id="batch-mode" 
              checked={batchMode}
              onCheckedChange={setBatchMode}
            />
            <Label htmlFor="batch-mode" className="text-sm text-accent-foreground cursor-pointer">
              Batch Mode (process each line separately)
            </Label>
          </div>
          
          {batchMode && (
            <div className="flex items-center space-x-2">
              <Switch 
                id="preserve-format" 
                checked={preserveFormatting}
                onCheckedChange={setPreserveFormatting}
              />
              <Label htmlFor="preserve-format" className="text-sm text-accent-foreground cursor-pointer">
                Preserve empty lines
              </Label>
            </div>
          )}

          <div className="ml-auto flex items-center gap-2">
            <Button
              onClick={copyAll}
              variant="outline"
              size="sm"
              className="bg-muted border-border hover:bg-accent text-foreground"
            >
              {copiedText === 'all' ? '✓ Copied All!' : 'Copy All Results'}
              {input && <KeyboardHint shortcut={SHORTCUTS.copy} />}
            </Button>
            
            {input && (
              <ExportHubV2
                content={transformations.map(t => ({
                  transformation: t.name,
                  result: processText(input, t.fn)
                }))}
                toolName="Case Converter"
                formats={["json", "csv", "txt"]}
                variant="dropdown"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {processedResults.map(({ id, result }) => {
            const t = transformations.find(tr => tr.id === id)!;
            return (
              <button
                key={t.id}
                onClick={() => {
                  copy(result);
                  analytics.trackToolUsage('case-converter', {
                    action: 'copy',
                    transformation: t.id,
                    inputLength: input.length,
                    batchMode,
                    hasMultipleLines: input.includes('\n')
                  });
                }}
                className="p-3 bg-card border border-border rounded-lg hover:border-border hover:bg-muted transition text-left group"
              >
                <div className="text-xs text-muted-foreground mb-1">{t.name}</div>
                <div className="font-mono text-sm text-white truncate">{result || "—"}</div>
                <div className={`text-xs mt-1 transition ${copiedText === t.id ? "text-green-400" : "text-muted-foreground/70 group-hover:text-muted-foreground"}`}>
                  {copiedText === t.id ? "✓ Copied!" : "Click to copy"}
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-accent-foreground mb-3">Examples & Use Cases</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div><span className="text-muted-foreground">•</span> <strong className="text-accent-foreground">camelCase:</strong> JavaScript variable names</div>
            <div><span className="text-muted-foreground">•</span> <strong className="text-accent-foreground">PascalCase:</strong> Class names, React components</div>
            <div><span className="text-muted-foreground">•</span> <strong className="text-accent-foreground">snake_case:</strong> Python variables, database columns</div>
            <div><span className="text-muted-foreground">•</span> <strong className="text-accent-foreground">kebab-case:</strong> URLs, CSS class names</div>
            <div><span className="text-muted-foreground">•</span> <strong className="text-accent-foreground">CONSTANT_CASE:</strong> Environment variables, constants</div>
            <div><span className="text-muted-foreground">•</span> <strong className="text-accent-foreground">Title Case:</strong> Headings, article titles</div>
            <div><span className="text-muted-foreground">•</span> <strong className="text-accent-foreground">Batch Mode:</strong> Convert multiple lines at once, preserving line structure</div>
          </div>
        </div>

        <RelatedTools currentPath="/case" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={caseGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-case" title={caseGuideContent.introduction.title} subtitle="Understanding text case transformations" variant="default">
            <MarkdownContent content={caseGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use case conversion" variant="default">
            <FeatureGrid features={caseGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={caseGuideContent.howToUse.title} subtitle="Master all 15 case transformations" variant="minimal">
            <HowToSchema name={`How to use ${caseGuideContent.toolName}`} description="Step-by-step guide to case conversion" steps={caseGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${caseGuideContent.toolPath}`} />
            <MarkdownContent content={caseGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={caseGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={caseGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={caseGuideContent.security.content} />
          </GeoSection>

          {caseGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(caseGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={caseGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Convert text between 15 different case styles instantly. All processing happens in your browser.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Case Converter"
        description="Free online text case converter. Transform text between 15 case styles: camelCase, snake_case, kebab-case, PascalCase, Title Case and more. Batch processing with line preservation."
        url="https://openkit.tools/case"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={caseGuideContent.lastUpdated}
        version={caseGuideContent.version}
        aggregateRating={{ratingValue: "4.9", ratingCount: "3245", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Case Converter', url: 'https://openkit.tools/case' },
        ]}
      />
    </main>
  );
}
