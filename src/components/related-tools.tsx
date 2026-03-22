"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

type Tool = {
  name: string;
  href: string;
  icon: string;
  category?: string;
  tags?: string[];
  description?: string;
};

const allTools: Tool[] = [
  // ENCODERS
  { name: "Base64", href: "/base64", icon: "🔐", category: "encoders", tags: ["encode", "decode", "base64", "url"], description: "Encode/decode Base64, URL, HTML" },
  { name: "JWT", href: "/jwt", icon: "🔓", category: "encoders", tags: ["jwt", "token", "decode", "auth"], description: "Decode JSON Web Tokens" },
  { name: "URL Parse", href: "/url-parse", icon: "🔗", category: "encoders", tags: ["url", "parse", "query"], description: "Parse URL components" },

  // FORMATTERS
  { name: "JSON", href: "/json", icon: "{}", category: "formatters", tags: ["json", "format", "validate"], description: "Format & validate JSON" },
  { name: "CSS Format", href: "/css-format", icon: "🎨", category: "formatters", tags: ["css", "format", "beautify"], description: "Format CSS code" },
  { name: "HTML Format", href: "/html-format", icon: "📄", category: "formatters", tags: ["html", "format", "beautify"], description: "Format HTML" },
  { name: "XML Format", href: "/xml-format", icon: "📋", category: "formatters", tags: ["xml", "format", "beautify"], description: "Format XML" },
  { name: "SQL Format", href: "/sql-format", icon: "🗄️", category: "formatters", tags: ["sql", "format", "database"], description: "Format SQL queries" },
  { name: "YAML", href: "/yaml", icon: "📝", category: "formatters", tags: ["yaml", "format", "validate", "config"], description: "YAML formatter & validator" },
  { name: "Markdown", href: "/markdown", icon: "✍️", category: "formatters", tags: ["markdown", "preview", "editor"], description: "Live markdown preview" },
  { name: "Code Formatter", href: "/code-formatter", icon: "📝", category: "formatters", tags: ["code", "format", "multi-language"], description: "Multi-language formatter" },

  // GENERATORS
  { name: "UUID", href: "/uuid", icon: "🔑", category: "generators", tags: ["uuid", "guid", "random"], description: "Generate UUIDs" },
  { name: "Password", href: "/password", icon: "🔒", category: "generators", tags: ["password", "secure", "random"], description: "Secure passwords" },
  { name: "HMAC", href: "/hmac", icon: "🔏", category: "generators", tags: ["hmac", "signature", "sha256", "api", "auth"], description: "HMAC signature generator" },
  { name: "Bcrypt", href: "/bcrypt", icon: "🔐", category: "generators", tags: ["bcrypt", "password", "hash", "security"], description: "Bcrypt password hashing" },
  { name: "Lorem", href: "/lorem", icon: "📝", category: "generators", tags: ["lorem", "placeholder", "text"], description: "Placeholder text" },
  { name: "QR Code", href: "/qr", icon: "📱", category: "generators", tags: ["qr", "code", "generate"], description: "Generate QR codes" },
  { name: "Random", href: "/random", icon: "🎲", category: "generators", tags: ["random", "number", "dice"], description: "Random numbers" },
  { name: "Palette", href: "/palette", icon: "🎨", category: "generators", tags: ["color", "palette", "design"], description: "Color palettes" },

  // CONVERTERS
  { name: "CSV→JSON", href: "/csv-json", icon: "📊", category: "converters", tags: ["csv", "json", "convert"], description: "CSV to JSON" },
  { name: "Units", href: "/unit", icon: "📏", category: "converters", tags: ["unit", "length", "weight"], description: "Unit converter" },
  { name: "TOML→JSON", href: "/toml-json", icon: "🔄", category: "converters", tags: ["toml", "json", "config"], description: "TOML to JSON" },
  { name: "HTML→MD", href: "/html-md", icon: "📄", category: "converters", tags: ["html", "markdown", "convert"], description: "HTML to Markdown" },
  { name: "Epoch", href: "/epoch", icon: "🕐", category: "converters", tags: ["epoch", "unix", "time"], description: "Epoch converter" },
  { name: "Currency", href: "/currency", icon: "💸", category: "converters", tags: ["currency", "exchange", "forex"], description: "Currency converter" },

  // TEXT TOOLS
  { name: "Case", href: "/case", icon: "Aa", category: "text", tags: ["case", "camel", "snake"], description: "Case converter" },
  { name: "Slug", href: "/slug", icon: "🔗", category: "text", tags: ["slug", "url", "seo"], description: "URL slugs" },
  { name: "Text Stats", href: "/text-stats", icon: "📈", category: "text", tags: ["stats", "analysis", "readability"], description: "Text analysis" },
  { name: "Sort", href: "/sort", icon: "↕️", category: "text", tags: ["sort", "alphabetical", "order"], description: "Sort lines" },
  { name: "Diff", href: "/diff", icon: "🔍", category: "text", tags: ["diff", "compare", "difference"], description: "Text comparison" },
  { name: "Emoji", href: "/emoji", icon: "😀", category: "text", tags: ["emoji", "copy", "picker"], description: "Emoji picker" },
  { name: "Extract Emails", href: "/extract-emails", icon: "📧", category: "text", tags: ["email", "extract", "find"], description: "Find emails" },
  { name: "Replace", href: "/replace", icon: "🔄", category: "text", tags: ["replace", "find", "regex", "text"], description: "Find and replace" },

  // DESIGN
  { name: "Colors", href: "/colors", icon: "🎨", category: "design", tags: ["color", "hex", "rgb"], description: "Color converter" },
  { name: "Gradient", href: "/gradient", icon: "🌈", category: "design", tags: ["gradient", "css", "color"], description: "CSS gradients" },
  { name: "Gradient+", href: "/gradient-gen", icon: "🌈+", category: "design", tags: ["gradient", "radial", "conic"], description: "Advanced gradients" },
  { name: "Shadow", href: "/shadow", icon: "⬛", category: "design", tags: ["shadow", "css", "box"], description: "Box shadows" },
  { name: "Border", href: "/border", icon: "◻️", category: "design", tags: ["border", "radius", "rounded"], description: "Border radius" },
  { name: "CSS Animate", href: "/css-animate", icon: "✨", category: "design", tags: ["animation", "keyframes", "css"], description: "Keyframe animations" },
  { name: "Clip-path", href: "/clip-path", icon: "✂️", category: "design", tags: ["clip-path", "shape", "polygon"], description: "CSS clip-path" },
  { name: "Filter", href: "/filter-gen", icon: "🔆", category: "design", tags: ["filter", "blur", "brightness"], description: "CSS filters" },
  { name: "Font Pairs", href: "/font-pairs", icon: "🅰️", category: "design", tags: ["font", "typography", "pairing"], description: "Font pairings" },
  { name: "Favicon", href: "/favicon-gen", icon: "🖼️", category: "design", tags: ["favicon", "icon", "generator"], description: "Generate favicons" },
  { name: "Contrast", href: "/contrast", icon: "👁️", category: "design", tags: ["contrast", "accessibility", "wcag"], description: "Contrast checker" },
  { name: "OG Image", href: "/og-gen", icon: "🖼️", category: "design", tags: ["og", "social", "image"], description: "OG images" },
  { name: "Aspect Calc", href: "/aspect-calc", icon: "📐", category: "design", tags: ["aspect", "ratio", "dimensions"], description: "Aspect calculator" },
  { name: "Color Picker", href: "/color-picker", icon: "🎯", category: "design", tags: ["color", "picker", "eyedropper", "hex", "rgb"], description: "Visual color picker" },

  // DEV TOOLS
  { name: "Hash", href: "/hash", icon: "#", category: "devtools", tags: ["hash", "md5", "sha"], description: "Hash generator" },
  { name: "TOTP", href: "/totp", icon: "🔐", category: "security", tags: ["totp", "otp", "2fa", "authenticator", "security"], description: "TOTP code generator" },
  { name: "Regex", href: "/regex", icon: "🔤", category: "devtools", tags: ["regex", "test", "match"], description: "Regex tester" },
  { name: "Docker", href: "/docker", icon: "🐳", category: "devtools", tags: ["docker", "compose", "container"], description: "Docker compose" },
  { name: ".gitignore", href: "/gitignore", icon: "🚫", category: "devtools", tags: ["gitignore", "git", "ignore"], description: "Gitignore files" },
  { name: "Meta Tags Generator", href: "/meta-gen", icon: "🏷️", category: "devtools", tags: ["meta", "seo", "og"], description: "Meta tags" },
  { name: "HTTP Codes", href: "/http-codes", icon: "🌐", category: "devtools", tags: ["http", "status", "codes"], description: "HTTP status codes" },
  { name: "HTML Entities", href: "/html-entities", icon: "&#", category: "devtools", tags: ["html", "entities", "encode"], description: "HTML entities" },
  { name: "Cron", href: "/cron", icon: "📆", category: "devtools", tags: ["cron", "schedule", "parser"], description: "Cron parser" },
  { name: "My IP", href: "/ip", icon: "🌐", category: "devtools", tags: ["ip", "address", "location"], description: "Your IP" },
  { name: "CIDR", href: "/cidr", icon: "🌐", category: "devtools", tags: ["cidr", "subnet", "ip", "network", "calculator"], description: "CIDR subnet calculator" },
  { name: "MIME Types", href: "/mime", icon: "📎", category: "devtools", tags: ["mime", "type", "content", "file"], description: "MIME type lookup" },
  { name: "Pomodoro", href: "/pomodoro", icon: "⏱️", category: "devtools", tags: ["pomodoro", "timer", "focus"], description: "Pomodoro timer" },
  { name: "JSON Path", href: "/json-path", icon: "🌳", category: "devtools", tags: ["json", "path", "explorer"], description: "JSON path finder" },
  { name: "JSON→TS", href: "/json-to-ts", icon: "📘", category: "devtools", tags: ["json", "typescript", "types"], description: "JSON to TypeScript" },
  { name: "JSON Schema", href: "/json-schema", icon: "📐", category: "devtools", tags: ["json", "schema", "validate", "api", "draft-07"], description: "Generate JSON Schema from JSON" },
  { name: "Mock API", href: "/mock-api", icon: "🔌", category: "devtools", tags: ["api", "mock", "json"], description: "Mock API data" },
  { name: "chmod+", href: "/chmod-calc", icon: "🔐", category: "devtools", tags: ["chmod", "permissions", "unix", "symbolic"], description: "Advanced chmod calculator" },
  { name: "SVG Optimize", href: "/svg-optimize", icon: "🖼️", category: "devtools", tags: ["svg", "optimize", "minify", "clean"], description: "Optimize SVG files" },
  { name: "KeyCode", href: "/keycode", icon: "⌨️", category: "devtools", tags: ["keycode", "keyboard", "event", "javascript"], description: "Keyboard event tester" },
  { name: "Encrypt", href: "/encrypt", icon: "🔒", category: "security", tags: ["encrypt", "decrypt", "aes", "cipher"], description: "AES encryption" },
  { name: "Cert Decoder", href: "/cert-decoder", icon: "🔐", category: "security", tags: ["certificate", "ssl", "tls", "x509", "pem", "decode"], description: "SSL/TLS certificate decoder" },
  { name: "cURL Builder", href: "/curl-builder", icon: "📡", category: "devtools", tags: ["curl", "http", "api", "request", "builder", "rest", "headers"], description: "Visual cURL command builder" },
  { name: "Nginx Config", href: "/nginx-gen", icon: "⚙️", category: "devtools", tags: ["nginx", "config", "server", "reverse proxy", "ssl", "web server"], description: "Nginx config generator" },
  { name: "SSH Key Generator", href: "/ssh-keygen", icon: "🔑", category: "devtools", tags: ["ssh", "key", "rsa", "ed25519", "keygen", "crypto", "security"], description: "Generate SSH key pairs in browser" },
  { name: "Webhook Tester", href: "/webhook-tester", icon: "🪝", category: "devtools", tags: ["webhook", "test", "debug", "mock", "github", "stripe", "slack", "discord", "payload", "inspect"], description: "Debug webhooks with sample payloads" },
  { name: "OpenAPI Validator", href: "/openapi-validator", icon: "📋", category: "devtools", tags: ["openapi", "swagger", "api", "validate", "spec", "rest", "schema", "endpoints", "3.0", "3.1"], description: "Validate OpenAPI/Swagger specs" },
  { name: "JS Formatter", href: "/js-format", icon: "📜", category: "formatters", tags: ["javascript", "formatter", "beautifier", "js", "format", "minify", "indent", "es6", "code"], description: "Format & minify JavaScript" },
  { name: "JSON Repair", href: "/json-repair", icon: "🔧", category: "formatters", tags: ["json", "repair", "fix", "broken", "invalid", "fixer", "trailing comma", "unquoted", "comments"], description: "Fix broken JSON automatically" },
  { name: "Barcode Generator", href: "/barcode", icon: "📊", category: "generators", tags: ["barcode", "code128", "code39", "ean", "upc", "scan", "product"], description: "Generate barcodes (Code128, EAN, UPC)" },

  // CALCULATORS
  { name: "Tip", href: "/tip", icon: "💵", category: "calculators", tags: ["tip", "bill", "split"], description: "Tip calculator" },
  { name: "VAT", href: "/vat", icon: "💰", category: "calculators", tags: ["vat", "tax", "calculator"], description: "VAT calculator" },
  { name: "Fees", href: "/fees", icon: "💸", category: "calculators", tags: ["paypal", "stripe", "fees"], description: "Payment fees" },
  { name: "Discount", href: "/discount", icon: "💲", category: "calculators", tags: ["discount", "sale", "savings"], description: "Discount calc" },
  { name: "Loan", href: "/loan", icon: "🏦", category: "calculators", tags: ["loan", "mortgage", "interest"], description: "Loan calculator" },
  { name: "Percent", href: "/percentage", icon: "%", category: "calculators", tags: ["percentage", "percent", "math"], description: "Percentage calc" },


  // TRADING
  { name: "Position Size", href: "/position-size", icon: "🎯", category: "trading", tags: ["position size", "risk", "trading", "forex", "stocks", "lot", "stop loss"], description: "Calculate optimal position size" },
  { name: "Risk/Reward", href: "/risk-reward", icon: "⚖️", category: "trading", tags: ["risk reward", "ratio", "trading", "entry", "stop loss", "take profit"], description: "Risk/reward ratio calculator" },
  { name: "Fibonacci", href: "/fibonacci-trading", icon: "📐", category: "trading", tags: ["fibonacci", "retracement", "extension", "trading", "technical analysis"], description: "Fibonacci retracement levels" },
  { name: "Pivot Points", href: "/pivot-points", icon: "🎯", category: "trading", tags: ["pivot", "support", "resistance", "OHLC", "trading"], description: "Pivot points from OHLC data" },
  { name: "Drawdown", href: "/drawdown-calc", icon: "📉", category: "trading", tags: ["drawdown", "recovery", "trading", "risk", "loss", "portfolio"], description: "Drawdown recovery calculator" },
  { name: "Kelly Criterion", href: "/kelly-criterion", icon: "📊", category: "trading", tags: ["kelly", "criterion", "bet sizing", "trading", "optimal"], description: "Optimal bet sizing formula" },
  { name: "Compound Growth", href: "/compound-growth", icon: "📈", category: "trading", tags: ["compound", "growth", "interest", "projection", "investment"], description: "Compound growth projections" },
  { name: "Pip Value", href: "/pip-value", icon: "💱", category: "trading", tags: ["pip", "forex", "currency", "lot", "trading", "pairs"], description: "Forex pip value calculator" },
  { name: "Margin Calc", href: "/margin-calc", icon: "🏦", category: "trading", tags: ["margin", "leverage", "liquidation", "trading", "futures"], description: "Margin & leverage calculator" },
  { name: "DCA Calculator", href: "/dca-calc", icon: "🔄", category: "trading", tags: ["dca", "dollar cost averaging", "average price", "trading", "crypto"], description: "Dollar-cost averaging calculator" },
];

