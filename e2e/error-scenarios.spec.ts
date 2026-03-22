import { test, expect } from '@playwright/test';
import { TestUtils } from './helpers/test-utils';

/**
 * Error Scenarios Test Suite
 * Tests error handling, 404 pages, invalid URLs, and edge cases
 */

test.describe('404 Page', () => {
  test('404 page loads correctly', async ({ page }) => {
    const response = await page.goto('/nonexistent-tool-xyz');
    
    // Should return 404 status or show 404 page
    if (response) {
      const status = response.status();
      expect([404, 200]).toContain(status);
    }
    
    // Should show 404 message
    const pageContent = await page.content();
    const has404Message = (
      pageContent.toLowerCase().includes('404') ||
      pageContent.toLowerCase().includes('not found') ||
      pageContent.toLowerCase().includes('page not found')
    );
    
    expect(has404Message).toBe(true);
  });

  test('404 page has working navigation', async ({ page }) => {
    await page.goto('/invalid-tool-name-12345');
    
    // Should have a link back to home
    const homeLink = page.locator('a[href="/"], a:has-text("Home"), a:has-text("Back")').first();
    const count = await homeLink.count();
    
    if (count > 0) {
      await expect(homeLink).toBeVisible();
      
      // Click and verify navigation
      await homeLink.click();
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveURL('/');
    }
  });

  test('404 page maintains layout and styling', async ({ page }) => {
    await page.goto('/this-tool-does-not-exist');
    
    // Should still have header/navigation
    const h1 = page.locator('h1');
    await expect(h1.first()).toBeVisible();
    
    // Should not have broken styles
    const body = page.locator('body');
    const bgColor = await body.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    expect(bgColor).toBeTruthy();
  });

  test('404 page is accessible', async ({ page }) => {
    await page.goto('/invalid-page');
    
    // Should have proper heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    
    // Should be keyboard navigable
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement);
  });
});

test.describe('Invalid Tool URLs', () => {
  test('invalid tool slug redirects or shows error', async ({ page }) => {
    const invalidSlugs = [
      '/tool-that-doesnt-exist',
      '/admin',
      '/api/fake',
      '/..',
      '/../../etc/passwd',
    ];
    
    for (const slug of invalidSlugs) {
      const response = await page.goto(slug);
      
      if (response) {
        const status = response.status();
        
        // Should either 404 or redirect
        expect([200, 301, 302, 404]).toContain(status);
      }
      
      // Should not crash or show error stack traces
      const pageContent = await page.content();
      expect(pageContent.toLowerCase()).not.toContain('error stack');
      expect(pageContent.toLowerCase()).not.toContain('internal server error');
    }
  });

  test('malformed URLs handled gracefully', async ({ page }) => {
    const malformedUrls = [
      '/<script>alert(1)</script>',
      '/test%00',
      '/test/../../../',
    ];
    
    for (const url of malformedUrls) {
      try {
        await page.goto(url);
        
        // Should not show raw error or crash
        const pageContent = await page.content();
        expect(pageContent).not.toContain('<script>');
        expect(pageContent.toLowerCase()).not.toContain('unhandled');
      } catch (e) {
        // Navigation errors are acceptable
      }
    }
  });
});

