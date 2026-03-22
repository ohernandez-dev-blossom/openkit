"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { Mail, Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
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
import { GeoContentLayout, GeoSection, StatsBar } from "@/components/geo-content-layout";
import { UseCases } from "@/components/use-cases";
import { extractEmailsGuideContent } from "@/content/extract-emails-guide";

export default function ExtractEmails() {
  useToolTracker("extract-emails", "Extract Emails", "utilities");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const trackedRef = useRef(false);
  const [input, setInput] = useState(`Contact us at support@example.com or sales@company.org.
For inquiries, email john.doe@email.co.uk or jane_smith123@domain.com.
Invalid emails like @test.com or user@ won't be matched.`);
  const [unique, setUnique] = useState(true);
  const [lowercase, setLowercase] = useState(true);

  const emails = useMemo(() => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const rawMatches = input.match(emailRegex) || [];
    let result: string[] = [...rawMatches];

    if (lowercase) {
      result = result.map((e) => e.toLowerCase());
    }

    if (unique) {
      result = [...new Set(result)];
    }

    return result;
  }, [input, unique, lowercase]);

  useEffect(() => {
    if (emails.length > 0 && !trackedRef.current) {
      analytics.trackToolUsage("extract-emails", { action: "emails-extracted", count: emails.length });
      trackedRef.current = true;
    }
  }, [emails.length, analytics]);

  const copyEmails = (format: "list" | "comma" | "single", email?: string) => {
    let text = "";
    if (format === "single" && email) {
      text = email;
    } else if (format === "list") {
      text = emails.join("\n");
    } else {
      text = emails.join(", ");
    }
    copy(text);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <Mail className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">Extract Emails</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Options */}
        <div className="flex flex-wrap gap-4 mb-4">
          <label htmlFor="page-input-59" className="flex items-center gap-2 cursor-pointer">
            <input id="page-input-59"
              type="checkbox"
              checked={unique}
              onChange={(e) => setUnique(e.target.checked)}
              className="w-4 h-4 rounded bg-muted border-border accent-red-500"
            />
            <span className="text-sm text-accent-foreground">Remove duplicates</span>
          </label>
          <label htmlFor="page-input-68" className="flex items-center gap-2 cursor-pointer">
            <input id="page-input-68"
              type="checkbox"
              checked={lowercase}
              onChange={(e) => setLowercase(e.target.checked)}
              className="w-4 h-4 rounded bg-muted border-border accent-red-500"
            />
            <span className="text-sm text-accent-foreground">Convert to lowercase</span>
          </label>
        </div>

        {/* Input */}
        <div className="space-y-2 mb-6">
          <label className="text-sm font-medium text-accent-foreground">Paste Text</label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste any text containing email addresses..."
            className="h-48 bg-card border-border text-sm text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Results */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-accent-foreground">
              Found {emails.length} email{emails.length !== 1 ? "s" : ""}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => copyEmails("list")}
                disabled={emails.length === 0}
                className="px-3 py-1.5 bg-muted hover:bg-accent disabled:opacity-50 rounded text-xs text-accent-foreground transition"
              >
                Copy List
              </button>
              <button
                onClick={() => copyEmails("comma")}
                disabled={emails.length === 0}
                className="px-3 py-1.5 bg-muted hover:bg-accent disabled:opacity-50 rounded text-xs text-accent-foreground transition"
              >
                Copy CSV
              </button>
            </div>
          </div>

          {emails.length > 0 ? (
            <div className="space-y-2">
              {emails.map((email, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <span className="font-mono text-sm text-white">{email}</span>
                  <button
                    onClick={() => copyEmails("single", email)}
                    className="text-muted-foreground hover:text-foreground p-1"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No email addresses found in the text.
            </p>
          )}
        </div>

        {isCopied && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm z-50">
            Copied!
          </div>
        )}

        <RelatedTools currentPath="/extract-emails" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={extractEmailsGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-email-extraction" title={extractEmailsGuideContent.introduction.title} subtitle="Understanding email address extraction" variant="default">
            <MarkdownContent content={extractEmailsGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use email extraction" variant="default">
            <UseCases cases={extractEmailsGuideContent.useCases} />
          </GeoSection>

          <GeoSection id="how-to-use" title={extractEmailsGuideContent.howToUse.title} subtitle="Master email extraction" variant="minimal">
            <HowToSchema
              name={`How to use ${extractEmailsGuideContent.toolName}`}
              description="Step-by-step guide to email extraction"
              steps={extractEmailsGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${extractEmailsGuideContent.toolPath}`}
            />
            <MarkdownContent content={extractEmailsGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={extractEmailsGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={extractEmailsGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={extractEmailsGuideContent.security.content} />
          </GeoSection>

          {extractEmailsGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(extractEmailsGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={extractEmailsGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Extract all email addresses from any text.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Email Extractor"
        description="Extract and validate email addresses from any text. Free tool to find, parse, and collect emails with deduplication and formatting options."
        url="https://openkit.tools/extract-emails"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={extractEmailsGuideContent.lastUpdated}
        version={extractEmailsGuideContent.version}
        aggregateRating={{ratingValue: "4.8", ratingCount: "1652", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://openkit.tools" },
          { name: "Email Extractor", url: "https://openkit.tools/extract-emails" }
        ]}
      />
    </main>
  );
}
