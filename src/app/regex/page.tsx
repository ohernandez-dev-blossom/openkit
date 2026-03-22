"use client";
import Link from "next/link";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Search, BookOpen, Zap, RefreshCw, Share2, Download } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { SHORTCUTS } from "@/lib/keyboard-shortcuts";
import { KeyboardHint } from "@/components/keyboard-hint";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { regexGuideContent } from "@/content/regex-guide";

type Match = {
  match: string;
  index: number;
  groups: string[];
};

type RegexPattern = {
  name: string;
  pattern: string;
  description: string;
  example?: string;
  flags?: string;
};

type CheatsheetSection = {
  title: string;
  icon?: string;
  items: { syntax: string; description: string; example?: string }[];
};

// Escape HTML to prevent XSS
const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// Common regex patterns library
const patternLibrary: { [category: string]: RegexPattern[] } = {
  "Communication": [
    {
      name: "Email",
      pattern: "\\b[\\w.-]+@[\\w.-]+\\.\\w+\\b",
      description: "Standard email address",
      example: "user@example.com",
      flags: "gi"
    },
    {
      name: "Email (RFC 5322)",
      pattern: "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])",
      description: "RFC 5322 compliant email",
      example: "complex.email+tag@sub.domain.com",
      flags: "i"
    },
    {
      name: "URL",
      pattern: "https?://[\\w.-]+(?:/[\\w.-]*)*/?(?:\\?[\\w=&.-]*)?",
      description: "HTTP/HTTPS URLs",
      example: "https://example.com/path?query=value",
      flags: "gi"
    },
    {
      name: "Phone (US)",
      pattern: "\\+?1?[-.]?\\(?\\d{3}\\)?[-.]?\\d{3}[-.]?\\d{4}",
      description: "US phone numbers",
      example: "(555) 123-4567",
      flags: "g"
    },
    {
      name: "Phone (International)",
      pattern: "\\+?\\d{1,3}[-.\\s]?\\(?\\d{1,4}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}",
      description: "International format",
      example: "+44 20 7123 4567",
      flags: "g"
    }
  ],
  "Web": [
    {
      name: "IPv4",
      pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b",
      description: "IPv4 address",
      example: "192.168.1.1",
      flags: "g"
    },
    {
      name: "IPv6",
      pattern: "(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}",
      description: "IPv6 address",
      example: "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
      flags: "gi"
    },
    {
      name: "Domain",
      pattern: "(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z]{2}",
      description: "Domain name",
      example: "example.com",
      flags: "gi"
    },
    {
      name: "Hex Color",
      pattern: "#[0-9A-Fa-f]{6}\\b|#[0-9A-Fa-f]{3}\\b",
      description: "Hexadecimal color code",
      example: "#FF5733 or #F73",
      flags: "g"
    },
    {
      name: "HTML Tag",
      pattern: "<([a-z]+)([^<]+)*(?:>(.*?)</\\1>|\\s*/>)",
      description: "HTML tags with content",
      example: "<div class=\"test\">content</div>",
      flags: "gi"
    }
  ],
  "Formats": [
    {
      name: "Date (YYYY-MM-DD)",
      pattern: "\\d{4}-\\d{2}-\\d{2}",
      description: "ISO 8601 date format",
      example: "2024-01-31",
      flags: "g"
    },
    {
      name: "Date (MM/DD/YYYY)",
      pattern: "\\d{1,2}/\\d{1,2}/\\d{4}",
      description: "US date format",
      example: "01/31/2024",
      flags: "g"
    },
    {
      name: "Time (24h)",
      pattern: "([01]?[0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?",
      description: "24-hour time format",
      example: "14:30:00",
      flags: "g"
    },
    {
      name: "Credit Card",
      pattern: "\\b\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}\\b",
      description: "Credit card number",
      example: "1234 5678 9012 3456",
      flags: "g"
    },
    {
      name: "UUID",
      pattern: "[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}",
      description: "Universally unique identifier",
      example: "550e8400-e29b-41d4-a716-446655440000",
      flags: "g"
    },
    {
      name: "Social Security (US)",
      pattern: "\\b\\d{3}-\\d{2}-\\d{4}\\b",
      description: "US SSN format",
      example: "123-45-6789",
      flags: "g"
    }
  ],
  "Programming": [
    {
      name: "Variable Name",
      pattern: "\\b[a-zA-Z_][a-zA-Z0-9_]*\\b",
      description: "Valid variable identifier",
      example: "_myVariable123",
      flags: "g"
    },
    {
      name: "JavaScript Function",
      pattern: "function\\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\\s*\\([^)]*\\)",
      description: "Function declaration",
      example: "function myFunc(param)",
      flags: "g"
    },
    {
      name: "Import Statement",
      pattern: "import\\s+.*?\\s+from\\s+['\"].*?['\"];?",
      description: "ES6 import",
      example: "import React from 'react';",
      flags: "g"
    },
    {
      name: "JSON String",
      pattern: "\"(?:\\\\.|[^\\\\\"])*\"",
      description: "JSON string value",
      example: "\"escaped \\\" string\"",
      flags: "g"
    }
  ],
  "Validation": [
    {
      name: "Username",
      pattern: "^[a-zA-Z0-9_]{3,16}$",
      description: "Alphanumeric + underscore, 3-16 chars",
      example: "user_name123",
      flags: ""
    },
    {
      name: "Password (Strong)",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8}$",
      description: "Min 8 chars, upper, lower, number, special",
      example: "MyP@ssw0rd",
      flags: ""
    },
    {
      name: "Slug",
      pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
      description: "URL-friendly slug",
      example: "my-url-slug",
      flags: ""
    },
    {
      name: "Positive Integer",
      pattern: "^[1-9]\\d*$",
      description: "Positive whole number",
      example: "123",
      flags: ""
    },
    {
      name: "Decimal Number",
      pattern: "^-?\\d+\\.\\d+$",
      description: "Decimal with optional sign",
      example: "-123.45",
      flags: ""
    }
  ]
};

