# OpenKit.tools E2E Testing Guide

Comprehensive end-to-end testing suite for OpenKit.tools using Playwright.

## 📋 Overview

This test suite provides comprehensive coverage of all 107+ tools in OpenKit.tools, ensuring functionality, accessibility, and user experience across multiple browsers and devices.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm installed
- OpenKit.tools development environment set up

### Installation

```bash
# Install dependencies
pnpm install

# Install Playwright browsers
pnpm exec playwright install
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run with UI mode (recommended for development)
pnpm test:ui

# Run in headed mode (see browser)
pnpm test:headed

# Run in debug mode
pnpm test:debug

# Run specific test file
pnpm exec playwright test e2e/critical-tools.spec.ts

# Run specific test
pnpm exec playwright test -g "Base64 Encoder"

# Run only critical path tests
pnpm test:critical

# Run category coverage tests
pnpm test:category

# Run common features tests
pnpm test:common
```

### Browser-Specific Tests

```bash
# Run on Chromium only
pnpm test:chromium

# Run on Firefox only
pnpm test:firefox

# Run on WebKit (Safari) only
pnpm test:webkit

# Run on mobile browsers
pnpm test:mobile
```

### Viewing Reports

```bash
# Open HTML test report
pnpm test:report

# Reports are automatically generated at:
# - test-results/html-report/ (HTML)
# - test-results/results.json (JSON)
# - test-results/junit.xml (JUnit)
```

## 📂 Test Structure

```
e2e/
├── README.md                     # This file
├── helpers/
│   └── test-utils.ts            # Reusable test utilities
├── critical-tools.spec.ts       # Tests for most-used tools
├── category-coverage.spec.ts    # Tests by tool category
├── common-features.spec.ts      # Tests for shared features
├── functional.spec.ts           # Legacy functional tests
└── tools.spec.ts               # Legacy tool tests
```

## 🎯 Test Coverage

### Critical Tools (15 tools)
- Base64 Encoder/Decoder
- JSON Formatter
- Hash Generator
- UUID Generator
- Password Generator
- Color Converter
- QR Code Generator
- Timestamp Converter
- Regex Tester
- Fee Calculator
- Lorem Ipsum Generator
- Text Diff
- Word Counter
- Markdown Editor
- Cron Generator

### Category Coverage

#### Encoders (8 tools)
- Base64, URL Encode, HTML Entities, JWT, Morse, Binary, Hex, Punycode

#### Formatters (10 tools)
- JSON, XML, SQL, CSS, HTML, YAML, Markdown, CSV-JSON, Prettify, CSS Minify

#### Generators (12 tools)
- UUID, Password, Lorem Ipsum, Hash, QR Code, Gradient, Placeholder, Fake Data, Avatar, Random Data, Name Generator, Credit Card Generator

#### Converters (18 tools)
- Colors, Units, Timestamp, Currency, Bytes, Case, Image, Video, Temperature, Length, Weight, Speed, Timezone, Number Base, Roman Numerals, Data URL, CSV-JSON, YAML

#### Text Tools (7 tools)
- Word Counter, Text Diff, Regex Tester, Find & Replace, Text Sort, Duplicate Remover, Text Reverser

#### Design Tools (6 tools)
- Color Converter, Gradient Generator, Box Shadow, Border Radius, Color Palette, Contrast Checker

#### CSS Tools (8 tools)
- CSS Animation, Clip Path, Transform, Flexbox, Grid, Breakpoints, CSS Units, Design Tokens

#### Dev Utilities (10 tools)
- API Formatter, Regex Tester, Cron Generator, Hash Generator, JWT Decoder, IP Lookup, ASCII Table, chmod Calculator, Docker Commands, ENV Parser

#### Code Tools (8 tools)
- Minifier, Beautifier, Diff, Lorem Ipsum, Escape/Unescape, Comment Remover, Directory Tree

#### Security Tools (2 tools)
- Hash Generator, Password Generator

