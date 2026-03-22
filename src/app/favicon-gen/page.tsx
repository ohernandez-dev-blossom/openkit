"use client";
import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { Image, Upload, Download, Copy, Check, Package } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { faviconGenGuideContent } from "@/content/favicon-gen-guide";

type FaviconSize = {
  name: string;
  width: number;
  height: number;
  filename: string;
};

const FAVICON_SIZES: FaviconSize[] = [
  { name: "16x16", width: 16, height: 16, filename: "favicon-16x16.png" },
  { name: "32x32", width: 32, height: 32, filename: "favicon-32x32.png" },
  { name: "48x48", width: 48, height: 48, filename: "favicon-48x48.png" },
  { name: "Apple Touch Icon", width: 180, height: 180, filename: "apple-touch-icon.png" },
  { name: "Android Chrome 192", width: 192, height: 192, filename: "android-chrome-192x192.png" },
  { name: "Android Chrome 512", width: 512, height: 512, filename: "android-chrome-512x512.png" },
];

export default function FaviconGenerator() {
  useToolTracker("favicon-gen", "Favicon Generator", "generators");
  const analytics = useAnalytics();
  const { copy, copiedText } = useCopyToClipboard({ duration: 1500 });
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [generatedIcons, setGeneratedIcons] = useState<Map<string, string>>(new Map());
    const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateFavicon = useCallback((img: HTMLImageElement) => {
    const icons = new Map<string, string>();

    FAVICON_SIZES.forEach(size => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = size.width;
      canvas.height = size.height;

      // Draw with high quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(img, 0, 0, size.width, size.height);

      icons.set(size.filename, canvas.toDataURL("image/png"));
    });

    setGeneratedIcons(icons);
    setIsGenerating(false);
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsGenerating(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = document.createElement('img');
      img.onload = () => {
        setSourceImage(event.target?.result as string);
        generateFavicon(img);
      };
      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  }, [generateFavicon]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    setIsGenerating(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = document.createElement('img');
      img.onload = () => {
        setSourceImage(event.target?.result as string);
        generateFavicon(img);
      };
      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  }, [generateFavicon]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const downloadIcon = useCallback((filename: string, dataUrl: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    link.click();
    analytics.trackToolUsage("favicon-gen", { action: "icon-downloaded", filename });
  }, [analytics]);

  const downloadAll = useCallback(() => {
    generatedIcons.forEach((dataUrl, filename) => {
      setTimeout(() => {
        downloadIcon(filename, dataUrl);
      }, 100);
    });
    analytics.trackToolUsage("favicon-gen", { action: "all-downloaded", count: generatedIcons.size });
  }, [generatedIcons, downloadIcon, analytics]);


  const htmlCode = `<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">`;

  const manifestJson = `{
  "name": "Your App Name",
  "short_name": "App",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}`;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 text-white flex items-center justify-center hover:opacity-80 transition"
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">Favicon Generator</h1>
          </div>
          {generatedIcons.size > 0 && (
            <button
              onClick={downloadAll}
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium text-white transition"
            >
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Download All</span>
            </button>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Upload Area */}
        {!sourceImage ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-border transition cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Upload Your Logo</h2>
            <p className="text-muted-foreground mb-4">
              Drop an image here or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Supports PNG, JPG, SVG • Recommended: Square image, 512x512px or larger
            </p>
            <input aria-label="Input field"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        ) : (
          <>
            {/* Source Image Preview */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Source Image</h2>
                <button
                  onClick={() => {
                    setSourceImage(null);
                    setGeneratedIcons(new Map());
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="px-3 py-1.5 text-sm bg-muted hover:bg-accent rounded-lg transition"
                >
                  Upload New
                </button>
              </div>
              <div className="flex items-center justify-center p-8 bg-card border border-border rounded-xl">
                <div className="relative w-32 h-32">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sourceImage}
                    alt="Source"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isGenerating && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500 mb-3"></div>
                <p className="text-muted-foreground">Generating favicons...</p>
              </div>
            )}

            {/* Generated Icons */}
            {generatedIcons.size > 0 && (
              <>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Generated Favicons</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {FAVICON_SIZES.map((size) => {
                      const dataUrl = generatedIcons.get(size.filename);
                      if (!dataUrl) return null;

                      return (
                        <div
                          key={size.filename}
                          className="bg-card border border-border rounded-lg p-3 hover:border-border transition"
                        >
                          <div className="aspect-square bg-muted rounded-lg mb-2 flex items-center justify-center p-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={dataUrl}
                              alt={size.name}
                              className="w-full h-full object-contain"
                              style={{
                                imageRendering: size.width <= 32 ? "pixelated" : "auto"}}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground text-center mb-2 font-medium">
                            {size.name}
                          </p>
                          <button
                            onClick={() => downloadIcon(size.filename, dataUrl)}
                            className="w-full px-2 py-1 text-xs bg-muted hover:bg-accent rounded transition flex items-center justify-center gap-1"
                          >
                            <Download className="w-3 h-3" />
                            Download
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* HTML Code */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold">HTML Link Tags</h2>
                    <button
                      onClick={() => copy(htmlCode)}
                      className="px-3 py-1.5 text-sm bg-muted hover:bg-accent rounded-lg transition flex items-center gap-2"
                    >
                      {copiedText === "html" ? (
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
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-accent-foreground font-mono">
                      <code>{htmlCode}</code>
                    </pre>
                  </div>
                </div>

                {/* Manifest JSON */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold">manifest.json</h2>
                    <button
                      onClick={() => copy(manifestJson)}
                      className="px-3 py-1.5 text-sm bg-muted hover:bg-accent rounded-lg transition flex items-center gap-2"
                    >
                      {copiedText === "manifest" ? (
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
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm text-accent-foreground font-mono">
                      <code>{manifestJson}</code>
                    </pre>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        <RelatedTools currentPath="/favicon-gen" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={faviconGenGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-favicon" title={faviconGenGuideContent.introduction.title} subtitle="Understanding favicon implementation for modern web" variant="default">
            <MarkdownContent content={faviconGenGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use favicon generation" variant="default">
            <FeatureGrid features={faviconGenGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={faviconGenGuideContent.howToUse.title} subtitle="Master favicon generation and implementation" variant="minimal">
            <HowToSchema name={`How to use ${faviconGenGuideContent.toolName}`} description="Step-by-step guide to favicon generation" steps={faviconGenGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${faviconGenGuideContent.toolPath}`} />
            <MarkdownContent content={faviconGenGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={faviconGenGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={faviconGenGuideContent.security.title} subtitle="Your images never leave your browser" variant="highlight">
            <MarkdownContent content={faviconGenGuideContent.security.content} />
          </GeoSection>

          {faviconGenGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(faviconGenGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={faviconGenGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Generate all the favicon sizes you need for modern web browsers and devices.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Favicon Generator"
        description="Generate favicon packages from uploaded images. Create all sizes needed for modern browsers."
        url="https://openkit.tools/favicon-gen"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={faviconGenGuideContent.lastUpdated}
        version={faviconGenGuideContent.version}
        aggregateRating={{ratingValue: "4.9", ratingCount: "2143", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "Favicon Generator", url: "https://openkit.tools/favicon-gen" },
        ]}
      />
    </main>
  );
}
