"use client";

import Link from "next/link";
import { Home, Search, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Easter egg: Konami code detection
    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];

    let sequence: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      sequence = [...sequence, e.key].slice(-10);

      // Check if konami code matches
      if (
        sequence.length === 10 &&
        sequence.every((key, i) => key === konamiCode[i])
      ) {
        triggerEasterEgg();
        sequence = [];
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerEasterEgg = () => {
    // Party mode!
    document.body.classList.add("konami-party");
    const colors = [
      "#3b82f6",
      "#8b5cf6",
      "#ec4899",
      "#f59e0b",
      "#10b981",
      "#06b6d4",
    ];
    let colorIndex = 0;

    const interval = setInterval(() => {
      document.body.style.setProperty(
        "--easter-egg-color",
        colors[colorIndex % colors.length]
      );
      colorIndex++;
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      document.body.classList.remove("konami-party");
    }, 5000);
  };

  if (!mounted) return null;

  const funMessages = [
    "This tool is still under construction! 🚧",
    "404: Tool not found in our toolkit... yet! 🔧",
    "Looks like this URL needs some debugging 🐛",
    "This page got lost in the cloud ☁️",
    "Error 404: Tool escaped! Last seen heading toward /base64 🏃",
  ];

  const randomMessage =
    funMessages[Math.floor(Math.random() * funMessages.length)];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 animate-pulse" />

      {/* Gradient orb effect */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        {/* 404 with hammer animation */}
        <div className="relative">
          <div className="text-[120px] md:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 leading-none select-none">
            4
            <span className="inline-block animate-swing">
              <Hammer className="w-20 md:w-32 h-20 md:h-32 inline-block mx-2 text-blue-500" />
            </span>
            4
          </div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs md:text-sm font-mono text-muted-foreground animate-bounce">
            OOPS!
          </div>
        </div>

        {/* Fun message */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            {randomMessage}
          </p>
          <p className="text-sm text-muted-foreground/70">
            Try the konami code for a surprise! ⬆⬆⬇⬇⬅➡⬅➡BA
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="group">
            <Link href="/">
              <Home className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/#search">
              <Search className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Search Tools
            </Link>
          </Button>
        </div>

        {/* Quick links to popular tools */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground/70 mb-4">
            Or try one of these popular tools:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { href: "/json", label: "JSON Formatter" },
              { href: "/base64", label: "Base64" },
              { href: "/colors", label: "Color Converter" },
              { href: "/regex", label: "Regex Tester" },
              { href: "/uuid", label: "UUID Generator" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-lg transition-all hover:scale-105"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-30px) scale(1.1);
          }
        }

        @keyframes swing {
          0%,
          100% {
            transform: rotate(-10deg);
          }
          50% {
            transform: rotate(10deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-swing {
          animation: swing 1s ease-in-out infinite;
        }

        .konami-party {
          animation: rainbow 0.2s infinite;
        }

        @keyframes rainbow {
          0% {
            filter: hue-rotate(0deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }

        .bg-grid-pattern {
          background-image: linear-gradient(#27272a 1px, transparent 1px),
            linear-gradient(90deg, #27272a 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
}
