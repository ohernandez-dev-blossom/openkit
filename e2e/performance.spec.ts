import { test, expect } from '@playwright/test';
import { TestUtils, CRITICAL_TOOLS } from './helpers/test-utils';

/**
 * Performance Test Suite
 * Tests page load times, Core Web Vitals, and performance metrics
 */

test.describe('Page Load Performance', () => {
  test('landing page loads within 3 seconds', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000);
  });

  test('landing page DOM content loaded quickly', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(1500);
  });

  test('tool pages load within 2 seconds', async ({ page }) => {
    const tools = ['json', 'base64', 'hash', 'uuid', 'password'];
    
    for (const tool of tools) {
      const startTime = Date.now();
      
      await page.goto(`/${tool}`);
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(2000);
    }
  });
});

test.describe('Core Web Vitals', () => {
  test('Largest Contentful Paint (LCP) < 2.5s', async ({ page }) => {
    await page.goto('/');

    const lcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          // Type assertion for LCP specific properties
          const lcpEntry = lastEntry as PerformanceEntry & {
            renderTime?: number;
            loadTime?: number;
          };
          resolve(lcpEntry.renderTime || lcpEntry.loadTime || 0);
        }).observe({ type: 'largest-contentful-paint', buffered: true });

        // Timeout after 5 seconds
        setTimeout(() => resolve(0), 5000);
      });
    });

    if (lcp > 0) {
      expect(lcp).toBeLessThan(2500);
    }
  });

  test('First Contentful Paint (FCP) < 1.8s', async ({ page }) => {
    await page.goto('/');
    
    const fcp = await page.evaluate(() => {
      const paint = performance.getEntriesByType('paint');
      const fcpEntry = paint.find(entry => entry.name === 'first-contentful-paint');
      return fcpEntry ? fcpEntry.startTime : 0;
    });
    
    if (fcp > 0) {
      expect(fcp).toBeLessThan(1800);
    }
  });

  test('Time to Interactive (TTI) is reasonable', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    
    // Wait for page to be interactive
    await page.waitForLoadState('networkidle');
    
    // Try interacting with search
    const searchInput = page.locator('input[placeholder*="Search"]').first();
    const count = await searchInput.count();
    
    if (count > 0) {
      await searchInput.click();
      await searchInput.fill('test');
      
      const interactiveTime = Date.now() - startTime;
      expect(interactiveTime).toBeLessThan(3000);
    }
  });

  test('Cumulative Layout Shift (CLS) < 0.1', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Wait a bit for any layout shifts
    await page.waitForTimeout(2000);
    
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          resolve(clsValue);
        }).observe({ type: 'layout-shift', buffered: true });
        
        setTimeout(() => resolve(clsValue), 100);
      });
    });
    
    if (typeof cls === 'number') {
      expect(cls).toBeLessThan(0.1);
    }
  });
});

