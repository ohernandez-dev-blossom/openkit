import { test, expect } from '@playwright/test';
import { TestUtils, TOOL_CATEGORIES } from './helpers/test-utils';

/**
 * Category Coverage Test Suite
 * Ensures all tool categories have basic functionality working
 */

test.describe('Encoders Category', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('URL Encoder - should encode and decode', async ({ page }) => {
    await utils.navigateToTool('url-encode');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    
    const input = await utils.getPrimaryInput();
    await utils.fillInputSlowly(input, 'hello world');
    
    await utils.clickPrimaryAction('Encode');
    
    const output = await utils.getOutput();
    await expect(output).toHaveValue('hello%20world');
  });

  test('HTML Entities - should encode entities', async ({ page }) => {
    await utils.navigateToTool('html-entities');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    
    const input = await utils.getPrimaryInput();
    await utils.fillInputSlowly(input, '<div>Hello</div>');
    
    await utils.clickPrimaryAction();
    await page.waitForTimeout(300);
    
    const output = await utils.getOutput();
    const value = await output.inputValue();
    expect(value).toContain('&lt;');
    expect(value).toContain('&gt;');
  });

  test('Binary Converter - loads correctly', async ({ page }) => {
    await utils.navigateToTool('binary');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Hex Converter - loads correctly', async ({ page }) => {
    await utils.navigateToTool('hex');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });
});