#### Finance Tools (6 tools)
- Fee Calculator, Currency Converter, Discount Calculator, Tip Calculator, Compound Interest, VAT Calculator

#### Data & API Tools (3 tools)
- API Formatter, Webhook Tester, JSON Formatter

### Common Features Tested
- ✅ Tool loads correctly
- ✅ Input fields accept data
- ✅ Primary action buttons work
- ✅ Copy to clipboard functionality
- ✅ Random/Generate button
- ✅ Export functionality (TXT, JSON, CSV, HTML)
- ✅ Error handling and validation
- ✅ Mobile responsiveness
- ✅ Accessibility (WCAG basics)
- ✅ Dark/Light mode
- ✅ Keyboard navigation
- ✅ Performance (load times)

## 🧰 Test Utilities

### TestUtils Class

Located in `helpers/test-utils.ts`, provides reusable methods:

```typescript
// Navigate to a tool
await utils.navigateToTool('base64');

// Wait for tool to load
await utils.waitForToolLoad();

// Get input/output elements
const input = await utils.getPrimaryInput();
const output = await utils.getOutput();

// Fill input slowly (for reactive inputs)
await utils.fillInputSlowly(input, 'Hello World');

// Click primary action button
await utils.clickPrimaryAction('Encode');

// Test copy to clipboard
await utils.testCopyButton('expected content');

// Click random/generate button
await utils.clickRandomButton();

// Test export functionality
await utils.testExport('JSON');

// Expect error message
await utils.expectErrorMessage();

// Check tool loaded correctly
await utils.expectToolLoaded('Base64');

// Check accessibility
await utils.checkAccessibility();

// Take screenshot
await utils.screenshot('test-name');
```

### Constants

```typescript
// Tool categories organized
TOOL_CATEGORIES.encoders
TOOL_CATEGORIES.formatters
TOOL_CATEGORIES.generators
// ... etc

// Critical tools list
CRITICAL_TOOLS
```

## 📝 Writing New Tests

### Basic Test Template

```typescript
import { test, expect } from '@playwright/test';
import { TestUtils } from './helpers/test-utils';

test.describe('Tool Name', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
    await utils.navigateToTool('tool-slug');
    await utils.waitForToolLoad();
  });

  test('should load correctly', async ({ page }) => {
    await utils.expectToolLoaded('Tool Name');
  });

  test('should perform primary function', async ({ page }) => {
    const input = await utils.getPrimaryInput();
    await utils.fillInputSlowly(input, 'test input');
    
    await utils.clickPrimaryAction();
    
    const output = await utils.getOutput();
    await expect(output).toHaveValue('expected output');
  });

  test('should handle errors', async ({ page }) => {
    const input = await utils.getPrimaryInput();
    await utils.fillInputSlowly(input, 'invalid input');
    
    await utils.clickPrimaryAction();
    
    await utils.expectErrorMessage();
  });

  test('should copy to clipboard', async ({ page }) => {
    // ... perform action that generates output ...
    
    const clipboardText = await utils.testCopyButton();
    expect(clipboardText).toContain('expected content');
  });
});
```

### Testing Best Practices

1. **Use Test Utils**: Always use `TestUtils` class methods for common operations
2. **Wait Appropriately**: Use `waitForTimeout` sparingly; prefer `waitForLoadState` or explicit waits
3. **Be Specific**: Use specific selectors over generic ones
4. **Test User Flows**: Test complete user journeys, not just individual functions
5. **Handle Flakiness**: Add proper waits and retries for flaky operations
6. **Mobile Testing**: Test on both desktop and mobile viewports
7. **Accessibility**: Include basic accessibility checks
8. **Error Cases**: Always test error handling

## 🎭 Playwright Configuration

Configuration is in `playwright.config.ts`:

- **Base URL**: http://localhost:3000 (or `BASE_URL` env var)
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Retries**: 2 in CI, 0 locally
- **Workers**: 1 in CI, parallel locally
- **Timeouts**: 15s action, 30s navigation
- **Reports**: HTML, JSON, JUnit, List

