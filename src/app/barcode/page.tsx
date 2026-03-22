"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { Copy, Download, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RelatedTools } from "@/components/related-tools";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { GeoContentLayout, GeoSection, FeatureGrid } from "@/components/geo-content-layout";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";

type BarcodeType = "code128" | "code39" | "ean13" | "ean8" | "upc";

// Code 128 implementation
const CODE128_START_B = 104;
const CODE128_STOP = 106;
const CODE128_PATTERNS: number[][] = [
  [2,1,2,2,2,2],[2,2,2,1,2,2],[2,2,2,2,2,1],[1,2,1,2,2,3],[1,2,1,3,2,2],
  [1,3,1,2,2,2],[1,2,2,2,1,3],[1,2,2,3,1,2],[1,3,2,2,1,2],[2,2,1,2,1,3],
  [2,2,1,3,1,2],[2,3,1,2,1,2],[1,1,2,2,3,2],[1,2,2,1,3,2],[1,2,2,2,3,1],
  [1,1,3,2,2,2],[1,2,3,1,2,2],[1,2,3,2,2,1],[2,2,3,2,1,1],[2,2,1,1,3,2],
  [2,2,1,2,3,1],[2,1,3,2,1,2],[2,2,3,1,1,2],[3,1,2,1,3,1],[3,1,1,2,2,2],
  [3,2,1,1,2,2],[3,2,1,2,2,1],[3,1,2,2,1,2],[3,2,2,1,1,2],[3,2,2,2,1,1],
  [2,1,2,1,2,3],[2,1,2,3,2,1],[2,3,2,1,2,1],[1,1,1,3,2,3],[1,3,1,1,2,3],
  [1,3,1,3,2,1],[1,1,2,3,1,3],[1,3,2,1,1,3],[1,3,2,3,1,1],[2,1,1,3,1,3],
  [2,3,1,1,1,3],[2,3,1,3,1,1],[1,1,2,1,3,3],[1,1,2,3,3,1],[1,3,2,1,3,1],
  [1,1,3,1,2,3],[1,1,3,3,2,1],[1,3,3,1,2,1],[3,1,3,1,2,1],[2,1,1,3,3,1],
  [2,3,1,1,3,1],[2,1,3,1,1,3],[2,1,3,3,1,1],[2,1,3,1,3,1],[3,1,1,1,2,3],
  [3,1,1,3,2,1],[3,3,1,1,2,1],[3,1,2,1,1,3],[3,1,2,3,1,1],[3,3,2,1,1,1],
  [3,1,4,1,1,1],[2,2,1,4,1,1],[4,3,1,1,1,1],[1,1,1,2,2,4],[1,1,1,4,2,2],
  [1,2,1,1,2,4],[1,2,1,4,2,1],[1,4,1,1,2,2],[1,4,1,2,2,1],[1,1,2,2,1,4],
  [1,1,2,4,1,2],[1,2,2,1,1,4],[1,2,2,4,1,1],[1,4,2,1,1,2],[1,4,2,2,1,1],
  [2,4,1,2,1,1],[2,2,1,1,1,4],[4,1,3,1,1,1],[2,4,1,1,1,2],[1,3,4,1,1,1],
  [1,1,1,2,4,2],[1,2,1,1,4,2],[1,2,1,2,4,1],[1,1,4,2,1,2],[1,2,4,1,1,2],
  [1,2,4,2,1,1],[4,1,1,2,1,2],[4,2,1,1,1,2],[4,2,1,2,1,1],[2,1,2,1,4,1],
  [2,1,4,1,2,1],[4,1,2,1,2,1],[1,1,1,1,4,3],[1,1,1,3,4,1],[1,3,1,1,4,1],
  [1,1,4,1,1,3],[1,1,4,3,1,1],[4,1,1,1,1,3],[4,1,1,3,1,1],[1,1,3,1,4,1],
  [1,1,4,1,3,1],[3,1,1,1,4,1],[4,1,1,1,3,1],[2,1,1,4,1,2],[2,1,1,2,1,4],
  [2,1,1,2,3,2],[2,3,3,1,1,1,2],
];

function encodeCode128(text: string): number[] {
  const bars: number[] = [];
  // Start B
  const startPattern = CODE128_PATTERNS[CODE128_START_B];
  for (let i = 0; i < startPattern.length; i++) {
    bars.push(...Array(startPattern[i]).fill(i % 2 === 0 ? 1 : 0));
  }
  
  let checksum = CODE128_START_B;
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i) - 32;
    if (code < 0 || code > 94) continue;
    checksum += code * (i + 1);
    const pattern = CODE128_PATTERNS[code];
    for (let j = 0; j < pattern.length; j++) {
      bars.push(...Array(pattern[j]).fill(j % 2 === 0 ? 1 : 0));
    }
  }
  
  // Checksum
  const checksumCode = checksum % 103;
  const checksumPattern = CODE128_PATTERNS[checksumCode];
  for (let j = 0; j < checksumPattern.length; j++) {
    bars.push(...Array(checksumPattern[j]).fill(j % 2 === 0 ? 1 : 0));
  }
  
  // Stop
  const stopPattern = CODE128_PATTERNS[CODE128_STOP];
  for (let j = 0; j < stopPattern.length; j++) {
    bars.push(...Array(stopPattern[j]).fill(j % 2 === 0 ? 1 : 0));
  }
  
  return bars;
}

