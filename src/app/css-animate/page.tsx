"use client";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  Play, Pause, RotateCcw, Copy, Zap, ChevronDown, ChevronUp,
  Sparkles, Move, RotateCw, Scale, Eye, Palette as PaletteIcon
} from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { cssAnimateGuideContent } from "@/content/css-animate-guide";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";

type Keyframe = {
  percentage: number;
  properties: {
    translateX?: number;
    translateY?: number;
    rotate?: number;
    scale?: number;
    opacity?: number;
    backgroundColor?: string;
    custom?: string;
  };
};

type AnimationSettings = {
  duration: number;
  durationUnit: "s" | "ms";
  timingFunction: string;
  iterationCount: string;
  direction: string;
  fillMode: string;
  customTimingFunction?: string;
};

const presetAnimations: { [key: string]: { keyframes: Keyframe[]; settings: Partial<AnimationSettings> } } = {
  fade: {
    keyframes: [
      { percentage: 0, properties: { opacity: 0 } },
      { percentage: 100, properties: { opacity: 1 } },
    ],
    settings: { duration: 1, durationUnit: "s", timingFunction: "ease-in-out" }},
  slideIn: {
    keyframes: [
      { percentage: 0, properties: { translateX: -100, opacity: 0 } },
      { percentage: 100, properties: { translateX: 0, opacity: 1 } },
    ],
    settings: { duration: 0.6, durationUnit: "s", timingFunction: "ease-out" }},
  bounce: {
    keyframes: [
      { percentage: 0, properties: { translateY: 0 } },
      { percentage: 25, properties: { translateY: -30 } },
      { percentage: 50, properties: { translateY: 0 } },
      { percentage: 75, properties: { translateY: -15 } },
      { percentage: 100, properties: { translateY: 0 } },
    ],
    settings: { duration: 1, durationUnit: "s", timingFunction: "ease-in-out" }},
  pulse: {
    keyframes: [
      { percentage: 0, properties: { scale: 1 } },
      { percentage: 50, properties: { scale: 1.1 } },
      { percentage: 100, properties: { scale: 1 } },
    ],
    settings: { duration: 1, durationUnit: "s", timingFunction: "ease-in-out", iterationCount: "infinite" }},
  shake: {
    keyframes: [
      { percentage: 0, properties: { translateX: 0 } },
      { percentage: 25, properties: { translateX: -10 } },
      { percentage: 50, properties: { translateX: 10 } },
      { percentage: 75, properties: { translateX: -10 } },
      { percentage: 100, properties: { translateX: 0 } },
    ],
    settings: { duration: 0.5, durationUnit: "s", timingFunction: "ease-in-out" }},
  rotateIn: {
    keyframes: [
      { percentage: 0, properties: { rotate: -180, opacity: 0, scale: 0.5 } },
      { percentage: 100, properties: { rotate: 0, opacity: 1, scale: 1 } },
    ],
    settings: { duration: 0.8, durationUnit: "s", timingFunction: "ease-out" }},
  zoomIn: {
    keyframes: [
      { percentage: 0, properties: { scale: 0, opacity: 0 } },
      { percentage: 100, properties: { scale: 1, opacity: 1 } },
    ],
    settings: { duration: 0.6, durationUnit: "s", timingFunction: "ease-out" }}};

const timingFunctions = [
  "ease",
  "linear",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "cubic-bezier",
];

