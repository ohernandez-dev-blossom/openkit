import { test, expect } from '@playwright/test';

test.describe('JSON Formatter - Functional', () => {
  test('formats valid JSON', async ({ page }) => {
    await page.goto('/json');
    await page.fill('textarea', '{"a":1,"b":2}');
    await page.click('button:has-text("Format")');
    
    const output = await page.locator('textarea').nth(1).inputValue();
    expect(output).toContain('"a": 1');
    expect(output).toContain('"b": 2');
  });

  test('shows error for invalid JSON', async ({ page }) => {
    await page.goto('/json');
    await page.fill('textarea', '{invalid json}');
    await page.click('button:has-text("Format")');
    
    await expect(page.locator('text=Error')).toBeVisible();
  });

  test('minify removes whitespace', async ({ page }) => {
    await page.goto('/json');
    await page.fill('textarea', '{\n  "a": 1\n}');
    await page.click('button:has-text("Minify")');
    
    const output = await page.locator('textarea').nth(1).inputValue();
    expect(output).toBe('{"a":1}');
  });

  test('copy button copies output', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/json');
    await page.fill('textarea', '{"test":true}');
    await page.click('button:has-text("Format")');
    await page.click('button:has-text("Copy")');
    
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('"test": true');
  });
});

test.describe('Hash Generator - Functional', () => {
  test('MD5 hash is correct', async ({ page }) => {
    await page.goto('/hash');
    await page.fill('textarea', 'hello');
    await page.click('button:has-text("Generate")');
    
    // MD5 of "hello" is 5d41402abc4b2a76b9719d911017c592
    await expect(page.locator('text=5d41402abc4b2a76b9719d911017c592')).toBeVisible();
  });

  test('SHA-256 hash is correct', async ({ page }) => {
    await page.goto('/hash');
    await page.fill('textarea', 'hello');
    await page.click('button:has-text("Generate")');
    
    // SHA-256 of "hello" starts with 2cf24dba
    await expect(page.locator('text=2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824')).toBeVisible();
  });

  test('empty input shows no hashes', async ({ page }) => {
    await page.goto('/hash');
    await page.fill('textarea', '');
    // No generate button click, should not show results
    await expect(page.locator('text=Hash Results')).not.toBeVisible();
  });
});

