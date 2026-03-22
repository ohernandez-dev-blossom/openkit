"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LabeledInput } from "@/components/ui/labeled-input";
import { Textarea } from "@/components/ui/textarea";
import { RelatedTools } from "@/components/related-tools";
import { Terminal, Copy, Check, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
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
import { curlBuilderGuideContent } from "@/content/curl-builder-guide";

type Header = { key: string; value: string; enabled: boolean };
type QueryParam = { key: string; value: string; enabled: boolean };

const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"] as const;
type HttpMethod = (typeof HTTP_METHODS)[number];

type AuthType = "none" | "bearer" | "basic" | "api-key";
type BodyType = "none" | "json" | "form" | "raw";

const PRESETS = [
  {
    name: "GitHub API",
    method: "GET" as HttpMethod,
    url: "https://api.github.com/users/octocat",
    headers: [{ key: "Accept", value: "application/vnd.github.v3+json", enabled: true }],
    auth: "none" as AuthType,
  },
  {
    name: "JSONPlaceholder POST",
    method: "POST" as HttpMethod,
    url: "https://jsonplaceholder.typicode.com/posts",
    headers: [{ key: "Content-Type", value: "application/json", enabled: true }],
    body: JSON.stringify({ title: "foo", body: "bar", userId: 1 }, null, 2),
    bodyType: "json" as BodyType,
    auth: "none" as AuthType,
  },
  {
    name: "httpbin POST Form",
    method: "POST" as HttpMethod,
    url: "https://httpbin.org/post",
    headers: [],
    body: "username=admin&password=secret",
    bodyType: "form" as BodyType,
    auth: "none" as AuthType,
  },
];

function escapeShell(str: string): string {
  if (!/[^a-zA-Z0-9@%+=:,./-]/.test(str)) return str;
  return "'" + str.replace(/'/g, "'\\''") + "'";
}

export default function CurlBuilder() {
  useToolTracker("curl-builder", "cURL Builder", "devtools");
  const analytics = useAnalytics();
  const { copy, isCopied } = useCopyToClipboard({ duration: 1500 });

  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState("https://api.example.com/endpoint");
  const [headers, setHeaders] = useState<Header[]>([
    { key: "Content-Type", value: "application/json", enabled: true },
  ]);
  const [queryParams, setQueryParams] = useState<QueryParam[]>([]);
  const [authType, setAuthType] = useState<AuthType>("none");
  const [authToken, setAuthToken] = useState("");
  const [basicUser, setBasicUser] = useState("");
  const [basicPass, setBasicPass] = useState("");
  const [apiKeyHeader, setApiKeyHeader] = useState("X-API-Key");
  const [apiKeyValue, setApiKeyValue] = useState("");
  const [bodyType, setBodyType] = useState<BodyType>("none");
  const [body, setBody] = useState("");
  const [followRedirects, setFollowRedirects] = useState(false);
  const [insecure, setInsecure] = useState(false);
  const [verbose, setVerbose] = useState(false);
  const [silent, setSilent] = useState(false);
  const [timeout, setTimeout_] = useState("");
  const [compressed, setCompressed] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const addHeader = () => setHeaders([...headers, { key: "", value: "", enabled: true }]);
  const removeHeader = (i: number) => setHeaders(headers.filter((_, idx) => idx !== i));
  const updateHeader = (i: number, field: keyof Header, val: string | boolean) =>
    setHeaders(headers.map((h, idx) => (idx === i ? { ...h, [field]: val } : h)));

  const addParam = () => setQueryParams([...queryParams, { key: "", value: "", enabled: true }]);
  const removeParam = (i: number) => setQueryParams(queryParams.filter((_, idx) => idx !== i));
  const updateParam = (i: number, field: keyof QueryParam, val: string | boolean) =>
    setQueryParams(queryParams.map((p, idx) => (idx === i ? { ...p, [field]: val } : p)));

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setMethod(preset.method);
    setUrl(preset.url);
    setHeaders(preset.headers.map((h) => ({ ...h, enabled: true })));
    setAuthType(preset.auth);
    if (preset.body) {
      setBody(preset.body);
      setBodyType(preset.bodyType || "json");
    } else {
      setBody("");
      setBodyType("none");
    }
    setQueryParams([]);
  };

  const curlCommand = useMemo(() => {
    const parts: string[] = ["curl"];

    if (method !== "GET") parts.push(`-X ${method}`);

    // Build URL with query params
    let fullUrl = url;
    const enabledParams = queryParams.filter((p) => p.enabled && p.key);
    if (enabledParams.length > 0) {
      const qs = enabledParams.map((p) => `${encodeURIComponent(p.key)}=${encodeURIComponent(p.value)}`).join("&");
      fullUrl += (fullUrl.includes("?") ? "&" : "?") + qs;
    }
    parts.push(escapeShell(fullUrl));

    // Headers
    const enabledHeaders = headers.filter((h) => h.enabled && h.key);
    for (const h of enabledHeaders) {
      parts.push(`-H ${escapeShell(`${h.key}: ${h.value}`)}`);
    }

    // Auth
    if (authType === "bearer" && authToken) {
      parts.push(`-H ${escapeShell(`Authorization: Bearer ${authToken}`)}`);
    } else if (authType === "basic" && basicUser) {
      parts.push(`-u ${escapeShell(`${basicUser}:${basicPass}`)}`);
    } else if (authType === "api-key" && apiKeyValue) {
      parts.push(`-H ${escapeShell(`${apiKeyHeader}: ${apiKeyValue}`)}`);
    }

    // Body
    if (bodyType !== "none" && body && method !== "GET" && method !== "HEAD") {
      if (bodyType === "form") {
        parts.push(`--data ${escapeShell(body)}`);
      } else {
        parts.push(`-d ${escapeShell(body)}`);
      }
    }

    // Options
    if (followRedirects) parts.push("-L");
    if (insecure) parts.push("-k");
    if (verbose) parts.push("-v");
    if (silent) parts.push("-s");
    if (compressed) parts.push("--compressed");
    if (timeout) parts.push(`--connect-timeout ${timeout}`);

    return parts.join(" \\\n  ");
  }, [method, url, headers, queryParams, authType, authToken, basicUser, basicPass, apiKeyHeader, apiKeyValue, bodyType, body, followRedirects, insecure, verbose, silent, compressed, timeout]);

  const handleCopy = useCallback(() => {
    copy(curlCommand);
    analytics.trackToolUsage("curl-builder", { action: "copy", method });
  }, [copy, curlCommand, analytics, method]);

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-8 space-y-8">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Terminal className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">cURL Builder</h1>
              <p className="text-muted-foreground">
                Build cURL commands visually — method, headers, auth, body, and options
              </p>
            </div>
          </div>
        </header>

        {/* Presets */}
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => applyPreset(p)}
              className="px-3 py-1.5 text-sm rounded-md bg-muted hover:bg-muted/70 transition font-medium"
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Method & URL */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex gap-2">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as HttpMethod)}
                className="px-3 py-2 rounded-md bg-muted text-sm font-mono font-bold border-none focus:ring-2 focus:ring-primary"
              >
                {HTTP_METHODS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/endpoint"
                className="flex-1 px-3 py-2 rounded-md bg-muted text-sm font-mono border-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Query Parameters */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Query Parameters</CardTitle>
              <Button variant="ghost" size="sm" onClick={addParam}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
          </CardHeader>
          {queryParams.length > 0 && (
            <CardContent className="space-y-2">
              {queryParams.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={p.enabled}
                    onChange={(e) => updateParam(i, "enabled", e.target.checked)}
                    className="rounded"
                  />
                  <input
                    value={p.key}
                    onChange={(e) => updateParam(i, "key", e.target.value)}
                    placeholder="key"
                    className="flex-1 px-2 py-1.5 rounded-md bg-muted text-sm font-mono"
                  />
                  <input
                    value={p.value}
                    onChange={(e) => updateParam(i, "value", e.target.value)}
                    placeholder="value"
                    className="flex-1 px-2 py-1.5 rounded-md bg-muted text-sm font-mono"
                  />
                  <Button variant="ghost" size="sm" onClick={() => removeParam(i)}>
                    <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                  </Button>
                </div>
              ))}
            </CardContent>
          )}
        </Card>

        {/* Headers */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Headers</CardTitle>
              <Button variant="ghost" size="sm" onClick={addHeader}>
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {headers.map((h, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={h.enabled}
                  onChange={(e) => updateHeader(i, "enabled", e.target.checked)}
                  className="rounded"
                />
                <input
                  value={h.key}
                  onChange={(e) => updateHeader(i, "key", e.target.value)}
                  placeholder="Header-Name"
                  className="flex-1 px-2 py-1.5 rounded-md bg-muted text-sm font-mono"
                />
                <input
                  value={h.value}
                  onChange={(e) => updateHeader(i, "value", e.target.value)}
                  placeholder="value"
                  className="flex-1 px-2 py-1.5 rounded-md bg-muted text-sm font-mono"
                />
                <Button variant="ghost" size="sm" onClick={() => removeHeader(i)}>
                  <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Auth */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Authentication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(["none", "bearer", "basic", "api-key"] as AuthType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setAuthType(t)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                    authType === t
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {t === "none" ? "None" : t === "bearer" ? "Bearer Token" : t === "basic" ? "Basic Auth" : "API Key"}
                </button>
              ))}
            </div>

            {authType === "bearer" && (
              <LabeledInput label="Token" value={authToken} onChange={(e) => setAuthToken(e.target.value)} placeholder="your-jwt-token" />
            )}
            {authType === "basic" && (
              <div className="grid grid-cols-2 gap-3">
                <LabeledInput label="Username" value={basicUser} onChange={(e) => setBasicUser(e.target.value)} placeholder="user" />
                <LabeledInput label="Password" value={basicPass} onChange={(e) => setBasicPass(e.target.value)} placeholder="pass" type="password" />
              </div>
            )}
            {authType === "api-key" && (
              <div className="grid grid-cols-2 gap-3">
                <LabeledInput label="Header Name" value={apiKeyHeader} onChange={(e) => setApiKeyHeader(e.target.value)} placeholder="X-API-Key" />
                <LabeledInput label="API Key" value={apiKeyValue} onChange={(e) => setApiKeyValue(e.target.value)} placeholder="your-api-key" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Body */}
        {method !== "GET" && method !== "HEAD" && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Request Body</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {(["none", "json", "form", "raw"] as BodyType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setBodyType(t)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                      bodyType === t
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}
                  >
                    {t === "none" ? "None" : t === "json" ? "JSON" : t === "form" ? "Form Data" : "Raw"}
                  </button>
                ))}
              </div>
              {bodyType !== "none" && (
                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder={bodyType === "json" ? '{\n  "key": "value"\n}' : bodyType === "form" ? "key=value&other=data" : "raw body content"}
                  rows={6}
                  className="font-mono text-sm"
                />
              )}
            </CardContent>
          </Card>
        )}

        {/* Options */}
        <Card>
          <CardHeader className="pb-3 cursor-pointer" onClick={() => setShowOptions(!showOptions)}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Options</CardTitle>
              {showOptions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </CardHeader>
          {showOptions && (
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={followRedirects} onChange={(e) => setFollowRedirects(e.target.checked)} className="rounded" />
                  Follow redirects (-L)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={insecure} onChange={(e) => setInsecure(e.target.checked)} className="rounded" />
                  Insecure (-k)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={verbose} onChange={(e) => setVerbose(e.target.checked)} className="rounded" />
                  Verbose (-v)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={silent} onChange={(e) => setSilent(e.target.checked)} className="rounded" />
                  Silent (-s)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={compressed} onChange={(e) => setCompressed(e.target.checked)} className="rounded" />
                  Compressed
                </label>
                <div className="flex items-center gap-2">
                  <label className="text-sm whitespace-nowrap">Timeout (s):</label>
                  <input
                    value={timeout}
                    onChange={(e) => setTimeout_(e.target.value)}
                    placeholder="30"
                    type="number"
                    className="w-20 px-2 py-1 rounded-md bg-muted text-sm font-mono"
                  />
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Output */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Generated Command</CardTitle>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {isCopied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {isCopied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="p-4 rounded-lg bg-muted overflow-x-auto text-sm font-mono whitespace-pre-wrap break-all">
              {curlCommand}
            </pre>
          </CardContent>
        </Card>

        <RelatedTools currentPath="/curl-builder" />

        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Build your first cURL command" variant="highlight">
            <QuickStartGuide steps={curlBuilderGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is" title={curlBuilderGuideContent.introduction.title} subtitle="The universal HTTP client" variant="default">
            <MarkdownContent content={curlBuilderGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="When you need cURL" variant="default">
            <FeatureGrid features={curlBuilderGuideContent.useCases.map((uc) => ({ title: uc.title, description: uc.description }))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={curlBuilderGuideContent.howToUse.title} subtitle="Step-by-step" variant="minimal">
            <HowToSchema
              name={`How to use ${curlBuilderGuideContent.toolName}`}
              description="Build cURL commands visually"
              steps={curlBuilderGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${curlBuilderGuideContent.toolPath}`}
            />
            <MarkdownContent content={curlBuilderGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="cURL builder explained" variant="default">
            <ToolFAQ faqs={curlBuilderGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={curlBuilderGuideContent.security.title} subtitle="Your data stays local" variant="highlight">
            <MarkdownContent content={curlBuilderGuideContent.security.content} />
          </GeoSection>

          {curlBuilderGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" variant="minimal">
              <StatsBar stats={Object.entries(curlBuilderGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={curlBuilderGuideContent.lastUpdated} />
      </div>

      <StructuredData
        type="WebApplication"
        name="cURL Builder"
        description="Visual cURL command builder. Set method, URL, headers, auth, body, and options. Generate ready-to-paste curl commands for API testing."
        url="https://openkit.tools/curl-builder"
        applicationCategory="DeveloperApplication"
        datePublished="2026-02-06"
        dateModified={curlBuilderGuideContent.lastUpdated}
        version={curlBuilderGuideContent.version}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "cURL Builder", url: "https://openkit.tools/curl-builder" },
        ]}
      />
    </main>
  );
}