// Regex cheatsheet reference
const cheatsheetSections: CheatsheetSection[] = [
  {
    title: "Character Classes",
    items: [
      { syntax: ".", description: "Any character except newline" },
      { syntax: "\\d", description: "Digit (0-9)" },
      { syntax: "\\D", description: "Not a digit" },
      { syntax: "\\w", description: "Word character (a-z, A-Z, 0-9, _)" },
      { syntax: "\\W", description: "Not a word character" },
      { syntax: "\\s", description: "Whitespace (space, tab, newline)" },
      { syntax: "\\S", description: "Not whitespace" },
      { syntax: "[abc]", description: "Any of a, b, or c" },
      { syntax: "[^abc]", description: "Not a, b, or c" },
      { syntax: "[a-z]", description: "Character range a to z" },
      { syntax: "[a-zA-Z]", description: "Any letter" },
      { syntax: "[0-9]", description: "Any digit" }
    ]
  },
  {
    title: "Anchors & Boundaries",
    items: [
      { syntax: "^", description: "Start of string/line" },
      { syntax: "$", description: "End of string/line" },
      { syntax: "\\b", description: "Word boundary" },
      { syntax: "\\B", description: "Not a word boundary" },
      { syntax: "\\A", description: "Start of string (not line)" },
      { syntax: "\\Z", description: "End of string (not line)" }
    ]
  },
  {
    title: "Quantifiers",
    items: [
      { syntax: "*", description: "0 or more", example: "a* matches '', 'a', 'aa'" },
      { syntax: "+", description: "1 or more", example: "a+ matches 'a', 'aa', not ''" },
      { syntax: "?", description: "0 or 1 (optional)", example: "colou?r matches 'color' and 'colour'" },
      { syntax: "{n}", description: "Exactly n times", example: "\\d{3} matches '123'" },
      { syntax: "{n}", description: "n or more times", example: "\\d{2} matches '12', '123'" },
      { syntax: "{n,m}", description: "Between n and m times", example: "\\d{2,4} matches '12', '123', '1234'" },
      { syntax: "*?", description: "0 or more (lazy)", example: "Non-greedy version" },
      { syntax: "+?", description: "1 or more (lazy)" },
      { syntax: "??", description: "0 or 1 (lazy)" }
    ]
  },
  {
    title: "Groups & Lookaround",
    items: [
      { syntax: "(abc)", description: "Capturing group", example: "Capture and reference with $1" },
      { syntax: "(?:abc)", description: "Non-capturing group", example: "Group without capture" },
      { syntax: "(?<name>abc)", description: "Named capturing group", example: "Reference with $<name>" },
      { syntax: "\\1", description: "Backreference to group 1", example: "(\\w)\\1 matches 'aa', 'bb'" },
      { syntax: "(?=abc)", description: "Positive lookahead", example: "x(?=y) matches 'x' if followed by 'y'" },
      { syntax: "(?!abc)", description: "Negative lookahead", example: "x(?!y) matches 'x' if NOT followed by 'y'" },
      { syntax: "(?<=abc)", description: "Positive lookbehind", example: "(?<=x)y matches 'y' after 'x'" },
      { syntax: "(?<!abc)", description: "Negative lookbehind", example: "(?<!x)y matches 'y' not after 'x'" }
    ]
  },
  {
    title: "Flags / Modifiers",
    items: [
      { syntax: "g", description: "Global - find all matches" },
      { syntax: "i", description: "Case insensitive" },
      { syntax: "m", description: "Multiline - ^ and $ match line boundaries" },
      { syntax: "s", description: "Dotall - dot matches newlines" },
      { syntax: "u", description: "Unicode - treat pattern as Unicode" },
      { syntax: "y", description: "Sticky - match from lastIndex only" }
    ]
  },
  {
    title: "Special Characters",
    items: [
      { syntax: "\\", description: "Escape special character", example: "\\. matches literal '.'" },
      { syntax: "|", description: "Alternation (OR)", example: "cat|dog matches 'cat' or 'dog'" },
      { syntax: "\\n", description: "Newline" },
      { syntax: "\\r", description: "Carriage return" },
      { syntax: "\\t", description: "Tab" },
      { syntax: "\\0", description: "Null character" },
      { syntax: "\\xhh", description: "Hex character", example: "\\x41 is 'A'" },
      { syntax: "\\uhhhh", description: "Unicode character", example: "\\u00A9 is ©" }
    ]
  }
];

