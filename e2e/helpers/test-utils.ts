import { Page, expect } from '@playwright/test';

/**
 * Common test utilities for OpenKit.tools E2E tests
 */

export class TestUtils {
  constructor(private page: Page) {}

  /**
   * Navigate to a tool by its slug
   */
  async navigateToTool(slug: string) {
    await this.page.goto(`/${slug}`);
    await this.page.waitForLoadState('networkidle');

    // Dismiss cookie modal if it appears
    try {
      const acceptButton = this.page.locator('button:has-text("Accept All"), button:has-text("Reject All")').first();
      if (await acceptButton.isVisible({ timeout: 2000 })) {
        await acceptButton.click();
        await this.page.waitForTimeout(500);
      }
    } catch {
      // Modal not present, continue
    }
  }

  /**
   * Wait for tool page to be fully loaded
   */
  async waitForToolLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    // Wait for any initial animations or data loading
    await this.page.waitForTimeout(500);

    // Ensure we're on the correct page by checking for main content
    const mainContent = this.page.locator('main');
    await mainContent.waitFor({ state: 'visible', timeout: 5000 });
  }

  /**
   * Get the primary input textarea/input
   */
  async getPrimaryInput() {
    // Try textarea first, then input
    const textarea = this.page.locator('textarea').first();
    const textareaCount = await textarea.count();
    
    if (textareaCount > 0) {
      return textarea;
    }
    
    return this.page.locator('input[type="text"]').first();
  }

  /**
   * Get the output textarea/element
   */
  async getOutput() {
    // Usually the second textarea or a code block
    const textareas = this.page.locator('textarea');
    const count = await textareas.count();
    
    if (count > 1) {
      return textareas.nth(1);
    }
    
    // Fallback to code or pre elements
    return this.page.locator('code, pre').first();
  }

  /**
   * Click the primary action button (Generate, Convert, Format, etc.)
   */
  async clickPrimaryAction(buttonText?: string) {
    const commonActions = [
      'Generate',
      'Convert',
      'Format',
      'Encode',
      'Decode',
      'Calculate',
      'Transform',
      'Process',
      'Create',
    ];

    if (buttonText) {
      await this.page.click(`button:has-text("${buttonText}")`, { force: true });
      return;
    }

    // Try to find a primary action button
    for (const action of commonActions) {
      const button = this.page.locator(`button:has-text("${action}")`).first();
      const count = await button.count();
      if (count > 0) {
        await button.click({ force: true });
        return;
      }
    }

    throw new Error('Could not find primary action button');
  }

  /**
   * Test copy to clipboard functionality
   */
  async testCopyButton(expectedContent?: string) {
    await this.page.context().grantPermissions(['clipboard-read', 'clipboard-write']);

    const copyButton = this.page.locator('button:has-text("Copy")').first();
    await expect(copyButton).toBeVisible();
    await copyButton.click({ force: true });

    // Wait for clipboard operation
    await this.page.waitForTimeout(200);

    const clipboardText = await this.page.evaluate(() => 
      navigator.clipboard.readText()
    );

    if (expectedContent) {
      expect(clipboardText).toContain(expectedContent);
    } else {
      expect(clipboardText.length).toBeGreaterThan(0);
    }

    return clipboardText;
  }

  /**
   * Test random/generate new button
   */
  async clickRandomButton() {
    const randomButtons = [
      'Random',
      'Generate New',
      'New',
      'Regenerate',
      'Generate',
    ];

    for (const text of randomButtons) {
      const button = this.page.locator(`button:has-text("${text}")`).first();
      const count = await button.count();
      if (count > 0) {
        await button.click({ force: true });
        await this.page.waitForTimeout(200);
        return true;
      }
    }

    return false;
  }

  /**
   * Test export functionality
   */
  async testExport(format: 'TXT' | 'JSON' | 'CSV' | 'HTML') {
    const downloadPromise = this.page.waitForEvent('download');

    const exportButton = this.page.locator(
      `button:has-text("Export ${format}"), button:has-text("Download ${format}"), a:has-text("${format}")`
    ).first();

    await expect(exportButton).toBeVisible();
    await exportButton.click({ force: true });

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toContain(format.toLowerCase());

    return download;
  }

  /**
   * Check for error handling
   */
  async expectErrorMessage() {
    const errorSelectors = [
      'text=Error',
      'text=Invalid',
      'text=Failed',
      '[role="alert"]',
      '.error',
      '.text-red-500',
      '.text-destructive',
    ];

    let found = false;
    for (const selector of errorSelectors) {
      const element = this.page.locator(selector).first();
      const count = await element.count();
      if (count > 0 && await element.isVisible()) {
        found = true;
        break;
      }
    }

    expect(found).toBeTruthy();
  }

  /**
   * Check that tool page loaded correctly
   */
  async expectToolLoaded(toolName?: string) {
    // Check for h1 heading
    const h1 = this.page.locator('h1').first();
    await expect(h1).toBeVisible();

    if (toolName) {
      // Try to match partial text - many tools have descriptive titles
      const h1Text = await h1.textContent();
      const matches = h1Text?.toLowerCase().includes(toolName.toLowerCase());
      
      if (!matches) {
        // Also check page title or URL
        const title = await this.page.title();
        const url = this.page.url();
        const titleMatches = title.toLowerCase().includes(toolName.toLowerCase());
        const urlMatches = url.includes(toolName.toLowerCase().replace(/\s+/g, '-'));
        
        expect(titleMatches || urlMatches || matches).toBeTruthy();
      }
    }

    // Check for back button
    const backButton = this.page.locator('text=Back');
    const backCount = await backButton.count();
    expect(backCount).toBeGreaterThan(0);
  }

  /**
   * Fill input with text slowly (for reactive inputs)
   */
  async fillInputSlowly(input: any, text: string) {
    await input.click({ force: true });
    await input.clear();
    await input.pressSequentially(text, { delay: 10 });
    await this.page.waitForTimeout(200);
  }

  /**
   * Check for common tool features
   */
  async checkCommonFeatures() {
    // Check for responsive design
    const viewport = this.page.viewportSize();
    expect(viewport).toBeTruthy();

    // Check for no console errors (critical ones)
    const errors: string[] = [];
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    return {
      hasErrors: () => errors.length > 0,
      getErrors: () => errors,
    };
  }

  /**
   * Test keyboard shortcuts
   */
  async testKeyboardShortcut(key: string, modifiers: string[] = []) {
    const modifierKey = modifiers.join('+');
    const fullKey = modifierKey ? `${modifierKey}+${key}` : key;
    
    await this.page.keyboard.press(fullKey);
    await this.page.waitForTimeout(200);
  }

  /**
   * Check for accessibility basics
   */
  async checkAccessibility() {
    // Check for proper heading hierarchy
    const h1Count = await this.page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);

    // Check for form labels where inputs exist
    const inputs = this.page.locator('input, textarea, select');
    const inputCount = await inputs.count();
    
    if (inputCount > 0) {
      // At least some inputs should have labels or aria-labels
      const labelsCount = await this.page.locator('label').count();
      const ariaLabels = await this.page.locator('[aria-label]').count();
      
      expect(labelsCount + ariaLabels).toBeGreaterThan(0);
    }
  }

  /**
   * Take a screenshot for debugging
   */
  async screenshot(name: string) {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}.png`,
      fullPage: true 
    });
  }
}

/**
 * Tool categories for organized testing
 */
export const TOOL_CATEGORIES = {
  encoders: [
    'base64',
    'url-encode',
    'html-entities',
    'jwt',
    'morse',
    'binary',
    'hex',
    'punycode',
  ],
  formatters: [
    'json',
    'xml-format',
    'sql-format',
    'css-format',
    'html-format',
    'yaml',
    'markdown',
    'csv-json',
    'prettify',
    'css-minify',
  ],
  generators: [
    'uuid',
    'password',
    'lorem',
    'hash',
    'qr',
    'gradient',
    'placeholder',
    'fake-data',
    'avatar',
    'random-data',
    'name-gen',
    'cc-gen',
  ],
  converters: [
    'colors',
    'units',
    'timestamp',
    'currency',
    'bytes',
    'case',
    'image-convert',
    'video-convert',
    'temp',
    'length',
    'weight',
    'speed',
    'timezone',
    'number-base',
    'roman',
    'data-url',
    'csv-json',
    'yaml',
  ],
  textTools: [
    'words',
    'diff',
    'regex',
    'find-replace',
    'text-sort',
    'duplicate',
    'reverse',
  ],
  design: [
    'colors',
    'gradient',
    'shadow',
    'border',
    'palette',
    'contrast',
  ],
  cssTools: [
    'css-animate',
    'clip-path',
    'transform',
    'flexbox',
    'grid',
    'breakpoints',
    'css-units',
    'design-tokens',
  ],
  devUtilities: [
    'api-formatter',
    'regex',
    'cron',
    'hash',
    'jwt',
    'ip',
    'ascii',
    'chmod',
    'docker',
    'env-parser',
  ],
  codeTools: [
    'minify',
    'beautify',
    'diff',
    'lorem',
    'escape',
    'unescape',
    'comment',
    'tree',
  ],
  security: [
    'hash',
    'password',
  ],
  finance: [
    'fees',
    'currency',
    'discount',
    'tip',
    'compound',
    'vat',
  ],
  dataAndApi: [
    'api-formatter',
    'webhook',
    'json',
  ],
} as const;

/**
 * Critical paths - most important tools to test first
 */
export const CRITICAL_TOOLS = [
  'base64',
  'json',
  'hash',
  'uuid',
  'password',
  'colors',
  'qr',
  'timestamp',
  'regex',
  'fees',
  'lorem',
  'diff',
  'words',
  'markdown',
  'cron',
] as const;
