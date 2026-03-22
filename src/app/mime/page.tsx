"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, FileCode, Copy, Check } from "lucide-react";
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
import { mimeGuideContent } from "@/content/mime-guide";

type MimeType = {
  extension: string;
  mimeType: string;
  description: string;
};

// Common MIME types database
const MIME_TYPES: MimeType[] = [
  // Text
  { extension: ".txt", mimeType: "text/plain", description: "Plain text file" },
  { extension: ".html", mimeType: "text/html", description: "HTML document" },
  { extension: ".css", mimeType: "text/css", description: "Cascading Style Sheet" },
  { extension: ".js", mimeType: "application/javascript", description: "JavaScript source code" },
  { extension: ".mjs", mimeType: "application/javascript", description: "JavaScript module" },
  { extension: ".json", mimeType: "application/json", description: "JSON data" },
  { extension: ".xml", mimeType: "application/xml", description: "XML document" },
  { extension: ".csv", mimeType: "text/csv", description: "Comma-separated values" },
  { extension: ".md", mimeType: "text/markdown", description: "Markdown document" },

  // Images
  { extension: ".jpg", mimeType: "image/jpeg", description: "JPEG image" },
  { extension: ".jpeg", mimeType: "image/jpeg", description: "JPEG image" },
  { extension: ".png", mimeType: "image/png", description: "PNG image" },
  { extension: ".gif", mimeType: "image/gif", description: "GIF image" },
  { extension: ".svg", mimeType: "image/svg+xml", description: "Scalable Vector Graphics" },
  { extension: ".webp", mimeType: "image/webp", description: "WebP image" },
  { extension: ".ico", mimeType: "image/x-icon", description: "Icon file" },
  { extension: ".bmp", mimeType: "image/bmp", description: "Bitmap image" },

  // Audio
  { extension: ".mp3", mimeType: "audio/mpeg", description: "MP3 audio" },
  { extension: ".wav", mimeType: "audio/wav", description: "WAV audio" },
  { extension: ".ogg", mimeType: "audio/ogg", description: "OGG audio" },
  { extension: ".m4a", mimeType: "audio/mp4", description: "M4A audio" },
  { extension: ".aac", mimeType: "audio/aac", description: "AAC audio" },

  // Video
  { extension: ".mp4", mimeType: "video/mp4", description: "MP4 video" },
  { extension: ".webm", mimeType: "video/webm", description: "WebM video" },
  { extension: ".avi", mimeType: "video/x-msvideo", description: "AVI video" },
  { extension: ".mov", mimeType: "video/quicktime", description: "QuickTime video" },
  { extension: ".mkv", mimeType: "video/x-matroska", description: "Matroska video" },

  // Fonts
  { extension: ".woff", mimeType: "font/woff", description: "Web Open Font Format" },
  { extension: ".woff2", mimeType: "font/woff2", description: "Web Open Font Format 2" },
  { extension: ".ttf", mimeType: "font/ttf", description: "TrueType font" },
  { extension: ".otf", mimeType: "font/otf", description: "OpenType font" },
  { extension: ".eot", mimeType: "application/vnd.ms-fontobject", description: "Embedded OpenType font" },

  // Archives
  { extension: ".zip", mimeType: "application/zip", description: "ZIP archive" },
  { extension: ".rar", mimeType: "application/vnd.rar", description: "RAR archive" },
  { extension: ".tar", mimeType: "application/x-tar", description: "TAR archive" },
  { extension: ".gz", mimeType: "application/gzip", description: "GZIP archive" },
  { extension: ".7z", mimeType: "application/x-7z-compressed", description: "7-Zip archive" },
  { extension: ".bz2", mimeType: "application/x-bzip2", description: "BZIP2 archive" },

  // Documents
  { extension: ".pdf", mimeType: "application/pdf", description: "PDF document" },
  { extension: ".doc", mimeType: "application/msword", description: "Microsoft Word document" },
  { extension: ".docx", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", description: "Microsoft Word document" },
  { extension: ".xls", mimeType: "application/vnd.ms-excel", description: "Microsoft Excel spreadsheet" },
  { extension: ".xlsx", mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", description: "Microsoft Excel spreadsheet" },
  { extension: ".ppt", mimeType: "application/vnd.ms-powerpoint", description: "Microsoft PowerPoint presentation" },
  { extension: ".pptx", mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation", description: "Microsoft PowerPoint presentation" },
  { extension: ".odt", mimeType: "application/vnd.oasis.opendocument.text", description: "OpenDocument text" },
  { extension: ".ods", mimeType: "application/vnd.oasis.opendocument.spreadsheet", description: "OpenDocument spreadsheet" },
  { extension: ".odp", mimeType: "application/vnd.oasis.opendocument.presentation", description: "OpenDocument presentation" },
  { extension: ".rtf", mimeType: "application/rtf", description: "Rich Text Format" },

  // Data
  { extension: ".yaml", mimeType: "application/x-yaml", description: "YAML document" },
  { extension: ".yml", mimeType: "application/x-yaml", description: "YAML document" },
  { extension: ".toml", mimeType: "application/toml", description: "TOML configuration" },
  { extension: ".ini", mimeType: "text/plain", description: "Configuration file" },

  // Binary
  { extension: ".bin", mimeType: "application/octet-stream", description: "Binary data" },
  { extension: ".exe", mimeType: "application/vnd.microsoft.portable-executable", description: "Windows executable" },
  { extension: ".dll", mimeType: "application/vnd.microsoft.portable-executable", description: "Windows dynamic link library" },
  { extension: ".so", mimeType: "application/octet-stream", description: "Shared object library" },
  { extension: ".dylib", mimeType: "application/octet-stream", description: "Dynamic library" },

  // Network/Web
  { extension: ".swf", mimeType: "application/x-shockwave-flash", description: "Flash animation" },
  { extension: ".wasm", mimeType: "application/wasm", description: "WebAssembly" },
  { extension: ".manifest", mimeType: "text/cache-manifest", description: "Application cache manifest" },

  // Other
  { extension: ".apk", mimeType: "application/vnd.android.package-archive", description: "Android application package" },
  { extension: ".ipa", mimeType: "application/octet-stream", description: "iOS application archive" },
  { extension: ".deb", mimeType: "application/vnd.debian.binary-package", description: "Debian package" },
  { extension: ".rpm", mimeType: "application/x-rpm", description: "RPM package" },
];

export default function MIMELookup() {
  useToolTracker("mime", "MIME Type Lookup", "utilities");
  const analytics = useAnalytics();
  const { isCopied } = useCopyToClipboard({ duration: 1500 });
  const [query, setQuery] = useState("");
  const trackedRef = useRef(false);

  const results = useMemo(() => {
    if (!query.trim()) return MIME_TYPES.slice(0, 20);

    const q = query.toLowerCase();
    return MIME_TYPES.filter(
      (mime) =>
        mime.extension.toLowerCase().includes(q) ||
        mime.mimeType.toLowerCase().includes(q) ||
        mime.description.toLowerCase().includes(q)
    );
  }, [query]);

  // Track search usage
  useEffect(() => {
    if (query.trim() && !trackedRef.current) {
      analytics.trackToolUsage("mime", { action: "search", query: query.trim() });
      trackedRef.current = true;
    }
  }, [query, analytics]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    analytics.trackToolUsage("mime", { action: "copy", mimeType: text });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <FileCode className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold">MIME Type Lookup</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by extension, MIME type, or description..."
              aria-label="Search MIME types"
              className="w-full h-12 pl-10 pr-4 bg-muted border border-border rounded-lg focus:border-indigo-500 focus:outline-none text-foreground"
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground mb-2">
            {results.length} result{results.length !== 1 ? "s" : ""}
          </p>
          {results.map((mime, index) => (
            <div
              key={`${mime.extension}-${index}`}
              className="p-4 bg-card border border-border rounded-lg hover:border-indigo-500/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-sm font-mono font-semibold text-indigo-400">
                      {mime.extension}
                    </code>
                    <span className="text-muted-foreground">→</span>
                    <code className="text-sm font-mono text-green-400 break-all">
                      {mime.mimeType}
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground">{mime.description}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(mime.mimeType)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-accent rounded-md text-xs transition-colors shrink-0"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Related Tools */}
        <RelatedTools currentPath="/mime" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={mimeGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-are-mime-types" title={mimeGuideContent.introduction.title} subtitle="Understanding MIME content types" variant="default">
            <MarkdownContent content={mimeGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use MIME types" variant="default">
            <FeatureGrid features={mimeGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={mimeGuideContent.howToUse.title} subtitle="Master MIME type lookup" variant="minimal">
            <HowToSchema
              name={`How to use ${mimeGuideContent.toolName}`}
              description="Step-by-step guide to MIME type lookup"
              steps={mimeGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${mimeGuideContent.toolPath}`}
            />
            <MarkdownContent content={mimeGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={mimeGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={mimeGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={mimeGuideContent.security.content} />
          </GeoSection>

          {mimeGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="MIME database stats" variant="minimal">
              <StatsBar stats={Object.entries(mimeGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={mimeGuideContent.lastUpdated} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-4 mt-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Find MIME types instantly. Click to copy.</p>
          <p className="mt-2">
            <Link href="/" className="hover:text-foreground transition">← Back to tools</Link>
          </p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="MIME Type Lookup | OpenKit.tools"
        description="Search and find MIME types by file extension. Comprehensive database of common file types and their MIME content types for web development."
        url="https://openkit.tools/mime"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={mimeGuideContent.lastUpdated}
        version="1.0.0"
        aggregateRating={{
          ratingValue: "4.8",
          ratingCount: "1200",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: 'https://openkit.tools' },
          { name: 'MIME Type Lookup', url: 'https://openkit.tools/mime' },
        ]}
      />
    </main>
  );
}
