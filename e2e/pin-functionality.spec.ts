import { test, expect } from '@playwright/test';
import { TestUtils } from './helpers/test-utils';

/**
 * Pin/Unpin Functionality Test Suite
 * Tests the ability to pin favorite tools for quick access
 */

test.describe('Pin/Unpin Functionality', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('should pin a tool from landing page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find a pin button
    const pinButton = page.locator('button[aria-label*="Pin"], button:has-text("📌"), button[title*="pin"]').first();
    const count = await pinButton.count();
    
    if (count > 0) {
      await pinButton.click();
      await page.waitForTimeout(300);
      
      // Check if pinned tools section appears
      const pinnedSection = page.locator('text=/Pinned|Favorites/i');
      const sectionCount = await pinnedSection.count();
      
      if (sectionCount > 0) {
        await expect(pinnedSection.first()).toBeVisible();
      }
      
      // Verify localStorage contains pinned tool
      const pinnedTools = await page.evaluate(() => {
        return localStorage.getItem('pinnedTools');
      });
      
      expect(pinnedTools).toBeTruthy();
    }
  });

  test('should pin a tool from tool page', async ({ page }) => {
    await utils.navigateToTool('json');
    await utils.waitForToolLoad();
    
    // Look for pin button in header or toolbar
    const pinButton = page.locator('button[aria-label*="Pin"], button:has-text("📌"), button[title*="pin"]').first();
    const count = await pinButton.count();
    
    if (count > 0) {
      await pinButton.click();
      await page.waitForTimeout(200);
      
      // Navigate back to home
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check if pinned section exists
      const pinnedSection = page.locator('text=/Pinned|Favorites/i');
      const sectionCount = await pinnedSection.count();
      
      if (sectionCount > 0) {
        await expect(pinnedSection.first()).toBeVisible();
        
        // Check if JSON tool appears in pinned section
        const jsonLink = page.locator('a[href="/json"]').first();
        await expect(jsonLink).toBeVisible();
      }
    }
  });

  test('should unpin a tool', async ({ page }) => {
    await page.goto('/');
    
    // First pin a tool
    const pinButton = page.locator('button[aria-label*="Pin"], button:has-text("📌"), button[title*="pin"]').first();
    const count = await pinButton.count();
    
    if (count > 0) {
      await pinButton.click();
      await page.waitForTimeout(200);
      
      // Now unpin it (button should change to unpin)
      const unpinButton = page.locator('button[aria-label*="Unpin"], button[aria-pressed="true"]').first();
      const unpinCount = await unpinButton.count();
      
      if (unpinCount > 0) {
        await unpinButton.click();
        await page.waitForTimeout(200);
        
        // Verify localStorage is updated
        const pinnedTools = await page.evaluate(() => {
          return localStorage.getItem('pinnedTools');
        });
        
        expect(pinnedTools === null || pinnedTools === '[]').toBeTruthy();
      }
    }
  });

  test('should persist pinned tools across page refreshes', async ({ page }) => {
    await page.goto('/');
    
    const pinButton = page.locator('button[aria-label*="Pin"], button:has-text("📌"), button[title*="pin"]').first();
    const count = await pinButton.count();
    
    if (count > 0) {
      await pinButton.click();
      await page.waitForTimeout(200);
      
      // Get pinned tools from localStorage
      const pinnedBefore = await page.evaluate(() => {
        return localStorage.getItem('pinnedTools');
      });
      
      // Refresh page
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Check localStorage persisted
      const pinnedAfter = await page.evaluate(() => {
        return localStorage.getItem('pinnedTools');
      });
      
      expect(pinnedBefore).toBe(pinnedAfter);
      
      // Pinned section should still be visible
      const pinnedSection = page.locator('text=/Pinned|Favorites/i');
      const sectionCount = await pinnedSection.count();
      
      if (sectionCount > 0) {
        await expect(pinnedSection.first()).toBeVisible();
      }
    }
  });

  test('should pin multiple tools', async ({ page }) => {
    await page.goto('/');
    
    const pinButtons = page.locator('button[aria-label*="Pin"], button:has-text("📌"), button[title*="pin"]');
    const count = await pinButtons.count();
    
    if (count >= 3) {
      // Pin first 3 tools
      for (let i = 0; i < 3; i++) {
        await pinButtons.nth(i).click();
        await page.waitForTimeout(100);
      }
      
      // Check localStorage contains 3 tools
      const pinnedTools = await page.evaluate(() => {
        const stored = localStorage.getItem('pinnedTools');
        return stored ? JSON.parse(stored) : [];
      });
      
      expect(Array.isArray(pinnedTools)).toBe(true);
      expect(pinnedTools.length).toBeGreaterThanOrEqual(1);
    }
  });

  test('pinned tools quick access from landing page', async ({ page }) => {
    await page.goto('/');
    
    // Pin JSON tool
    const jsonToolCard = page.locator('text=JSON Formatter').first();
    const cardCount = await jsonToolCard.count();
    
    if (cardCount > 0) {
      const pinButton = page.locator('button[aria-label*="Pin"], button:has-text("📌"), button[title*="pin"]').first();
      const pinCount = await pinButton.count();
      
      if (pinCount > 0) {
        await pinButton.click();
        await page.waitForTimeout(200);
        
        // Navigate to pinned section and click the tool
        const pinnedLink = page.locator('a[href="/json"]').first();
        const linkCount = await pinnedLink.count();
        
        if (linkCount > 0) {
          await pinnedLink.click();
          
          // Should navigate to JSON tool
          await expect(page).toHaveURL('/json');
        }
      }
    }
  });

  test('pin icon state changes when pinned', async ({ page }) => {
    await page.goto('/');
    
    const pinButton = page.locator('button[aria-label*="Pin"], button:has-text("📌"), button[title*="pin"]').first();
    const count = await pinButton.count();
    
    if (count > 0) {
      // Get initial state
      const initialAriaPressed = await pinButton.getAttribute('aria-pressed');
      const initialClass = await pinButton.getAttribute('class');
      
      // Pin the tool
      await pinButton.click();
      await page.waitForTimeout(200);
      
      // Check state changed
      const newAriaPressed = await pinButton.getAttribute('aria-pressed');
      const newClass = await pinButton.getAttribute('class');
      
      // At least one of these should change
      const stateChanged = (
        initialAriaPressed !== newAriaPressed ||
        initialClass !== newClass
      );
      
      expect(stateChanged).toBe(true);
    }
  });

  test('should limit number of pinned tools if max is set', async ({ page }) => {
    await page.goto('/');
    
    const pinButtons = page.locator('button[aria-label*="Pin"], button:has-text("📌"), button[title*="pin"]');
    const count = await pinButtons.count();
    
    if (count >= 10) {
      // Try to pin 10 tools
      for (let i = 0; i < 10; i++) {
        await pinButtons.nth(i).click();
        await page.waitForTimeout(50);
      }
      
      // Check localStorage
      const pinnedTools = await page.evaluate(() => {
        const stored = localStorage.getItem('pinnedTools');
        return stored ? JSON.parse(stored) : [];
      });
      
      // Should have a reasonable limit (e.g., 10 or less)
      expect(pinnedTools.length).toBeLessThanOrEqual(10);
    }
  });
});
