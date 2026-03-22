"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

import { Search, Clock, ArrowRight } from "lucide-react";

type Tool = {
  name: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  tags: string[];
};

type CommandPaletteProps = {
  tools: Tool[];
};

const MAX_RECENT_TOOLS = 5;
const RECENT_TOOLS_KEY = "openkit-recent";

// Simple fuzzy match function
function fuzzyMatch(str: string, pattern: string): boolean {
  const patternLower = pattern.toLowerCase();
  const strLower = str.toLowerCase();
  
  // Exact substring match
  if (strLower.includes(patternLower)) return true;
  
  // Fuzzy match: each character in pattern must appear in order
  let patternIdx = 0;
  let strIdx = 0;
  
  while (patternIdx < patternLower.length && strIdx < strLower.length) {
    if (patternLower[patternIdx] === strLower[strIdx]) {
      patternIdx++;
    }
    strIdx++;
  }
  
  return patternIdx === patternLower.length;
}

export function CommandPalette({ tools }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentTools, setRecentTools] = useState<string[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }
    const saved = localStorage.getItem(RECENT_TOOLS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse recent tools:", e);
      }
    }
    return [];
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Save tool to recent history
  const addToRecent = useCallback((href: string) => {
    setRecentTools((prev) => {
      const filtered = prev.filter((h) => h !== href);
      const updated = [href, ...filtered].slice(0, MAX_RECENT_TOOLS);
      localStorage.setItem(RECENT_TOOLS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened and reset state
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      // Reset search and selection when modal opens
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearch(() => "");
      setSelectedIndex(() => 0);
    }
  }, [isOpen]);

  // Filter and sort tools
  const filteredTools = search.trim()
    ? tools.filter((tool) => {
        const searchLower = search.toLowerCase();
        return (
          fuzzyMatch(tool.name, searchLower) ||
          fuzzyMatch(tool.description, searchLower) ||
          tool.tags.some((tag) => fuzzyMatch(tag, searchLower))
        );
      })
    : [];

  // Get recent tools objects
  const recentToolObjects = search.trim()
    ? []
    : recentTools
        .map((href) => tools.find((t) => t.href === href))
        .filter((t): t is Tool => t !== undefined);

  const displayedTools = search.trim() ? filteredTools : recentToolObjects;

  // Reset selected index when filtered tools change
  useEffect(() => {
    // Reset selection when search results change
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedIndex(() => 0);
  }, [search]);

  // Handle navigation and selection
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % displayedTools.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + displayedTools.length) % displayedTools.length);
    } else if (e.key === "Enter" && displayedTools[selectedIndex]) {
      e.preventDefault();
      handleSelectTool(displayedTools[selectedIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  const handleSelectTool = (tool: Tool) => {
    addToRecent(tool.href);
    setIsOpen(false);
    router.push(tool.href);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4"
      onClick={() => setIsOpen(false)}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Command Palette Modal */}
      <div
        className="relative w-full max-w-2xl bg-card border border-border/80 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search tools..."
            aria-label="Search tools"
            className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground/70"
          />
          <kbd className="hidden sm:block px-2 py-1 text-xs text-muted-foreground/70 bg-muted rounded border border-border/80">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {displayedTools.length > 0 ? (
            <div className="py-2">
              {!search.trim() && recentToolObjects.length > 0 && (
                <div className="px-3 py-2 text-xs text-muted-foreground/70 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Recent
                </div>
              )}
              {displayedTools.map((tool, index) => (
                <button
                  key={tool.href}
                  onClick={() => handleSelectTool(tool)}
                  className={`w-full px-4 py-2.5 flex items-center gap-3 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${
                    index === selectedIndex
                      ? "bg-blue-600/20 border-l-2 border-blue-500"
                      : "border-l-2 border-transparent hover:bg-muted active:bg-muted/70"
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                  aria-label={`Open ${tool.name} - ${tool.description}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    {tool.icon}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{tool.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{tool.description}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/70 shrink-0" />
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-12 text-center text-sm text-muted-foreground/70">
              {search.trim() ? (
                <>
                  No tools found for &quot;<span className="text-foreground/70">{search}</span>&quot;
                </>
              ) : (
                "Start typing to search tools..."
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-border flex items-center justify-between text-xs text-muted-foreground/70">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border/80">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border/80">↓</kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border/80">↵</kbd>
              <span>Select</span>
            </div>
          </div>
          <div className="hidden sm:block text-muted-foreground/70">
            {displayedTools.length} {displayedTools.length === 1 ? "tool" : "tools"}
          </div>
        </div>
      </div>
    </div>
  );
}
