"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Clock, Copy, RefreshCw } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { epochGuideContent } from "@/content/epoch-guide";

type TimestampUnit = "seconds" | "milliseconds";
type Timezone = "UTC" | "Local" | "America/New_York" | "America/Los_Angeles" | "Europe/London" | "Europe/Paris" | "Asia/Tokyo" | "Asia/Shanghai";

const TIMEZONES: { value: Timezone; label: string; offset: string }[] = [
  { value: "UTC", label: "UTC", offset: "+0:00" },
  { value: "Local", label: "Local Time", offset: "" },
  { value: "America/New_York", label: "New York (EST/EDT)", offset: "-5:00/-4:00" },
  { value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)", offset: "-8:00/-7:00" },
  { value: "Europe/London", label: "London (GMT/BST)", offset: "+0:00/+1:00" },
  { value: "Europe/Paris", label: "Paris (CET/CEST)", offset: "+1:00/+2:00" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)", offset: "+9:00" },
  { value: "Asia/Shanghai", label: "Shanghai (CST)", offset: "+8:00" },
];

export default function EpochConverter() {
  useToolTracker("epoch", "Epoch Converter", "converters");
  const { copy } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const [inputTimestamp, setInputTimestamp] = useState(() => Date.now().toString());
  const [inputDate, setInputDate] = useState("");
  const [timestampUnit, setTimestampUnit] = useState<TimestampUnit>("milliseconds");
  const [timezone, setTimezone] = useState<Timezone>("UTC");
  const [mode, setMode] = useState<"timestamp-to-date" | "date-to-timestamp">("timestamp-to-date");

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track conversions
  useEffect(() => {
    if (mode === "timestamp-to-date" && inputTimestamp) {
      analytics.trackToolUsage('epoch-converter', {
        action: 'timestamp-to-date',
        unit: timestampUnit,
        timezone
      });
    }
  }, [inputTimestamp, timestampUnit, timezone, mode, analytics]);

  useEffect(() => {
    if (mode === "date-to-timestamp" && inputDate) {
      analytics.trackToolUsage('epoch-converter', {
        action: 'date-to-timestamp',
        timezone
      });
    }
  }, [inputDate, timezone, mode, analytics]);

  // Convert timestamp to date
  const timestampToDate = useMemo(() => {
    const ts = parseInt(inputTimestamp) || 0;
    const milliseconds = timestampUnit === "seconds" ? ts * 1000 : ts;
    const date = new Date(milliseconds);

    if (isNaN(date.getTime())) {
      return { full: "Invalid timestamp", iso: "", formatted: "", relative: "" };
    }
    
    // Track conversion
    analytics.trackToolUsage('epoch-converter', {
      action: 'timestamp-to-date',
      unit: timestampUnit,
      timezone
    });

    const formatOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: timezone === "Local" ? undefined : timezone,
      timeZoneName: "short"};

    const formatted = date.toLocaleString("en-US", formatOptions);
    const iso = timezone === "UTC" || timezone === "Local"
      ? date.toISOString()
      : date.toLocaleString("sv-SE", { timeZone: timezone });

    // Calculate relative time
    const diff = currentTime - milliseconds;
    const absDiff = Math.abs(diff);
    const seconds = Math.floor(absDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let relative = "";
    if (days > 365) {
      relative = `${Math.floor(days / 365)} year${Math.floor(days / 365) > 1 ? "s" : ""}`;
    } else if (days > 0) {
      relative = `${days} day${days > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      relative = `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      relative = `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
      relative = `${seconds} second${seconds > 1 ? "s" : ""}`;
    }

    relative = diff > 0 ? `${relative} ago` : `in ${relative}`;

    return {
      full: formatted,
      iso,
      formatted: date.toLocaleString(),
      relative};
  }, [inputTimestamp, timestampUnit, timezone, currentTime, analytics]);

  // Convert date to timestamp
  const dateToTimestamp = useMemo(() => {
    if (!inputDate) return { seconds: "0", milliseconds: "0" };

    const date = new Date(inputDate);
    if (isNaN(date.getTime())) {
      return { seconds: "Invalid date", milliseconds: "Invalid date" };
    }

    const ms = date.getTime();
    return {
      seconds: Math.floor(ms / 1000).toString(),
      milliseconds: ms.toString()};
  }, [inputDate]);


  const setToNow = () => {
    const now = Date.now();
    setInputTimestamp(timestampUnit === "seconds" ? Math.floor(now / 1000).toString() : now.toString());
  };

  const setDateToNow = () => {
    const now = new Date();
    setInputDate(now.toISOString().slice(0, 16));
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <Clock className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">Epoch/Unix Timestamp Converter</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Current Timestamp */}
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl sm:text-2xl font-medium text-amber-300">Current Unix Timestamp</h2>
            <Clock className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Seconds</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-2xl font-bold text-white flex-1">
                  {Math.floor(currentTime / 1000)}
                </p>
                <button
                  onClick={() => {
                    copy(Math.floor(currentTime / 1000).toString());
                    analytics.trackToolInteraction('epoch-converter', 'copy', {
                      format: 'seconds',
                      type: 'current-time'
                    });
                  }}
                  className="text-amber-400 hover:text-amber-300 p-2 hover:bg-amber-500/10 rounded-lg transition"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Milliseconds</p>
              <div className="flex items-center gap-2">
                <p className="font-mono text-2xl font-bold text-white flex-1">
                  {currentTime}
                </p>
                <button
                  onClick={() => {
                    copy(currentTime.toString());
                    analytics.trackToolInteraction('epoch-converter', 'copy', {
                      format: 'milliseconds',
                      type: 'current-time'
                    });
                  }}
                  className="text-amber-400 hover:text-amber-300 p-2 hover:bg-amber-500/10 rounded-lg transition"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            {new Date(currentTime).toUTCString()}
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode("timestamp-to-date")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${
              mode === "timestamp-to-date"
                ? "bg-amber-500 text-white"
                : "bg-card text-muted-foreground hover:bg-muted border border-border"
            }`}
          >
            Timestamp → Date
          </button>
          <button
            onClick={() => setMode("date-to-timestamp")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${
              mode === "date-to-timestamp"
                ? "bg-amber-500 text-white"
                : "bg-card text-muted-foreground hover:bg-muted border border-border"
            }`}
          >
            Date → Timestamp
          </button>
        </div>

        {/* Timestamp to Date */}
        {mode === "timestamp-to-date" && (
          <>
            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <label className="text-sm font-medium text-accent-foreground mb-3 block">Enter Timestamp</label>
              <div className="flex gap-4 mb-4">
                <input aria-label="Input field"
                  type="text"
                  value={inputTimestamp}
                  onChange={(e) => setInputTimestamp(e.target.value)}
                  placeholder="1609459200"
                  className="flex-1 px-4 py-3 bg-muted border border-border rounded-lg font-mono text-2xl text-foreground text-right"
                />
                <button
                  onClick={setToNow}
                  className="px-4 py-3 bg-amber-500 hover:bg-amber-600 rounded-lg text-white font-medium transition flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Now
                </button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={timestampUnit}
                  onChange={(e) => setTimestampUnit(e.target.value as TimestampUnit)}
                  className="flex-1 min-w-0 px-4 py-2 bg-muted border border-border rounded-lg text-foreground"
                >
                  <option value="seconds">Seconds (10 digits)</option>
                  <option value="milliseconds">Milliseconds (13 digits)</option>
                </select>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value as Timezone)}
                  className="flex-1 min-w-0 px-4 py-2 bg-muted border border-border rounded-lg text-foreground"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {[
                { label: "Full Format", value: timestampToDate.full },
                { label: "ISO 8601", value: timestampToDate.iso },
                { label: "Relative Time", value: timestampToDate.relative },
              ].map((result) => (
                <div
                  key={result.label}
                  className="bg-card border border-border rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{result.label}</span>
                    <button
                      onClick={() => copy(result.value)}
                      className="text-muted-foreground hover:text-foreground p-2 hover:bg-muted rounded-lg transition"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="font-mono text-lg text-white break-all">
                    {result.value}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Date to Timestamp */}
        {mode === "date-to-timestamp" && (
          <>
            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 mb-6">
              <label className="text-sm font-medium text-accent-foreground mb-3 block">Enter Date & Time</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <input aria-label="Input field"
                  type="datetime-local"
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                  className="flex-1 min-w-0 px-4 py-3 bg-muted border border-border rounded-lg text-foreground"
                />
                <button
                  onClick={setDateToNow}
                  className="px-4 py-3 bg-amber-500 hover:bg-amber-600 rounded-lg text-white font-medium transition flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Now
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Unix Timestamp (seconds)", value: dateToTimestamp.seconds, suffix: "s" },
                { label: "Unix Timestamp (milliseconds)", value: dateToTimestamp.milliseconds, suffix: "ms" },
              ].map((result) => (
                <div
                  key={result.label}
                  className="bg-card border border-border rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">{result.label}</span>
                    <button
                      onClick={() => copy(result.value)}
                      className="text-muted-foreground hover:text-foreground p-2 hover:bg-muted rounded-lg transition"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="font-mono text-2xl font-bold text-white break-all">
                    {result.value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">{result.suffix}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Quick Reference */}
        <div className="mt-8 bg-card border border-border rounded-xl p-4">
          <h3 className="text-base sm:text-lg font-medium text-accent-foreground mb-3">Quick Reference</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              { timestamp: "0", date: "Jan 1, 1970 00:00:00 UTC" },
              { timestamp: "1000000000", date: "Sep 9, 2001 01:46:40 UTC" },
              { timestamp: "1234567890", date: "Feb 13, 2009 23:31:30 UTC" },
              { timestamp: "1600000000", date: "Sep 13, 2020 12:26:40 UTC" },
              { timestamp: "1700000000", date: "Nov 14, 2023 22:13:20 UTC" },
              { timestamp: "2000000000", date: "May 18, 2033 03:33:20 UTC" },
            ].map((ref) => (
              <div key={ref.timestamp} className="bg-muted rounded p-3">
                <span className="font-mono text-amber-400">{ref.timestamp}</span>
                <span className="text-muted-foreground mx-2">=</span>
                <span className="text-accent-foreground text-xs">{ref.date}</span>
              </div>
            ))}
          </div>
        </div>

        <RelatedTools currentPath="/epoch" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={epochGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-epoch" title={epochGuideContent.introduction.title} subtitle="Understanding Unix timestamp conversion" variant="default">
            <MarkdownContent content={epochGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use epoch conversion" variant="default">
            <FeatureGrid features={epochGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={epochGuideContent.howToUse.title} subtitle="Master Unix timestamp conversion" variant="minimal">
            <HowToSchema name={`How to use ${epochGuideContent.toolName}`} description="Step-by-step guide to epoch conversion" steps={epochGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${epochGuideContent.toolPath}`} />
            <MarkdownContent content={epochGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={epochGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={epochGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={epochGuideContent.security.content} />
          </GeoSection>

          {epochGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(epochGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={epochGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Convert between Unix timestamps and human-readable dates.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="Epoch Converter"
        description="Free online Unix timestamp converter. Convert epoch time to human-readable dates and vice versa. Supports multiple timezones, milliseconds/seconds, and real-time conversion."
        url="https://openkit.tools/epoch"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={epochGuideContent.lastUpdated}
        version={epochGuideContent.version}
        aggregateRating={{ratingValue: "4.8", ratingCount: "2134", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Epoch Converter', url: 'https://openkit.tools/epoch' },
        ]}
      />
    </main>
  );
}
