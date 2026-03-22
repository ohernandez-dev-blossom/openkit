<div align="center">

# OpenKit.tools

**130+ privacy-first developer tools that run entirely in your browser.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2016-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

JSON formatter, hash generator, regex tester, JWT decoder, base64 encoder, CIDR calculator, and 120+ more — all client-side, no data ever leaves your browser.

![OpenKit Tools](screenshot.png)

[Live Site](https://openkit.tools) · [Report Bug](https://github.com/ohernandez-dev-blossom/openkit/issues) · [Request Tool](https://github.com/ohernandez-dev-blossom/openkit/issues)

</div>

---

## Why OpenKit?

- **Privacy-first** — All processing happens client-side. Your code, API keys, and configs never touch a server.
- **130+ tools** — Encoders, formatters, generators, converters, and more. One place for everything.
- **Keyboard-driven** — `Cmd/Ctrl+Enter` to execute, `Cmd/Ctrl+K` to search, shortcuts for copy, clear, undo.
- **Dark & light mode** — Optimized for long coding sessions.
- **PWA support** — Install it and use offline.
- **Export & share** — Copy output, export as TXT/JSON/CSV/HTML, or share via URL.
- **No tracking required** — Works with JavaScript disabled for basic tools. No analytics paywall.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4, Radix UI |
| Language | TypeScript (strict mode) |
| Testing | Playwright E2E |
| Package Manager | pnpm |

## Quick Start

```bash
git clone https://github.com/ohernandez-dev-blossom/openkit.git
cd openkit
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/              # Tool pages (one directory per tool) + routes
├── components/       # Shared components (UI primitives, toolbars, export hub)
├── contexts/         # React context providers (theme, toast, shortcuts)
├── lib/              # Utilities, keyboard shortcuts, tool relationships
└── content/          # Blog posts (TypeScript files)
e2e/                  # Playwright E2E tests
```

## Tool Categories

Encoders/Decoders · Formatters · Generators · Converters · Text Tools · Design · CSS · DevTools · Code · Security · Finance · Calculators · Data · Trading

## Adding a New Tool

1. Create `src/app/[tool-name]/page.tsx` as a `"use client"` component
2. Add the tool to `src/components/related-tools.tsx`
3. Add relationships in `src/lib/tool-relationships.ts`
4. Add to `src/app/sitemap.ts`
5. Create `e2e/[tool-name].spec.ts`

See [CLAUDE.md](CLAUDE.md) for the full tool page pattern and architecture details.

## Development

```bash
pnpm dev                # Dev server
pnpm run build          # Production build
pnpm run lint           # ESLint
pnpm exec tsc --noEmit  # Type check

# Tests (requires dev server running)
pnpm run test:critical  # Critical tests (~49 tests)
pnpm run test           # Full E2E suite
```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to get started.

## License

[MIT](LICENSE) — free for personal and commercial use.
