"use client";
import { useState, useCallback, useRef } from "react";
import {
  Scissors,
  Copy,
  Upload,
  Palette,
  RotateCcw,
  Check,
  Download,
  Image as ImageIcon} from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import {
  StructuredData,
  BreadcrumbStructuredData} from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { clipPathGuideContent } from "@/content/clip-path-guide";

type ShapeType =
  | "circle"
  | "ellipse"
  | "triangle"
  | "pentagon"
  | "hexagon"
  | "star"
  | "heart"
  | "arrow"
  | "polygon"
  | "inset";

interface Point {
  x: number;
  y: number;
}

interface ShapePreset {
  name: string;
  type: ShapeType;
  description: string;
  points?: Point[];
  params?: Record<string, number>;
}

const SHAPE_PRESETS: ShapePreset[] = [
  {
    name: "Circle",
    type: "circle",
    description: "Perfect circle",
    params: { radius: 50, cx: 50, cy: 50 }},
  {
    name: "Ellipse",
    type: "ellipse",
    description: "Oval shape",
    params: { rx: 50, ry: 35, cx: 50, cy: 50 }},
  {
    name: "Triangle",
    type: "triangle",
    description: "Three-sided polygon",
    points: [
      { x: 50, y: 10 },
      { x: 90, y: 90 },
      { x: 10, y: 90 },
    ]},
  {
    name: "Pentagon",
    type: "pentagon",
    description: "Five-sided polygon",
    points: [
      { x: 50, y: 5 },
      { x: 95, y: 35 },
      { x: 80, y: 90 },
      { x: 20, y: 90 },
      { x: 5, y: 35 },
    ]},
  {
    name: "Hexagon",
    type: "hexagon",
    description: "Six-sided polygon",
    points: [
      { x: 50, y: 5 },
      { x: 90, y: 25 },
      { x: 90, y: 75 },
      { x: 50, y: 95 },
      { x: 10, y: 75 },
      { x: 10, y: 25 },
    ]},
  {
    name: "Star",
    type: "star",
    description: "Five-pointed star",
    points: [
      { x: 50, y: 5 },
      { x: 61, y: 35 },
      { x: 95, y: 35 },
      { x: 68, y: 57 },
      { x: 79, y: 91 },
      { x: 50, y: 70 },
      { x: 21, y: 91 },
      { x: 32, y: 57 },
      { x: 5, y: 35 },
      { x: 39, y: 35 },
    ]},
  {
    name: "Heart",
    type: "heart",
    description: "Heart shape",
    points: [
      { x: 50, y: 30 },
      { x: 20, y: 10 },
      { x: 5, y: 25 },
      { x: 5, y: 45 },
      { x: 50, y: 90 },
      { x: 95, y: 45 },
      { x: 95, y: 25 },
      { x: 80, y: 10 },
    ]},
  {
    name: "Arrow",
    type: "arrow",
    description: "Right-pointing arrow",
    points: [
      { x: 5, y: 35 },
      { x: 60, y: 35 },
      { x: 60, y: 10 },
      { x: 95, y: 50 },
      { x: 60, y: 90 },
      { x: 60, y: 65 },
      { x: 5, y: 65 },
    ]},
  {
    name: "Inset Rectangle",
    type: "inset",
    description: "Rectangular clip with margins",
    params: { top: 10, right: 10, bottom: 10, left: 10 }},
];

const BACKGROUND_COLORS = [
  "#3b82f6", // blue
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#f43f5e", // rose
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#14b8a6", // teal
];

