"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LabeledInput } from "@/components/ui/labeled-input";
import { Textarea } from "@/components/ui/textarea";
import { RelatedTools } from "@/components/related-tools";
import { Globe, Search, Loader2, Copy, Check, Trash2 } from "lucide-react";
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
import { dnsLookupGuideContent } from "@/content/dns-lookup-guide";

const RECORD_TYPES = ["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SOA", "PTR"] as const;
type RecordType = (typeof RECORD_TYPES)[number];

// Map numeric DNS type codes to names
const DNS_TYPE_MAP: Record<number, string> = {
  1: "A", 2: "NS", 5: "CNAME", 6: "SOA", 12: "PTR",
  15: "MX", 16: "TXT", 28: "AAAA",
};

type DNSAnswer = {
  name: string;
  type: number;
  TTL: number;
  data: string;
};

type QueryResult = {
  domain: string;
  type: RecordType;
  status: "success" | "error" | "no-records";
  answers: DNSAnswer[];
  responseTimeMs: number;
  error?: string;
};

async function queryDNS(domain: string, type: RecordType): Promise<QueryResult> {
  const start = performance.now();
  try {
    const url = `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`;
    const res = await fetch(url);
    const elapsed = Math.round(performance.now() - start);

    if (!res.ok) {
      return { domain, type, status: "error", answers: [], responseTimeMs: elapsed, error: `HTTP ${res.status}` };
    }

    const data = await res.json();

    if (data.Status !== 0) {
      const rcode: Record<number, string> = { 1: "Format error", 2: "Server failure", 3: "NXDOMAIN (domain not found)", 5: "Refused" };
      return {
        domain, type, status: "error", answers: [], responseTimeMs: elapsed,
        error: rcode[data.Status] || `DNS error (status ${data.Status})`,
      };
    }

    const answers: DNSAnswer[] = (data.Answer || []).map((a: DNSAnswer) => ({
      name: a.name,
      type: a.type,
      TTL: a.TTL,
      data: a.data,
    }));

    return {
      domain, type,
      status: answers.length > 0 ? "success" : "no-records",
      answers, responseTimeMs: elapsed,
    };
  } catch (err) {
    const elapsed = Math.round(performance.now() - start);
    return { domain, type, status: "error", answers: [], responseTimeMs: elapsed, error: String(err) };
  }
}

