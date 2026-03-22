# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**OpenKit.tools** — 130+ privacy-first developer tools (JSON formatter, hash generator, regex tester, etc.). All processing is client-side. Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, Playwright.

**Package manager:** pnpm (not npm/yarn)

## Commands

```bash
pnpm dev                  # Dev server at localhost:3000
pnpm run build            # Production build (uses --webpack, not Turbopack)
pnpm run lint             # ESLint
pnpm run lint --fix       # ESLint auto-fix
pnpm exec tsc --noEmit    # TypeScript check

# Tests (Playwright E2E, requires dev server running)
pnpm run test:critical                          # Critical tests only (~49 tests, fast)
pnpm run test                                   # Full E2E suite (slow)
pnpm exec playwright test e2e/json.spec.ts      # Single test file
pnpm exec playwright test --debug               # Debug mode
```

**Pre-commit hook** runs: lint → tsc → build → test:critical → lockfile check. All must pass.

## Git Workflow

**Never push directly to main. Always use worktrees + PRs.**

```bash
git worktree add ../openkit-feature-name -b feature/descriptive-name
cd ../openkit-feature-name
# ... work ...
git push -u origin feature/descriptive-name
gh pr create --title "feat: Description" --body "..."
```

Branch prefixes: `feature/`, `fix/`, `refactor/`, `docs/`, `test/`
Commit prefixes: `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, `chore:`

## Architecture

### Tool Registry (Distributed)

There is **no single centralized tool registry**. Tool metadata lives in multiple places:
- **`src/components/related-tools.tsx`** — Master list of ~140 tools with name, href, icon, category, tags, description
- **`src/lib/tool-relationships.ts`** — Manual curated cross-linking between related tools (supplements the algorithmic matching)
- **`src/app/sitemap.ts`** — URL list with priorities for SEO

### Provider Hierarchy (in `src/app/layout.tsx`)

```
ThemeProvider → ToastProvider → ShortcutsProvider → {children}
```

- **ThemeProvider** (`src/contexts/theme-context.tsx`) — light/dark/system, persisted to localStorage
- **ToastProvider** (`src/contexts/toast-context.tsx`) — Global toast notifications
- **ShortcutsProvider** (`src/contexts/shortcuts-context.tsx`) — Keyboard shortcut registry

### Tool Page Pattern

Every tool page is a `"use client"` component. The standard structure:

1. **`useToolTracker(slug, name, category)`** — Tracks visits/time
2. **State** — `useState` for input/output/error
3. **Shared data** — `useSharedData()` to load state from share URLs
4. **Keyboard shortcuts** — `useKeyboardShortcut(SHORTCUTS.execute, handler)`
5. **Layout** — Header with `<PinButton>`, toolbar with primary action + `<ExportHubV2>` + `<ShareButton>`, input/output panels, `<GeoContentLayout>` for SEO content, `<RelatedTools>`, `<LastUpdated>`
6. **Structured data** — `<StructuredData>` and `<BreadcrumbStructuredData>` components inject JSON-LD (NOT via Next.js metadata exports)

### Key Shortcuts (from `src/lib/keyboard-shortcuts.ts`)

`SHORTCUTS.execute` (Ctrl/Cmd+Enter), `.copy` (Ctrl/Cmd+Shift+C), `.clear` (Ctrl/Cmd+L), `.sample` (Ctrl/Cmd+D), `.search` (Ctrl/Cmd+K), `.undo`/`.redo`

### Important Shared Components

- **`PresetManager`** — Save/load tool configurations to localStorage
- **`ExportHubV2`** — Export output as copy/txt/json/csv/html
- **`ShareButton`** — Encode tool state in URL as base64
- **`BatchMode`** — Process multiple inputs at once
- **`RelatedTools`** — Algorithmic recommendations (category + tags + keyword matching)
- **`GeoContentLayout`** / `GeoSection` / `FeatureGrid` — Professional SEO content sections
- **`ToolFAQ`** / `QuickStartGuide`** — FAQ and guide accordions
- UI primitives in `src/components/ui/` use Radix UI

### Test Infrastructure

`e2e/helpers/test-utils.ts` provides `TestUtils` class with: `navigateToTool(slug)`, `waitForToolLoad()`, `getPrimaryInput()`, `getOutput()`, `clickPrimaryAction()`, `testCopyButton()`, `testExport(format)`, `fillInputSlowly()`, `checkCommonFeatures()`, `testKeyboardShortcut()`, `checkAccessibility()`.

## Critical Rules

- **SSR guards required**: All browser API access (localStorage, navigator, window) must be wrapped in `if (typeof window !== 'undefined')` or use lazy `useState(() => { ... })` initialization
- **No `any` types** — Use explicit types or `unknown`
- **Build uses Webpack** (not Turbopack) due to module factory bugs with large content files
- **E2E tests are NOT run in CI** — Only lint, tsc, and build run in GitHub Actions. Run tests locally before PRs.
- Tool pages use client-side `<StructuredData>` components for SEO, not Next.js `metadata` or `generateMetadata()`

## Adding a New Tool

1. Create `src/app/[tool-name]/page.tsx` as a `"use client"` component following the pattern above
2. Add the tool to the `allTools` array in `src/components/related-tools.tsx` with name, href, icon, category, tags, description
3. Add manual relationships in `src/lib/tool-relationships.ts` if it belongs to an existing ecosystem
4. Add to `src/app/sitemap.ts`
5. Create `e2e/[tool-name].spec.ts` using the TestUtils helper

## Blog System

Blog posts live in `src/content/blog/` as TypeScript files exporting `BlogPost` objects with markdown content. No MDX, no CMS — just typed content files rendered by the existing `<MarkdownContent>` component.

### Adding a New Blog Post

1. Create `src/content/blog/[slug].ts` — export a `BlogPost` object (see `types.ts` for the interface)
2. Import and add it to the `allPosts` array in `src/content/blog/index.ts`
3. Set `published: true` when ready (drafts with `published: false` won't appear)
4. Posts auto-appear in `/blog`, sitemap, and get `generateMetadata` SEO + BlogPosting JSON-LD

### Blog Post Structure

```typescript
export const myPost: BlogPost = {
  slug: "url-friendly-slug",           // URL: /blog/url-friendly-slug
  title: "Post Title for H1 and SEO",
  description: "150-160 char description for meta and cards",
  content: `Markdown content here...`, // Rendered by <MarkdownContent>
  publishedAt: "2026-02-06",           // ISO date
  author: "OpenKit Team",
  readingTime: 7,                      // wordCount / 200
  category: "guides",                  // guides | engineering | privacy | comparisons | announcements | workflows
  tags: ["tag1", "tag2"],
  relatedTools: ["/json", "/jwt"],     // Cross-link to tool pages
  published: true,
};
```

### Key Files

- `src/content/blog/types.ts` — `BlogPost` interface and `BlogCategory` type
- `src/content/blog/index.ts` — Post registry + helper functions (`getPublishedPosts`, `getPostBySlug`, `getAllSlugs`)
- `src/app/blog/page.tsx` — Blog index with category filtering
- `src/app/blog/[slug]/page.tsx` — Post page with `generateStaticParams` + `generateMetadata`
- `src/components/blog-post-view.tsx` — Client component rendering post content

### Content Guidelines

See `agent.md` at project root for detailed blog content strategy, SEO guidelines, and editorial standards.
