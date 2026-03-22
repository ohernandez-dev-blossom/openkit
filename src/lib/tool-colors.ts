/**
 * Centralized color system for tool categories
 * Ensures consistent icon colors across homepage, sidebar, and individual tool pages
 */

export const categoryColors = {
  encoders: "from-blue-500 to-blue-600",         // Blue - Encode/decode
  formatters: "from-green-500 to-green-600",     // Green - Format code
  generators: "from-purple-500 to-purple-600",   // Purple - Generate data
  converters: "from-orange-500 to-orange-600",   // Orange - Convert formats
  text: "from-cyan-500 to-cyan-600",             // Cyan - Text manipulation
  design: "from-pink-500 to-pink-600",           // Pink - Design tools
  css: "from-fuchsia-500 to-fuchsia-600",        // Fuchsia - CSS tools
  devtools: "from-yellow-500 to-yellow-600",     // Yellow - Dev utilities
  code: "from-indigo-500 to-indigo-600",         // Indigo - Code generation
  security: "from-red-500 to-red-600",           // Red - Security tools
  finance: "from-emerald-500 to-emerald-600",    // Emerald - Finance calculators
  data: "from-violet-500 to-violet-600",         // Violet - Data & API
} as const;

/**
 * Map of tool paths to their category colors
 * This ensures each tool uses the correct category color
 */
export const toolColors: Record<string, string> = {
  // ENCODERS (Blue)
  "/base64": categoryColors.encoders,
  "/url": categoryColors.encoders,
  "/jwt": categoryColors.encoders,
  "/ascii": categoryColors.encoders,
  "/morse": categoryColors.encoders,
  "/encrypt": categoryColors.encoders,
  "/url-parse": categoryColors.encoders,

  // FORMATTERS (Green)
  "/json": categoryColors.formatters,
  "/xml-format": categoryColors.formatters,
  "/html-format": categoryColors.formatters,
  "/css-format": categoryColors.formatters,
  "/sql-format": categoryColors.formatters,
  "/css-minify": categoryColors.formatters,
  "/js-minify": categoryColors.formatters,
  "/html-entities": categoryColors.formatters,
  "/markdown": categoryColors.formatters,

  // GENERATORS (Purple)
  "/uuid": categoryColors.generators,
  "/hash": categoryColors.security, // Actually security
  "/lorem": categoryColors.generators,
  "/lorem-adv": categoryColors.generators,
  "/random": categoryColors.generators,
  "/qr": categoryColors.generators,
  "/password": categoryColors.security, // Actually security
  "/gitignore": categoryColors.generators,
  "/htaccess": categoryColors.generators,

  // CONVERTERS (Orange)
  "/timestamp": categoryColors.converters,
  "/epoch": categoryColors.converters,
  "/json-csv": categoryColors.converters,
  "/csv-json": categoryColors.converters,
  "/json-yaml": categoryColors.converters,
  "/json-to-ts": categoryColors.converters,
  "/sql-to-mongodb": categoryColors.converters,
  "/number": categoryColors.converters,
  "/roman": categoryColors.converters,
  "/temp": categoryColors.converters,
  "/unit": categoryColors.converters,
  "/bytes": categoryColors.converters,
  "/currency": categoryColors.converters,
  "/timezone": categoryColors.converters,
  "/text-binary": categoryColors.converters,
  "/toml-json": categoryColors.converters,
  "/aspect": categoryColors.converters,
  "/aspect-calc": categoryColors.converters,
  "/md-html": categoryColors.converters,
  "/html-md": categoryColors.converters,
  "/svg-to-jsx": categoryColors.converters,

  // TEXT TOOLS (Cyan)
  "/case": categoryColors.text,
  "/sort": categoryColors.text,
  "/reverse": categoryColors.text,
  "/duplicate": categoryColors.text,
  "/slug": categoryColors.text,
  "/nato": categoryColors.text,
  "/lines": categoryColors.text,
  "/spacing-scale": categoryColors.text,
  "/extract-urls": categoryColors.text,
  "/extract-emails": categoryColors.text,
  "/line-numbers": categoryColors.text,
  "/replace": categoryColors.text,
  "/word-counter": categoryColors.text,
  "/diff": categoryColors.text,
  "/char-count": categoryColors.text,
  "/compare": categoryColors.text,
  "/text-stats": categoryColors.text,
  "/words": categoryColors.text,

  // DESIGN (Pink)
  "/color-picker": categoryColors.design,
  "/colors": categoryColors.design,
  "/palette": categoryColors.design,
  "/gradient-gen": categoryColors.design,
  "/palette-extract": categoryColors.design,
  "/design-tokens": categoryColors.design,
  "/colorblind": categoryColors.design,
  "/data-url": categoryColors.design,
  "/img-base64": categoryColors.design,
  "/favicon-gen": categoryColors.design,
  "/placeholder": categoryColors.design,
  "/filter-gen": categoryColors.design,
  "/svg-optimize": categoryColors.design,
  "/emoji": categoryColors.design,
  // emoji-search: merged into /emoji (Bug #192)
  "/contrast": categoryColors.design,

  // CSS TOOLS (Fuchsia)
  "/css-gradient": categoryColors.css,
  "/border": categoryColors.css,
  "/shadow": categoryColors.css,
  "/shadow-designer": categoryColors.css,
  "/gradient": categoryColors.css,
  "/radius-gen": categoryColors.css,
  "/grid-gen": categoryColors.css,
  "/breakpoints": categoryColors.css,
  "/css-animate": categoryColors.css,
  "/tw-sort": categoryColors.css,
  "/clip-path": categoryColors.css,

  // DEV UTILITIES (Yellow)
  "/api-formatter": categoryColors.devtools,
  "/http-codes": categoryColors.devtools,
  "/ip": categoryColors.devtools,
  "/docker": categoryColors.devtools,
  "/cron": categoryColors.devtools,
  "/cron-gen": categoryColors.devtools,
  "/chmod": categoryColors.devtools,
  "/pomodoro": categoryColors.devtools,
  "/calculator": categoryColors.devtools,

  // CODE TOOLS (Indigo)
  "/json-path": categoryColors.code,
  "/regex": categoryColors.code,
  "/diff-checker": categoryColors.code,
  "/minify": categoryColors.code,
  "/beautify": categoryColors.code,
  "/code-share": categoryColors.code,
  "/font-pairs": categoryColors.code,

  // DATA & API (Violet)
  "/mock-api": categoryColors.data,
  "/graphql": categoryColors.data,
  "/webhook": categoryColors.data,

  // FINANCE (Emerald)
  "/discount": categoryColors.finance,
  "/percentage": categoryColors.finance,
  "/tip": categoryColors.finance,
  "/loan": categoryColors.finance,
  "/vat": categoryColors.finance,
  "/fees": categoryColors.finance,
  "/cc-gen": categoryColors.finance,
  "/iban-gen": categoryColors.finance,

  // META/SEO
  // /meta: merged into /meta-gen (Bug #193)
  "/meta-gen": categoryColors.code,
  "/og-gen": categoryColors.code,
  "/privacy-gen": categoryColors.code,
  "/markdown-table": categoryColors.formatters,
  "/md-table": categoryColors.formatters,
};

/**
 * Get the color gradient for a tool based on its path
 * Falls back to a neutral gray if no match is found
 */
export function getToolColor(path: string): string {
  return toolColors[path] || "from-zinc-500 to-zinc-600";
}