// Code 39 implementation
const CODE39_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%*";
const CODE39_PATTERNS: Record<string, string> = {
  "0": "101001101101", "1": "110100101011", "2": "101100101011", "3": "110110010101",
  "4": "101001101011", "5": "110100110101", "6": "101100110101", "7": "101001011011",
  "8": "110100101101", "9": "101100101101", "A": "110101001011", "B": "101101001011",
  "C": "110110100101", "D": "101011001011", "E": "110101100101", "F": "101101100101",
  "G": "101010011011", "H": "110101001101", "I": "101101001101", "J": "101011001101",
  "K": "110101010011", "L": "101101010011", "M": "110110101001", "N": "101011010011",
  "O": "110101101001", "P": "101101101001", "Q": "101010110011", "R": "110101011001",
  "S": "101101011001", "T": "101011011001", "U": "110010101011", "V": "100110101011",
  "W": "110011010101", "X": "100101101011", "Y": "110010110101", "Z": "100110110101",
  "-": "100101011011", ".": "110010101101", " ": "100110101101", "$": "100100100101",
  "/": "100100101001", "+": "100101001001", "%": "101001001001", "*": "100101101101",
};

function encodeCode39(text: string): number[] {
  const encoded = `*${text.toUpperCase()}*`;
  const bars: number[] = [];
  for (let i = 0; i < encoded.length; i++) {
    if (i > 0) bars.push(0); // inter-character gap
    const pattern = CODE39_PATTERNS[encoded[i]];
    if (pattern) {
      for (const bit of pattern) bars.push(parseInt(bit));
    }
  }
  return bars;
}

// EAN-13 implementation
const EAN_L: string[] = ["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"];
const EAN_G: string[] = ["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"];
const EAN_R: string[] = ["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"];
const EAN_PARITY: string[] = ["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"];

function encodeEAN13(digits: string): number[] {
  if (digits.length !== 13) return [];
  const bars: number[] = [];
  // Start guard
  bars.push(1, 0, 1);
  const parity = EAN_PARITY[parseInt(digits[0])];
  // Left 6 digits
  for (let i = 0; i < 6; i++) {
    const d = parseInt(digits[i + 1]);
    const pattern = parity[i] === "L" ? EAN_L[d] : EAN_G[d];
    for (const bit of pattern) bars.push(parseInt(bit));
  }
  // Middle guard
  bars.push(0, 1, 0, 1, 0);
  // Right 6 digits
  for (let i = 0; i < 6; i++) {
    const d = parseInt(digits[i + 7]);
    const pattern = EAN_R[d];
    for (const bit of pattern) bars.push(parseInt(bit));
  }
  // End guard
  bars.push(1, 0, 1);
  return bars;
}

function calculateEAN13Check(digits: string): string {
  if (digits.length < 12) return "";
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits[i]) * (i % 2 === 0 ? 1 : 3);
  }
  return String((10 - (sum % 10)) % 10);
}

function encodeBarcode(text: string, type: BarcodeType): { bars: number[]; displayText: string } {
  switch (type) {
    case "code128":
      return { bars: encodeCode128(text), displayText: text };
    case "code39":
      return { bars: encodeCode39(text), displayText: `*${text.toUpperCase()}*` };
    case "ean13": {
      const cleaned = text.replace(/\D/g, "").slice(0, 12);
      if (cleaned.length < 12) return { bars: [], displayText: cleaned };
      const check = calculateEAN13Check(cleaned);
      const full = cleaned + check;
      return { bars: encodeEAN13(full), displayText: full };
    }
    case "ean8": {
      const cleaned = text.replace(/\D/g, "").slice(0, 7);
      if (cleaned.length < 7) return { bars: [], displayText: cleaned };
      let sum = 0;
      for (let i = 0; i < 7; i++) sum += parseInt(cleaned[i]) * (i % 2 === 0 ? 3 : 1);
      const check = String((10 - (sum % 10)) % 10);
      const full = cleaned + check;
      const bars: number[] = [1, 0, 1];
      for (let i = 0; i < 4; i++) { for (const b of EAN_L[parseInt(full[i])]) bars.push(parseInt(b)); }
      bars.push(0, 1, 0, 1, 0);
      for (let i = 4; i < 8; i++) { for (const b of EAN_R[parseInt(full[i])]) bars.push(parseInt(b)); }
      bars.push(1, 0, 1);
      return { bars, displayText: full };
    }
    case "upc": {
      const cleaned = text.replace(/\D/g, "").slice(0, 11);
      if (cleaned.length < 11) return { bars: [], displayText: cleaned };
      let sum = 0;
      for (let i = 0; i < 11; i++) sum += parseInt(cleaned[i]) * (i % 2 === 0 ? 3 : 1);
      const check = String((10 - (sum % 10)) % 10);
      const full = "0" + cleaned + check;
      return { bars: encodeEAN13(full), displayText: cleaned + check };
    }
    default:
      return { bars: [], displayText: text };
  }
}

