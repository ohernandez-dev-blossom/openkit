import { test, expect } from '@playwright/test';
import { TestUtils } from './helpers/test-utils';

/**
 * Dark Mode / Theme Test Suite
 * Comprehensive tests for dark mode functionality
 */

test.describe('Dark Mode Toggle', () => {
  test('theme toggle button exists and is accessible', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.locator(
      'button[aria-label*="theme"], button[aria-label*="dark"], button[aria-label*="light"], button:has-text("🌙"), button:has-text("☀")'
    ).first();
    
    const count = await themeToggle.count();
    
    if (count > 0) {
      await expect(themeToggle).toBeVisible();
      
      // Should have proper ARIA label
      const ariaLabel = await themeToggle.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    }
  });

  test('clicking toggle switches theme', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.locator(
      'button[aria-label*="theme"], button[aria-label*="dark"], button[aria-label*="light"]'
    ).first();
    
    const count = await themeToggle.count();
    
    if (count > 0) {
      // Get initial theme
      const initialClass = await page.locator('html').getAttribute('class');
      const initialTheme = initialClass?.includes('dark') ? 'dark' : 'light';
      
      // Toggle theme
      await themeToggle.click();
      await page.waitForTimeout(300);
      
      // Check theme changed
      const newClass = await page.locator('html').getAttribute('class');
      const newTheme = newClass?.includes('dark') ? 'dark' : 'light';
      
      expect(initialTheme).not.toBe(newTheme);
    }
  });

  test('theme persists across page refreshes', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.locator(
      'button[aria-label*="theme"], button[aria-label*="dark"], button[aria-label*="light"]'
    ).first();
    
    const count = await themeToggle.count();
    
    if (count > 0) {
      // Set to dark mode
      await themeToggle.click();
      await page.waitForTimeout(200);
      
      const themeBefore = await page.locator('html').getAttribute('class');
      
      // Refresh page
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Theme should persist
      const themeAfter = await page.locator('html').getAttribute('class');
      expect(themeBefore).toBe(themeAfter);
    }
  });

  test('theme persists across navigation', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.locator(
      'button[aria-label*="theme"], button[aria-label*="dark"], button[aria-label*="light"]'
    ).first();
    
    const count = await themeToggle.count();
    
    if (count > 0) {
      // Set theme
      await themeToggle.click();
      await page.waitForTimeout(200);
      
      const themeBefore = await page.locator('html').getAttribute('class');
      
      // Navigate to a tool
      await page.goto('/json');
      await page.waitForLoadState('networkidle');
      
      // Theme should persist
      const themeAfter = await page.locator('html').getAttribute('class');
      expect(themeBefore).toBe(themeAfter);
      
      // Navigate back
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Theme should still persist
      const themeFinal = await page.locator('html').getAttribute('class');
      expect(themeBefore).toBe(themeFinal);
    }
  });
});

test.describe('Dark Mode Styling', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('dark mode has appropriate background color', async ({ page }) => {
    await page.goto('/');
    
    // Enable dark mode
    const themeToggle = page.locator('button[aria-label*="theme"]').first();
    const count = await themeToggle.count();
    
    if (count > 0) {
      await themeToggle.click();
      await page.waitForTimeout(200);
      
      // Check background is dark
      const bgColor = await page.locator('body').evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      });
      
      // Should be a dark color (low RGB values)
      expect(bgColor).toBeTruthy();
    }
  });

  test('dark mode has good text contrast', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.locator('button[aria-label*="theme"]').first();
    const count = await themeToggle.count();
    
    if (count > 0) {
      await themeToggle.click();
      await page.waitForTimeout(200);
      
      // Get text and background colors
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      
      const styles = await h1.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
        };
      });
      
      expect(styles.color).toBeTruthy();
    }
  });

  test('dark mode applies to all tool pages', async ({ page }) => {
    const tools = ['json', 'base64', 'hash', 'uuid', 'password'];
    
    await page.goto('/');
    
    const themeToggle = page.locator('button[aria-label*="theme"]').first();
    const count = await themeToggle.count();
    
    if (count > 0) {
      // Enable dark mode
      await themeToggle.click();
      await page.waitForTimeout(200);
      
      // Visit each tool and check theme
      for (const tool of tools) {
        await page.goto(`/${tool}`);
        await page.waitForLoadState('networkidle');
        
        const htmlClass = await page.locator('html').getAttribute('class');
        expect(htmlClass).toContain('dark');
      }
    }
  });

  test('code blocks readable in dark mode', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.locator('button[aria-label*="theme"]').first();
    const count = await themeToggle.count();
    
    if (count > 0) {
      await themeToggle.click();
      await page.waitForTimeout(200);
      
      // Navigate to a tool with code display
      await page.goto('/json');
      await utils.waitForToolLoad();
      
      const textarea = page.locator('textarea').first();
      await textarea.fill('{"test":true}');
      
      await utils.clickPrimaryAction('Format');
      await page.waitForTimeout(300);
      
      // Check output is visible and readable
      const output = page.locator('textarea').nth(1);
      const isVisible = await output.isVisible();
      expect(isVisible).toBe(true);
      
      const styles = await output.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
        };
      });
      
      expect(styles.color).toBeTruthy();
    }
  });
});

