"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft, Clock, Sparkles, Wrench, Shield } from "lucide-react";

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

export default function UpdatePost({ params }: { params: Promise<{ slug: string }> }) {
  // In Next.js 15+, params is a Promise - use React.use() for client components
  const { slug } = React.use(params);
  const update = updates.find((u) => u.id === slug);

  if (!update) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Back Button */}
      <div className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/updates"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to updates
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <div className="border-b border-border px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {getCategoryBadge(update.category)}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <time dateTime={update.date}>{formatDate(update.date)}</time>
            </div>
            <span className="text-sm text-muted-foreground">·</span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{update.readTime} read</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {update.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground leading-relaxed">{update.excerpt}</p>
        </div>
      </div>

      {/* Article Content */}
      <article className="px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div
            className="prose prose-invert prose-zinc prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-ul:text-muted-foreground prose-ul:my-6
              prose-li:my-2
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
              prose-code:text-blue-400 prose-code:bg-card prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-card prose-pre:border prose-pre:border-border"
            dangerouslySetInnerHTML={{
              __html: update.content
                .split("\n")
                .map((line) => {
                  // Headings
                  if (line.startsWith("## ")) {
                    return `<h2>${line.slice(3)}</h2>`;
                  }
                  if (line.startsWith("### ")) {
                    return `<h3>${line.slice(4)}</h3>`;
                  }
                  // Lists
                  if (line.startsWith("- ")) {
                    return `<li>${line.slice(2)}</li>`;
                  }
                  // Bold
                  line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
                  // Links
                  line = line.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
                  // Inline code
                  line = line.replace(/`(.*?)`/g, "<code>$1</code>");
                  // Paragraphs
                  if (line.trim() === "") {
                    return "";
                  }
                  if (!line.startsWith("<")) {
                    return `<p>${line}</p>`;
                  }
                  return line;
                })
                .join("\n"),
            }}
          />
        </div>
      </article>

      {/* Footer CTA */}
      <div className="border-t border-border px-4 sm:px-6 py-12 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Try OpenKit.tools Today</h2>
          <p className="text-muted-foreground mb-6">
            100+ free, privacy-first developer tools. No signup required.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-medium transition-all"
            >
              Browse All Tools
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 bg-muted hover:bg-accent border border-border rounded-lg font-medium transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
