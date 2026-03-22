/**
 * Manual tool relationships for enhanced internal linking
 * These supplement the automatic algorithm in RelatedTools component
 */

export const manualRelationships: Record<string, readonly string[]> = {
  // JSON ecosystem
  "/json": ["/json-path", "/json-to-ts"],
  "/json-path": ["/json", "/json-to-ts"],
  "/json-to-ts": ["/json"],

  // Encoding ecosystem
  "/base64": ["/url-parse", "/jwt"],
  "/jwt": ["/base64", "/hash", "/encrypt"],
  "/url-parse": ["/base64", "/slug", "/qr"],

  // Color ecosystem
  "/colors": ["/gradient", "/palette", "/contrast"],
  "/gradient": ["/colors", "/gradient-gen", "/shadow", "/css-animate"],
  "/gradient-gen": ["/gradient", "/colors"],
  "/palette": ["/colors", "/gradient"],
  "/contrast": ["/colors"],

  // CSS ecosystem
  "/shadow": ["/border", "/gradient", "/css-animate"],
  "/border": ["/shadow", "/css-format"],
  "/clip-path": ["/filter-gen"],
  "/filter-gen": ["/clip-path", "/css-animate"],
  "/css-animate": ["/filter-gen", "/gradient", "/shadow"],
  "/css-format": ["/html-format"],

  // Text tools
  "/case": ["/slug", "/replace", "/text-stats"],
  "/slug": ["/case", "/url-parse", "/replace"],

  // Markdown ecosystem
  "/markdown": ["/html-md", "/lorem"],
  "/html-md": ["/markdown", "/html-format"],

  // Hash & Crypto
  "/hash": ["/encrypt", "/jwt", "/password", "/random"],
  "/encrypt": ["/hash", "/jwt", "/base64"],
  "/password": ["/hash", "/random", "/uuid"],

  // Generators
  "/uuid": ["/random", "/password", "/hash"],
  "/random": ["/uuid", "/password"],
  "/lorem": ["/markdown"],
  "/qr": ["/url-parse"],

  // Converters
  "/unit": ["/currency"],
  "/currency": ["/vat", "/fees", "/discount"],

  // HTML/XML
  "/html-format": ["/html-entities", "/html-md", "/xml-format"],
  "/html-entities": ["/html-format", "/url-parse"],
  "/xml-format": ["/html-format", "/sql-format", "/json"],

  // Dev tools
  "/regex": ["/replace", "/extract-emails"],
  "/extract-emails": ["/regex"],
  "/docker": ["/gitignore", "/mock-api"],
  "/gitignore": ["/docker"],
  "/cidr": ["/http-codes", "/url-parse", "/hash"],

  // Meta/SEO
  "/meta-gen": ["/og-gen", "/favicon-gen"],
  "/og-gen": ["/meta-gen", "/favicon-gen"],

  // Calculators
  "/tip": ["/discount", "/vat", "/fees"],
  "/vat": ["/tip", "/fees", "/currency"],
  "/fees": ["/vat", "/discount", "/currency"],
  "/discount": ["/percentage", "/tip", "/vat"],
  "/percentage": ["/discount", "/loan"],
  "/loan": ["/percentage"],

  // Images
  "/favicon-gen": ["/og-gen"],

  // Design systems
  "/font-pairs": ["/text-stats"],

  // Code tools
  "/sql-format": ["/xml-format", "/json", "/code-formatter"],
  "/svg-optimize": ["/favicon-gen"],
  "/code-formatter": ["/css-format", "/html-format", "/sql-format", "/xml-format"],

  // Trading tools ecosystem
  "/position-size": ["/risk-reward", "/kelly-criterion", "/margin-calc", "/pip-value"],
  "/risk-reward": ["/position-size", "/kelly-criterion", "/fibonacci-trading", "/drawdown-calc"],
  "/fibonacci-trading": ["/pivot-points", "/risk-reward", "/position-size"],
  "/pivot-points": ["/fibonacci-trading", "/risk-reward", "/position-size"],
  "/drawdown-calc": ["/compound-growth", "/risk-reward", "/kelly-criterion", "/position-size"],
  "/kelly-criterion": ["/position-size", "/risk-reward", "/drawdown-calc", "/compound-growth"],
  "/compound-growth": ["/drawdown-calc", "/dca-calc", "/kelly-criterion", "/loan"],
  "/pip-value": ["/position-size", "/margin-calc", "/risk-reward", "/currency"],
  "/margin-calc": ["/position-size", "/pip-value", "/risk-reward", "/drawdown-calc"],
  "/dca-calc": ["/compound-growth", "/position-size", "/drawdown-calc"],
};

/**
 * Get manually curated related tools for a path
 * Memoized to avoid array creation on repeated calls
 */
const relatedToolsCache = new Map<string, readonly string[]>();

export function getManualRelatedTools(currentPath: string): readonly string[] {
  const cached = relatedToolsCache.get(currentPath);
  if (cached) return cached;

  const result = manualRelationships[currentPath] || [];
  relatedToolsCache.set(currentPath, result);
  return result;
}

/**
 * Check if two tools are manually related
 */
export function areToolsRelated(path1: string, path2: string): boolean {
  const related1 = manualRelationships[path1] || [];
  const related2 = manualRelationships[path2] || [];
  return related1.includes(path2) || related2.includes(path1);
}
