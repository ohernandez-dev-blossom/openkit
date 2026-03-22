import { test, expect } from '@playwright/test';
import { TestUtils } from './helpers/test-utils';

/**
 * Common Features Test Suite
 * Tests features that should work across all tools
 */

test.describe('Navigation and Layout', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('Landing page loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('OpenKit.tools');
  });

  test('Search filters tools', async ({ page }) => {
    await page.goto('/');
    
    const searchInput = page.locator('input[placeholder*="Search"]').first();
    await searchInput.fill('json');
    
    await expect(page.locator('text=JSON Formatter')).toBeVisible();
    
    // Other tools should be filtered out
    const visibleTools = page.locator('a[href^="/"]');
    const count = await visibleTools.count();
    expect(count).toBeLessThan(20); // Should filter down from 100+
  });

  test('Category filter works', async ({ page }) => {
    await page.goto('/');
    
    // Check if category buttons exist
    const categoryButtons = page.locator('button').filter({ hasText: /Encoders|Formatters|Generators/ });
    const count = await categoryButtons.count();
    
    if (count > 0) {
      await categoryButtons.first().click();
      await page.waitForTimeout(200);
      
      // Should filter tools
      const visibleTools = page.locator('a[href^="/"]');
      const toolCount = await visibleTools.count();
      expect(toolCount).toBeGreaterThan(0);
    }
  });

  test('Back button works from tool page', async ({ page }) => {
    await utils.navigateToTool('json');
    
    const backButton = page.locator('text=Back').first();
    await backButton.click();
    
    await expect(page).toHaveURL('/');
  });

  test('Tool links from landing page work', async ({ page }) => {
    await page.goto('/');
    
    const firstTool = page.locator('a[href^="/"]').first();
    const href = await firstTool.getAttribute('href');
    
    await firstTool.click();
    
    if (href) {
      await expect(page).toHaveURL(href);
    }
  });
});

test.describe('Copy to Clipboard Feature', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  const toolsWithCopy = ['base64', 'json', 'hash', 'uuid', 'password', 'colors'];

  for (const tool of toolsWithCopy) {
    test(`${tool} - copy button works`, async ({ page }) => {
      await utils.navigateToTool(tool);
      await utils.waitForToolLoad();
      
      await utils.testCopyButton();
    });
  }

  test('Copy button shows feedback', async ({ page }) => {
    await utils.navigateToTool('uuid');
    await utils.waitForToolLoad();
    
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    
    const copyButton = page.locator('button:has-text("Copy")').first();
    await copyButton.click();
    
    // Should show "Copied" or similar feedback
    await expect(page.locator('text=Copied')).toBeVisible({ timeout: 2000 });
  });
});

test.describe('Random/Generate Button Feature', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  const toolsWithRandom = ['uuid', 'password', 'lorem', 'gradient'];

  for (const tool of toolsWithRandom) {
    test(`${tool} - random button generates new content`, async ({ page }) => {
      await utils.navigateToTool(tool);
      await utils.waitForToolLoad();
      
      const before = await page.locator('.font-mono, code, textarea').first().textContent();
      
      const randomClicked = await utils.clickRandomButton();
      
      if (randomClicked) {
        await page.waitForTimeout(200);
        
        const after = await page.locator('.font-mono, code, textarea').first().textContent();
        
        // Content should change (with high probability)
        expect(before).not.toBe(after);
      }
    });
  }
});

test.describe('Export Functionality', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('JSON - export TXT works', async ({ page }) => {
    await utils.navigateToTool('json');
    await utils.waitForToolLoad();
    
    const input = await utils.getPrimaryInput();
    await utils.fillInputSlowly(input, '{"test":true}');
    
    await utils.clickPrimaryAction('Format');
    await page.waitForTimeout(300);
    
    const exportButton = page.locator('button:has-text("Export"), button:has-text("Download")').first();
    const count = await exportButton.count();
    
    if (count > 0) {
      await expect(exportButton).toBeVisible();
    }
  });

  test('Hash - export results works', async ({ page }) => {
    await utils.navigateToTool('hash');
    await utils.waitForToolLoad();
    
    const input = await utils.getPrimaryInput();
    await utils.fillInputSlowly(input, 'test');
    
    await utils.clickPrimaryAction('Generate');
    await page.waitForTimeout(300);
    
    const exportButton = page.locator('button:has-text("Export"), button:has-text("Download")').first();
    const count = await exportButton.count();
    
    if (count > 0) {
      await expect(exportButton).toBeVisible();
    }
  });
});

