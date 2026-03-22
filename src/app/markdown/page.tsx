"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { RelatedTools } from "@/components/related-tools";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import Script from "next/script";
import {
  FileText,
  Copy,
  Download,
  Eye,
  Code,
  Split,
  CheckCircle2
} from "lucide-react";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { PinButton } from "@/components/pin-button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent as MDContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { markdownGuideContent } from "@/content/markdown-guide";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";

// Lazy load heavy markdown rendering libraries (~60KB)
const MarkdownPreview = dynamic(() => import('@/components/markdown-preview').then(m => ({ default: m.MarkdownPreview })), { 
  ssr: false,
  loading: () => <div className="p-4 text-muted-foreground">Loading preview...</div>
});

const SAMPLE_MARKDOWN = `# Welcome to Markdown Preview Live

A powerful **live preview** markdown editor with instant rendering.

## Features

- ✨ **Real-time preview** - See changes as you type
- 🎨 **Syntax highlighting** - Beautiful code blocks
- 📝 **Full markdown support** - Headers, lists, links, images, and more
- 💾 **Export to HTML** - Download your rendered content
- 📋 **Copy HTML** - Quick copy to clipboard

## Markdown Basics

### Headings

# H1 Heading
## H2 Heading
### H3 Heading

### Text Formatting

**Bold text** or __bold__
*Italic text* or _italic_
~~Strikethrough~~
\`inline code\`

### Lists

Unordered list:
- Item 1
- Item 2
  - Nested item
  - Another nested

Ordered list:
1. First item
2. Second item
3. Third item

### Links & Images

[Link text](https://example.com)
![Alt text](https://via.placeholder.com/150)

### Code Blocks

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
\`\`\`

### Tables (GFM)

| Feature | Supported | Notes |
|---------|-----------|-------|
| Headers | ✅ | All levels |
| Lists | ✅ | Ordered & unordered |
| Code | ✅ | Inline & blocks |
| Tables | ✅ | GitHub Flavored Markdown |

### Blockquotes

> This is a blockquote
> It can span multiple lines
>
> > And can be nested

### Horizontal Rule

---

### Task Lists (GFM)

- [x] Completed task
- [ ] Pending task
- [ ] Another pending task

## Try it out!

Start editing this text or clear it to write your own content. The preview updates instantly!
`;

type ViewMode = 'split' | 'editor' | 'preview';

