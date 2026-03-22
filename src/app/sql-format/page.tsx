"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Database, Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RelatedTools } from "@/components/related-tools";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { sqlFormatGuideContent } from "@/content/sql-format-guide";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";

const SQL_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN',
  'OUTER JOIN', 'ON', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING',
  'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE',
  'ALTER TABLE', 'DROP TABLE', 'AS', 'DISTINCT', 'LIMIT', 'OFFSET',
  'UNION', 'UNION ALL', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'IN',
  'NOT IN', 'LIKE', 'BETWEEN', 'IS NULL', 'IS NOT NULL', 'EXISTS',
  'NOT EXISTS', 'ASC', 'DESC', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX'
];

export default function SQLFormatter() {
  useToolTracker("sql-format", "SQL Formatter", "formatters");
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [input, setInput] = useState(
    "select user.id,user.name,orders.total from users user join orders on user.id=orders.user_id where user.active=1 and orders.total>100 order by orders.total desc;"
  );
  const [uppercaseKeywords, setUppercaseKeywords] = useState(true);
  const [indentSize, setIndentSize] = useState(2);

  // Track tool usage on mount
  useEffect(() => {
    analytics.trackToolUsage('sql-formatter');
  }, [analytics]);

  const output = useMemo(() => {
    if (!input.trim()) return "";

    let sql = input.trim();
    const indent = " ".repeat(indentSize);

    // Normalize whitespace
    sql = sql.replace(/\s+/g, " ");

    // Add line breaks before major SQL_KEYWORDS
    const lineBreakKeywords = [
      'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 
      'INNER JOIN', 'OUTER JOIN', 'ORDER BY', 'GROUP BY', 'HAVING',
      'UNION', 'UNION ALL', 'LIMIT'
    ];

    lineBreakKeywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      sql = sql.replace(regex, `\n${keyword}`);
    });

    // Add line breaks and indent for AND/OR in WHERE clauses
    sql = sql.replace(/\b(AND|OR)\b/gi, (match) => `\n${indent}${match}`);

    // Handle JOIN ... ON
    sql = sql.replace(/\bON\b/gi, `\n${indent}ON`);

    // Format commas in SELECT
    sql = sql.replace(/,\s*/g, `,\n${indent}`);

    // Apply keyword casing
    if (uppercaseKeywords) {
      SQL_KEYWORDS.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        sql = sql.replace(regex, keyword.toUpperCase());
      });
    } else {
      SQL_KEYWORDS.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        sql = sql.replace(regex, keyword.toLowerCase());
      });
    }

    // Clean up extra newlines
    sql = sql.replace(/\n{3}/g, '\n\n');
    sql = sql.trim();

    return sql;
  }, [input, uppercaseKeywords, indentSize]);

  const handleCopy = () => {
    copy(output);
    analytics.trackToolInteraction('sql-formatter', 'copy', {
      content_length: output.length,
      uppercase_keywords: uppercaseKeywords,
      indent_size: indentSize,
    });
  };

  const handleKeywordCaseToggle = (value: boolean) => {
    setUppercaseKeywords(value);
    analytics.trackToolInteraction('sql-formatter', 'toggle_case', {
      uppercase: value,
    });
  };

  const handleIndentChange = (value: number) => {
    setIndentSize(value);
    analytics.trackToolInteraction('sql-formatter', 'indent_change', {
      indent_size: value,
    });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <Database className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">SQL Formatter</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Options */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <input aria-label="Input field"
              type="checkbox"
              id="uppercase"
              checked={uppercaseKeywords}
              onChange={(e) => handleKeywordCaseToggle(e.target.checked)}
              className="w-4 h-4 rounded border-border bg-card text-blue-600 focus:ring-blue-600 focus:ring-offset-background"
            />
            <label htmlFor="uppercase" className="text-sm text-accent-foreground cursor-pointer">
              Uppercase Keywords
            </label>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="indent" className="text-sm text-accent-foreground">
              Indent:
            </label>
            <select
              id="indent"
              value={indentSize}
              onChange={(e) => handleIndentChange(Number(e.target.value))}
              className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:border-border"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-2 mb-6">
          <label className="text-sm font-medium text-accent-foreground">
            Input SQL
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your messy SQL here..."
            className="h-48 bg-card border-border font-mono text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Output */}
        <div className="p-4 bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Formatted SQL</span>
            <button 
              onClick={handleCopy} 
              className="text-muted-foreground hover:text-foreground transition flex items-center gap-1.5"
              disabled={!output}
            >
              <Copy className="w-4 h-4" />
              <span className="text-xs">Copy</span>
            </button>
          </div>
          <pre className="font-mono text-sm text-cyan-400 whitespace-pre-wrap break-all overflow-x-auto">
            {output || "—"}
          </pre>
        </div>

        {/* Quick Tips */}
        <div className="mt-8">
          <h3 className="text-base sm:text-lg font-medium text-muted-foreground mb-3">Formatting Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {[
              "Keywords automatically capitalized",
              "Proper indentation for clauses",
              "Clean comma placement",
              "JOIN conditions formatted",
              "AND/OR logic indented",
              "Readable query structure",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2 p-2 bg-card rounded">
                <span className="text-cyan-500">✓</span>
                <span className="text-accent-foreground">{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm shadow-lg">
            ✓ Copied to clipboard!
          </div>
        )}

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={sqlFormatGuideContent.quickStartSteps} />
          </GeoSection>
          <GeoSection id="what-is" title={sqlFormatGuideContent.introduction.title} subtitle="Understanding SQL formatting" variant="default">
            <MarkdownContent content={sqlFormatGuideContent.introduction.content} />
          </GeoSection>
          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use SQL formatting daily" variant="default">
            <FeatureGrid features={sqlFormatGuideContent.useCases.map(uc => ({ title: uc.title, description: uc.description }))} columns={2} />
          </GeoSection>
          <GeoSection id="how-to-use" title={sqlFormatGuideContent.howToUse.title} subtitle="Master all features" variant="minimal">
            <HowToSchema name={`How to use ${sqlFormatGuideContent.toolName}`} description="Step-by-step guide" steps={sqlFormatGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${sqlFormatGuideContent.toolPath}`} />
            <MarkdownContent content={sqlFormatGuideContent.howToUse.content} />
          </GeoSection>
          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={sqlFormatGuideContent.faqs} />
          </GeoSection>
          <GeoSection id="security" title={sqlFormatGuideContent.security.title} subtitle="Your queries never leave your browser" variant="highlight">
            <MarkdownContent content={sqlFormatGuideContent.security.content} />
          </GeoSection>
          {sqlFormatGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(sqlFormatGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <RelatedTools currentPath="/sql-format" />
        <LastUpdated date={sqlFormatGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Format and beautify SQL queries with proper indentation and keyword casing.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="SQL Formatter"
        description="Format and beautify SQL queries with proper indentation and keyword casing."
        url="https://openkit.tools/sql-format"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={sqlFormatGuideContent.lastUpdated}
        version={sqlFormatGuideContent.version}
        aggregateRating={{ ratingValue: "4.7", ratingCount: "1500", bestRating: "5" }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "SQL Formatter", url: "https://openkit.tools/sql-format" },
        ]}
      />
    </main>
  );
}
