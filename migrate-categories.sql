-- QuickTools Category Migration Script
-- Feature #43: Expand Tool Categories
-- Migrates tools from old 8-category system to new 12-category system

BEGIN TRANSACTION;

-- Update tools to SECURITY category
UPDATE tools_catalog SET category = 'security' WHERE slug = 'hash' AND category = 'developer';
UPDATE tools_catalog SET category = 'security' WHERE slug = 'encrypt' AND category = 'text';
UPDATE tools_catalog SET category = 'security' WHERE slug = 'password' AND category = 'generators';
UPDATE tools_catalog SET category = 'security' WHERE slug = 'jwt' AND category = 'developer';

-- Update tools to CSS category
UPDATE tools_catalog SET category = 'css' WHERE slug IN (
    'css-animate',
    'clip-path',
    'filter-gen',
    'grid-gen',
    'gradient',
    'shadow',
    'border',
    'radius-gen',
    'tw-sort'
);

-- Update tools to CODE category
UPDATE tools_catalog SET category = 'code' WHERE slug IN (
    'json-to-ts',
    'svg-to-jsx',
    'meta-gen',
    'meta',
    'gitignore',
    'htaccess',
    'docker',
    'md-table'
);

-- Update tools to DATA category
UPDATE tools_catalog SET category = 'data' WHERE slug IN (
    'json-path',
    'mock-api',
    'html-entities',
    'data-url'
);

-- Update tools to FINANCE category (rename from calculators)
UPDATE tools_catalog SET category = 'finance' WHERE category = 'finance' OR slug IN (
    'tip',
    'vat',
    'fees',
    'discount',
    'loan',
    'percentage',
    'currency'
);

-- Update remaining DEVELOPER tools to proper categories
UPDATE tools_catalog SET category = 'formatters' WHERE slug IN (
    'json',
    'css-format',
    'css-minify',
    'html-format',
    'xml-format',
    'sql-format',
    'js-minify'
) AND category = 'developer';

UPDATE tools_catalog SET category = 'devtools' WHERE slug IN (
    'regex',
    'cron',
    'cron-gen',
    'chmod',
    'http-codes',
    'ip',
    'pomodoro',
    'breakpoints',
    'svg-optimize'
) AND category = 'developer';

UPDATE tools_catalog SET category = 'generators' WHERE slug IN (
    'hash',
    'uuid',
    'qr',
    'random',
    'cc-gen',
    'iban-gen',
    'palette'
) AND category = 'developer';

UPDATE tools_catalog SET category = 'design' WHERE slug IN (
    'gradient-gen',
    'shadow-designer',
    'favicon-gen',
    'og-gen',
    'placeholder',
    'contrast',
    'palette-extract',
    'design-tokens',
    'spacing-scale',
    'font-pairs',
    'aspect-calc'
);

-- Log activity
INSERT INTO activity_log (ticket_id, action, details, agent)
SELECT 43, 'category_migration', 'Migrated ' || COUNT(*) || ' tools to new category system', 'TARS'
FROM tools_catalog;

COMMIT;

-- Verification query
SELECT category, COUNT(*) as tool_count 
FROM tools_catalog 
GROUP BY category 
ORDER BY category;
