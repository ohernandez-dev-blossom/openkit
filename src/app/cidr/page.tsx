"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LabeledInput } from "@/components/ui/labeled-input";
import { RelatedTools } from "@/components/related-tools";
import { RefreshCw, Network } from "lucide-react";
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
import { cidrGuideContent } from "@/content/cidr-guide";

type CIDRResult = {
  network: string;
  broadcast: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
  usableHosts: number;
  subnetMask: string;
  wildcardMask: string;
  binary: string;
  ipClass: string;
  isPrivate: boolean;
  cidrNotation: string;
};

function ipToNumber(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
}

function numberToIp(num: number): string {
  return [
    (num >>> 24) & 0xff,
    (num >>> 16) & 0xff,
    (num >>> 8) & 0xff,
    num & 0xff
  ].join('.');
}

function calculateCIDR(ipWithCidr: string): CIDRResult | null {
  const match = ipWithCidr.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\/(\d{1,2})$/);
  if (!match) return null;

  const [, ip, cidr] = match;
  const cidrNum = parseInt(cidr);

  // Validate IP octets
  const octets = ip.split('.').map(Number);
  if (octets.some(o => o < 0 || o > 255)) return null;

  // Validate CIDR
  if (cidrNum < 0 || cidrNum > 32) return null;

  const ipNum = ipToNumber(ip);
  const maskNum = (0xffffffff << (32 - cidrNum)) >>> 0;
  const wildcardNum = ~maskNum >>> 0;
  const networkNum = (ipNum & maskNum) >>> 0;
  const broadcastNum = (networkNum | wildcardNum) >>> 0;

  const totalHosts = Math.pow(2, 32 - cidrNum);
  const usableHosts = cidrNum === 31 ? 2 : cidrNum === 32 ? 1 : Math.max(0, totalHosts - 2);

  // Determine IP class
  const firstOctet = octets[0];
  let ipClass = "E (Reserved)";
  if (firstOctet >= 1 && firstOctet <= 126) ipClass = "A";
  else if (firstOctet >= 128 && firstOctet <= 191) ipClass = "B";
  else if (firstOctet >= 192 && firstOctet <= 223) ipClass = "C";
  else if (firstOctet >= 224 && firstOctet <= 239) ipClass = "D (Multicast)";

  // Check if private IP
  const isPrivate = (
    (octets[0] === 10) ||
    (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
    (octets[0] === 192 && octets[1] === 168) ||
    (octets[0] === 127) // Loopback
  );

  // Binary representation
  const binary = octets.map(o => o.toString(2).padStart(8, '0')).join('.');

  return {
    network: numberToIp(networkNum),
    broadcast: numberToIp(broadcastNum),
    firstHost: numberToIp(networkNum + (cidrNum === 32 ? 0 : 1)),
    lastHost: numberToIp(broadcastNum - (cidrNum === 32 ? 0 : 1)),
    totalHosts,
    usableHosts,
    subnetMask: numberToIp(maskNum),
    wildcardMask: numberToIp(wildcardNum),
    binary,
    ipClass,
    isPrivate,
    cidrNotation: `${numberToIp(networkNum)}/${cidr}`
  };
}

function generateRandomCIDR(): string {
  const ip = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
  const cidr = [8, 16, 24, 20, 22, 28][Math.floor(Math.random() * 6)];
  return `${ip}/${cidr}`;
}