export default function ClipPathGenerator() {
  useToolTracker("clip-path", "CSS Clip Path Generator");
  const analytics = useAnalytics();
  const { isCopied } = useCopyToClipboard({ duration: 1500 });
  const [selectedPreset, setSelectedPreset] = useState<ShapePreset>(SHAPE_PRESETS[0]);
  const [points, setPoints] = useState<Point[]>(SHAPE_PRESETS[0].points || []);
  const [params, setParams] = useState<Record<string, number>>(SHAPE_PRESETS[0].params || {});
  const [backgroundColor, setBackgroundColor] = useState(BACKGROUND_COLORS[0]);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [useImage, setUseImage] = useState(false);
    const [includeVendorPrefixes, setIncludeVendorPrefixes] = useState(false);
  const [draggedPointIndex, setDraggedPointIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const generateClipPath = useCallback(() => {
    if (selectedPreset.type === "circle") {
      return `circle(${params.radius}% at ${params.cx}% ${params.cy}%)`;
    }
    if (selectedPreset.type === "ellipse") {
      return `ellipse(${params.rx}% ${params.ry}% at ${params.cx}% ${params.cy}%)`;
    }
    if (selectedPreset.type === "inset") {
      return `inset(${params.top}% ${params.right}% ${params.bottom}% ${params.left}%)`;
    }
    // Polygon-based shapes
    const pointsStr = points.map(p => `${p.x}% ${p.y}%`).join(", ");
    return `polygon(${pointsStr})`;
  }, [selectedPreset, points, params]);

  const generateCSS = useCallback(() => {
    const clipPath = generateClipPath();
    let css = `clip-path: ${clipPath};`;

    if (includeVendorPrefixes) {
      css = `-webkit-clip-path: ${clipPath};\nclip-path: ${clipPath};`;
    }

    return css;
  }, [generateClipPath, includeVendorPrefixes]);

  const copyToClipboard = async () => {
    const css = generateCSS();
    await navigator.clipboard.writeText(css);
    analytics.trackToolInteraction('clip-path', 'copy_css', {
      shape: selectedPreset.name,
      hasImage: !!backgroundImage
    });
  };

  const handlePresetChange = (preset: ShapePreset) => {
    setSelectedPreset(preset);
    setPoints(preset.points || []);
    setParams(preset.params || {});
    analytics.trackToolInteraction('clip-path', 'change_preset', {
      preset: preset.name
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setBackgroundImage(event.target?.result as string);
      setUseImage(true);
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (index: number) => {
    setDraggedPointIndex(index);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggedPointIndex === null || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

    setPoints(prev => {
      const newPoints = [...prev];
      newPoints[draggedPointIndex] = { x, y };
      return newPoints;
    });
  };

  const handleMouseUp = () => {
    setDraggedPointIndex(null);
  };

  const reset = () => {
    handlePresetChange(selectedPreset);
  };

  const downloadCSS = () => {
    const css = generateCSS();
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clip-path-${selectedPreset.type}.css`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clipPath = generateClipPath();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <StructuredData
        type="WebApplication"
        name="CSS Clip-path Generator"
        description="Visual editor for creating CSS clip-path shapes with draggable control points. Generate circle, ellipse, polygon, and inset clip-paths with live preview."
        url="https://openkit.tools/clip-path"
        dateModified={clipPathGuideContent.lastUpdated}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://openkit.tools" },
          { name: "Design Tools", url: "https://openkit.tools/#design" },
          { name: "CSS Clip-path Generator", url: "https://openkit.tools/clip-path" },
        ]}
      />

      {/* Header */}
      <div className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 flex items-center justify-center">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">CSS Clip-path Generator</h1>
            <p className="text-sm text-muted-foreground">Create custom clip-path shapes visually</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Visual Editor */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold">Visual Preview</h2>
                <button
                  onClick={reset}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm sm:text-xs bg-muted hover:bg-accent border border-border rounded-lg transition"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              </div>

              {/* Canvas */}
              <div
                ref={canvasRef}
                className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{
                  backgroundImage: useImage && backgroundImage
                    ? `url(${backgroundImage})`
                    : undefined,
                  backgroundColor: !useImage ? backgroundColor : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center"}}
              >
                {/* Clipped preview layer */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath,
                    WebkitClipPath: clipPath,
                    background: useImage && backgroundImage
                      ? `url(${backgroundImage})`
                      : backgroundColor,
                    backgroundSize: "cover",
                    backgroundPosition: "center"}}
                />

                {/* Control points for polygon shapes */}
                {points.length > 0 && points.map((point, index) => (
                  <div
                    key={index}
                    className="absolute w-4 h-4 -ml-2 -mt-2 bg-pink-500 border-2 border-white rounded-full cursor-move hover:scale-125 transition-transform shadow-lg"
                    style={{
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                      zIndex: 10}}
                    onMouseDown={() => handleMouseDown(index)}
                  />
                ))}
              </div>

              {/* Background Controls */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setUseImage(false)}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg border transition ${
                      !useImage
                        ? "bg-pink-500/20 border-pink-500/50 text-pink-300"
                        : "bg-muted border-border text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <Palette className="w-4 h-4 inline mr-1" />
                    Color
                  </button>
                  <button
                    onClick={() => setUseImage(true)}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg border transition ${
                      useImage
                        ? "bg-pink-500/20 border-pink-500/50 text-pink-300"
                        : "bg-muted border-border text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <ImageIcon className="w-4 h-4 inline mr-1" aria-hidden="true" />
                    Image
                  </button>
                </div>

                {!useImage ? (
                  <div className="flex gap-2">
                    {BACKGROUND_COLORS.map(color => (
                      <button
                        key={color}
                        onClick={() => setBackgroundColor(color)}
                        className={`w-8 h-8 rounded-lg border-2 transition ${
                          backgroundColor === color
                            ? "border-white scale-110"
                            : "border-border hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                ) : (
                  <label className="flex items-center gap-2 px-3 py-2 bg-muted hover:bg-accent border border-border rounded-lg cursor-pointer transition">
                    <Upload className="w-4 h-4" />
                    <span className="text-sm">Upload Image</span>
                    <input aria-label="Input field"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Shape Presets */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h2 className="text-sm font-semibold mb-3">Shape Presets</h2>
              <div className="grid grid-cols-3 gap-2">
                {SHAPE_PRESETS.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => handlePresetChange(preset)}
                    className={`p-3 text-xs rounded-lg border transition ${
                      selectedPreset.name === preset.name
                        ? "bg-pink-500/20 border-pink-500/50 text-pink-300"
                        : "bg-muted border-border text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    <div className="font-medium">{preset.name}</div>
                    <div className="text-muted-foreground text-[10px] mt-0.5">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Parameter Controls */}
            {selectedPreset.type === "circle" && (
              <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                <h2 className="text-sm font-semibold">Circle Parameters</h2>
                <div>
                  <label htmlFor="page-input-418" className="text-sm sm:text-xs text-muted-foreground mb-1 block">Radius: {params.radius}%</label>
                  <input id="page-input-418"
                    type="range"
                    min="0"
                    max="50"
                    value={params.radius}
                    onChange={(e) => setParams({ ...params, radius: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="page-input-429" className="text-sm sm:text-xs text-muted-foreground mb-1 block">Center X: {params.cx}%</label>
                  <input id="page-input-429"
                    type="range"
                    min="0"
                    max="100"
                    value={params.cx}
                    onChange={(e) => setParams({ ...params, cx: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="page-input-440" className="text-sm sm:text-xs text-muted-foreground mb-1 block">Center Y: {params.cy}%</label>
                  <input id="page-input-440"
                    type="range"
                    min="0"
                    max="100"
                    value={params.cy}
                    onChange={(e) => setParams({ ...params, cy: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {selectedPreset.type === "ellipse" && (
              <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                <h2 className="text-sm font-semibold">Ellipse Parameters</h2>
                <div>
                  <label htmlFor="page-input-457" className="text-sm sm:text-xs text-muted-foreground mb-1 block">Radius X: {params.rx}%</label>
                  <input id="page-input-457"
                    type="range"
                    min="0"
                    max="50"
                    value={params.rx}
                    onChange={(e) => setParams({ ...params, rx: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="page-input-468" className="text-sm sm:text-xs text-muted-foreground mb-1 block">Radius Y: {params.ry}%</label>
                  <input id="page-input-468"
                    type="range"
                    min="0"
                    max="50"
                    value={params.ry}
                    onChange={(e) => setParams({ ...params, ry: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="page-input-479" className="text-sm sm:text-xs text-muted-foreground mb-1 block">Center X: {params.cx}%</label>
                  <input id="page-input-479"
                    type="range"
                    min="0"
                    max="100"
                    value={params.cx}
                    onChange={(e) => setParams({ ...params, cx: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="page-input-490" className="text-sm sm:text-xs text-muted-foreground mb-1 block">Center Y: {params.cy}%</label>
                  <input id="page-input-490"
                    type="range"
                    min="0"
                    max="100"
                    value={params.cy}
                    onChange={(e) => setParams({ ...params, cy: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {selectedPreset.type === "inset" && (
              <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                <h2 className="text-sm font-semibold">Inset Parameters</h2>
                <div>
                  <label htmlFor="page-input-507" className="text-sm sm:text-xs text-muted-foreground mb-1 block">Top: {params.top}%</label>
                  <input id="page-input-507"
                    type="range"
                    min="0"
                    max="50"
                    value={params.top}
                    onChange={(e) => setParams({ ...params, top: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="page-input-518" className="text-sm sm:text-xs text-muted-foreground mb-1 block">Right: {params.right}%</label>
                  <input id="page-input-518"
                    type="range"
                    min="0"
                    max="50"
                    value={params.right}
                    onChange={(e) => setParams({ ...params, right: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="page-input-529" className="text-sm sm:text-xs text-muted-foreground mb-1 block">Bottom: {params.bottom}%</label>
                  <input id="page-input-529"
                    type="range"
                    min="0"
                    max="50"
                    value={params.bottom}
                    onChange={(e) => setParams({ ...params, bottom: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="page-input-540" className="text-sm sm:text-xs text-muted-foreground mb-1 block">Left: {params.left}%</label>
                  <input id="page-input-540"
                    type="range"
                    min="0"
                    max="50"
                    value={params.left}
                    onChange={(e) => setParams({ ...params, left: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right: CSS Output */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold">CSS Output</h2>
                <div className="flex gap-2">
                  <button
                    onClick={downloadCSS}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm sm:text-xs bg-muted hover:bg-accent border border-border rounded-lg transition"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border transition ${
                      isCopied
                        ? "bg-green-500/20 border-green-500/50 text-green-300"
                        : "bg-muted border-border hover:bg-accent"
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              <pre className="bg-background border border-border rounded-lg p-4 text-sm overflow-x-auto">
                <code className="text-pink-400">{generateCSS()}</code>
              </pre>

              <label htmlFor="page-input-594" className="flex items-center gap-2 mt-3 text-sm cursor-pointer">
                <input id="page-input-594"
                  type="checkbox"
                  checked={includeVendorPrefixes}
                  onChange={(e) => setIncludeVendorPrefixes(e.target.checked)}
                  className="w-4 h-4 rounded border-border bg-muted text-pink-500 focus:ring-pink-500 focus:ring-offset-0"
                />
                <span className="text-muted-foreground">Include vendor prefixes (-webkit-)</span>
              </label>
            </div>

            {/* Usage Example */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h2 className="text-sm font-semibold mb-3">Usage Example</h2>
              <pre className="bg-background border border-border rounded-lg p-4 text-sm sm:text-xs overflow-x-auto">
                <code className="text-muted-foreground">
{`.element {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  ${generateCSS()}
}`}
                </code>
              </pre>
            </div>

            {/* Browser Support */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h2 className="text-sm font-semibold mb-3">Browser Support</h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Chrome</span>
                  <span className="text-green-400">✓ 55+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Firefox</span>
                  <span className="text-green-400">✓ 54+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Safari</span>
                  <span className="text-yellow-400">⚠ 9.1+ (with -webkit-)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Edge</span>
                  <span className="text-green-400">✓ 79+</span>
                </div>
              </div>
              <p className="text-sm sm:text-xs text-muted-foreground mt-3">
                💡 Use vendor prefixes for better Safari support
              </p>
            </div>

            {/* Tips */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h2 className="text-sm font-semibold mb-3">Tips</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-pink-400">•</span>
                  Drag control points to customize polygon shapes
                </li>
                <li className="flex gap-2">
                  <span className="text-pink-400">•</span>
                  Works great with images, gradients, and solid colors
                </li>
                <li className="flex gap-2">
                  <span className="text-pink-400">•</span>
                  Use inset() for simple rectangular clips with rounded corners
                </li>
                <li className="flex gap-2">
                  <span className="text-pink-400">•</span>
                  Combine with transitions for smooth shape morphing effects
                </li>
              </ul>
            </div>
          </div>
        </div>

        <RelatedTools currentPath="/clip-path" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Create CSS clip-paths in seconds" variant="highlight">
            <QuickStartGuide steps={clipPathGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-clip-path" title={clipPathGuideContent.introduction.title} subtitle="Understanding CSS clip-path generation" variant="default">
            <MarkdownContent content={clipPathGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use clip-path generation" variant="default">
            <FeatureGrid features={clipPathGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={clipPathGuideContent.howToUse.title} subtitle="Master CSS clip-path creation" variant="minimal">
            <HowToSchema name={`How to use ${clipPathGuideContent.toolName}`} description="Step-by-step guide to CSS clip-path generation" steps={clipPathGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${clipPathGuideContent.toolPath}`} />
            <MarkdownContent content={clipPathGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={clipPathGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={clipPathGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={clipPathGuideContent.security.content} />
          </GeoSection>

          {clipPathGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(clipPathGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={clipPathGuideContent.lastUpdated} />
      </div>
    </main>
  );
}
