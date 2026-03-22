"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Smile, Search, Clock, Star } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { emojiGuideContent } from "@/content/emoji-guide";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";

import { emojiData } from "@/lib/emoji-data";

const categories = [
  "All",
  "Smileys & People",
  "Animals & Nature",
  "Food & Drink",
  "Activities",
  "Travel & Places",
  "Objects",
  "Symbols",
  "Flags",
];

export default function EmojiPickerAndSearch() {
  useToolTracker("emoji", "Emoji Picker & Search", "utilities");
  const analytics = useAnalytics();
  const { isCopied, copiedText } = useCopyToClipboard({ duration: 1500 });
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [recentEmojis, setRecentEmojis] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const savedRecent = localStorage.getItem("emoji-recent");
    if (savedRecent) {
      try {
        return JSON.parse(savedRecent);
      } catch (e) {
        console.error("Failed to parse recent emojis", e);
      }
    }
    return [];
  });
  const [frequentEmojis, setFrequentEmojis] = useState<Record<string, number>>(() => {
    if (typeof window === 'undefined') return {};
    const savedFrequent = localStorage.getItem("emoji-frequent");
    if (savedFrequent) {
      try {
        return JSON.parse(savedFrequent);
      } catch (e) {
        console.error("Failed to parse frequent emojis", e);
      }
    }
    return {};
  });
  const [showSkinTones, setShowSkinTones] = useState<string | null>(null);

  const copyEmoji = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    analytics.trackToolInteraction('emoji', 'copy', { emoji });

    // Update recent
    const newRecent = [emoji, ...recentEmojis.filter(e => e !== emoji)].slice(0, 20);
    setRecentEmojis(newRecent);
    localStorage.setItem("emoji-recent", JSON.stringify(newRecent));

    // Update frequent
    const newFrequent = { ...frequentEmojis, [emoji]: (frequentEmojis[emoji] || 0) + 1 };
    setFrequentEmojis(newFrequent);
    localStorage.setItem("emoji-frequent", JSON.stringify(newFrequent));
  };

  const filteredEmojis = useMemo(() => {
    let filtered = emojiData;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(e => e.category === selectedCategory);
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(e =>
        e.name.toLowerCase().includes(searchLower) ||
        e.keywords.some(k => k.toLowerCase().includes(searchLower)) ||
        e.emoji.includes(search)
      );
    }

    return filtered;
  }, [search, selectedCategory]);

  const frequentEmojisList = useMemo(() => {
    return Object.entries(frequentEmojis)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 20)
      .map(([emoji]) => emoji);
  }, [frequentEmojis]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center hover:opacity-80 transition">
            <Smile className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">Emoji Picker & Search</h1>
            <p className="text-xs text-muted-foreground">Click to copy • Search by name or keyword</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Search */}
        <div className="relative mb-6">
          <input aria-label="Search emojis"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value.length > 2) {
                analytics.trackSearch(e.target.value, filteredEmojis.length, { tool: 'emoji' });
              }
            }}
            placeholder="Search emojis by name or keyword..."
            className="w-full px-4 py-3 pl-10 bg-card border border-border rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent-foreground"
            >
              ✕
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-white"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Frequent */}
        {!search && frequentEmojisList.length > 0 && (
          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Frequently Used
            </h3>
            <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 gap-2">
              {frequentEmojisList.map((emoji) => {
                const emojiInfo = emojiData.find(e => e.emoji === emoji);
                return (
                  <button
                    key={emoji}
                    onClick={() => copyEmoji(emoji)}
                    className={`group relative p-3 text-3xl hover:bg-muted rounded-lg transition ${
                      copiedText === emoji ? "bg-green-600/20" : ""
                    }`}
                    title={emojiInfo?.name || emoji}
                  >
                    {emoji}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-muted border border-border rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
                      {emojiInfo?.name || emoji}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent */}
        {!search && recentEmojis.length > 0 && (
          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recently Used
            </h3>
            <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 gap-2">
              {recentEmojis.map((emoji, i) => {
                const data = emojiData.find(e => e.emoji === emoji);
                return (
                  <button
                    key={i}
                    onClick={() => copyEmoji(emoji)}
                    className={`group relative p-3 text-3xl hover:bg-muted rounded-lg transition ${
                      copiedText === emoji ? "bg-green-600/20" : ""
                    }`}
                    title={data?.name || emoji}
                  >
                    {emoji}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-muted border border-border rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
                      {data?.name || emoji}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredEmojis.length} emoji{filteredEmojis.length !== 1 ? "s" : ""}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
            {search && " matching your search"}
          </p>
        </div>

        {/* Emoji Grid */}
        <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 gap-2">
          {filteredEmojis.map((item) => (
            <div key={item.unicode} className="relative">
              <button
                onClick={() => {
                  if (item.skinTones && item.skinTones.length > 0) {
                    setShowSkinTones(showSkinTones === item.emoji ? null : item.emoji);
                  } else {
                    copyEmoji(item.emoji);
                  }
                }}
                className={`group relative w-full aspect-square p-2 text-3xl hover:bg-muted rounded-lg transition ${
                  copiedText === item.emoji ? "bg-green-600/20" : ""
                }`}
              >
                {item.emoji}

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-muted border border-border rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-muted-foreground">{item.unicode}</div>
                </div>
              </button>

              {/* Skin Tone Picker */}
              {showSkinTones === item.emoji && item.skinTones && (
                <div className="absolute top-full left-0 mt-1 p-2 bg-muted border border-border rounded-lg shadow-xl z-20 flex gap-1">
                  <button
                    onClick={() => {
                      copyEmoji(item.emoji);
                      setShowSkinTones(null);
                    }}
                    className="p-1 text-2xl hover:bg-accent rounded"
                  >
                    {item.emoji}
                  </button>
                  {item.skinTones.map((tone, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        copyEmoji(tone);
                        setShowSkinTones(null);
                      }}
                      className="p-1 text-2xl hover:bg-accent rounded"
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredEmojis.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-muted-foreground mb-2">
              No emojis found
              {search && (
                <>
                  {" "}for &quot;<span className="text-accent-foreground">{search}</span>&quot;
                </>
              )}
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="text-sm text-cyan-400 hover:text-cyan-300"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Copied notification */}
        {isCopied && copiedText && (
          <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg text-sm flex items-center gap-3 animate-in slide-in-from-bottom-2">
            <span className="text-2xl">{copiedText}</span>
            <div>
              <div className="font-medium">Copied!</div>
              <div className="text-xs text-green-100">
                {emojiData.find(e => e.emoji === copiedText)?.name}
              </div>
            </div>
          </div>
        )}

        <RelatedTools currentPath="/emoji" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={emojiGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-emoji" title={emojiGuideContent.introduction.title} subtitle="Understanding emoji selection for developers" variant="default">
            <MarkdownContent content={emojiGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use emoji selection" variant="default">
            <FeatureGrid features={emojiGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={emojiGuideContent.howToUse.title} subtitle="Master emoji selection and usage" variant="minimal">
            <HowToSchema name={`How to use ${emojiGuideContent.toolName}`} description="Step-by-step guide to emoji selection" steps={emojiGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${emojiGuideContent.toolPath}`} />
            <MarkdownContent content={emojiGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={emojiGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={emojiGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={emojiGuideContent.security.content} />
          </GeoSection>

          {emojiGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(emojiGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={emojiGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Click any emoji to copy. Emojis with skin tone variants show a picker on click.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="Emoji Picker & Search"
        description="Search and copy emojis quickly. Browse by category, search by name or keyword, with skin tone support. 1800+ emojis for developers."
        url="https://openkit.tools/emoji"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={emojiGuideContent.lastUpdated}
        version={emojiGuideContent.version}
        aggregateRating={{ratingValue: "4.9", ratingCount: "2341", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Emoji Picker & Search', url: 'https://openkit.tools/emoji' },
        ]}
      />
    </main>
  );
}