export default function CIDRCalculator() {
  useToolTracker("cidr", "CIDR Calculator", "utilities");
  const analytics = useAnalytics();
  const { copy, isCopied } = useCopyToClipboard({ duration: 1500 });
  const [input, setInput] = useState("192.168.1.0/24");

  const result = useMemo(() => {
    const calculated = calculateCIDR(input);
    if (calculated) {
      analytics.trackToolUsage('cidr', {
        action: 'calculate',
        prefix: input.split('/')[1],
        usableHosts: calculated.usableHosts,
      });
    }
    return calculated;
  }, [input, analytics]);

  const randomize = () => {
    setInput(generateRandomCIDR());
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Network className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">CIDR Calculator</h1>
              <p className="text-muted-foreground">
                Calculate network information from CIDR notation
              </p>
            </div>
          </div>
        </header>

        {/* Input Card */}
        <Card>
          <CardHeader>
            <CardTitle>IP Address / CIDR</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <LabeledInput
                label="CIDR Notation"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="192.168.1.0/24"
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={randomize}
                className="mt-auto mb-[2px]"
                title="Generate random CIDR"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>

            {!result && input && (
              <p className="text-sm text-destructive">
                Invalid CIDR notation. Use format: 192.168.1.0/24
              </p>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="grid gap-4 md:grid-cols-2">
            {/* Network Information */}
            <Card>
              <CardHeader>
                <CardTitle>Network Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ResultRow
                  label="CIDR Notation"
                  value={result.cidrNotation}
                  onCopy={() => copy(result.cidrNotation)}
                  isCopied={isCopied}
                />
                <ResultRow
                  label="Network Address"
                  value={result.network}
                  onCopy={() => copy(result.network)}
                  isCopied={isCopied}
                />
                <ResultRow
                  label="Broadcast Address"
                  value={result.broadcast}
                  onCopy={() => copy(result.broadcast)}
                  isCopied={isCopied}
                />
                <ResultRow
                  label="Subnet Mask"
                  value={result.subnetMask}
                  onCopy={() => copy(result.subnetMask)}
                  isCopied={isCopied}
                />
                <ResultRow
                  label="Wildcard Mask"
                  value={result.wildcardMask}
                  onCopy={() => copy(result.wildcardMask)}
                  isCopied={isCopied}
                />
              </CardContent>
            </Card>

            {/* Host Information */}
            <Card>
              <CardHeader>
                <CardTitle>Host Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ResultRow
                  label="First Host"
                  value={result.firstHost}
                  onCopy={() => copy(result.firstHost)}
                  isCopied={isCopied}
                />
                <ResultRow
                  label="Last Host"
                  value={result.lastHost}
                  onCopy={() => copy(result.lastHost)}
                  isCopied={isCopied}
                />
                <ResultRow
                  label="Total Hosts"
                  value={result.totalHosts.toLocaleString()}
                />
                <ResultRow
                  label="Usable Hosts"
                  value={result.usableHosts.toLocaleString()}
                />
                <ResultRow
                  label="IP Class"
                  value={result.ipClass}
                />
                <ResultRow
                  label="Network Type"
                  value={result.isPrivate ? "Private" : "Public"}
                  badge={result.isPrivate ? "private" : "public"}
                />
              </CardContent>
            </Card>

            {/* Binary Representation */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Binary Representation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  {result.binary}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Reference Card */}
        <Card>
          <CardHeader>
            <CardTitle>CIDR Quick Reference</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4 text-sm">
              {[
                { cidr: "/8", mask: "255.0.0.0", hosts: "16,777,216" },
                { cidr: "/16", mask: "255.255.0.0", hosts: "65,536" },
                { cidr: "/24", mask: "255.255.255.0", hosts: "256" },
                { cidr: "/20", mask: "255.255.240.0", hosts: "4,096" },
                { cidr: "/22", mask: "255.255.252.0", hosts: "1,024" },
                { cidr: "/28", mask: "255.255.255.240", hosts: "16" },
                { cidr: "/30", mask: "255.255.255.252", hosts: "4" },
                { cidr: "/32", mask: "255.255.255.255", hosts: "1" }
              ].map((ref, i) => (
                <button
                  key={i}
                  onClick={() => setInput(`192.168.1.0${ref.cidr}`)}
                  className="p-3 bg-muted hover:bg-muted/70 rounded-lg text-left transition"
                >
                  <div className="font-semibold">{ref.cidr}</div>
                  <div className="text-xs text-muted-foreground">{ref.mask}</div>
                  <div className="text-xs text-muted-foreground">{ref.hosts} hosts</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <RelatedTools currentPath="/cidr" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={cidrGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-cidr" title={cidrGuideContent.introduction.title} subtitle="Understanding CIDR subnet calculations" variant="default">
            <MarkdownContent content={cidrGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use CIDR calculations" variant="default">
            <FeatureGrid features={cidrGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={cidrGuideContent.howToUse.title} subtitle="Master subnet calculations" variant="minimal">
            <HowToSchema name={`How to use ${cidrGuideContent.toolName}`} description="Step-by-step guide to CIDR subnet calculations" steps={cidrGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${cidrGuideContent.toolPath}`} />
            <MarkdownContent content={cidrGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know about CIDR" variant="default">
            <ToolFAQ faqs={cidrGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={cidrGuideContent.security.title} subtitle="Your network data never leaves your browser" variant="highlight">
            <MarkdownContent content={cidrGuideContent.security.content} />
          </GeoSection>

          {cidrGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(cidrGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={cidrGuideContent.lastUpdated} />
      </div>

      <StructuredData
        type="WebApplication"
        name="CIDR Calculator"
        description="Calculate network information from CIDR notation. Free online CIDR subnet calculator for network planning."
        url="https://openkit.tools/cidr"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={cidrGuideContent.lastUpdated}
        version={cidrGuideContent.version}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'CIDR Calculator', url: 'https://openkit.tools/cidr' },
        ]}
      />
    </main>
  );
}

function ResultRow({
  label,
  value,
  onCopy,
  isCopied,
  badge
}: {
  label: string;
  value: string;
  onCopy?: () => void;
  isCopied?: boolean;
  badge?: "private" | "public";
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        {badge && (
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              badge === "private"
                ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
            }`}
          >
            {badge}
          </span>
        )}
        <span className="font-mono text-sm">{value}</span>
        {onCopy && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onCopy}
            className="h-6 px-2 text-xs"
          >
            {isCopied ? "Copied!" : "Copy"}
          </Button>
        )}
      </div>
    </div>
  );
}