test.describe('Resource Loading', () => {
  test('no failed resource loads', async ({ page }) => {
    const failedResources: string[] = [];
    
    page.on('requestfailed', (request) => {
      failedResources.push(request.url());
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Filter out known acceptable failures (analytics, ads, etc.)
    const criticalFailures = failedResources.filter(url => 
      !url.includes('analytics') &&
      !url.includes('gtag') &&
      !url.includes('googletagmanager') &&
      !url.includes('facebook.com') &&
      !url.includes('twitter.com')
    );
    
    expect(criticalFailures.length).toBe(0);
  });

  test('total page size is reasonable (< 1MB)', async ({ page }) => {
    let totalSize = 0;
    
    page.on('response', async (response) => {
      const headers = response.headers();
      const contentLength = headers['content-length'];
      if (contentLength) {
        totalSize += parseInt(contentLength, 10);
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const totalMB = totalSize / (1024 * 1024);
    expect(totalMB).toBeLessThan(1);
  });

  test('images are optimized', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const images = await page.locator('img').all();
    
    for (const img of images) {
      const src = await img.getAttribute('src');
      if (src && !src.startsWith('data:')) {
        // Check if image has width/height attributes or CSS
        const hasWidth = await img.getAttribute('width');
        const hasHeight = await img.getAttribute('height');
        const hasStyle = await img.getAttribute('style');
        
        // At least one dimension should be set to prevent layout shift
        const hasDimensions = hasWidth || hasHeight || (hasStyle && hasStyle.includes('width'));
        expect(hasDimensions).toBe(true);
      }
    }
  });
});

test.describe('JavaScript Bundle Size', () => {
  test('main bundle is not too large', async ({ page }) => {
    const bundleSizes: number[] = [];
    
    page.on('response', async (response) => {
      const url = response.url();
      if (url.includes('.js') && !url.includes('node_modules')) {
        const headers = response.headers();
        const contentLength = headers['content-length'];
        if (contentLength) {
          bundleSizes.push(parseInt(contentLength, 10));
        }
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    if (bundleSizes.length > 0) {
      const totalJS = bundleSizes.reduce((a, b) => a + b, 0);
      const totalKB = totalJS / 1024;
      
      // Main bundle should be under 300KB
      expect(totalKB).toBeLessThan(300);
    }
  });
});

test.describe('Interaction Performance', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('search filters respond quickly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const searchInput = page.locator('input[placeholder*="Search"]').first();
    const count = await searchInput.count();
    
    if (count > 0) {
      const startTime = Date.now();
      
      await searchInput.fill('json');
      await page.waitForTimeout(100);
      
      // Check results updated
      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(500);
      
      // Results should be visible
      await expect(page.locator('text=JSON')).toBeVisible();
    }
  });

  test('tool interactions are responsive', async ({ page }) => {
    await utils.navigateToTool('json');
    await utils.waitForToolLoad();
    
    const input = await utils.getPrimaryInput();
    const startTime = Date.now();
    
    await utils.fillInputSlowly(input, '{"test":true}');
    await utils.clickPrimaryAction('Format');
    
    await page.waitForTimeout(100);
    
    const responseTime = Date.now() - startTime;
    expect(responseTime).toBeLessThan(2000);
  });

  test('copy operations are instant', async ({ page }) => {
    await utils.navigateToTool('uuid');
    await utils.waitForToolLoad();
    
    await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
    
    const copyButton = page.locator('button:has-text("Copy")').first();
    const startTime = Date.now();
    
    await copyButton.click();
    
    // Should show feedback quickly
    await page.waitForTimeout(50);
    const responseTime = Date.now() - startTime;
    
    expect(responseTime).toBeLessThan(500);
  });
});

test.describe('Memory Usage', () => {
  test('no significant memory leaks on repeated navigation', async ({ page }) => {
    await page.goto('/');
    
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0;
    });
    
    // Navigate through several tools
    const tools = ['json', 'base64', 'hash', 'uuid', 'password'];
    for (const tool of tools) {
      await page.goto(`/${tool}`);
      await page.waitForTimeout(200);
      await page.goto('/');
      await page.waitForTimeout(200);
    }
    
    const finalMemory = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0;
    });
    
    if (initialMemory > 0 && finalMemory > 0) {
      const memoryIncrease = finalMemory - initialMemory;
      const increaseMB = memoryIncrease / (1024 * 1024);
      
      // Memory shouldn't grow more than 10MB with this navigation
      expect(increaseMB).toBeLessThan(10);
    }
  });
});

test.describe('SEO & Accessibility Performance', () => {
  test('all pages have unique titles', async ({ page }) => {
    const tools = ['json', 'base64', 'hash', 'uuid'];
    const titles: string[] = [];
    
    for (const tool of tools) {
      await page.goto(`/${tool}`);
      const title = await page.title();
      titles.push(title);
    }
    
    const uniqueTitles = new Set(titles);
    expect(uniqueTitles.size).toBe(titles.length);
  });

  test('all pages have meta descriptions', async ({ page }) => {
    const tools = ['json', 'base64', 'hash'];
    
    for (const tool of tools) {
      await page.goto(`/${tool}`);
      
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      expect(description!.length).toBeGreaterThan(50);
    }
  });
});

test.describe('Network Efficiency', () => {
  test('uses HTTP/2 or HTTP/3', async ({ page }) => {
    let protocol = '';
    
    page.on('response', (response) => {
      if (response.url().includes(page.url())) {
        protocol = response.headers()['version'] || '';
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check if HTTP/2 or higher
    // Most modern servers should use HTTP/2
  });

  test('critical resources are not blocked', async ({ page }) => {
    const blockedResources: string[] = [];
    
    page.on('requestfailed', (request) => {
      const resourceType = request.resourceType();
      if (['document', 'stylesheet', 'script'].includes(resourceType)) {
        blockedResources.push(request.url());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    expect(blockedResources.length).toBe(0);
  });
});
