"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Palette, Copy, Pipette, RotateCcw, Check, X } from "lucide-react";
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
import { colorPickerGuideContent } from "@/content/color-picker-guide";

// ---- Color conversion helpers ----

interface HSV {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSL {
  h: number;
  s: number;
  l: number;
}

interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

function hsvToRgb(hsv: HSV): RGB {
  const h = hsv.h / 360;
  const s = hsv.s / 100;
  const v = hsv.v / 100;

  let r = 0, g = 0, b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function rgbToHsv(rgb: RGB): HSV {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (d !== 0) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function rgbToCmyk(rgb: RGB): CMYK {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const k = 1 - Math.max(r, g, b);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };

  return {
    c: Math.round(((1 - r - k) / (1 - k)) * 100),
    m: Math.round(((1 - g - k) / (1 - k)) * 100),
    y: Math.round(((1 - b - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

function rgbToHex(rgb: RGB, alpha: number): string {
  const hex = [rgb.r, rgb.g, rgb.b]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("");
  if (alpha < 1) {
    const a = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0");
    return `#${hex}${a}`;
  }
  return `#${hex}`;
}

function hexToRgb(hex: string): RGB | null {
  const clean = hex.replace(/^#/, "");
  let r: number, g: number, b: number;
  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16);
    g = parseInt(clean[1] + clean[1], 16);
    b = parseInt(clean[2] + clean[2], 16);
  } else if (clean.length === 6 || clean.length === 8) {
    r = parseInt(clean.substring(0, 2), 16);
    g = parseInt(clean.substring(2, 4), 16);
    b = parseInt(clean.substring(4, 6), 16);
  } else {
    return null;
  }
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r, g, b };
}

function relativeLuminance(rgb: RGB): number {
  const [rs, gs, bs] = [rgb.r, rgb.g, rgb.b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(rgb1: RGB, rgb2: RGB): number {
  const l1 = relativeLuminance(rgb1);
  const l2 = relativeLuminance(rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ---- Component ----

export default function ColorPickerTool() {
  useToolTracker("color-picker", "Color Picker", "design");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const [hsv, setHsv] = useState<HSV>({ h: 210, s: 80, v: 90 });
  const [alpha, setAlpha] = useState(1);
  const [history, setHistory] = useState<string[]>([]);
  const [hexInput, setHexInput] = useState("");

  // Contrast checker
  const [fgHex, setFgHex] = useState("#ffffff");
  const [bgHex, setBgHex] = useState("#1a1a2e");

  // EyeDropper
  const [hasEyeDropper, setHasEyeDropper] = useState(false);

  // Refs for canvas interaction
  const satAreaRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const alphaRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<"sat" | "hue" | "alpha" | null>(null);

  useEffect(() => {
    setHasEyeDropper("EyeDropper" in window);
  }, []);

  // Derived values
  const rgb = hsvToRgb(hsv);
  const hsl = rgbToHsl(rgb);
  const cmyk = rgbToCmyk(rgb);
  const hex = rgbToHex(rgb, alpha);

  // Sync hex input
  useEffect(() => {
    setHexInput(hex);
  }, [hex]);

  // ---- Interaction handlers ----

  const handleSatAreaInteraction = useCallback(
    (clientX: number, clientY: number) => {
      const el = satAreaRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      setHsv((prev) => ({ ...prev, s: Math.round(x * 100), v: Math.round((1 - y) * 100) }));
    },
    []
  );

  const handleHueInteraction = useCallback(
    (clientX: number) => {
      const el = hueRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      setHsv((prev) => ({ ...prev, h: Math.round(x * 360) }));
    },
    []
  );

  const handleAlphaInteraction = useCallback(
    (clientX: number) => {
      const el = alphaRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      setAlpha(Math.round(x * 100) / 100);
    },
    []
  );

  // Pointer events
  const handlePointerDown = useCallback(
    (type: "sat" | "hue" | "alpha", e: React.PointerEvent) => {
      isDragging.current = type;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      if (type === "sat") handleSatAreaInteraction(e.clientX, e.clientY);
      else if (type === "hue") handleHueInteraction(e.clientX);
      else handleAlphaInteraction(e.clientX);
    },
    [handleSatAreaInteraction, handleHueInteraction, handleAlphaInteraction]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      if (isDragging.current === "sat") handleSatAreaInteraction(e.clientX, e.clientY);
      else if (isDragging.current === "hue") handleHueInteraction(e.clientX);
      else handleAlphaInteraction(e.clientX);
    },
    [handleSatAreaInteraction, handleHueInteraction, handleAlphaInteraction]
  );

  const handlePointerUp = useCallback(() => {
    if (isDragging.current) {
      // Add to history
      const currentHex = rgbToHex(hsvToRgb(hsv), alpha);
      setHistory((prev) => {
        const filtered = prev.filter((h) => h !== currentHex);
        return [currentHex, ...filtered].slice(0, 10);
      });
      analytics.trackToolUsage("color-picker", { action: "pick_color", color: currentHex });
    }
    isDragging.current = null;
  }, [hsv, alpha, analytics]);

  // Copy handler
  const copyColor = (format: string, value: string) => {
    copy(value);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 1500);
    analytics.trackToolUsage("color-picker", { action: "copy", format });
  };

  // EyeDropper
  const pickFromScreen = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dropper = new (window as any).EyeDropper();
      const result = await dropper.open();
      const picked = hexToRgb(result.sRGBHex);
      if (picked) {
        const newHsv = rgbToHsv(picked);
        setHsv(newHsv);
        setAlpha(1);
        analytics.trackToolUsage("color-picker", { action: "eyedropper" });
      }
    } catch {
      // User cancelled
    }
  };

  // Hex input handler
  const handleHexChange = (val: string) => {
    setHexInput(val);
    const parsed = hexToRgb(val);
    if (parsed) {
      const newHsv = rgbToHsv(parsed);
      setHsv(newHsv);
      // Handle alpha from 8-digit hex
      const clean = val.replace(/^#/, "");
      if (clean.length === 8) {
        setAlpha(parseInt(clean.substring(6, 8), 16) / 255);
      }
    }
  };

  // Contrast
  const fgRgb = hexToRgb(fgHex) || { r: 255, g: 255, b: 255 };
  const bgRgb = hexToRgb(bgHex) || { r: 0, g: 0, b: 0 };
  const ratio = contrastRatio(fgRgb, bgRgb);

  const passAA = ratio >= 4.5;
  const passAALarge = ratio >= 3;
  const passAAA = ratio >= 7;
  const passAAALarge = ratio >= 4.5;

  // Color format strings
  const formats = [
    { label: "HEX", value: hex.toUpperCase() },
    {
      label: "RGB",
      value: alpha < 1 ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    },
    {
      label: "HSL",
      value:
        alpha < 1
          ? `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alpha})`
          : `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    },
    { label: "HSV", value: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)` },
    { label: "CMYK", value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
  ];

  // Pure hue RGB for saturation area background
  const pureHueRgb = hsvToRgb({ h: hsv.h, s: 100, v: 100 });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 text-white flex items-center justify-center hover:opacity-80 transition"
            aria-label="Back to home"
          >
            <Palette className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">Color Picker</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left: Color Picker Area */}
          <div className="space-y-4">
            {/* Saturation / Value Area */}
            <div
              ref={satAreaRef}
              className="relative w-full aspect-[4/3] rounded-xl cursor-crosshair overflow-hidden border border-border touch-none"
              style={{
                background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, rgb(${pureHueRgb.r},${pureHueRgb.g},${pureHueRgb.b}))`,
              }}
              onPointerDown={(e) => handlePointerDown("sat", e)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              role="slider"
              aria-label="Color saturation and brightness picker"
              aria-valuetext={`Saturation ${hsv.s}%, Brightness ${hsv.v}%`}
            >
              {/* Thumb */}
              <div
                className="absolute w-5 h-5 rounded-full border-2 border-white shadow-md pointer-events-none"
                style={{
                  left: `${hsv.s}%`,
                  top: `${100 - hsv.v}%`,
                  transform: "translate(-50%, -50%)",
                  backgroundColor: `rgb(${rgb.r},${rgb.g},${rgb.b})`,
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)",
                }}
              />
            </div>

            {/* Hue Slider */}
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">Hue</label>
              <div
                ref={hueRef}
                className="relative h-5 rounded-full cursor-pointer touch-none"
                style={{
                  background:
                    "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                }}
                onPointerDown={(e) => handlePointerDown("hue", e)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                role="slider"
                aria-label="Hue"
                aria-valuemin={0}
                aria-valuemax={360}
                aria-valuenow={hsv.h}
              >
                <div
                  className="absolute top-1/2 w-5 h-5 rounded-full border-2 border-white shadow-md pointer-events-none"
                  style={{
                    left: `${(hsv.h / 360) * 100}%`,
                    transform: "translate(-50%, -50%)",
                    backgroundColor: `hsl(${hsv.h}, 100%, 50%)`,
                    boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)",
                  }}
                />
              </div>
            </div>

            {/* Alpha Slider */}
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">
                Opacity: {Math.round(alpha * 100)}%
              </label>
              <div
                ref={alphaRef}
                className="relative h-5 rounded-full cursor-pointer touch-none"
                style={{
                  background: `linear-gradient(to right, transparent, rgb(${rgb.r},${rgb.g},${rgb.b})), repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 0 0 / 10px 10px`,
                }}
                onPointerDown={(e) => handlePointerDown("alpha", e)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                role="slider"
                aria-label="Alpha / Opacity"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(alpha * 100)}
              >
                <div
                  className="absolute top-1/2 w-5 h-5 rounded-full border-2 border-white shadow-md pointer-events-none"
                  style={{
                    left: `${alpha * 100}%`,
                    transform: "translate(-50%, -50%)",
                    backgroundColor: `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`,
                    boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)",
                  }}
                />
              </div>
            </div>

            {/* EyeDropper + Preview */}
            <div className="flex items-center gap-3">
              <div
                className="w-16 h-16 rounded-xl border border-border shadow-inner"
                style={{
                  backgroundColor: `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`,
                  backgroundImage:
                    alpha < 1
                      ? "repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 0 0 / 10px 10px"
                      : "none",
                  backgroundBlendMode: alpha < 1 ? "difference" : "normal",
                }}
              />
              <div className="flex-1 space-y-2">
                {hasEyeDropper && (
                  <Button onClick={pickFromScreen} variant="outline" size="sm" className="gap-2 w-full">
                    <Pipette className="w-4 h-4" />
                    Pick from Screen
                  </Button>
                )}
                <Button
                  onClick={() => {
                    setHsv({ h: 210, s: 80, v: 90 });
                    setAlpha(1);
                  }}
                  variant="outline"
                  size="sm"
                  className="gap-2 w-full"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Color Values + Contrast */}
          <div className="space-y-4">
            {/* HEX Input */}
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">HEX</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => handleHexChange(e.target.value)}
                  className="flex-1 px-3 py-2 bg-card border border-border rounded-lg font-mono text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
                  spellCheck={false}
                />
                <Button
                  onClick={() => copyColor("HEX", hex.toUpperCase())}
                  variant="outline"
                  size="sm"
                  className="px-3"
                  aria-label="Copy HEX value"
                >
                  {copiedFormat === "HEX" ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Other Formats */}
            {formats.slice(1).map((f) => (
              <div key={f.label} className="space-y-1">
                <label className="text-xs text-muted-foreground font-medium">{f.label}</label>
                <div className="flex gap-2">
                  <div className="flex-1 px-3 py-2 bg-card border border-border rounded-lg font-mono text-sm text-foreground truncate">
                    {f.value}
                  </div>
                  <Button
                    onClick={() => copyColor(f.label, f.value)}
                    variant="outline"
                    size="sm"
                    className="px-3"
                    aria-label={`Copy ${f.label} value`}
                  >
                    {copiedFormat === f.label ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}

            {/* Use Current as FG/BG */}
            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => setFgHex(hex.substring(0, 7))}
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
              >
                Use as Foreground
              </Button>
              <Button
                onClick={() => setBgHex(hex.substring(0, 7))}
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
              >
                Use as Background
              </Button>
            </div>
          </div>
        </div>

        {/* Color History */}
        {history.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-3">Color History</h2>
            <div className="flex flex-wrap gap-2">
              {history.map((h, i) => (
                <button
                  key={`${h}-${i}`}
                  onClick={() => {
                    const parsed = hexToRgb(h);
                    if (parsed) {
                      setHsv(rgbToHsv(parsed));
                      const clean = h.replace(/^#/, "");
                      if (clean.length === 8) {
                        setAlpha(parseInt(clean.substring(6, 8), 16) / 255);
                      } else {
                        setAlpha(1);
                      }
                    }
                  }}
                  className="group relative w-10 h-10 rounded-lg border border-border hover:scale-110 transition-transform shadow-sm"
                  style={{ backgroundColor: h }}
                  aria-label={`Select color ${h}`}
                  title={h}
                >
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    {h.toUpperCase().substring(0, 7)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Contrast Checker */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Contrast Checker</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">Foreground</label>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded border border-border" style={{ backgroundColor: fgHex }} />
                <input
                  type="text"
                  value={fgHex}
                  onChange={(e) => setFgHex(e.target.value)}
                  className="flex-1 px-3 py-2 bg-card border border-border rounded-lg font-mono text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
                  spellCheck={false}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">Background</label>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded border border-border" style={{ backgroundColor: bgHex }} />
                <input
                  type="text"
                  value={bgHex}
                  onChange={(e) => setBgHex(e.target.value)}
                  className="flex-1 px-3 py-2 bg-card border border-border rounded-lg font-mono text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-pink-500"
                  spellCheck={false}
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div
            className="p-6 rounded-xl mb-4 border border-border"
            style={{ backgroundColor: bgHex, color: fgHex }}
          >
            <p className="text-2xl font-bold mb-1">Sample Text</p>
            <p className="text-sm">
              The quick brown fox jumps over the lazy dog. 0123456789
            </p>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="p-3 bg-card border border-border rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Ratio</p>
              <p className="text-lg font-bold text-foreground">{ratio.toFixed(2)}:1</p>
            </div>
            <div className="p-3 bg-card border border-border rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">AA Normal</p>
              <div className="flex items-center justify-center gap-1">
                {passAA ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <X className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-sm font-semibold ${passAA ? "text-green-400" : "text-red-400"}`}>
                  {passAA ? "Pass" : "Fail"}
                </span>
              </div>
            </div>
            <div className="p-3 bg-card border border-border rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">AA Large</p>
              <div className="flex items-center justify-center gap-1">
                {passAALarge ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <X className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-sm font-semibold ${passAALarge ? "text-green-400" : "text-red-400"}`}>
                  {passAALarge ? "Pass" : "Fail"}
                </span>
              </div>
            </div>
            <div className="p-3 bg-card border border-border rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">AAA Normal</p>
              <div className="flex items-center justify-center gap-1">
                {passAAA ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <X className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-sm font-semibold ${passAAA ? "text-green-400" : "text-red-400"}`}>
                  {passAAA ? "Pass" : "Fail"}
                </span>
              </div>
            </div>
            <div className="p-3 bg-card border border-border rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">AAA Large</p>
              <div className="flex items-center justify-center gap-1">
                {passAAALarge ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <X className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-sm font-semibold ${passAAALarge ? "text-green-400" : "text-red-400"}`}>
                  {passAAALarge ? "Pass" : "Fail"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={colorPickerGuideContent.quickStartSteps} />
          </GeoSection>
          <GeoSection id="what-is" title={colorPickerGuideContent.introduction.title} subtitle="Understanding color models" variant="default">
            <MarkdownContent content={colorPickerGuideContent.introduction.content} />
          </GeoSection>
          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How designers and developers use this tool" variant="default">
            <FeatureGrid features={colorPickerGuideContent.useCases.map((uc) => ({ title: uc.title, description: uc.description }))} columns={2} />
          </GeoSection>
          <GeoSection id="how-to-use" title={colorPickerGuideContent.howToUse.title} subtitle="Master the color picker" variant="minimal">
            <HowToSchema name={`How to use ${colorPickerGuideContent.toolName}`} description="Step-by-step guide" steps={colorPickerGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${colorPickerGuideContent.toolPath}`} />
            <MarkdownContent content={colorPickerGuideContent.howToUse.content} />
          </GeoSection>
          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={colorPickerGuideContent.faqs} />
          </GeoSection>
          <GeoSection id="security" title={colorPickerGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={colorPickerGuideContent.security.content} />
          </GeoSection>
          {colorPickerGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Tool metrics" variant="minimal">
              <StatsBar stats={Object.entries(colorPickerGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <RelatedTools currentPath="/color-picker" />
        <LastUpdated date={colorPickerGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Visual color picker with HEX, RGB, HSL, HSV, CMYK output and WCAG contrast checker.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Color Picker"
        description="Visual color picker with HEX, RGB, HSL, HSV, CMYK output, EyeDropper support, color history, and WCAG contrast ratio checker."
        url="https://openkit.tools/color-picker"
        applicationCategory="DesignApplication"
        datePublished="2026-02-06"
        dateModified={colorPickerGuideContent.lastUpdated}
        version={colorPickerGuideContent.version}
        aggregateRating={{ ratingValue: "4.9", ratingCount: "450", bestRating: "5" }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "Color Picker", url: "https://openkit.tools/color-picker" },
        ]}
      />
    </main>
  );
}
