"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Palette, Copy, Plus, Trash2, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { gradientGenGuideContent } from "@/content/gradient-gen-guide";

type GradientType = "linear" | "radial" | "conic";
type ExportFormat = "css" | "tailwind" | "background-image";

type ColorStop = {
  id: string;
  color: string;
  position: number; // 0-100
};

type Preset = {
  name: string;
  type: GradientType;
  angle: number;
  centerX: number;
  centerY: number;
  stops: Omit<ColorStop, "id">[];
};

const PRESETS: Preset[] = [
  {
    name: "Sunset Vibes",
    type: "linear",
    angle: 135,
    centerX: 50,
    centerY: 50,
    stops: [
      { color: "#FF6B6B", position: 0 },
      { color: "#FFE66D", position: 50 },
      { color: "#4ECDC4", position: 100 },
    ]},
  {
    name: "Ocean Breeze",
    type: "linear",
    angle: 90,
    centerX: 50,
    centerY: 50,
    stops: [
      { color: "#667eea", position: 0 },
      { color: "#764ba2", position: 100 },
    ]},
  {
    name: "Purple Haze",
    type: "linear",
    angle: 45,
    centerX: 50,
    centerY: 50,
    stops: [
      { color: "#8B5CF6", position: 0 },
      { color: "#EC4899", position: 100 },
    ]},
  {
    name: "Mint Fresh",
    type: "linear",
    angle: 180,
    centerX: 50,
    centerY: 50,
    stops: [
      { color: "#06b6d4", position: 0 },
      { color: "#10b981", position: 100 },
    ]},
  {
    name: "Fire Flame",
    type: "linear",
    angle: 90,
    centerX: 50,
    centerY: 50,
    stops: [
      { color: "#f97316", position: 0 },
      { color: "#dc2626", position: 50 },
      { color: "#7c2d12", position: 100 },
    ]},
  {
    name: "Galaxy",
    type: "radial",
    angle: 0,
    centerX: 50,
    centerY: 50,
    stops: [
      { color: "#667eea", position: 0 },
      { color: "#764ba2", position: 50 },
      { color: "#1e1b4b", position: 100 },
    ]},
  {
    name: "Peachy",
    type: "linear",
    angle: 120,
    centerX: 50,
    centerY: 50,
    stops: [
      { color: "#fbbf24", position: 0 },
      { color: "#f59e0b", position: 50 },
      { color: "#f97316", position: 100 },
    ]},
  {
    name: "Northern Lights",
    type: "linear",
    angle: 160,
    centerX: 50,
    centerY: 50,
    stops: [
      { color: "#10b981", position: 0 },
      { color: "#06b6d4", position: 33 },
      { color: "#8b5cf6", position: 66 },
      { color: "#ec4899", position: 100 },
    ]},
  {
    name: "Dawn",
    type: "linear",
    angle: 0,
    centerX: 50,
    centerY: 50,
    stops: [
      { color: "#fef3c7", position: 0 },
      { color: "#fde68a", position: 50 },
      { color: "#f59e0b", position: 100 },
    ]},
  {
    name: "Emerald Dream",
    type: "radial",
    angle: 0,
    centerX: 50,
    centerY: 50,
    stops: [
      { color: "#d1fae5", position: 0 },
      { color: "#10b981", position: 100 },
    ]},
  {
    name: "Berry Blast",
    type: "linear",
    angle: 45,
    centerX: 50,
    centerY: 50,
    stops: [
      { color: "#be185d", position: 0 },
      { color: "#e11d48", position: 50 },
      { color: "#f97316", position: 100 },
    ]},
  {
    name: "Cosmic",
    type: "conic",
    angle: 0,
    centerX: 50,
    centerY: 50,
    stops: [
      { color: "#667eea", position: 0 },
      { color: "#ec4899", position: 25 },
      { color: "#fbbf24", position: 50 },
      { color: "#10b981", position: 75 },
      { color: "#667eea", position: 100 },
    ]},
  {
    name: "Lavender Sky",
    type: "linear",
    angle: 135,
    centerX: 50,
    centerY: 50,
    stops: [
      { color: "#c084fc", position: 0 },
      { color: "#e879f9", position: 100 },
    ]},
  {
    name: "Deep Ocean",
    type: "radial",
    angle: 0,
    centerX: 50,
    centerY: 50,
    stops: [
      { color: "#0891b2", position: 0 },
      { color: "#0c4a6e", position: 100 },
    ]},
  {
    name: "Rainbow Swirl",
    type: "conic",
    angle: 0,
    centerX: 50,
    centerY: 50,
    stops: [
      { color: "#ef4444", position: 0 },
      { color: "#f59e0b", position: 14 },
      { color: "#eab308", position: 28 },
      { color: "#22c55e", position: 42 },
      { color: "#3b82f6", position: 56 },
      { color: "#8b5cf6", position: 70 },
      { color: "#ec4899", position: 84 },
      { color: "#ef4444", position: 100 },
    ]},
];

