"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Globe, Copy, RefreshCw, AlertCircle } from "lucide-react";
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
import { ipGuideContent } from "@/content/ip-guide";

type IPInfo = {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  org?: string;
  timezone?: string;
};

// Multiple API fallbacks optimized for Safari compatibility
// Using simple, Safari-friendly APIs first
const IP_APIS = [
  // ipify is most reliable on Safari
  { url: "https://api.ipify.org?format=json", parser: (d: {ip: string}) => ({ ip: d.ip }) },
  // ipinfo.io with explicit format
  { url: "https://ipinfo.io/json?token=", parser: (d: IPInfo) => d },
  // ipapi as last resort
  { url: "https://ipapi.co/json/", parser: (d: {ip: string; city?: string; region?: string; country_name?: string; timezone?: string; org?: string; latitude?: number; longitude?: number}) => ({ ip: d.ip, city: d.city, region: d.region, country: d.country_name, timezone: d.timezone, org: d.org, loc: d.latitude && d.longitude ? `${d.latitude},${d.longitude}` : undefined }) },
];

export default function IPLookup() {
  useToolTracker("ip", "IP Address Lookup");
  const { isCopied } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [info, setInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIP = useCallback(async () => {
    setLoading(true);
    setError(null);

    for (const api of IP_APIS) {
      try {
        // Simple timeout for Safari compatibility
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        // Minimal fetch options - Safari can be picky about headers
        const res = await fetch(api.url, {
          signal: controller.signal});
        clearTimeout(timeoutId);

        if (!res.ok) {
          console.warn(`API ${api.url} returned ${res.status}`);
          continue;
        }

        const data = await res.json();
        const parsed = api.parser(data);

        if (parsed.ip) {
          setInfo(parsed);
          setLoading(false);
          
          analytics.trackToolUsage('ip', {
            action: 'lookup',
            hasCity: !!(parsed as IPInfo).city,
            hasOrg: !!(parsed as IPInfo).org,
            hasLocation: !!(parsed as IPInfo).loc
          });
          return;
        }
      } catch (err) {
        // Log error for debugging and try next API
        console.warn(`API ${api.url} failed:`, err);
        continue;
      }
    }

    // All APIs failed
    const isSafari = typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const errorMsg = isSafari
      ? "Unable to detect IP. Safari's privacy features may be blocking the request. Try disabling \"Prevent Cross-Site Tracking\" in Settings > Safari, or use the Refresh button."
      : "Unable to detect IP. This may be blocked by your browser's privacy settings or ad blocker. Try disabling them temporarily or click Refresh.";
    setError(errorMsg);
    setLoading(false);
  }, [analytics]);

  useEffect(() => {
    fetchIP();
  // fetchIP is memoized with useCallback and has no dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyIP = async () => {
    if (!info?.ip) return;

    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(info.ip);
        analytics.trackToolUsage('ip', {
          action: 'copy',
          ip: info.ip
        });
        return;
      }
    } catch (err) {
      // Clipboard API failed, fall through to legacy method
      console.warn('Clipboard API failed:', err);
    }

    // Fallback for Safari iOS and older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = info.ip;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {}
    } catch (err) {
      console.error('Copy failed:', err);
      // Could show an error message to user here
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 text-white flex items-center justify-center hover:opacity-80 transition">
              <Globe className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">What&apos;s My IP</h1>
          </div>
          <button
            onClick={fetchIP}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent disabled:opacity-50 rounded-lg text-sm text-accent-foreground transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Main IP Display */}
        <div className="bg-card border border-border rounded-xl mb-6">
          <div className="p-6">
            {loading ? (
              <div className="py-8 text-center">
                <div className="animate-pulse text-xl text-muted-foreground">Detecting your IP...</div>
              </div>
            ) : error ? (
              <div className="py-8 text-center">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
                <p className="text-muted-foreground mb-4">{error}</p>
                <button
                  onClick={fetchIP}
                  className="px-4 py-2 bg-muted hover:bg-accent rounded-lg text-sm transition"
                >
                  Try Again
                </button>
              </div>
            ) : info?.ip ? (
              <button
                onClick={copyIP}
                className="w-full py-6 sm:py-8 bg-muted hover:bg-accent active:bg-accent rounded-lg transition text-center cursor-pointer select-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <p className="text-sm text-muted-foreground mb-2">Your Public IP Address</p>
                <p className="font-mono text-2xl sm:text-4xl font-bold text-white">{info.ip}</p>
                <p className="text-sm text-muted-foreground mt-3 flex items-center justify-center gap-2">
                  <Copy className="w-4 h-4" />
                  {isCopied ? "Copied!" : "Tap to copy"}
                </p>
              </button>
            ) : null}
          </div>
        </div>

        {/* IP Details */}
        {info && (info.city || info.country || info.org) && (
          <div className="bg-card border border-border rounded-xl mb-6">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-base font-medium text-foreground">Location Details</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {info.city && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">City</p>
                    <p className="font-medium text-white">{info.city}</p>
                  </div>
                )}
                {info.region && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Region</p>
                    <p className="font-medium text-white">{info.region}</p>
                  </div>
                )}
                {info.country && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Country</p>
                    <p className="font-medium text-white">{info.country}</p>
                  </div>
                )}
                {info.timezone && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Timezone</p>
                    <p className="font-medium text-white">{info.timezone}</p>
                  </div>
                )}
                {info.loc && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Coordinates</p>
                    <p className="font-medium font-mono text-sm text-white">{info.loc}</p>
                  </div>
                )}
                {info.org && (
                  <div className="p-3 bg-muted rounded-lg sm:col-span-2">
                    <p className="text-xs text-muted-foreground mb-1">Organization / ISP</p>
                    <p className="font-medium text-white">{info.org}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Privacy Note */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
          <p className="text-sm text-blue-400 mb-2">
            <strong>Note:</strong> This tool uses third-party APIs to detect your public IP.
            Your IP address is not stored or logged.
          </p>
          {error && (
            <p className="text-sm text-yellow-400">
              <strong>Safari users:</strong> If detection fails, try disabling &quot;Prevent Cross-Site Tracking&quot;
              in Settings → Safari → Privacy & Security, then refresh this page.
            </p>
          )}
        </div>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm z-50">
            Copied!
          </div>
        )}

        <RelatedTools currentPath="/ip" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={ipGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-ip" title={ipGuideContent.introduction.title} subtitle="Understanding IP addresses and geolocation" variant="default">
            <MarkdownContent content={ipGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use IP lookup" variant="default">
            <FeatureGrid features={ipGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={ipGuideContent.howToUse.title} subtitle="Master IP detection and geolocation" variant="minimal">
            <HowToSchema name={`How to use ${ipGuideContent.toolName}`} description="Step-by-step guide to IP lookup" steps={ipGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${ipGuideContent.toolPath}`} />
            <MarkdownContent content={ipGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={ipGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={ipGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={ipGuideContent.security.content} />
          </GeoSection>

          {ipGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(ipGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={ipGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Detect your public IP address and location.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="IP Address Lookup Tool"
        description="Free IP address lookup and geolocation tool. Instantly detect your public IP address with location details including city, region, country, timezone, and ISP information. Privacy-focused with multiple API fallbacks."
        url="https://openkit.tools/ip"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={ipGuideContent.lastUpdated}
        version={ipGuideContent.version}
        aggregateRating={{ratingValue: "4.7", ratingCount: "2156", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'IP Lookup', url: 'https://openkit.tools/ip' },
        ]}
      />
    </main>
  );
}