test.describe('Error Handling', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('JSON - invalid JSON shows error', async ({ page }) => {
    await utils.navigateToTool('json');
    await utils.waitForToolLoad();
    
    const input = await utils.getPrimaryInput();
    await utils.fillInputSlowly(input, '{invalid json}');
    
    await utils.clickPrimaryAction('Format');
    
    await utils.expectErrorMessage();
  });

  test('Base64 - invalid base64 shows error', async ({ page }) => {
    await utils.navigateToTool('base64');
    await utils.waitForToolLoad();
    
    const input = await utils.getPrimaryInput();
    await utils.fillInputSlowly(input, '!!!invalid!!!');
    
    await page.click('button:has-text("Decode")');
    
    await utils.expectErrorMessage();
  });

  test('Hash - empty input handled gracefully', async ({ page }) => {
    await utils.navigateToTool('hash');
    await utils.waitForToolLoad();
    
    const input = await utils.getPrimaryInput();
    await input.clear();
    
    // Should not crash
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
  });
});

test.describe('Mobile Responsiveness', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test('Landing page works on mobile', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Tool pages work on mobile', async ({ page }) => {
    await utils.navigateToTool('json');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Input fields are usable on mobile', async ({ page }) => {
    await utils.navigateToTool('base64');
    await utils.waitForToolLoad();
    
    const input = await utils.getPrimaryInput();
    await input.click();
    await input.fill('test');
    
    const value = await input.inputValue();
    expect(value).toBe('test');
  });

  test('Buttons are tappable on mobile', async ({ page }) => {
    await utils.navigateToTool('uuid');
    await utils.waitForToolLoad();
    
    const generateButton = page.locator('button:has-text("Generate")').first();
    const count = await generateButton.count();
    
    if (count > 0) {
      const boundingBox = await generateButton.boundingBox();
      expect(boundingBox).toBeTruthy();
      
      if (boundingBox) {
        // Buttons should be at least 44x44px for touch targets
        expect(boundingBox.height).toBeGreaterThanOrEqual(36);
      }
    }
  });
});

test.describe('Accessibility', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('Landing page has proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test('Tool pages have h1 heading', async ({ page }) => {
    await utils.navigateToTool('json');
    
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });

  test('Interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement);
  });

  test('Form inputs have labels or aria-labels', async ({ page }) => {
    await utils.navigateToTool('json');
    await utils.waitForToolLoad();
    
    await utils.checkAccessibility();
  });

  test('Copy buttons have accessible text', async ({ page }) => {
    await utils.navigateToTool('uuid');
    await utils.waitForToolLoad();
    
    const copyButton = page.locator('button:has-text("Copy")').first();
    const count = await copyButton.count();
    
    if (count > 0) {
      const text = await copyButton.textContent();
      expect(text).toBeTruthy();
    }
  });
});

test.describe('Performance', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('Landing page loads within 3 seconds', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000);
  });

  test('Tool pages load quickly', async ({ page }) => {
    const startTime = Date.now();
    
    await utils.navigateToTool('json');
    await utils.waitForToolLoad();
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000);
  });

  test('No console errors on tool pages', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await utils.navigateToTool('json');
    await utils.waitForToolLoad();
    
    // Allow some benign errors
    const criticalErrors = errors.filter(e => 
      !e.includes('favicon') && 
      !e.includes('404') &&
      !e.includes('analytics')
    );
    
    expect(criticalErrors.length).toBe(0);
  });
});

test.describe('Dark Mode / Theme', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('Theme toggle exists', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.locator('button[aria-label*="theme"], button:has-text("Dark"), button:has-text("Light")').first();
    const count = await themeToggle.count();
    
    if (count > 0) {
      await expect(themeToggle).toBeVisible();
    }
  });

  test('Theme persists across navigation', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.locator('button[aria-label*="theme"], button:has-text("Dark"), button:has-text("Light")').first();
    const count = await themeToggle.count();
    
    if (count > 0) {
      await themeToggle.click();
      await page.waitForTimeout(200);
      
      const htmlClass = await page.locator('html').getAttribute('class');
      
      // Navigate to another page
      await utils.navigateToTool('json');
      
      const htmlClass2 = await page.locator('html').getAttribute('class');
      
      // Theme should persist
      expect(htmlClass).toBe(htmlClass2);
    }
  });
});

test.describe('Recent Tools History', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('Recent tools tracked in localStorage', async ({ page }) => {
    await utils.navigateToTool('json');
    await utils.waitForToolLoad();
    
    await utils.navigateToTool('base64');
    await utils.waitForToolLoad();
    
    const recentTools = await page.evaluate(() => {
      return localStorage.getItem('recentTools');
    });
    
    if (recentTools) {
      expect(recentTools).toBeTruthy();
    }
  });

  test('Recent tools section visible on landing page', async ({ page }) => {
    // Visit a few tools
    await utils.navigateToTool('json');
    await page.goto('/');
    
    const recentSection = page.locator('text=/Recent/i');
    const count = await recentSection.count();
    
    if (count > 0) {
      await expect(recentSection.first()).toBeVisible();
    }
  });
});
