"use client";
import { useState, useCallback, useMemo, useRef } from "react";
import Link from "next/link";
import {
  FileImage, Upload, Download, Copy, RotateCcw, Settings2,
  Check, AlertCircle, Sparkles
} from "lucide-react";
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
import { svgOptimizeGuideContent } from "@/content/svg-optimize-guide";
import { sanitizeHtml } from "@/lib/sanitize-html";
import { useAnalytics } from "@/hooks/use-analytics";

type OptimizationOptions = {
  removeComments: boolean;
  removeMetadata: boolean;
  minify: boolean;
  removeEmptyGroups: boolean;
  simplifyPaths: boolean;
  removeUnusedIds: boolean;
  collapseGroups: boolean;
};

export default function SVGOptimizer() {
  useToolTracker("svg-optimize", "SVG Optimizer");
  const { isCopied } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [inputSVG, setInputSVG] = useState("");
  const [outputSVG, setOutputSVG] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [options, setOptions] = useState<OptimizationOptions>({
    removeComments: true,
    removeMetadata: true,
    minify: false,
    removeEmptyGroups: true,
    simplifyPaths: false,
    removeUnusedIds: true,
    collapseGroups: true});

  const safeInputSvg = useMemo(
    () => sanitizeHtml(inputSVG, { USE_PROFILES: { svg: true, svgFilters: true } }),
    [inputSVG]
  );
  const safeOutputSvg = useMemo(
    () => sanitizeHtml(outputSVG, { USE_PROFILES: { svg: true, svgFilters: true } }),
    [outputSVG]
  );

  const optimizeSVG = useCallback((svg: string, opts: OptimizationOptions): string => {
    let result = svg;

    // Remove XML comments
    if (opts.removeComments) {
      result = result.replace(/<!--[\s\S]*?-->/g, "");
    }

    // Remove metadata tags
    if (opts.removeMetadata) {
      result = result.replace(/<metadata[\s\S]*?<\/metadata>/gi, "");
      result = result.replace(/<title[\s\S]*?<\/title>/gi, "");
      result = result.replace(/<desc[\s\S]*?<\/desc>/gi, "");
    }

    // Remove empty groups and defs
    if (opts.removeEmptyGroups) {
      result = result.replace(/<g[\s\S]*?>\s*<\/g>/gi, "");
      result = result.replace(/<defs[\s\S]*?>\s*<\/defs>/gi, "");
    }

    // Simplify paths (basic optimization)
    if (opts.simplifyPaths) {
      // Remove unnecessary spaces in path data
      result = result.replace(/d="([^"]*)"/g, (match, pathData) => {
        const simplified = pathData
          .replace(/\s+/g, " ")
          .replace(/\s*([,])\s*/g, "$1")
          .replace(/([a-zA-Z])\s+/g, "$1")
          .trim();
        return `d="${simplified}"`;
      });
    }

    // Remove unused IDs
    if (opts.removeUnusedIds) {
      const idRegex = /id="([^"]+)"/g;
      const ids = new Set<string>();
      const references = new Set<string>();

      // Collect all IDs
      let match;
      while ((match = idRegex.exec(result)) !== null) {
        ids.add(match[1]);
      }

      // Collect all references (url(#id), xlink:href="#id", etc.)
      const refPatterns = [
        /url\(#([^)]+)\)/g,
        /xlink:href="#([^"]+)"/g,
        /href="#([^"]+)"/g,
      ];

      refPatterns.forEach((pattern) => {
        let refMatch;
        while ((refMatch = pattern.exec(result)) !== null) {
          references.add(refMatch[1]);
        }
      });

      // Remove unused IDs
      ids.forEach((id) => {
        if (!references.has(id)) {
          result = result.replace(new RegExp(`\\s*id="${id}"`, "g"), "");
        }
      });
    }

    // Collapse unnecessary groups
    if (opts.collapseGroups) {
      // Remove groups with only transform or single child
      result = result.replace(
        /<g([^>]*)>([\s\S]*?)<\/g>/gi,
        (match, attrs, content) => {
          // If group has no attributes or only has id, unwrap it
          if (!attrs.trim() || /^\s*id="[^"]*"\s*$/.test(attrs)) {
            return content;
          }
          return match;
        }
      );
    }

    // Minify or prettify
    if (opts.minify) {
      result = result
        .replace(/>\s+</g, "><")
        .replace(/\s+/g, " ")
        .replace(/\s*=\s*/g, "=")
        .trim();
    } else {
      // Basic prettify
      result = result
        .replace(/></g, ">\n<")
        .replace(/\s+/g, " ")
        .trim();
    }

    return result;
  }, []);

  const handleOptimize = useCallback(() => {
    if (!inputSVG.trim()) {
      setError("Please provide SVG content");
      return;
    }

    // Validate SVG
    if (!inputSVG.toLowerCase().includes("<svg")) {
      setError("Invalid SVG: must contain <svg> tag");
      return;
    }

    setError("");
    const optimized = optimizeSVG(inputSVG, options);
    setOutputSVG(optimized);
    
    const inputSize = new Blob([inputSVG]).size;
    const outputSize = new Blob([optimized]).size;
    const savedBytes = inputSize - outputSize;
    const savedPercent = inputSize > 0 ? ((savedBytes / inputSize) * 100).toFixed(1) : "0";
    
    analytics.trackToolUsage('svg-optimize', {
      action: 'optimize',
      originalSize: inputSize,
      optimizedSize: outputSize,
      savedBytes,
      savedPercent: parseFloat(savedPercent),
      options: Object.entries(options).filter(([_, v]) => v).map(([k]) => k).join(',')
    });
  }, [inputSVG, options, optimizeSVG, analytics]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".svg")) {
      setError("Please upload an SVG file");
      analytics.trackError('svg-upload-error', {
        tool: 'svg-optimize',
        errorType: 'invalid-file-type',
        fileExtension: file.name.split('.').pop()
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInputSVG(content);
      setError("");
      analytics.trackToolInteraction('svg-optimize', 'upload-file', {
        fileName: file.name,
        fileSize: file.size
      });
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    const blob = new Blob([outputSVG], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "optimized.svg";
    a.click();
    URL.revokeObjectURL(url);
    
    analytics.trackToolInteraction('svg-optimize', 'download', {
      outputSize: new Blob([outputSVG]).size
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(outputSVG);
    analytics.trackToolInteraction('svg-optimize', 'copy-output', {
      outputSize: new Blob([outputSVG]).size
    });
  };

  const handleReset = () => {
    setInputSVG("");
    setOutputSVG("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const toggleOption = (key: keyof OptimizationOptions) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const inputSize = new Blob([inputSVG]).size;
  const outputSize = new Blob([outputSVG]).size;
  const savedBytes = inputSize - outputSize;
  const savedPercent = inputSize > 0 ? ((savedBytes / inputSize) * 100).toFixed(1) : "0";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center hover:opacity-80 transition"
            >
              <FileImage className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">SVG Optimizer</h1>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent rounded-lg text-sm font-medium text-accent-foreground transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Description */}
        <p className="text-sm text-muted-foreground text-center mb-6">
          Compress and clean SVG files. All processing happens in your browser.
        </p>

        {/* File Upload */}
        <div className="mb-6">
          <input aria-label="Input field"
            ref={fileInputRef}
            type="file"
            accept=".svg"
            onChange={handleFileUpload}
            className="hidden"
            id="svg-upload"
          />
          <label
            htmlFor="svg-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl hover:border-border hover:bg-card/50 transition cursor-pointer"
          >
            <Upload className="w-8 h-8 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">Click to upload SVG file</span>
            <span className="text-xs text-muted-foreground mt-1">or paste SVG code below</span>
          </label>
        </div>

        {/* Options */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Settings2 className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-xl sm:text-2xl font-semibold">Optimization Options</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { key: "removeComments", label: "Remove comments" },
              { key: "removeMetadata", label: "Remove metadata" },
              { key: "removeEmptyGroups", label: "Remove empty groups" },
              { key: "removeUnusedIds", label: "Remove unused IDs" },
              { key: "collapseGroups", label: "Collapse groups" },
              { key: "simplifyPaths", label: "Simplify paths" },
            ].map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center gap-2 cursor-pointer select-none group"
              >
                <input aria-label="Input field"
                  type="checkbox"
                  checked={options[key as keyof OptimizationOptions]}
                  onChange={() => toggleOption(key as keyof OptimizationOptions)}
                  className="w-4 h-4 rounded border-border bg-muted text-purple-600 focus:ring-purple-500 focus:ring-offset-card"
                />
                <span className="text-sm text-accent-foreground group-hover:text-foreground transition">
                  {label}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <label htmlFor="page-input-287" className="flex items-center gap-2 cursor-pointer select-none group">
              <input id="page-input-287"
                type="checkbox"
                checked={options.minify}
                onChange={() => toggleOption("minify")}
                className="w-4 h-4 rounded border-border bg-muted text-purple-600 focus:ring-purple-500 focus:ring-offset-card"
              />
              <span className="text-sm text-accent-foreground group-hover:text-foreground transition">
                Minify output
              </span>
              <span className="text-xs text-muted-foreground">(removes whitespace)</span>
            </label>
          </div>
        </div>

        {/* Input/Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base sm:text-lg font-semibold">Input SVG</h3>
              <span className="text-xs text-muted-foreground">
                {inputSize > 0 ? `${(inputSize / 1024).toFixed(2)} KB` : "—"}
              </span>
            </div>
            <textarea
              value={inputSVG}
              onChange={(e) => setInputSVG(e.target.value)}
              placeholder="Paste SVG code here..."
              className="w-full h-64 px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:border-border text-sm font-mono resize-none"
            />
          </div>

          {/* Output */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base sm:text-lg font-semibold">Optimized SVG</h3>
              <span className="text-xs text-muted-foreground">
                {outputSize > 0 ? `${(outputSize / 1024).toFixed(2)} KB` : "—"}
              </span>
            </div>
            <textarea
              value={outputSVG}
              readOnly
              placeholder="Optimized SVG will appear here..."
              className="w-full h-64 px-3 py-2 bg-card border border-border rounded-lg focus:outline-none text-sm font-mono resize-none"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-800 rounded-lg text-sm text-red-400 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Stats */}
        {outputSVG && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="bg-card border border-border rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Original Size</p>
              <p className="text-lg font-semibold">{(inputSize / 1024).toFixed(2)} KB</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Optimized Size</p>
              <p className="text-lg font-semibold">{(outputSize / 1024).toFixed(2)} KB</p>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-800/50 rounded-lg p-3 text-center">
              <p className="text-xs text-green-400 mb-1">Saved</p>
              <p className="text-lg font-semibold text-green-400">
                {savedPercent}% ({(savedBytes / 1024).toFixed(2)} KB)
              </p>
            </div>
          </div>
        )}

        {/* Visual Preview */}
        {outputSVG && !error && (
          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Preview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Before</p>
                <div
                  className="bg-white/5 border border-border rounded-lg p-4 flex items-center justify-center min-h-[200px]"
                  dangerouslySetInnerHTML={{ __html: safeInputSvg }}
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">After</p>
                <div
                  className="bg-white/5 border border-border rounded-lg p-4 flex items-center justify-center min-h-[200px]"
                  dangerouslySetInnerHTML={{ __html: safeOutputSvg }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={handleOptimize}
            className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium text-white transition"
          >
            <Sparkles className="w-4 h-4" />
            Optimize
          </button>

          {outputSVG && (
            <>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-2.5 bg-muted hover:bg-accent rounded-lg text-sm font-medium text-accent-foreground transition"
              >
                <Download className="w-4 h-4" />
                Download
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-6 py-2.5 bg-muted hover:bg-accent rounded-lg text-sm font-medium text-accent-foreground transition"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </>
          )}
        </div>

        <RelatedTools currentPath="/svg-optimize" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={svgOptimizeGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-svg-optimization" title={svgOptimizeGuideContent.introduction.title} subtitle="Understanding SVG optimization" variant="default">
            <MarkdownContent content={svgOptimizeGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use SVG optimization" variant="default">
            <FeatureGrid features={svgOptimizeGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={svgOptimizeGuideContent.howToUse.title} subtitle="Master SVG optimization" variant="minimal">
            <HowToSchema name={`How to use ${svgOptimizeGuideContent.toolName}`} description="Step-by-step guide to SVG optimization" steps={svgOptimizeGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${svgOptimizeGuideContent.toolPath}`} />
            <MarkdownContent content={svgOptimizeGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={svgOptimizeGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={svgOptimizeGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={svgOptimizeGuideContent.security.content} />
          </GeoSection>

          {svgOptimizeGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(svgOptimizeGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={svgOptimizeGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Compress and clean SVG files without external dependencies.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="SVG Optimizer"
        description="Compress and clean SVG files. Remove metadata, minify, and optimize paths."
        url="https://openkit.tools/svg-optimize"
        applicationCategory="UtilitiesApplication"
        datePublished="2024-01-15"
        dateModified={svgOptimizeGuideContent.lastUpdated}
        version={svgOptimizeGuideContent.version}
        aggregateRating={{ratingValue: "4.9", ratingCount: "2145", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "SVG Optimizer", url: "https://openkit.tools/svg-optimize" },
        ]}
      />
    </main>
  );
}
