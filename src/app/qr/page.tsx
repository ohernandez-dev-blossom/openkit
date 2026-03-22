"use client";
import { RelatedTools } from "@/components/related-tools";
import { useState, useEffect, useCallback, useRef, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { LabeledInput } from "@/components/ui/labeled-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { RefreshCw } from "lucide-react";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { ShareButton } from "@/components/share-button";
import { useSharedData } from "@/hooks/use-shared-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { qrGuideContent } from "@/content/qr-guide";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { SHORTCUTS } from "@/lib/keyboard-shortcuts";
export default function Home() {
  useToolTracker("qr", "QR Code Generator", "generators");
  const analytics = useAnalytics();
  const [text, setText] = useState("https://example.com");
  const [size, setSize] = useState(256);
  const [darkColor, setDarkColor] = useState("#000000");
  const [lightColor, setLightColor] = useState("#ffffff");
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initializedRef = useRef(false);
  const [, startTransition] = useTransition();

  // Load shared data from URL
  const sharedData = useSharedData();

  useEffect(() => {
    if (sharedData && sharedData.tool === "qr" && !initializedRef.current) {
      const { text: sharedText, size: sharedSize, darkColor: sharedDarkColor, lightColor: sharedLightColor, errorLevel: sharedErrorLevel } = sharedData.data as {
        text?: string;
        size?: number;
        darkColor?: string;
        lightColor?: string;
        errorLevel?: "L" | "M" | "Q" | "H";
      };

      // Loading shared state from URL - using transition to prevent cascading renders
      initializedRef.current = true;
      startTransition(() => {
        if (sharedText !== undefined) setText(sharedText);
        if (sharedSize !== undefined) setSize(sharedSize);
        if (sharedDarkColor !== undefined) setDarkColor(sharedDarkColor);
        if (sharedLightColor !== undefined) setLightColor(sharedLightColor);
        if (sharedErrorLevel !== undefined) setErrorLevel(sharedErrorLevel);
      });
    }
  }, [sharedData, startTransition]);
  const generateQR = useCallback(async () => {
    if (!text.trim()) {
      setQrDataUrl("");
      setError("");
      return;
    }
    try {
      setError("");
      // Lazy load QRCode library only when needed
      const QRCode = (await import("qrcode")).default;
      const dataUrl = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: {
          dark: darkColor,
          light: lightColor},
        errorCorrectionLevel: errorLevel});
      setQrDataUrl(dataUrl);
      
      // Track QR code generation
      analytics.trackToolUsage('qr', {
        action: 'generate',
        size,
        errorLevel,
        customColors: darkColor !== '#000000' || lightColor !== '#ffffff',
        textLength: text.length
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate QR code");
      setQrDataUrl("");
    }
  }, [text, size, darkColor, lightColor, errorLevel, analytics]);
  useEffect(() => {
    // Generate QR code when inputs change - valid pattern for async computation
    generateQR();
  }, [generateQR]);
  const downloadQR = useCallback(async (format: "png" | "svg") => {
    if (!text.trim()) return;
    if (format === "png") {
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = qrDataUrl;
      link.click();
    } else {
      // Lazy load QRCode library only when needed
      const QRCode = (await import("qrcode")).default;
      QRCode.toString(text, {
        type: "svg",
        width: size,
        margin: 2,
        color: {
          dark: darkColor,
          light: lightColor},
        errorCorrectionLevel: errorLevel}).then((svg) => {
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "qrcode.svg";
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      });
    }
  }, [text, qrDataUrl, size, darkColor, lightColor, errorLevel]);
  const presets = [
    { label: "URL", value: "https://example.com" },
    { label: "Email", value: "mailto:hello@example.com" },
    { label: "Phone", value: "tel:+1234567890" },
    { label: "SMS", value: "sms:+1234567890?body=Hello" },
    { label: "WiFi", value: "WIFI:T:WPA;S:NetworkName;P:Password;;" },
  ];
  
  const randomize = () => {
    const samples = [
      ...presets.map(p => p.value),
      `https://openkit.tools/?ref=${Date.now()}`,
      crypto.randomUUID(),
      `Random-${Math.floor(Math.random() * 100000)}`,
    ];
    const randomText = samples[Math.floor(Math.random() * samples.length)];
    setText(randomText);
    
    // Random colors
    const colors = ['#000000', '#1e40af', '#7c2d12', '#15803d', '#6b21a8'];
    setDarkColor(colors[Math.floor(Math.random() * colors.length)]);
  };
  
  const clear = useCallback(() => {
    setText("");
    setQrDataUrl("");
    setError("");
  }, []);
  
  // Keyboard shortcuts
  useKeyboardShortcut(SHORTCUTS.execute, generateQR, { enabled: !!text });
  useKeyboardShortcut(SHORTCUTS.clear, clear, { enabled: !!text });
  useKeyboardShortcut(SHORTCUTS.sample, randomize);
  
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h3v2h-3v-2zm0 4h3v2h-3v-2zm-4-4h2v6h-2v-6zm-2 4h2v2h-2v-2z"/>
              </svg>
            </div>
            <h1 className="text-xl font-semibold">QR Code Generator</h1>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Text Input */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <LabeledInput
                  label="QR Code Content"
                  value={text}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                  placeholder="Enter URL, text, or data..."
                  className="bg-muted border-border font-mono"
                />
                <div className="flex flex-wrap gap-2">
                  {presets.map(({ label, value }) => (
                    <button
                      key={label}
                      onClick={() => setText(value)}
                      className="px-2 py-1 text-sm sm:text-xs bg-muted hover:bg-accent rounded"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Settings */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Size */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Size</span>
                    <span className="font-mono">{size}px</span>
                  </div>
                  <Slider
                    value={[size]}
                    min={128}
                    max={512}
                    step={32}
                    onValueChange={([v]) => setSize(v)}
                  />
                </div>
                {/* Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">QR Color</label>
                    <div className="flex gap-2">
                      <input type="color" value={darkColor} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDarkColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" aria-label="QR code dark color" />
                      <LabeledInput
                        label="QR Color Hex Value"
                        value={darkColor}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDarkColor(e.target.value)}
                        className="bg-muted border-border font-mono text-sm"
                        containerClassName="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Background</label>
                    <div className="flex gap-2">
                      <input type="color" value={lightColor} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLightColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" aria-label="QR code background color" />
                      <LabeledInput
                        label="Background Color Hex Value"
                        value={lightColor}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLightColor(e.target.value)}
                        className="bg-muted border-border font-mono text-sm"
                        containerClassName="flex-1"
                      />
                    </div>
                  </div>
                </div>
                {/* Error Correction */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Error Correction</label>
                  <div className="flex gap-2">
                    {(["L", "M", "Q", "H"] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setErrorLevel(level)}
                        className={`flex-1 py-2 rounded text-sm ${
                          errorLevel === level
                            ? "bg-indigo-600"
                            : "bg-muted hover:bg-accent"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm sm:text-xs text-muted-foreground">
                    L=7% M=15% Q=25% H=30% recovery
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Preview Section */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Preview</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {error ? (
                  <div className="p-4 text-red-400 text-sm">{error}</div>
                ) : qrDataUrl ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={qrDataUrl}
                      alt="QR Code"
                      className="rounded-lg"
                      style={{ maxWidth: size, maxHeight: size }}
                    />
                  </>
                ) : (
                  <div className="w-64 h-64 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                    Enter content to generate QR
                  </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </CardContent>
            </Card>
            {/* Download */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <Button
                  onClick={() => downloadQR("png")}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                  disabled={!qrDataUrl}
                >
                  Download PNG
                </Button>
                <Button
                  onClick={() => downloadQR("svg")}
                  variant="outline"
                  className="flex-1 border-border"
                  disabled={!text.trim()}
                >
                  Download SVG
                </Button>
              </div>
              <ShareButton
                toolId="qr"
                data={{ text, size, darkColor, lightColor, errorLevel }}
                variant="outline"
                className="w-full border-border hover:bg-muted"
                disabled={!text.trim()}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Related Tools */}
        <RelatedTools currentPath="/qr" />

      {/* GEO Content - Professional Design System */}
      <GeoContentLayout>
        <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
          <QuickStartGuide steps={qrGuideContent.quickStartSteps} />
        </GeoSection>

        <GeoSection id="what-is-qr" title={qrGuideContent.introduction.title} subtitle="Understanding 2D barcodes for contactless interaction" variant="default">
          <MarkdownContent content={qrGuideContent.introduction.content} />
        </GeoSection>

        <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use QR codes daily" variant="default">
          <FeatureGrid features={qrGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
        </GeoSection>

        <GeoSection id="how-to-use" title={qrGuideContent.howToUse.title} subtitle="Master QR code generation and customization" variant="minimal">
          <HowToSchema name={`How to use ${qrGuideContent.toolName}`} description="Step-by-step guide to generating QR codes" steps={qrGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${qrGuideContent.toolPath}`} />
          <MarkdownContent content={qrGuideContent.howToUse.content} />
        </GeoSection>

        <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know about QR codes" variant="default">
          <ToolFAQ faqs={qrGuideContent.faqs} />
        </GeoSection>

        <GeoSection id="security" title={qrGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
          <MarkdownContent content={qrGuideContent.security.content} />
        </GeoSection>

        {qrGuideContent.stats && (
          <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics and capabilities" variant="minimal">
            <StatsBar stats={Object.entries(qrGuideContent.stats).map(([label, value]) => ({label, value}))} />
          </GeoSection>
        )}
      </GeoContentLayout>

      <LastUpdated date={qrGuideContent.lastUpdated} />

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-4 mt-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Generate QR codes for URLs, WiFi, contacts, and more. No data leaves your browser.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="QR Code Generator"
        description="Free QR code generator with customization. Create QR codes for URLs, WiFi, contacts, and more. Download as PNG or SVG."
        url="https://openkit.tools/qr"
        applicationCategory="UtilitiesApplication"
        datePublished="2024-01-15"
        dateModified={qrGuideContent.lastUpdated}
        version={qrGuideContent.version}
        aggregateRating={{
          ratingValue: "4.9",
          ratingCount: "3421",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'QR Code Generator', url: 'https://openkit.tools/qr' },
        ]}
      />
    </main>
  );
}
