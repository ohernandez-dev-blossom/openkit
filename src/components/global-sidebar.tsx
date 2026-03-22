"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Wrench,
  Lock,
  Braces,
  Zap,
  ArrowLeftRight,
  Type,
  Palette,
  Paintbrush,
  Code,
  FileCode,
  Shield,
  DollarSign,
  Database,
} from "lucide-react";

type Category = "all" | "encoders" | "formatters" | "generators" | "converters" | "text" | "design" | "css" | "devtools" | "code" | "security" | "finance" | "data";

type CategoryInfo = {
  id: Category;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
};

const categoryColors = {
  encoders: "from-blue-500 to-blue-600",
  formatters: "from-green-500 to-green-600",
  generators: "from-purple-500 to-purple-600",
  converters: "from-orange-500 to-orange-600",
  text: "from-cyan-500 to-cyan-600",
  design: "from-pink-500 to-pink-600",
  css: "from-fuchsia-500 to-fuchsia-600",
  devtools: "from-yellow-500 to-yellow-600",
  code: "from-indigo-500 to-indigo-600",
  security: "from-red-500 to-red-600",
  finance: "from-emerald-500 to-emerald-600",
  data: "from-violet-500 to-violet-600",
};

const categories: CategoryInfo[] = [
  { 
    id: "all", 
    name: "All Tools", 
    icon: <Wrench className="w-4 h-4" />, 
    color: "from-zinc-500 to-zinc-600", 
    description: "Browse all available tools" 
  },
  { 
    id: "encoders", 
    name: "Encoders", 
    icon: <Lock className="w-4 h-4" />, 
    color: categoryColors.encoders, 
    description: "Encode, decode, and transform data" 
  },
  { 
    id: "formatters", 
    name: "Formatters", 
    icon: <Braces className="w-4 h-4" />, 
    color: categoryColors.formatters, 
    description: "Format and beautify code" 
  },
  { 
    id: "generators", 
    name: "Generators", 
    icon: <Zap className="w-4 h-4" />, 
    color: categoryColors.generators, 
    description: "Generate random data and content" 
  },
  { 
    id: "converters", 
    name: "Converters", 
    icon: <ArrowLeftRight className="w-4 h-4" />, 
    color: categoryColors.converters, 
    description: "Convert between formats and units" 
  },
  { 
    id: "text", 
    name: "Text Tools", 
    icon: <Type className="w-4 h-4" />, 
    color: categoryColors.text, 
    description: "Manipulate and analyze text" 
  },
  { 
    id: "design", 
    name: "Design", 
    icon: <Palette className="w-4 h-4" />, 
    color: categoryColors.design, 
    description: "Color tools and design utilities" 
  },
  { 
    id: "css", 
    name: "CSS Tools", 
    icon: <Paintbrush className="w-4 h-4" />, 
    color: categoryColors.css, 
    description: "CSS generators and visual editors" 
  },
  { 
    id: "devtools", 
    name: "Dev Utilities", 
    icon: <Code className="w-4 h-4" />, 
    color: categoryColors.devtools, 
    description: "Developer tools and utilities" 
  },
  { 
    id: "code", 
    name: "Code Tools", 
    icon: <FileCode className="w-4 h-4" />, 
    color: categoryColors.code, 
    description: "Code generation and conversion" 
  },
  { 
    id: "security", 
    name: "Security", 
    icon: <Shield className="w-4 h-4" />, 
    color: categoryColors.security, 
    description: "Security and cryptography tools" 
  },
  { 
    id: "finance", 
    name: "Finance", 
    icon: <DollarSign className="w-4 h-4" />, 
    color: categoryColors.finance, 
    description: "Financial calculators and tools" 
  },
  { 
    id: "data", 
    name: "Data & API", 
    icon: <Database className="w-4 h-4" />, 
    color: categoryColors.data, 
    description: "Data manipulation and API tools" 
  },
];

const SIDEBAR_STATE_KEY = "openkit-sidebar-collapsed";

/**
 * Global sidebar that appears on all pages with category navigation
 */
export function GlobalSidebar() {
  // Load sidebar state from localStorage using lazy initialization
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(SIDEBAR_STATE_KEY);
      return saved === "true";
    }
    return false;
  });

  // Save sidebar state to localStorage
  const toggleCollapsed = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem(SIDEBAR_STATE_KEY, String(newState));
  };

  return (
    <aside
      className={`hidden md:block fixed left-0 top-0 h-screen bg-card border-r border-border shadow-refined-lg transition-all duration-300 ease-in-out z-40 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
      aria-label="Categories sidebar"
    >
      {/* Sidebar content */}
      <div className="flex flex-col h-full">
        {/* Header with logo and collapse button */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <Link 
              href="/"
              className="font-bold text-lg bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-in fade-in duration-200 hover:opacity-80 transition-opacity"
            >
              OpenKit.tools
            </Link>
          )}
          <button
            onClick={toggleCollapsed}
            className={`p-2 rounded-lg hover:bg-muted active:bg-muted/70 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group ${
              isCollapsed ? "mx-auto" : ""
            }`}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
          </button>
        </div>

        {/* Categories list */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-2">
          <div className="space-y-1">
            {categories.map((category) => {
              // Link to homepage with category filter
              const href = category.id === "all" ? "/" : `/?category=${category.id}`;

              return (
                <Link
                  key={category.id}
                  href={href}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative text-muted-foreground hover:text-foreground/90 hover:bg-muted/50"
                  title={isCollapsed ? category.name : category.description}
                >
                  {/* Icon with gradient background */}
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.color} text-white flex items-center justify-center shrink-0 transition-transform group-hover:scale-105`}
                  >
                    {category.icon}
                  </div>

                  {/* Category name and description - hidden when collapsed */}
                  {!isCollapsed && (
                    <div className="flex-1 text-left min-w-0 animate-in fade-in slide-in-from-left-2 duration-200">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-sm truncate">
                          {category.name}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground/70 truncate">
                        {category.description}
                      </p>
                    </div>
                  )}

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-card border border-border rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-50 shadow-refined-lg">
                      <div className="font-medium text-sm text-foreground mb-0.5">
                        {category.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {category.description}
                      </div>
                      {/* Tooltip arrow */}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-card" />
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* AI Tools Section */}

        {!isCollapsed && (
          <div className="p-4 border-t border-border animate-in fade-in duration-200">
            <div className="text-xs text-muted-foreground/70 space-y-1">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-0.5 bg-muted border border-border/80 rounded text-[10px] font-mono">
                  Cmd+K
                </kbd>
                <span>Quick search</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