const BARCODE_TYPES: { value: BarcodeType; label: string; desc: string; placeholder: string }[] = [
  { value: "code128", label: "Code 128", desc: "Full ASCII, compact", placeholder: "Hello World 123" },
  { value: "code39", label: "Code 39", desc: "Alphanumeric + symbols", placeholder: "OPENKIT-2026" },
  { value: "ean13", label: "EAN-13", desc: "European products (12 digits)", placeholder: "590123412345" },
  { value: "ean8", label: "EAN-8", desc: "Small products (7 digits)", placeholder: "9638507" },
  { value: "upc", label: "UPC-A", desc: "US/Canada products (11 digits)", placeholder: "01234567890" },
];

export default function BarcodePage() {
  useToolTracker("barcode", "Barcode Generator", "generators");
  const analytics = useAnalytics();
  const { copy, copiedText } = useCopyToClipboard({ duration: 1500 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [text, setText] = useState("Hello World 123");
  const [type, setType] = useState<BarcodeType>("code128");
  const [barWidth, setBarWidth] = useState(2);
  const [height, setHeight] = useState(100);
  const [showText, setShowText] = useState(true);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [barColor, setBarColor] = useState("#000000");
  
  const { bars, displayText } = encodeBarcode(text, type);
  
  // Draw barcode on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || bars.length === 0) return;
    
    const totalWidth = bars.length * barWidth + 40;
    const totalHeight = height + (showText ? 30 : 10);
    canvas.width = totalWidth;
    canvas.height = totalHeight;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, totalWidth, totalHeight);
    
    ctx.fillStyle = barColor;
    const startX = 20;
    for (let i = 0; i < bars.length; i++) {
      if (bars[i] === 1) {
        ctx.fillRect(startX + i * barWidth, 5, barWidth, height);
      }
    }
    
    if (showText) {
      ctx.fillStyle = barColor;
      ctx.font = "14px monospace";
      ctx.textAlign = "center";
      ctx.fillText(displayText, totalWidth / 2, height + 22);
    }
  }, [bars, barWidth, height, showText, bgColor, barColor, displayText]);

  const downloadBarcode = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `barcode-${type}-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    analytics.trackToolUsage("barcode", { action: "download", type });
  }, [type, analytics]);

  const copyAsSVG = useCallback(() => {
    if (bars.length === 0) return;
    const totalWidth = bars.length * barWidth + 40;
    const totalHeight = height + (showText ? 30 : 10);
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${totalHeight}">`;
    svg += `<rect width="100%" height="100%" fill="${bgColor}"/>`;
    const startX = 20;
    for (let i = 0; i < bars.length; i++) {
      if (bars[i] === 1) {
        svg += `<rect x="${startX + i * barWidth}" y="5" width="${barWidth}" height="${height}" fill="${barColor}"/>`;
      }
    }
    if (showText) {
      svg += `<text x="${totalWidth / 2}" y="${height + 22}" text-anchor="middle" font-family="monospace" font-size="14" fill="${barColor}">${displayText}</text>`;
    }
    svg += "</svg>";
    copy(svg);
    analytics.trackToolUsage("barcode", { action: "copy_svg", type });
  }, [bars, barWidth, height, showText, bgColor, barColor, displayText, copy, analytics, type]);

  const reset = useCallback(() => {
    setText("Hello World 123");
    setType("code128");
    setBarWidth(2);
    setHeight(100);
    setShowText(true);
    setBgColor("#ffffff");
    setBarColor("#000000");
  }, []);

  return (
    <>
      <StructuredData type="WebApplication" name="Barcode Generator" description="Generate barcodes online - Code 128, Code 39, EAN-13, EAN-8, UPC-A. Download as PNG or copy as SVG." url="https://openkit.tools/barcode" />
      <BreadcrumbStructuredData items={[{ name: "Home", url: "/" }, { name: "Barcode Generator", url: "/barcode" }]} />

      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">Barcode Generator</h1>
          <p className="text-muted-foreground text-sm mt-1">Generate Code 128, Code 39, EAN-13, EAN-8, and UPC-A barcodes. Download as PNG or copy as SVG.</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-lg">Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">Barcode Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {BARCODE_TYPES.map(bt => (
                      <button key={bt.value} onClick={() => { setType(bt.value); setText(bt.placeholder); }}
                        className={`text-left p-2 rounded-lg border text-sm transition-colors ${type === bt.value ? "border-primary bg-primary/5 font-medium" : "border-border hover:border-primary/50"}`}>
                        <div>{bt.label}</div>
                        <div className="text-xs text-muted-foreground">{bt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">Content</label>
                  <Input value={text} onChange={e => setText(e.target.value)} placeholder={BARCODE_TYPES.find(b => b.value === type)?.placeholder} className="font-mono" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1"><span className="text-muted-foreground">Bar Width</span><span className="font-mono">{barWidth}px</span></div>
                    <input type="range" min={1} max={5} value={barWidth} onChange={e => setBarWidth(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-muted" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1"><span className="text-muted-foreground">Height</span><span className="font-mono">{height}px</span></div>
                    <input type="range" min={40} max={200} step={10} value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-muted" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Bar Color</label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={barColor} onChange={e => setBarColor(e.target.value)} className="w-8 h-8 rounded border cursor-pointer" />
                      <Input value={barColor} onChange={e => setBarColor(e.target.value)} className="font-mono text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Background</label>
                    <div className="flex gap-2 items-center">
                      <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-8 h-8 rounded border cursor-pointer" />
                      <Input value={bgColor} onChange={e => setBgColor(e.target.value)} className="font-mono text-sm" />
                    </div>
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={showText} onChange={e => setShowText(e.target.checked)} className="rounded" />
                  <span className="text-sm">Show text below barcode</span>
                </label>

                <Button variant="outline" size="sm" onClick={reset}><RotateCcw className="w-3 h-3 mr-1" /> Reset</Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Preview</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyAsSVG}>
                      <Copy className="w-3 h-3 mr-1" />{copiedText ? "Copied!" : "Copy SVG"}
                    </Button>
                    <Button size="sm" onClick={downloadBarcode}>
                      <Download className="w-3 h-3 mr-1" /> PNG
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center p-6 bg-white rounded-lg border min-h-[160px] items-center">
                  {bars.length > 0 ? (
                    <canvas ref={canvasRef} className="max-w-full" />
                  ) : (
                    <p className="text-sm text-muted-foreground">Enter content to generate barcode</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-base">Barcode Info</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-2 bg-muted/50 rounded">
                    <div className="text-muted-foreground">Type</div>
                    <div className="font-mono font-medium">{BARCODE_TYPES.find(b => b.value === type)?.label}</div>
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <div className="text-muted-foreground">Characters</div>
                    <div className="font-mono font-medium">{text.length}</div>
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <div className="text-muted-foreground">Bars</div>
                    <div className="font-mono font-medium">{bars.length}</div>
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <div className="text-muted-foreground">Width</div>
                    <div className="font-mono font-medium">{bars.length * barWidth + 40}px</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <GeoContentLayout>
          <GeoSection title="Quick Start">
            <QuickStartGuide steps={[
              { title: "Choose Type", description: "Select Code 128, Code 39, EAN-13, EAN-8, or UPC-A" },
              { title: "Enter Content", description: "Type the text or numbers to encode in the barcode" },
              { title: "Customize", description: "Adjust bar width, height, colors, and text visibility" },
              { title: "Export", description: "Download as PNG or copy the SVG markup" },
            ]} />
          </GeoSection>
          <GeoSection title="Features">
            <FeatureGrid features={[
              { title: "5 Barcode Types", description: "Code 128, Code 39, EAN-13, EAN-8, and UPC-A formats" },
              { title: "Customizable", description: "Adjust bar width, height, colors, and text display" },
              { title: "PNG & SVG Export", description: "Download as PNG image or copy SVG markup" },
              { title: "Client-Side", description: "All processing in your browser — nothing sent to any server" },
            ]} />
          </GeoSection>
          <GeoSection title="FAQ">
            <ToolFAQ faqs={[
              { question: "Which barcode type should I use?", answer: "Code 128 is the most versatile (full ASCII). EAN-13 and UPC-A are for retail products. Code 39 is common in logistics." },
              { question: "What is a check digit?", answer: "EAN and UPC barcodes include a check digit calculated automatically to detect scanning errors." },
              { question: "Can I scan the generated barcodes?", answer: "Yes! The generated barcodes follow standard specifications and are scannable by barcode readers." },
              { question: "Is my data secure?", answer: "Completely. All barcode generation happens in your browser — no data is ever sent to a server." },
            ]} />
          </GeoSection>
          <GeoSection title="About">
            <LastUpdated date="2026-02-07" />
          </GeoSection>
        </GeoContentLayout>
      </main>

      <RelatedTools currentPath="/barcode" />
    </>
  );
}
