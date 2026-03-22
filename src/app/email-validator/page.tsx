"use client";

import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mail,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Trash2,
  Copy,
  Upload,
} from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import {
  GeoContentLayout,
  GeoSection,
  FeatureGrid,
} from "@/components/geo-content-layout";

// Known disposable email domains (subset — client-side only)
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "throwaway.email",
  "yopmail.com",
  "sharklasers.com",
  "guerrillamailblock.com",
  "grr.la",
  "dispostable.com",
  "mailnesia.com",
  "maildrop.cc",
  "trashmail.com",
  "temp-mail.org",
  "fakeinbox.com",
  "getnada.com",
  "tempail.com",
  "10minutemail.com",
  "mohmal.com",
  "emailondeck.com",
  "burnermail.io",
  "harakirimail.com",
  "mailcatch.com",
  "mytemp.email",
  "guerrillamail.info",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamail.de",
  "spam4.me",
  "trashmail.net",
  "tmail.ws",
]);

// Known free email providers
const FREE_PROVIDERS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "mail.com",
  "protonmail.com",
  "proton.me",
  "zoho.com",
  "gmx.com",
  "gmx.net",
  "yandex.com",
  "tutanota.com",
  "tuta.io",
  "fastmail.com",
  "hey.com",
  "live.com",
  "msn.com",
]);

type ValidationResult = {
  email: string;
  valid: boolean;
  checks: {
    name: string;
    passed: boolean;
    detail: string;
  }[];
  classification: "valid" | "warning" | "invalid";
  type: "free" | "disposable" | "business" | "unknown";
};

function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim().toLowerCase();
  const checks: ValidationResult["checks"] = [];

  // 1. Basic format (RFC 5322 simplified)
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const formatValid = emailRegex.test(trimmed);
  checks.push({
    name: "Format",
    passed: formatValid,
    detail: formatValid ? "Valid RFC 5322 format" : "Invalid email format",
  });

  if (!formatValid) {
    return {
      email: trimmed,
      valid: false,
      checks,
      classification: "invalid",
      type: "unknown",
    };
  }

  const [local, domain] = trimmed.split("@");

  // 2. Local part checks
  const localValid = local.length > 0 && local.length <= 64;
  checks.push({
    name: "Local part",
    passed: localValid,
    detail: localValid
      ? `"${local}" (${local.length} chars)`
      : `Local part too ${local.length === 0 ? "short" : "long"} (${local.length}/64)`,
  });

  // 3. Domain checks
  const domainParts = domain.split(".");
  const hasTLD = domainParts.length >= 2 && domainParts[domainParts.length - 1].length >= 2;
  checks.push({
    name: "Domain",
    passed: hasTLD,
    detail: hasTLD ? `Domain: ${domain}` : "Missing or invalid TLD",
  });

  // 4. No consecutive dots
  const noDoubleDots = !trimmed.includes("..");
  checks.push({
    name: "No double dots",
    passed: noDoubleDots,
    detail: noDoubleDots ? "No consecutive dots" : "Contains consecutive dots (..)",
  });

  // 5. No leading/trailing dots in local part
  const noEdgeDots = !local.startsWith(".") && !local.endsWith(".");
  checks.push({
    name: "Edge dots",
    passed: noEdgeDots,
    detail: noEdgeDots
      ? "No leading/trailing dots in local part"
      : "Local part starts or ends with a dot",
  });

  // 6. Disposable check
  const isDisposable = DISPOSABLE_DOMAINS.has(domain);
  checks.push({
    name: "Disposable",
    passed: !isDisposable,
    detail: isDisposable
      ? "⚠ Known disposable email domain"
      : "Not a known disposable domain",
  });

  // 7. Free provider check (informational)
  const isFree = FREE_PROVIDERS.has(domain);
  checks.push({
    name: "Provider type",
    passed: true,
    detail: isFree
      ? "Free email provider"
      : isDisposable
      ? "Disposable email service"
      : "Business/custom domain",
  });

  // 8. Common typo detection
  const commonDomains: Record<string, string> = {
    "gmial.com": "gmail.com",
    "gmai.com": "gmail.com",
    "gmail.con": "gmail.com",
    "gamil.com": "gmail.com",
    "gnail.com": "gmail.com",
    "hotmai.com": "hotmail.com",
    "hotmail.con": "hotmail.com",
    "yaho.com": "yahoo.com",
    "yahoo.con": "yahoo.com",
    "outloo.com": "outlook.com",
    "outlook.con": "outlook.com",
  };
  const typoSuggestion = commonDomains[domain];
  if (typoSuggestion) {
    checks.push({
      name: "Typo check",
      passed: false,
      detail: `Did you mean @${typoSuggestion}?`,
    });
  }

  const allPassed = checks.every((c) => c.passed);
  const hasWarnings = isDisposable || !!typoSuggestion;

  return {
    email: trimmed,
    valid: formatValid && localValid && hasTLD && noDoubleDots && noEdgeDots,
    checks,
    classification: !allPassed && !formatValid ? "invalid" : hasWarnings ? "warning" : "valid",
    type: isDisposable ? "disposable" : isFree ? "free" : "business",
  };
}