type RelatedToolsProps = {
  currentPath: string;
  maxVisible?: number;
  showCategory?: boolean;
};

export function RelatedTools({ 
  currentPath, 
  maxVisible = 8,
  showCategory = true 
}: RelatedToolsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Find current tool
  const currentTool = allTools.find(t => t.href === currentPath);
  
  // Smart recommendation algorithm
  const getRelatedTools = () => {
    const otherTools = allTools.filter(t => t.href !== currentPath);
    
    if (!currentTool) {
      // If current tool not found, return random tools
      return otherTools.sort(() => Math.random() - 0.5);
    }
    
    // Score each tool based on relevance
    const scored = otherTools.map(tool => {
      let score = 0;
      
      // Same category: +50 points
      if (tool.category === currentTool.category) {
        score += 50;
      }
      
      // Shared tags: +10 points per tag
      const sharedTags = tool.tags?.filter(tag => 
        currentTool.tags?.includes(tag)
      ) || [];
      score += sharedTags.length * 10;
      
      // Similar name/description keywords: +5 points per match
      const currentKeywords = [
        ...currentTool.name.toLowerCase().split(/\s+/),
        ...(currentTool.description?.toLowerCase().split(/\s+/) || [])
      ];
      const toolKeywords = [
        ...tool.name.toLowerCase().split(/\s+/),
        ...(tool.description?.toLowerCase().split(/\s+/) || [])
      ];
      const sharedKeywords = currentKeywords.filter(kw => 
        toolKeywords.includes(kw) && kw.length > 3
      );
      score += sharedKeywords.length * 5;
      
      // Add some randomness to avoid always showing same tools: +0-10 points
      score += Math.random() * 10;
      
      return { tool, score };
    });
    
    // Sort by score descending
    return scored
      .sort((a, b) => b.score - a.score)
      .map(item => item.tool);
  };
  
  const relatedTools = getRelatedTools();
  const totalPages = Math.ceil(relatedTools.length / maxVisible);
  const visibleTools = relatedTools.slice(
    currentPage * maxVisible,
    (currentPage + 1) * maxVisible
  );
  
  const categoryFilter = currentTool?.category 
    ? `?category=${currentTool.category}` 
    : '';
  
  return (
    <div className="border-t border-border mt-8 pt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <h3 className="text-sm font-medium text-foreground/70">
            {currentTool ? 'Related Tools' : 'More Tools'}
          </h3>
          {currentTool && showCategory && (
            <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
              {currentTool.category}
            </span>
          )}
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="p-1 rounded hover:bg-muted active:bg-muted/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
            <span className="text-xs text-muted-foreground">
              {currentPage + 1} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={currentPage === totalPages - 1}
              className="p-1 rounded hover:bg-muted active:bg-muted/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {visibleTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex items-center gap-2 p-3 bg-card border border-border rounded-lg hover:border-border/80 hover:bg-muted transition-all duration-200 hover:scale-[1.02]"
            title={tool.description}
          >
            <span className="text-lg group-hover:scale-110 transition-transform">
              {tool.icon}
            </span>
            <span className="text-sm text-foreground/90 group-hover:text-foreground font-medium truncate">
              {tool.name}
            </span>
          </Link>
        ))}
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-4">
        <Link 
          href={`/${categoryFilter}`} 
          className="text-sm text-blue-400 hover:text-blue-300 transition flex items-center gap-1"
        >
          <span>← View all {currentTool?.category ? `${currentTool.category} ` : ''}tools</span>
        </Link>
        
        {currentTool?.category && (
          <Link
            href="/"
            className="text-sm text-muted-foreground/70 hover:text-muted-foreground transition"
          >
            Browse all categories
          </Link>
        )}
      </div>

      {/* Show total count */}
      <div className="mt-3 text-center">
        <p className="text-xs text-muted-foreground/70">
          Showing {visibleTools.length} of {relatedTools.length} related tools
        </p>
      </div>
    </div>
  );
}
