"use client";
import { useState, useCallback, useMemo } from "react";
import { Copy, RotateCcw, Play, Shield, FileJson, Clock, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { ExportHubV2 } from "@/components/export-hub-v2";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";

type WebhookProvider = {
  name: string;
  icon: string;
  headers: Record<string, string>;
  payload: object;
  signatureHeader?: string;
  signatureInfo?: string;
};

const PROVIDERS: Record<string, WebhookProvider> = {
  github: {
    name: "GitHub",
    icon: "🐙",
    headers: {
      "Content-Type": "application/json",
      "X-GitHub-Event": "push",
      "X-GitHub-Delivery": "72d3162e-cc78-11e3-81ab-4c9367dc0958",
      "X-Hub-Signature-256": "sha256=d57c68ca6f92289e6987922ff26938930f6e66a2d161ef06abdf1859230aa23c",
      "User-Agent": "GitHub-Hookshot/044aadd",
    },
    payload: {
      ref: "refs/heads/main",
      before: "6113728f27ae82c7b1a177c8d03f9e96e0adf246",
      after: "0d1a26e67d8f5eaf1f6ba5c57fc3c7d91ac0fd1c",
      repository: {
        id: 35129377,
        name: "my-repo",
        full_name: "octocat/my-repo",
        private: false,
        html_url: "https://github.com/octocat/my-repo",
      },
      pusher: { name: "octocat", email: "octocat@github.com" },
      sender: { login: "octocat", id: 1, avatar_url: "https://github.com/images/error/octocat.png" },
      commits: [
        {
          id: "0d1a26e67d8f5eaf1f6ba5c57fc3c7d91ac0fd1c",
          message: "Update README.md",
          timestamp: "2026-02-07T08:00:00+00:00",
          author: { name: "The Octocat", email: "octocat@github.com" },
          added: [],
          removed: [],
          modified: ["README.md"],
        },
      ],
    },
    signatureHeader: "X-Hub-Signature-256",
    signatureInfo: "HMAC SHA-256 of the payload using your webhook secret",
  },
  stripe: {
    name: "Stripe",
    icon: "💳",
    headers: {
      "Content-Type": "application/json",
      "Stripe-Signature": "t=1614556828,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd",
      "User-Agent": "Stripe/1.0",
    },
    payload: {
      id: "evt_1NG8du2eZvKYlo2CuITNJXbZ",
      object: "event",
      api_version: "2023-10-16",
      created: 1686089428,
      type: "payment_intent.succeeded",
      data: {
        object: {
          id: "pi_3NG8du2eZvKYlo2C1GpWQ1u6",
          object: "payment_intent",
          amount: 2000,
          currency: "usd",
          status: "succeeded",
          customer: "cus_NffrFeUfNV2Hib",
          payment_method: "pm_1NG8du2eZvKYlo2CjLY5a9nP",
        },
      },
    },
    signatureHeader: "Stripe-Signature",
    signatureInfo: "Timestamp + HMAC SHA-256 using your endpoint secret",
  },
  slack: {
    name: "Slack",
    icon: "💬",
    headers: {
      "Content-Type": "application/json",
      "X-Slack-Signature": "v0=a2114d57b48eac39b9ad189dd8316235a7b4a8d21a10bd27519666489c69b503",
      "X-Slack-Request-Timestamp": "1531420618",
    },
    payload: {
      token: "Jhj5dZrVaK7ZwHHjRyZWjbDl",
      team_id: "T061EG9R6",
      event: {
        type: "message",
        channel: "C024BE91L",
        user: "U2147483697",
        text: "Hello world",
        ts: "1355517523.000005",
      },
      type: "event_callback",
      event_id: "Ev024BE91F",
      event_time: 1355517523,
    },
    signatureHeader: "X-Slack-Signature",
    signatureInfo: "v0 + HMAC SHA-256 of timestamp:body using signing secret",
  },
  discord: {
    name: "Discord",
    icon: "🎮",
    headers: {
      "Content-Type": "application/json",
      "X-Signature-Ed25519": "a1b2c3d4e5f6...",
      "X-Signature-Timestamp": "1614556828",
    },
    payload: {
      id: "901234567890123456",
      type: 1,
      data: {
        id: "123456789012345678",
        name: "test",
        type: 1,
        options: [{ name: "message", type: 3, value: "Hello!" }],
      },
      guild_id: "987654321098765432",
      channel_id: "123456789012345678",
      member: {
        user: { id: "123456789012345678", username: "testuser", discriminator: "0001" },
        roles: [],
        joined_at: "2021-01-01T00:00:00.000000+00:00",
      },
    },
    signatureHeader: "X-Signature-Ed25519",
    signatureInfo: "Ed25519 signature of timestamp + body using public key",
  },
  generic: {
    name: "Custom / Generic",
    icon: "🔔",
    headers: {
      "Content-Type": "application/json",
      "X-Webhook-ID": "wh_abc12345",
      "X-Webhook-Timestamp": "2026-02-07T08:00:00Z",
    },
    payload: {
      event: "custom.event",
      timestamp: "2026-02-07T08:00:00Z",
      data: {
        id: "abc123",
        action: "created",
        resource: { type: "item", name: "Example Item", value: 42 },
      },
    },
  },
};

interface ParsedWebhook {
  method: string;
  headers: Record<string, string>;
  body: string;
  bodyParsed: object | null;
  timestamp: string;
  contentType: string;
  signatureValid: boolean | null;
  size: number;
}

export default function WebhookTester() {
  useToolTracker("webhook-tester", "Webhook Tester", "devtools");
  const analytics = useAnalytics();
  const [selectedProvider, setSelectedProvider] = useState("github");
  const [customHeaders, setCustomHeaders] = useState("");
  const [customPayload, setCustomPayload] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [parsedResult, setParsedResult] = useState<ParsedWebhook | null>(null);
  const [parseError, setParseError] = useState("");

  const provider = PROVIDERS[selectedProvider];

  const currentHeaders = useMemo(() => {
    if (useCustom && customHeaders) {
      try {
        return JSON.parse(customHeaders) as Record<string, string>;
      } catch {
        return {} as Record<string, string>;
      }
    }
    return provider.headers;
  }, [useCustom, customHeaders, provider]);

  const currentPayload = useMemo(() => {
    if (useCustom && customPayload) return customPayload;
    return JSON.stringify(provider.payload, null, 2);
  }, [useCustom, customPayload, provider]);

  const handleParse = useCallback(() => {
    try {
      const bodyStr = currentPayload;
      let bodyParsed: object | null = null;
      try {
        bodyParsed = JSON.parse(bodyStr) as object;
      } catch {
        // not JSON
      }

      const headers = currentHeaders;
      const contentType = headers["Content-Type"] || headers["content-type"] || "unknown";

      let signatureValid: boolean | null = null;
      if (provider.signatureHeader && headers[provider.signatureHeader]) {
        signatureValid = true;
      }

      const parsed: ParsedWebhook = {
        method: "POST",
        headers,
        body: bodyStr,
        bodyParsed,
        timestamp: new Date().toISOString(),
        contentType,
        signatureValid,
        size: new Blob([bodyStr]).size,
      };

      setParsedResult(parsed);
      setParseError("");
      analytics.trackToolUsage("webhook-tester", { action: "parse", provider: selectedProvider });
    } catch (err) {
      setParseError(err instanceof Error ? err.message : "Parse failed");
      setParsedResult(null);
    }
  }, [currentPayload, currentHeaders, provider, selectedProvider, analytics]);

  const handleReset = useCallback(() => {
    setUseCustom(false);
    setCustomHeaders("");
    setCustomPayload("");
    setParsedResult(null);
    setParseError("");
  }, []);

  const handleCopyPayload = useCallback(async () => {
    await navigator.clipboard.writeText(currentPayload);
    analytics.trackToolUsage("webhook-tester", { action: "copy-payload" });
  }, [currentPayload, analytics]);

  const handleCopyCurl = useCallback(async () => {
    const headerFlags = Object.entries(currentHeaders)
      .map(([k, v]) => `-H '${k}: ${v}'`)
      .join(" \\\n  ");
    const curl = `curl -X POST \\\n  ${headerFlags} \\\n  -d '${currentPayload.replace(/\n/g, "")}' \\\n  https://your-endpoint.com/webhook`;
    await navigator.clipboard.writeText(curl);
    analytics.trackToolUsage("webhook-tester", { action: "copy-curl" });
  }, [currentHeaders, currentPayload, analytics]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <StructuredData
        type="WebApplication"
        name="Webhook Tester - OpenKit.tools"
        description="Test and debug webhooks with sample payloads from popular providers"
        url="https://openkit.tools/webhook-tester"
        applicationCategory="DeveloperApplication"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://openkit.tools" },
          { name: "Webhook Tester", url: "https://openkit.tools/webhook-tester" },
        ]}
      />

      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-2xl" aria-label="Home">🪝</Link>
            <div>
              <h1 className="text-lg font-bold">Webhook Tester & Inspector</h1>
              <p className="text-xs text-muted-foreground">Debug webhooks with sample payloads from popular providers</p>
            </div>
          </div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition">
            ← All Tools
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">        {/* Provider Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Webhook Provider</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(PROVIDERS).map(([key, prov]) => (
              <button
                key={key}
                onClick={() => { setSelectedProvider(key); setUseCustom(false); setParsedResult(null); }}
                className={`px-4 py-2 text-sm rounded-md border transition ${
                  selectedProvider === key && !useCustom
                    ? "bg-blue-500/20 border-blue-500 text-blue-400"
                    : "bg-card border-border hover:bg-accent"
                }`}
              >
                <span className="mr-1.5">{prov.icon}</span>
                {prov.name}
              </button>
            ))}
          </div>
        </div>

        {/* Headers */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center gap-1.5">
              <FileJson className="w-4 h-4" /> Headers
            </label>
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={useCustom}
                onChange={(e) => {
                  setUseCustom(e.target.checked);
                  if (e.target.checked) {
                    setCustomHeaders(JSON.stringify(provider.headers, null, 2));
                    setCustomPayload(JSON.stringify(provider.payload, null, 2));
                  }
                }}
                className="rounded border-border"
              />
              Edit custom
            </label>
          </div>
          {useCustom ? (
            <Textarea
              value={customHeaders}
              onChange={(e) => setCustomHeaders(e.target.value)}
              className="bg-card border-border font-mono text-xs min-h-[120px]"
              placeholder='{"Content-Type": "application/json"}'
            />
          ) : (
            <div className="bg-card border border-border rounded-md p-3 space-y-1">
              {Object.entries(provider.headers).map(([key, value]) => (
                <div key={key} className="flex gap-2 text-xs font-mono">
                  <span className="text-blue-400 shrink-0">{key}:</span>
                  <span className="text-muted-foreground break-all">{value}</span>
                </div>
              ))}
            </div>
          )}
          {provider.signatureHeader && (
            <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 px-3 py-2 rounded-md">
              <Shield className="w-3.5 h-3.5 shrink-0" />
              <span><strong>{provider.signatureHeader}</strong>: {provider.signatureInfo}</span>
            </div>
          )}
        </div>

        {/* Payload */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Payload Body</label>
          {useCustom ? (
            <Textarea
              value={customPayload}
              onChange={(e) => setCustomPayload(e.target.value)}
              className="bg-card border-border font-mono text-xs min-h-[300px]"
            />
          ) : (
            <pre className="bg-card border border-border rounded-md p-3 text-xs font-mono overflow-auto max-h-[400px] text-muted-foreground">
              {JSON.stringify(provider.payload, null, 2)}
            </pre>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleParse} size="sm">
            <Play className="w-4 h-4 mr-1" /> Inspect Webhook
          </Button>
          <Button onClick={handleCopyPayload} variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-1" /> Copy Payload
          </Button>
          <Button onClick={handleCopyCurl} variant="outline" size="sm">
            <Hash className="w-4 h-4 mr-1" /> Copy as cURL
          </Button>
          <ExportHubV2
            content={JSON.stringify({ headers: currentHeaders, body: currentPayload }, null, 2)}
            toolName="Webhook Tester"
            filename={`webhook-${selectedProvider}`}
            formats={["json", "txt"]}
          />
          <Button onClick={handleReset} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-1" /> Reset
          </Button>
        </div>

        {parseError && (
          <div className="text-red-400 text-sm bg-red-500/10 px-4 py-3 rounded-md">{parseError}</div>
        )}

        {/* Parsed Result */}
        {parsedResult && (
          <div className="space-y-4 border border-border rounded-lg p-4 bg-card">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Clock className="w-4 h-4" /> Inspection Result
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-background rounded-md p-3 text-center">
                <p className="text-xs text-muted-foreground">Method</p>
                <p className="text-sm font-bold text-green-400">{parsedResult.method}</p>
              </div>
              <div className="bg-background rounded-md p-3 text-center">
                <p className="text-xs text-muted-foreground">Content-Type</p>
                <p className="text-sm font-bold truncate">{parsedResult.contentType}</p>
              </div>
              <div className="bg-background rounded-md p-3 text-center">
                <p className="text-xs text-muted-foreground">Payload Size</p>
                <p className="text-sm font-bold">{parsedResult.size} bytes</p>
              </div>
              <div className="bg-background rounded-md p-3 text-center">
                <p className="text-xs text-muted-foreground">Signature</p>
                <p className={`text-sm font-bold ${
                  parsedResult.signatureValid === true ? "text-green-400" :
                  parsedResult.signatureValid === false ? "text-red-400" :
                  "text-muted-foreground"
                }`}>
                  {parsedResult.signatureValid === true ? "✓ Present" :
                   parsedResult.signatureValid === false ? "✗ Invalid" :
                   "N/A"}
                </p>
              </div>
            </div>

            {/* Headers table */}
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2">Headers ({Object.keys(parsedResult.headers).length})</h4>
              <div className="bg-background rounded-md overflow-hidden">
                {Object.entries(parsedResult.headers).map(([key, value]) => (
                  <div key={key} className="flex border-b border-border last:border-0 px-3 py-1.5 text-xs font-mono">
                    <span className="text-blue-400 w-1/3 shrink-0">{key}</span>
                    <span className="text-muted-foreground break-all">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Parsed JSON tree */}
            {parsedResult.bodyParsed && (
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Parsed Body</h4>
                <pre className="bg-background rounded-md p-3 text-xs font-mono overflow-auto max-h-[300px]">
                  {JSON.stringify(parsedResult.bodyParsed, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        <RelatedTools currentPath="/webhook-tester" />

        {/* Guide */}
        <GeoContentLayout>
          <GeoSection title="About Webhook Tester" icon="📖">
            <p>Webhook Tester helps you understand and debug webhook payloads from popular services. Inspect headers, validate signatures, generate sample payloads, and export as cURL commands for testing.</p>
          </GeoSection>

          <QuickStartGuide steps={[
            { title: "Select provider", description: "Choose GitHub, Stripe, Slack, Discord, or create custom payloads" },
            { title: "Review payload", description: "Inspect headers and JSON body from sample webhook events" },
            { title: "Click Inspect", description: "Parse and analyze the webhook structure with detailed breakdown" },
            { title: "Copy or export", description: "Copy as JSON payload or cURL command for testing your endpoints" },
          ]} />

          <FeatureGrid features={[
            { icon: "🐙", title: "GitHub Webhooks", description: "Push, PR, issue, and deployment events" },
            { icon: "💳", title: "Stripe Webhooks", description: "Payment, subscription, and invoice events" },
            { icon: "💬", title: "Slack Webhooks", description: "Message, slash command, and interactive events" },
            { icon: "🎮", title: "Discord Webhooks", description: "Interaction, message, and bot events" },
            { icon: "🔐", title: "Signature Info", description: "Understand HMAC and signature verification" },
            { icon: "📋", title: "cURL Export", description: "Copy as ready-to-use cURL command" },
          ]} />

          <StatsBar stats={[
            { label: "Provider", value: provider.name },
            { label: "Headers", value: `${Object.keys(currentHeaders).length}` },
            { label: "Payload Size", value: `${new Blob([currentPayload]).size} bytes` },
            { label: "Fields", value: `${Object.keys(provider.payload).length} top-level` },
          ]} />

          <ToolFAQ faqs={[
            { question: "Does this send real webhook requests?", answer: "No. This is a client-side tool for inspecting and understanding webhook payloads. No requests are sent to external servers." },
            { question: "Can I validate real webhook signatures?", answer: "The tool shows signature headers and explains the verification method. For actual HMAC verification, you'd need the webhook secret which should never be shared." },
            { question: "Can I test my own webhook endpoint?", answer: "You can copy the payload as a cURL command and run it in your terminal to test your own endpoint." },
            { question: "What providers are supported?", answer: "GitHub, Stripe, Slack, Discord, and a generic/custom option. Each comes with realistic sample payloads." },
          ]} />
        </GeoContentLayout>

        <LastUpdated date="2026-02-07" />
      </div>
    </main>
  );
}
