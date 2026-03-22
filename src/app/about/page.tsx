"use client";

import { Zap, Layers, Sparkles, Code, Coffee, Target, Rocket, Users, Globe, ArrowRight, CheckCircle2, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";

export default function AboutPage() {
  useToolTracker("about", "About Page", "info");
  const analytics = useAnalytics();
  const [activeTab, setActiveTab] = useState<"mission" | "story" | "tech">("mission");

  const handleTabChange = (tab: "mission" | "story" | "tech") => {
    setActiveTab(tab);
    analytics.trackToolInteraction('about', 'tab_change', { tab });
  };

  const stats = [
    { label: "Developer Tools", value: "100+", icon: <Zap className="w-5 h-5" />, color: "from-blue-500 to-cyan-500" },
    { label: "Created in", value: "2026", icon: <Sparkles className="w-5 h-5" />, color: "from-purple-500 to-pink-500" },
    { label: "Always Free", value: "100%", icon: <Heart className="w-5 h-5" />, color: "from-orange-500 to-red-500" },
    { label: "Growing Daily", value: "Active", icon: <Users className="w-5 h-5" />, color: "from-green-500 to-emerald-500" },
  ];

  const features = [
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Everything in One Place",
      description: "Stop hunting across dozens of sites. From JSON formatting to color picking, encryption to calculators—it's all here.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant & Blazing Fast",
      description: "Client-side processing means zero latency. No server round-trips, no loading spinners. Just instant results.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Built for Productivity",
      description: "Keyboard shortcuts, clean interfaces, smart defaults. Every detail optimized for your workflow.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Works Everywhere",
      description: "Desktop, mobile, offline. Progressive Web App that works wherever you code, design, or create.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const techHighlights = [
    "⚡ Next.js 14 with App Router for optimal performance",
    "🎨 Modern, theme-aware UI with dark/light modes",
    "📱 Responsive design from mobile to 4K displays",
    "🔌 100% client-side processing—no backend required",
    "✨ Progressive Web App with offline support",
    "⌨️ Keyboard shortcuts for power users",
  ];

  return (
    <>
      <StructuredData 
        type="WebApplication"
        name="About OpenKit.tools - Developer Tools Suite"
        description="Learn about OpenKit.tools - your unified workspace for 180+ developer tools. Fast, beautiful, and privacy-respecting utilities for developers worldwide."
        url="https://openkit.tools/about"
        applicationCategory="DeveloperApplication"
      />
      <BreadcrumbStructuredData 
        items={[
          { name: "About", url: "https://openkit.tools/about" }
        ]}
      />
      <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section - Bold & Modern */}
      <div className="relative overflow-hidden border-b border-border">
        {/* Background gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-32">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border/50 rounded-full shadow-refined">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Built in 2026
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
              <span className="block mb-2">All Your Tools.</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                One Beautiful Place.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              OpenKit.tools brings together 100+ developer utilities in a fast, beautiful,
              privacy-respecting experience. Stop juggling tabs. Start building.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all text-lg shadow-refined-lg group"
              >
                <Rocket className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                Explore Tools
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-6 bg-card border border-border rounded-2xl shadow-refined-sm hover:shadow-refined transition-all group"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${stat.color} text-white rounded-xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {stat.icon}
                </div>
                <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section with Tabs */}
      <div className="border-b border-border px-4 sm:px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {[
              { id: "mission", label: "Our Mission", icon: <Target className="w-4 h-4" /> },
              { id: "story", label: "The Story", icon: <Sparkles className="w-4 h-4" /> },
              { id: "tech", label: "Technology", icon: <Code className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as typeof activeTab)}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-refined"
                    : "bg-card hover:bg-muted border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto">
            {activeTab === "mission" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-bold">Everything You Need, Nothing You Don&apos;t</h2>
                  <p className="text-xl text-muted-foreground">
                    The web is fragmented. Finding the right tool means opening countless tabs,
                    dealing with ads, slow loading, and inconsistent experiences.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-8 shadow-refined">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center">
                      <Layers className="w-5 h-5" />
                    </div>
                    We Fix That
                  </h3>
                  <div className="space-y-4 text-lg text-muted-foreground">
                    <p>
                      <strong className="text-foreground">OpenKit.tools is your unified workspace.</strong> One bookmark.
                      One interface. One experience that respects your time and workflow.
                    </p>
                    <p>
                      Whether you&apos;re formatting JSON, generating UUIDs, converting colors, or calculating percentages—it&apos;s all here,
                      fast and beautiful, with the privacy and performance you deserve.
                    </p>
                    <p className="text-foreground font-semibold">
                      No accounts. No tracking. No nonsense. Just tools that work.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "story" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-bold">From Frustration to Solution</h2>
                  <p className="text-xl text-muted-foreground">
                    Built by a developer who got tired of terrible tool experiences
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-2xl p-8 shadow-refined">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 text-white flex items-center justify-center shrink-0 text-xl font-bold">
                        😤
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">The Problem (2025)</h3>
                        <p className="text-muted-foreground">
                          Needed to format JSON for the 100th time. Opened a popular tool.
                          Waited for ads to load. Data sent to server. Slow. Cluttered. Frustrating.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-8 shadow-refined">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center shrink-0 text-xl font-bold">
                        💡
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">The Idea (Early 2026)</h3>
                        <p className="text-muted-foreground">
                          &quot;What if there was ONE place with ALL the tools developers need? Fast, clean, private.&quot;
                          Started building. One tool. Then ten. Then fifty.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-8 shadow-refined">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 text-white flex items-center justify-center shrink-0 text-xl font-bold">
                        🚀
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">Today (2026)</h3>
                        <p className="text-muted-foreground">
                          160+ tools and growing. Used by developers worldwide. Free forever.
                          Everything runs in your browser—no servers, no tracking, just tools that work.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tech" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-bold">Built with Modern Tech</h2>
                  <p className="text-xl text-muted-foreground">
                    Performance and developer experience are features, not afterthoughts
                  </p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-8 shadow-refined">
                  <h3 className="text-2xl font-bold mb-6">Tech Stack Highlights</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {techHighlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Code className="w-6 h-6 text-blue-400" />
                    Built for Performance
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    Every detail is optimized for speed and user experience. From the initial load
                    to every tool interaction, we prioritize performance without compromising on features
                    or aesthetics. Fast, beautiful, and reliable.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="border-b border-border px-4 sm:px-6 py-20 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Developers Choose OpenKit</h2>
            <p className="text-xl text-muted-foreground">
              Designed for the way you actually work
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 bg-card border border-border rounded-2xl shadow-refined-sm hover:shadow-refined-md transition-all hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${feature.color} text-white rounded-xl mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Support Section */}
      <div className="border-b border-border px-4 sm:px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-2xl mb-8 shadow-refined-lg">
            <Coffee className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-bold mb-6">Love OpenKit? Support the Project</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            OpenKit.tools is free and always will be. If it makes your life easier,
            consider supporting continued development.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://ko-fi.com/ohernandez"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white rounded-xl font-semibold transition-all text-lg shadow-refined-lg group"
            >
              <Coffee className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Buy Me a Coffee
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-8">
            Your support keeps this project alive and growing. Thank you! 💙
          </p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="px-4 sm:px-6 py-20 bg-gradient-to-b from-background to-card/30">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold">
            Ready to Streamline Your Workflow?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of developers who&apos;ve already switched to OpenKit.tools
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-bold transition-all text-xl shadow-refined-lg hover:shadow-refined-xl hover:-translate-y-1 group"
          >
            <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            Start Using OpenKit.tools
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </main>
    </>
  );
}
