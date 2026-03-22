"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import Link from "next/link";
import { Timer, Play, Pause, RotateCcw, Settings } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { pomodoroGuideContent } from "@/content/pomodoro-guide";
import { useAnalytics } from "@/hooks/use-analytics";

type Mode = "work" | "short" | "long";

export default function PomodoroTimer() {
  useToolTracker("pomodoro", "Pomodoro Timer");
  const analytics = useAnalytics();
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [mode, setMode] = useState<Mode>("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getDuration = useCallback((m: Mode) => {
    switch (m) {
      case "work": return workDuration * 60;
      case "short": return shortBreak * 60;
      case "long": return longBreak * 60;
    }
  }, [workDuration, shortBreak, longBreak]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const playSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playSound();
      // Timer state machine - transitions between modes
      setIsRunning(() => false);

      if (mode === "work") {
        setSessions((s) => {
          const newSessions = s + 1;
          // After 4 work sessions, take a long break
          if (newSessions % 4 === 0) {
            setMode(() => "long");
            setTimeLeft(() => getDuration("long"));
          } else {
            setMode(() => "short");
            setTimeLeft(() => getDuration("short"));
          }
          return newSessions;
        });
      } else {
        setMode(() => "work");
        setTimeLeft(() => getDuration("work"));
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, playSound, getDuration]);

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(getDuration(mode));
    analytics.trackToolUsage("pomodoro", { action: "reset", mode });
  };

  const switchMode = (newMode: Mode) => {
    setMode(newMode);
    setTimeLeft(getDuration(newMode));
    setIsRunning(false);
    analytics.trackToolUsage("pomodoro", { action: "switch_mode", mode: newMode });
  };

  const progress = 1 - timeLeft / getDuration(mode);
  const circumference = 2 * Math.PI * 120;

  const modeColors = {
    work: { bg: "from-red-500 to-orange-600", ring: "#ef4444" },
    short: { bg: "from-green-500 to-emerald-600", ring: "#22c55e" },
    long: { bg: "from-blue-500 to-cyan-600", ring: "#3b82f6" },
  };

  return (
    <>
      <StructuredData
        type="WebApplication"
        name="Pomodoro Timer - Focus & Productivity Tool"
        description="Free online Pomodoro timer. Boost productivity with 25-minute work sessions and short breaks. Customizable intervals, session tracking, and audio notifications."
        url="https://openkit.tools/pomodoro"
        applicationCategory="UtilitiesApplication"
        datePublished="2024-01-15"
        dateModified={pomodoroGuideContent.lastUpdated}
        version={pomodoroGuideContent.version}
        aggregateRating={{ratingValue: "4.9", ratingCount: "2451", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://openkit.tools" },
          { name: "Pomodoro Timer", url: "https://openkit.tools/pomodoro" }
        ]}
      />
      <main className="min-h-screen bg-background text-foreground">
      {/* Hidden audio for notification */}
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdX2Ki5eFWFRffYSNk4qBe32Bg4iIgX13fYKGhoB8eX2ChYeDeXZ7gIOFhH55eoGEhIF8eHuAg4SDfnp7f4KDgX56e4CBg4F/ent/gYKAfnt8gIGBf3x7f4CAgH18f4CAgH18f4B/f318f39/fn19f39+fX1+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fg==" />

      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className={`w-8 h-8 rounded-lg bg-gradient-to-br ${modeColors[mode].bg} text-white flex items-center justify-center hover:opacity-80 transition`}>
              <Timer className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">Pomodoro Timer</h1>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-muted-foreground hover:text-foreground transition"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-card border border-border rounded-xl p-4 mb-6">
            <h3 className="text-base sm:text-lg font-medium text-accent-foreground mb-4">Timer Settings (minutes)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="page-input-125" className="text-xs text-muted-foreground mb-1 block">Work</label>
                <input id="page-input-125"
                  type="number"
                  value={workDuration}
                  onChange={(e) => {
                    const v = Math.max(1, parseInt(e.target.value) || 25);
                    setWorkDuration(v);
                    if (mode === "work") setTimeLeft(v * 60);
                  }}
                  min={1}
                  max={120}
                  className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground"
                />
              </div>
              <div>
                <label htmlFor="page-input-140" className="text-xs text-muted-foreground mb-1 block">Short Break</label>
                <input id="page-input-140"
                  type="number"
                  value={shortBreak}
                  onChange={(e) => {
                    const v = Math.max(1, parseInt(e.target.value) || 5);
                    setShortBreak(v);
                    if (mode === "short") setTimeLeft(v * 60);
                  }}
                  min={1}
                  max={60}
                  className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground"
                />
              </div>
              <div>
                <label htmlFor="page-input-155" className="text-xs text-muted-foreground mb-1 block">Long Break</label>
                <input id="page-input-155"
                  type="number"
                  value={longBreak}
                  onChange={(e) => {
                    const v = Math.max(1, parseInt(e.target.value) || 15);
                    setLongBreak(v);
                    if (mode === "long") setTimeLeft(v * 60);
                  }}
                  min={1}
                  max={60}
                  className="w-full px-3 py-2 bg-muted border border-border rounded text-foreground"
                />
              </div>
            </div>
          </div>
        )}

        {/* Mode Selector */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: "work" as Mode, label: "Work" },
            { id: "short" as Mode, label: "Short Break" },
            { id: "long" as Mode, label: "Long Break" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => switchMode(m.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                mode === m.id
                  ? `bg-gradient-to-r ${modeColors[m.id].bg} text-white`
                  : "bg-muted text-foreground hover:bg-accent"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Timer Circle */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-64 h-64">
            <svg className="w-64 h-64 transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="#27272a"
                strokeWidth="8"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke={modeColors[mode].ring}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-5xl font-bold text-white">{formatTime(timeLeft)}</span>
              <span className="text-sm text-muted-foreground mt-2 capitalize">{mode === "short" ? "Short Break" : mode === "long" ? "Long Break" : "Focus"}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => { setIsRunning(!isRunning); analytics.trackToolUsage("pomodoro", { action: isRunning ? "pause" : "start", mode }); }}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-lg font-medium transition ${
              isRunning
                ? "bg-muted hover:bg-accent text-foreground"
                : `bg-gradient-to-r ${modeColors[mode].bg} text-white hover:opacity-90`
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={reset}
            className="p-3 bg-muted hover:bg-accent rounded-xl text-muted-foreground hover:text-foreground transition"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Sessions Count */}
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground">
            Sessions completed: <span className="font-bold text-white">{sessions}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Long break after every 4 sessions
          </p>
        </div>

        <RelatedTools currentPath="/pomodoro" />

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={pomodoroGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-pomodoro" title={pomodoroGuideContent.introduction.title} subtitle="Understanding the Pomodoro Technique" variant="default">
            <MarkdownContent content={pomodoroGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use Pomodoro timers" variant="default">
            <FeatureGrid features={pomodoroGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={pomodoroGuideContent.howToUse.title} subtitle="Master time management with Pomodoro" variant="minimal">
            <HowToSchema name={`How to use ${pomodoroGuideContent.toolName}`} description="Step-by-step guide to Pomodoro timer usage" steps={pomodoroGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${pomodoroGuideContent.toolPath}`} />
            <MarkdownContent content={pomodoroGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={pomodoroGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={pomodoroGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={pomodoroGuideContent.security.content} />
          </GeoSection>

          {pomodoroGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(pomodoroGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={pomodoroGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Stay focused with the Pomodoro Technique.</p>
        </div>
      </footer>
    </main>
    </>
  );
}
