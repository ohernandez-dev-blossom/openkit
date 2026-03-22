"use client";
import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { Code, Search, Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RelatedTools } from "@/components/related-tools";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { htmlEntitiesGuideContent } from "@/content/html-entities-guide";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";

type Mode = "encode" | "decode";
type EncodeMode = "special" | "all" | "named" | "numeric";

type EntityCategory = {
  name: string;
  entities: { char: string; named: string; numeric: string; description: string }[];
};

const ENTITY_CATEGORIES: EntityCategory[] = [
  {
    name: "Special Characters",
    entities: [
      { char: "&", named: "&amp;", numeric: "&#38;", description: "Ampersand" },
      { char: "<", named: "&lt;", numeric: "&#60;", description: "Less than" },
      { char: ">", named: "&gt;", numeric: "&#62;", description: "Greater than" },
      { char: '"', named: "&quot;", numeric: "&#34;", description: "Double quote" },
      { char: "'", named: "&apos;", numeric: "&#39;", description: "Single quote/apostrophe" },
      { char: " ", named: "&nbsp;", numeric: "&#160;", description: "Non-breaking space" },
    ]},
  {
    name: "Symbols",
    entities: [
      { char: "©", named: "&copy;", numeric: "&#169;", description: "Copyright" },
      { char: "®", named: "&reg;", numeric: "&#174;", description: "Registered trademark" },
      { char: "™", named: "&trade;", numeric: "&#8482;", description: "Trademark" },
      { char: "€", named: "&euro;", numeric: "&#8364;", description: "Euro" },
      { char: "£", named: "&pound;", numeric: "&#163;", description: "Pound" },
      { char: "¥", named: "&yen;", numeric: "&#165;", description: "Yen" },
      { char: "¢", named: "&cent;", numeric: "&#162;", description: "Cent" },
      { char: "§", named: "&sect;", numeric: "&#167;", description: "Section" },
      { char: "¶", named: "&para;", numeric: "&#182;", description: "Paragraph" },
      { char: "†", named: "&dagger;", numeric: "&#8224;", description: "Dagger" },
      { char: "‡", named: "&Dagger;", numeric: "&#8225;", description: "Double dagger" },
      { char: "•", named: "&bull;", numeric: "&#8226;", description: "Bullet" },
      { char: "…", named: "&hellip;", numeric: "&#8230;", description: "Ellipsis" },
      { char: "′", named: "&prime;", numeric: "&#8242;", description: "Prime/minutes" },
      { char: "″", named: "&Prime;", numeric: "&#8243;", description: "Double prime/seconds" },
      { char: "‰", named: "&permil;", numeric: "&#8240;", description: "Per mille" },
      { char: "°", named: "&deg;", numeric: "&#176;", description: "Degree" },
      { char: "±", named: "&plusmn;", numeric: "&#177;", description: "Plus-minus" },
      { char: "×", named: "&times;", numeric: "&#215;", description: "Multiplication" },
      { char: "÷", named: "&divide;", numeric: "&#247;", description: "Division" },
    ]},
  {
    name: "Math Symbols",
    entities: [
      { char: "+", named: "&plus;", numeric: "&#43;", description: "Plus" },
      { char: "−", named: "&minus;", numeric: "&#8722;", description: "Minus" },
      { char: "×", named: "&times;", numeric: "&#215;", description: "Times" },
      { char: "÷", named: "&divide;", numeric: "&#247;", description: "Divide" },
      { char: "=", named: "&equals;", numeric: "&#61;", description: "Equals" },
      { char: "≠", named: "&ne;", numeric: "&#8800;", description: "Not equal" },
      { char: "≈", named: "&asymp;", numeric: "&#8776;", description: "Approximately" },
      { char: "≤", named: "&le;", numeric: "&#8804;", description: "Less than or equal" },
      { char: "≥", named: "&ge;", numeric: "&#8805;", description: "Greater than or equal" },
      { char: "∞", named: "&infin;", numeric: "&#8734;", description: "Infinity" },
      { char: "∑", named: "&sum;", numeric: "&#8721;", description: "Sum" },
      { char: "∏", named: "&prod;", numeric: "&#8719;", description: "Product" },
      { char: "√", named: "&radic;", numeric: "&#8730;", description: "Square root" },
      { char: "∫", named: "&int;", numeric: "&#8747;", description: "Integral" },
      { char: "∂", named: "&part;", numeric: "&#8706;", description: "Partial differential" },
      { char: "∇", named: "&nabla;", numeric: "&#8711;", description: "Nabla/gradient" },
      { char: "∈", named: "&isin;", numeric: "&#8712;", description: "Element of" },
      { char: "∉", named: "&notin;", numeric: "&#8713;", description: "Not element of" },
      { char: "∩", named: "&cap;", numeric: "&#8745;", description: "Intersection" },
      { char: "∪", named: "&cup;", numeric: "&#8746;", description: "Union" },
    ]},
  {
    name: "Arrows",
    entities: [
      { char: "←", named: "&larr;", numeric: "&#8592;", description: "Left arrow" },
      { char: "↑", named: "&uarr;", numeric: "&#8593;", description: "Up arrow" },
      { char: "→", named: "&rarr;", numeric: "&#8594;", description: "Right arrow" },
      { char: "↓", named: "&darr;", numeric: "&#8595;", description: "Down arrow" },
      { char: "↔", named: "&harr;", numeric: "&#8596;", description: "Left-right arrow" },
      { char: "↕", named: "&varr;", numeric: "&#8597;", description: "Up-down arrow" },
      { char: "⇐", named: "&lArr;", numeric: "&#8656;", description: "Left double arrow" },
      { char: "⇑", named: "&uArr;", numeric: "&#8657;", description: "Up double arrow" },
      { char: "⇒", named: "&rArr;", numeric: "&#8658;", description: "Right double arrow" },
      { char: "⇓", named: "&dArr;", numeric: "&#8659;", description: "Down double arrow" },
      { char: "⇔", named: "&hArr;", numeric: "&#8660;", description: "Left-right double arrow" },
    ]},
  {
    name: "Greek Letters",
    entities: [
      { char: "α", named: "&alpha;", numeric: "&#945;", description: "Alpha" },
      { char: "β", named: "&beta;", numeric: "&#946;", description: "Beta" },
      { char: "γ", named: "&gamma;", numeric: "&#947;", description: "Gamma" },
      { char: "δ", named: "&delta;", numeric: "&#948;", description: "Delta" },
      { char: "ε", named: "&epsilon;", numeric: "&#949;", description: "Epsilon" },
      { char: "θ", named: "&theta;", numeric: "&#952;", description: "Theta" },
      { char: "λ", named: "&lambda;", numeric: "&#955;", description: "Lambda" },
      { char: "μ", named: "&mu;", numeric: "&#956;", description: "Mu" },
      { char: "π", named: "&pi;", numeric: "&#960;", description: "Pi" },
      { char: "σ", named: "&sigma;", numeric: "&#963;", description: "Sigma" },
      { char: "τ", named: "&tau;", numeric: "&#964;", description: "Tau" },
      { char: "φ", named: "&phi;", numeric: "&#966;", description: "Phi" },
      { char: "ω", named: "&omega;", numeric: "&#969;", description: "Omega" },
      { char: "Α", named: "&Alpha;", numeric: "&#913;", description: "Alpha (uppercase)" },
      { char: "Β", named: "&Beta;", numeric: "&#914;", description: "Beta (uppercase)" },
      { char: "Γ", named: "&Gamma;", numeric: "&#915;", description: "Gamma (uppercase)" },
      { char: "Δ", named: "&Delta;", numeric: "&#916;", description: "Delta (uppercase)" },
      { char: "Θ", named: "&Theta;", numeric: "&#920;", description: "Theta (uppercase)" },
      { char: "Λ", named: "&Lambda;", numeric: "&#923;", description: "Lambda (uppercase)" },
      { char: "Π", named: "&Pi;", numeric: "&#928;", description: "Pi (uppercase)" },
      { char: "Σ", named: "&Sigma;", numeric: "&#931;", description: "Sigma (uppercase)" },
      { char: "Φ", named: "&Phi;", numeric: "&#934;", description: "Phi (uppercase)" },
      { char: "Ω", named: "&Omega;", numeric: "&#937;", description: "Omega (uppercase)" },
    ]},
  {
    name: "Quotes & Punctuation",
    entities: [
      { char: "'", named: "&lsquo;", numeric: "&#8216;", description: "Left single quote" },
      { char: "'", named: "&rsquo;", numeric: "&#8217;", description: "Right single quote" },
      { char: "\u201C", named: "&ldquo;", numeric: "&#8220;", description: "Left double quote" },
      { char: "\u201D", named: "&rdquo;", numeric: "&#8221;", description: "Right double quote" },
      { char: "‹", named: "&lsaquo;", numeric: "&#8249;", description: "Left single angle quote" },
      { char: "›", named: "&rsaquo;", numeric: "&#8250;", description: "Right single angle quote" },
      { char: "«", named: "&laquo;", numeric: "&#171;", description: "Left double angle quote" },
      { char: "»", named: "&raquo;", numeric: "&#187;", description: "Right double angle quote" },
      { char: "–", named: "&ndash;", numeric: "&#8211;", description: "En dash" },
      { char: "—", named: "&mdash;", numeric: "&#8212;", description: "Em dash" },
    ]},
];

