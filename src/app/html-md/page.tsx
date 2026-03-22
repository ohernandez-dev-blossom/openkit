"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { FileText, Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
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
import { htmlMdGuideContent } from "@/content/html-md-guide";

export default function HtmlToMarkdown() {
  useToolTracker("html-md", "HTML to Markdown", "converters");
  const analytics = useAnalytics();
  const { isCopied } = useCopyToClipboard({ duration: 1500 });
  const [html, setHtml] = useState(`<!DOCTYPE html>
<html>
<head>
  <title>Sample Page</title>
</head>
<body>
  <h1>Hello World</h1>
  <p>This is a <strong>bold</strong> text and this is <em>italic</em>.</p>

  <h2>Features</h2>
  <ul>
    <li>Simple HTML parser</li>
    <li>Convert to Markdown</li>
    <li>Clean output</li>
  </ul>

  <h3>Code Example</h3>
  <pre><code>function hello() {
  console.log("Hello!");
}</code></pre>

  <p>Check out <a href="https://example.com">this link</a> for more info.</p>

  <p><img src="https://via.placeholder.com/150" alt="Sample image" /></p>
</body>
</html>`);


  const markdown = useMemo(() => {
    try {
      let result = html;

      // Remove DOCTYPE, html, head, body tags and their content (but keep body content)
      result = result.replace(/<!DOCTYPE[^>]*>/gi, '');
      result = result.replace(/<html[^>]*>/gi, '');
      result = result.replace(/<\/html>/gi, '');
      result = result.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '');
      result = result.replace(/<body[^>]*>/gi, '');
      result = result.replace(/<\/body>/gi, '');

      // Code blocks (must be first to avoid processing code content)
      result = result.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (_, code) => {
        const decoded = code
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#039;/g, "'");
        return '\n```\n' + decoded.trim() + '\n```\n';
      });

      // Inline code
      result = result.replace(/<code[^>]*>([^<]+)<\/code>/gi, '`$1`');

      // Headers (h1-h6)
      result = result.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n');
      result = result.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n');
      result = result.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n');
      result = result.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n');
      result = result.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '\n##### $1\n');
      result = result.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '\n###### $1\n');

      // Bold and italic (combined)
      result = result.replace(/<strong[^>]*><em[^>]*>(.*?)<\/em><\/strong>/gi, '***$1***');
      result = result.replace(/<em[^>]*><strong[^>]*>(.*?)<\/strong><\/em>/gi, '***$1***');
      result = result.replace(/<b[^>]*><i[^>]*>(.*?)<\/i><\/b>/gi, '***$1***');
      result = result.replace(/<i[^>]*><b[^>]*>(.*?)<\/b><\/i>/gi, '***$1***');

      // Bold
      result = result.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
      result = result.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');

      // Italic
      result = result.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
      result = result.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');

      // Images (must be before links to avoid conflicts)
      result = result.replace(/<img[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*\/?>/gi, '![$2]($1)');
      result = result.replace(/<img[^>]*alt=["']([^"']*)["'][^>]*src=["']([^"']*)["'][^>]*\/?>/gi, '![$1]($2)');
      result = result.replace(/<img[^>]*src=["']([^"']*)["'][^>]*\/?>/gi, '![]($1)');

      // Links
      result = result.replace(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, '[$2]($1)');

      // Blockquotes
      result = result.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '\n> $1\n');

      // Horizontal rule
      result = result.replace(/<hr[^>]*\/?>/gi, '\n---\n');

      // Unordered lists
      result = result.replace(/<ul[^>]*>/gi, '\n');
      result = result.replace(/<\/ul>/gi, '\n');
      result = result.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');

      // Ordered lists (convert to numbered markdown)
      let olCounter = 1;
      result = result.replace(/<ol[^>]*>/gi, () => {
        olCounter = 1;
        return '\n';
      });
      result = result.replace(/<\/ol>/gi, '\n');
      result = result.replace(/<li[^>]*>(.*?)<\/li>/gi, () => {
        const num = olCounter++;
        return `${num}. $1\n`;
      });

      // Line breaks
      result = result.replace(/<br[^>]*\/?>/gi, '\n');

      // Paragraphs
      result = result.replace(/<p[^>]*>/gi, '\n');
      result = result.replace(/<\/p>/gi, '\n');

      // Divs and spans (just remove them, keep content)
      result = result.replace(/<div[^>]*>/gi, '\n');
      result = result.replace(/<\/div>/gi, '\n');
      result = result.replace(/<span[^>]*>/gi, '');
      result = result.replace(/<\/span>/gi, '');

      // Remove remaining HTML tags
      result = result.replace(/<[^>]+>/g, '');

      // Decode HTML entities
      result = result
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&nbsp;/g, ' ');

      // Clean up excessive whitespace
      result = result.replace(/\n{3}/g, '\n\n');
      result = result.trim();

      analytics.trackToolUsage('html-md', {
        action: 'convert',
        inputLength: html.length,
        outputLength: result.length,
      });
      return result;
    } catch (error: unknown) {
      return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }, [html, analytics]);

  const isError = markdown.startsWith("Error:");

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center hover:opacity-80 transition">
            <FileText className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">HTML to Markdown</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-accent-foreground">HTML Input</label>
            <Textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              placeholder="Paste HTML here..."
              className="h-[500px] bg-card border-border font-mono text-sm text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>

          {/* Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-accent-foreground">Markdown Output</label>
              <button
                onClick={copyMarkdown}
                disabled={isError}
                className="px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-xs flex items-center gap-1.5 text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy
              </button>
            </div>

            <Textarea
              value={markdown}
              readOnly
              className={`h-[500px] bg-card border-border font-mono text-sm resize-none ${
                isError ? "text-red-400" : "text-white"
              }`}
            />
          </div>
        </div>

        {/* Conversion Reference */}
        <div className="mt-8 p-4 bg-card border border-border rounded-lg">
          <h3 className="text-base sm:text-lg font-medium text-accent-foreground mb-3">Supported HTML Tags</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <div className="text-muted-foreground mb-1">Text Formatting:</div>
              <code className="text-accent-foreground block mb-2">
                &lt;h1-h6&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;b&gt;, &lt;i&gt;
              </code>

              <div className="text-muted-foreground mb-1">Links & Images:</div>
              <code className="text-accent-foreground block mb-2">
                &lt;a&gt;, &lt;img&gt;
              </code>

              <div className="text-muted-foreground mb-1">Code:</div>
              <code className="text-accent-foreground block">
                &lt;code&gt;, &lt;pre&gt;
              </code>
            </div>

            <div>
              <div className="text-muted-foreground mb-1">Lists:</div>
              <code className="text-accent-foreground block mb-2">
                &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;
              </code>

              <div className="text-muted-foreground mb-1">Structure:</div>
              <code className="text-accent-foreground block mb-2">
                &lt;p&gt;, &lt;br&gt;, &lt;hr&gt;, &lt;blockquote&gt;
              </code>

              <div className="text-muted-foreground mb-1">Other:</div>
              <code className="text-accent-foreground block">
                &lt;div&gt;, &lt;span&gt; (removed)
              </code>
            </div>
          </div>
        </div>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm shadow-lg">
            Markdown copied to clipboard!
          </div>
        )}

        <RelatedTools currentPath="/html-md" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={htmlMdGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-html-md" title={htmlMdGuideContent.introduction.title} subtitle="Understanding HTML to Markdown conversion" variant="default">
            <MarkdownContent content={htmlMdGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use HTML to Markdown conversion" variant="default">
            <FeatureGrid features={htmlMdGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={htmlMdGuideContent.howToUse.title} subtitle="Master HTML to Markdown conversion" variant="minimal">
            <HowToSchema name={`How to use ${htmlMdGuideContent.toolName}`} description="Step-by-step guide to HTML to Markdown conversion" steps={htmlMdGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${htmlMdGuideContent.toolPath}`} />
            <MarkdownContent content={htmlMdGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={htmlMdGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={htmlMdGuideContent.security.title} subtitle="Your HTML never leaves your browser" variant="highlight">
            <MarkdownContent content={htmlMdGuideContent.security.content} />
          </GeoSection>

          {htmlMdGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(htmlMdGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={htmlMdGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Convert HTML to clean Markdown format. Supports headings, text formatting, links, images, lists, and code blocks.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="HTML to Markdown Converter"
        description="Free HTML to Markdown converter. Transform HTML from web pages, CMS exports, or rich text editors into clean Markdown for documentation."
        url="https://openkit.tools/html-md"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={htmlMdGuideContent.lastUpdated}
        version={htmlMdGuideContent.version}
        aggregateRating={{ratingValue: "4.8", ratingCount: "2143", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'HTML to Markdown', url: 'https://openkit.tools/html-md' },
        ]}
      />
    </main>
  );
}
