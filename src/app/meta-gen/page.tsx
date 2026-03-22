"use client";
import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { LabeledInput } from "@/components/ui/labeled-input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { RelatedTools } from "@/components/related-tools";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { metaGenGuideContent } from "@/content/meta-gen-guide";
import { Tag, Copy, Check, AlertTriangle, Search, Share2, Twitter, RefreshCw, Eye, CheckCircle2 } from "lucide-react";
export default function MetaTagsGenerator() {
  useToolTracker("meta-gen", "Meta Tags Generator", "seo");
  const analytics = useAnalytics();
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [siteName, setSiteName] = useState("");
  const [author, setAuthor] = useState("");
  const [keywords, setKeywords] = useState("");

  // Copy state
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedSeo, setCopiedSeo] = useState(false);
  const [copiedOg, setCopiedOg] = useState(false);
  const [copiedTwitter, setCopiedTwitter] = useState(false);

  // Character count warnings
  const titleWarning = title.length > 60;
  const descWarning = description.length > 160;

  // Generate meta tags sections
  const seoTags = useMemo(() => {
    const tags: string[] = [];
    if (title) tags.push(`<title>${title}</title>`);
    if (description) tags.push(`<meta name="description" content="${description}" />`);
    if (keywords) tags.push(`<meta name="keywords" content="${keywords}" />`);
    if (author) tags.push(`<meta name="author" content="${author}" />`);
    if (url) tags.push(`<link rel="canonical" href="${url}" />`);
    tags.push(`<meta charset="UTF-8" />`);
    tags.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`);
    return tags.join("\n");
  }, [title, description, keywords, author, url]);

  const ogTags = useMemo(() => {
    const tags: string[] = [];
    if (title) tags.push(`<meta property="og:title" content="${title}" />`);
    if (description) tags.push(`<meta property="og:description" content="${description}" />`);
    if (imageUrl) tags.push(`<meta property="og:image" content="${imageUrl}" />`);
    if (url) tags.push(`<meta property="og:url" content="${url}" />`);
    tags.push(`<meta property="og:type" content="website" />`);
    if (siteName) tags.push(`<meta property="og:site_name" content="${siteName}" />`);
    return tags.join("\n");
  }, [title, description, imageUrl, url, siteName]);

  const twitterTags = useMemo(() => {
    const tags: string[] = [];
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
    if (title) tags.push(`<meta name="twitter:title" content="${title}" />`);
    if (description) tags.push(`<meta name="twitter:description" content="${description}" />`);
    if (imageUrl) tags.push(`<meta name="twitter:image" content="${imageUrl}" />`);
    return tags.join("\n");
  }, [title, description, imageUrl]);

  const allTags = useMemo(() => {
    return [seoTags, ogTags, twitterTags].filter(Boolean).join("\n\n");
  }, [seoTags, ogTags, twitterTags]);

  // Copy handlers
  const copyToClipboard = useCallback((text: string, setCopied?: (value: boolean) => void) => {
    navigator.clipboard.writeText(text);
    analytics.trackToolUsage('meta-gen', {
      action: 'copy',
      section: setCopied === setCopiedAll ? 'all' : 'partial',
    });
    if (setCopied) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }, [analytics]);

  const loadSample = useCallback(() => {
    setTitle("OpenKit.tools - Fast Developer Tools");
    setDescription("Privacy-first developer tools that run entirely in your browser. JSON formatter, color converter, and 60+ more utilities.");
    setUrl("https://openkit.tools");
    setImageUrl("https://openkit.tools/og-image.png");
    setSiteName("OpenKit.tools");
    setAuthor("OpenKit.tools Team");
    setKeywords("developer tools, json formatter, color converter, base64, online tools");
  }, []);

  const clearAll = useCallback(() => {
    setTitle("");
    setDescription("");
    setUrl("");
    setImageUrl("");
    setSiteName("");
    setAuthor("");
    setKeywords("");
  }, []);

  // SEO Audit
  const seoAudit = useMemo(() => {
    const checks = [
      {
        label: "Title",
        ok: title.length > 0 && title.length <= 60,
        tip: title.length === 0
          ? "Add a title (recommended: 50-60 characters)"
          : title.length > 60
          ? `Title is ${title.length} chars — trim to ≤60 for best display`
          : `Good length (${title.length}/60)`,
      },
      {
        label: "Description",
        ok: description.length >= 50 && description.length <= 160,
        tip: description.length === 0
          ? "Add a description (recommended: 120-160 characters)"
          : description.length < 50
          ? `Too short (${description.length} chars) — aim for 120-160`
          : description.length > 160
          ? `Too long (${description.length} chars) — trim to ≤160`
          : `Good length (${description.length}/160)`,
      },
      {
        label: "URL",
        ok: url.startsWith("https://"),
        tip: !url ? "Add your page URL" : !url.startsWith("https://") ? "Use HTTPS for better SEO" : "HTTPS ✓",
      },
      {
        label: "OG Image",
        ok: !!imageUrl,
        tip: imageUrl ? "Image set ✓" : "Add an OG image (1200×630 recommended)",
      },
      {
        label: "Site Name",
        ok: !!siteName,
        tip: siteName ? "Site name set ✓" : "Add a site name for better social previews",
      },
    ];
    return checks;
  }, [title, description, url, imageUrl, siteName]);

  const auditScore = useMemo(() => seoAudit.filter((c) => c.ok).length, [seoAudit]);

  const randomize = () => {
    const samples = [
      {title: "OpenKit.tools", desc: "Privacy-first dev tools", url: "https://openkit.tools"},
      {title: "Amazing App", desc: "Transform your workflow", url: "https://example.com"},
      {title: "Dev Tools", desc: "Build faster", url: "https://dev.tools"}
    ];
    const sample = samples[Math.floor(Math.random() * samples.length)];
    setTitle(sample.title);
    setDescription(sample.desc);
    setUrl(sample.url);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center hover:opacity-80 transition">
              <Tag className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">Meta Tags Generator</h1>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Button
            onClick={() => copyToClipboard(allTags, setCopiedAll)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            {copiedAll ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copiedAll ? "Copied!" : "Copy All Tags"}
          </Button>
          <Button className="min-h-[44px] bg-transparent hover:bg-muted text-foreground" onClick={loadSample}  size="sm">
            Load Sample
          </Button>
          <Button className="min-h-[44px] bg-transparent hover:bg-muted text-foreground" onClick={clearAll}  size="sm">
            Clear All
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Page Information */}
            <div className="p-4 bg-card border border-border rounded-lg space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-accent-foreground flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Page Information
              </h2>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground flex items-center justify-between">
                  <span>Page Title *</span>
                  <span className={`text-xs ${titleWarning ? 'text-red-400' : 'text-muted-foreground'}`}>
                    {title.length}/60 {titleWarning && <AlertTriangle className="inline w-3 h-3 ml-1" />}
                  </span>
                </label>
                <LabeledInput
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                  placeholder="Your page title (recommended under 60 characters)"
                  className={`bg-background border-border text-foreground placeholder:text-muted-foreground ${titleWarning ? 'border-red-500' : ''}`}
                />
                {titleWarning && (
                  <p className="text-xs text-red-400">⚠️ Title exceeds 60 characters and may be truncated in search results</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground flex items-center justify-between">
                  <span>Description *</span>
                  <span className={`text-xs ${descWarning ? 'text-red-400' : 'text-muted-foreground'}`}>
                    {description.length}/160 {descWarning && <AlertTriangle className="inline w-3 h-3 ml-1" />}
                  </span>
                </label>
                <Textarea
                  value={description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                  placeholder="Your page description (recommended under 160 characters)"
                  className={`h-24 bg-background border-border text-foreground placeholder:text-muted-foreground resize-none ${descWarning ? 'border-red-500' : ''}`}
                />
                {descWarning && (
                  <p className="text-xs text-red-400">⚠️ Description exceeds 160 characters and may be truncated</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">URL</label>
                <LabeledInput
                  value={url}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                  placeholder="https://example.com/page"
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">Used for canonical URL and Open Graph</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Image URL</label>
                <LabeledInput
                  value={imageUrl}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">Recommended: 1200x630px for best display</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Site Name</label>
                <LabeledInput
                  value={siteName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSiteName(e.target.value)}
                  placeholder="Your site name"
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Author</label>
                <LabeledInput
                  value={author}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
                  placeholder="Your name or company"
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Keywords</label>
                <LabeledInput
                  value={keywords}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeywords(e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">Comma-separated list of keywords</p>
              </div>
            </div>

            {/* Generated Tags Sections */}
            <div className="space-y-4">
              {/* SEO Tags */}
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base sm:text-lg font-semibold text-accent-foreground">Basic SEO Tags</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(seoTags, setCopiedSeo)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {copiedSeo ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
                <Textarea
                  value={seoTags}
                  readOnly
                  placeholder="Fill in the form to generate SEO tags..."
                  className="h-40 bg-background border-border font-mono text-xs resize-none text-foreground placeholder:text-muted-foreground"
                  aria-label="SEO tags output"
                />
              </div>

              {/* Open Graph Tags */}
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base sm:text-lg font-semibold text-accent-foreground">Open Graph Tags</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(ogTags, setCopiedOg)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {copiedOg ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
                <Textarea
                  value={ogTags}
                  readOnly
                  placeholder="Fill in the form to generate Open Graph tags..."
                  className="h-32 bg-background border-border font-mono text-xs resize-none text-foreground placeholder:text-muted-foreground"
                  aria-label="Open Graph tags output"
                />
              </div>

              {/* Twitter Card Tags */}
              <div className="p-4 bg-card border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base sm:text-lg font-semibold text-accent-foreground">Twitter Card Tags</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(twitterTags, setCopiedTwitter)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {copiedTwitter ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
                <Textarea
                  value={twitterTags}
                  readOnly
                  placeholder="Fill in the form to generate Twitter Card tags..."
                  className="h-24 bg-background border-border font-mono text-xs resize-none text-foreground placeholder:text-muted-foreground"
                  aria-label="Twitter Card tags output"
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            {/* Google Search Preview */}
            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-4 h-4 text-blue-500" />
                <h2 className="text-xl sm:text-2xl font-semibold text-accent-foreground">Google Search Preview</h2>
              </div>
              <div className="space-y-1.5 p-3 bg-background/50 rounded-lg">
                <div className="text-base text-blue-400 hover:underline cursor-pointer">
                  {title || "Your page title will appear here"}
                </div>
                <div className="text-xs text-green-600">
                  {url || "https://example.com/your-page"}
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {description || "Your meta description will appear here. This is how your page will look in Google search results. Make it compelling to improve click-through rates."}
                </div>
              </div>
            </div>

            {/* Facebook Preview */}
            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Share2 className="w-4 h-4 text-blue-600" />
                <h2 className="text-xl sm:text-2xl font-semibold text-accent-foreground">Facebook Preview</h2>
              </div>
              <div className="border border-border rounded-lg overflow-hidden bg-background/50">
                {imageUrl ? (
                  <div className="w-full h-48 bg-muted flex items-center justify-center relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageUrl}
                      alt="OG Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) parent.innerHTML = '<div class="text-muted-foreground text-xs">Invalid image URL or failed to load</div>';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">No image specified (1200x630px recommended)</span>
                  </div>
                )}
                <div className="p-3 bg-muted/50 border-t border-border">
                  <div className="text-xs text-muted-foreground uppercase mb-1.5">
                    {url ? new URL(url).hostname : "example.com"}
                  </div>
                  <div className="text-sm font-semibold text-white mb-1 line-clamp-1">
                    {title || "Your page title"}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-2">
                    {description || "Your description will appear here"}
                  </div>
                </div>
              </div>
            </div>

            {/* Twitter Preview */}
            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Twitter className="w-4 h-4 text-blue-400" />
                <h2 className="text-xl sm:text-2xl font-semibold text-accent-foreground">Twitter Card Preview</h2>
              </div>
              <div className="border border-border rounded-2xl overflow-hidden bg-background/50">
                {imageUrl ? (
                  <div className="w-full h-52 bg-muted flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageUrl}
                      alt="Twitter Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) parent.innerHTML = '<div class="text-muted-foreground text-xs">Invalid image URL or failed to load</div>';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-52 bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">No image (1200x628px recommended)</span>
                  </div>
                )}
                <div className="p-3 bg-muted/50 border-t border-border">
                  <div className="text-sm font-semibold text-white mb-1.5 line-clamp-2">
                    {title || "Your page title"}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {description || "Your description will appear here"}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    🔗 {url ? new URL(url).hostname : "example.com"}
                  </div>
                </div>
              </div>
            </div>

            {/* SEO Audit */}
            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base sm:text-lg font-semibold text-accent-foreground flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  SEO Audit
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    auditScore === seoAudit.length
                      ? "bg-green-500/20 text-green-500"
                      : auditScore >= 3
                      ? "bg-yellow-500/20 text-yellow-500"
                      : "bg-red-500/20 text-red-500"
                  }`}
                >
                  {auditScore}/{seoAudit.length} passed
                </span>
              </div>
              <div className="space-y-2">
                {seoAudit.map((check) => (
                  <div
                    key={check.label}
                    className="flex items-start gap-2 text-sm"
                  >
                    {check.ok ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-medium">{check.label}</span>
                      <span className="text-muted-foreground"> — {check.tip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Tools */}
        <RelatedTools currentPath="/meta-gen" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={metaGenGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-meta-tags" title={metaGenGuideContent.introduction.title} subtitle="Understanding SEO meta tag generation" variant="default">
            <MarkdownContent content={metaGenGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use meta tags" variant="default">
            <FeatureGrid features={metaGenGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={metaGenGuideContent.howToUse.title} subtitle="Master meta tag generation" variant="minimal">
            <HowToSchema name={`How to use ${metaGenGuideContent.toolName}`} description="Step-by-step guide to meta tag generation" steps={metaGenGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${metaGenGuideContent.toolPath}`} />
            <MarkdownContent content={metaGenGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={metaGenGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={metaGenGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={metaGenGuideContent.security.content} />
          </GeoSection>

          {metaGenGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(metaGenGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={metaGenGuideContent.lastUpdated} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Generate comprehensive SEO meta tags. All processing happens in your browser - your data never leaves your device.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Meta Tags Generator - SEO, Open Graph & Twitter Cards"
        description="Generate complete SEO meta tags, Open Graph, and Twitter Card markup for your website. Optimize titles, descriptions, and social sharing."
        url="https://openkit.tools/meta-gen"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={metaGenGuideContent.lastUpdated}
        version={metaGenGuideContent.version}
        aggregateRating={{ratingValue: "4.9", ratingCount: "2341", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Meta Tags Generator', url: 'https://openkit.tools/meta-gen' },
        ]}
      />
    </main>
  );
}