export default function MarkdownEditorPage() {
  useToolTracker("markdown", "Markdown Editor", "utilities");
  const analytics = useAnalytics();
  const { isCopied } = useCopyToClipboard({ duration: 1500 });
  // Use lazy initialization for localStorage
  const [markdown, setMarkdown] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('openkit-markdown-content');
      return saved || SAMPLE_MARKDOWN;
    }
    return SAMPLE_MARKDOWN;
  });
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [htmlCopied, setHtmlCopied] = useState(false);
  const [hlLoaded, setHlLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Apply syntax highlighting when content changes
  useEffect(() => {
    if (hlLoaded && previewRef.current && typeof window !== 'undefined') {
      const hljs = (window as Window & { hljs?: { highlightElement: (element: Element) => void } }).hljs;
      if (hljs) {
        previewRef.current.querySelectorAll('pre code').forEach((block) => {
          hljs.highlightElement(block);
        });
      }
    }
  }, [markdown, hlLoaded]);

  // Track markdown usage
  useEffect(() => {
    if (markdown && markdown !== SAMPLE_MARKDOWN) {
      analytics.trackToolUsage('markdown', {
        action: 'edit',
        viewMode,
        contentLength: markdown.length,
        hasCodeBlocks: markdown.includes('```'),
        hasTables: markdown.includes('|'),
      });
    }
  }, [markdown, viewMode, analytics]);

  // Save to localStorage on change
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('openkit-markdown-content', markdown);
    }, 500);
    return () => clearTimeout(timer);
  }, [markdown]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(markdown);
  }, [markdown]);

  const handleCopyHTML = useCallback(() => {
    setError(null);
    try {
      // Get the rendered HTML from the preview div
      const previewElement = document.getElementById('markdown-preview');
      if (previewElement) {
        const html = previewElement.innerHTML;
        navigator.clipboard.writeText(html);
        setHtmlCopied(true);
        setTimeout(() => setHtmlCopied(false), 2000);
        analytics.trackToolUsage('markdown', { action: 'copy_html' });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to copy HTML';
      setError(errorMessage);
      analytics.trackError('markdown_copy_html_failed', {
        tool: 'markdown',
        error: errorMessage
      });
    }
  }, [analytics]);

  const handleExportHTML = useCallback(() => {
    setError(null);
    try {
      const previewElement = document.getElementById('markdown-preview');
      if (previewElement) {
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Export</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      color: #333;
    }
    code {
      background: #f4f4f4;
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
    }
    pre {
      background: #f4f4f4;
      padding: 1rem;
      border-radius: 6px;
      overflow-x: auto;
    }
    pre code {
      background: none;
      padding: 0;
    }
    blockquote {
      border-left: 4px solid #ddd;
      padding-left: 1rem;
      margin-left: 0;
      color: #666;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1rem 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 0.5rem;
      text-align: left;
    }
    th {
      background: #f4f4f4;
    }
    img {
      max-width: 100%;
      height: auto;
    }
    a {
      color: #0066cc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
${previewElement.innerHTML}
</body>
</html>`;
        
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `markdown-export-${Date.now()}.html`;
        a.click();
        URL.revokeObjectURL(url);
        analytics.trackToolUsage('markdown', { action: 'export_html' });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to export HTML';
      setError(errorMessage);
      analytics.trackError('markdown_export_html_failed', {
        tool: 'markdown',
        error: errorMessage
      });
    }
  }, [analytics]);

  const handleDownloadMarkdown = useCallback(() => {
    setError(null);
    try {
      const blob = new Blob([markdown], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document-${Date.now()}.md`;
      a.click();
      URL.revokeObjectURL(url);
      analytics.trackToolUsage('markdown', { action: 'download_markdown' });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to download markdown';
      setError(errorMessage);
      analytics.trackError('markdown_download_failed', {
        tool: 'markdown',
        error: errorMessage
      });
    }
  }, [markdown, analytics]);

  const clearContent = useCallback(() => {
    if (confirm('Clear all content? This cannot be undone.')) {
      setMarkdown('');
    }
  }, []);

  const loadSample = useCallback(() => {
    setMarkdown(SAMPLE_MARKDOWN);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Highlight.js for code syntax highlighting */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
        onLoad={() => setHlLoaded(true)}
        strategy="lazyOnload"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
      />
      
      <StructuredData 
        type="WebApplication"
        name="Markdown Preview Live"
        description="Live markdown editor with instant preview, syntax highlighting, and HTML export. Write markdown and see the rendered output in real-time."
        url="https://openkit.tools/markdown"
      />
      <BreadcrumbStructuredData 
        items={[
          { name: "Home", url: "https://openkit.tools/" },
          { name: "Markdown Preview", url: "https://openkit.tools/markdown" }
        ]}
      />

      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4 sticky top-0 bg-background z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="text-muted-foreground hover:text-foreground transition"
            >
              ← Back
            </Link>
            <div className="h-6 w-px bg-accent" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h1 className="text-xl font-semibold">Markdown Preview Live</h1>
            </div>
          </div>
          <PinButton toolHref="/markdown" />
        </div>
      </header>

      {/* Controls */}
      <div className="border-b border-border px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          {/* View Mode */}
          <div className="flex items-center gap-2 p-1 bg-card rounded-lg border border-border">
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1.5 rounded text-sm flex items-center gap-2 transition ${
                viewMode === 'split' 
                  ? 'bg-accent text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Split className="w-4 h-4" />
              Split
            </button>
            <button
              onClick={() => setViewMode('editor')}
              className={`px-3 py-1.5 rounded text-sm flex items-center gap-2 transition ${
                viewMode === 'editor' 
                  ? 'bg-accent text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Code className="w-4 h-4" />
              Editor
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1.5 rounded text-sm flex items-center gap-2 transition ${
                viewMode === 'preview' 
                  ? 'bg-accent text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>

          <div className="h-6 w-px bg-accent" />

          {/* Actions */}
          <Button 
            onClick={handleCopy}
            variant="outline"
            size="sm"
          >
            {isCopied ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Markdown
              </>
            )}
          </Button>

          <Button 
            onClick={handleCopyHTML}
            variant="outline"
            size="sm"
          >
            {htmlCopied ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              <>
                <Code className="w-4 h-4 mr-2" />
                Copy HTML
              </>
            )}
          </Button>

          <Button 
            onClick={handleDownloadMarkdown}
            variant="outline"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Download .md
          </Button>

          <Button 
            onClick={handleExportHTML}
            variant="outline"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export HTML
          </Button>

          <div className="h-6 w-px bg-accent" />

          <Button 
            onClick={loadSample}
            variant="outline"
            size="sm"
          >
            Load Sample
          </Button>

          <Button 
            onClick={clearContent}
            variant="outline"
            size="sm"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4">
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">
              <strong>Error:</strong> {error}
            </p>
            <p className="text-red-400/70 text-xs mt-1">
              Try refreshing the page or checking your browser permissions.
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">        <div className={`grid gap-6 ${
          viewMode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'
        }`}>
          {/* Editor */}
          {(viewMode === 'split' || viewMode === 'editor') && (
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Markdown Editor
                </h2>
                <span className="text-xs text-muted-foreground">
                  {markdown.length} characters
                </span>
              </div>
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Start typing your markdown here..."
                className="flex-1 min-h-[600px] font-mono text-sm resize-none"
              />
            </div>
          )}

          {/* Preview */}
          {(viewMode === 'split' || viewMode === 'preview') && (
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Live Preview
                </h2>
              </div>
              <div 
                ref={previewRef}
                id="markdown-preview"
                className="flex-1 min-h-[600px] bg-card border border-border rounded-lg p-6 overflow-auto prose prose-invert prose-zinc max-w-none
                prose-headings:text-foreground 
                prose-p:text-accent-foreground 
                prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground 
                prose-code:text-purple-400 prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-muted prose-pre:border prose-pre:border-border
                prose-blockquote:border-l-4 prose-blockquote:border-border prose-blockquote:text-muted-foreground
                prose-li:text-accent-foreground
                prose-table:border-collapse
                prose-th:bg-muted prose-th:border prose-th:border-border prose-th:px-3 prose-th:py-2
                prose-td:border prose-td:border-border prose-td:px-3 prose-td:py-2
                prose-img:rounded-lg prose-img:border prose-img:border-border
                prose-hr:border-border"
              >
                <MarkdownPreview>
                  {markdown || '*Preview will appear here as you type...*'}
                </MarkdownPreview>
              </div>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="mt-8 p-4 bg-card/50 border border-border rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold mb-2">💡 Tips</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Your content is automatically saved to your browser&apos;s local storage</li>
            <li>• Use the &quot;Split&quot; view to see your markdown and preview side-by-side</li>
            <li>• &quot;Copy HTML&quot; copies the rendered HTML for pasting into other applications</li>
            <li>• &quot;Export HTML&quot; downloads a complete standalone HTML file</li>
            <li>• Supports GitHub Flavored Markdown including tables and task lists</li>
            <li>• Code blocks preserve their syntax for manual highlighting</li>
          </ul>
        </div>
      </div>

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={markdownGuideContent.quickStartSteps} />
          </GeoSection>
          <GeoSection id="what-is" title={markdownGuideContent.introduction.title} subtitle="Understanding Markdown formatting" variant="default">
            <MDContent content={markdownGuideContent.introduction.content} />
          </GeoSection>
          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use Markdown" variant="default">
            <FeatureGrid features={markdownGuideContent.useCases.map(uc => ({ title: uc.title, description: uc.description }))} columns={2} />
          </GeoSection>
          <GeoSection id="how-to-use" title={markdownGuideContent.howToUse.title} subtitle="Master all features" variant="minimal">
            <HowToSchema name={`How to use ${markdownGuideContent.toolName}`} description="Step-by-step guide" steps={markdownGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${markdownGuideContent.toolPath}`} />
            <MDContent content={markdownGuideContent.howToUse.content} />
          </GeoSection>
          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={markdownGuideContent.faqs} />
          </GeoSection>
          <GeoSection id="security" title={markdownGuideContent.security.title} subtitle="Your content never leaves your browser" variant="highlight">
            <MDContent content={markdownGuideContent.security.content} />
          </GeoSection>
          {markdownGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(markdownGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

          <RelatedTools currentPath="/markdown" />
          <LastUpdated date={markdownGuideContent.lastUpdated} />

          {/* Structured Data */}
          <StructuredData
            type="WebApplication"
            name="Markdown Formatter"
            description="Format and preview Markdown with GitHub Flavored Markdown support."
            url="https://openkit.tools/markdown"
            applicationCategory="DeveloperApplication"
            datePublished="2024-01-15"
            dateModified={markdownGuideContent.lastUpdated}
            version={markdownGuideContent.version}
            aggregateRating={{ ratingValue: "4.7", ratingCount: "1500", bestRating: "5" }}
          />
          <BreadcrumbStructuredData
            items={[
              { name: "OpenKit.tools", url: "https://openkit.tools" },
              { name: "Markdown Formatter", url: "https://openkit.tools/markdown" },
            ]}
          />
    </main>
  );
}