export default function EmailValidatorPage() {
  useToolTracker("email-validator", "Email Validator", "devtools");
  const { isCopied, copy } = useCopyToClipboard({ duration: 2000 });
  const analytics = useAnalytics();

  const [input, setInput] = useState("");
  const [results, setResults] = useState<ValidationResult[]>([]);

  const validate = useCallback(() => {
    const emails = input
      .split(/[\n,;]+/)
      .map((e) => e.trim())
      .filter(Boolean);
    const validations = emails.map(validateEmail);
    setResults(validations);
    analytics.trackToolUsage("email-validator", {
      action: "validate",
      count: emails.length,
    });
  }, [input, analytics]);

  useKeyboardShortcut(
    { key: "Enter", ctrl: true, meta: true, description: "Validate" },
    validate,
    { enabled: !!input.trim() }
  );

  const stats = useMemo(() => {
    const valid = results.filter((r) => r.classification === "valid").length;
    const warnings = results.filter((r) => r.classification === "warning").length;
    const invalid = results.filter((r) => r.classification === "invalid").length;
    return { valid, warnings, invalid, total: results.length };
  }, [results]);

  const exportValid = () => {
    const validEmails = results
      .filter((r) => r.valid)
      .map((r) => r.email)
      .join("\n");
    copy(validEmails);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <StructuredData
        type="WebApplication"
        name="Email Validator"
        description="Validate email addresses with syntax checking, disposable detection, and format analysis."
        applicationCategory="DeveloperApplication"
        url="https://openkit.tools/email-validator"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "Email Validator", url: "/email-validator" },
        ]}
      />

      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold">Email Validator</h1>
          </div>
          <LastUpdated date="2026-02-07" />
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <QuickStartGuide
          steps={[
            {
              icon: "edit",
              title: "Enter Emails",
              description: "Type or paste emails (one per line or comma-separated)",
            },
            {
              icon: "zap",
              title: "Validate",
              description: "Check syntax, format, and common issues",
            },
            {
              icon: "copy",
              title: "Export Valid",
              description: "Copy all valid addresses",
            },
          ]}
        />

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Email Addresses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={"user@example.com\ntest@gmail.com\nbad-email@\nspam@mailinator.com"}
                className="min-h-[200px] font-mono text-sm"
              />
              <div className="flex gap-2">
                <Button onClick={validate} className="flex-1" disabled={!input.trim()}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Validate
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setInput("");
                    setResults([]);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Results
                </span>
                {results.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={exportValid}>
                    <Copy className="mr-1 h-3 w-3" />
                    {isCopied ? "Copied!" : "Copy Valid"}
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.length > 0 ? (
                <div className="space-y-4">
                  {/* Stats bar */}
                  <div className="flex gap-3 text-sm">
                    <span className="flex items-center gap-1 text-green-500">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {stats.valid} valid
                    </span>
                    <span className="flex items-center gap-1 text-yellow-500">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {stats.warnings} warnings
                    </span>
                    <span className="flex items-center gap-1 text-red-500">
                      <XCircle className="w-3.5 h-3.5" />
                      {stats.invalid} invalid
                    </span>
                  </div>

                  {/* Results list */}
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {results.map((result, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg border ${
                          result.classification === "valid"
                            ? "border-green-500/30 bg-green-500/5"
                            : result.classification === "warning"
                            ? "border-yellow-500/30 bg-yellow-500/5"
                            : "border-red-500/30 bg-red-500/5"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {result.classification === "valid" ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          ) : result.classification === "warning" ? (
                            <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                          )}
                          <span className="font-mono text-sm truncate">
                            {result.email}
                          </span>
                          <span
                            className={`ml-auto text-xs px-2 py-0.5 rounded-full shrink-0 ${
                              result.type === "free"
                                ? "bg-blue-500/20 text-blue-500"
                                : result.type === "disposable"
                                ? "bg-red-500/20 text-red-500"
                                : result.type === "business"
                                ? "bg-purple-500/20 text-purple-500"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {result.type}
                          </span>
                        </div>
                        <div className="space-y-0.5 ml-6">
                          {result.checks
                            .filter((c) => !c.passed)
                            .map((check, j) => (
                              <p
                                key={j}
                                className="text-xs text-muted-foreground"
                              >
                                {check.detail}
                              </p>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Enter email addresses and click Validate
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <RelatedTools currentPath="/email-validator" maxVisible={8} />
      </section>

      <GeoContentLayout>
        <GeoSection title="What Does This Tool Check?">
          <FeatureGrid
            features={[
              {
                title: "RFC 5322 Syntax",
                description:
                  "Validates email format according to the email standard",
              },
              {
                title: "Domain Validation",
                description:
                  "Checks for valid TLD and domain structure",
              },
              {
                title: "Disposable Detection",
                description:
                  "Flags known disposable/temporary email services",
              },
              {
                title: "Typo Detection",
                description:
                  "Catches common domain typos (gmial.com → gmail.com)",
              },
              {
                title: "Bulk Validation",
                description:
                  "Validate multiple emails at once — paste a list",
              },
              {
                title: "Privacy First",
                description:
                  "All validation runs locally — emails never leave your browser",
              },
            ]}
          />
        </GeoSection>

        <GeoSection title="Limitations">
          <MarkdownContent
            content={`This is a **client-side syntax validator**. It checks format, structure, and known patterns but cannot:

- Verify the mailbox actually exists (requires SMTP check)
- Check if the domain has MX records (requires DNS query)  
- Determine if the mailbox is full or disabled

For production email validation, combine this tool with a server-side verification service.`}
          />
        </GeoSection>

        <HowToSchema
          name="How to Validate Email Addresses"
          description="Check email addresses for syntax errors, disposable domains, and common issues"
          steps={[
            {
              name: "Enter email addresses",
              text: "Type or paste one or more emails (separated by newlines or commas)",
            },
            {
              name: "Click Validate",
              text: "Press the Validate button or use Ctrl+Enter",
            },
            {
              name: "Review results",
              text: "Check syntax, warnings, and classification for each email",
            },
            {
              name: "Export valid emails",
              text: "Copy all valid addresses with one click",
            },
          ]}
        />

        <LastUpdated date="2026-02-07" />
      </GeoContentLayout>
    </main>
  );
}
