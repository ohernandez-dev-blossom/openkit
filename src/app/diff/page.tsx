"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { diffLines, diffChars, diffWordsWithSpace, createPatch } from "diff";
import type { Change } from "diff";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RelatedTools } from "@/components/related-tools";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { SHORTCUTS } from "@/lib/keyboard-shortcuts";
import { KeyboardHint } from "@/components/keyboard-hint";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { diffGuideContent } from "@/content/diff-guide";
import { Download, FileText, Code2, Type, GitCompareArrows, SplitSquareVertical, AlignJustify } from "lucide-react";
type DiffMode = "line" | "word" | "char";
type ViewMode = "unified" | "split";

export default function TextDiff() {
  useToolTracker("diff", "Text Diff", "developers");
  const analytics = useAnalytics();
  const [original, setOriginal] = useState("");
  const [modified, setModified] = useState("");
  const [diffMode, setDiffMode] = useState<DiffMode>("line");
  const [viewMode, setViewMode] = useState<ViewMode>("unified");
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Clear error when inputs change
  useEffect(() => {
    setError(null);
  }, [original, modified, diffMode, ignoreWhitespace]);

  const diffResult = useMemo(() => {
    if (!original && !modified) {
      return { changes: [], stats: { added: 0, removed: 0, unchanged: 0 } };
    }

    try {
      let originalText = original;
      let modifiedText = modified;

      // Apply whitespace ignoring if enabled
      if (ignoreWhitespace) {
        originalText = original.replace(/\s+/g, " ").trim();
        modifiedText = modified.replace(/\s+/g, " ").trim();
      }

      let changes: Change[];
      
      switch (diffMode) {
        case "char":
          changes = diffChars(originalText, modifiedText);
          break;
        case "word":
          changes = diffWordsWithSpace(originalText, modifiedText);
          break;
        case "line":
        default:
          changes = diffLines(originalText, modifiedText);
          break;
      }
    
    let added = 0;
    let removed = 0;
    let unchanged = 0;

    if (diffMode === "line") {
      changes.forEach((change) => {
        const lineCount = change.value.split('\n').filter(line => line !== '').length;
        if (change.added) {
          added += lineCount;
        } else if (change.removed) {
          removed += lineCount;
        } else {
          unchanged += lineCount;
        }
      });
    } else {
      // For char and word modes, count actual changes
      changes.forEach((change) => {
        const count = diffMode === "char" ? change.value.length : change.value.split(/\s+/).length;
        if (change.added) {
          added += count;
        } else if (change.removed) {
          removed += count;
        } else {
          unchanged += count;
        }
      });
    }

    return { changes, stats: { added, removed, unchanged } };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Diff calculation failed';
      setError(errorMessage);
      analytics.trackError('diff_calculation_failed', {
        tool: 'diff',
        diffMode,
        originalLength: original.length,
        modifiedLength: modified.length,
        error: errorMessage,
      });
      return { changes: [], stats: { added: 0, removed: 0, unchanged: 0 } };
    }
  }, [original, modified, diffMode, ignoreWhitespace, analytics]);

  // Track diff comparison (skip initial empty state)
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (original || modified) {
      analytics.trackToolUsage('diff', {
        action: 'compare',
        diffMode,
        viewMode,
        ignoreWhitespace,
        originalLength: original.length,
        modifiedLength: modified.length,
        added: diffResult.stats.added,
        removed: diffResult.stats.removed,
        unchanged: diffResult.stats.unchanged
      });
    }
  }, [diffResult, original, modified, diffMode, viewMode, ignoreWhitespace, analytics]);

  const clear = () => {
    setOriginal("");
    setModified("");
  };

  const swap = () => {
    const temp = original;
    setOriginal(modified);
    setModified(temp);
  };

  const pasteOriginal = async () => {
    if (typeof window === 'undefined' || !navigator.clipboard) return;
    const text = await navigator.clipboard.readText();
    setOriginal(text);
  };

  const pasteModified = async () => {
    if (typeof window === 'undefined' || !navigator.clipboard) return;
    const text = await navigator.clipboard.readText();
    setModified(text);
  };

  // Keyboard shortcuts
  useKeyboardShortcut(SHORTCUTS.clear, clear);
  useKeyboardShortcut(SHORTCUTS.swap, swap, { enabled: !!(original || modified) });

  const exportAsHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Text Diff - OpenKit.tools</title>
  <style>
    body {
      font-family: 'Courier New', monospace;
      background: #0a0a0a;
      color: #e4e4e7;
      padding: 20px;
      line-height: 1.6;
    }
    .header {
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #27272a;
    }
    .stats {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }
    .stat {
      padding: 10px 15px;
      background: #18181b;
      border-radius: 6px;
    }
    .stat-added { color: #4ade80; }
    .stat-removed { color: #f87171; }
    .stat-unchanged { color: #a1a1aa; }
    .diff-container {
      background: #09090b;
      border: 1px solid #27272a;
      border-radius: 8px;
      overflow: auto;
    }
    .diff-line {
      display: flex;
      border-left: 2px solid transparent;
      padding: 4px 0;
    }
    .line-number {
      width: 50px;
      text-align: right;
      padding-right: 12px;
      color: #71717a;
      user-select: none;
    }
    .line-marker {
      width: 24px;
      color: #71717a;
      user-select: none;
    }
    .line-content {
      flex: 1;
      padding-right: 12px;
      word-break: break-all;
    }
    .added {
      background: rgba(74, 222, 128, 0.1);
      border-left-color: #4ade80;
    }
    .added .line-content { color: #86efac; }
    .added .line-marker { color: #4ade80; }
    .removed {
      background: rgba(248, 113, 113, 0.1);
      border-left-color: #f87171;
    }
    .removed .line-content { color: #fca5a5; }
    .removed .line-marker { color: #f87171; }
    .inline-added {
      background: rgba(74, 222, 128, 0.3);
      color: #86efac;
      padding: 2px 0;
    }
    .inline-removed {
      background: rgba(248, 113, 113, 0.3);
      color: #fca5a5;
      text-decoration: line-through;
      padding: 2px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Text Diff Report</h1>
    <p>Generated by OpenKit.tools on ${new Date().toLocaleString()}</p>
    <p>Mode: ${diffMode === "line" ? "Line-by-line" : diffMode === "char" ? "Character-level" : "Word-level"}</p>
  </div>
  <div class="stats">
    <div class="stat stat-added">+${diffResult.stats.added} Added</div>
    <div class="stat stat-removed">-${diffResult.stats.removed} Removed</div>
    <div class="stat stat-unchanged">${diffResult.stats.unchanged} Unchanged</div>
  </div>
  <div class="diff-container">
    ${renderDiffHTML()}
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diff-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderDiffHTML = () => {
    if (diffMode === "line") {
      let lineNum = 1;
      return diffResult.changes.map((change) => {
        const lines = change.value.split('\n').filter(line => line !== '');
        return lines.map((line) => {
          const className = change.added ? "added" : change.removed ? "removed" : "";
          const marker = change.added ? "+" : change.removed ? "-" : " ";
          const html = `
            <div class="diff-line ${className}">
              <span class="line-number">${lineNum++}</span>
              <span class="line-marker">${marker}</span>
              <span class="line-content">${escapeHtml(line || '\u00A0')}</span>
            </div>`;
          return html;
        }).join('');
      }).join('');
    } else {
      // Inline diff (char/word mode)
      return `<div class="diff-line">
        <span class="line-content">
          ${diffResult.changes.map(change => {
            if (change.added) {
              return `<span class="inline-added">${escapeHtml(change.value)}</span>`;
            } else if (change.removed) {
              return `<span class="inline-removed">${escapeHtml(change.value)}</span>`;
            }
            return escapeHtml(change.value);
          }).join('')}
        </span>
      </div>`;
    }
  };

  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const exportAsPatch = () => {
    const patch = createPatch(
      "file.txt",
      original,
      modified,
      "Original",
      "Modified",
      { context: 3 }
    );

    const blob = new Blob([patch], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diff-${Date.now()}.patch`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderUnifiedDiff = (change: Change, index: number) => {
    if (diffMode === "line") {
      const lines = change.value.split('\n').filter(line => line !== '');
      
      return lines.map((line, lineIndex) => {
        let bgColor = "bg-card";
        let textColor = "text-accent-foreground";
        let borderColor = "border-transparent";
        let marker = " ";

        if (change.added) {
          bgColor = "bg-green-50 dark:bg-green-900/30";
          textColor = "text-green-800 dark:text-green-300";
          borderColor = "border-green-600 dark:border-green-500";
          marker = "+";
        } else if (change.removed) {
          bgColor = "bg-red-50 dark:bg-red-900/30";
          textColor = "text-red-800 dark:text-red-300";
          borderColor = "border-red-600 dark:border-red-500";
          marker = "-";
        }

        return (
          <div
            key={`${index}-${lineIndex}`}
            className={`flex items-start font-mono text-sm ${bgColor} border-l-2 ${borderColor}`}
          >
            {showLineNumbers && (
              <span className="w-12 text-right pr-3 text-muted-foreground select-none shrink-0 py-1">
                {lineIndex + 1}
              </span>
            )}
            <span className={`w-6 ${textColor} select-none shrink-0 py-1`}>
              {marker}
            </span>
            <span className={`flex-1 ${textColor} py-1 pr-3 break-all`}>
              {line || '\u00A0'}
            </span>
          </div>
        );
      });
    } else {
      // Inline diff for char/word mode
      const className = change.added 
        ? "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300" 
        : change.removed 
        ? "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-300 line-through" 
        : "text-accent-foreground";
      
      return (
        <span key={index} className={className}>
          {change.value}
        </span>
      );
    }
  };

  const renderSplitDiff = () => {
    const originalLines: string[] = [];
    const modifiedLines: string[] = [];
    
    diffResult.changes.forEach((change) => {
      const lines = change.value.split('\n').filter(line => line !== '');
      
      if (change.removed) {
        lines.forEach(line => {
          originalLines.push(line);
          modifiedLines.push('');
        });
      } else if (change.added) {
        lines.forEach(line => {
          originalLines.push('');
          modifiedLines.push(line);
        });
      } else {
        lines.forEach(line => {
          originalLines.push(line);
          modifiedLines.push(line);
        });
      }
    });

    return (
      <div className="grid grid-cols-2 gap-4">
        {/* Original side */}
        <div className="bg-background rounded-lg border border-border overflow-x-auto">
          <div className="bg-card px-4 py-2 border-b border-border font-semibold text-sm">
            Original
          </div>
          <div className="min-w-max">
            {originalLines.map((line, idx) => {
              const isRemoved = line && !modifiedLines[idx];
              return (
                <div
                  key={idx}
                  className={`flex items-start font-mono text-sm ${
                    isRemoved ? "bg-red-50 dark:bg-red-900/30 border-l-2 border-red-600 dark:border-red-500" : ""
                  }`}
                >
                  {showLineNumbers && (
                    <span className="w-12 text-right pr-3 text-muted-foreground select-none shrink-0 py-1">
                      {line ? idx + 1 : ""}
                    </span>
                  )}
                  <span className={`flex-1 py-1 pr-3 ${isRemoved ? "text-red-800 dark:text-red-300" : "text-accent-foreground"} break-all`}>
                    {line || '\u00A0'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modified side */}
        <div className="bg-background rounded-lg border border-border overflow-x-auto">
          <div className="bg-card px-4 py-2 border-b border-border font-semibold text-sm">
            Modified
          </div>
          <div className="min-w-max">
            {modifiedLines.map((line, idx) => {
              const isAdded = line && !originalLines[idx];
              return (
                <div
                  key={idx}
                  className={`flex items-start font-mono text-sm ${
                    isAdded ? "bg-green-50 dark:bg-green-900/30 border-l-2 border-green-600 dark:border-green-500" : ""
                  }`}
                >
                  {showLineNumbers && (
                    <span className="w-12 text-right pr-3 text-muted-foreground select-none shrink-0 py-1">
                      {line ? idx + 1 : ""}
                    </span>
                  )}
                  <span className={`flex-1 py-1 pr-3 ${isAdded ? "text-green-800 dark:text-green-300" : "text-accent-foreground"} break-all`}>
                    {line || '\u00A0'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center font-bold text-sm">
              <GitCompareArrows className="w-4 h-4" />
            </div>
            <h1 className="text-xl font-semibold">Text Diff</h1>
          </div>
          <div className="flex gap-2">
            <Button className="min-h-[44px] border-border" onClick={swap} variant="outline" size="sm">
              Swap
              {(original || modified) && <KeyboardHint shortcut={SHORTCUTS.swap} />}
            </Button>
            <Button className="min-h-[44px] text-muted-foreground" onClick={clear} variant="ghost" size="sm">
              Clear
              <KeyboardHint shortcut={SHORTCUTS.clear} />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">        {/* Controls */}
        <Card className="bg-card border-border mb-6">
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Diff Mode */}
              <div>
                <label className="block text-sm font-medium mb-2">Diff Mode</label>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setDiffMode("line")}
                    variant={diffMode === "line" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                  >
                    <AlignJustify className="w-4 h-4 mr-1" />
                    Lines
                  </Button>
                  <Button
                    onClick={() => setDiffMode("word")}
                    variant={diffMode === "word" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Words
                  </Button>
                  <Button
                    onClick={() => setDiffMode("char")}
                    variant={diffMode === "char" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                  >
                    <Type className="w-4 h-4 mr-1" />
                    Chars
                  </Button>
                </div>
              </div>

              {/* View Mode */}
              <div>
                <label className="block text-sm font-medium mb-2">View Mode</label>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setViewMode("unified")}
                    variant={viewMode === "unified" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                  >
                    <AlignJustify className="w-4 h-4 mr-1" />
                    Unified
                  </Button>
                  <Button
                    onClick={() => setViewMode("split")}
                    variant={viewMode === "split" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    disabled={diffMode !== "line"}
                  >
                    <SplitSquareVertical className="w-4 h-4 mr-1" />
                    Split
                  </Button>
                </div>
              </div>

              {/* Options */}
              <div>
                <label className="block text-sm font-medium mb-2">Options</label>
                <div className="flex flex-col gap-2">
                  <label htmlFor="page-input-515" className="flex items-center gap-2 cursor-pointer">
                    <input id="page-input-515"
                      type="checkbox"
                      checked={ignoreWhitespace}
                      onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                      className="w-4 h-4 rounded border-border bg-muted"
                    />
                    <span className="text-sm">Ignore whitespace</span>
                  </label>
                  <label htmlFor="page-input-524" className="flex items-center gap-2 cursor-pointer">
                    <input id="page-input-524"
                      type="checkbox"
                      checked={showLineNumbers}
                      onChange={(e) => setShowLineNumbers(e.target.checked)}
                      className="w-4 h-4 rounded border-border bg-muted"
                    />
                    <span className="text-sm">Show line numbers</span>
                  </label>
                </div>
              </div>

              {/* Export */}
              <div>
                <label className="block text-sm font-medium mb-2">Export</label>
                <div className="flex gap-2">
                  <Button
                    onClick={exportAsHTML}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    disabled={!original || !modified}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    HTML
                  </Button>
                  <Button
                    onClick={exportAsPatch}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    disabled={!original || !modified}
                  >
                    <Code2 className="w-4 h-4 mr-1" />
                    Patch
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold font-mono text-green-700 dark:text-green-400">
                +{diffResult.stats.added}
              </p>
              <p className="text-sm text-muted-foreground">
                {diffMode === "line" ? "Lines" : diffMode === "word" ? "Words" : "Characters"} Added
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold font-mono text-red-700 dark:text-red-400">
                -{diffResult.stats.removed}
              </p>
              <p className="text-sm text-muted-foreground">
                {diffMode === "line" ? "Lines" : diffMode === "word" ? "Words" : "Characters"} Removed
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-4 text-center">
              <p className="text-3xl font-bold font-mono text-muted-foreground">
                {diffResult.stats.unchanged}
              </p>
              <p className="text-sm text-muted-foreground">
                {diffMode === "line" ? "Lines" : diffMode === "word" ? "Words" : "Characters"} Unchanged
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Input Textareas */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Original</CardTitle>
              <Button
                onClick={pasteOriginal}
                variant="outline"
                size="sm"
                className="border-border h-7 text-xs"
              >
                Paste
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea
                value={original}
                onChange={(e) => setOriginal(e.target.value)}
                className="min-h-[200px] bg-muted border-border font-mono text-sm resize-none focus:border-red-500"
                placeholder="Paste original text here..."
              />
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base">Modified</CardTitle>
              <Button
                onClick={pasteModified}
                variant="outline"
                size="sm"
                className="border-border h-7 text-xs"
              >
                Paste
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea
                value={modified}
                onChange={(e) => setModified(e.target.value)}
                className="min-h-[200px] bg-muted border-border font-mono text-sm resize-none focus:border-red-500"
                placeholder="Paste modified text here..."
              />
            </CardContent>
          </Card>
        </div>

        {/* Diff View */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <GitCompareArrows className="w-4 h-4" />
              Differences
              {diffMode !== "line" && viewMode === "unified" && (
                <span className="text-xs text-muted-foreground font-normal">
                  (inline {diffMode}-level diff)
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">
                  <strong>Error:</strong> {error}
                </p>
                <p className="text-red-400/70 text-xs mt-1">
                  Try reducing text size or using line mode for large files.
                </p>
              </div>
            )}
            {diffResult.changes.length > 0 ? (
              viewMode === "split" && diffMode === "line" ? (
                renderSplitDiff()
              ) : (
                <div className="bg-background rounded-lg border border-border overflow-x-auto">
                  <div className="min-w-max p-3 font-mono text-sm">
                    {diffMode === "line" 
                      ? diffResult.changes.map((change, index) => renderUnifiedDiff(change, index))
                      : <div className="whitespace-pre-wrap break-words">
                          {diffResult.changes.map((change, index) => renderUnifiedDiff(change, index))}
                        </div>
                    }
                  </div>
                </div>
              )
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Enter text in both fields to see differences</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tips */}
        <div className="mt-8 p-4 bg-card/50 border border-border rounded-lg">
          <h3 className="text-base sm:text-lg font-semibold mb-2">💡 Features</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• <strong>Line mode:</strong> Compare text line-by-line (default)</li>
            <li>• <strong>Word mode:</strong> Highlight differences at word level</li>
            <li>• <strong>Character mode:</strong> Show precise character-by-character changes</li>
            <li>• <strong>Unified view:</strong> See all changes in one panel</li>
            <li>• <strong>Split view:</strong> Side-by-side comparison (line mode only)</li>
            <li>• <strong>Export HTML:</strong> Download a styled HTML report</li>
            <li>• <strong>Export Patch:</strong> Generate unified diff patch file for git apply</li>
            <li>• <strong>Ignore whitespace:</strong> Focus on content changes, not formatting</li>
          </ul>
        </div>
      </div>

      {/* Related Tools */}
      <RelatedTools currentPath="/diff" />

      {/* GEO Content - Professional Design System */}
      <GeoContentLayout>
        {/* Quick Start Guide */}
        <GeoSection
          id="quick-start"
          title="Quick Start Guide"
          subtitle="Get up and running in 30 seconds"
          variant="highlight"
        >
          <QuickStartGuide steps={diffGuideContent.quickStartSteps} />
        </GeoSection>

        {/* What is Diff Section */}
        <GeoSection
          id="what-is-diff"
          title={diffGuideContent.introduction.title}
          subtitle="Understanding text comparison and diff analysis"
          variant="default"
        >
          <MarkdownContent content={diffGuideContent.introduction.content} />
        </GeoSection>

        {/* Use Cases - Feature Grid */}
        <GeoSection
          id="use-cases"
          title="Common Use Cases"
          subtitle="How developers use diff comparison daily"
          variant="default"
        >
          <FeatureGrid
            features={diffGuideContent.useCases.map(uc => ({
              title: uc.title,
              description: uc.description
            }))}
            columns={2}
          />
        </GeoSection>

        {/* How to Use This Tool */}
        <GeoSection
          id="how-to-use"
          title={diffGuideContent.howToUse.title}
          subtitle="Master text comparison and analysis"
          variant="minimal"
        >
          <HowToSchema
            name={`How to use ${diffGuideContent.toolName}`}
            description="Step-by-step guide to text diff comparison"
            steps={diffGuideContent.howToUse.steps}
            toolUrl={`https://openkit.tools${diffGuideContent.toolPath}`}
          />
          <MarkdownContent content={diffGuideContent.howToUse.content} />
        </GeoSection>

        {/* FAQ */}
        <GeoSection
          id="faq"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about diff comparison"
          variant="default"
        >
          <ToolFAQ faqs={diffGuideContent.faqs} />
        </GeoSection>

        {/* Security & Privacy */}
        <GeoSection
          id="security"
          title={diffGuideContent.security.title}
          subtitle="Your data never leaves your browser"
          variant="highlight"
        >
          <MarkdownContent content={diffGuideContent.security.content} />
        </GeoSection>

        {/* Statistics - Stats Bar */}
        {diffGuideContent.stats && (
          <GeoSection
            id="stats"
            title="By the Numbers"
            subtitle="Performance metrics and capabilities"
            variant="minimal"
          >
            <StatsBar
              stats={Object.entries(diffGuideContent.stats).map(([label, value]) => ({
                label,
                value
              }))}
            />
          </GeoSection>
        )}
      </GeoContentLayout>

      {/* Last Updated */}
      <LastUpdated date={diffGuideContent.lastUpdated} />

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-4 mt-8">
        <div className="max-w-5xl mx-auto text-center text-sm text-muted-foreground">
          <p>Compare text with multiple diff modes and view options. All processing happens in your browser.</p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Text Diff | OpenKit.tools"
        description="Advanced text comparison tool with line, word, and character-level diffs. Features unified and split views, HTML export, and patch generation."
        url="https://openkit.tools/diff"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={diffGuideContent.lastUpdated}
        version={diffGuideContent.version}
        aggregateRating={{
          ratingValue: "4.7",
          ratingCount: "1500",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: 'https://openkit.tools' },
          { name: 'Text Diff', url: 'https://openkit.tools/diff' },
        ]}
      />
    </main>
  );
}
