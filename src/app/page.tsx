"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import {
  Braces, Palette, DollarSign, Clock, Lock, Hash, FileText, Edit3,
  QrCode, GitCompare, Regex, BarChart3, Key, ShieldCheck, Globe, KeyRound,
  Type, Link2, Binary, ExternalLink, ArrowLeftRight, Ruler,
  Star, Search, Wrench, Code, Calculator, Receipt,
  Paintbrush, Square, Maximize2, Smile, Circle, FileX, ArrowUpDown,
  RotateCcw, AlignLeft, Dices, Timer, Radio, Thermometer, Scale, Percent, Server,
  Wallet, Mail, Link2 as LinkIcon, FileSpreadsheet, Database, Image, FileCode, Minimize2,
  Container, GitBranch, Tag, Layers, LayoutGrid, Sliders, Scissors, Eye, Table,
  CreditCard, Columns2, GripVertical, Keyboard, Cookie, Replace
} from "lucide-react";
import { tools, categories, type Category, type Tool } from "@/lib/tool-registry";
import { CommandPalette } from "@/components/command-palette";
import { PinnedTools } from "@/components/pinned-tools";
import { RecentTools } from "@/components/recent-tools";
import { PinButton } from "@/components/pin-button";
import { HeroSection } from "@/components/hero-section";
import { WorkflowButton } from "@/components/workflow-button";
import { KeyboardShortcutsHelp } from "@/components/keyboard-shortcuts-help";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Improved fuzzy matching with scoring
type MatchResult = {
  tool: Tool;
  score: number;
  matchedField: 'name' | 'description' | 'tag';
  matchedText?: string;
};

function fuzzyMatch(str: string, pattern: string): { matches: boolean; score: number } {
  const patternLower = pattern.toLowerCase();
  const strLower = str.toLowerCase();
  
  // Exact match - highest score
  if (strLower === patternLower) return { matches: true, score: 100 };
  
  // Starts with - very high score
  if (strLower.startsWith(patternLower)) return { matches: true, score: 90 };
  
  // Contains substring - high score
  if (strLower.includes(patternLower)) return { matches: true, score: 70 };
  
  // Fuzzy match: each character in pattern must appear in order
  let patternIdx = 0;
  let strIdx = 0;
  const matchedIndices: number[] = [];
  
  while (patternIdx < patternLower.length && strIdx < strLower.length) {
    if (patternLower[patternIdx] === strLower[strIdx]) {
      matchedIndices.push(strIdx);
      patternIdx++;
    }
    strIdx++;
  }
  
  if (patternIdx !== patternLower.length) {
    return { matches: false, score: 0 };
  }
  
  // Calculate score based on match density
  const matchDensity = matchedIndices.length / strLower.length;
  const consecutiveBonus = matchedIndices.every((val, i, arr) => 
    i === 0 || val === arr[i - 1] + 1
  ) ? 20 : 0;
  
  const score = Math.floor(matchDensity * 50 + consecutiveBonus);
  return { matches: true, score };
}

function highlightMatch(text: string, pattern: string): React.ReactNode {
  if (!pattern) return text;
  
  const lowerText = text.toLowerCase();
  const lowerPattern = pattern.toLowerCase();
  const index = lowerText.indexOf(lowerPattern);
  
  if (index === -1) {
    // Fuzzy highlight - find matching characters
    const chars = text.split('');
    const patternChars = pattern.toLowerCase().split('');
    let patternIdx = 0;
    
    return chars.map((char, i) => {
      if (patternIdx < patternChars.length && 
          char.toLowerCase() === patternChars[patternIdx]) {
        patternIdx++;
        return <mark key={i} className="bg-blue-500/30 text-blue-200">{char}</mark>;
      }
      return char;
    });
  }
  
  // Exact substring highlight
  return (
    <>
      {text.slice(0, index)}
      <mark className="bg-blue-500/30 text-blue-200">
        {text.slice(index, index + pattern.length)}
      </mark>
      {text.slice(index + pattern.length)}
    </>
  );
}

const RECENT_SEARCHES_KEY = "openkit-recent-searches";
const MAX_RECENT_SEARCHES = 5;

