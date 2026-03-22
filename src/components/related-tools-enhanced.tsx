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
  { name: "Morse", href: "/morse", icon: "•-•", category: "encoders", tags: ["morse", "code", "audio"], description: "Morse code converter" },
  { name: "NATO", href: "/nato", icon: "📻", category: "encoders", tags: ["nato", "phonetic", "alphabet"], description: "NATO phonetic alphabet" },
  { name: "Data URL", href: "/data-url", icon: "🔄", category: "encoders", tags: ["data", "url", "base64", "file"], description: "Files to data URLs" },
  
  // FORMATTERS
  { name: "JSON", href: "/json", icon: "{}", category: "formatters", tags: ["json", "format", "validate"], description: "Format & validate JSON" },
  { name: "CSS Format", href: "/css-format", icon: "🎨", category: "formatters", tags: ["css", "format", "beautify"], description: "Format CSS code" },
  { name: "CSS Minify", href: "/css-minify", icon: "📦", category: "formatters", tags: ["css", "minify", "compress"], description: "Minify CSS" },
  { name: "HTML Format", href: "/html-format", icon: "📄", category: "formatters", tags: ["html", "format", "beautify"], description: "Format HTML" },
  { name: "XML Format", href: "/xml-format", icon: "📋", category: "formatters", tags: ["xml", "format", "beautify"], description: "Format XML" },
  { name: "SQL Format", href: "/sql-format", icon: "🗄️", category: "formatters", tags: ["sql", "format", "database"], description: "Format SQL queries" },
  { name: "JS Minify", href: "/js-minify", icon: "⚡", category: "formatters", tags: ["javascript", "minify", "compress"], description: "Minify JavaScript" },
  { name: "Markdown", href: "/markdown", icon: "✍️", category: "formatters", tags: ["markdown", "preview", "editor"], description: "Live markdown preview" },
  
  // GENERATORS
  { name: "UUID", href: "/uuid", icon: "🔑", category: "generators", tags: ["uuid", "guid", "random"], description: "Generate UUIDs" },
  { name: "Password", href: "/password", icon: "🔒", category: "generators", tags: ["password", "secure", "random"], description: "Secure passwords" },
  { name: "Lorem", href: "/lorem", icon: "📝", category: "generators", tags: ["lorem", "placeholder", "text"], description: "Placeholder text" },
  { name: "Lorem+", href: "/lorem-adv", icon: "📝+", category: "generators", tags: ["lorem", "hipster", "tech"], description: "Multi-flavor lorem" },
  { name: "QR Code", href: "/qr", icon: "📱", category: "generators", tags: ["qr", "code", "generate"], description: "Generate QR codes" },
  { name: "Random", href: "/random", icon: "🎲", category: "generators", tags: ["random", "number", "dice"], description: "Random numbers" },
  { name: "Credit Card", href: "/cc-gen", icon: "💳", category: "generators", tags: ["credit", "card", "test"], description: "Test card numbers" },
  { name: "IBAN", href: "/iban-gen", icon: "🏦", category: "generators", tags: ["iban", "bank", "validator"], description: "Generate IBANs" },
  { name: "Palette", href: "/palette", icon: "🎨", category: "generators", tags: ["color", "palette", "design"], description: "Color palettes" },
  
  // CONVERTERS
  { name: "CSV→JSON", href: "/csv-json", icon: "📊", category: "converters", tags: ["csv", "json", "convert"], description: "CSV to JSON" },
  { name: "JSON→CSV", href: "/json-csv", icon: "📈", category: "converters", tags: ["json", "csv", "convert"], description: "JSON to CSV" },
  { name: "Units", href: "/unit", icon: "📏", category: "converters", tags: ["unit", "length", "weight"], description: "Unit converter" },
  { name: "Temp", href: "/temp", icon: "🌡️", category: "converters", tags: ["temperature", "celsius", "fahrenheit"], description: "Temperature converter" },
  { name: "TOML→JSON", href: "/toml-json", icon: "🔄", category: "converters", tags: ["toml", "json", "config"], description: "TOML to JSON" },
  { name: "JSON↔YAML", href: "/json-yaml", icon: "⇆", category: "converters", tags: ["json", "yaml", "convert"], description: "JSON & YAML" },
  { name: "MD→HTML", href: "/md-html", icon: "📝", category: "converters", tags: ["markdown", "html", "convert"], description: "Markdown to HTML" },
  { name: "HTML→MD", href: "/html-md", icon: "📄", category: "converters", tags: ["html", "markdown", "convert"], description: "HTML to Markdown" },
  { name: "Number Base", href: "/number", icon: "#", category: "converters", tags: ["binary", "hex", "decimal"], description: "Base converter" },
  { name: "Timestamp", href: "/timestamp", icon: "⏰", category: "converters", tags: ["timestamp", "unix", "date"], description: "Unix timestamp" },
  { name: "Epoch", href: "/epoch", icon: "🕐", category: "converters", tags: ["epoch", "unix", "time"], description: "Epoch converter" },
  { name: "Timezone", href: "/timezone", icon: "🌐", category: "converters", tags: ["timezone", "utc", "world"], description: "Timezone converter" },
  { name: "Currency", href: "/currency", icon: "💸", category: "converters", tags: ["currency", "exchange", "forex"], description: "Currency converter" },
  { name: "Image→Base64", href: "/img-base64", icon: "🖼️", category: "converters", tags: ["image", "base64", "encode"], description: "Image to Base64" },
  { name: "ASCII", href: "/ascii", icon: "01", category: "converters", tags: ["ascii", "text", "binary"], description: "ASCII converter" },
  { name: "Roman", href: "/roman", icon: "IV", category: "converters", tags: ["roman", "numeral", "number"], description: "Roman numerals" },
  { name: "Aspect", href: "/aspect", icon: "📐", category: "converters", tags: ["aspect", "ratio", "resolution"], description: "Aspect ratio" },
  { name: "Text→Binary", href: "/text-binary", icon: "10", category: "converters", tags: ["binary", "text", "bits"], description: "Text to binary" },
  { name: "Data Size", href: "/bytes", icon: "💾", category: "converters", tags: ["bytes", "storage", "convert"], description: "Data size converter" },
  
  // TEXT TOOLS
  { name: "Case", href: "/case", icon: "Aa", category: "text", tags: ["case", "camel", "snake"], description: "Case converter" },
  { name: "Slug", href: "/slug", icon: "🔗", category: "text", tags: ["slug", "url", "seo"], description: "URL slugs" },
  { name: "Lines", href: "/lines", icon: "📄", category: "text", tags: ["lines", "count", "stats"], description: "Line counter" },
  { name: "Words", href: "/words", icon: "📊", category: "text", tags: ["word", "count", "characters"], description: "Word counter" },
  { name: "Text Stats", href: "/text-stats", icon: "📈", category: "text", tags: ["stats", "analysis", "readability"], description: "Text analysis" },
  { name: "Sort", href: "/sort", icon: "↕️", category: "text", tags: ["sort", "alphabetical", "order"], description: "Sort lines" },
  { name: "Diff", href: "/diff", icon: "🔍", category: "text", tags: ["diff", "compare", "difference"], description: "Text comparison" },
  { name: "Compare", href: "/compare", icon: "⚖️", category: "text", tags: ["compare", "side-by-side", "tools"], description: "Tool comparison" },
  { name: "Dupe", href: "/duplicate", icon: "📋", category: "text", tags: ["duplicate", "remove", "unique"], description: "Remove duplicates" },
  { name: "Reverse", href: "/reverse", icon: "↩️", category: "text", tags: ["reverse", "text", "flip"], description: "Reverse text" },
  { name: "Emoji", href: "/emoji", icon: "😀", category: "text", tags: ["emoji", "copy", "picker"], description: "Emoji picker" },
  { name: "Emoji Picker & Search", href: "/emoji", icon: "🔎", category: "text", tags: ["emoji", "search", "picker", "unicode"], description: "Browse & search emojis" },
  { name: "Extract Emails", href: "/extract-emails", icon: "📧", category: "text", tags: ["email", "extract", "find"], description: "Find emails" },
  { name: "Extract URLs", href: "/extract-urls", icon: "🔗", category: "text", tags: ["url", "link", "extract"], description: "Find URLs" },
  { name: "Line Numbers", href: "/line-numbers", icon: "#️⃣", category: "text", tags: ["line", "numbers", "code"], description: "Add line numbers" },
  
  // DESIGN
  { name: "Colors", href: "/colors", icon: "🎨", category: "design", tags: ["color", "hex", "rgb"], description: "Color converter" },
  { name: "Gradient", href: "/gradient", icon: "🌈", category: "design", tags: ["gradient", "css", "color"], description: "CSS gradients" },
  { name: "Gradient+", href: "/gradient-gen", icon: "🌈+", category: "design", tags: ["gradient", "radial", "conic"], description: "Advanced gradients" },
  { name: "Shadow", href: "/shadow", icon: "⬛", category: "design", tags: ["shadow", "css", "box"], description: "Box shadows" },
  { name: "Shadow+", href: "/shadow-designer", icon: "⬛+", category: "design", tags: ["shadow", "layers", "preset"], description: "Multi-layer shadows" },
  { name: "Palette Extract", href: "/palette-extract", icon: "🖼️", category: "design", tags: ["palette", "color", "image"], description: "Extract from images" },
  { name: "Border", href: "/border", icon: "◻️", category: "design", tags: ["border", "radius", "rounded"], description: "Border radius" },
  { name: "Radius+", href: "/radius-gen", icon: "◻️+", category: "design", tags: ["border", "radius", "blob"], description: "Advanced radius" },
  { name: "CSS Animate", href: "/css-animate", icon: "✨", category: "design", tags: ["animation", "keyframes", "css"], description: "Keyframe animations" },
  { name: "Clip-path", href: "/clip-path", icon: "✂️", category: "design", tags: ["clip-path", "shape", "polygon"], description: "CSS clip-path" },
  { name: "Filter", href: "/filter-gen", icon: "🔆", category: "design", tags: ["filter", "blur", "brightness"], description: "CSS filters" },
  { name: "Font Pairs", href: "/font-pairs", icon: "🅰️", category: "design", tags: ["font", "typography", "pairing"], description: "Font pairings" },
  { name: "Design Tokens", href: "/design-tokens", icon: "🎨", category: "design", tags: ["tokens", "figma", "css"], description: "Design tokens" },
  { name: "Spacing", href: "/spacing-scale", icon: "📏", category: "design", tags: ["spacing", "scale", "tokens"], description: "Spacing scales" },
  { name: "Favicon", href: "/favicon-gen", icon: "🖼️", category: "design", tags: ["favicon", "icon", "generator"], description: "Generate favicons" },
  { name: "Placeholder", href: "/placeholder", icon: "🖼️", category: "design", tags: ["placeholder", "image", "mockup"], description: "Placeholder images" },
  { name: "Grid", href: "/grid-gen", icon: "⊞", category: "design", tags: ["grid", "css", "layout"], description: "CSS Grid builder" },
  { name: "Contrast", href: "/contrast", icon: "👁️", category: "design", tags: ["contrast", "accessibility", "wcag"], description: "Contrast checker" },
  { name: "OG Image", href: "/og-gen", icon: "🖼️", category: "design", tags: ["og", "social", "image"], description: "OG images" },
  { name: "Aspect Calc", href: "/aspect-calc", icon: "📐", category: "design", tags: ["aspect", "ratio", "dimensions"], description: "Aspect calculator" },
  
  // DEV TOOLS
  { name: "Hash", href: "/hash", icon: "#", category: "devtools", tags: ["hash", "md5", "sha"], description: "Hash generator" },
  { name: "Regex", href: "/regex", icon: "🔤", category: "devtools", tags: ["regex", "test", "match"], description: "Regex tester" },
  { name: "Docker", href: "/docker", icon: "🐳", category: "devtools", tags: ["docker", "compose", "container"], description: "Docker compose" },
  { name: ".gitignore", href: "/gitignore", icon: "🚫", category: "devtools", tags: ["gitignore", "git", "ignore"], description: "Gitignore files" },
  { name: ".htaccess", href: "/htaccess", icon: "⚙️", category: "devtools", tags: ["htaccess", "apache", "redirect"], description: "Htaccess files" },
  { name: "Meta Tags Generator", href: "/meta-gen", icon: "🏷️", category: "devtools", tags: ["meta", "seo", "og"], description: "Meta tags" },
  { name: "Meta+", href: "/meta-gen", icon: "🏷️+", category: "devtools", tags: ["meta", "seo", "preview"], description: "Advanced meta tags" },
  { name: "HTTP Codes", href: "/http-codes", icon: "🌐", category: "devtools", tags: ["http", "status", "codes"], description: "HTTP status codes" },
  { name: "HTML Entities", href: "/html-entities", icon: "&#", category: "devtools", tags: ["html", "entities", "encode"], description: "HTML entities" },
  { name: "Cron", href: "/cron", icon: "📆", category: "devtools", tags: ["cron", "schedule", "parser"], description: "Cron parser" },
  { name: "Cron+", href: "/cron-gen", icon: "📆+", category: "devtools", tags: ["cron", "generator", "visual"], description: "Cron generator" },
  { name: "My IP", href: "/ip", icon: "🌐", category: "devtools", tags: ["ip", "address", "location"], description: "Your IP" },
  { name: "Pomodoro", href: "/pomodoro", icon: "⏱️", category: "devtools", tags: ["pomodoro", "timer", "focus"], description: "Pomodoro timer" },
  { name: "Breakpoints", href: "/breakpoints", icon: "📱", category: "devtools", tags: ["breakpoint", "responsive", "mobile"], description: "Breakpoint tester" },
  { name: "TW Sort", href: "/tw-sort", icon: "🎨", category: "devtools", tags: ["tailwind", "sort", "classes"], description: "Tailwind sorter" },
  { name: "JSON Path", href: "/json-path", icon: "🌳", category: "devtools", tags: ["json", "path", "explorer"], description: "JSON path finder" },
  { name: "MD Table", href: "/md-table", icon: "📊", category: "devtools", tags: ["markdown", "table", "generator"], description: "Markdown tables" },
  { name: "chmod", href: "/chmod", icon: "🔐", category: "devtools", tags: ["chmod", "permissions", "unix"], description: "chmod calculator" },
  { name: "JSON→TS", href: "/json-to-ts", icon: "📘", category: "devtools", tags: ["json", "typescript", "types"], description: "JSON to TypeScript" },
  { name: "SVG→JSX", href: "/svg-to-jsx", icon: "⚛️", category: "devtools", tags: ["svg", "jsx", "react"], description: "SVG to JSX" },
  { name: "Mock API", href: "/mock-api", icon: "🔌", category: "devtools", tags: ["api", "mock", "json"], description: "Mock API data" },
  { name: "API Format", href: "/api-formatter", icon: "🔧", category: "devtools", tags: ["api", "formatter", "json"], description: "API formatter" },
  
  // CALCULATORS
  { name: "Tip", href: "/tip", icon: "💵", category: "calculators", tags: ["tip", "bill", "split"], description: "Tip calculator" },
  { name: "VAT", href: "/vat", icon: "💰", category: "calculators", tags: ["vat", "tax", "calculator"], description: "VAT calculator" },
  { name: "Fees", href: "/fees", icon: "💸", category: "calculators", tags: ["paypal", "stripe", "fees"], description: "Payment fees" },
  { name: "Discount", href: "/discount", icon: "💲", category: "calculators", tags: ["discount", "sale", "savings"], description: "Discount calc" },
  { name: "Loan", href: "/loan", icon: "🏦", category: "calculators", tags: ["loan", "mortgage", "interest"], description: "Loan calculator" },
  { name: "Percent", href: "/percentage", icon: "%", category: "calculators", tags: ["percentage", "percent", "math"], description: "Percentage calc" },
];

type RelatedToolsProps = {
  currentPath: string;
  maxVisible?: number;
  showCategory?: boolean;
};

export function RelatedToolsEnhanced({ 
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
            className="group flex items-center gap-2 p-3 bg-card border border-border rounded-lg hover:border-border hover:bg-muted transition-all duration-200 hover:scale-[1.02]"
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