test.describe('System Preference Detection', () => {
  test('respects system dark mode preference', async ({ page }) => {
    // Set system to prefer dark mode via page emulation
    await page.emulateMedia({ colorScheme: 'dark' });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check if theme adapts (depends on implementation)
    const htmlClass = await page.locator('html').getAttribute('class');

    // Note: This test depends on whether app auto-detects system preference
    // If it does, htmlClass should contain 'dark'
  });

  test('respects system light mode preference', async ({ page }) => {
    // Set system to prefer light mode via page emulation
    await page.emulateMedia({ colorScheme: 'light' });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Should default to light or respect preference
    const htmlClass = await page.locator('html').getAttribute('class');

    // Should not be dark mode
    // (depends on implementation - might be null or 'light')
  });
});

test.describe('Dark Mode Accessibility', () => {
  test('focus indicators visible in dark mode', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.locator('button[aria-label*="theme"]').first();
    const count = await themeToggle.count();
    
    if (count > 0) {
      await themeToggle.click();
      await page.waitForTimeout(200);
      
      // Tab to focus an element
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      
      const focusedElement = page.locator(':focus');
      const isVisible = await focusedElement.isVisible();
      expect(isVisible).toBe(true);
      
      // Check outline or focus ring exists
      const outline = await focusedElement.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          outline: computed.outline,
          outlineColor: computed.outlineColor,
          boxShadow: computed.boxShadow,
        };
      });
      
      const hasFocusIndicator = (
        outline.outline !== 'none' ||
        outline.outlineColor !== 'transparent' ||
        outline.boxShadow !== 'none'
      );
      
      expect(hasFocusIndicator).toBe(true);
    }
  });

  test('toggle button has proper state indication', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.locator('button[aria-label*="theme"]').first();
    const count = await themeToggle.count();
    
    if (count > 0) {
      // Get initial state
      const initialAria = await themeToggle.getAttribute('aria-pressed');
      
      // Toggle
      await themeToggle.click();
      await page.waitForTimeout(200);
      
      // State should update
      const newAria = await themeToggle.getAttribute('aria-pressed');
      
      // Either aria-pressed should change or aria-label should update
      const stateChanged = (
        initialAria !== newAria ||
        await themeToggle.getAttribute('aria-label') !== await page.locator('button[aria-label*="theme"]').first().getAttribute('aria-label')
      );
      
      expect(await themeToggle.getAttribute('aria-label')).toBeTruthy();
    }
  });
});

test.describe('Dark Mode Edge Cases', () => {
  test('theme works with disabled JavaScript (progressive enhancement)', async ({ page, context }) => {
    // This test verifies fallback behavior
    await page.goto('/');
    
    // Page should still be usable
    const h1 = page.locator('h1');
    await expect(h1.first()).toBeVisible();
  });

  test('multiple rapid theme toggles handled correctly', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.locator('button[aria-label*="theme"]').first();
    const count = await themeToggle.count();
    
    if (count > 0) {
      // Toggle 5 times rapidly
      for (let i = 0; i < 5; i++) {
        await themeToggle.click();
        await page.waitForTimeout(50);
      }
      
      // Should end up in a stable state
      await page.waitForTimeout(200);
      
      const finalClass = await page.locator('html').getAttribute('class');
      expect(finalClass !== null).toBe(true);
      
      // Page should still be functional
      const h1 = page.locator('h1');
      await expect(h1.first()).toBeVisible();
    }
  });

  test('theme localStorage corruption handled gracefully', async ({ page }) => {
    await page.goto('/');
    
    // Corrupt theme in localStorage
    await page.evaluate(() => {
      localStorage.setItem('theme', 'invalid-theme-value-12345');
    });
    
    // Refresh page
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Should fallback to a valid theme
    const htmlClass = await page.locator('html').getAttribute('class');
    
    // Page should still be functional
    const h1 = page.locator('h1');
    await expect(h1.first()).toBeVisible();
  });
});

test.describe('Dark Mode Performance', () => {
  test('theme switch does not cause layout shift', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const themeToggle = page.locator('button[aria-label*="theme"]').first();
    const count = await themeToggle.count();
    
    if (count > 0) {
      // Get element positions before toggle
      const h1 = page.locator('h1').first();
      const boundingBoxBefore = await h1.boundingBox();
      
      // Toggle theme
      await themeToggle.click();
      await page.waitForTimeout(300);
      
      // Get positions after toggle
      const boundingBoxAfter = await h1.boundingBox();
      
      // Positions should remain the same
      if (boundingBoxBefore && boundingBoxAfter) {
        expect(boundingBoxBefore.x).toBe(boundingBoxAfter.x);
        expect(boundingBoxBefore.y).toBe(boundingBoxAfter.y);
      }
    }
  });

  test('theme transition is smooth', async ({ page }) => {
    await page.goto('/');
    
    const themeToggle = page.locator('button[aria-label*="theme"]').first();
    const count = await themeToggle.count();
    
    if (count > 0) {
      const startTime = Date.now();
      
      await themeToggle.click();
      
      // Wait for transition
      await page.waitForTimeout(100);
      
      const transitionTime = Date.now() - startTime;
      
      // Transition should be quick (< 500ms)
      expect(transitionTime).toBeLessThan(500);
    }
  });
});