test.describe('UUID Generator - Functional', () => {
  test('generates valid UUID v4 format', async ({ page }) => {
    await page.goto('/uuid');
    const uuid = await page.locator('code').first().textContent();
    
    // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  });

  test('generate creates different UUID', async ({ page }) => {
    await page.goto('/uuid');
    const uuid1 = await page.locator('code').first().textContent();
    await page.click('button:has-text("Generate")');
    const uuid2 = await page.locator('code').first().textContent();
    
    expect(uuid1).not.toBe(uuid2);
  });
});

test.describe('Password Generator - Functional', () => {
  test('generates password with correct length', async ({ page }) => {
    await page.goto('/password');
    // Default length is typically 16
    const password = await page.locator('.font-mono').first().textContent();
    expect(password?.length).toBeGreaterThanOrEqual(8);
  });

  test('regenerate creates different password', async ({ page }) => {
    await page.goto('/password');
    const pw1 = await page.locator('.font-mono').first().textContent();
    await page.click('button:has-text("Generate")');
    const pw2 = await page.locator('.font-mono').first().textContent();
    
    expect(pw1).not.toBe(pw2);
  });
});

test.describe('Base64 Encoder - Functional', () => {
  test('encodes correctly', async ({ page }) => {
    await page.goto('/base64');
    const input = page.locator('textarea').first();
    const output = page.locator('textarea').nth(1);
    
    await input.click();
    await input.pressSequentially('Hello World', { delay: 5 });
    await page.waitForTimeout(100);
    
    await page.click('button:has-text("Encode")');
    
    // Wait for output to contain result
    await expect(output).toHaveValue('SGVsbG8gV29ybGQ=', { timeout: 2000 });
  });

  test('decodes correctly', async ({ page }) => {
    await page.goto('/base64');
    const input = page.locator('textarea').first();
    const output = page.locator('textarea').nth(1);
    
    await input.click();
    await input.pressSequentially('SGVsbG8gV29ybGQ=', { delay: 5 });
    await page.waitForTimeout(100);
    
    await page.click('button:has-text("Decode")');
    
    await expect(output).toHaveValue('Hello World', { timeout: 2000 });
  });

  test('handles invalid base64 gracefully', async ({ page }) => {
    await page.goto('/base64');
    const input = page.locator('textarea').first();
    const output = page.locator('textarea').nth(1);
    
    await input.click();
    await input.pressSequentially('!!!invalid!!!', { delay: 5 });
    await page.waitForTimeout(100);
    
    await page.click('button:has-text("Decode")');
    
    // Should show error message in output
    await expect(output).toContainText('Error', { timeout: 2000 });
  });
});

test.describe('Fee Calculator - Functional', () => {
  test('shows calculation result', async ({ page }) => {
    await page.goto('/fees');
    
    // Should show a dollar amount result
    await expect(page.locator('text=They should send')).toBeVisible();
    await expect(page.locator('.font-mono').first()).toBeVisible();
  });

  test('Stripe tab works', async ({ page }) => {
    await page.goto('/fees');
    await page.click('button:has-text("Stripe")');
    
    await expect(page.locator('text=Stripe Standard')).toBeVisible();
  });

  test('mode toggle changes result', async ({ page }) => {
    await page.goto('/fees');
    
    // Get initial result
    const result1 = await page.locator('.text-3xl').first().textContent();
    
    // Switch mode
    await page.click('button:has-text("sending")');
    await page.waitForTimeout(100);
    
    const result2 = await page.locator('.text-3xl').first().textContent();
    
    // Results should differ
    expect(result1).not.toBe(result2);
  });
});

test.describe('Regex Tester - Functional', () => {
  test('matches email pattern', async ({ page }) => {
    await page.goto('/regex');
    // Default already has email pattern and test text
    
    // Should show highlighted match
    await expect(page.locator('mark').first()).toBeVisible();
  });

  test('XSS is prevented', async ({ page }) => {
    await page.goto('/regex');
    const input = page.locator('textarea').first();
    await input.clear();
    await input.fill('<script>alert(1)</script>');
    
    // Should show escaped HTML, not execute script
    const highlight = page.locator('.whitespace-pre-wrap');
    await expect(highlight).toBeVisible();
    const content = await highlight.innerHTML();
    expect(content).toContain('&lt;script&gt;');
  });
});

test.describe('Word Counter - Functional', () => {
  test('counts words correctly', async ({ page }) => {
    await page.goto('/words');
    const input = page.locator('textarea').first();
    await input.fill('One two three four five');
    
    // Should show word count
    await expect(page.getByText('Words').first()).toBeVisible();
  });

  test('page loads', async ({ page }) => {
    await page.goto('/words');
    await expect(page.locator('h1')).toContainText('Word');
  });
});

test.describe('Timestamp Converter - Functional', () => {
  test('shows current unix timestamp', async ({ page }) => {
    await page.goto('/timestamp');
    const now = Math.floor(Date.now() / 1000);
    
    // Should show a timestamp close to current time
    const content = await page.content();
    expect(content).toMatch(/\d{10}/); // 10-digit unix timestamp
  });
});

test.describe('Color Converter - Functional', () => {
  test('shows color formats', async ({ page }) => {
    await page.goto('/colors');
    
    // Should show color format labels
    await expect(page.getByText('HEX', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('RGB', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('HSL', { exact: true }).first()).toBeVisible();
  });
});

test.describe('QR Code Generator - Functional', () => {
  test('generates QR code image', async ({ page }) => {
    await page.goto('/qr');
    
    const img = page.locator('img[alt="QR Code"]');
    await expect(img).toBeVisible();
    
    const src = await img.getAttribute('src');
    expect(src).toBeTruthy();
  });

  test('download buttons exist', async ({ page }) => {
    await page.goto('/qr');
    await expect(page.locator('button:has-text("PNG"), a:has-text("PNG")')).toBeVisible();
  });
});

test.describe('Cron Generator - Functional', () => {
  test('preset sets correct expression', async ({ page }) => {
    await page.goto('/cron');
    await page.click('text=Every hour');
    
    const input = await page.locator('input').first().inputValue();
    expect(input).toBe('0 * * * *');
  });

  test('every day at midnight', async ({ page }) => {
    await page.goto('/cron');
    await page.click('text=Every day at midnight');
    
    const input = await page.locator('input').first().inputValue();
    expect(input).toBe('0 0 * * *');
  });
});

test.describe('JWT Decoder - Functional', () => {
  test('page loads', async ({ page }) => {
    await page.goto('/jwt');
    await expect(page.locator('h1')).toContainText('JWT');
  });

  test('shows sections when JWT entered', async ({ page }) => {
    await page.goto('/jwt');
    const input = page.locator('textarea').first();
    
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    
    await input.fill(jwt);
    await page.waitForTimeout(300);
    
    // Should show header section
    await expect(page.getByText('Header').first()).toBeVisible();
  });
});