// Build a map for decoding
const DECODE_MAP = new Map<string, string>();
ENTITY_CATEGORIES.forEach(cat => {
  cat.entities.forEach(entity => {
    DECODE_MAP.set(entity.named, entity.char);
    DECODE_MAP.set(entity.numeric, entity.char);
  });
});

export default function HtmlEntities() {
  useToolTracker("html-entities", "HTML Entities Encoder/Decoder", "converters");
  const analytics = useAnalytics();
  const { copy, copiedText } = useCopyToClipboard({ duration: 1500 });
  const [mode, setMode] = useState<Mode>("encode");
  const [encodeMode, setEncodeMode] = useState<EncodeMode>("special");
  const [useNamed, setUseNamed] = useState(true);
  const [input, setInput] = useState("Hello <World> & \"Friends\" © 2024");
  const [search, setSearch] = useState("");
  const [outputCopied, setOutputCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const encodeHtml = useCallback((text: string, mode: EncodeMode, useNamed: boolean): string => {
    const encodeChar = (char: string): string => {
      const code = char.charCodeAt(0);
      
      if (mode === "special") {
        // Only encode <, >, &, ", '
        switch (char) {
          case "&": return useNamed ? "&amp;" : "&#38;";
          case "<": return useNamed ? "&lt;" : "&#60;";
          case ">": return useNamed ? "&gt;" : "&#62;";
          case '"': return useNamed ? "&quot;" : "&#34;";
          case "'": return useNamed ? "&apos;" : "&#39;";
          default: return char;
        }
      }
      
      if (mode === "all") {
        // Encode all non-ASCII characters
        if (code > 127) {
          return `&#${code};`;
        }
        // Still encode special HTML chars
        switch (char) {
          case "&": return useNamed ? "&amp;" : "&#38;";
          case "<": return useNamed ? "&lt;" : "&#60;";
          case ">": return useNamed ? "&gt;" : "&#62;";
          case '"': return useNamed ? "&quot;" : "&#34;";
          case "'": return useNamed ? "&apos;" : "&#39;";
          default: return char;
        }
      }
      
      // Named or numeric mode - try to find named entity first
      const entity = Array.from(ENTITY_CATEGORIES)
        .flatMap(cat => cat.entities)
        .find(e => e.char === char);
      
      if (entity) {
        return mode === "named" ? entity.named : entity.numeric;
      }
      
      // Fallback for special chars
      switch (char) {
        case "&": return useNamed ? "&amp;" : "&#38;";
        case "<": return useNamed ? "&lt;" : "&#60;";
        case ">": return useNamed ? "&gt;" : "&#62;";
        case '"': return useNamed ? "&quot;" : "&#34;";
        case "'": return useNamed ? "&apos;" : "&#39;";
        default: return char;
      }
    };
    
    return text.split("").map(encodeChar).join("");
  }, []);

  const decodeHtml = useCallback((text: string): string => {
    return text.replace(/&([a-zA-Z]+|#\d+);/g, (match, entity) => {
      // Try named entity
      const named = DECODE_MAP.get(match);
      if (named) return named;
      
      // Try numeric entity
      if (entity.startsWith("#")) {
        const code = parseInt(entity.substring(1), 10);
        if (!isNaN(code)) {
          return String.fromCharCode(code);
        }
      }
      
      // Return original if not found
      return match;
    });
  }, []);

  const output = useMemo(() => {
    try {
      return mode === "encode"
        ? encodeHtml(input, encodeMode, useNamed)
        : decodeHtml(input);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Encoding/decoding failed';
      analytics.trackError('html_entities_processing_failed', {
        tool: 'html-entities',
        mode,
        encodeMode,
        error: errorMessage
      });
      return '';
    }
  }, [mode, input, encodeMode, useNamed, encodeHtml, decodeHtml, analytics]);

  const copyOutput = useCallback(() => {
    setError(null);
    try {
      navigator.clipboard.writeText(output);
      setOutputCopied(true);
      setTimeout(() => setOutputCopied(false), 1500);
      analytics.trackToolUsage('html-entities', { action: 'copy', mode });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to copy to clipboard';
      setError(errorMessage);
      analytics.trackError('html_entities_copy_failed', {
        tool: 'html-entities',
        error: errorMessage
      });
    }
  }, [output, mode, analytics]);

  const filteredEntities = ENTITY_CATEGORIES.map(category => ({
    ...category,
    entities: category.entities.filter(entity => {
      if (!search) return true;
      const searchLower = search.toLowerCase();
      return (
        entity.char.includes(search) ||
        entity.named.toLowerCase().includes(searchLower) ||
        entity.numeric.includes(search) ||
        entity.description.toLowerCase().includes(searchLower)
      );
    })
  })).filter(category => category.entities.length > 0);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center hover:opacity-80 transition">
            <Code className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">HTML Entity Encoder/Decoder</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Mode Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => {
              setMode("encode");
              analytics.trackToolUsage('html-entities', { action: 'change_mode', mode: 'encode' });
            }}
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition ${
              mode === "encode"
                ? "bg-gradient-to-br from-yellow-500 to-yellow-600 text-white"
                : "bg-card text-muted-foreground hover:bg-muted border border-border"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => {
              setMode("decode");
              analytics.trackToolUsage('html-entities', { action: 'change_mode', mode: 'decode' });
            }}
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition ${
              mode === "decode"
                ? "bg-gradient-to-br from-yellow-500 to-yellow-600 text-white"
                : "bg-card text-muted-foreground hover:bg-muted border border-border"
            }`}
          >
            Decode
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">
              <strong>Error:</strong> {error}
            </p>
            <p className="text-red-400/70 text-xs mt-1">
              Try checking your input for invalid characters or refreshing the page.
            </p>
          </div>
        )}

        {/* Encode Options */}
        {mode === "encode" && (
          <div className="mb-6 p-4 bg-card border border-border rounded-lg space-y-4">
            <div>
              <label className="text-sm font-medium text-accent-foreground mb-2 block">Encode Mode</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => setEncodeMode("special")}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    encodeMode === "special"
                      ? "bg-zinc-600 text-white"
                      : "bg-muted text-foreground hover:bg-zinc-600 hover:text-white"
                  }`}
                >
                  Special Only
                </button>
                <button
                  onClick={() => setEncodeMode("all")}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    encodeMode === "all"
                      ? "bg-zinc-600 text-white"
                      : "bg-muted text-foreground hover:bg-zinc-600 hover:text-white"
                  }`}
                >
                  All Characters
                </button>
                <button
                  onClick={() => setEncodeMode("named")}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    encodeMode === "named"
                      ? "bg-zinc-600 text-white"
                      : "bg-muted text-foreground hover:bg-zinc-600 hover:text-white"
                  }`}
                >
                  Named Entities
                </button>
                <button
                  onClick={() => setEncodeMode("numeric")}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    encodeMode === "numeric"
                      ? "bg-zinc-600 text-white"
                      : "bg-muted text-foreground hover:bg-zinc-600 hover:text-white"
                  }`}
                >
                  Numeric Entities
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {encodeMode === "special" && "Only encode <, >, &, \", and '"}
                {encodeMode === "all" && "Encode all non-ASCII characters"}
                {encodeMode === "named" && "Use named entities when available"}
                {encodeMode === "numeric" && "Use numeric entities (&#...;)"}
              </p>
            </div>

            {(encodeMode === "special" || encodeMode === "all") && (
              <div>
                <label className="text-sm font-medium text-accent-foreground mb-2 block">Entity Type</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setUseNamed(true)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      useNamed
                        ? "bg-zinc-600 text-white"
                        : "bg-muted text-foreground hover:bg-zinc-600 hover:text-white"
                    }`}
                  >
                    Named (&amp;)
                  </button>
                  <button
                    onClick={() => setUseNamed(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                      !useNamed
                        ? "bg-zinc-600 text-white"
                        : "bg-muted text-foreground hover:bg-zinc-600 hover:text-white"
                    }`}
                  >
                    Numeric (&#38;)
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Input/Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="text-sm font-medium text-accent-foreground mb-2 block">
              {mode === "encode" ? "Plain Text" : "HTML Entities"}
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Enter text to encode..." : "Enter HTML entities to decode..."}
              className="h-48 bg-card border-border text-foreground placeholder:text-muted-foreground font-mono text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-accent-foreground">
                {mode === "encode" ? "Encoded HTML" : "Decoded Text"}
              </label>
              <button
                onClick={copyOutput}
                className="text-xs text-muted-foreground hover:text-accent-foreground transition flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                {outputCopied ? "Copied!" : "Copy"}
              </button>
            </div>
            <Textarea
              value={output}
              readOnly
              className="h-48 bg-card border-border text-foreground font-mono text-sm cursor-text"
            />
          </div>
        </div>

        {/* Reference Table */}
        <div className="border-t border-border pt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Entity Reference</h2>
            <div className="relative w-64">
              <input aria-label="Input field"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search entities..."
                className="w-full px-3 py-2 pl-9 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-6">
            {filteredEntities.map((category) => (
              <div key={category.name}>
                <h3 className="text-lg font-semibold mb-3 text-accent-foreground">{category.name}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {category.entities.map((entity, idx) => (
                    <button
                      key={idx}
                      onClick={() => copy(entity.named)}
                      className="p-3 bg-card border border-border rounded-lg hover:border-border hover:bg-muted transition text-left group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-2xl">{entity.char}</span>
                        <Copy className="w-3 h-3 text-muted-foreground/70 group-hover:text-muted-foreground transition" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-mono text-xs text-muted-foreground">{entity.named}</div>
                        <div className="font-mono text-xs text-muted-foreground">{entity.numeric}</div>
                        <div className="text-xs text-muted-foreground/70">{entity.description}</div>
                      </div>
                      {copiedText === `${category.name}-${idx}` && (
                        <div className="text-xs text-green-400 mt-1">Copied!</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredEntities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No entities found matching &quot;{search}&quot;</p>
            </div>
          )}
        </div>

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={htmlEntitiesGuideContent.quickStartSteps} />
          </GeoSection>
          <GeoSection id="what-is" title={htmlEntitiesGuideContent.introduction.title} subtitle="Understanding HTML entities" variant="default">
            <MarkdownContent content={htmlEntitiesGuideContent.introduction.content} />
          </GeoSection>
          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use HTML entities" variant="default">
            <FeatureGrid features={htmlEntitiesGuideContent.useCases.map(uc => ({ title: uc.title, description: uc.description }))} columns={2} />
          </GeoSection>
          <GeoSection id="how-to-use" title={htmlEntitiesGuideContent.howToUse.title} subtitle="Master all features" variant="minimal">
            <HowToSchema name={`How to use ${htmlEntitiesGuideContent.toolName}`} description="Step-by-step guide" steps={htmlEntitiesGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${htmlEntitiesGuideContent.toolPath}`} />
            <MarkdownContent content={htmlEntitiesGuideContent.howToUse.content} />
          </GeoSection>
          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={htmlEntitiesGuideContent.faqs} />
          </GeoSection>
          <GeoSection id="security" title={htmlEntitiesGuideContent.security.title} subtitle="Your content never leaves your browser" variant="highlight">
            <MarkdownContent content={htmlEntitiesGuideContent.security.content} />
          </GeoSection>
          {htmlEntitiesGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(htmlEntitiesGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <RelatedTools currentPath="/html-entities" />
        <LastUpdated date={htmlEntitiesGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Encode and decode HTML entities. Click any entity in the reference table to copy.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="HTML Entities Encoder/Decoder"
        description="Encode and decode HTML entities. Free online tool for converting special characters."
        url="https://openkit.tools/html-entities"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={htmlEntitiesGuideContent.lastUpdated}
        version={htmlEntitiesGuideContent.version}
        aggregateRating={{ ratingValue: "4.7", ratingCount: "1500", bestRating: "5" }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "HTML Entities", url: "https://openkit.tools/html-entities" },
        ]}
      />
    </main>
  );
}
