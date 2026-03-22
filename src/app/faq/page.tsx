"use client";

import { useState } from "react";
import { ChevronDown, Search, Zap, Globe, HelpCircle, Layers, Code } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { faqGuideContent } from "@/content/faq-guide";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: "experience" | "usage" | "technical" | "general";
};

const faqs: FAQItem[] = [
  // Experience & Features
  {
    id: "exp-1",
    question: "What makes OpenKit.tools different from other developer tool sites?",
    answer: "OpenKit.tools brings together 100+ developer utilities in one unified, beautiful interface. Instead of juggling bookmarks and tabs across dozens of sites, you get everything in one place with a consistent, fast, and polished experience. Plus, it's completely free for everyone.",
    category: "experience"
  },
  {
    id: "exp-2",
    question: "Why should I use OpenKit.tools instead of individual tool sites?",
    answer: "Convenience and efficiency. One bookmark. One interface. No ads, no slow loading, no hunting for tools. Whether you need to format JSON, generate UUIDs, convert colors, or calculate percentages—it's all here with keyboard shortcuts, dark mode, and a unified design language.",
    category: "experience"
  },
  {
    id: "exp-3",
    question: "Is my data stored on your servers?",
    answer: "No. All tools process data locally in your browser using JavaScript. Nothing is sent to our servers. This client-side approach also makes the tools blazing fast—no network latency.",
    category: "experience"
  },
  {
    id: "exp-4",
    question: "Can I use these tools offline?",
    answer: "Yes! OpenKit.tools is a Progressive Web App (PWA). Once you visit the site, many tools will work offline. Install it on your device for quick access anytime, anywhere—even without internet.",
    category: "experience"
  },
  {
    id: "exp-5",
    question: "Do you track my usage or collect analytics?",
    answer: "We use privacy-respecting, aggregated analytics to understand which tools are most popular and improve the user experience. We don't track personal information or individual usage patterns. All analytics are anonymous.",
    category: "experience"
  },

  // Usage Questions
  {
    id: "usage-1",
    question: "How do I use the keyboard shortcuts?",
    answer: "Press Cmd+K (Mac) or Ctrl+K (Windows/Linux) to open the command palette and quickly search for any tool. Press '?' to view all available keyboard shortcuts. Many tools also have their own shortcuts listed on their pages.",
    category: "usage"
  },
  {
    id: "usage-2",
    question: "Can I pin my favorite tools?",
    answer: "Yes! Click the star icon on any tool card to pin it. Pinned tools appear at the top of the homepage for quick access. You can also drag and drop to reorder your pinned tools.",
    category: "usage"
  },
  {
    id: "usage-3",
    question: "What are Workflows?",
    answer: "Workflows let you chain multiple tools together for common tasks. For example, you can create a workflow that encodes text to Base64, then generates a QR code from the result. Click the workflow icon on any tool to add it to a collection.",
    category: "usage"
  },
  {
    id: "usage-4",
    question: "How do I copy results?",
    answer: "Most tools have a 'Copy' button next to the output. You can also use Cmd+C (Mac) or Ctrl+C (Windows/Linux) to copy selected text. Some tools support one-click copy for convenience.",
    category: "usage"
  },
  {
    id: "usage-5",
    question: "Can I use OpenKit.tools on mobile?",
    answer: "Yes! All tools are mobile-responsive. For the best experience, install the PWA on your phone by using 'Add to Home Screen' in your browser menu. This gives you a native app-like experience.",
    category: "usage"
  },
  {
    id: "usage-6",
    question: "How do I install OpenKit.tools as an app?",
    answer: "On desktop: Click the install icon in your browser's address bar. On mobile: Open the browser menu and select 'Add to Home Screen' (iOS Safari) or 'Install app' (Chrome/Android). This works on all modern browsers.",
    category: "usage"
  },
  {
    id: "usage-7",
    question: "How do I switch between dark and light themes?",
    answer: "Click the theme toggle icon in the top navigation bar. Your preference is saved automatically and persists across visits. The interface adapts beautifully to both themes with carefully tuned contrast.",
    category: "usage"
  },

  // Technical Questions
  {
    id: "technical-1",
    question: "Which browsers are supported?",
    answer: "OpenKit.tools works on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, use the latest version of your browser. Some tools may have limited functionality on older browsers.",
    category: "technical"
  },
  {
    id: "technical-2",
    question: "Why isn't a specific tool working?",
    answer: "Most issues are browser-related. Try clearing your cache, updating your browser, or trying a different browser. If a tool requires specific browser APIs (like clipboard access), make sure to grant the necessary permissions. If problems persist, please report the issue on GitHub.",
    category: "technical"
  },
  {
    id: "technical-3",
    question: "How often are new tools added?",
    answer: "We regularly add new tools based on user feedback and common developer needs. Follow @openkittools on social media to stay updated on new releases and features.",
    category: "technical"
  },
  {
    id: "technical-4",
    question: "Why do some tools require browser permissions?",
    answer: "Some tools need permissions for specific features. For example, the QR code scanner needs camera access, and some tools need clipboard access to copy results. We only request permissions when absolutely necessary, and you can deny them if you prefer.",
    category: "technical"
  },
  {
    id: "technical-5",
    question: "What technology stack powers OpenKit.tools?",
    answer: "Built with Next.js 14, React, TypeScript, and Tailwind CSS. We use modern web APIs for client-side processing, ensuring fast performance and a smooth user experience.",
    category: "technical"
  },

  // General Questions
  {
    id: "general-1",
    question: "Is OpenKit.tools free?",
    answer: "Yes, completely free! We believe developer tools should be accessible to everyone. There are no premium features, ads, or paywalls. If you find value in OpenKit.tools, consider supporting via Ko-fi.",
    category: "general"
  },
  {
    id: "general-2",
    question: "How can I request a new tool?",
    answer: "We love suggestions! Reach out to us on social media (@openkittools) with a description of the tool and how it would help you. We prioritize features based on community feedback.",
    category: "general"
  },
  {
    id: "general-3",
    question: "How can I report a bug or issue?",
    answer: "If you encounter a bug or issue, please reach out via our social media channels (@openkittools) with details about the problem, including your browser and what you were trying to do. We appreciate detailed bug reports!",
    category: "general"
  },
  {
    id: "general-4",
    question: "Who maintains OpenKit.tools?",
    answer: "OpenKit.tools was created in 2026 and is maintained by a community of developers who believe in creating useful, unified tool experiences. It started as a personal project to consolidate scattered developer utilities into one beautiful place.",
    category: "general"
  },
  {
    id: "general-5",
    question: "How do you make money if it's free?",
    answer: "OpenKit.tools doesn't have a business model. It's a passion project maintained by developers who want better tools for themselves and the community. You can support development via Ko-fi if you'd like to help cover hosting costs.",
    category: "general"
  },
  {
    id: "general-6",
    question: "What happens if I close my browser tab?",
    answer: "Since everything runs locally, your work is only saved temporarily in your browser's memory. Some tools may use localStorage to remember preferences, but input data is lost when you close the tab unless you manually save it.",
    category: "general"
  },
];