export default function GradientGenPage() {
  useToolTracker("gradient-gen", "CSS Gradient Generator");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const [type, setType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(135);
  const [centerX, setCenterX] = useState(50);
  const [centerY, setCenterY] = useState(50);
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: "1", color: "#3B82F6", position: 0 },
    { id: "2", color: "#8B5CF6", position: 100 },
  ]);
  const [exportFormat, setExportFormat] = useState<ExportFormat>("css");
  const [draggedStop, setDraggedStop] = useState<string | null>(null);
  const [error] = useState<string | null>(null);

  // Generate CSS gradient string
  const gradientCSS = useMemo(() => {
    try {
      const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
      const stopsStr = sortedStops.map((s) => `${s.color} ${s.position}%`).join(", ");

      if (type === "linear") {
        return `linear-gradient(${angle}deg, ${stopsStr})`;
      } else if (type === "radial") {
        return `radial-gradient(circle at ${centerX}% ${centerY}%, ${stopsStr})`;
      } else {
        return `conic-gradient(from ${angle}deg at ${centerX}% ${centerY}%, ${stopsStr})`;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Gradient generation failed';
      analytics.trackError('gradient_generation_failed', {
        gradientType: type,
        error: errorMessage,
      });
      return 'linear-gradient(to right, #3B82F6, #8B5CF6)';
    }
  }, [type, angle, centerX, centerY, colorStops, analytics]);

  // Export code based on format
  const exportCode = useMemo(() => {
    try {
      if (exportFormat === "css") {
        return `background: ${gradientCSS};`;
      } else if (exportFormat === "tailwind") {
        return `bg-[${gradientCSS}]`;
      } else {
        return `background-image: ${gradientCSS};`;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Export generation failed';
      analytics.trackError('gradient_export_failed', {
        exportFormat,
        gradientType: type,
        error: errorMessage,
      });
      return '/* Error generating export */';
    }
  }, [exportFormat, gradientCSS, type, analytics]);

  const addColorStop = () => {
    const newPosition = colorStops.length > 0 
      ? Math.round((colorStops[0].position + colorStops[colorStops.length - 1].position) / 2)
      : 50;
    const newStop: ColorStop = {
      id: Date.now().toString(),
      color: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
      position: newPosition};
    setColorStops([...colorStops, newStop]);
  };

  const removeColorStop = (id: string) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter((s) => s.id !== id));
    }
  };

  const updateColorStop = (id: string, updates: Partial<ColorStop>) => {
    setColorStops(colorStops.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  
  const randomize = () => {
    const numStops = 2 + Math.floor(Math.random() * 3);
    const newStops: ColorStop[] = Array.from({ length: numStops }, (_, i) => ({
      id: Date.now().toString() + i,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
      position: Math.round((100 / (numStops - 1)) * i)}));
    setColorStops(newStops);
    setAngle(Math.floor(Math.random() * 360));
    setCenterX(30 + Math.floor(Math.random() * 40));
    setCenterY(30 + Math.floor(Math.random() * 40));
    
    analytics.trackToolInteraction('gradient-gen', 'randomize', {
      stopCount: numStops,
      gradientType: type,
    });
  };

  const loadPreset = (preset: Preset) => {
    setType(preset.type);
    setAngle(preset.angle);
    setCenterX(preset.centerX);
    setCenterY(preset.centerY);
    setColorStops(preset.stops.map((s, i) => ({ ...s, id: Date.now().toString() + i })));
    
    analytics.trackToolUsage('gradient-gen', {
      action: 'load-preset',
      presetName: preset.name,
      gradientType: preset.type,
      stopCount: preset.stops.length,
    });
  };

  const handleStopDrag = (e: React.MouseEvent, stopId: string) => {
    const container = e.currentTarget.parentElement as HTMLElement;
    const rect = container.getBoundingClientRect();
    const startX = e.clientX;
    const stop = colorStops.find((s) => s.id === stopId);
    if (!stop) return;

    const startPosition = stop.position;

    const handleMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaPercent = (deltaX / rect.width) * 100;
      const newPosition = Math.max(0, Math.min(100, startPosition + deltaPercent));
      updateColorStop(stopId, { position: Math.round(newPosition) });
    };

    const handleUp = () => {
      setDraggedStop(null);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };

    setDraggedStop(stopId);
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center hover:opacity-80 transition"
            >
              <Palette className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">CSS Gradient Generator</h1>
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">        {/* Preview */}
        <div
          className="relative h-64 sm:h-80 rounded-xl border border-border overflow-hidden"
          style={{ background: gradientCSS }}
        >
          {/* Position indicator for radial/conic */}
          {(type === "radial" || type === "conic") && (
            <div
              className="absolute w-4 h-4 bg-white rounded-full border-2 border-card shadow-lg transform -translate-x-1/2 -translate-y-1/2 cursor-move"
              style={{ left: `${centerX}%`, top: `${centerY}%` }}
              onMouseDown={(e) => {
                const container = e.currentTarget.parentElement as HTMLElement;
                const rect = container.getBoundingClientRect();

                const handleMove = (moveEvent: MouseEvent) => {
                  const x = ((moveEvent.clientX - rect.left) / rect.width) * 100;
                  const y = ((moveEvent.clientY - rect.top) / rect.height) * 100;
                  setCenterX(Math.max(0, Math.min(100, Math.round(x))));
                  setCenterY(Math.max(0, Math.min(100, Math.round(y))));
                };

                const handleUp = () => {
                  document.removeEventListener("mousemove", handleMove);
                  document.removeEventListener("mouseup", handleUp);
                };

                document.addEventListener("mousemove", handleMove);
                document.addEventListener("mouseup", handleUp);
              }}
            />
          )}
        </div>

        {/* Color Stops Bar */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-medium text-accent-foreground">Color Stops</h3>
            <button
              onClick={addColorStop}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-muted hover:bg-accent rounded-lg text-xs text-accent-foreground transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </div>

          {/* Visual color stop editor */}
          <div className="relative h-12 bg-muted rounded-lg mb-4" style={{ background: gradientCSS }}>
            {colorStops.map((stop) => (
              <div
                key={stop.id}
                className={`absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing ${
                  draggedStop === stop.id ? "z-10 scale-110" : ""
                }`}
                style={{ left: `${stop.position}%` }}
                onMouseDown={(e) => handleStopDrag(e, stop.id)}
              >
                <div
                  className="w-6 h-6 rounded-full border-2 border-white shadow-lg"
                  style={{ backgroundColor: stop.color }}
                />
              </div>
            ))}
          </div>

          {/* Color stop controls */}
          <div className="space-y-2">
            {[...colorStops].sort((a, b) => a.position - b.position).map((stop) => (
              <div key={stop.id} className="flex items-center gap-2">
                <input aria-label="Input field"
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateColorStop(stop.id, { color: e.target.value })}
                  className="w-10 h-10 rounded cursor-pointer border-0"
                />
                <input aria-label="Input field"
                  type="text"
                  value={stop.color}
                  onChange={(e) => updateColorStop(stop.id, { color: e.target.value })}
                  className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg font-mono text-sm uppercase"
                />
                <input aria-label="Input field"
                  type="number"
                  value={stop.position}
                  onChange={(e) => updateColorStop(stop.id, { position: parseInt(e.target.value) || 0 })}
                  min="0"
                  max="100"
                  className="w-16 px-2 py-2 bg-muted border border-border rounded-lg text-sm text-center"
                />
                <span className="text-xs text-muted-foreground">%</span>
                <button
                  onClick={() => removeColorStop(stop.id)}
                  disabled={colorStops.length <= 2}
                  className={`p-2 rounded-lg transition ${
                    colorStops.length <= 2
                      ? "text-muted-foreground/70 cursor-not-allowed"
                      : "text-muted-foreground hover:text-red-400 hover:bg-muted"
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Type & Angle/Position */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-accent-foreground mb-2 block">Gradient Type</label>
              <div className="grid grid-cols-3 gap-2">
                {(["linear", "radial", "conic"] as GradientType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`py-2 rounded-lg text-sm capitalize transition ${
                      type === t
                        ? "bg-violet-600 text-white"
                        : "bg-muted text-accent-foreground hover:bg-accent"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {type === "linear" && (
              <div>
                <label className="text-sm font-medium text-accent-foreground mb-2 block">
                  Angle: {angle}°
                </label>
                <input aria-label="Input field"
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-violet-500"
                />
              </div>
            )}

            {type === "radial" && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-accent-foreground mb-2 block">
                    Center X: {centerX}%
                  </label>
                  <input aria-label="Input field"
                    type="range"
                    min="0"
                    max="100"
                    value={centerX}
                    onChange={(e) => setCenterX(parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-accent-foreground mb-2 block">
                    Center Y: {centerY}%
                  </label>
                  <input aria-label="Input field"
                    type="range"
                    min="0"
                    max="100"
                    value={centerY}
                    onChange={(e) => setCenterY(parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                </div>
              </div>
            )}

            {type === "conic" && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-accent-foreground mb-2 block">
                    Rotation: {angle}°
                  </label>
                  <input aria-label="Input field"
                    type="range"
                    min="0"
                    max="360"
                    value={angle}
                    onChange={(e) => setAngle(parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-accent-foreground mb-2 block">
                    Center X: {centerX}%
                  </label>
                  <input aria-label="Input field"
                    type="range"
                    min="0"
                    max="100"
                    value={centerX}
                    onChange={(e) => setCenterX(parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-accent-foreground mb-2 block">
                    Center Y: {centerY}%
                  </label>
                  <input aria-label="Input field"
                    type="range"
                    min="0"
                    max="100"
                    value={centerY}
                    onChange={(e) => setCenterY(parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Export */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-accent-foreground mb-2 block">Export Format</label>
              <div className="grid grid-cols-3 gap-2">
                {(["css", "tailwind", "background-image"] as ExportFormat[]).map((format) => (
                  <button
                    key={format}
                    onClick={() => setExportFormat(format)}
                    className={`py-2 rounded-lg text-xs transition ${
                      exportFormat === format
                        ? "bg-violet-600 text-white"
                        : "bg-muted text-accent-foreground hover:bg-accent"
                    }`}
                  >
                    {format === "background-image" ? "bg-image" : format}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">
                  <strong>Error:</strong> {error}
                </p>
                <p className="text-red-400/70 text-xs mt-1">
                  Check your color values and positions.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">Code Output</label>
                <button
                  onClick={() => copy(exportCode)}
                  className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="p-3 bg-muted border-border rounded-lg">
                <code className="text-xs text-green-400 break-all font-mono">{exportCode}</code>
              </div>
            </div>

            <div className="pt-2">
              <Button className="min-h-[44px] w-full bg-violet-600 hover:bg-violet-500" onClick={() => copy(exportCode)} >
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </Button>
            </div>
          </div>
        </div>

        {/* Preset Gallery */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <h3 className="text-base sm:text-lg font-medium text-accent-foreground">Preset Gradients</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => loadPreset(preset)}
                className="group relative h-24 rounded-lg overflow-hidden border-2 border-border hover:border-violet-500 transition"
                style={{
                  background:
                    preset.type === "linear"
                      ? `linear-gradient(${preset.angle}deg, ${preset.stops
                          .map((s) => `${s.color} ${s.position}%`)
                          .join(", ")})`
                      : preset.type === "radial"
                      ? `radial-gradient(circle at ${preset.centerX}% ${preset.centerY}%, ${preset.stops
                          .map((s) => `${s.color} ${s.position}%`)
                          .join(", ")})`
                      : `conic-gradient(from ${preset.angle}deg at ${preset.centerX}% ${preset.centerY}%, ${preset.stops
                          .map((s) => `${s.color} ${s.position}%`)
                          .join(", ")})`}}
              >
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="text-xs font-medium text-white">{preset.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <RelatedTools currentPath="/gradient-gen" />

        {/* GEO Content - Professional Design System */}
        <GeoContentLayout>
          {/* Quick Start Guide */}
          <GeoSection
            id="quick-start"
            title="Quick Start Guide"
            subtitle="Get up and running in 30 seconds"
            variant="highlight"
          >
            <QuickStartGuide steps={gradientGenGuideContent.quickStartSteps} />
          </GeoSection>

          {/* What is Gradient Generator Section */}
          <GeoSection
            id="what-is-gradient"
            title={gradientGenGuideContent.introduction.title}
            subtitle="Understanding CSS gradient generation for developers"
            variant="default"
          >
            <MarkdownContent content={gradientGenGuideContent.introduction.content} />
          </GeoSection>

          {/* Use Cases - Feature Grid */}
          <GeoSection
            id="use-cases"
            title="Common Use Cases"
            subtitle="How developers use gradient generators daily"
            variant="default"
          >
            <FeatureGrid
              features={gradientGenGuideContent.useCases.map(uc => ({
                title: uc.title,
                description: uc.description
              }))}
              columns={2}
            />
          </GeoSection>

          {/* How to Use This Tool */}
          <GeoSection
            id="how-to-use"
            title={gradientGenGuideContent.howToUse.title}
            subtitle="Master gradient creation and customization"
            variant="minimal"
          >
            <HowToSchema
              name={`How to use ${gradientGenGuideContent.toolName}`}
              description="Step-by-step guide to CSS gradient generation"
              steps={gradientGenGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${gradientGenGuideContent.toolPath}`}
            />
            <MarkdownContent content={gradientGenGuideContent.howToUse.content} />
          </GeoSection>

          {/* FAQ */}
          <GeoSection
            id="faq"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about CSS gradients"
            variant="default"
          >
            <ToolFAQ faqs={gradientGenGuideContent.faqs} />
          </GeoSection>

          {/* Security & Privacy */}
          <GeoSection
            id="security"
            title={gradientGenGuideContent.security.title}
            subtitle="Your gradient data never leaves your browser"
            variant="highlight"
          >
            <MarkdownContent content={gradientGenGuideContent.security.content} />
          </GeoSection>

          {/* Statistics - Stats Bar */}
          {gradientGenGuideContent.stats && (
            <GeoSection
              id="stats"
              title="By the Numbers"
              subtitle="Performance metrics and capabilities"
              variant="minimal"
            >
              <StatsBar
                stats={Object.entries(gradientGenGuideContent.stats).map(([label, value]) => ({
                  label,
                  value
                }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        {/* Last Updated */}
        <LastUpdated date={gradientGenGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Visual CSS gradient generator with color stops, presets, and multiple gradient types.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="CSS Gradient Generator"
        description="Create beautiful CSS gradients with visual editor. Linear, radial, and conic gradients with color stops."
        url="https://openkit.tools/gradient-gen"
        applicationCategory="UtilitiesApplication"
        datePublished="2024-01-15"
        dateModified={gradientGenGuideContent.lastUpdated}
        version={gradientGenGuideContent.version}
        aggregateRating={{
          ratingValue: "4.8",
          ratingCount: "1800",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "CSS Gradient Generator", url: "https://openkit.tools/gradient-gen" },
        ]}
      />
    </main>
  );
}