export default function DNSLookup() {
  useToolTracker("dns-lookup", "DNS Lookup", "devtools");
  const analytics = useAnalytics();
  const { copy, isCopied } = useCopyToClipboard({ duration: 1500 });

  const [domain, setDomain] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<Set<RecordType>>(new Set(["A"]));
  const [results, setResults] = useState<QueryResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [batchMode, setBatchMode] = useState(false);
  const [batchInput, setBatchInput] = useState("");

  const toggleType = (t: RecordType) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(t)) { next.delete(t); } else { next.add(t); }
      if (next.size === 0) next.add("A");
      return next;
    });
  };

  const lookup = useCallback(async () => {
    const domains = batchMode
      ? batchInput.split(/[\n,]+/).map((d) => d.trim()).filter(Boolean)
      : [domain.trim()];

    if (domains.length === 0) return;
    setLoading(true);
    setResults([]);

    const types = Array.from(selectedTypes);
    const allResults: QueryResult[] = [];

    for (const d of domains) {
      const queries = types.map((t) => queryDNS(d, t));
      const batch = await Promise.all(queries);
      allResults.push(...batch);
    }

    setResults(allResults);
    setLoading(false);

    analytics.trackToolUsage("dns-lookup", {
      action: "lookup",
      domains: domains.length,
      types: types.join(","),
    });
  }, [domain, batchInput, batchMode, selectedTypes, analytics]);

  const copyResults = useCallback(() => {
    const text = results
      .map((r) => {
        if (r.status === "error") return `${r.domain} ${r.type}: ERROR - ${r.error}`;
        if (r.status === "no-records") return `${r.domain} ${r.type}: No records`;
        return r.answers.map((a) => `${r.domain} ${DNS_TYPE_MAP[a.type] || a.type} ${a.TTL}s ${a.data}`).join("\n");
      })
      .join("\n");
    copy(text);
  }, [results, copy]);

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">DNS Lookup</h1>
              <p className="text-muted-foreground">
                Query DNS records using Google&apos;s public DNS-over-HTTPS API
              </p>
            </div>
          </div>
        </header>

        {/* Input Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Domain Query</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setBatchMode(!batchMode)}>
                {batchMode ? "Single" : "Batch"}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {batchMode ? (
              <div className="space-y-2">
                <label className="text-sm font-medium">Domains (one per line or comma-separated)</label>
                <Textarea
                  value={batchInput}
                  onChange={(e) => setBatchInput(e.target.value)}
                  placeholder={"google.com\ngithub.com\ncloudflare.com"}
                  rows={4}
                />
              </div>
            ) : (
              <LabeledInput
                label="Domain Name"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                onKeyDown={(e) => { if (e.key === "Enter") lookup(); }}
              />
            )}

            {/* Record type toggles */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Record Types</label>
              <div className="flex flex-wrap gap-2">
                {RECORD_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleType(t)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                      selectedTypes.has(t)
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={lookup} disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
                {loading ? "Querying…" : "Lookup"}
              </Button>
              {results.length > 0 && (
                <>
                  <Button variant="outline" onClick={copyResults}>
                    {isCopied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                    {isCopied ? "Copied!" : "Copy All"}
                  </Button>
                  <Button variant="ghost" onClick={() => setResults([])}>
                    <Trash2 className="w-4 h-4 mr-1" /> Clear
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            {results.map((r, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base font-mono">{r.domain}</CardTitle>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium">{r.type}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{r.responseTimeMs}ms</span>
                      <StatusBadge status={r.status} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {r.status === "error" && (
                    <p className="text-sm text-destructive">{r.error}</p>
                  )}
                  {r.status === "no-records" && (
                    <p className="text-sm text-muted-foreground">No records found for this query type.</p>
                  )}
                  {r.status === "success" && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b text-left text-muted-foreground">
                            <th className="pb-2 pr-4">Name</th>
                            <th className="pb-2 pr-4">Type</th>
                            <th className="pb-2 pr-4">TTL</th>
                            <th className="pb-2">Value</th>
                            <th className="pb-2 w-10"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {r.answers.map((a, i) => (
                            <tr key={i} className="border-b border-border/50 hover:bg-muted/50">
                              <td className="py-2 pr-4 font-mono text-xs">{a.name}</td>
                              <td className="py-2 pr-4">{DNS_TYPE_MAP[a.type] || a.type}</td>
                              <td className="py-2 pr-4 text-muted-foreground">{a.TTL}s</td>
                              <td className="py-2 font-mono text-xs break-all">{a.data}</td>
                              <td className="py-2">
                                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => copy(a.data)}>
                                  {isCopied ? "✓" : "Copy"}
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick lookups */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Lookups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4 text-sm">
              {[
                { d: "google.com", types: ["A", "MX"] as RecordType[] },
                { d: "github.com", types: ["A", "AAAA"] as RecordType[] },
                { d: "cloudflare.com", types: ["A", "NS"] as RecordType[] },
                { d: "openkit.tools", types: ["A", "TXT"] as RecordType[] },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDomain(item.d);
                    setSelectedTypes(new Set(item.types));
                    setBatchMode(false);
                  }}
                  className="p-3 bg-muted hover:bg-muted/70 rounded-lg text-left transition"
                >
                  <div className="font-semibold">{item.d}</div>
                  <div className="text-xs text-muted-foreground">{item.types.join(", ")}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <RelatedTools currentPath="/dns-lookup" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={dnsLookupGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is" title={dnsLookupGuideContent.introduction.title} subtitle="Understanding DNS records" variant="default">
            <MarkdownContent content={dnsLookupGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="When you need DNS lookups" variant="default">
            <FeatureGrid features={dnsLookupGuideContent.useCases.map((uc) => ({ title: uc.title, description: uc.description }))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={dnsLookupGuideContent.howToUse.title} subtitle="Step-by-step DNS queries" variant="minimal">
            <HowToSchema
              name={`How to use ${dnsLookupGuideContent.toolName}`}
              description="Step-by-step guide to DNS lookups"
              steps={dnsLookupGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${dnsLookupGuideContent.toolPath}`}
            />
            <MarkdownContent content={dnsLookupGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="DNS lookup explained" variant="default">
            <ToolFAQ faqs={dnsLookupGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={dnsLookupGuideContent.security.title} subtitle="How your queries are handled" variant="highlight">
            <MarkdownContent content={dnsLookupGuideContent.security.content} />
          </GeoSection>

          {dnsLookupGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(dnsLookupGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={dnsLookupGuideContent.lastUpdated} />
      </div>

      <StructuredData
        type="WebApplication"
        name="DNS Lookup"
        description="Query DNS records (A, AAAA, CNAME, MX, TXT, NS, SOA, PTR) using Google DNS-over-HTTPS. Batch lookup, TTL display, response times."
        url="https://openkit.tools/dns-lookup"
        applicationCategory="DeveloperApplication"
        datePublished="2026-02-06"
        dateModified={dnsLookupGuideContent.lastUpdated}
        version={dnsLookupGuideContent.version}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "DNS Lookup", url: "https://openkit.tools/dns-lookup" },
        ]}
      />
    </main>
  );
}

function StatusBadge({ status }: { status: "success" | "error" | "no-records" }) {
  const styles = {
    success: "bg-green-500/10 text-green-600 dark:text-green-400",
    error: "bg-red-500/10 text-red-600 dark:text-red-400",
    "no-records": "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  };
  const labels = { success: "OK", error: "Error", "no-records": "Empty" };
  return (
    <span className={`px-2 py-0.5 text-xs rounded-full ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