test.describe('Input Validation Errors', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('JSON formatter - handles malformed JSON', async ({ page }) => {
    await utils.navigateToTool('json');
    await utils.waitForToolLoad();
    
    const testCases = [
      '{invalid}',
      '{"unclosed": "string',
      '{trailing comma:,}',
      'null null',
      '{key_without_quotes: "value"}',
    ];
    
    for (const testCase of testCases) {
      const input = await utils.getPrimaryInput();
      await input.clear();
      await utils.fillInputSlowly(input, testCase);
      
      await utils.clickPrimaryAction('Format');
      await page.waitForTimeout(200);
      
      // Should show error message
      await utils.expectErrorMessage();
    }
  });

  test('Base64 decoder - handles invalid base64', async ({ page }) => {
    await utils.navigateToTool('base64');
    await utils.waitForToolLoad();
    
    const invalidInputs = [
      '!!!',
      'not base64',
      'SGVsbG8=invalid',
      '12#$%^&*()',
    ];
    
    for (const invalidInput of invalidInputs) {
      const input = await utils.getPrimaryInput();
      await input.clear();
      await utils.fillInputSlowly(input, invalidInput);
      
      await page.click('button:has-text("Decode")');
      await page.waitForTimeout(200);
      
      // Should show error
      const output = await utils.getOutput();
      const value = await output.inputValue();
      expect(value.toLowerCase()).toContain('error');
    }
  });

  test('Regex tester - handles invalid regex', async ({ page }) => {
    await utils.navigateToTool('regex');
    await utils.waitForToolLoad();
    
    const invalidRegex = [
      '[unclosed',
      '(unclosed',
      '*invalid',
      '+invalid',
      '(?invalid)',
    ];
    
    for (const regex of invalidRegex) {
      const input = page.locator('textarea').first();
      await input.clear();
      await utils.fillInputSlowly(input, regex);
      
      await page.waitForTimeout(300);
      
      // Should either show error or handle gracefully
      const pageContent = await page.content();
      const hasError = (
        pageContent.toLowerCase().includes('error') ||
        pageContent.toLowerCase().includes('invalid')
      );
      
      // Should not crash the page
      const h1 = page.locator('h1');
      await expect(h1.first()).toBeVisible();
    }
  });

  test('Hash generator - handles empty input gracefully', async ({ page }) => {
    await utils.navigateToTool('hash');
    await utils.waitForToolLoad();
    
    const input = await utils.getPrimaryInput();
    await input.clear();
    
    // Should not crash
    const h1 = page.locator('h1');
    await expect(h1.first()).toBeVisible();
    
    // Should not show hash results
    const hashResults = page.locator('text=Hash Results');
    const count = await hashResults.count();
    
    if (count > 0) {
      const isVisible = await hashResults.first().isVisible();
      expect(isVisible).toBe(false);
    }
  });

  test('URL encoder - handles special characters', async ({ page }) => {
    await utils.navigateToTool('url-encode');
    await utils.waitForToolLoad();
    
    const specialChars = [
      '<script>alert(1)</script>',
      '../../etc/passwd',
      'test\x00null',
      '🚀 emoji test 🎉',
      'japanese: こんにちは',
    ];
    
    for (const text of specialChars) {
      const input = await utils.getPrimaryInput();
      await input.clear();
      await utils.fillInputSlowly(input, text);
      
      await utils.clickPrimaryAction('Encode');
      await page.waitForTimeout(200);
      
      // Should encode without crashing
      const h1 = page.locator('h1');
      await expect(h1.first()).toBeVisible();
      
      const output = await utils.getOutput();
      const encoded = await output.inputValue();
      expect(encoded.length).toBeGreaterThan(0);
    }
  });
});

test.describe('Network Errors', () => {
  test('handles offline gracefully', async ({ page, context }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Simulate offline
    await context.setOffline(true);
    
    // Try to navigate
    await page.click('a[href="/json"]').catch(() => {});
    
    // Page should still be functional with cached content
    const h1 = page.locator('h1');
    await expect(h1.first()).toBeVisible();
    
    // Re-enable network
    await context.setOffline(false);
  });
});

test.describe('XSS Prevention', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('prevents XSS in regex tester', async ({ page }) => {
    await utils.navigateToTool('regex');
    await utils.waitForToolLoad();
    
    const xssPayloads = [
      '<script>alert("XSS")</script>',
      '<img src=x onerror=alert(1)>',
      '<svg onload=alert(1)>',
      'javascript:alert(1)',
    ];
    
    for (const payload of xssPayloads) {
      const testText = page.locator('textarea').nth(1);
      await testText.clear();
      await utils.fillInputSlowly(testText, payload);
      
      await page.waitForTimeout(300);
      
      // Check output is escaped
      const highlight = page.locator('.whitespace-pre-wrap');
      const count = await highlight.count();
      
      if (count > 0) {
        const html = await highlight.first().innerHTML();
        expect(html).toContain('&lt;');
        expect(html).not.toContain('<script>');
      }
    }
  });

  test('prevents XSS in output displays', async ({ page }) => {
    await utils.navigateToTool('html-entities');
    await utils.waitForToolLoad();
    
    const input = await utils.getPrimaryInput();
    await utils.fillInputSlowly(input, '<script>alert(1)</script>');
    
    // Try to encode/decode
    await utils.clickPrimaryAction();
    await page.waitForTimeout(300);
    
    // Check the actual script doesn't execute
    const dialogPromise = page.waitForEvent('dialog', { timeout: 1000 }).catch(() => null);
    const dialog = await dialogPromise;
    
    expect(dialog).toBe(null);
  });
});

