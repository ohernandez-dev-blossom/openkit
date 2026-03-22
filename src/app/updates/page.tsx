"use client";

import Link from "next/link";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { Calendar, ArrowRight, Sparkles, Wrench, Shield } from "lucide-react";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";

type Update = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  content: string;
  category: "release" | "feature" | "announcement";
  readTime: string;
};

const updates: Update[] = [
  {
    id: "introducing-openkit",
    date: "2025-02-01",
    title: "Introducing OpenKit.tools - Privacy-First Developer Tools",
    excerpt: "We're excited to launch OpenKit.tools, a collection of 100+ free developer utilities that respect your privacy. All processing happens in your browser.",
    content: `Today marks the official launch of OpenKit.tools! After months of development, we're thrilled to share this collection of privacy-first developer tools with the community.

## What is OpenKit.tools?

OpenKit.tools is a suite of 100+ free developer utilities designed with two core principles:

1. **Privacy First**: All tools process data entirely in your browser. Nothing is sent to servers, and we don't track your usage.
2. **Developer Focused**: Clean interfaces, keyboard shortcuts, and workflows built for productivity.

## Why We Built This

As developers, we constantly need quick utilities—formatting JSON, converting colors, generating UUIDs, and more. But existing tools often come with baggage: slow loading, ads, tracking, or paywalls.

We built OpenKit.tools to be different:
- ⚡ Lightning fast with client-side processing
- 🔒 Completely private—nothing leaves your browser
- 💝 100% free with no premium tiers
- 📴 Works offline as a Progressive Web App
- ✨ Clean, focused interfaces

## Features

### 100+ Tools Across Categories
- **Encoders**: Base64, JWT, URL parsing, Morse code
- **Formatters**: JSON, CSS, HTML, XML, SQL
- **Generators**: UUID, passwords, QR codes, lorem ipsum
- **Converters**: Colors, units, timestamps, data formats
- **Text Tools**: Case conversion, diff viewer, stats
- **Design**: Gradients, shadows, color palettes
- **CSS Tools**: Animation builder, clip-path editor
- **Dev Utilities**: Regex tester, Docker Compose builder, meta tags

### Productivity Features
- **Keyboard Shortcuts**: Cmd+K/Ctrl+K command palette
- **Tool Pinning**: Save and reorder favorites
- **Workflows**: Chain tools together
- **Offline Support**: Full PWA functionality
- **Mobile Friendly**: Responsive design with touch support

## Community

OpenKit.tools is free for everyone. You can:
- Report issues and suggest features
- Share with your developer friends
- Follow us on social media for updates

## What's Next

We have big plans for OpenKit.tools:
- More tools based on community feedback
- Enhanced keyboard shortcuts and workflows
- Light mode support
- Performance optimizations
- API for programmatic access

## Get Started

Visit [openkit.tools](https://openkit.tools) and start using tools right away. No signup, no tracking, just tools that work.

We'd love your feedback! Star us on GitHub, share with colleagues, or reach out on Twitter.

Thank you for being part of this journey! 🚀`,
    category: "announcement",
    readTime: "3 min",
  },
  {
    id: "v1-0-0-release",
    date: "2025-02-01",
    title: "Version 1.0.0 Released - 100+ Tools Now Available",
    excerpt: "Our first major release is here! OpenKit.tools v1.0.0 includes 100+ developer tools, PWA support, and a complete redesign of the user experience.",
    content: `We're thrilled to announce the release of OpenKit.tools v1.0.0! This is our first stable release, and it's packed with features.

## What's New in v1.0.0

### Core Features
- ✅ **100+ Developer Tools** across 10 categories
- ✅ **Progressive Web App** - Install and use offline
- ✅ **Command Palette** - Cmd+K for quick tool access
- ✅ **Workflow Collections** - Chain tools together
- ✅ **Tool Pinning** - Pin your favorite tools
- ✅ **Drag & Drop** - Reorder favorites
- ✅ **Mobile Support** - Full touch and gesture support
- ✅ **Keyboard Navigation** - Arrow keys, Enter, Escape

### Performance
- ⚡ Optimized bundle size with code splitting
- ⚡ Lazy loading for faster initial load
- ⚡ Core Web Vitals optimized
- ⚡ Instant tool switching

### Privacy & Security
- 🔒 100% client-side processing
- 🔒 No data sent to servers
- 🔒 No user tracking
- 🔒 No authentication required
- 🔒 Transparent and auditable

### Tool Highlights

**New Design Tools**
- Advanced gradient builder with visual editor
- Multi-layer shadow designer
- CSS animation timeline builder
- Clip-path visual editor
- Font pairing suggestions

**New Developer Tools**
- JSON to TypeScript converter
- SVG to JSX converter
- Mock API response generator
- Crontab visual builder
- chmod calculator

**New Converters**
- SQL to MongoDB query converter
- JSON ↔ YAML converter
- Markdown ↔ HTML converter
- Design tokens converter (Figma → CSS)

## Breaking Changes

Since this is v1.0.0, there are no breaking changes. Future releases will document any breaking changes here.

## Upgrade Guide

No upgrade needed! Just visit [openkit.tools](https://openkit.tools) for the latest version.

## Roadmap

Looking ahead, we're planning:
- Light mode support
- More API/data tools
- Enhanced workflows with conditional logic
- Tool favorites sync (privacy-respecting)
- Custom tool configurations

## Feedback

Have suggestions or found a bug? We'd love to hear from you:
- Open an issue on [GitHub](https://github.com/ohernandez-dev-blossom/openkit/issues)
- Tweet us [@openkit_tools](https://twitter.com/openkit_tools)
- Star the repo to show support ⭐

Thank you for using OpenKit.tools! 🎉`,
    category: "release",
    readTime: "4 min",
  },
];

