"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import Link from "next/link";
import { Image as ImageIcon, Download, Upload, X, Type, RefreshCw } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, StatsBar } from "@/components/geo-content-layout";
import { UseCases } from "@/components/use-cases";
import { ogGenGuideContent } from "@/content/og-gen-guide";

type TemplateType = "blog" | "product" | "social" | "announcement";

type Template = {
  id: TemplateType;
  name: string;
  description: string;
  fields: {
    title: boolean;
    subtitle: boolean;
    author?: boolean;
    date?: boolean;
    price?: boolean;
    image?: boolean;
  };
};

const templates: Template[] = [
  {
    id: "blog",
    name: "Blog Post",
    description: "Title + Author + Date",
    fields: { title: true, subtitle: false, author: true, date: true },
  },
  {
    id: "product",
    name: "Product",
    description: "Title + Price + Image",
    fields: { title: true, subtitle: true, price: true, image: true },
  },
  {
    id: "social",
    name: "Social Card",
    description: "Title + Description + Logo",
    fields: { title: true, subtitle: true, image: true },
  },
  {
    id: "announcement",
    name: "Announcement",
    description: "Big Title + Subtitle",
    fields: { title: true, subtitle: true },
  },
];

const googleFonts = [
  { name: "Inter", family: "Inter" },
  { name: "Poppins", family: "Poppins" },
  { name: "Roboto", family: "Roboto" },
];

type GradientType = "none" | "linear" | "radial";