test.describe('Large Input Handling', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('JSON formatter - handles large JSON', async ({ page }) => {
    await utils.navigateToTool('json');
    await utils.waitForToolLoad();
    
    // Create large JSON object
    const largeObj: any = {};
    for (let i = 0; i < 100; i++) {
      largeObj[`key${i}`] = `value${i}`.repeat(50);
    }
    const largeJSON = JSON.stringify(largeObj);
    
    const input = await utils.getPrimaryInput();
    await input.fill(largeJSON);
    
    await utils.clickPrimaryAction('Format');
    await page.waitForTimeout(1000);
    
    // Should still work
    const output = await utils.getOutput();
    const formatted = await output.inputValue();
    expect(formatted.length).toBeGreaterThan(largeJSON.length);
  });

  test('text counter - handles very long text', async ({ page }) => {
    await utils.navigateToTool('words');
    await utils.waitForToolLoad();
    
    const longText = 'word '.repeat(10000);
    
    const input = await utils.getPrimaryInput();
    await input.fill(longText);
    
    await page.waitForTimeout(500);
    
    // Should still display count
    const h1 = page.locator('h1');
    await expect(h1.first()).toBeVisible();
  });
});

test.describe('Edge Cases', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('handles rapid repeated actions', async ({ page }) => {
    await utils.navigateToTool('uuid');
    await utils.waitForToolLoad();
    
    const generateButton = page.locator('button:has-text("Generate")').first();
    const count = await generateButton.count();
    
    if (count > 0) {
      // Click generate 10 times rapidly
      for (let i = 0; i < 10; i++) {
        await generateButton.click();
      }
      
      await page.waitForTimeout(100);
      
      // Page should still be functional
      const h1 = page.locator('h1');
      await expect(h1.first()).toBeVisible();
      
      const uuid = await page.locator('code').first().textContent();
      expect(uuid).toMatch(/^[0-9a-f-]{36}$/i);
    }
  });

  test('handles special Unicode characters', async ({ page }) => {
    await utils.navigateToTool('base64');
    await utils.waitForToolLoad();
    
    const unicodeText = '🚀 Hello 世界 مرحبا Здравствуй 🎉';
    
    const input = await utils.getPrimaryInput();
    await utils.fillInputSlowly(input, unicodeText);
    
    await utils.clickPrimaryAction('Encode');
    await page.waitForTimeout(300);
    
    const output = await utils.getOutput();
    const encoded = await output.inputValue();
    expect(encoded.length).toBeGreaterThan(0);
    
    // Decode back
    await input.clear();
    await utils.fillInputSlowly(input, encoded);
    await page.click('button:has-text("Decode")');
    await page.waitForTimeout(300);
    
    const decoded = await utils.getOutput();
    await expect(decoded).toHaveValue(unicodeText);
  });

  test('handles null bytes and control characters', async ({ page }) => {
    await utils.navigateToTool('hash');
    await utils.waitForToolLoad();
    
    const input = await utils.getPrimaryInput();
    await input.fill('test\x00\x01\x02');
    
    await utils.clickPrimaryAction('Generate');
    await page.waitForTimeout(300);
    
    // Should still generate hash
    const hashResults = page.locator('text=Hash Results');
    const count = await hashResults.count();
    
    if (count > 0) {
      await expect(hashResults.first()).toBeVisible();
    }
  });
});

test.describe('Browser Compatibility Edge Cases', () => {
  test('handles missing localStorage', async ({ page, context }) => {
    // Disable localStorage
    await context.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        value: null,
        writable: false,
      });
    });
    
    await page.goto('/');
    
    // Page should still load
    const h1 = page.locator('h1');
    await expect(h1.first()).toBeVisible();
  });

  test('handles missing clipboard API', async ({ page, context }) => {
    // Disable clipboard
    await context.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: false,
      });
    });
    
    await page.goto('/uuid');
    
    const copyButton = page.locator('button:has-text("Copy")').first();
    const count = await copyButton.count();
    
    if (count > 0) {
      // Click should not crash the page
      await copyButton.click();
      
      // Page should still be functional
      const h1 = page.locator('h1');
      await expect(h1.first()).toBeVisible();
    }
  });
});