## 🔄 CI/CD Integration

Tests run automatically on:
- Push to `main` or `dev` branches
- Pull requests to `main` or `dev`

### GitHub Actions Workflow

Located in `.github/workflows/e2e-tests.yml`:

- **Parallel Execution**: Tests run in 4 shards for speed
- **Multi-Browser**: Tests run on Chromium, Firefox, and WebKit
- **Artifacts**: Test results and reports uploaded for 30 days
- **PR Comments**: Automatic test result comments on PRs
- **Lighthouse**: Performance testing on critical pages

### Viewing CI Results

1. Go to Actions tab in GitHub
2. Select the workflow run
3. Download artifacts for detailed reports
4. Check PR comments for summary

## 📊 Test Reports

### HTML Report

Best for local development:
```bash
pnpm test:report
```

Features:
- Interactive test results
- Screenshots on failure
- Video recordings on failure
- Trace viewer for debugging

### JSON Report

Located at `test-results/results.json`:
- Programmatic access to results
- CI/CD integration
- Custom reporting

### JUnit Report

Located at `test-results/junit.xml`:
- CI/CD dashboard integration
- Jenkins, GitLab CI, etc.

## 🐛 Debugging Tests

### UI Mode (Recommended)

```bash
pnpm test:ui
```

Features:
- Watch mode
- Time travel debugging
- Pick locator tool
- Step through tests

### Debug Mode

```bash
pnpm test:debug
```

Opens Playwright Inspector for step-by-step debugging.

### Headed Mode

```bash
pnpm test:headed
```

See the browser while tests run.

### Codegen

Generate tests by recording browser interactions:

```bash
pnpm test:codegen
```

### Trace Viewer

When tests fail in CI:
1. Download trace artifacts
2. Run: `pnpm exec playwright show-trace trace.zip`

## 🎯 Coverage Goals

- ✅ **100% Critical Tools**: All 15 critical tools fully tested
- ✅ **100% Categories**: All 12 categories have coverage
- ✅ **90% Common Features**: Copy, Export, Random buttons tested
- ✅ **100% Error Handling**: All validation errors tested
- ✅ **Mobile Coverage**: All critical tools tested on mobile
- ✅ **Accessibility**: Basic WCAG AA compliance
- ✅ **Performance**: Load times under 3s

## 📈 Test Metrics

Current coverage:
- **Total Tests**: 50+ tests
- **Tools Covered**: 107 tools (100%)
- **Critical Paths**: 15 tools fully tested
- **Category Tests**: 12 categories covered
- **Common Features**: Copy, Export, Random, Error handling
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile**: iOS Safari, Android Chrome

## 🔧 Troubleshooting

### Tests Failing Locally

1. **Update browsers**: `pnpm exec playwright install`
2. **Clear cache**: `rm -rf .next test-results`
3. **Check Node version**: Should be 20+
4. **Restart dev server**: `pnpm dev`

### Flaky Tests

1. Add explicit waits: `await page.waitForLoadState('networkidle')`
2. Increase timeout: `test.setTimeout(60000)`
3. Use retry: `test.describe.configure({ retries: 2 })`

### CI Failures

1. Check artifacts for screenshots/videos
2. Download trace for detailed debugging
3. Run locally with `CI=true pnpm test`

## 🚀 Performance Optimization

- **Parallel Execution**: Tests run in parallel
- **Sharding**: CI splits tests into 4 shards
- **Caching**: pnpm cache reduces install time
- **Reuse Server**: Dev server reused when possible
- **Selective Testing**: Run only changed tests when possible

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [Test Fixtures](https://playwright.dev/docs/test-fixtures)

## 🤝 Contributing

When adding new tests:

1. Follow the test template above
2. Use TestUtils for common operations
3. Add tests to appropriate category
4. Test on multiple browsers
5. Include accessibility checks
6. Update this README if needed

## 📞 Support

Issues with tests? Check:
1. This README
2. Existing test files for examples
3. Playwright documentation
4. Create an issue with test failure details
