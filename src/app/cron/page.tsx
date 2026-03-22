"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Clock, Copy, Calendar, AlertCircle, CheckCircle, Zap, Info } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { CronExpressionParser } from "cron-parser";
import cronstrue from "cronstrue";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { cronGuideContent } from "@/content/cron-guide";

type CronExample = {
  expression: string;
  description: string;
};

const EXAMPLES: CronExample[] = [
  { expression: "* * * * *", description: "Every minute" },
  { expression: "0 * * * *", description: "Every hour" },
  { expression: "0 0 * * *", description: "Daily at midnight" },
  { expression: "0 9 * * 1-5", description: "Weekdays at 9 AM" },
  { expression: "*/15 * * * *", description: "Every 15 minutes" },
  { expression: "0 0 1 * *", description: "First day of every month" },
  { expression: "0 0 * * 0", description: "Every Sunday at midnight" },
  { expression: "30 3 * * *", description: "Daily at 3:30 AM" },
  { expression: "0 */6 * * *", description: "Every 6 hours" },
  { expression: "0 12 * * 1", description: "Every Monday at noon" },
];

export default function CronParser() {
  useToolTracker("cron", "Cron Expression Parser", "developers");
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [expression, setExpression] = useState("*/5 * * * *");
    const [nextRunCount, setNextRunCount] = useState(5);

  // Parse cron expression into fields
  const parsedFields = useMemo(() => {
    const parts = expression.trim().split(/\s+/);
    if (parts.length === 5) {
      return {
        minute: parts[0],
        hour: parts[1],
        dayOfMonth: parts[2],
        month: parts[3],
        dayOfWeek: parts[4]};
    }
    return null;
  }, [expression]);

  // Validate cron expression
  const validation = useMemo(() => {
    try {
      const sixFieldExpression = `0 ${expression}`;
      CronExpressionParser.parse(sixFieldExpression);
      return { valid: true, error: null };
    } catch (error) {
      return { valid: false, error: (error as Error).message };
    }
  }, [expression]);

  // Generate human-readable description
  const humanDescription = useMemo(() => {
    if (!validation.valid) return "Invalid expression";
    try {
      return cronstrue.toString(expression, {
        throwExceptionOnParseError: true,
        verbose: true});
    } catch {
      return "Unable to describe";
    }
  }, [expression, validation.valid]);

  // Calculate next execution times
  const nextExecutions = useMemo(() => {
    if (!validation.valid) return [];
    try {
      const sixFieldExpression = `0 ${expression}`;
      const interval = CronExpressionParser.parse(sixFieldExpression);
      const executions: Date[] = [];
      for (let i = 0; i < nextRunCount; i++) {
        executions.push(interval.next().toDate());
      }
      return executions;
    } catch {
      return [];
    }
  }, [expression, validation.valid, nextRunCount]);


  const formatDate = (date: Date) => {
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false});
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffMins = Math.floor(diffMs / 1000 / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
    if (diffHours > 0) return `in ${diffHours} hour${diffHours > 1 ? "s" : ""}`;
    if (diffMins > 0) return `in ${diffMins} minute${diffMins > 1 ? "s" : ""}`;
    return "now";
  };

  const getFieldDescription = (field: string, value: string) => {
    const descriptions: Record<string, Record<string, string>> = {
      minute: {
        "*": "every minute",
        "*/5": "every 5 minutes",
        "*/10": "every 10 minutes",
        "*/15": "every 15 minutes",
        "*/30": "every 30 minutes",
        "0": "at minute 0"},
      hour: {
        "*": "every hour",
        "*/2": "every 2 hours",
        "*/6": "every 6 hours",
        "0": "at midnight",
        "12": "at noon",
        "9": "at 9 AM"},
      dayOfMonth: {
        "*": "every day",
        "1": "on the 1st",
        "15": "on the 15th"},
      month: {
        "*": "every month",
        "1": "in January",
        "6": "in June",
        "12": "in December"},
      dayOfWeek: {
        "*": "every day of week",
        "0": "on Sunday",
        "1": "on Monday",
        "1-5": "on weekdays",
        "6,0": "on weekends"}};

    return descriptions[field]?.[value] || value;
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link
            href="/"
            className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center hover:opacity-80 transition"
          >
            <Clock className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">
              Cron Expression Parser
            </h1>
            <p className="text-xs text-muted-foreground">
              Understand cron schedules in plain English
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Input Section */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <label className="text-sm font-medium text-accent-foreground mb-3 block flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Enter Cron Expression
          </label>
          <div className="flex gap-3">
            <input aria-label="Input field"
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="* * * * *"
              className="flex-1 px-4 py-3 bg-muted border border-border rounded-lg font-mono text-lg text-foreground focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <button
              onClick={() => {
                copy(expression);
                analytics.trackToolUsage('cron-parser', {
                  action: 'copy',
                  expressionLength: expression.length,
                  isValid: validation.valid
                });
              }}
              disabled={!validation.valid}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-muted disabled:text-muted-foreground/70 rounded-lg text-foreground font-medium transition flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Format: <code className="text-blue-400">minute hour day month day-of-week</code>
          </p>
        </div>

        {/* Validation Result */}
        <div
          className={`p-4 rounded-xl mb-6 border ${
            validation.valid
              ? "bg-green-500/10 border-green-500/30"
              : "bg-red-500/10 border-red-500/30"
          }`}
        >
          <div className="flex items-center gap-2">
            {validation.valid ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium text-green-400">
                  Valid Cron Expression
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-sm font-medium text-red-400">
                  Invalid Expression
                </span>
              </>
            )}
          </div>
          {!validation.valid && validation.error && (
            <p className="text-sm text-red-400 mt-2 ml-7">{validation.error}</p>
          )}
        </div>

        {validation.valid && (
          <>
            {/* Human Readable Description */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6 mb-6">
              <h2 className="text-sm font-medium text-blue-300 mb-3 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Plain English
              </h2>
              <p className="text-2xl sm:text-3xl font-semibold text-white leading-relaxed">
                {humanDescription}
              </p>
            </div>

            {/* Field Breakdown */}
            {parsedFields && (
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <h2 className="text-sm font-medium text-accent-foreground mb-4">
                  Field Breakdown
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {/* Minute */}
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-xs text-muted-foreground mb-1">Minute</div>
                    <div className="font-mono text-xl font-bold text-blue-400 mb-2">
                      {parsedFields.minute}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getFieldDescription("minute", parsedFields.minute)}
                    </div>
                    <div className="text-xs text-muted-foreground/70 mt-2">0-59</div>
                  </div>

                  {/* Hour */}
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-xs text-muted-foreground mb-1">Hour</div>
                    <div className="font-mono text-xl font-bold text-purple-400 mb-2">
                      {parsedFields.hour}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getFieldDescription("hour", parsedFields.hour)}
                    </div>
                    <div className="text-xs text-muted-foreground/70 mt-2">0-23</div>
                  </div>

                  {/* Day of Month */}
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-xs text-muted-foreground mb-1">Day</div>
                    <div className="font-mono text-xl font-bold text-green-400 mb-2">
                      {parsedFields.dayOfMonth}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getFieldDescription("dayOfMonth", parsedFields.dayOfMonth)}
                    </div>
                    <div className="text-xs text-muted-foreground/70 mt-2">1-31</div>
                  </div>

                  {/* Month */}
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-xs text-muted-foreground mb-1">Month</div>
                    <div className="font-mono text-xl font-bold text-yellow-400 mb-2">
                      {parsedFields.month}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getFieldDescription("month", parsedFields.month)}
                    </div>
                    <div className="text-xs text-muted-foreground/70 mt-2">1-12</div>
                  </div>

                  {/* Day of Week */}
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-xs text-muted-foreground mb-1">Weekday</div>
                    <div className="font-mono text-xl font-bold text-red-400 mb-2">
                      {parsedFields.dayOfWeek}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getFieldDescription("dayOfWeek", parsedFields.dayOfWeek)}
                    </div>
                    <div className="text-xs text-muted-foreground/70 mt-2">0-6</div>
                  </div>
                </div>
              </div>
            )}

            {/* Next Execution Times */}
            {nextExecutions.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-medium text-accent-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Next Execution Times
                  </h2>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-muted-foreground">Show:</label>
                    <select
                      value={nextRunCount}
                      onChange={(e) => setNextRunCount(Number(e.target.value))}
                      className="px-3 py-1 bg-muted border border-border rounded text-sm text-foreground"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {nextExecutions.map((date, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-muted rounded-lg hover:bg-accent transition"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-sm text-white">
                          {formatDate(date)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {getRelativeTime(date)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Quick Examples */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h2 className="text-sm font-medium text-accent-foreground mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Quick Examples
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {EXAMPLES.map((example) => (
              <button
                key={example.expression}
                onClick={() => setExpression(example.expression)}
                className="p-3 bg-muted hover:bg-accent border border-border hover:border-blue-500 rounded-lg text-left transition group"
              >
                <div className="font-mono text-sm text-blue-400 mb-1">
                  {example.expression}
                </div>
                <div className="text-xs text-muted-foreground group-hover:text-muted-foreground">
                  {example.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Syntax Reference */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-base sm:text-lg font-medium text-accent-foreground mb-4">
            Cron Syntax Reference
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-white mb-3">Special Characters</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <code className="font-mono text-blue-400 font-bold">*</code>
                  <div className="flex-1">
                    <div className="text-accent-foreground">Any value</div>
                    <div className="text-xs text-muted-foreground">
                      Matches all possible values for this field
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <code className="font-mono text-blue-400 font-bold">,</code>
                  <div className="flex-1">
                    <div className="text-accent-foreground">List separator</div>
                    <div className="text-xs text-muted-foreground">
                      Example: <code className="text-blue-400">1,3,5</code> = 1, 3, and 5
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <code className="font-mono text-blue-400 font-bold">-</code>
                  <div className="flex-1">
                    <div className="text-accent-foreground">Range</div>
                    <div className="text-xs text-muted-foreground">
                      Example: <code className="text-blue-400">1-5</code> = 1 through 5
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <code className="font-mono text-blue-400 font-bold">/</code>
                  <div className="flex-1">
                    <div className="text-accent-foreground">Step values</div>
                    <div className="text-xs text-muted-foreground">
                      Example: <code className="text-blue-400">*/5</code> = every 5 units
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Field Ranges</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Minute:</span>
                  <code className="text-blue-400">0-59</code>
                </div>
                <div className="flex justify-between">
                  <span>Hour:</span>
                  <code className="text-purple-400">0-23</code>
                </div>
                <div className="flex justify-between">
                  <span>Day of Month:</span>
                  <code className="text-green-400">1-31</code>
                </div>
                <div className="flex justify-between">
                  <span>Month:</span>
                  <code className="text-yellow-400">1-12 or JAN-DEC</code>
                </div>
                <div className="flex justify-between">
                  <span>Day of Week:</span>
                  <code className="text-red-400">0-6 or SUN-SAT</code>
                </div>
              </div>
              <div className="mt-4 p-3 bg-muted rounded-lg text-xs">
                <div className="text-muted-foreground mb-1">
                  <strong className="text-white">Note:</strong> Day of week starts with Sunday (0)
                </div>
                <div className="text-muted-foreground">
                  0=Sunday, 1=Monday, ..., 6=Saturday
                </div>
              </div>
            </div>
          </div>
        </div>

        <RelatedTools currentPath="/cron" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Parse cron expressions in 30 seconds" variant="highlight">
            <QuickStartGuide steps={cronGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-cron" title={cronGuideContent.introduction.title} subtitle="Understanding cron expression syntax" variant="default">
            <MarkdownContent content={cronGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use cron parsing" variant="default">
            <FeatureGrid features={cronGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={cronGuideContent.howToUse.title} subtitle="Master cron expression parsing" variant="minimal">
            <HowToSchema name={`How to use ${cronGuideContent.toolName}`} description="Step-by-step guide to cron parsing" steps={cronGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${cronGuideContent.toolPath}`} />
            <MarkdownContent content={cronGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know about cron" variant="default">
            <ToolFAQ faqs={cronGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={cronGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={cronGuideContent.security.content} />
          </GeoSection>

          {cronGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(cronGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={cronGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-5xl mx-auto text-center text-sm text-muted-foreground">
          <p>
            Parse and understand cron expressions. Need to build one from scratch?{" "}
            <Link href="/cron-gen" className="text-blue-400 hover:underline">
              Try the Cron Generator
            </Link>
          </p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Cron Expression Parser & Validator"
        description="Parse, validate, and understand cron expressions with human-readable descriptions and next execution times."
        url="https://openkit.tools/cron"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={cronGuideContent.lastUpdated}
        version={cronGuideContent.version}
        aggregateRating={{ratingValue: "4.9", ratingCount: "2341", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Cron Parser', url: 'https://openkit.tools/cron' },
        ]}
      />
    </main>
  );
}