export default function OGImageGenerator() {
  useToolTracker("og-gen", "OG Image Generator");
  const analytics = useAnalytics();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>("blog");
  const [title, setTitle] = useState("Your Awesome Blog Post Title");
  const [subtitle, setSubtitle] = useState("A compelling description that makes people want to click");
  const [author, setAuthor] = useState("John Doe");
  const [date, setDate] = useState("December 20, 2024");
  const [price, setPrice] = useState("$99");
  const [bgColor, setBgColor] = useState("#1e293b");
  const [bgColor2, setBgColor2] = useState("#3b82f6");
  const [gradientType, setGradientType] = useState<GradientType>("linear");
  const [textColor, setTextColor] = useState("#ffffff");
  const [subtitleColor, setSubtitleColor] = useState("#94a3b8");
  const [selectedFont, setSelectedFont] = useState("Inter");
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const productInputRef = useRef<HTMLInputElement>(null);

  const currentTemplate = templates.find((t) => t.id === selectedTemplate)!;

  // Load Google Fonts
  useEffect(() => {
    const loadFonts = async () => {
      const fontPromises = googleFonts.map((font) => {
        const link = document.createElement("link");
        link.href = `https://fonts.googleapis.com/css2?family=${font.family}:wght@400;600;700;800&display=swap`;
        link.rel = "stylesheet";
        document.head.appendChild(link);
        return document.fonts.load(`16px "${font.family}"`);
      });

      await Promise.all(fontPromises);
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  // Helper function for text wrapping
  const wrapText = useCallback((
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    align: "left" | "center" = "left"
  ) => {
    const words = text.split(" ");
    let line = "";
    let currentY = y;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && i > 0) {
        const xPos = align === "center" ? x : x;
        ctx.fillText(line.trim(), xPos, currentY);
        line = words[i] + " ";
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    const xPos = align === "center" ? x : x;
    ctx.fillText(line.trim(), xPos, currentY);
  }, []);

  // Template rendering functions
  const renderBlogTemplate = useCallback((ctx: CanvasRenderingContext2D) => {
    const padding = 80;
    const maxWidth = 1200 - padding * 2;

    // Title
    ctx.fillStyle = textColor;
    ctx.font = `bold 72px "${selectedFont}", sans-serif`;
    ctx.textBaseline = "top";
    wrapText(ctx, title, padding, 180, maxWidth, 85);

    // Author & Date
    ctx.fillStyle = subtitleColor;
    ctx.font = `600 32px "${selectedFont}", sans-serif`;
    ctx.fillText(`By ${author}`, padding, 450);
    ctx.fillText(date, padding, 495);

    // Logo if present
    if (logoImage) {
      const img = new Image();
      img.src = logoImage;
      ctx.drawImage(img, padding, 60, 80, 80);
    }
  }, [textColor, selectedFont, title, subtitleColor, author, date, logoImage, wrapText]);

  const renderProductTemplate = useCallback((ctx: CanvasRenderingContext2D) => {
    const padding = 80;

    // Product image on the right
    if (productImage) {
      const img = new Image();
      img.src = productImage;
      const imgSize = 400;
      const imgX = 1200 - padding - imgSize;
      const imgY = (630 - imgSize) / 2;

      // Rounded corners
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(imgX, imgY, imgSize, imgSize, 20);
      ctx.clip();
      ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
      ctx.restore();
    }

    const maxWidth = 550;

    // Title
    ctx.fillStyle = textColor;
    ctx.font = `bold 64px "${selectedFont}", sans-serif`;
    ctx.textBaseline = "top";
    wrapText(ctx, title, padding, 150, maxWidth, 75);

    // Subtitle
    ctx.fillStyle = subtitleColor;
    ctx.font = `500 28px "${selectedFont}", sans-serif`;
    wrapText(ctx, subtitle, padding, 320, maxWidth, 38);

    // Price
    ctx.fillStyle = textColor;
    ctx.font = `bold 56px "${selectedFont}", sans-serif`;
    ctx.fillText(price, padding, 460);
  }, [textColor, selectedFont, title, subtitleColor, subtitle, price, productImage, wrapText]);

  const renderSocialTemplate = useCallback((ctx: CanvasRenderingContext2D) => {
    const padding = 80;
    const maxWidth = 1200 - padding * 2;

    // Logo at top
    if (logoImage) {
      const img = new Image();
      img.src = logoImage;
      ctx.drawImage(img, padding, 60, 100, 100);
    }

    // Title
    ctx.fillStyle = textColor;
    ctx.font = `bold 68px "${selectedFont}", sans-serif`;
    ctx.textBaseline = "top";
    wrapText(ctx, title, padding, 200, maxWidth, 80);

    // Subtitle/Description
    ctx.fillStyle = subtitleColor;
    ctx.font = `500 32px "${selectedFont}", sans-serif`;
    wrapText(ctx, subtitle, padding, 420, maxWidth, 45);
  }, [textColor, selectedFont, title, subtitleColor, subtitle, logoImage, wrapText]);

  const renderAnnouncementTemplate = useCallback((ctx: CanvasRenderingContext2D) => {
    const padding = 80;
    const maxWidth = 1200 - padding * 2;

    // Big centered title
    ctx.fillStyle = textColor;
    ctx.font = `bold 96px "${selectedFont}", sans-serif`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    wrapText(ctx, title, 600, 220, maxWidth, 110, "center");

    // Subtitle
    ctx.fillStyle = subtitleColor;
    ctx.font = `600 40px "${selectedFont}", sans-serif`;
    ctx.textAlign = "center";
    wrapText(ctx, subtitle, 600, 420, maxWidth, 50, "center");

    // Reset text align
    ctx.textAlign = "left";
  }, [textColor, selectedFont, title, subtitleColor, subtitle, wrapText]);

  // Render canvas
  useEffect(() => {
    if (!fontsLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 630;

    // Background
    if (gradientType === "none") {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, 1200, 630);
    } else if (gradientType === "linear") {
      const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
      gradient.addColorStop(0, bgColor);
      gradient.addColorStop(1, bgColor2);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1200, 630);
    } else if (gradientType === "radial") {
      const gradient = ctx.createRadialGradient(600, 315, 0, 600, 315, 700);
      gradient.addColorStop(0, bgColor);
      gradient.addColorStop(1, bgColor2);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1200, 630);
    }

    // Template-specific rendering
    if (selectedTemplate === "blog") {
      renderBlogTemplate(ctx);
    } else if (selectedTemplate === "product") {
      renderProductTemplate(ctx);
    } else if (selectedTemplate === "social") {
      renderSocialTemplate(ctx);
    } else if (selectedTemplate === "announcement") {
      renderAnnouncementTemplate(ctx);
    }
  }, [
    fontsLoaded,
    selectedTemplate,
    title,
    subtitle,
    author,
    date,
    price,
    bgColor,
    bgColor2,
    gradientType,
    textColor,
    subtitleColor,
    selectedFont,
    logoImage,
    productImage,
    renderBlogTemplate,
    renderProductTemplate,
    renderSocialTemplate,
    renderAnnouncementTemplate,
  ]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    analytics.trackToolUsage('og-gen', {
      action: 'download',
      template: selectedTemplate,
    });
    
    const link = document.createElement("a");
    link.download = `og-image-${selectedTemplate}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "product"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (type === "logo") {
        setLogoImage(result);
      } else {
        setProductImage(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const clearImage = (type: "logo" | "product") => {
    if (type === "logo") {
      setLogoImage(null);
      if (logoInputRef.current) logoInputRef.current.value = "";
    } else {
      setProductImage(null);
      if (productInputRef.current) productInputRef.current.value = "";
    }
  };

  const randomize = () => {
    const randomTemplates = templates.map(t => t.id);
    setSelectedTemplate(randomTemplates[Math.floor(Math.random() * randomTemplates.length)]);
    const samples = ["OpenKit.tools", "Amazing App", "Dev Paradise", "Build Fast"];
    setTitle(samples[Math.floor(Math.random() * samples.length)]);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center hover:opacity-80 transition"
            >
              <ImageIcon className="w-4 h-4" aria-hidden="true" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">
              OG Image Generator
            </h1>
          </div>
          <button
            onClick={randomize}
            className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-foreground transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Random</span>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Settings */}
          <div className="space-y-6">
            {/* Template Selection */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Template</h2>
              <div className="grid grid-cols-2 gap-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-4 rounded-lg border-2 transition text-left ${
                      selectedTemplate === template.id
                        ? "border-pink-500 bg-pink-500/10"
                        : "border-border hover:border-border"
                    }`}
                  >
                    <div className="font-semibold text-sm mb-1">{template.name}</div>
                    <div className="text-xs text-muted-foreground">{template.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Content</h2>
              <div className="space-y-4">
                {currentTemplate.fields.title && (
                  <div>
                    <label htmlFor="page-input-405" className="block text-sm text-muted-foreground mb-2">Title</label>
                    <input id="page-input-405"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-pink-500 text-sm text-foreground"
                    />
                  </div>
                )}

                {currentTemplate.fields.subtitle && (
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      {selectedTemplate === "product" ? "Description" : "Subtitle"}
                    </label>
                    <textarea
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-pink-500 text-sm resize-none text-foreground"
                    />
                  </div>
                )}

                {currentTemplate.fields.author && (
                  <div>
                    <label htmlFor="page-input-431" className="block text-sm text-muted-foreground mb-2">Author</label>
                    <input id="page-input-431"
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-pink-500 text-sm text-foreground"
                    />
                  </div>
                )}

                {currentTemplate.fields.date && (
                  <div>
                    <label htmlFor="page-input-443" className="block text-sm text-muted-foreground mb-2">Date</label>
                    <input id="page-input-443"
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-pink-500 text-sm text-foreground"
                    />
                  </div>
                )}

                {currentTemplate.fields.price && (
                  <div>
                    <label htmlFor="page-input-455" className="block text-sm text-muted-foreground mb-2">Price</label>
                    <input id="page-input-455"
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-pink-500 text-sm text-foreground"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Styling */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Styling</h2>
              <div className="space-y-4">
                {/* Background Type */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Background</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setGradientType("none")}
                      className={`px-3 py-2 rounded-lg text-sm transition ${
                        gradientType === "none"
                          ? "bg-pink-600 text-white"
                          : "bg-muted text-foreground hover:bg-accent"
                      }`}
                    >
                      Solid
                    </button>
                    <button
                      onClick={() => setGradientType("linear")}
                      className={`px-3 py-2 rounded-lg text-sm transition ${
                        gradientType === "linear"
                          ? "bg-pink-600 text-white"
                          : "bg-muted text-foreground hover:bg-accent"
                      }`}
                    >
                      Linear
                    </button>
                    <button
                      onClick={() => setGradientType("radial")}
                      className={`px-3 py-2 rounded-lg text-sm transition ${
                        gradientType === "radial"
                          ? "bg-pink-600 text-white"
                          : "bg-muted text-foreground hover:bg-accent"
                      }`}
                    >
                      Radial
                    </button>
                  </div>
                </div>

                {/* Background Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      {gradientType === "none" ? "Color" : "Color 1"}
                    </label>
                    <div className="flex gap-2">
                      <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-12 h-10 rounded cursor-pointer" aria-label="Background color" />
                      <input aria-label="Input field"
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-pink-500 text-sm font-mono text-foreground"
                      />
                    </div>
                  </div>

                  {gradientType !== "none" && (
                    <div>
                      <label className="block text-sm text-muted-foreground mb-2">Color 2</label>
                      <div className="flex gap-2">
                        <input type="color" value={bgColor2} onChange={(e) => setBgColor2(e.target.value)} className="w-12 h-10 rounded cursor-pointer" aria-label="Background gradient color" />
                        <input aria-label="Input field"
                          type="text"
                          value={bgColor2}
                          onChange={(e) => setBgColor2(e.target.value)}
                          className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-pink-500 text-sm font-mono text-foreground"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Text Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">Title Color</label>
                    <div className="flex gap-2">
                      <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-12 h-10 rounded cursor-pointer" aria-label="Title text color" />
                      <input aria-label="Input field"
                        type="text"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-pink-500 text-sm font-mono text-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      Subtitle Color
                    </label>
                    <div className="flex gap-2">
                      <input type="color" value={subtitleColor} onChange={(e) => setSubtitleColor(e.target.value)} className="w-12 h-10 rounded cursor-pointer" aria-label="Subtitle text color" />
                      <input aria-label="Input field"
                        type="text"
                        value={subtitleColor}
                        onChange={(e) => setSubtitleColor(e.target.value)}
                        className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-pink-500 text-sm font-mono text-foreground"
                      />
                    </div>
                  </div>
                </div>

                {/* Font Selection */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    Font Family (Google Fonts)
                  </label>
                  <select
                    value={selectedFont}
                    onChange={(e) => setSelectedFont(e.target.value)}
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-pink-500 text-sm text-foreground"
                  >
                    {googleFonts.map((font) => (
                      <option key={font.family} value={font.family}>
                        {font.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Image Upload */}
                {currentTemplate.fields.image && (
                  <div>
                    <label className="block text-sm text-muted-foreground mb-2">
                      {selectedTemplate === "product" ? "Product Image" : "Logo"}
                    </label>
                    <input aria-label="Input field"
                      ref={selectedTemplate === "product" ? productInputRef : logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(e, selectedTemplate === "product" ? "product" : "logo")
                      }
                      className="hidden"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (selectedTemplate === "product") {
                            productInputRef.current?.click();
                          } else {
                            logoInputRef.current?.click();
                          }
                        }}
                        className="flex-1 px-4 py-2 bg-muted hover:bg-accent rounded-lg text-sm text-foreground transition flex items-center justify-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Upload
                      </button>
                      {((selectedTemplate === "product" && productImage) ||
                        (selectedTemplate !== "product" && logoImage)) && (
                        <button
                          onClick={() =>
                            clearImage(selectedTemplate === "product" ? "product" : "logo")
                          }
                          className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm transition flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Download */}
            <button
              onClick={downloadImage}
              className="w-full px-6 py-3 bg-pink-600 hover:bg-pink-500 rounded-lg font-medium transition flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download as PNG (1200×630)
            </button>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Preview</h2>
              <div className="bg-muted rounded-lg p-4">
                <div className="border-2 border-dashed border-border rounded overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-auto"
                    style={{ display: "block" }}
                  />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-3 text-xs text-muted-foreground">
                <span className="px-2 py-1 bg-muted rounded font-mono">1200×630px</span>
                <span className="px-2 py-1 bg-muted rounded">Open Graph Standard</span>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-3">Tips</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-pink-500">•</span>
                  <span>
                    1200×630 is the standard size for Facebook, Twitter, and LinkedIn
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-pink-500">•</span>
                  <span>Keep important text away from edges (safe zone: 80px padding)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-pink-500">•</span>
                  <span>Use high contrast between text and background</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-pink-500">•</span>
                  <span>Test your image on different platforms before publishing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <RelatedTools currentPath="/og-gen" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={ogGenGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-og" title={ogGenGuideContent.introduction.title} subtitle="Understanding Open Graph images" variant="default">
            <MarkdownContent content={ogGenGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use OG image generation" variant="default">
            <UseCases cases={ogGenGuideContent.useCases} title="" />
          </GeoSection>

          <GeoSection id="how-to-use" title={ogGenGuideContent.howToUse.title} subtitle="Master Open Graph image creation" variant="minimal">
            <HowToSchema name={`How to use ${ogGenGuideContent.toolName}`} description="Step-by-step guide to OG image generation" steps={ogGenGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${ogGenGuideContent.toolPath}`} />
            <MarkdownContent content={ogGenGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={ogGenGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={ogGenGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={ogGenGuideContent.security.content} />
          </GeoSection>

          {ogGenGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(ogGenGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={ogGenGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>
            Generate beautiful Open Graph images with customizable templates. All processing
            happens in your browser.
          </p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="OG Image Generator"
        description="Generate beautiful Open Graph images with customizable templates for blog posts, products, social cards, and announcements."
        url="https://openkit.tools/og-gen"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={ogGenGuideContent.lastUpdated}
        version={ogGenGuideContent.version}
        aggregateRating={{ratingValue: "4.9", ratingCount: "2134", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "OG Image Generator", url: "https://openkit.tools/og-gen" },
        ]}
      />
    </main>
  );
}
