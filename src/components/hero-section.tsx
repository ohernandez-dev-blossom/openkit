"use client";

import { Shield, Zap, Heart, Code, Search, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { tools } from "@/lib/tool-registry";

export function HeroSection() {
  const toolCount = tools.length;

  const scrollToTools = () => {
    document.getElementById("tools-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchClick = () => {
    const searchInput = document.querySelector<HTMLInputElement>(
      'input[type="text"][placeholder*="Search"]'
    );
    if (searchInput) {
      searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => searchInput.focus(), 600);
    }
  };

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex flex-col overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-[200px] -left-[200px] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-[120px] animate-hero-orb-1" />
        <div className="absolute -bottom-[200px] -right-[200px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-600/15 to-pink-600/15 blur-[120px] animate-hero-orb-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-[100px] animate-hero-orb-3" />
      </div>

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Navbar */}
      <nav className="relative z-30 w-full px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              OpenKit.tools
            </span>
          </Link>

          {/* Center Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={scrollToTools}
              className="text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1"
            >
              Tools
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <Link
              href="/about"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="/blog"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSearchClick}
              className="p-2 text-white/50 hover:text-white transition-colors"
              aria-label="Search tools"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={scrollToTools}
              className="hidden sm:block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white text-sm font-medium rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
            >
              Browse Tools
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8">
            <span className="text-sm text-white/90">
              {toolCount}+ Free Tools
            </span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-sm text-white/90">Client-Side Processing</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Free Online Tools
            <br className="hidden sm:block" />
            {" "}Built for{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Everyone
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Format, convert, generate, and validate — all in your browser. No
            data collected, no tracking, free to use.
          </p>

          {/* CTA Button */}
          <button
            onClick={scrollToTools}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
          >
            Explore Tools
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Features Grid */}
      <div className="relative z-10 px-4 sm:px-6 pb-8 sm:pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "Client-Side Processing",
                  desc: "All tools run 100% in your browser — your data never leaves your device",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Instant Access",
                  desc: "Jump straight to any tool. AI-powered features available with a free account",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: <Heart className="w-6 h-6" />,
                  title: "Always Free",
                  desc: `${toolCount}+ tools, zero cost. AI features include a generous free tier`,
                  gradient: "from-pink-500 to-rose-500",
                },
                {
                  icon: <Code className="w-6 h-6" />,
                  title: "Open Development",
                  desc: "Built transparently with community feedback and regular updates",
                  gradient: "from-green-500 to-emerald-500",
                },
              ].map((feature) => (
                <div key={feature.title} className="flex flex-col gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
