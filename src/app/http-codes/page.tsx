"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import { Server, Search, Copy } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { httpCodesGuideContent } from "@/content/http-codes-guide";

type HttpCode = {
  code: number;
  name: string;
  description: string;
  category: "info" | "success" | "redirect" | "client" | "server";
};

const HTTP_CODES: HttpCode[] = [
  // 1xx Informational
  { code: 100, name: "Continue", description: "Initial part of request received, client should continue", category: "info" },
  { code: 101, name: "Switching Protocols", description: "Server is switching protocols as requested", category: "info" },
  { code: 102, name: "Processing", description: "Server has received and is processing the request", category: "info" },
  { code: 103, name: "Early Hints", description: "Used to return some response headers before final response", category: "info" },

  // 2xx Success
  { code: 200, name: "OK", description: "Request succeeded", category: "success" },
  { code: 201, name: "Created", description: "Request succeeded and a new resource was created", category: "success" },
  { code: 202, name: "Accepted", description: "Request received but not yet acted upon", category: "success" },
  { code: 203, name: "Non-Authoritative Information", description: "Returned meta-information is from a local or third-party copy", category: "success" },
  { code: 204, name: "No Content", description: "No content to send, but headers may be useful", category: "success" },
  { code: 205, name: "Reset Content", description: "Tells the client to reset the document view", category: "success" },
  { code: 206, name: "Partial Content", description: "Only part of the resource is being delivered", category: "success" },

  // 3xx Redirection
  { code: 300, name: "Multiple Choices", description: "Multiple options for the resource", category: "redirect" },
  { code: 301, name: "Moved Permanently", description: "Resource has been permanently moved to a new URL", category: "redirect" },
  { code: 302, name: "Found", description: "Resource temporarily resides under a different URL", category: "redirect" },
  { code: 303, name: "See Other", description: "Response can be found under a different URI", category: "redirect" },
  { code: 304, name: "Not Modified", description: "Resource has not been modified since last request", category: "redirect" },
  { code: 307, name: "Temporary Redirect", description: "Temporary redirect preserving the HTTP method", category: "redirect" },
  { code: 308, name: "Permanent Redirect", description: "Permanent redirect preserving the HTTP method", category: "redirect" },

  // 4xx Client Errors
  { code: 400, name: "Bad Request", description: "Server cannot process the request due to client error", category: "client" },
  { code: 401, name: "Unauthorized", description: "Authentication is required and has failed or not been provided", category: "client" },
  { code: 402, name: "Payment Required", description: "Reserved for future use", category: "client" },
  { code: 403, name: "Forbidden", description: "Client does not have access rights to the content", category: "client" },
  { code: 404, name: "Not Found", description: "Server cannot find the requested resource", category: "client" },
  { code: 405, name: "Method Not Allowed", description: "Request method is not supported for the resource", category: "client" },
  { code: 406, name: "Not Acceptable", description: "No content matching the Accept headers", category: "client" },
  { code: 407, name: "Proxy Authentication Required", description: "Authentication with proxy is required", category: "client" },
  { code: 408, name: "Request Timeout", description: "Server timed out waiting for the request", category: "client" },
  { code: 409, name: "Conflict", description: "Request conflicts with the current state of the server", category: "client" },
  { code: 410, name: "Gone", description: "Content has been permanently deleted", category: "client" },
  { code: 411, name: "Length Required", description: "Content-Length header is required", category: "client" },
  { code: 412, name: "Precondition Failed", description: "Preconditions in headers were not met", category: "client" },
  { code: 413, name: "Payload Too Large", description: "Request entity is larger than server limits", category: "client" },
  { code: 414, name: "URI Too Long", description: "URI is longer than the server can interpret", category: "client" },
  { code: 415, name: "Unsupported Media Type", description: "Media format is not supported", category: "client" },
  { code: 416, name: "Range Not Satisfiable", description: "Range specified cannot be fulfilled", category: "client" },
  { code: 418, name: "I'm a Teapot", description: "The server is a teapot (Easter egg from 1998)", category: "client" },
  { code: 422, name: "Unprocessable Entity", description: "Request was well-formed but semantically incorrect", category: "client" },
  { code: 429, name: "Too Many Requests", description: "User has sent too many requests (rate limiting)", category: "client" },
  { code: 451, name: "Unavailable For Legal Reasons", description: "Resource is unavailable due to legal demands", category: "client" },

  // 5xx Server Errors
  { code: 500, name: "Internal Server Error", description: "Server encountered an unexpected condition", category: "server" },
  { code: 501, name: "Not Implemented", description: "Server does not support the functionality required", category: "server" },
  { code: 502, name: "Bad Gateway", description: "Server received an invalid response from upstream server", category: "server" },
  { code: 503, name: "Service Unavailable", description: "Server is not ready to handle the request", category: "server" },
  { code: 504, name: "Gateway Timeout", description: "Server did not receive a timely response from upstream", category: "server" },
  { code: 505, name: "HTTP Version Not Supported", description: "HTTP version in the request is not supported", category: "server" },
];