test.describe('Formatters Category', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('XML Formatter - loads correctly', async ({ page }) => {
    await utils.navigateToTool('xml-format');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('CSS Formatter - loads correctly', async ({ page }) => {
    await utils.navigateToTool('css-format');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('HTML Formatter - loads correctly', async ({ page }) => {
    await utils.navigateToTool('html-format');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('YAML Formatter - loads correctly', async ({ page }) => {
    await utils.navigateToTool('yaml');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('CSS Minifier - loads correctly', async ({ page }) => {
    await utils.navigateToTool('css-minify');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('SQL Formatter - loads correctly', async ({ page }) => {
    await utils.navigateToTool('sql-format');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });
});

test.describe('Generators Category', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('Lorem Ipsum - generates text', async ({ page }) => {
    await utils.navigateToTool('lorem');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    
    // Should have generated text
    const output = page.locator('textarea, .font-mono').first();
    const text = await output.textContent();
    expect(text).toBeTruthy();
    expect(text!.length).toBeGreaterThan(50);
  });

  test('Gradient Generator - loads correctly', async ({ page }) => {
    await utils.navigateToTool('gradient');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Placeholder Image - loads correctly', async ({ page }) => {
    await utils.navigateToTool('placeholder');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Fake Data Generator - loads correctly', async ({ page }) => {
    await utils.navigateToTool('fake-data');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Avatar Generator - loads correctly', async ({ page }) => {
    await utils.navigateToTool('avatar');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Random Data Generator - loads correctly', async ({ page }) => {
    await utils.navigateToTool('random-data');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });
});

test.describe('Converters Category', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('Unit Converter - loads correctly', async ({ page }) => {
    await utils.navigateToTool('units');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Currency Converter - loads correctly', async ({ page }) => {
    await utils.navigateToTool('currency');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Bytes Converter - loads correctly', async ({ page }) => {
    await utils.navigateToTool('bytes');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Case Converter - loads correctly', async ({ page }) => {
    await utils.navigateToTool('case');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Temperature Converter - loads correctly', async ({ page }) => {
    await utils.navigateToTool('temp');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Timezone Converter - loads correctly', async ({ page }) => {
    await utils.navigateToTool('timezone');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Number Base Converter - loads correctly', async ({ page }) => {
    await utils.navigateToTool('number-base');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Roman Numeral Converter - loads correctly', async ({ page }) => {
    await utils.navigateToTool('roman');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('CSV to JSON - loads correctly', async ({ page }) => {
    await utils.navigateToTool('csv-json');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });
});

test.describe('Text Tools Category', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('Word Counter - counts words', async ({ page }) => {
    await utils.navigateToTool('words');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    
    const input = await utils.getPrimaryInput();
    await utils.fillInputSlowly(input, 'One two three four five');
    
    // Should show word count
    await expect(page.locator('text=/5.*word/i')).toBeVisible();
  });

  test('Text Diff - loads correctly', async ({ page }) => {
    await utils.navigateToTool('diff');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Find and Replace - loads correctly', async ({ page }) => {
    await utils.navigateToTool('find-replace');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Text Sort - loads correctly', async ({ page }) => {
    await utils.navigateToTool('text-sort');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Duplicate Line Remover - loads correctly', async ({ page }) => {
    await utils.navigateToTool('duplicate');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Text Reverser - loads correctly', async ({ page }) => {
    await utils.navigateToTool('reverse');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });
});

test.describe('Design Tools Category', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('Box Shadow Generator - loads correctly', async ({ page }) => {
    await utils.navigateToTool('shadow');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Border Radius Generator - loads correctly', async ({ page }) => {
    await utils.navigateToTool('border');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Color Palette Generator - loads correctly', async ({ page }) => {
    await utils.navigateToTool('palette');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Contrast Checker - loads correctly', async ({ page }) => {
    await utils.navigateToTool('contrast');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Colorblind Simulator - loads correctly', async ({ page }) => {
    await utils.navigateToTool('colorblind');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });
});

test.describe('CSS Tools Category', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('CSS Animation - loads correctly', async ({ page }) => {
    await utils.navigateToTool('css-animate');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Clip Path Generator - loads correctly', async ({ page }) => {
    await utils.navigateToTool('clip-path');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('CSS Transform - loads correctly', async ({ page }) => {
    await utils.navigateToTool('transform');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Flexbox Generator - loads correctly', async ({ page }) => {
    await utils.navigateToTool('flexbox');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Grid Generator - loads correctly', async ({ page }) => {
    await utils.navigateToTool('grid');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Breakpoints - loads correctly', async ({ page }) => {
    await utils.navigateToTool('breakpoints');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('CSS Units - loads correctly', async ({ page }) => {
    await utils.navigateToTool('css-units');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Design Tokens - loads correctly', async ({ page }) => {
    await utils.navigateToTool('design-tokens');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });
});

test.describe('Dev Utilities Category', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('API Response Formatter - loads correctly', async ({ page }) => {
    await utils.navigateToTool('api-formatter');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Cron Expression - loads correctly', async ({ page }) => {
    await utils.navigateToTool('cron');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('IP Lookup - loads correctly', async ({ page }) => {
    await utils.navigateToTool('ip');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('ASCII Table - loads correctly', async ({ page }) => {
    await utils.navigateToTool('ascii');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('chmod Calculator - loads correctly', async ({ page }) => {
    await utils.navigateToTool('chmod');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Docker Commands - loads correctly', async ({ page }) => {
    await utils.navigateToTool('docker');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('ENV Parser - loads correctly', async ({ page }) => {
    await utils.navigateToTool('env-parser');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });
});

test.describe('Code Tools Category', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('Code Minifier - loads correctly', async ({ page }) => {
    await utils.navigateToTool('minify');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Code Beautifier - loads correctly', async ({ page }) => {
    await utils.navigateToTool('beautify');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('String Escape - loads correctly', async ({ page }) => {
    await utils.navigateToTool('escape');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Comment Remover - loads correctly', async ({ page }) => {
    await utils.navigateToTool('comment');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Directory Tree - loads correctly', async ({ page }) => {
    await utils.navigateToTool('tree');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });
});

test.describe('Finance Tools Category', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('Fee Calculator - shows calculation', async ({ page }) => {
    await utils.navigateToTool('fees');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    
    await expect(page.locator('text=They should send')).toBeVisible();
  });

  test('Discount Calculator - loads correctly', async ({ page }) => {
    await utils.navigateToTool('discount');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Tip Calculator - loads correctly', async ({ page }) => {
    await utils.navigateToTool('tip');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Compound Interest - loads correctly', async ({ page }) => {
    await utils.navigateToTool('compound');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('VAT Calculator - loads correctly', async ({ page }) => {
    await utils.navigateToTool('vat');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });
});

test.describe('Data & API Tools Category', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('Webhook Tester - loads correctly', async ({ page }) => {
    await utils.navigateToTool('webhook');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Data URL Converter - loads correctly', async ({ page }) => {
    await utils.navigateToTool('data-url');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });
});

test.describe('Security Tools Category', () => {
  let utils: TestUtils;

  test.beforeEach(async ({ page }) => {
    utils = new TestUtils(page);
  });

  test('Hash Generator - tested in critical paths', async ({ page }) => {
    await utils.navigateToTool('hash');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Password Generator - tested in critical paths', async ({ page }) => {
    await utils.navigateToTool('password');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });
});