function getCategoryBadge(category: Update["category"]) {
  const styles = {
    release: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    feature: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    announcement: "bg-green-500/10 text-green-400 border-green-500/20",
  };

  const icons = {
    release: <Sparkles className="w-3 h-3" />,
    feature: <Wrench className="w-3 h-3" />,
    announcement: <Shield className="w-3 h-3" />,
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[category]}`}>
      {icons[category]}
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function UpdatesPage() {
  useToolTracker("updates", "Updates");
  const analytics = useAnalytics();
  
  // Track page view engagement
  analytics.trackToolUsage('updates', { action: 'view' });
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Updates & Announcements
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay up to date with new features, releases, and improvements
          </p>
        </div>
      </div>

      {/* Updates List */}
      <div className="px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {updates.map((update) => (
              <article
                key={update.id}
                className="p-6 bg-card border border-border rounded-xl hover:border-border transition-colors"
              >
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {getCategoryBadge(update.category)}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={update.date}>{formatDate(update.date)}</time>
                  </div>
                  <span className="text-sm text-muted-foreground">·</span>
                  <span className="text-sm text-muted-foreground">{update.readTime} read</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold mb-3 hover:text-blue-400 transition-colors">
                  <Link href={`/updates/${update.id}`}>{update.title}</Link>
                </h2>

                {/* Excerpt */}
                <p className="text-muted-foreground leading-relaxed mb-4">{update.excerpt}</p>

                {/* Read More */}
                <Link
                  href={`/updates/${update.id}`}
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Read full post
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>

          {/* Empty State for Future */}
          {updates.length === 0 && (
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">No updates yet</p>
              <p className="text-sm text-muted-foreground">Check back soon for news and announcements</p>
            </div>
          )}
        </div>
      </div>

      {/* Subscribe CTA */}
      <div className="border-t border-border px-4 sm:px-6 py-12 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Follow us on social media or star our GitHub repo to get notified about new features and tools.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://github.com/ohernandez-dev-blossom/openkit"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-muted hover:bg-accent border border-border rounded-lg font-medium transition-colors"
            >
              Star on GitHub
            </a>
            <a
              href="https://twitter.com/openkit_tools"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
            >
              Follow on Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="Updates & Changelog | OpenKit.tools"
        description="Stay updated with the latest features, tools, and improvements to OpenKit.tools. View our changelog and product announcements."
        url="https://openkit.tools/updates"
        applicationCategory="DeveloperApplication"
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Updates', url: 'https://openkit.tools/updates' },
        ]}
      />
    </main>
  );
}
