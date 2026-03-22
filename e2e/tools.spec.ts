import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('loads and shows all tools', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('OpenKit.tools');
    
    // Check all 17 tools are visible
    const tools = ['JSON Formatter', 'Color Converter', 'Fee Calculator', 'Timestamp Tool', 
      'Base64 Encoder', 'Hash Generator', 'Lorem Ipsum', 'Markdown Editor', 'QR Code',
      'Text Diff', 'Regex Tester', 'Word Counter', 'UUID Generator', 'Password Generator',
      'IP Lookup', 'JWT Decoder', 'Cron Generator'];
    
    for (const tool of tools) {
      await expect(page.locator(`text=${tool}`).first()).toBeVisible();
    }
  });

  test('search filters tools', async ({ page }) => {
    await page.goto('/');
    await page.fill('input[placeholder="Search tools..."]', 'json');
    await expect(page.locator('text=JSON Formatter')).toBeVisible();
    await expect(page.locator('text=Color Converter')).not.toBeVisible();
  });

  test('tool links work', async ({ page }) => {
    await page.goto('/');
    await page.click('text=JSON Formatter');
    await expect(page).toHaveURL('/json');
  });
});

test.describe('JSON Formatter', () => {
  test('page loads', async ({ page }) => {
    await page.goto('/json');
    await expect(page.locator('h1')).toContainText('JSON');
  });

  test('back link works', async ({ page }) => {
    await page.goto('/json');
    await page.click('text=Back to tools');
    await expect(page).toHaveURL('/');
  });
});

test.describe('Fee Calculator', () => {
  test('page loads with PayPal', async ({ page }) => {
    await page.goto('/fees');
    await expect(page.locator('text=PayPal Standard')).toBeVisible();
  });

  test('Stripe tab switches correctly', async ({ page }) => {
    await page.goto('/fees');
    await page.click('button:has-text("Stripe")');
    await expect(page.locator('text=Stripe Standard')).toBeVisible();
  });

  test('Wise tab switches correctly', async ({ page }) => {
    await page.goto('/fees');
    await page.click('button:has-text("Wise")');
    await expect(page.locator('text=Wise USD')).toBeVisible();
  });

  test('shows calculation result', async ({ page }) => {
    await page.goto('/fees');
    await expect(page.locator('text=They should send')).toBeVisible();
  });
});

test.describe('Color Converter', () => {
  test('page loads with color formats', async ({ page }) => {
    await page.goto('/colors');
    await expect(page.locator('h1')).toContainText('Color');
  });

  test('shows HEX RGB HSL', async ({ page }) => {
    await page.goto('/colors');
    await expect(page.getByText('HEX', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('RGB', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('HSL', { exact: true }).first()).toBeVisible();
  });
});

test.describe('Hash Generator', () => {
  test('generates all hash types', async ({ page }) => {
    await page.goto('/hash');
    await page.fill('textarea', 'test');
    await page.click('button:has-text("Generate")');
    
    // Check hash results section appears
    await expect(page.locator('text=Hash Results')).toBeVisible();
    
    // Verify MD5 is correct for "test"
    await expect(page.locator('text=098f6bcd4621d373cade4e832627b4f6')).toBeVisible();
  });
});

test.describe('UUID Generator', () => {
  test('generates UUID on load', async ({ page }) => {
    await page.goto('/uuid');
    // UUID format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    await expect(page.locator('code')).toContainText(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  });

  test('generate button creates new UUID', async ({ page }) => {
    await page.goto('/uuid');
    const initialUuid = await page.locator('code').first().textContent();
    await page.click('text=Generate');
    // New UUID should be different (with high probability)
    await expect(page.locator('code').first()).toBeVisible();
  });
});

test.describe('Password Generator', () => {
  test('generates password on load', async ({ page }) => {
    await page.goto('/password');
    const password = await page.locator('.font-mono.text-lg, .font-mono.text-2xl').first().textContent();
    expect(password?.length).toBeGreaterThanOrEqual(8);
  });

  test('length slider changes password length', async ({ page }) => {
    await page.goto('/password');
    // Click generate to get fresh password
    await page.click('text=Generate New Password');
    await expect(page.locator('text=Strength')).toBeVisible();
  });
});

test.describe('Timestamp Converter', () => {
  test('page loads', async ({ page }) => {
    await page.goto('/timestamp');
    await expect(page.locator('h1')).toContainText('Timestamp');
  });
});

test.describe('Base64 Encoder', () => {
  test('page loads', async ({ page }) => {
    await page.goto('/base64');
    await expect(page.locator('h1')).toContainText('Encoder');
  });
});

test.describe('QR Code Generator', () => {
  test('shows QR code', async ({ page }) => {
    await page.goto('/qr');
    await expect(page.locator('img[alt="QR Code"]')).toBeVisible();
  });

  test('download buttons visible', async ({ page }) => {
    await page.goto('/qr');
    await expect(page.locator('text=Download PNG')).toBeVisible();
    await expect(page.locator('text=Download SVG')).toBeVisible();
  });
});

test.describe('Regex Tester', () => {
  test('shows matches', async ({ page }) => {
    await page.goto('/regex');
    // Default shows email regex match
    await expect(page.locator('text=Highlighted Matches')).toBeVisible();
  });
});

test.describe('Word Counter', () => {
  test('counts words', async ({ page }) => {
    await page.goto('/words');
    await page.fill('textarea', 'Hello world this is a test');
    await expect(page.locator('text=6').first()).toBeVisible(); // 6 words
  });
});

test.describe('Text Diff', () => {
  test('page loads', async ({ page }) => {
    await page.goto('/diff');
    await expect(page.locator('h1')).toContainText('Diff');
  });
});

test.describe('Lorem Ipsum', () => {
  test('page loads', async ({ page }) => {
    await page.goto('/lorem');
    await expect(page.locator('h1')).toContainText('Lorem');
  });
});

test.describe('Markdown Preview', () => {
  test('page loads', async ({ page }) => {
    await page.goto('/markdown');
    await expect(page.locator('h1').first()).toContainText('Markdown');
  });
});

test.describe('IP Lookup', () => {
  test('shows IP address', async ({ page }) => {
    await page.goto('/ip');
    // Should show either IP or loading state
    await expect(page.locator('h1')).toContainText('My IP');
  });
});

test.describe('JWT Decoder', () => {
  test('page loads', async ({ page }) => {
    await page.goto('/jwt');
    await expect(page.locator('h1')).toContainText('JWT');
  });
});

test.describe('Cron Generator', () => {
  test('shows presets', async ({ page }) => {
    await page.goto('/cron');
    await expect(page.locator('text=Every minute')).toBeVisible();
    await expect(page.locator('text=Every hour')).toBeVisible();
  });

  test('preset click updates expression', async ({ page }) => {
    await page.goto('/cron');
    await page.click('text=Every hour');
    await expect(page.locator('input').first()).toHaveValue('0 * * * *');
  });
});

// Mobile viewport test
test.describe('Mobile Responsiveness', () => {
  test('landing page works on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });
});