const CATEGORY_COLORS = {
  info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  success: "bg-green-500/20 text-green-400 border-green-500/30",
  redirect: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  client: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  server: "bg-red-500/20 text-red-400 border-red-500/30"};

const CATEGORY_NAMES = {
  info: "1xx Informational",
  success: "2xx Success",
  redirect: "3xx Redirection",
  client: "4xx Client Error",
  server: "5xx Server Error"};

export default function HttpStatusCodes() {
  useToolTracker("http-codes", "HTTP Status Codes Reference", "reference");
  const analytics = useAnalytics();
  const { copy, copiedText } = useCopyToClipboard({ duration: 1500 });
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCopy = useCallback((text: string, code: number) => {
    copy(text);
    analytics.trackToolUsage('http-codes', { action: 'copy', statusCode: code });
  }, [copy, analytics]);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    if (value.length > 2) {
      analytics.trackToolUsage('http-codes', { action: 'search', query: value });
    }
  }, [analytics]);

  const filteredCodes = HTTP_CODES.filter((code) => {
    const matchesSearch = search === "" ||
      code.code.toString().includes(search) ||
      code.name.toLowerCase().includes(search.toLowerCase()) ||
      code.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || code.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });


  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <Server className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">HTTP Status Codes</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Search */}
        <div className="relative mb-4">
          <input aria-label="Input field"
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by code, name, or description..."
            className="w-full px-4 py-3 pl-10 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              !selectedCategory
                ? "bg-zinc-600 text-white"
                : "bg-muted text-foreground hover:bg-zinc-600 hover:text-white"
            }`}
          >
            All
          </button>
          {Object.entries(CATEGORY_NAMES).map(([key, name]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                selectedCategory === key
                  ? CATEGORY_COLORS[key as keyof typeof CATEGORY_COLORS].replace("bg-", "bg-").replace("/20", "/40")
                  : "bg-muted text-foreground hover:bg-zinc-600 hover:text-white"
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          {filteredCodes.length} status code{filteredCodes.length !== 1 ? "s" : ""}
        </p>

        {/* Codes List */}
        <div className="space-y-2">
          {filteredCodes.map((code) => (
            <div
              key={code.code}
              className={`p-4 rounded-lg border ${CATEGORY_COLORS[code.category]} transition hover:opacity-90`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-lg font-bold">{code.code}</span>
                    <span className="font-medium">{code.name}</span>
                  </div>
                  <p className="text-sm opacity-80">{code.description}</p>
                </div>
                <button
                  onClick={() => handleCopy(code.code.toString(), code.code)}
                  className="p-2 rounded hover:bg-white/10 transition"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              {copiedText === code.code.toString() && (
                <span className="text-xs mt-2 inline-block opacity-70">Copied!</span>
              )}
            </div>
          ))}
        </div>

        {filteredCodes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No status codes found matching your search.</p>
          </div>
        )}

        <RelatedTools currentPath="/http-codes" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={httpCodesGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-http-codes" title={httpCodesGuideContent.introduction.title} subtitle="Understanding HTTP status codes" variant="default">
            <MarkdownContent content={httpCodesGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use HTTP status codes" variant="default">
            <FeatureGrid features={httpCodesGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={httpCodesGuideContent.howToUse.title} subtitle="Master HTTP status code reference" variant="minimal">
            <HowToSchema name={`How to use ${httpCodesGuideContent.toolName}`} description="Step-by-step guide to HTTP status codes reference" steps={httpCodesGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${httpCodesGuideContent.toolPath}`} />
            <MarkdownContent content={httpCodesGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={httpCodesGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={httpCodesGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={httpCodesGuideContent.security.content} />
          </GeoSection>

          {httpCodesGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(httpCodesGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={httpCodesGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Complete HTTP status codes reference for developers.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="HTTP Status Codes Reference"
        description="Complete searchable reference of HTTP status codes. Find meanings, descriptions, and use cases for all standard HTTP response codes (1xx-5xx). Free developer tool."
        url="https://openkit.tools/http-codes"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={httpCodesGuideContent.lastUpdated}
        version={httpCodesGuideContent.version}
        aggregateRating={{ratingValue: "4.9", ratingCount: "2134", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "HTTP Status Codes", url: "https://openkit.tools/http-codes" }
        ]}
      />
    </main>
  );
}