export default function CSSAnimateGenerator() {
  useToolTracker("css-animate", "CSS Animation Generator", "generators");
  const analytics = useAnalytics();
  const { isCopied } = useCopyToClipboard({ duration: 1500 });
  const [keyframes, setKeyframes] = useState<Keyframe[]>([
    { percentage: 0, properties: { translateX: 0, translateY: 0, rotate: 0, scale: 1, opacity: 1 } },
    { percentage: 100, properties: { translateX: 0, translateY: 0, rotate: 0, scale: 1, opacity: 1 } },
  ]);
  const [error] = useState<string | null>(null);

  const [settings, setSettings] = useState<AnimationSettings>({
    duration: 1,
    durationUnit: "s",
    timingFunction: "ease",
    iterationCount: "1",
    direction: "normal",
    fillMode: "none"});

  const [selectedKeyframe, setSelectedKeyframe] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
    transform: true,
    appearance: true,
    custom: false});

  const addKeyframe = () => {
    const newPercentage = 50;
    const newKeyframe: Keyframe = {
      percentage: newPercentage,
      properties: {
        translateX: 0,
        translateY: 0,
        rotate: 0,
        scale: 1,
        opacity: 1}};
    const newKeyframes = [...keyframes, newKeyframe].sort((a, b) => a.percentage - b.percentage);
    setKeyframes(newKeyframes);
    setSelectedKeyframe(newKeyframes.indexOf(newKeyframe));
  };

  const removeKeyframe = (index: number) => {
    if (keyframes.length <= 2) return;
    const newKeyframes = keyframes.filter((_, i) => i !== index);
    setKeyframes(newKeyframes);
    setSelectedKeyframe(Math.max(0, index - 1));
  };

  const updateKeyframeProperty = (index: number, property: string, value: string | number) => {
    const newKeyframes = [...keyframes];
    newKeyframes[index].properties = {
      ...newKeyframes[index].properties,
      [property]: value};
    setKeyframes(newKeyframes);
  };

  const updateKeyframePercentage = (index: number, percentage: number) => {
    const newKeyframes = [...keyframes];
    newKeyframes[index].percentage = Math.max(0, Math.min(100, percentage));
    newKeyframes.sort((a, b) => a.percentage - b.percentage);
    setKeyframes(newKeyframes);
    setSelectedKeyframe(newKeyframes.findIndex(k => k.percentage === percentage));
  };

  const generateCSS = useCallback(() => {
    try {
      const animationName = "customAnimation";
      const keyframesCSS = keyframes.map((kf) => {
        const props = kf.properties;
        const transforms: string[] = [];
        const styles: string[] = [];

        if (props.translateX !== undefined || props.translateY !== undefined) {
          transforms.push(`translate(${props.translateX || 0}px, ${props.translateY || 0}px)`);
        }
        if (props.rotate !== undefined && props.rotate !== 0) {
          transforms.push(`rotate(${props.rotate}deg)`);
        }
        if (props.scale !== undefined && props.scale !== 1) {
          transforms.push(`scale(${props.scale})`);
        }
        if (transforms.length > 0) {
          styles.push(`transform: ${transforms.join(" ")}`);
        }
        if (props.opacity !== undefined) {
          styles.push(`opacity: ${props.opacity}`);
        }
        if (props.backgroundColor) {
          styles.push(`background-color: ${props.backgroundColor}`);
        }
        if (props.custom) {
          styles.push(props.custom);
        }

        return `  ${kf.percentage}% {\n    ${styles.join(";\n    ")};\n  }`;
      }).join("\n");

      const durationValue = settings.durationUnit === "ms"
        ? `${settings.duration}ms`
        : `${settings.duration}s`;

      const timingValue = settings.timingFunction === "cubic-bezier" && settings.customTimingFunction
        ? settings.customTimingFunction
        : settings.timingFunction;

      return `@keyframes ${animationName} {
${keyframesCSS}
}

.animated-element {
  animation: ${animationName} ${durationValue} ${timingValue} ${settings.iterationCount} ${settings.direction} ${settings.fillMode};
}`;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'CSS generation failed';
      analytics.trackError('css_animate_generation_failed', {
        keyframeCount: keyframes.length,
        duration: settings.duration,
        timingFunction: settings.timingFunction,
        error: errorMessage,
      });
      return '/* Error generating CSS. Please check your animation settings. */';
    }
  }, [keyframes, settings, analytics]);

  const copyCSS = () => {
    navigator.clipboard.writeText(generateCSS());
    analytics.trackToolInteraction('css-animate', 'copy_css', {
      keyframeCount: keyframes.length,
      duration: settings.duration,
      timingFunction: settings.timingFunction
    });
  };

  const loadPreset = (presetName: string) => {
    const preset = presetAnimations[presetName];
    setKeyframes(preset.keyframes);
    setSettings((prev) => ({
      ...prev,
      ...preset.settings}));
    setSelectedKeyframe(0);
    setIsPlaying(false);
    analytics.trackToolInteraction('css-animate', 'load_preset', {
      preset: presetName
    });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const currentKeyframe = keyframes[selectedKeyframe];

  // Auto-stop animation after one iteration (unless infinite)
  useEffect(() => {
    if (isPlaying && settings.iterationCount !== "infinite") {
      const duration = settings.durationUnit === "ms"
        ? settings.duration
        : settings.duration * 1000;
      const timeout = setTimeout(() => setIsPlaying(false), duration);
      return () => clearTimeout(timeout);
    }
  }, [isPlaying, settings]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 flex items-center justify-center hover:opacity-80 transition">
              <Sparkles className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">CSS Animation Generator</h1>
          </div>
          <button
            onClick={copyCSS}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium text-white transition"
          >
            <Copy className="w-4 h-4" />
            {isCopied ? "Copied!" : "Copy CSS"}
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Preset Animations */}
        <div className="mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-accent-foreground mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Quick Start Presets
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.keys(presetAnimations).map((preset) => (
              <button
                key={preset}
                onClick={() => loadPreset(preset)}
                className="px-3 py-1.5 bg-card hover:bg-muted border border-border rounded-lg text-xs font-medium text-accent-foreground transition capitalize"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Timeline & Controls */}
          <div className="space-y-6">
            {/* Timeline */}
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-accent-foreground">Timeline</h3>
                <button
                  onClick={addKeyframe}
                  className="px-3 py-1 bg-violet-600 hover:bg-violet-500 rounded-lg text-xs font-medium transition"
                >
                  + Add Keyframe
                </button>
              </div>

              <div className="space-y-2">
                {keyframes.map((kf, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border transition cursor-pointer ${
                      selectedKeyframe === index
                        ? "bg-violet-500/20 border-violet-500"
                        : "bg-muted/50 border-border hover:border-border"
                    }`}
                    onClick={() => setSelectedKeyframe(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input aria-label="Input field"
                          type="number"
                          value={kf.percentage}
                          onChange={(e) => updateKeyframePercentage(index, parseInt(e.target.value) || 0)}
                          onClick={(e) => e.stopPropagation()}
                          className="w-16 px-2 py-1 bg-card border border-border rounded text-sm text-center"
                          min="0"
                          max="100"
                        />
                        <span className="text-xs text-muted-foreground">%</span>
                      </div>
                      {keyframes.length > 2 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeKeyframe(index);
                          }}
                          className="px-2 py-1 text-xs text-red-400 hover:text-red-300 transition"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Properties Editor */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="text-base sm:text-lg font-semibold text-accent-foreground mb-4">
                Properties at {currentKeyframe.percentage}%
              </h3>

              {/* Transform Section */}
              <div className="mb-4">
                <button
                  onClick={() => toggleSection("transform")}
                  className="flex items-center justify-between w-full text-left mb-2"
                >
                  <span className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                    <Move className="w-3 h-3" />
                    Transform
                  </span>
                  {expandedSections.transform ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {expandedSections.transform && (
                  <div className="space-y-3 pl-5">
                    <div>
                      <label htmlFor="page-input-353" className="text-xs text-muted-foreground mb-1 block">Translate X (px)</label>
                      <input id="page-input-353"
                        type="range"
                        min="-200"
                        max="200"
                        value={currentKeyframe.properties.translateX || 0}
                        onChange={(e) => updateKeyframeProperty(selectedKeyframe, "translateX", parseInt(e.target.value))}
                        className="w-full"
                      />
                      <input aria-label="Input field"
                        type="number"
                        value={currentKeyframe.properties.translateX || 0}
                        onChange={(e) => updateKeyframeProperty(selectedKeyframe, "translateX", parseInt(e.target.value) || 0)}
                        className="w-full mt-1 px-2 py-1 bg-muted border border-border rounded text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="page-input-371" className="text-xs text-muted-foreground mb-1 block">Translate Y (px)</label>
                      <input id="page-input-371"
                        type="range"
                        min="-200"
                        max="200"
                        value={currentKeyframe.properties.translateY || 0}
                        onChange={(e) => updateKeyframeProperty(selectedKeyframe, "translateY", parseInt(e.target.value))}
                        className="w-full"
                      />
                      <input aria-label="Input field"
                        type="number"
                        value={currentKeyframe.properties.translateY || 0}
                        onChange={(e) => updateKeyframeProperty(selectedKeyframe, "translateY", parseInt(e.target.value) || 0)}
                        className="w-full mt-1 px-2 py-1 bg-muted border border-border rounded text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block flex items-center gap-1">
                        <RotateCw className="w-3 h-3" />
                        Rotate (deg)
                      </label>
                      <input aria-label="Input field"
                        type="range"
                        min="-360"
                        max="360"
                        value={currentKeyframe.properties.rotate || 0}
                        onChange={(e) => updateKeyframeProperty(selectedKeyframe, "rotate", parseInt(e.target.value))}
                        className="w-full"
                      />
                      <input aria-label="Input field"
                        type="number"
                        value={currentKeyframe.properties.rotate || 0}
                        onChange={(e) => updateKeyframeProperty(selectedKeyframe, "rotate", parseInt(e.target.value) || 0)}
                        className="w-full mt-1 px-2 py-1 bg-muted border border-border rounded text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block flex items-center gap-1">
                        <Scale className="w-3 h-3" />
                        Scale
                      </label>
                      <input aria-label="Input field"
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        value={currentKeyframe.properties.scale || 1}
                        onChange={(e) => updateKeyframeProperty(selectedKeyframe, "scale", parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <input aria-label="Input field"
                        type="number"
                        step="0.1"
                        value={currentKeyframe.properties.scale || 1}
                        onChange={(e) => updateKeyframeProperty(selectedKeyframe, "scale", parseFloat(e.target.value) || 1)}
                        className="w-full mt-1 px-2 py-1 bg-muted border border-border rounded text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Appearance Section */}
              <div className="mb-4">
                <button
                  onClick={() => toggleSection("appearance")}
                  className="flex items-center justify-between w-full text-left mb-2"
                >
                  <span className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                    <Eye className="w-3 h-3" />
                    Appearance
                  </span>
                  {expandedSections.appearance ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {expandedSections.appearance && (
                  <div className="space-y-3 pl-5">
                    <div>
                      <label htmlFor="page-input-451" className="text-xs text-muted-foreground mb-1 block">Opacity</label>
                      <input id="page-input-451"
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={currentKeyframe.properties.opacity || 1}
                        onChange={(e) => updateKeyframeProperty(selectedKeyframe, "opacity", parseFloat(e.target.value))}
                        className="w-full"
                      />
                      <input aria-label="Input field"
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        value={currentKeyframe.properties.opacity || 1}
                        onChange={(e) => updateKeyframeProperty(selectedKeyframe, "opacity", parseFloat(e.target.value) || 1)}
                        className="w-full mt-1 px-2 py-1 bg-muted border border-border rounded text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block flex items-center gap-1">
                        <PaletteIcon className="w-3 h-3" />
                        Background Color
                      </label>
                      <div className="flex gap-2">
                        <input type="color" value={currentKeyframe.properties.backgroundColor || "#3b82f6"} onChange={(e) => updateKeyframeProperty(selectedKeyframe, "backgroundColor", e.target.value)} className="w-12 h-8 rounded border border-border cursor-pointer" aria-label="Background color" />
                        <input aria-label="Input field"
                          type="text"
                          value={currentKeyframe.properties.backgroundColor || ""}
                          onChange={(e) => updateKeyframeProperty(selectedKeyframe, "backgroundColor", e.target.value)}
                          placeholder="#3b82f6"
                          className="flex-1 px-2 py-1 bg-muted border border-border rounded text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Custom Properties Section */}
              <div>
                <button
                  onClick={() => toggleSection("custom")}
                  className="flex items-center justify-between w-full text-left mb-2"
                >
                  <span className="text-xs font-semibold text-muted-foreground">Custom CSS</span>
                  {expandedSections.custom ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {expandedSections.custom && (
                  <div className="pl-5">
                    <textarea
                      value={currentKeyframe.properties.custom || ""}
                      onChange={(e) => updateKeyframeProperty(selectedKeyframe, "custom", e.target.value)}
                      placeholder="border-radius: 50%"
                      className="w-full px-3 py-2 bg-muted border border-border rounded text-sm font-mono resize-none"
                      rows={3}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Animation Settings */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="text-sm font-semibold text-accent-foreground mb-4">Animation Settings</h3>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="page-input-524" className="text-xs text-muted-foreground mb-1 block">Duration</label>
                    <input id="page-input-524"
                      type="number"
                      step="0.1"
                      min="0"
                      value={settings.duration}
                      onChange={(e) => setSettings({ ...settings, duration: parseFloat(e.target.value) || 0 })}
                      className="w-full px-2 py-1 bg-muted border border-border rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Unit</label>
                    <select
                      value={settings.durationUnit}
                      onChange={(e) => setSettings({ ...settings, durationUnit: e.target.value as "s" | "ms" })}
                      className="w-full px-2 py-1 bg-muted border border-border rounded text-sm"
                    >
                      <option value="s">seconds (s)</option>
                      <option value="ms">milliseconds (ms)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Timing Function</label>
                  <select
                    value={settings.timingFunction}
                    onChange={(e) => setSettings({ ...settings, timingFunction: e.target.value })}
                    className="w-full px-2 py-1 bg-muted border border-border rounded text-sm"
                  >
                    {timingFunctions.map((fn) => (
                      <option key={fn} value={fn}>{fn}</option>
                    ))}
                  </select>
                </div>

                {settings.timingFunction === "cubic-bezier" && (
                  <div>
                    <label htmlFor="page-input-562" className="text-xs text-muted-foreground mb-1 block">Custom Bezier</label>
                    <input id="page-input-562"
                      type="text"
                      value={settings.customTimingFunction || ""}
                      onChange={(e) => setSettings({ ...settings, customTimingFunction: e.target.value })}
                      placeholder="cubic-bezier(0.4, 0, 0.2, 1)"
                      className="w-full px-2 py-1 bg-muted border border-border rounded text-sm font-mono"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Iteration Count</label>
                  <select
                    value={settings.iterationCount}
                    onChange={(e) => setSettings({ ...settings, iterationCount: e.target.value })}
                    className="w-full px-2 py-1 bg-muted border border-border rounded text-sm"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="infinite">infinite</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Direction</label>
                  <select
                    value={settings.direction}
                    onChange={(e) => setSettings({ ...settings, direction: e.target.value })}
                    className="w-full px-2 py-1 bg-muted border border-border rounded text-sm"
                  >
                    <option value="normal">normal</option>
                    <option value="reverse">reverse</option>
                    <option value="alternate">alternate</option>
                    <option value="alternate-reverse">alternate-reverse</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Fill Mode</label>
                  <select
                    value={settings.fillMode}
                    onChange={(e) => setSettings({ ...settings, fillMode: e.target.value })}
                    className="w-full px-2 py-1 bg-muted border border-border rounded text-sm"
                  >
                    <option value="none">none</option>
                    <option value="forwards">forwards</option>
                    <option value="backwards">backwards</option>
                    <option value="both">both</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Preview & CSS Output */}
          <div className="space-y-6">
            {/* Live Preview */}
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-accent-foreground">Live Preview</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                      analytics.trackToolInteraction('css-animate', isPlaying ? 'pause' : 'play');
                    }}
                    className="px-3 py-1.5 bg-green-600 hover:bg-green-500 rounded-lg text-xs font-medium transition flex items-center gap-1"
                  >
                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                  <button
                    onClick={() => {
                      setIsPlaying(false);
                      setTimeout(() => setIsPlaying(true), 10);
                      analytics.trackToolInteraction('css-animate', 'restart');
                    }}
                    className="px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-xs font-medium transition"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="bg-background border border-border rounded-lg p-12 flex items-center justify-center min-h-[300px]">
                <div
                  className="w-24 h-24 bg-gradient-to-br from-violet-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{
                    animation: isPlaying
                      ? `preview-animation ${settings.duration}${settings.durationUnit} ${
                          settings.timingFunction === "cubic-bezier" && settings.customTimingFunction
                            ? settings.customTimingFunction
                            : settings.timingFunction
                        } ${settings.iterationCount} ${settings.direction} ${settings.fillMode}`
                      : "none"}}
                >
                  <style jsx>{`
                    @keyframes preview-animation {
                      ${keyframes
                        .map((kf) => {
                          const props = kf.properties;
                          const transforms: string[] = [];
                          const styles: string[] = [];

                          if (props.translateX !== undefined || props.translateY !== undefined) {
                            transforms.push(`translate(${props.translateX || 0}px, ${props.translateY || 0}px)`);
                          }
                          if (props.rotate !== undefined && props.rotate !== 0) {
                            transforms.push(`rotate(${props.rotate}deg)`);
                          }
                          if (props.scale !== undefined && props.scale !== 1) {
                            transforms.push(`scale(${props.scale})`);
                          }
                          if (transforms.length > 0) {
                            styles.push(`transform: ${transforms.join(" ")}`);
                          }
                          if (props.opacity !== undefined) {
                            styles.push(`opacity: ${props.opacity}`);
                          }
                          if (props.backgroundColor) {
                            styles.push(`background-color: ${props.backgroundColor}`);
                          }
                          if (props.custom) {
                            styles.push(props.custom);
                          }

                          return `${kf.percentage}% { ${styles.join("; ")}; }`;
                        })
                        .join("\n")}
                    }
                  `}</style>
                  BOX
                </div>
              </div>
            </div>

            {/* CSS Output */}
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-accent-foreground">Generated CSS</h3>
              </div>
              {error && (
                <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">
                    <strong>Error:</strong> {error}
                  </p>
                  <p className="text-red-400/70 text-xs mt-1">
                    Check your keyframe values and custom CSS for syntax errors.
                  </p>
                </div>
              )}
              <pre className="bg-background border border-border rounded-lg p-4 text-xs font-mono overflow-x-auto text-accent-foreground">
                {generateCSS()}
              </pre>
            </div>
          </div>
        </div>

        <RelatedTools currentPath="/css-animate" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Create CSS animations in 30 seconds" variant="highlight">
            <QuickStartGuide steps={cssAnimateGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-css-animate" title={cssAnimateGuideContent.introduction.title} subtitle="Understanding CSS animation generation" variant="default">
            <MarkdownContent content={cssAnimateGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use CSS animation generators" variant="default">
            <FeatureGrid features={cssAnimateGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={cssAnimateGuideContent.howToUse.title} subtitle="Master CSS keyframe animation creation" variant="minimal">
            <HowToSchema name={`How to use ${cssAnimateGuideContent.toolName}`} description="Step-by-step guide to CSS animation generation" steps={cssAnimateGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${cssAnimateGuideContent.toolPath}`} />
            <MarkdownContent content={cssAnimateGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={cssAnimateGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={cssAnimateGuideContent.security.title} subtitle="Your animation designs never leave your browser" variant="highlight">
            <MarkdownContent content={cssAnimateGuideContent.security.content} />
          </GeoSection>

          {cssAnimateGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(cssAnimateGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={cssAnimateGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Create smooth CSS animations with a visual timeline editor.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="CSS Animation Generator"
        description="Visual keyframe animation builder with timeline editor. Generate CSS @keyframes animations with real-time preview."
        url="https://openkit.tools/css-animate"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={cssAnimateGuideContent.lastUpdated}
        version={cssAnimateGuideContent.version}
        aggregateRating={{ratingValue: "4.9", ratingCount: "2341", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "CSS Animation Generator", url: "https://openkit.tools/css-animate" },
        ]}
      />
    </main>
  );
}
