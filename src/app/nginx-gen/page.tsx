"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LabeledInput } from "@/components/ui/labeled-input";
import { RelatedTools } from "@/components/related-tools";
import { Server, Copy, Check, Plus, Trash2 } from "lucide-react";
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
import { nginxGenGuideContent } from "@/content/nginx-gen-guide";

type ServerType = "reverse-proxy" | "static" | "spa" | "redirect";
type SSLMode = "none" | "letsencrypt" | "custom";
type UpstreamServer = { address: string; weight: string };

const PRESETS = [
  { name: "Reverse Proxy (Node.js)", type: "reverse-proxy" as ServerType, domain: "api.example.com", proxy: "http://127.0.0.1:3000", ssl: "letsencrypt" as SSLMode },
  { name: "Static Site", type: "static" as ServerType, domain: "www.example.com", root: "/var/www/html", ssl: "letsencrypt" as SSLMode },
  { name: "SPA (React/Vue)", type: "spa" as ServerType, domain: "app.example.com", root: "/var/www/app/dist", ssl: "letsencrypt" as SSLMode },
  { name: "HTTP → HTTPS Redirect", type: "redirect" as ServerType, domain: "example.com", ssl: "none" as SSLMode },
];

const SECURITY_HEADERS = [
  { key: "X-Frame-Options", value: "SAMEORIGIN", label: "X-Frame-Options" },
  { key: "X-Content-Type-Options", value: "nosniff", label: "X-Content-Type-Options" },
  { key: "X-XSS-Protection", value: "1; mode=block", label: "X-XSS-Protection" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin", label: "Referrer-Policy" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()", label: "Permissions-Policy" },
];

