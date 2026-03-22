# Contributing to OpenKit.tools

Thanks for your interest in contributing! This guide will help you get started.

## Prerequisites

- **Node.js** 18+
- **pnpm** (install via `npm install -g pnpm`)
- A modern browser for testing

## Development Setup

```bash
git clone https://github.com/ohernandez-dev-blossom/openkit.git
cd openkit
pnpm install
pnpm dev
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Adding a New Tool

### 1. Create the Page

Create `src/app/[tool-name]/page.tsx` as a `"use client"` component. Every tool page follows this structure:

```typescript
"use client";
import { useState } from "react";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { SHORTCUTS } from "@/lib/keyboard-shortcuts";
import { RelatedTools } from "@/components/related-tools";
import { ExportHubV2 } from "@/components/export-hub-v2";
import { ShareButton } from "@/components/share-button";

export default function YourToolPage() {
  useToolTracker("your-tool", "Your Tool Name", "category");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleExecute = () => {
    // Your tool logic here — client-side only!
  };

  useKeyboardShortcut(SHORTCUTS.execute, handleExecute);

  return (
    // Header, toolbar (primary action + ExportHubV2 + ShareButton),
    // input/output panels, GeoContentLayout, RelatedTools, LastUpdated
  );
}
```

See [CLAUDE.md](CLAUDE.md) for the full tool page pattern with all shared components.

### 2. Register the Tool

Add it to the `allTools` array in `src/components/related-tools.tsx`:

```typescript
{
  name: "Your Tool Name",
  href: "/your-tool",
  icon: YourIcon,
  category: "category",
  tags: ["tag1", "tag2"],
  description: "Brief description of what the tool does",
}
```

### 3. Add Relationships

If the tool belongs to an existing ecosystem, add manual cross-links in `src/lib/tool-relationships.ts`.

### 4. Update Sitemap

Add the URL to `src/app/sitemap.ts`.

### 5. Write Tests

Create `e2e/[tool-name].spec.ts` using the `TestUtils` helper from `e2e/helpers/test-utils.ts`.

## Code Style

- **TypeScript strict mode** — No `any` types. Use explicit types or `unknown`.
- **ESLint** — Run `pnpm run lint` before committing. Use `pnpm run lint --fix` for auto-fixes.
- **SSR guards** — All browser API access (`localStorage`, `navigator`, `window`) must be wrapped in `if (typeof window !== 'undefined')`.
- **Client components** — Tool pages are `"use client"` components. SEO is handled via client-side `<StructuredData>` components, not `generateMetadata()`.
- **Language** — All code, comments, and commits in English.
- **Naming** — Components: PascalCase, functions: camelCase, files: kebab-case.

## Testing

Tests use Playwright for E2E testing. The dev server must be running.

```bash
pnpm run test:critical                      # Critical tests (~49 tests, fast)
pnpm run test                               # Full E2E suite
pnpm exec playwright test e2e/json.spec.ts  # Single test file
pnpm exec playwright test --debug           # Debug mode
```

## Pull Request Process

### Branch Naming

Use worktrees for isolation:

```bash
git worktree add ../openkit-feature-name -b feature/descriptive-name
cd ../openkit-feature-name
# ... work ...
git push -u origin feature/descriptive-name
gh pr create --title "feat: Description" --body "..."
```

Prefixes: `feature/`, `fix/`, `refactor/`, `docs/`, `test/`

### Commit Prefixes

- `feat:` — New feature
- `fix:` — Bug fix
- `refactor:` — Code refactoring
- `docs:` — Documentation
- `test:` — Tests
- `chore:` — Maintenance

### Pre-commit Hook

The pre-commit hook runs: **lint -> tsc -> build -> test:critical -> lockfile check**. All must pass before your commit goes through.

### Submitting

1. Fork the repo and create a branch from `main`
2. Make your changes following the code style above
3. Ensure all tests pass locally
4. Push and open a pull request with a clear description

## Privacy & Security

- **No server-side processing** of user data
- **No external API calls** with user data
- All tools must run entirely client-side

## Code of Conduct

Be respectful and constructive. We're all here to build great tools for developers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