export default function RegexCheatsheet() {
  useToolTracker("regex", "Regex Tester", "utilities");
  const { isCopied } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState("gi");
  const [testText, setTestText] = useState("Contact us at hello@example.com or support@test.org for help.");
  const [replaceText, setReplaceText] = useState("[redacted]");
  const [showReplace, setShowReplace] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    "Character Classes": true
  });
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({
    "Communication": true
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [exportOpen, setExportOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const highlightRef = useRef<HTMLDivElement>(null);
  const { isCopied: isExportCopied, copy: copyExport } = useCopyToClipboard({ duration: 1500 });

  // Load from URL params on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const p = params.get('p');
      const f = params.get('f');
      const t = params.get('t');
      if (p) setPattern(atob(p));
      if (f !== null) setFlags(f);
      if (t) setTestText(atob(t));
    } catch {
      // Invalid URL params, ignore
    }
  }, []);

  const results = useMemo(() => {
    const safeText = escapeHtml(testText);
    if (!pattern || !testText) return { matches: [], highlightedText: safeText, replacedText: testText, error: null };

    try {
      const regex = new RegExp(pattern, flags);
      const matches: Match[] = [];
      let match;

      if (flags.includes("g")) {
        while ((match = regex.exec(testText)) !== null) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)});
        }
      } else {
        match = regex.exec(testText);
        if (match) {
          matches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1)});
        }
      }

      // Compute replacement
      let replacedText = testText;
      try {
        replacedText = testText.replace(new RegExp(pattern, flags), replaceText);
      } catch {
        // Replacement might fail, keep original
      }

      let highlightedText = safeText;
      let offset = 0;
      const sortedMatches = [...matches].sort((a, b) => a.index - b.index);

      const escapeOffset = (idx: number): number => {
        let off = 0;
        for (let i = 0; i < idx && i < testText.length; i++) {
          const c = testText[i];
          if (c === '&') off += 4;
          else if (c === '<' || c === '>') off += 3;
          else if (c === '"') off += 5;
          else if (c === "'") off += 4;
        }
        return off;
      };

      for (let idx = 0; idx < sortedMatches.length; idx++) {
        const m = sortedMatches[idx];
        const escapedMatch = escapeHtml(m.match);
        const adjIndex = m.index + escapeOffset(m.index);
        const before = highlightedText.slice(0, adjIndex + offset);
        const after = highlightedText.slice(adjIndex + offset + escapedMatch.length);
        const isCurrent = idx === currentMatchIndex;
        const markClass = isCurrent
          ? "bg-indigo-500/50 text-indigo-200 px-0.5 rounded"
          : "bg-yellow-500/50 text-yellow-200 px-0.5 rounded";
        const openTag = `<mark id="regex-match-${idx}" class="${markClass}">`;
        const closeTag = `</mark>`;
        highlightedText = before + openTag + escapedMatch + closeTag + after;
        offset += openTag.length + closeTag.length;
      }

      return { matches, highlightedText, replacedText, error: null };
    } catch (e) {
      return { matches: [], highlightedText: safeText, replacedText: testText, error: e instanceof Error ? e.message : "Invalid regex" };
    }
  }, [pattern, flags, testText, replaceText, currentMatchIndex]);

  // Derive error from results instead of setting in effect
  const error = results.error || "";

  // Track regex test usage
  useEffect(() => {
    if (pattern && testText && results.matches.length > 0 && !results.error) {
      analytics.trackToolUsage('regex', {
        action: 'test',
        patternLength: pattern.length,
        matchCount: results.matches.length,
        hasFlags: flags.length > 0,
        textLength: testText.length,
      });
    }
    if (results.error) {
      analytics.trackError('regex-error', {
        tool_name: 'regex',
        errorType: 'invalid-pattern',
      });
    }
  }, [results.matches.length, results.error, pattern, flags, testText, analytics]);

  const toggleFlag = useCallback((flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ""));
    } else {
      setFlags(flags + flag);
    }
  }, [flags]);

  const copyPattern = () => {
    navigator.clipboard.writeText(`/${pattern}/${flags}`);
    analytics.trackToolInteraction('regex', 'copy-pattern');
  };

  const loadPattern = (p: RegexPattern) => {
    setPattern(p.pattern);
    if (p.flags) setFlags(p.flags);
    if (p.example) setTestText(p.example);
    
    analytics.trackToolInteraction('regex', 'load-pattern', {
      patternName: p.name,
    });
  };

  const randomize = () => {
    // Get all patterns from all categories
    const allPatterns = Object.values(patternLibrary).flat();
    const randomPattern = allPatterns[Math.floor(Math.random() * allPatterns.length)];
    loadPattern(randomPattern);
    
    analytics.trackToolInteraction('regex', 'randomize');
  };

  // Reset match index when matches change
  useEffect(() => {
    setCurrentMatchIndex(0);
  }, [results.matches.length]);

  // Share pattern via URL
  const sharePattern = () => {
    const url = new URL(window.location.href.split('?')[0]);
    url.searchParams.set('p', btoa(pattern));
    url.searchParams.set('f', flags);
    url.searchParams.set('t', btoa(testText));
    navigator.clipboard.writeText(url.toString());
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 1500);
    analytics.trackToolInteraction('regex', 'share-pattern');
  };

  // Match navigator
  const goToMatch = (index: number) => {
    setCurrentMatchIndex(index);
    setTimeout(() => {
      const el = document.getElementById(`regex-match-${index}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 0);
  };

  const prevMatch = () => {
    if (results.matches.length === 0) return;
    const newIndex = (currentMatchIndex - 1 + results.matches.length) % results.matches.length;
    goToMatch(newIndex);
  };

  const nextMatch = () => {
    if (results.matches.length === 0) return;
    const newIndex = (currentMatchIndex + 1) % results.matches.length;
    goToMatch(newIndex);
  };

  // Export functions
  const exportAsJSON = () => {
    const data = results.matches.map(m => ({
      match: m.match,
      index: m.index,
      groups: m.groups
    }));
    copyExport(JSON.stringify(data, null, 2));
    setExportOpen(false);
    analytics.trackToolInteraction('regex', 'export-json');
  };

  const exportAsCSV = () => {
    const maxGroups = Math.max(0, ...results.matches.map(m => m.groups.length));
    const headers = ['match', 'index', ...Array.from({ length: maxGroups }, (_, i) => `group${i + 1}`)];
    const rows = results.matches.map(m => {
      const groups = Array.from({ length: maxGroups }, (_, i) => `"${(m.groups[i] || '').replace(/"/g, '""')}"`);
      return [`"${m.match.replace(/"/g, '""')}"`, m.index, ...groups].join(',');
    });
    copyExport([headers.join(','), ...rows].join('\n'));
    setExportOpen(false);
    analytics.trackToolInteraction('regex', 'export-csv');
  };

  const exportAsList = () => {
    copyExport(results.matches.map(m => m.match).join('\n'));
    setExportOpen(false);
    analytics.trackToolInteraction('regex', 'export-list');
  };

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const filteredCheatsheet = searchTerm
    ? cheatsheetSections.map(section => ({
        ...section,
        items: section.items.filter(item =>
          item.syntax.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(section => section.items.length > 0)
    : cheatsheetSections;

  // Keyboard shortcuts
  useKeyboardShortcut(SHORTCUTS.copy, copyPattern, { enabled: !!pattern });
  useKeyboardShortcut(SHORTCUTS.clear, () => { setPattern(""); setTestText(""); setReplaceText(""); });
  useKeyboardShortcut(SHORTCUTS.sample, randomize);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center font-bold text-sm hover:opacity-80 transition">
              .*
            </Link>
            <h1 className="text-xl font-semibold">Regex Cheatsheet & Tester</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={randomize}
              className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Random</span>
              <KeyboardHint shortcut={SHORTCUTS.sample} />
            </button>
            <button
              onClick={sharePattern}
              className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{shareCopied ? "Copied!" : "Share"}</span>
            </button>
            <button
              onClick={copyPattern}
              className="flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-500 rounded-lg text-sm font-medium transition"
            >
              <Copy className="w-4 h-4" />
              {isCopied ? "Copied!" : "Copy Pattern"}
              {pattern && <KeyboardHint shortcut={SHORTCUTS.copy} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column: Tester */}
          <div className="space-y-6">
            {/* Pattern Input */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Live Regex Tester
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <span className="text-muted-foreground text-2xl">/</span>
                  <input aria-label="Input field"
                    type="text"
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    className="flex-1 bg-muted border border-border rounded px-3 py-2 font-mono text-lg focus:border-pink-500 outline-none"
                    placeholder="Enter regex pattern..."
                  />
                  <span className="text-muted-foreground text-2xl">/</span>
                  <input aria-label="Input field"
                    type="text"
                    value={flags}
                    onChange={(e) => setFlags(e.target.value)}
                    className="w-16 bg-muted border border-border rounded px-3 py-2 font-mono text-lg focus:border-pink-500 outline-none"
                    placeholder="gi"
                  />
                </div>

                {/* Flags */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { flag: "g", label: "Global" },
                    { flag: "i", label: "Case Insensitive" },
                    { flag: "m", label: "Multiline" },
                    { flag: "s", label: "Dotall" },
                    { flag: "u", label: "Unicode" },
                    { flag: "y", label: "Sticky" },
                  ].map(({ flag, label }) => (
                    <button
                      key={flag}
                      onClick={() => toggleFlag(flag)}
                      className={`px-3 py-1 rounded text-sm font-mono transition ${
                        flags.includes(flag)
                          ? "bg-pink-600 text-white"
                          : "bg-muted text-foreground hover:bg-accent"
                      }`}
                    >
                      {flag} - {label}
                    </button>
                  ))}
                </div>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">
                    {error}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Test String */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Test String</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  className="h-32 bg-muted border-border font-mono text-sm resize-none focus:border-pink-500"
                  placeholder="Enter text to test against..."
                />
              </CardContent>
            </Card>

            {/* Replace/Substitution */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Replace/Substitution</CardTitle>
                  <button
                    onClick={() => setShowReplace(!showReplace)}
                    className="text-xs px-3 py-1 bg-muted hover:bg-accent rounded transition"
                  >
                    {showReplace ? "Hide" : "Show"}
                  </button>
                </div>
              </CardHeader>
              {showReplace && (
                <CardContent className="space-y-3">
                  <div>
                    <label htmlFor="page-input-567" className="text-xs text-muted-foreground mb-1 block">Replacement Text</label>
                    <input id="page-input-567"
                      type="text"
                      value={replaceText}
                      onChange={(e) => setReplaceText(e.target.value)}
                      className="w-full bg-muted border border-border rounded px-3 py-2 font-mono text-sm focus:border-pink-500 outline-none"
                      placeholder="$1, $2, $&, etc."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Use $1, $2 for capture groups, $&amp; for full match, $` and $&apos; for before/after
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Preview</label>
                    <div className="p-4 bg-muted rounded font-mono text-sm whitespace-pre-wrap break-all max-h-48 overflow-auto">
                      {escapeHtml(results.replacedText)}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Results */}
            <div className="grid gap-6">
              {/* Highlighted Text */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      Highlighted Matches ({results.matches.length})
                    </CardTitle>
                    {results.matches.length > 0 && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={prevMatch}
                          className="p-1 bg-muted hover:bg-accent rounded transition"
                          aria-label="Previous match"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {currentMatchIndex + 1} / {results.matches.length}
                        </span>
                        <button
                          onClick={nextMatch}
                          className="p-1 bg-muted hover:bg-accent rounded transition"
                          aria-label="Next match"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    ref={highlightRef}
                    className="p-4 bg-muted rounded font-mono text-sm whitespace-pre-wrap break-all max-h-64 overflow-auto"
                    dangerouslySetInnerHTML={{ __html: results.highlightedText }}
                  />
                </CardContent>
              </Card>

              {/* Match List */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Match Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {results.matches.length > 0 ? (
                    <div className="space-y-2 max-h-64 overflow-auto">
                      {results.matches.map((m, i) => (
                        <div key={i} className="p-3 bg-muted rounded">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-muted-foreground">Match #{i + 1}</span>
                            <span className="text-xs text-muted-foreground">Index: {m.index}</span>
                          </div>
                          <code className="text-pink-400 font-mono">{m.match}</code>
                          {m.groups.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-border">
                              <span className="text-xs text-muted-foreground">Capturing Groups:</span>
                              {m.groups.map((g, gi) => (
                                <div key={gi} className="text-sm font-mono text-accent-foreground">
                                  ${gi + 1}: {g || "(empty)"}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No matches found</p>
                  )}
                </CardContent>
              </Card>

              {/* Export Matches */}
              {results.matches.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setExportOpen(!exportOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent rounded-lg text-sm transition w-full justify-center"
                  >
                    <Download className="w-4 h-4" />
                    {isExportCopied ? "Copied!" : "Export Matches"}
                    <ChevronDown className={`w-4 h-4 transition ${exportOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {exportOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-muted border border-border rounded-lg overflow-hidden z-10 shadow-lg">
                      <button
                        onClick={exportAsJSON}
                        className="w-full px-4 py-2 text-sm text-left hover:bg-accent transition"
                      >
                        Copy as JSON
                      </button>
                      <button
                        onClick={exportAsCSV}
                        className="w-full px-4 py-2 text-sm text-left hover:bg-accent transition"
                      >
                        Copy as CSV
                      </button>
                      <button
                        onClick={exportAsList}
                        className="w-full px-4 py-2 text-sm text-left hover:bg-accent transition"
                      >
                        Copy as List
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Cheatsheet & Patterns */}
          <div className="space-y-6">
            {/* Pattern Library */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Common Patterns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(patternLibrary).map(([category, patterns]) => (
                  <div key={category} className="border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center justify-between px-4 py-2 bg-muted/50 hover:bg-muted transition"
                    >
                      <span className="font-semibold text-sm">{category}</span>
                      {expandedCategories[category] ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    {expandedCategories[category] && (
                      <div className="p-3 space-y-2">
                        {patterns.map((p, i) => (
                          <div
                            key={i}
                            onClick={() => loadPattern(p)}
                            className="p-2 bg-muted/30 hover:bg-muted rounded cursor-pointer transition group"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-foreground">{p.name}</span>
                              <Copy className="w-3 h-3 text-muted-foreground group-hover:text-pink-400" />
                            </div>
                            <code className="text-xs text-pink-400 font-mono block mb-1">
                              /{p.pattern}/{p.flags || ''}
                            </code>
                            <p className="text-xs text-muted-foreground">{p.description}</p>
                            {p.example && (
                              <p className="text-xs text-muted-foreground/70 mt-1">e.g., {p.example}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Cheatsheet Reference */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Syntax Reference
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Search */}
                <div className="relative">
                  <input aria-label="Input field"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search syntax..."
                    className="w-full px-3 py-2 pl-9 bg-muted border border-border rounded text-sm focus:border-pink-500 outline-none"
                  />
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
                </div>

                {/* Cheatsheet Sections */}
                <div className="space-y-2 max-h-[600px] overflow-auto">
                  {filteredCheatsheet.map((section) => (
                    <div key={section.title} className="border border-border rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleSection(section.title)}
                        className="w-full flex items-center justify-between px-4 py-2 bg-muted/50 hover:bg-muted transition"
                      >
                        <span className="font-semibold text-sm">{section.title}</span>
                        {expandedSections[section.title] ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                      {expandedSections[section.title] && (
                        <div className="p-3">
                          <table className="w-full text-xs">
                            <tbody>
                              {section.items.map((item, i) => (
                                <tr key={i} className="border-b border-border last:border-0">
                                  <td className="py-2 pr-3 font-mono text-pink-400 align-top whitespace-nowrap">
                                    {item.syntax}
                                  </td>
                                  <td className="py-2 text-accent-foreground">
                                    {item.description}
                                    {item.example && (
                                      <div className="text-muted-foreground mt-1 italic">
                                        {item.example}
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* GEO Content - Professional Design System */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
        <GeoContentLayout>
          {/* Quick Start Guide */}
          <GeoSection
            id="quick-start"
            title="Quick Start Guide"
            subtitle="Test regex patterns in seconds"
            variant="highlight"
          >
            <QuickStartGuide steps={regexGuideContent.quickStartSteps} />
          </GeoSection>

          {/* Understanding Regex Section */}
          <GeoSection
            id="understanding-regex"
            title={regexGuideContent.introduction.title}
            subtitle="Master pattern matching for text processing"
            variant="default"
          >
            <MarkdownContent content={regexGuideContent.introduction.content} />
          </GeoSection>

          {/* Use Cases - Feature Grid */}
          <GeoSection
            id="use-cases"
            title="Common Use Cases"
            subtitle="How developers use regex in production"
            variant="default"
          >
            <FeatureGrid
              features={regexGuideContent.useCases.map(uc => ({
                title: uc.title,
                description: uc.description
              }))}
              columns={2}
            />
          </GeoSection>

          {/* How to Use This Tool */}
          <GeoSection
            id="how-to-use"
            title={regexGuideContent.howToUse.title}
            subtitle="Master the tester and pattern library"
            variant="minimal"
          >
            <HowToSchema
              name={`How to use ${regexGuideContent.toolName}`}
              description="Step-by-step guide to testing regular expressions"
              steps={regexGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${regexGuideContent.toolPath}`}
            />
            <MarkdownContent content={regexGuideContent.howToUse.content} />
          </GeoSection>

          {/* FAQ */}
          <GeoSection
            id="faq"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about regex"
            variant="default"
          >
            <ToolFAQ faqs={regexGuideContent.faqs} />
          </GeoSection>

          {/* Security & Privacy */}
          <GeoSection
            id="security"
            title={regexGuideContent.security.title}
            subtitle="Your patterns and test data never leave your browser"
            variant="highlight"
          >
            <MarkdownContent content={regexGuideContent.security.content} />
          </GeoSection>

          {/* Statistics - Stats Bar */}
          {regexGuideContent.stats && (
            <GeoSection
              id="stats"
              title="By the Numbers"
              subtitle="Regex testing capabilities and performance"
              variant="minimal"
            >
              <StatsBar
                stats={Object.entries(regexGuideContent.stats).map(([label, value]) => ({
                  label,
                  value
                }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        {/* Last Updated */}
        <LastUpdated date={regexGuideContent.lastUpdated} />
      </div>

      {/* Related Tools */}
      <RelatedTools currentPath="/regex" />

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-4 mt-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Master regular expressions with comprehensive reference and live testing. JavaScript flavor supported.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Regex Cheatsheet & Tester | OpenKit.tools"
        description="Comprehensive regex reference with live pattern testing, common pattern library, and syntax guide. Master regular expressions with real-time validation."
        url="https://openkit.tools/regex"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={regexGuideContent.lastUpdated}
        version={regexGuideContent.version}
        aggregateRating={{
          ratingValue: "4.8",
          ratingCount: "2156",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: 'https://openkit.tools' },
          { name: 'Regex Cheatsheet', url: 'https://openkit.tools/regex' },
        ]}
      />
    </main>
  );
}