// Sortable tool card component for drag & drop
function SortableToolCard({
  tool,
  index,
  selectedIndex,
  search,
  showFavoritesOnly,
  favorites,
  saveRecentSearch,
  toolRefs
}: {
  tool: Tool;
  index: number;
  selectedIndex: number;
  search: string;
  showFavoritesOnly: boolean;
  favorites: string[];
  saveRecentSearch: (query: string) => void;
  toolRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  const isDraggable = showFavoritesOnly && favorites.includes(tool.href);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging} = useSortable({ 
    id: tool.href,
    disabled: !isDraggable});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1};

  const refCallback = useCallback((el: HTMLDivElement | null) => {
    if (el && toolRefs.current) {
      toolRefs.current[index] = el;
    }
    setNodeRef(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setNodeRef, index]);

  return (
    <div
      ref={refCallback}
      style={style}
      className={`group relative p-3 bg-card border rounded-xl shadow-refined-sm hover:shadow-refined transition-all duration-200 ${
        selectedIndex === index && search
          ? "border-blue-500 ring-2 ring-blue-500/20"
          : "border-border hover:border-border/80"
      } hover:bg-muted/50 ${
        isDraggable ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      {/* Drag handle - only show when favorites mode is active */}
      {isDraggable && (
        <div
          {...attributes}
          {...listeners}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground transition-colors cursor-grab active:cursor-grabbing touch-none"
          title="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </div>
      )}

      <div className="absolute top-3 right-3 flex gap-1">
        <WorkflowButton toolHref={tool.href} />
        <PinButton toolHref={tool.href} />
      </div>

      <Link 
        href={tool.href} 
        className={`flex items-start gap-3 ${isDraggable ? 'pl-6' : ''}`}
        onClick={() => saveRecentSearch(search)}
      >
        <div
          className={`w-9 h-9 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform text-white`}
        >
          {tool.icon}
        </div>
        <div className="min-w-0 pr-6">
          <h3 className="font-semibold text-sm mb-0.5 group-hover:text-foreground transition truncate">
            {search ? highlightMatch(tool.name, search) : tool.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {search ? highlightMatch(tool.description, search) : tool.description}
          </p>
        </div>
      </Link>
    </div>
  );
}

function HomeContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("all");
  // Load favorites using lazy initialization
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("openkit-favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  // Load recent searches using lazy initialization
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const savedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (savedSearches) {
        try {
          return JSON.parse(savedSearches);
        } catch (e) {
          console.error("Failed to parse recent searches:", e);
        }
      }
    }
    return [];
  });
  const searchInputRef = useRef<HTMLInputElement>(null);
  const toolRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Set category from URL query param - derive initial value instead of setting in effect
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const validCategories: Category[] = ["all", "encoders", "formatters", "generators", "converters", "text", "design", "css", "devtools", "code", "security", "finance", "calculators", "data"];
      if (validCategories.includes(categoryParam as Category)) {
        setCategory(categoryParam as Category);
      }
    }
  // Only run on mount when searchParams changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save recent search
  const saveRecentSearch = useCallback((query: string) => {
    if (!query.trim()) return;
    
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== query.toLowerCase());
      const updated = [query, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Cmd+K / Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mobile bottom nav event listeners
  useEffect(() => {
    const handleMobileSearch = () => {
      searchInputRef.current?.focus();
      searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const handleMobileFavorites = () => {
      setShowFavoritesOnly(prev => !prev);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleMobileRecent = () => {
      // Scroll to recent tools section
      const recentSection = document.querySelector('[data-section="recent-tools"]');
      if (recentSection) {
        recentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    window.addEventListener('mobile-nav-search', handleMobileSearch);
    window.addEventListener('mobile-nav-favorites', handleMobileFavorites);
    window.addEventListener('mobile-nav-recent', handleMobileRecent);

    return () => {
      window.removeEventListener('mobile-nav-search', handleMobileSearch);
      window.removeEventListener('mobile-nav-favorites', handleMobileFavorites);
      window.removeEventListener('mobile-nav-recent', handleMobileRecent);
    };
  }, []);

  // @dnd-kit sensors for drag & drop (supports mouse, touch, and keyboard)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required before drag starts
      }}),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // 250ms hold before drag starts on touch
        tolerance: 5, // 5px movement tolerance
      }}),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates})
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setDraggedItem(null);
      return;
    }

    const oldIndex = favorites.indexOf(String(active.id));
    const newIndex = favorites.indexOf(String(over.id));

    if (oldIndex !== -1 && newIndex !== -1) {
      const newFavorites = arrayMove(favorites, oldIndex, newIndex);
      setFavorites(newFavorites);
      localStorage.setItem("openkit-favorites", JSON.stringify(newFavorites));
    }

    setDraggedItem(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setDraggedItem(String(event.active.id));
  };

  // Improved filtering with fuzzy matching and scoring
  const filteredTools = (() => {
    if (search === "") {
      return tools.filter((tool) => {
        const matchesCategory = category === "all" || tool.category === category;
        const matchesFavorites = !showFavoritesOnly || favorites.includes(tool.href);
        return matchesCategory && matchesFavorites;
      });
    }

    const matches: MatchResult[] = [];

    tools.forEach((tool) => {
      const matchesCategory = category === "all" || tool.category === category;
      const matchesFavorites = !showFavoritesOnly || favorites.includes(tool.href);
      
      if (!matchesCategory || !matchesFavorites) return;

      // Check name
      const nameMatch = fuzzyMatch(tool.name, search);
      if (nameMatch.matches) {
        matches.push({
          tool,
          score: nameMatch.score + 20, // Bonus for name match
          matchedField: 'name'
        });
        return;
      }

      // Check description
      const descMatch = fuzzyMatch(tool.description, search);
      if (descMatch.matches) {
        matches.push({
          tool,
          score: descMatch.score + 10, // Bonus for description match
          matchedField: 'description'
        });
        return;
      }

      // Check tags
      for (const tag of tool.tags) {
        const tagMatch = fuzzyMatch(tag, search);
        if (tagMatch.matches) {
          matches.push({
            tool,
            score: tagMatch.score,
            matchedField: 'tag',
            matchedText: tag
          });
          return;
        }
      }
    });

    // Sort by score (descending)
    return matches
      .sort((a, b) => b.score - a.score)
      .map(m => m.tool);
  })();

  const sortedTools = [...filteredTools].sort((a, b) => {
    if (search) return 0; // Already sorted by relevance
    
    const aFav = favorites.includes(a.href) ? 0 : 1;
    const bFav = favorites.includes(b.href) ? 0 : 1;
    if (aFav !== bFav) return aFav - bFav;
    // If both are favorites, sort by their order in favorites array
    if (aFav === 0 && bFav === 0) {
      return favorites.indexOf(a.href) - favorites.indexOf(b.href);
    }
    return a.name.localeCompare(b.name);
  });

  // Reset selected index when results change using functional update
  useEffect(() => {
    setSelectedIndex(() => 0);
  }, [search, category, showFavoritesOnly]);

  // Keyboard navigation for results
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if search input is focused and there are results
      if (document.activeElement !== searchInputRef.current || sortedTools.length === 0) {
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % sortedTools.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + sortedTools.length) % sortedTools.length);
      } else if (e.key === 'Enter' && sortedTools[selectedIndex]) {
        e.preventDefault();
        saveRecentSearch(search);
        window.location.href = sortedTools[selectedIndex].href;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, sortedTools, search, saveRecentSearch]);

  // Scroll selected item into view
  useEffect(() => {
    if (toolRefs.current[selectedIndex]) {
      toolRefs.current[selectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [selectedIndex]);

  // Get suggestions for empty results
  const suggestions = search && sortedTools.length === 0 
    ? tools
        .filter(t => category === "all" || t.category === category)
        .slice(0, 3)
    : [];

  return (
    <>
      <main className="min-h-screen bg-background text-foreground transition-all duration-300">
        {/* Command Palette */}
        <CommandPalette tools={tools} />
        
        {/* Keyboard Shortcuts Help */}
        <KeyboardShortcutsHelp />

      {/* Hero */}
      <HeroSection />

      {/* Quick Category Links */}
      <div id="tools-section" className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { href: "/tools/design", label: "🎨 Design Tools", gradient: "from-pink-500/10 to-fuchsia-500/10 border-pink-500/20 hover:border-pink-500/40 text-pink-400" },
            { href: "/tools/text", label: "📝 Text Tools", gradient: "from-cyan-500/10 to-blue-500/10 border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400" },
            { href: "/tools/finance", label: "💰 Finance", gradient: "from-emerald-500/10 to-green-500/10 border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400" },
            { href: "/tools/converters", label: "🔄 Converters", gradient: "from-orange-500/10 to-amber-500/10 border-orange-500/20 hover:border-orange-500/40 text-orange-400" },
          ].map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`px-3 py-1.5 bg-gradient-to-r ${cat.gradient} border rounded-full text-xs font-medium transition-all hover:scale-105 backdrop-blur-sm hover:shadow-lg hover:shadow-current/5`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>


      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Pinned Tools Section */}
        <PinnedTools allTools={tools} />

        {/* Workflow Collections Section */}
        {/* Hidden for MVP launch - can be re-enabled later */}
        {/* <WorkflowCollections allTools={tools} /> */}

        {/* Recent Tools Section */}
        <RecentTools allTools={tools} maxItems={8} />

        {/* Category Legend */}
        <div className="mb-6 p-4 bg-card/50 border border-border rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Sliders className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-base sm:text-lg font-semibold text-foreground/70">Category Color Legend</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {categories.filter(c => c.id !== "all").map((cat) => (
              <div key={cat.id} className="flex items-center gap-2 text-xs">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${cat.color}`} />
                <span className="text-muted-foreground">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input aria-label="Input field"
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 160+ tools..."
              className="w-full px-5 py-4 pl-14 bg-card border-2 border-border rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-base font-medium transition-all shadow-sm hover:border-border/60"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/70" />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-foreground/70"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition flex items-center gap-2 ${
              showFavoritesOnly
                ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-400"
                : "bg-card border-border text-muted-foreground hover:border-border/80"
            }`}
          >
            <Star className={`w-4 h-4 ${showFavoritesOnly ? "fill-yellow-400" : ""}`} />
            <span className="hidden sm:inline">Favorites</span>
            {favorites.length > 0 && (
              <span className="bg-muted px-1.5 py-0.5 rounded text-xs">{favorites.length}</span>
            )}
          </button>
        </div>

        {/* Recent Searches */}
        {!search && recentSearches.length > 0 && (
          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">Recent:</span>
            {recentSearches.map((recent, i) => (
              <button
                key={i}
                onClick={() => setSearch(recent)}
                className="px-2 py-1 text-xs bg-card hover:bg-muted border border-border rounded-md transition flex items-center gap-1.5"
              >
                <Clock className="w-3 h-3 text-muted-foreground/70" />
                {recent}
              </button>
            ))}
          </div>
        )}

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
                category === cat.id
                  ? cat.id === "all" 
                    ? "bg-muted/80 text-foreground"
                    : `bg-gradient-to-br ${cat.color} text-white`
                  : "bg-card text-muted-foreground hover:bg-muted border border-border"
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-muted-foreground">
            {sortedTools.length} tool{sortedTools.length !== 1 ? "s" : ""}
            {category !== "all" && ` in ${categories.find((c) => c.id === category)?.name}`}
            {showFavoritesOnly && " (favorites)"}
            {search && " matching your search"}
          </p>
          {search && sortedTools.length > 0 && (
            <p className="text-xs text-muted-foreground/60">
              Use ↑↓ to navigate, Enter to select
            </p>
          )}
        </div>

        {/* Drag hint for favorites */}
        {showFavoritesOnly && favorites.length > 1 && (
          <div className="mb-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-xs text-blue-400 flex items-center gap-2">
              <GripVertical className="w-4 h-4" />
              <span className="font-medium">Drag & Drop enabled:</span>
              <span className="text-blue-300">Use the grip handle to reorder your favorites. Works with touch on mobile!</span>
            </p>
          </div>
        )}

        {/* Tools Grid with Drag & Drop */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortedTools.map(t => t.href)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sortedTools.map((tool, index) => (
                <SortableToolCard
                  key={tool.href}
                  tool={tool}
                  index={index}
                  selectedIndex={selectedIndex}
                  search={search}
                  showFavoritesOnly={showFavoritesOnly}
                  favorites={favorites}
                  saveRecentSearch={saveRecentSearch}
                  toolRefs={toolRefs}
                />
              ))}
            </div>
          </SortableContext>
          
          {/* Drag overlay for better visual feedback */}
          <DragOverlay>
            {draggedItem ? (
              <div className="p-3 bg-muted border-2 border-blue-500 rounded-xl shadow-2xl opacity-90 rotate-3 scale-105">
                {(() => {
                  const tool = tools.find(t => t.href === draggedItem);
                  if (!tool) return null;
                  return (
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center shrink-0 text-white`}>
                        {tool.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-sm text-foreground truncate">
                          {tool.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* No Results State */}
        {sortedTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-muted-foreground mb-2">
              No tools found for &quot;<span className="text-foreground/70">{search}</span>&quot;
            </p>
            {suggestions.length > 0 && (
              <>
                <p className="text-sm text-muted-foreground mb-4">Try these popular tools instead:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestions.map(tool => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="px-3 py-2 bg-card hover:bg-muted border border-border rounded-lg text-sm transition flex items-center gap-2"
                    >
                      <div className={`w-6 h-6 rounded bg-gradient-to-br ${tool.color} flex items-center justify-center text-white`}>
                        {tool.icon}
                      </div>
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6 mt-8">
        <div className="max-w-4xl mx-auto text-center text-xs text-muted-foreground">
          <p>Privacy-focused • Free for everyone</p>
        </div>
      </footer>

    </main>
    </>
  );
}

// Wrap in Suspense to fix Next.js 16 SSG requirement
export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="text-muted-foreground">Loading...</div></div>}>
      <HomeContent />
    </Suspense>
  );
}
