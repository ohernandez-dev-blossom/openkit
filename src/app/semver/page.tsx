"use client";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { GitBranch, ArrowUp, ArrowDown, Equal, Copy, RotateCcw, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";

interface ParsedVersion {
  valid: boolean;
  major: number;
  minor: number;
  patch: number;
  prerelease: string;
  build: string;
  raw: string;
}

function parseSemver(v: string): ParsedVersion {
  const raw = v.trim().replace(/^v/i, "");
  const match = raw.match(/^(\d+)\.(\d+)\.(\d+)(?:-([a-zA-Z0-9.]+))?(?:\+([a-zA-Z0-9.]+))?$/);
  if (!match) return { valid: false, major: 0, minor: 0, patch: 0, prerelease: "", build: "", raw };
  return {
    valid: true,
    major: parseInt(match[1]),
    minor: parseInt(match[2]),
    patch: parseInt(match[3]),
    prerelease: match[4] || "",
    build: match[5] || "",
    raw,
  };
}

function compareVersions(a: ParsedVersion, b: ParsedVersion): number {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  if (a.patch !== b.patch) return a.patch - b.patch;
  // Pre-release: no prerelease > with prerelease
  if (!a.prerelease && b.prerelease) return 1;
  if (a.prerelease && !b.prerelease) return -1;
  if (a.prerelease && b.prerelease) {
    return a.prerelease.localeCompare(b.prerelease);
  }
  return 0;
}

function bumpVersion(v: ParsedVersion, type: "major" | "minor" | "patch" | "prerelease"): string {
  if (!v.valid) return "invalid";
  switch (type) {
    case "major": return `${v.major + 1}.0.0`;
    case "minor": return `${v.major}.${v.minor + 1}.0`;
    case "patch": return `${v.major}.${v.minor}.${v.patch + 1}`;
    case "prerelease": {
      if (v.prerelease) {
        const parts = v.prerelease.split(".");
        const lastNum = parseInt(parts[parts.length - 1]);
        if (!isNaN(lastNum)) {
          parts[parts.length - 1] = String(lastNum + 1);
          return `${v.major}.${v.minor}.${v.patch}-${parts.join(".")}`;
        }
        return `${v.major}.${v.minor}.${v.patch}-${v.prerelease}.1`;
      }
      return `${v.major}.${v.minor}.${v.patch + 1}-0`;
    }
  }
}

function satisfiesRange(version: ParsedVersion, range: string): { satisfies: boolean; explanation: string } {
  const r = range.trim();
  if (!version.valid || !r) return { satisfies: false, explanation: "Invalid version or range" };

  // Exact match
  const exact = parseSemver(r);
  if (exact.valid) {
    const cmp = compareVersions(version, exact);
    return { satisfies: cmp === 0, explanation: `Exact match: ${version.raw} ${cmp === 0 ? "=" : "≠"} ${r}` };
  }

  // Caret range: ^1.2.3 → >=1.2.3 <2.0.0
  const caretMatch = r.match(/^\^(\d+)\.(\d+)\.(\d+)/);
  if (caretMatch) {
    const [, maj, min, pat] = caretMatch.map(Number);
    const lower = parseSemver(`${maj}.${min}.${pat}`);
    const upper = parseSemver(`${maj + 1}.0.0`);
    const aboveLower = compareVersions(version, lower) >= 0;
    const belowUpper = compareVersions(version, upper) < 0;
    return {
      satisfies: aboveLower && belowUpper,
      explanation: `^${maj}.${min}.${pat} → >=${maj}.${min}.${pat} <${maj + 1}.0.0`,
    };
  }

  // Tilde range: ~1.2.3 → >=1.2.3 <1.3.0
  const tildeMatch = r.match(/^~(\d+)\.(\d+)\.(\d+)/);
  if (tildeMatch) {
    const [, maj, min, pat] = tildeMatch.map(Number);
    const lower = parseSemver(`${maj}.${min}.${pat}`);
    const upper = parseSemver(`${maj}.${min + 1}.0`);
    const aboveLower = compareVersions(version, lower) >= 0;
    const belowUpper = compareVersions(version, upper) < 0;
    return {
      satisfies: aboveLower && belowUpper,
      explanation: `~${maj}.${min}.${pat} → >=${maj}.${min}.${pat} <${maj}.${min + 1}.0`,
    };
  }

  // Comparison operators: >=, <=, >, <, =
  const cmpMatch = r.match(/^(>=|<=|>|<|=)\s*(\d+\.\d+\.\d+.*)$/);
  if (cmpMatch) {
    const [, op, ver] = cmpMatch;
    const target = parseSemver(ver);
    if (!target.valid) return { satisfies: false, explanation: "Invalid range target" };
    const cmp = compareVersions(version, target);
    let result = false;
    switch (op) {
      case ">=": result = cmp >= 0; break;
      case "<=": result = cmp <= 0; break;
      case ">": result = cmp > 0; break;
      case "<": result = cmp < 0; break;
      case "=": result = cmp === 0; break;
    }
    return { satisfies: result, explanation: `${version.raw} ${op} ${ver} → ${result}` };
  }

  return { satisfies: false, explanation: "Unsupported range format" };
}

type Tab = "parse" | "compare" | "range" | "sort";

export default function SemverCalculator() {
  useToolTracker("semver", "Semver Calculator", "devtools");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const [tab, setTab] = useState<Tab>("parse");

  // Parse tab
  const [parseInput, setParseInput] = useState("2.4.1-beta.2+build.456");
  const parsed = useMemo(() => parseSemver(parseInput), [parseInput]);
  const bumps = useMemo(() => {
    if (!parsed.valid) return null;
    return {
      major: bumpVersion(parsed, "major"),
      minor: bumpVersion(parsed, "minor"),
      patch: bumpVersion(parsed, "patch"),
      prerelease: bumpVersion(parsed, "prerelease"),
    };
  }, [parsed]);

  // Compare tab
  const [compareA, setCompareA] = useState("1.5.0");
  const [compareB, setCompareB] = useState("2.0.0-rc.1");
  const compResult = useMemo(() => {
    const a = parseSemver(compareA);
    const b = parseSemver(compareB);
    if (!a.valid || !b.valid) return null;
    return compareVersions(a, b);
  }, [compareA, compareB]);

  // Range tab
  const [rangeVersion, setRangeVersion] = useState("1.5.3");
  const [rangeExpr, setRangeExpr] = useState("^1.2.0");
  const rangeResult = useMemo(() => {
    const v = parseSemver(rangeVersion);
    return satisfiesRange(v, rangeExpr);
  }, [rangeVersion, rangeExpr]);

  // Sort tab
  const [sortInput, setSortInput] = useState("3.1.0\n1.0.0-alpha\n2.5.1\n1.0.0\n2.5.1-beta.1\n0.9.0\n3.0.0-rc.2\n1.0.0-beta");
  const [sortAsc, setSortAsc] = useState(true);
  const sorted = useMemo(() => {
    const versions = sortInput.split("\n").map(l => l.trim()).filter(Boolean);
    const parsedList = versions.map(v => parseSemver(v));
    const valid = parsedList.filter(v => v.valid);
    const invalid = parsedList.filter(v => !v.valid);
    valid.sort((a, b) => sortAsc ? compareVersions(a, b) : compareVersions(b, a));
    return { valid, invalid };
  }, [sortInput, sortAsc]);

  const handleCopy = useCallback((text: string) => {
    copy(text);
    analytics.trackToolUsage("semver", { action: "copy" });
  }, [copy, analytics]);

  const tabs: { key: Tab; label: string }[] = [
    { key: "parse", label: "Parse & Bump" },
    { key: "compare", label: "Compare" },
    { key: "range", label: "Range Check" },
    { key: "sort", label: "Sort" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://openkit.tools" },
          { name: "Semver Calculator", url: "https://openkit.tools/semver" },
        ]}
      />
      <StructuredData
        type="WebApplication"
        name="Semver Calculator"
        description="Parse, compare, and bump semantic versions online."
        url="https://openkit.tools/semver"
        applicationCategory="DeveloperApplication"
      />
      <HowToSchema
        name="How to Use the Semver Calculator"
        steps={[
          { name: "Parse version", text: "Enter a semantic version string to parse its components" },
          { name: "Bump version", text: "Use the Bump section to calculate next major/minor/patch versions" },
          { name: "Compare versions", text: "Compare two versions to see which is greater" },
          { name: "Check range", text: "Check if a version satisfies a range expression (^, ~, >=, etc.)" },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Semver Calculator</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Semver Calculator</h1>
          </div>
          <p className="text-muted-foreground">
            Parse, compare, bump, and sort semantic versions. Check range compatibility for npm/cargo/gems.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => { setTab(t.key); analytics.trackToolUsage("semver", { action: "tab", tab: t.key }); }}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                tab === t.key
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Parse & Bump */}
        {tab === "parse" && (
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-1 block">Version String</label>
              <input
                type="text"
                value={parseInput}
                onChange={(e) => setParseInput(e.target.value)}
                className="w-full text-lg font-mono bg-muted rounded-lg px-4 py-3 border-0 outline-none"
                placeholder="1.2.3-beta.1+build.123"
              />
            </div>

            {parsed.valid ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-500">{parsed.major}</div>
                    <div className="text-xs text-muted-foreground mt-1">Major</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-500">{parsed.minor}</div>
                    <div className="text-xs text-muted-foreground mt-1">Minor</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-orange-500">{parsed.patch}</div>
                    <div className="text-xs text-muted-foreground mt-1">Patch</div>
                  </div>
                  {parsed.prerelease && (
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <div className="text-lg font-mono text-purple-500">{parsed.prerelease}</div>
                      <div className="text-xs text-muted-foreground mt-1">Pre-release</div>
                    </div>
                  )}
                  {parsed.build && (
                    <div className="bg-muted rounded-lg p-4 text-center">
                      <div className="text-lg font-mono text-cyan-500">{parsed.build}</div>
                      <div className="text-xs text-muted-foreground mt-1">Build</div>
                    </div>
                  )}
                </div>

                {bumps && (
                  <div>
                    <h3 className="text-sm font-medium mb-3">Bump to Next Version</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(["major", "minor", "patch", "prerelease"] as const).map(type => (
                        <button
                          key={type}
                          onClick={() => { setParseInput(bumps[type]); analytics.trackToolUsage("semver", { action: "bump", type }); }}
                          className="border rounded-lg p-3 text-left hover:bg-muted transition-colors"
                        >
                          <div className="text-xs text-muted-foreground capitalize">{type}</div>
                          <div className="font-mono text-sm">{bumps[type]}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : parseInput.trim() ? (
              <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-4">
                Invalid semver format. Expected: <code className="bg-muted px-1 rounded">MAJOR.MINOR.PATCH[-prerelease][+build]</code>
              </div>
            ) : null}
          </div>
        )}

        {/* Compare */}
        {tab === "compare" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
              <div>
                <label className="text-sm font-medium mb-1 block">Version A</label>
                <input
                  type="text"
                  value={compareA}
                  onChange={(e) => setCompareA(e.target.value)}
                  className="w-full font-mono bg-muted rounded-lg px-4 py-3 border-0 outline-none"
                  placeholder="1.0.0"
                />
              </div>
              <div className="text-center text-2xl font-bold py-2">
                {compResult === null ? "?" : compResult > 0 ? (
                  <span className="text-green-500">&gt;</span>
                ) : compResult < 0 ? (
                  <span className="text-red-500">&lt;</span>
                ) : (
                  <span className="text-blue-500">=</span>
                )}
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Version B</label>
                <input
                  type="text"
                  value={compareB}
                  onChange={(e) => setCompareB(e.target.value)}
                  className="w-full font-mono bg-muted rounded-lg px-4 py-3 border-0 outline-none"
                  placeholder="2.0.0"
                />
              </div>
            </div>
            {compResult !== null && (
              <div className={`text-center text-lg font-medium p-4 rounded-lg ${
                compResult > 0 ? "bg-green-500/10 text-green-500" :
                compResult < 0 ? "bg-red-500/10 text-red-500" :
                "bg-blue-500/10 text-blue-500"
              }`}>
                {compareA} is {compResult > 0 ? "greater than" : compResult < 0 ? "less than" : "equal to"} {compareB}
              </div>
            )}
          </div>
        )}

        {/* Range Check */}
        {tab === "range" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Version</label>
                <input
                  type="text"
                  value={rangeVersion}
                  onChange={(e) => setRangeVersion(e.target.value)}
                  className="w-full font-mono bg-muted rounded-lg px-4 py-3 border-0 outline-none"
                  placeholder="1.5.3"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Range Expression</label>
                <input
                  type="text"
                  value={rangeExpr}
                  onChange={(e) => setRangeExpr(e.target.value)}
                  className="w-full font-mono bg-muted rounded-lg px-4 py-3 border-0 outline-none"
                  placeholder="^1.2.0"
                />
              </div>
            </div>

            <div className={`p-4 rounded-lg text-center ${
              rangeResult.satisfies ? "bg-green-500/10 border border-green-500/20" : "bg-red-500/10 border border-red-500/20"
            }`}>
              <div className={`text-2xl font-bold mb-1 ${rangeResult.satisfies ? "text-green-500" : "text-red-500"}`}>
                {rangeResult.satisfies ? "✓ Satisfies" : "✗ Does not satisfy"}
              </div>
              <div className="text-sm text-muted-foreground">{rangeResult.explanation}</div>
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium">Supported range formats:</p>
              <ul className="list-disc pl-5 space-y-0.5">
                <li><code className="bg-muted px-1 rounded">^1.2.3</code> — Compatible (≥1.2.3, &lt;2.0.0)</li>
                <li><code className="bg-muted px-1 rounded">~1.2.3</code> — Approximately (≥1.2.3, &lt;1.3.0)</li>
                <li><code className="bg-muted px-1 rounded">&gt;=1.0.0</code>, <code className="bg-muted px-1 rounded">&lt;2.0.0</code>, <code className="bg-muted px-1 rounded">=1.5.0</code></li>
                <li>Exact version: <code className="bg-muted px-1 rounded">1.2.3</code></li>
              </ul>
            </div>
          </div>
        )}

        {/* Sort */}
        {tab === "sort" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Versions (one per line)</label>
              <Button
                onClick={() => { setSortAsc(!sortAsc); analytics.trackToolUsage("semver", { action: "sort", direction: sortAsc ? "desc" : "asc" }); }}
                variant="outline" size="sm" className="gap-1"
              >
                <ArrowUpDown className="w-4 h-4" /> {sortAsc ? "Ascending" : "Descending"}
              </Button>
            </div>
            <textarea
              value={sortInput}
              onChange={(e) => setSortInput(e.target.value)}
              className="w-full font-mono text-sm bg-muted rounded-lg px-4 py-3 border-0 outline-none min-h-[200px] resize-y"
              placeholder="1.0.0&#10;2.5.1&#10;1.0.0-beta&#10;3.0.0"
              spellCheck={false}
            />

            {sorted.valid.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Sorted ({sorted.valid.length} versions)</h3>
                  <Button
                    onClick={() => handleCopy(sorted.valid.map(v => v.raw).join("\n"))}
                    variant="outline" size="sm" className="gap-1"
                  >
                    <Copy className="w-4 h-4" /> {isCopied ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <div className="bg-muted rounded-lg p-3 space-y-1">
                  {sorted.valid.map((v, i) => (
                    <div key={i} className="font-mono text-sm flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-6 text-right">{i + 1}.</span>
                      <span>{v.raw}</span>
                      {v.prerelease && <span className="text-xs text-purple-500">pre</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {sorted.invalid.length > 0 && (
              <div className="text-sm text-destructive">
                Invalid: {sorted.invalid.map(v => v.raw).join(", ")}
              </div>
            )}
          </div>
        )}

        {/* Quick Start */}
        <div className="mt-12">
          <QuickStartGuide
            steps={[
              { title: "Parse a Version", description: "Enter any semver string (e.g. 2.4.1-beta.2) to see its components and bump options." },
              { title: "Compare Versions", description: "Switch to Compare tab to check which of two versions is greater." },
              { title: "Check Range Compatibility", description: "Use Range Check to see if a version satisfies ^, ~, or comparison ranges." },
              { title: "Sort Multiple Versions", description: "Paste multiple versions (one per line) to sort them in order." },
            ]}
          />
        </div>

        <div className="mt-8">
          <ToolFAQ
            faqs={[
              { question: "What is Semantic Versioning?", answer: "Semver (MAJOR.MINOR.PATCH) is a versioning standard where MAJOR = breaking changes, MINOR = new features (backward-compatible), PATCH = bug fixes. Pre-release tags and build metadata are optional." },
              { question: "What does ^ (caret) mean in version ranges?", answer: "^1.2.3 means 'compatible with 1.2.3' — any version ≥1.2.3 and <2.0.0. It allows minor and patch updates but not major ones. This is npm's default range operator." },
              { question: "What does ~ (tilde) mean?", answer: "~1.2.3 means 'approximately 1.2.3' — any version ≥1.2.3 and <1.3.0. It only allows patch-level updates within the same minor version." },
              { question: "Why is 1.0.0-alpha less than 1.0.0?", answer: "Per the semver spec, pre-release versions always have lower precedence than the associated normal version. So 1.0.0-alpha < 1.0.0-beta < 1.0.0." },
            ]}
          />
        </div>

        <LastUpdated date="2026-02-06" />

        <div className="mt-8">
          <RelatedTools currentPath="/semver" />
        </div>
      </div>
    </main>
  );
}
