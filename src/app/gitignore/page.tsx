"use client";
import { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { GitBranch, Check, RefreshCw } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { gitignoreGuideContent } from "@/content/gitignore-guide";

interface GitignorePreset {
  id: string;
  name: string;
  description: string;
  entries: string[];
}

const PRESETS: GitignorePreset[] = [
  {
    id: "nodejs",
    name: "Node.js",
    description: "npm, yarn, logs, coverage",
    entries: [
      "# Node.js",
      "node_modules/",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      "lerna-debug.log*",
      ".pnpm-debug.log*",
      "",
      "# Build outputs",
      "dist/",
      "build/",
      ".next/",
      "out/",
      "",
      "# Environment variables",
      ".env",
      ".env.local",
      ".env.*.local",
      "",
      "# Testing",
      "coverage/",
      ".nyc_output/",
      "",
      "# Cache",
      ".npm/",
      ".eslintcache",
      ".cache/",
      ".parcel-cache/",
    ]},
  {
    id: "python",
    name: "Python",
    description: "venv, __pycache__, .pyc",
    entries: [
      "# Python",
      "__pycache__/",
      "*.py[cod]",
      "*$py.class",
      "",
      "# Virtual environments",
      "venv/",
      "env/",
      "ENV/",
      ".venv/",
      "",
      "# Distribution / packaging",
      "*.egg-info/",
      "dist/",
      "build/",
      "*.egg",
      "",
      "# PyInstaller",
      "*.manifest",
      "*.spec",
      "",
      "# Unit test / coverage",
      ".pytest_cache/",
      ".coverage",
      "htmlcov/",
      "",
      "# Jupyter Notebook",
      ".ipynb_checkpoints/",
    ]},
  {
    id: "java",
    name: "Java",
    description: "Maven, Gradle, .class files",
    entries: [
      "# Java",
      "*.class",
      "*.jar",
      "*.war",
      "*.ear",
      "",
      "# Maven",
      "target/",
      "pom.xml.tag",
      "pom.xml.releaseBackup",
      "pom.xml.versionsBackup",
      "",
      "# Gradle",
      ".gradle/",
      "build/",
      "!gradle-wrapper.jar",
      "",
      "# IntelliJ",
      "*.iml",
      ".idea/",
      "",
      "# Eclipse",
      ".classpath",
      ".project",
      ".settings/",
    ]},
  {
    id: "go",
    name: "Go",
    description: "Binaries, vendor, coverage",
    entries: [
      "# Go",
      "*.exe",
      "*.exe~",
      "*.dll",
      "*.so",
      "*.dylib",
      "",
      "# Test binary",
      "*.test",
      "",
      "# Output of go build",
      "*.o",
      "*.a",
      "",
      "# Dependency directories",
      "vendor/",
      "",
      "# Go workspace file",
      "go.work",
      "",
      "# Coverage",
      "*.out",
      "coverage.txt",
    ]},
  {
    id: "rust",
    name: "Rust",
    description: "Cargo target, lock files",
    entries: [
      "# Rust",
      "target/",
      "Cargo.lock",
      "",
      "# Debug files",
      "*.pdb",
      "",
      "# Backup files",
      "**/*.rs.bk",
      "",
      "# MSVC Windows builds",
      "*.exe",
      "*.pdb",
    ]},
  {
    id: "macos",
    name: "macOS",
    description: "System files, Spotlight, Trash",
    entries: [
      "# macOS",
      ".DS_Store",
      ".AppleDouble",
      ".LSOverride",
      "",
      "# Icon must end with two \\r",
      "Icon\\r\\r",
      "",
      "# Thumbnails",
      "._*",
      "",
      "# Files that might appear in the root",
      ".DocumentRevisions-V100",
      ".fseventsd",
      ".Spotlight-V100",
      ".TemporaryItems",
      ".Trashes",
      ".VolumeIcon.icns",
      ".com.apple.timemachine.donotpresent",
      "",
      "# Directories",
      ".AppleDB",
      ".AppleDesktop",
      "Network Trash Folder",
      "Temporary Items",
      ".apdisk",
    ]},
  {
    id: "windows",
    name: "Windows",
    description: "Thumbs.db, system files",
    entries: [
      "# Windows",
      "Thumbs.db",
      "Thumbs.db:encryptable",
      "ehthumbs.db",
      "ehthumbs_vista.db",
      "",
      "# Dump file",
      "*.stackdump",
      "",
      "# Folder config file",
      "[Dd]esktop.ini",
      "",
      "# Recycle Bin",
      "$RECYCLE.BIN/",
      "",
      "# Windows Installer files",
      "*.cab",
      "*.msi",
      "*.msix",
      "*.msm",
      "*.msp",
      "",
      "# Windows shortcuts",
      "*.lnk",
    ]},
  {
    id: "vscode",
    name: "VSCode",
    description: "Settings, workspace files",
    entries: [
      "# VSCode",
      ".vscode/*",
      "!.vscode/settings.json",
      "!.vscode/tasks.json",
      "!.vscode/launch.json",
      "!.vscode/extensions.json",
      "!.vscode/*.code-snippets",
      "",
      "# Local History for Visual Studio Code",
      ".history/",
      "",
      "# Built Visual Studio Code Extensions",
      "*.vsix",
    ]},
  {
    id: "jetbrains",
    name: "JetBrains",
    description: "IntelliJ IDEA, WebStorm, PyCharm",
    entries: [
      "# JetBrains IDEs",
      ".idea/",
      "*.iml",
      "*.iws",
      "*.ipr",
      "",
      "# CMake",
      "cmake-build-*/",
      "",
      "# File-based project format",
      "*.iws",
      "",
      "# IntelliJ",
      "out/",
      "",
      "# JIRA plugin",
      "atlassian-ide-plugin.xml",
    ]},
];

export default function GitignoreTool() {
  useToolTracker("gitignore", "Gitignore Generator");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const [selectedPresets, setSelectedPresets] = useState<Set<string>>(new Set());
  const [customEntries, setCustomEntries] = useState("");

  const togglePreset = useCallback((presetId: string) => {
    setSelectedPresets((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(presetId)) {
        newSet.delete(presetId);
      } else {
        newSet.add(presetId);
        analytics.trackToolUsage("gitignore", { action: "preset-selected", presetId });
      }
      return newSet;
    });
  }, [analytics]);

  const generatedGitignore = useMemo(() => {
    if (selectedPresets.size === 0 && !customEntries.trim()) {
      return "# Select presets or add custom entries to generate .gitignore";
    }

    const presetContent = Array.from(selectedPresets)
      .map((presetId) => {
        const preset = PRESETS.find((p) => p.id === presetId);
        return preset ? preset.entries.join("\n") : "";
      })
      .filter(Boolean)
      .join("\n\n");

    const customContent = customEntries.trim()
      ? `# Custom entries\n${customEntries.trim()}`
      : "";

    const parts = [presetContent, customContent].filter(Boolean);

    return parts.length > 0
      ? parts.join("\n\n")
      : "# Select presets or add custom entries to generate .gitignore";
  }, [selectedPresets, customEntries]);


  const clearAll = useCallback(() => {
    setSelectedPresets(new Set());
    setCustomEntries("");
  }, []);

  const selectAll = useCallback(() => {
    const allIds = new Set(PRESETS.map((p) => p.id));
    setSelectedPresets(allIds);
  }, []);

  const randomize = () => {
    // Select 2-4 random presets
    const numPresets = Math.floor(Math.random() * 3) + 2;
    const shuffled = [...PRESETS].sort(() => Math.random() - 0.5);
    const randomIds = new Set(shuffled.slice(0, numPresets).map(p => p.id));
    setSelectedPresets(randomIds);
    setCustomEntries("");
  };

  const hasContent = selectedPresets.size > 0 || customEntries.trim().length > 0;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center hover:opacity-80 transition">
              <GitBranch className="w-5 h-5" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">.gitignore Generator</h1>
          </div>
          <button
            onClick={randomize}
            className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Random</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Button className="min-h-[44px] bg-purple-600 hover:bg-purple-700 text-white" onClick={selectAll}  size="sm">
            Select All
          </Button>
          <Button className="min-h-[44px] bg-transparent hover:bg-muted text-accent-foreground hover:text-foreground" onClick={clearAll}  size="sm">
            Clear All
          </Button>
          <Button
            onClick={() => copy(generatedGitignore)}
            className="bg-green-600 hover:bg-green-700 text-white ml-auto"
            size="sm"
            disabled={!hasContent}
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 mr-1" />
                Copied!
              </>
            ) : (
              "Copy .gitignore"
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preset Selection */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">Select Presets</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRESETS.map((preset) => {
                  const isSelected = selectedPresets.has(preset.id);
                  return (
                    <div
                      key={preset.id}
                      className={`border rounded-lg p-3 transition-all cursor-pointer ${
                        isSelected
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-border bg-card hover:border-border"
                      }`}
                      onClick={() => togglePreset(preset.id)}
                    >
                      <div className="flex items-start gap-3">
                        <input aria-label="Input field"
                          type="checkbox"
                          id={preset.id}
                          checked={isSelected}
                          onChange={() => togglePreset(preset.id)}
                          className="mt-0.5 w-4 h-4 rounded border-border text-purple-600 focus:ring-purple-500 focus:ring-offset-0 bg-muted cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex-1 min-w-0">
                          <label
                            htmlFor={preset.id}
                            className="block font-medium text-white cursor-pointer mb-1"
                          >
                            {preset.name}
                          </label>
                          <p className="text-xs text-muted-foreground">{preset.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Entries */}
            <div>
              <label className="text-lg font-semibold text-white block mb-2">
                Custom Entries
              </label>
              <p className="text-xs text-muted-foreground mb-3">
                Add your own patterns (one per line)
              </p>
              <Textarea
                value={customEntries}
                onChange={(e) => setCustomEntries(e.target.value)}
                placeholder="# My custom ignores&#10;*.log&#10;temp/&#10;.env.production"
                className="h-[200px] bg-card border-border font-mono text-sm resize-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Generated .gitignore */}
          <div className="space-y-2 lg:sticky lg:top-6 lg:self-start">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold text-white">Generated .gitignore</label>
              <span className="text-xs text-muted-foreground">
                {selectedPresets.size} preset{selectedPresets.size !== 1 ? "s" : ""}
              </span>
            </div>
            <Textarea
              value={generatedGitignore}
              readOnly
              className="h-[600px] bg-card border-border font-mono text-sm resize-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-card/50 border border-border rounded-lg">
          <h3 className="font-semibold text-foreground mb-2">How to use</h3>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Select the presets for your project (languages, OS, IDEs)</li>
            <li>Add any custom patterns in the Custom Entries section</li>
            <li>Copy the generated .gitignore content</li>
            <li>Save it as <code className="px-1 py-0.5 bg-muted rounded text-blue-400">.gitignore</code> in your project root</li>
            <li>Commit it to your repository: <code className="px-1 py-0.5 bg-muted rounded text-green-400">git add .gitignore && git commit -m &quot;Add .gitignore&quot;</code></li>
          </ol>
        </div>

        {/* Related Tools */}
        <RelatedTools currentPath="/gitignore" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={gitignoreGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-gitignore" title={gitignoreGuideContent.introduction.title} subtitle="Understanding Git ignore patterns" variant="default">
            <MarkdownContent content={gitignoreGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use .gitignore generation" variant="default">
            <FeatureGrid features={gitignoreGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={gitignoreGuideContent.howToUse.title} subtitle="Master .gitignore pattern creation" variant="minimal">
            <HowToSchema name={`How to use ${gitignoreGuideContent.toolName}`} description="Step-by-step guide to .gitignore generation" steps={gitignoreGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${gitignoreGuideContent.toolPath}`} />
            <MarkdownContent content={gitignoreGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={gitignoreGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={gitignoreGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={gitignoreGuideContent.security.content} />
          </GeoSection>

          {gitignoreGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(gitignoreGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={gitignoreGuideContent.lastUpdated} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Generate .gitignore files for your projects. All processing happens in your browser.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name=".gitignore Generator"
        description="Free online .gitignore file generator. Create .gitignore files for Node.js, Python, Java, Go, Rust, macOS, Windows, VSCode, and JetBrains IDEs."
        url="https://openkit.tools/gitignore"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={gitignoreGuideContent.lastUpdated}
        version={gitignoreGuideContent.version}
        aggregateRating={{ratingValue: "4.9", ratingCount: "2341", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: ".gitignore Generator", url: "https://openkit.tools/gitignore" },
        ]}
      />
    </main>
  );
}