export default function NginxGen() {
  useToolTracker("nginx-gen", "Nginx Config Generator", "devtools");
  const analytics = useAnalytics();
  const { copy, isCopied } = useCopyToClipboard({ duration: 1500 });

  const [serverType, setServerType] = useState<ServerType>("reverse-proxy");
  const [domain, setDomain] = useState("example.com");
  const [listenPort, setListenPort] = useState("80");
  const [proxyPass, setProxyPass] = useState("http://127.0.0.1:3000");
  const [rootPath, setRootPath] = useState("/var/www/html");
  const [indexFiles, setIndexFiles] = useState("index.html index.htm");
  const [sslMode, setSSLMode] = useState<SSLMode>("letsencrypt");
  const [sslCert, setSSLCert] = useState("/etc/ssl/certs/cert.pem");
  const [sslKey, setSSLKey] = useState("/etc/ssl/private/key.pem");
  const [enableGzip, setEnableGzip] = useState(true);
  const [enableSecurityHeaders, setEnableSecurityHeaders] = useState(true);
  const [selectedSecHeaders, setSelectedSecHeaders] = useState<Set<string>>(new Set(SECURITY_HEADERS.map((h) => h.key)));
  const [enableCaching, setEnableCaching] = useState(true);
  const [cacheDuration, setCacheDuration] = useState("30d");
  const [enableRateLimit, setEnableRateLimit] = useState(false);
  const [rateLimit, setRateLimit] = useState("10r/s");
  const [enableWS, setEnableWS] = useState(false);
  const [enableCORS, setEnableCORS] = useState(false);
  const [corsOrigin, setCorsOrigin] = useState("*");
  const [clientMaxBody, setClientMaxBody] = useState("10m");
  const [upstreams, setUpstreams] = useState<UpstreamServer[]>([]);
  const [upstreamName, setUpstreamName] = useState("backend");
  const [redirectTarget, setRedirectTarget] = useState("https://example.com$request_uri");

  const addUpstream = () => setUpstreams([...upstreams, { address: "127.0.0.1:3001", weight: "1" }]);
  const removeUpstream = (i: number) => setUpstreams(upstreams.filter((_, idx) => idx !== i));
  const updateUpstream = (i: number, field: keyof UpstreamServer, val: string) =>
    setUpstreams(upstreams.map((u, idx) => (idx === i ? { ...u, [field]: val } : u)));

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setServerType(preset.type);
    setDomain(preset.domain);
    setSSLMode(preset.ssl);
    if (preset.proxy) setProxyPass(preset.proxy);
    if (preset.root) setRootPath(preset.root);
    if (preset.type === "redirect") setRedirectTarget(`https://${preset.domain}$request_uri`);
  };

  const toggleSecHeader = (key: string) => {
    setSelectedSecHeaders((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const config = useMemo(() => {
    const lines: string[] = [];
    const indent = (n: number) => "    ".repeat(n);
    const useSSL = sslMode !== "none";
    const certPath = sslMode === "letsencrypt" ? `/etc/letsencrypt/live/${domain}/fullchain.pem` : sslCert;
    const keyPath = sslMode === "letsencrypt" ? `/etc/letsencrypt/live/${domain}/privkey.pem` : sslKey;

    // Upstream block for load balancing
    if (upstreams.length > 0 && serverType === "reverse-proxy") {
      lines.push(`upstream ${upstreamName} {`);
      lines.push(`${indent(1)}server ${proxyPass.replace(/^https?:\/\//, "")} weight=1;`);
      for (const u of upstreams) {
        lines.push(`${indent(1)}server ${u.address}${u.weight !== "1" ? ` weight=${u.weight}` : ""};`);
      }
      lines.push("}");
      lines.push("");
    }

    // Rate limit zone
    if (enableRateLimit) {
      lines.push(`limit_req_zone $binary_remote_addr zone=ratelimit:10m rate=${rateLimit};`);
      lines.push("");
    }

    // HTTP → HTTPS redirect
    if (useSSL && serverType !== "redirect") {
      lines.push("server {");
      lines.push(`${indent(1)}listen 80;`);
      lines.push(`${indent(1)}listen [::]:80;`);
      lines.push(`${indent(1)}server_name ${domain};`);
      lines.push("");
      if (sslMode === "letsencrypt") {
        lines.push(`${indent(1)}location /.well-known/acme-challenge/ {`);
        lines.push(`${indent(2)}root /var/www/certbot;`);
        lines.push(`${indent(1)}}`);
        lines.push("");
      }
      lines.push(`${indent(1)}return 301 https://$host$request_uri;`);
      lines.push("}");
      lines.push("");
    }

    // Redirect-only server
    if (serverType === "redirect") {
      lines.push("server {");
      lines.push(`${indent(1)}listen ${listenPort};`);
      lines.push(`${indent(1)}listen [::]:${listenPort};`);
      lines.push(`${indent(1)}server_name ${domain};`);
      lines.push("");
      lines.push(`${indent(1)}return 301 ${redirectTarget};`);
      lines.push("}");
      return lines.join("\n");
    }

    // Main server block
    lines.push("server {");
    if (useSSL) {
      lines.push(`${indent(1)}listen 443 ssl http2;`);
      lines.push(`${indent(1)}listen [::]:443 ssl http2;`);
    } else {
      lines.push(`${indent(1)}listen ${listenPort};`);
      lines.push(`${indent(1)}listen [::]:${listenPort};`);
    }
    lines.push(`${indent(1)}server_name ${domain};`);
    lines.push("");

    // SSL
    if (useSSL) {
      lines.push(`${indent(1)}# SSL Configuration`);
      lines.push(`${indent(1)}ssl_certificate ${certPath};`);
      lines.push(`${indent(1)}ssl_certificate_key ${keyPath};`);
      lines.push(`${indent(1)}ssl_protocols TLSv1.2 TLSv1.3;`);
      lines.push(`${indent(1)}ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;`);
      lines.push(`${indent(1)}ssl_prefer_server_ciphers off;`);
      lines.push(`${indent(1)}ssl_session_cache shared:SSL:10m;`);
      lines.push(`${indent(1)}ssl_session_timeout 1d;`);
      if (sslMode === "letsencrypt") {
        lines.push(`${indent(1)}ssl_stapling on;`);
        lines.push(`${indent(1)}ssl_stapling_verify on;`);
      }
      lines.push("");
    }

    // Client body size
    lines.push(`${indent(1)}client_max_body_size ${clientMaxBody};`);
    lines.push("");

    // Security headers
    if (enableSecurityHeaders) {
      lines.push(`${indent(1)}# Security Headers`);
      for (const h of SECURITY_HEADERS) {
        if (selectedSecHeaders.has(h.key)) {
          lines.push(`${indent(1)}add_header ${h.key} "${h.value}" always;`);
        }
      }
      if (useSSL) {
        lines.push(`${indent(1)}add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;`);
      }
      lines.push("");
    }

    // Gzip
    if (enableGzip) {
      lines.push(`${indent(1)}# Gzip Compression`);
      lines.push(`${indent(1)}gzip on;`);
      lines.push(`${indent(1)}gzip_vary on;`);
      lines.push(`${indent(1)}gzip_proxied any;`);
      lines.push(`${indent(1)}gzip_comp_level 6;`);
      lines.push(`${indent(1)}gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss application/atom+xml image/svg+xml;`);
      lines.push("");
    }

    // Rate limiting
    if (enableRateLimit) {
      lines.push(`${indent(1)}# Rate Limiting`);
      lines.push(`${indent(1)}limit_req zone=ratelimit burst=20 nodelay;`);
      lines.push("");
    }

    // CORS
    if (enableCORS) {
      lines.push(`${indent(1)}# CORS`);
      lines.push(`${indent(1)}add_header Access-Control-Allow-Origin "${corsOrigin}" always;`);
      lines.push(`${indent(1)}add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;`);
      lines.push(`${indent(1)}add_header Access-Control-Allow-Headers "Authorization, Content-Type, Accept" always;`);
      lines.push("");
      lines.push(`${indent(1)}if ($request_method = 'OPTIONS') {`);
      lines.push(`${indent(2)}return 204;`);
      lines.push(`${indent(1)}}`);
      lines.push("");
    }

    // Location blocks based on type
    if (serverType === "reverse-proxy") {
      const target = upstreams.length > 0 ? `http://${upstreamName}` : proxyPass;
      lines.push(`${indent(1)}location / {`);
      lines.push(`${indent(2)}proxy_pass ${target};`);
      lines.push(`${indent(2)}proxy_http_version 1.1;`);
      lines.push(`${indent(2)}proxy_set_header Host $host;`);
      lines.push(`${indent(2)}proxy_set_header X-Real-IP $remote_addr;`);
      lines.push(`${indent(2)}proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;`);
      lines.push(`${indent(2)}proxy_set_header X-Forwarded-Proto $scheme;`);
      if (enableWS) {
        lines.push(`${indent(2)}proxy_set_header Upgrade $http_upgrade;`);
        lines.push(`${indent(2)}proxy_set_header Connection "upgrade";`);
      }
      lines.push(`${indent(1)}}`);
    } else if (serverType === "static") {
      lines.push(`${indent(1)}root ${rootPath};`);
      lines.push(`${indent(1)}index ${indexFiles};`);
      lines.push("");
      lines.push(`${indent(1)}location / {`);
      lines.push(`${indent(2)}try_files $uri $uri/ =404;`);
      lines.push(`${indent(1)}}`);
    } else if (serverType === "spa") {
      lines.push(`${indent(1)}root ${rootPath};`);
      lines.push(`${indent(1)}index index.html;`);
      lines.push("");
      lines.push(`${indent(1)}location / {`);
      lines.push(`${indent(2)}try_files $uri $uri/ /index.html;`);
      lines.push(`${indent(1)}}`);
    }

    // Static asset caching
    if (enableCaching) {
      lines.push("");
      lines.push(`${indent(1)}# Static Asset Caching`);
      lines.push(`${indent(1)}location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {`);
      if (serverType === "static" || serverType === "spa") {
        lines.push(`${indent(2)}try_files $uri =404;`);
      } else {
        lines.push(`${indent(2)}proxy_pass ${upstreams.length > 0 ? `http://${upstreamName}` : proxyPass};`);
      }
      lines.push(`${indent(2)}expires ${cacheDuration};`);
      lines.push(`${indent(2)}add_header Cache-Control "public, immutable";`);
      lines.push(`${indent(2)}access_log off;`);
      lines.push(`${indent(1)}}`);
    }

    // Deny dotfiles
    lines.push("");
    lines.push(`${indent(1)}# Deny hidden files`);
    lines.push(`${indent(1)}location ~ /\\. {`);
    lines.push(`${indent(2)}deny all;`);
    lines.push(`${indent(2)}access_log off;`);
    lines.push(`${indent(2)}log_not_found off;`);
    lines.push(`${indent(1)}}`);

    // Logging
    lines.push("");
    lines.push(`${indent(1)}access_log /var/log/nginx/${domain}.access.log;`);
    lines.push(`${indent(1)}error_log /var/log/nginx/${domain}.error.log;`);

    lines.push("}");
    return lines.join("\n");
  }, [serverType, domain, listenPort, proxyPass, rootPath, indexFiles, sslMode, sslCert, sslKey, enableGzip, enableSecurityHeaders, selectedSecHeaders, enableCaching, cacheDuration, enableRateLimit, rateLimit, enableWS, enableCORS, corsOrigin, clientMaxBody, upstreams, upstreamName, redirectTarget]);

  const handleCopy = useCallback(() => {
    copy(config);
    analytics.trackToolUsage("nginx-gen", { action: "copy", type: serverType });
  }, [copy, config, analytics, serverType]);

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-8 space-y-8">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Server className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Nginx Config Generator</h1>
              <p className="text-muted-foreground">
                Generate Nginx server blocks visually — reverse proxy, static sites, SSL, security headers
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

        {/* Server Type */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Server Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {([
                { value: "reverse-proxy", label: "Reverse Proxy", desc: "Proxy to backend app" },
                { value: "static", label: "Static Site", desc: "Serve static files" },
                { value: "spa", label: "SPA", desc: "React/Vue/Angular" },
                { value: "redirect", label: "Redirect", desc: "301/302 redirect" },
              ] as const).map((t) => (
                <button
                  key={t.value}
                  onClick={() => setServerType(t.value)}
                  className={`p-3 rounded-lg text-left transition ${
                    serverType === t.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/70"
                  }`}
                >
                  <div className="font-medium text-sm">{t.label}</div>
                  <div className={`text-xs ${serverType === t.value ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{t.desc}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Basic Config */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Basic Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <LabeledInput label="Domain" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="example.com" />
              {!["redirect"].includes(serverType) && sslMode === "none" && (
                <LabeledInput label="Listen Port" value={listenPort} onChange={(e) => setListenPort(e.target.value)} placeholder="80" />
              )}
            </div>

            {serverType === "reverse-proxy" && (
              <LabeledInput label="Proxy Pass" value={proxyPass} onChange={(e) => setProxyPass(e.target.value)} placeholder="http://127.0.0.1:3000" />
            )}

            {(serverType === "static" || serverType === "spa") && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LabeledInput label="Root Path" value={rootPath} onChange={(e) => setRootPath(e.target.value)} placeholder="/var/www/html" />
                {serverType === "static" && (
                  <LabeledInput label="Index Files" value={indexFiles} onChange={(e) => setIndexFiles(e.target.value)} placeholder="index.html index.htm" />
                )}
              </div>
            )}

            {serverType === "redirect" && (
              <LabeledInput label="Redirect Target" value={redirectTarget} onChange={(e) => setRedirectTarget(e.target.value)} placeholder="https://example.com$request_uri" />
            )}

            <LabeledInput label="Client Max Body Size" value={clientMaxBody} onChange={(e) => setClientMaxBody(e.target.value)} placeholder="10m" />
          </CardContent>
        </Card>

        {/* SSL */}
        {serverType !== "redirect" && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">SSL / TLS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {([
                  { value: "none", label: "No SSL" },
                  { value: "letsencrypt", label: "Let's Encrypt" },
                  { value: "custom", label: "Custom Cert" },
                ] as const).map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSSLMode(s.value)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                      sslMode === s.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              {sslMode === "custom" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <LabeledInput label="Certificate Path" value={sslCert} onChange={(e) => setSSLCert(e.target.value)} placeholder="/etc/ssl/certs/cert.pem" />
                  <LabeledInput label="Key Path" value={sslKey} onChange={(e) => setSSLKey(e.target.value)} placeholder="/etc/ssl/private/key.pem" />
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Load Balancing */}
        {serverType === "reverse-proxy" && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Load Balancing (Optional)</CardTitle>
                <Button variant="ghost" size="sm" onClick={addUpstream}>
                  <Plus className="w-4 h-4 mr-1" /> Add Server
                </Button>
              </div>
            </CardHeader>
            {upstreams.length > 0 && (
              <CardContent className="space-y-3">
                <LabeledInput label="Upstream Name" value={upstreamName} onChange={(e) => setUpstreamName(e.target.value)} placeholder="backend" />
                <p className="text-xs text-muted-foreground">Primary: {proxyPass} (weight: 1)</p>
                {upstreams.map((u, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={u.address}
                      onChange={(e) => updateUpstream(i, "address", e.target.value)}
                      placeholder="127.0.0.1:3001"
                      className="flex-1 px-2 py-1.5 rounded-md bg-muted text-sm font-mono"
                    />
                    <input
                      value={u.weight}
                      onChange={(e) => updateUpstream(i, "weight", e.target.value)}
                      placeholder="1"
                      className="w-20 px-2 py-1.5 rounded-md bg-muted text-sm font-mono"
                    />
                    <Button variant="ghost" size="sm" onClick={() => removeUpstream(i)}>
                      <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            )}
          </Card>
        )}

        {/* Features */}
        {serverType !== "redirect" && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={enableGzip} onChange={(e) => setEnableGzip(e.target.checked)} className="rounded" />
                  Gzip Compression
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={enableCaching} onChange={(e) => setEnableCaching(e.target.checked)} className="rounded" />
                  Static Caching
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={enableSecurityHeaders} onChange={(e) => setEnableSecurityHeaders(e.target.checked)} className="rounded" />
                  Security Headers
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={enableRateLimit} onChange={(e) => setEnableRateLimit(e.target.checked)} className="rounded" />
                  Rate Limiting
                </label>
                {serverType === "reverse-proxy" && (
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={enableWS} onChange={(e) => setEnableWS(e.target.checked)} className="rounded" />
                    WebSocket Support
                  </label>
                )}
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={enableCORS} onChange={(e) => setEnableCORS(e.target.checked)} className="rounded" />
                  CORS Headers
                </label>
              </div>

              {enableCaching && (
                <LabeledInput label="Cache Duration" value={cacheDuration} onChange={(e) => setCacheDuration(e.target.value)} placeholder="30d" />
              )}
              {enableRateLimit && (
                <LabeledInput label="Rate Limit" value={rateLimit} onChange={(e) => setRateLimit(e.target.value)} placeholder="10r/s" />
              )}
              {enableCORS && (
                <LabeledInput label="CORS Origin" value={corsOrigin} onChange={(e) => setCorsOrigin(e.target.value)} placeholder="*" />
              )}

              {enableSecurityHeaders && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Security Headers</label>
                  <div className="flex flex-wrap gap-2">
                    {SECURITY_HEADERS.map((h) => (
                      <button
                        key={h.key}
                        onClick={() => toggleSecHeader(h.key)}
                        className={`px-2 py-1 rounded text-xs font-medium transition ${
                          selectedSecHeaders.has(h.key)
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {h.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Output */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Generated Configuration</CardTitle>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {isCopied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {isCopied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="p-4 rounded-lg bg-muted overflow-x-auto text-sm font-mono whitespace-pre-wrap">
              {config}
            </pre>
            <p className="mt-3 text-xs text-muted-foreground">
              Save to <code className="bg-muted px-1 py-0.5 rounded">/etc/nginx/sites-available/{domain}</code> →{" "}
              <code className="bg-muted px-1 py-0.5 rounded">sudo nginx -t && sudo systemctl reload nginx</code>
            </p>
          </CardContent>
        </Card>

        <RelatedTools currentPath="/nginx-gen" />

        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Generate your config in seconds" variant="highlight">
            <QuickStartGuide steps={nginxGenGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is" title={nginxGenGuideContent.introduction.title} subtitle="The web's most popular server" variant="default">
            <MarkdownContent content={nginxGenGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" variant="default">
            <FeatureGrid features={nginxGenGuideContent.useCases.map((uc) => ({ title: uc.title, description: uc.description }))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={nginxGenGuideContent.howToUse.title} variant="minimal">
            <HowToSchema
              name={`How to use ${nginxGenGuideContent.toolName}`}
              description="Generate Nginx configurations visually"
              steps={nginxGenGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${nginxGenGuideContent.toolPath}`}
            />
            <MarkdownContent content={nginxGenGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" variant="default">
            <ToolFAQ faqs={nginxGenGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={nginxGenGuideContent.security.title} variant="highlight">
            <MarkdownContent content={nginxGenGuideContent.security.content} />
          </GeoSection>

          {nginxGenGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" variant="minimal">
              <StatsBar stats={Object.entries(nginxGenGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={nginxGenGuideContent.lastUpdated} />
      </div>

      <StructuredData
        type="WebApplication"
        name="Nginx Config Generator"
        description="Generate Nginx server block configurations visually. Reverse proxy, static sites, SSL/TLS, load balancing, security headers."
        url="https://openkit.tools/nginx-gen"
        applicationCategory="DeveloperApplication"
        datePublished="2026-02-06"
        dateModified={nginxGenGuideContent.lastUpdated}
        version={nginxGenGuideContent.version}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "Nginx Config Generator", url: "https://openkit.tools/nginx-gen" },
        ]}
      />
    </main>
  );
}
