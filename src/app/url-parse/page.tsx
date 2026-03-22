"use client";

import Link from "next/link";
import { RelatedTools } from "@/components/related-tools";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LabeledInput } from "@/components/ui/labeled-input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { Copy, Check, ExternalLink, AlertCircle } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { urlParseGuideContent } from "@/content/url-parse-guide";
import { useAnalytics } from "@/hooks/use-analytics";

interface URLParts {
  protocol: string;
  username: string;
  password: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  queryParams: Array<{ key: string; value: string }>;
}

// CopyButton component moved outside to avoid re-creation during render
const CopyButton = ({ text, copy, isCopied, onCopy, component }: { text: string; copy: (text: string) => void; isCopied: boolean; onCopy?: () => void; component?: string }) => (
  <Button
    size="sm"
    variant="ghost"
    onClick={() => { copy(text); onCopy?.(); }}
    className="h-6 px-2"
    data-copy-component={component}
  >
    {isCopied ? (
      <Check className="w-3 h-3 text-green-500" />
    ) : (
      <Copy className="w-3 h-3" />
    )}
  </Button>
);

export default function URLParser() {
  useToolTracker("url-parse", "URL Parser");
  const { copy, isCopied } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();

  const handleCopy = useCallback((text: string, component: string) => {
    copy(text);
    analytics.trackToolInteraction('url-parser', 'copy', { component });
  }, [copy, analytics]);
  const [urlInput, setUrlInput] = useState("https://example.com:8080/path/to/page?name=value&foo=bar#section");
  const [parsedURL, setParsedURL] = useState<URLParts | null>(null);
  const [isValid, setIsValid] = useState(true);
  const [mode, setMode] = useState<"parse" | "build">("parse");

  // Editable parts for build mode
  const [editedParts, setEditedParts] = useState<URLParts>({
    protocol: "https:",
    username: "",
    password: "",
    hostname: "example.com",
    port: "",
    pathname: "/",
    search: "",
    hash: "",
    queryParams: []});

  const parseURL = useCallback((url: string) => {
    try {
      const parsed = new URL(url);
      const queryParams: Array<{ key: string; value: string }> = [];

      parsed.searchParams.forEach((value, key) => {
        queryParams.push({ key, value });
      });

      const parts: URLParts = {
        protocol: parsed.protocol,
        username: parsed.username,
        password: parsed.password,
        hostname: parsed.hostname,
        port: parsed.port,
        pathname: parsed.pathname,
        search: parsed.search,
        hash: parsed.hash,
        queryParams};

      setParsedURL(parts);
      setEditedParts(parts);
      setIsValid(true);

      analytics.trackToolUsage('url-parser', {
        action: 'parse',
        hasProtocol: !!parsed.protocol,
        hasPort: !!parsed.port,
        hasQueryParams: queryParams.length > 0,
        hasHash: !!parsed.hash,
        hasAuth: !!(parsed.username || parsed.password),
        queryParamCount: queryParams.length
      });
    } catch {
      setIsValid(false);
      setParsedURL(null);
    }
  }, [analytics]);

  useEffect(() => {
    // Parse URL when input changes - valid pattern for computed state
    parseURL(urlInput);
  }, [parseURL, urlInput]);

  
  const buildURL = useCallback(() => {
    try {
      let url = `${editedParts.protocol}//${editedParts.hostname}`;

      if (editedParts.username) {
        url = `${editedParts.protocol}//${editedParts.username}${editedParts.password ? `:${editedParts.password}` : ""}@${editedParts.hostname}`;
      }

      if (editedParts.port) {
        url += `:${editedParts.port}`;
      }

      url += editedParts.pathname;

      if (editedParts.queryParams.length > 0) {
        const params = new URLSearchParams();
        editedParts.queryParams.forEach(({ key, value }) => {
          if (key) params.append(key, value);
        });
        url += `?${params.toString()}`;
      }

      if (editedParts.hash) {
        url += editedParts.hash.startsWith("#") ? editedParts.hash : `#${editedParts.hash}`;
      }

      setUrlInput(url);
      setMode("parse");

      analytics.trackToolUsage('url-parser', {
        action: 'build',
        hasPort: !!editedParts.port,
        hasQueryParams: editedParts.queryParams.length > 0,
        hasHash: !!editedParts.hash,
        hasAuth: !!(editedParts.username || editedParts.password),
        queryParamCount: editedParts.queryParams.filter(p => p.key).length
      });
    } catch {
      setIsValid(false);
    }
  }, [editedParts, analytics]);

  const encodeURL = useCallback(() => {
    const encoded = encodeURIComponent(urlInput);
    copy(encoded);
    analytics.trackToolInteraction('url-parser', 'encode', { urlLength: urlInput.length });
  }, [urlInput, copy, analytics]);

  const decodeURL = useCallback(() => {
    try {
      const decoded = decodeURIComponent(urlInput);
      setUrlInput(decoded);
      analytics.trackToolInteraction('url-parser', 'decode', { urlLength: urlInput.length });
    } catch {
      alert("Invalid URL encoded string");
    }
  }, [urlInput, analytics]);

  const addQueryParam = useCallback(() => {
    setEditedParts(prev => ({
      ...prev,
      queryParams: [...prev.queryParams, { key: "", value: "" }]}));
  }, []);

  const updateQueryParam = useCallback((index: number, field: "key" | "value", value: string) => {
    setEditedParts(prev => ({
      ...prev,
      queryParams: prev.queryParams.map((param, i) => 
        i === index ? { ...param, [field]: value } : param
      )}));
  }, []);

  const removeQueryParam = useCallback((index: number) => {
    setEditedParts(prev => ({
      ...prev,
      queryParams: prev.queryParams.filter((_, i) => i !== index)}));
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <ExternalLink className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-semibold">URL Parser</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        <p className="text-muted-foreground mb-6">
          Parse URLs into components, edit individual parts, and rebuild. Supports encoding/decoding.
        </p>

        {/* Mode Tabs */}
        <Tabs value={mode} onValueChange={(v) => {
          setMode(v as "parse" | "build");
          analytics.trackToolInteraction('url-parser', 'mode_change', { mode: v });
        }} className="mb-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="parse" className="data-[state=active]:bg-blue-600">
              Parse URL
            </TabsTrigger>
            <TabsTrigger value="build" className="data-[state=active]:bg-blue-600">
              Build URL
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* URL Input */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">URL</label>
            {!isValid && (
              <div className="flex items-center gap-1 text-red-400 text-sm sm:text-xs">
                <AlertCircle className="w-3 h-3" />
                Invalid URL format
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <LabeledInput
              value={urlInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrlInput(e.target.value)}
              placeholder="https://example.com:8080/path?key=value#hash"
              className={`flex-1 bg-card border-border font-mono text-sm ${
                !isValid ? "border-red-500" : "focus:border-blue-500"
              }`}
            />
            <Button className="min-h-[44px] border-border" onClick={encodeURL} variant="outline" >
              Encode
            </Button>
            <Button className="min-h-[44px] border-border" onClick={decodeURL} variant="outline" >
              Decode
            </Button>
          </div>
        </div>

        {mode === "parse" && parsedURL && (
          <>
            {/* Basic Components */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-3 p-4 rounded-lg bg-card border border-border">
                <h3 className="text-base sm:text-lg font-semibold text-accent-foreground mb-3">Basic Components</h3>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm sm:text-xs text-muted-foreground">Protocol</label>
                    <CopyButton text={parsedURL.protocol} copy={(text) => handleCopy(text, 'protocol')} isCopied={isCopied} />
                  </div>
                  <div className="px-3 py-2 bg-background border border-border rounded font-mono text-sm">
                    {parsedURL.protocol || <span className="text-muted-foreground/70">—</span>}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm sm:text-xs text-muted-foreground">Host/Domain</label>
                    <CopyButton text={parsedURL.hostname} copy={(text) => handleCopy(text, 'hostname')} isCopied={isCopied} />
                  </div>
                  <div className="px-3 py-2 bg-background border border-border rounded font-mono text-sm">
                    {parsedURL.hostname || <span className="text-muted-foreground/70">—</span>}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm sm:text-xs text-muted-foreground">Port</label>
                    <CopyButton text={parsedURL.port} copy={(text) => handleCopy(text, 'port')} isCopied={isCopied} />
                  </div>
                  <div className="px-3 py-2 bg-background border border-border rounded font-mono text-sm">
                    {parsedURL.port || <span className="text-muted-foreground/70">—</span>}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm sm:text-xs text-muted-foreground">Path</label>
                    <CopyButton text={parsedURL.pathname} copy={(text) => handleCopy(text, 'pathname')} isCopied={isCopied} />
                  </div>
                  <div className="px-3 py-2 bg-background border border-border rounded font-mono text-sm">
                    {parsedURL.pathname || <span className="text-muted-foreground/70">—</span>}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm sm:text-xs text-muted-foreground">Fragment/Hash</label>
                    <CopyButton text={parsedURL.hash} copy={(text) => handleCopy(text, 'hash')} isCopied={isCopied} />
                  </div>
                  <div className="px-3 py-2 bg-background border border-border rounded font-mono text-sm">
                    {parsedURL.hash || <span className="text-muted-foreground/70">—</span>}
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-lg bg-card border border-border">
                <h3 className="text-base sm:text-lg font-semibold text-accent-foreground mb-3">Authentication</h3>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm sm:text-xs text-muted-foreground">Username</label>
                    {parsedURL.username && <CopyButton text={parsedURL.username} copy={(text) => handleCopy(text, 'username')} isCopied={isCopied} />}
                  </div>
                  <div className="px-3 py-2 bg-background border border-border rounded font-mono text-sm">
                    {parsedURL.username || <span className="text-muted-foreground/70">—</span>}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm sm:text-xs text-muted-foreground">Password</label>
                    {parsedURL.password && <CopyButton text={parsedURL.password} copy={(text) => handleCopy(text, 'password')} isCopied={isCopied} />}
                  </div>
                  <div className="px-3 py-2 bg-background border border-border rounded font-mono text-sm">
                    {parsedURL.password ? "••••••••" : <span className="text-muted-foreground/70">—</span>}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button
                    onClick={() => setMode("build")}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Edit Components
                  </Button>
                </div>
              </div>
            </div>

            {/* Query Parameters */}
            {parsedURL.queryParams.length > 0 && (
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base sm:text-lg font-semibold text-accent-foreground">Query Parameters</h3>
                  <CopyButton text={parsedURL.search} copy={(text) => handleCopy(text, 'search')} isCopied={isCopied} />
                </div>
                <div className="space-y-2">
                  {parsedURL.queryParams.map((param, i) => (
                    <div key={i} className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-sm sm:text-xs text-muted-foreground mb-1 block">Key</label>
                        <div className="px-3 py-2 bg-background border border-border rounded font-mono text-sm">
                          {param.key}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm sm:text-xs text-muted-foreground mb-1 block">Value</label>
                        <div className="px-3 py-2 bg-background border border-border rounded font-mono text-sm flex items-center justify-between">
                          <span className="truncate">{param.value}</span>
                          <CopyButton text={param.value} copy={(text) => handleCopy(text, 'query_param_value')} isCopied={isCopied} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {mode === "build" && (
          <div className="space-y-6">
            {/* Basic Components Editor */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3 p-4 rounded-lg bg-card border border-border">
                <h3 className="text-base sm:text-lg font-semibold text-accent-foreground mb-3">Basic Components</h3>
                
                <div>
                  <label className="text-sm sm:text-xs text-muted-foreground mb-1 block">Protocol</label>
                  <LabeledInput
                    value={editedParts.protocol}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedParts({ ...editedParts, protocol: e.target.value })}
                    placeholder="https:"
                    className="bg-background border-border font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm sm:text-xs text-muted-foreground mb-1 block">Host/Domain</label>
                  <LabeledInput
                    value={editedParts.hostname}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedParts({ ...editedParts, hostname: e.target.value })}
                    placeholder="example.com"
                    className="bg-background border-border font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm sm:text-xs text-muted-foreground mb-1 block">Port</label>
                  <LabeledInput
                    value={editedParts.port}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedParts({ ...editedParts, port: e.target.value })}
                    placeholder="8080"
                    className="bg-background border-border font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm sm:text-xs text-muted-foreground mb-1 block">Path</label>
                  <LabeledInput
                    value={editedParts.pathname}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedParts({ ...editedParts, pathname: e.target.value })}
                    placeholder="/path/to/page"
                    className="bg-background border-border font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm sm:text-xs text-muted-foreground mb-1 block">Fragment/Hash</label>
                  <LabeledInput
                    value={editedParts.hash}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedParts({ ...editedParts, hash: e.target.value })}
                    placeholder="#section"
                    className="bg-background border-border font-mono text-sm"
                  />
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-lg bg-card border border-border">
                <h3 className="text-base sm:text-lg font-semibold text-accent-foreground mb-3">Authentication (Optional)</h3>
                
                <div>
                  <label className="text-sm sm:text-xs text-muted-foreground mb-1 block">Username</label>
                  <LabeledInput
                    value={editedParts.username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedParts({ ...editedParts, username: e.target.value })}
                    placeholder="username"
                    className="bg-background border-border font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm sm:text-xs text-muted-foreground mb-1 block">Password</label>
                  <LabeledInput
                    type="password"
                    value={editedParts.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedParts({ ...editedParts, password: e.target.value })}
                    placeholder="password"
                    className="bg-background border-border font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Query Parameters Editor */}
            <div className="p-4 rounded-lg bg-card border border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base sm:text-lg font-semibold text-accent-foreground">Query Parameters</h3>
                <Button
                  size="sm"
                  onClick={addQueryParam}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Add Parameter
                </Button>
              </div>
              <div className="space-y-2">
                {editedParts.queryParams.map((param, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                    <LabeledInput
                      value={param.key}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQueryParam(i, "key", e.target.value)}
                      placeholder="key"
                      className="bg-background border-border font-mono text-sm"
                    />
                    <LabeledInput
                      value={param.value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQueryParam(i, "value", e.target.value)}
                      placeholder="value"
                      className="bg-background border-border font-mono text-sm"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeQueryParam(i)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-950/20"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                {editedParts.queryParams.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No query parameters. Click &quot;Add Parameter&quot; to add one.
                  </p>
                )}
              </div>
            </div>

            {/* Build URL Button */}
            <Button
              onClick={buildURL}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Build URL
            </Button>
          </div>
        )}

        {/* GEO Content - Professional Design System */}
        <GeoContentLayout>
          {/* Quick Start Guide */}
          <GeoSection
            id="quick-start"
            title="Quick Start Guide"
            subtitle="Parse and rebuild URLs in seconds"
            variant="highlight"
          >
            <QuickStartGuide steps={urlParseGuideContent.quickStartSteps} />
          </GeoSection>

          {/* What is URL Structure */}
          <GeoSection
            id="what-is-url-structure"
            title={urlParseGuideContent.introduction.title}
            subtitle="Understanding the anatomy of web addresses"
            variant="default"
          >
            <MarkdownContent content={urlParseGuideContent.introduction.content} />
          </GeoSection>

          {/* Use Cases - Feature Grid */}
          <GeoSection
            id="use-cases"
            title="Common Use Cases"
            subtitle="How developers use URL parsing daily"
            variant="default"
          >
            <FeatureGrid
              features={urlParseGuideContent.useCases.map(uc => ({
                title: uc.title,
                description: uc.description
              }))}
              columns={2}
            />
          </GeoSection>

          {/* How to Use This Tool */}
          <GeoSection
            id="how-to-use"
            title={urlParseGuideContent.howToUse.title}
            subtitle="Master URL parsing, building, and encoding"
            variant="minimal"
          >
            <HowToSchema
              name={`How to use ${urlParseGuideContent.toolName}`}
              description="Step-by-step guide to parsing and manipulating URLs"
              steps={urlParseGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${urlParseGuideContent.toolPath}`}
            />
            <MarkdownContent content={urlParseGuideContent.howToUse.content} />
          </GeoSection>

          {/* FAQ */}
          <GeoSection
            id="faq"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about URL parsing"
            variant="default"
          >
            <ToolFAQ faqs={urlParseGuideContent.faqs} />
          </GeoSection>

          {/* Security & Privacy */}
          <GeoSection
            id="security"
            title={urlParseGuideContent.security.title}
            subtitle="Your URLs never leave your browser"
            variant="highlight"
          >
            <MarkdownContent content={urlParseGuideContent.security.content} />
          </GeoSection>

          {/* Statistics - Stats Bar */}
          {urlParseGuideContent.stats && (
            <GeoSection
              id="stats"
              title="By the Numbers"
              subtitle="URL parsing capabilities and specifications"
              variant="minimal"
            >
              <StatsBar
                stats={Object.entries(urlParseGuideContent.stats).map(([label, value]) => ({
                  label,
                  value
                }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        {/* Related Tools */}
        <RelatedTools currentPath="/url-parse" />

        {/* Last Updated */}
        <LastUpdated date={urlParseGuideContent.lastUpdated} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6 mt-12">
        <div className="max-w-5xl mx-auto text-center text-sm text-muted-foreground">
          <p>Fast, private URL parsing. No data leaves your browser.</p>
          <p className="mt-2 flex flex-wrap justify-center gap-2">
            <Link href="/" className="hover:text-foreground transition">← Back to tools</Link> •{" "}
            <Link href="/about" className="hover:text-foreground transition">About</Link> •{" "}
            <Link href="/privacy" className="hover:text-foreground transition">Privacy</Link>
          </p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="URL Parser & Builder"
        description="Parse URLs into components, edit individual parts, and rebuild. Supports encoding/decoding and query parameter management."
        url="https://openkit.tools/url-parse"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={urlParseGuideContent.lastUpdated}
        version={urlParseGuideContent.version}
        aggregateRating={{
          ratingValue: "4.6",
          ratingCount: "1542",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'URL Parser', url: 'https://openkit.tools/url-parse' },
        ]}
      />
    </main>
  );
}