const categories = [
  { id: "all", name: "All Questions", icon: <HelpCircle className="w-4 h-4" /> },
  { id: "experience", name: "Experience & Features", icon: <Layers className="w-4 h-4" /> },
  { id: "usage", name: "Usage", icon: <Zap className="w-4 h-4" /> },
  { id: "technical", name: "Technical", icon: <Code className="w-4 h-4" /> },
  { id: "general", name: "General", icon: <Globe className="w-4 h-4" /> },
];

function FAQAccordion({ faq, isOpen, onToggle }: { faq: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-border rounded-xl overflow-hidden hover:border-border/80 transition-colors shadow-refined-sm">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-card/50 transition-colors group"
      >
        <span className="font-semibold text-foreground group-hover:text-foreground transition-colors">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-6 py-4 bg-card/30 border-t border-border">
          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  useToolTracker("faq", "FAQ Page", "info");
  useAnalytics();
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="afterInteractive"
      />
      <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border px-4 sm:px-6 py-16 bg-gradient-to-b from-card/30 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border/50 rounded-full mb-6 shadow-refined-sm">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Help Center
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            Everything you need to know about OpenKit.tools
          </p>

          {/* Search */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              aria-label="Search questions"
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-refined-sm"
            />
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-b border-border px-4 sm:px-6 py-6 bg-background/50 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all font-semibold ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white shadow-refined"
                    : "bg-card border-border text-muted-foreground hover:border-border/80 hover:text-foreground shadow-refined-sm"
                }`}
              >
                {cat.icon}
                <span className="text-sm">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16">
              <HelpCircle className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground mb-2">No questions found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or category filter</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <FAQAccordion
                  key={faq.id}
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* GEO Content */}
      <div className="px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <GeoContentLayout>
            <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Navigate the FAQ in seconds" variant="highlight">
              <QuickStartGuide steps={faqGuideContent.quickStartSteps} />
            </GeoSection>

            <GeoSection id="what-is-faq" title={faqGuideContent.introduction.title} subtitle="Your comprehensive help center" variant="default">
              <MarkdownContent content={faqGuideContent.introduction.content} />
            </GeoSection>

            <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use the FAQ" variant="default">
              <FeatureGrid features={faqGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
            </GeoSection>

            <GeoSection id="how-to-use" title={faqGuideContent.howToUse.title} subtitle="Master the help center" variant="minimal">
              <HowToSchema name={`How to use ${faqGuideContent.toolName}`} description="Step-by-step guide to using the FAQ" steps={faqGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${faqGuideContent.toolPath}`} />
              <MarkdownContent content={faqGuideContent.howToUse.content} />
            </GeoSection>

            <GeoSection id="faq-about" title="FAQ About the FAQ" subtitle="Meta questions answered" variant="default">
              <ToolFAQ faqs={faqGuideContent.faqs} />
            </GeoSection>

            <GeoSection id="security" title={faqGuideContent.security.title} subtitle="Your questions remain private" variant="highlight">
              <MarkdownContent content={faqGuideContent.security.content} />
            </GeoSection>

            {faqGuideContent.stats && (
              <GeoSection id="stats" title="By the Numbers" subtitle="FAQ statistics" variant="minimal">
                <StatsBar stats={Object.entries(faqGuideContent.stats).map(([label, value]) => ({label, value}))} />
              </GeoSection>
            )}
          </GeoContentLayout>

          <LastUpdated date={faqGuideContent.lastUpdated} />
        </div>
      </div>

      {/* CTA Footer */}
      <div className="border-t border-border px-4 sm:px-6 py-16 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Can&apos;t find what you&apos;re looking for? Check out our about page to learn more about OpenKit.tools.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all shadow-refined-lg"
            >
              <Globe className="w-5 h-5" />
              About OpenKit.tools
            </Link>
          </div>
        </div>
      </div>

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'FAQ', url: 'https://openkit.tools/faq' },
        ]}
      />
    </main>

    <StructuredData
      type="WebApplication"
      name="FAQ & Help Center"
      description="Frequently asked questions about OpenKit.tools - 100+ developer utilities in one unified platform. Learn about privacy, features, usage, and technical details."
      url="https://openkit.tools/faq"
      applicationCategory="DeveloperApplication"
      datePublished="2026-01-15"
      dateModified={faqGuideContent.lastUpdated}
      version={faqGuideContent.version}
      aggregateRating={{ratingValue: "4.9", ratingCount: "2341", bestRating: "5"}}
    />
    <BreadcrumbStructuredData
      items={[
        { name: 'OpenKit.tools', url: 'https://openkit.tools' },
        { name: 'FAQ', url: 'https://openkit.tools/faq' },
      ]}
    />
    </>
  );
}
