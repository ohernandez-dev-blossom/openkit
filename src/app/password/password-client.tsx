"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RelatedTools } from "@/components/related-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { passwordGuideContent } from "@/content/password-guide";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { SHORTCUTS } from "@/lib/keyboard-shortcuts";
const CHAR_SETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"};

// Word list for passphrase generation (common, memorable words)
const WORD_LIST = [
  "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew",
  "kiwi", "lemon", "mango", "nectarine", "orange", "papaya", "quince", "raspberry",
  "strawberry", "tangerine", "watermelon", "apricot", "blackberry", "coconut",
  "dragon", "eagle", "falcon", "giraffe", "horse", "iguana", "jaguar", "koala",
  "lemur", "monkey", "newt", "otter", "panda", "quail", "rabbit", "snake",
  "tiger", "urchin", "vulture", "walrus", "xray", "yak", "zebra", "ant",
  "bear", "cat", "dog", "elephant", "fox", "goat", "hippo", "impala",
  "jellyfish", "kangaroo", "lion", "moose", "narwhal", "owl", "parrot",
  "queen", "raven", "shark", "turtle", "unicorn", "viper", "wolf",
  "azure", "blue", "crimson", "dark", "emerald", "fuchsia", "gold",
  "hazel", "indigo", "jade", "khaki", "lime", "magenta", "navy",
  "olive", "pink", "quartz", "red", "silver", "teal", "ultraviolet",
  "violet", "white", "yellow", "amber", "bronze", "copper", "diamond",
  "amber", "brave", "calm", "daring", "eager", "fair", "gentle", "happy",
  "ideal", "jolly", "kind", "lively", "merry", "noble", "open", "proud",
  "quick", "ready", "safe", "true", "upbeat", "valiant", "wise",
  "young", "zealous", "ancient", "bright", "cool", "deep", "epic",
  "fast", "great", "high", "iron", "just", "keen", "light", "mighty",
  "natural", "ocean", "peaceful", "quiet", "rapid", "strong", "tall",
  "ultimate", "vast", "warm", "extreme", "yielding", "zesty", "alpha",
  "beta", "gamma", "delta", "omega", "sigma", "prime", "core", "base",
  "home", "work", "play", "rest", "flow", "glow", "grow", "show",
  "know", "blow", "snow", "slow", "low", "row", "crow", "prow"
];

function generatePassword(length: number, options: { lowercase: boolean; uppercase: boolean; numbers: boolean; symbols: boolean }): string {
  let chars = "";
  if (options.lowercase) chars += CHAR_SETS.lowercase;
  if (options.uppercase) chars += CHAR_SETS.uppercase;
  if (options.numbers) chars += CHAR_SETS.numbers;
  if (options.symbols) chars += CHAR_SETS.symbols;

  if (!chars) chars = CHAR_SETS.lowercase + CHAR_SETS.uppercase + CHAR_SETS.numbers;

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (x) => chars[x % chars.length]).join("");
}

function generatePassphrase(wordCount: number, options: { includeNumber: boolean; separator: string }): string {
  const array = new Uint32Array(wordCount + (options.includeNumber ? 1 : 0));
  crypto.getRandomValues(array);

  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(WORD_LIST[array[i] % WORD_LIST.length]);
  }

  let passphrase = words.join(options.separator);

  if (options.includeNumber) {
    const number = (array[wordCount] % 900) + 100; // 3-digit number (100-999)
    passphrase += options.separator + number;
  }

  return passphrase;
}
function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  
  if (score <= 2) return { score, label: "Weak", color: "bg-red-500" };
  if (score <= 4) return { score, label: "Fair", color: "bg-yellow-500" };
  if (score <= 5) return { score, label: "Good", color: "bg-blue-500" };
  return { score, label: "Strong", color: "bg-green-500" };
}
export default function PasswordGenerator() {
  useToolTracker("password", "Password Generator", "generators");
  const { isCopied } = useCopyToClipboard({ duration: 1500 });
  const analytics = useAnalytics();

  // Mode: "password" | "passphrase"
  const [mode, setMode] = useState<"password" | "passphrase">("password");

  // Password settings
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true});

  // Passphrase settings
  const [wordCount, setWordCount] = useState(4);
  const [passphraseOptions, setPassphraseOptions] = useState({
    includeNumber: true,
    separator: "-"
  });

  const [password, setPassword] = useState(() => generatePassword(16, { lowercase: true, uppercase: true, numbers: true, symbols: true }));
    const [history, setHistory] = useState<string[]>([]);
  const generate = useCallback(() => {
    let newPassword: string;
    if (mode === "passphrase") {
      newPassword = generatePassphrase(wordCount, passphraseOptions);
      analytics.trackToolUsage('password-generator', {
        action: 'generate',
        mode: 'passphrase',
        wordCount,
        includeNumber: passphraseOptions.includeNumber
      });
    } else {
      newPassword = generatePassword(length, options);
      const strength = getPasswordStrength(newPassword);
      analytics.trackToolUsage('password-generator', {
        action: 'generate',
        mode: 'password',
        length,
        hasLowercase: options.lowercase,
        hasUppercase: options.uppercase,
        hasNumbers: options.numbers,
        hasSymbols: options.symbols,
        strength: strength.label
      });
    }
    setPassword(newPassword);
    setHistory((prev) => [newPassword, ...prev.slice(0, 9)]);
  }, [mode, length, options, wordCount, passphraseOptions, analytics]);
  
  const randomize = () => {
    // Random mode
    const randomMode = Math.random() > 0.5 ? "password" : "passphrase";
    setMode(randomMode);

    if (randomMode === "passphrase") {
      // Random word count 3-6
      const randomWordCount = Math.floor(Math.random() * 4) + 3;
      setWordCount(randomWordCount);
      setPassphraseOptions({
        includeNumber: Math.random() > 0.3,
        separator: ["-", "_", ".", " "][Math.floor(Math.random() * 4)]
      });

      const newPassword = generatePassphrase(randomWordCount, passphraseOptions);
      setPassword(newPassword);
      setHistory((prev) => [newPassword, ...prev.slice(0, 9)]);

      analytics.trackToolInteraction('password-generator', 'randomize', {
        mode: 'passphrase',
        wordCount: randomWordCount
      });
    } else {
      // Random length between 12-32
      const randomLength = Math.floor(Math.random() * 21) + 12;
      setLength(randomLength);

      // Randomly enable options (ensure at least 2 are enabled)
      const opts = ['lowercase', 'uppercase', 'numbers', 'symbols'];
      const enabledCount = Math.floor(Math.random() * 3) + 2; // 2-4 enabled
      const shuffled = opts.sort(() => Math.random() - 0.5);
      const enabled = shuffled.slice(0, enabledCount);

      const newOptions = {
        lowercase: enabled.includes('lowercase'),
        uppercase: enabled.includes('uppercase'),
        numbers: enabled.includes('numbers'),
        symbols: enabled.includes('symbols')};
      setOptions(newOptions);

      // Generate password with new settings
      const newPassword = generatePassword(randomLength, newOptions);
      setPassword(newPassword);
      setHistory((prev) => [newPassword, ...prev.slice(0, 9)]);

      analytics.trackToolInteraction('password-generator', 'randomize', {
        mode: 'password',
        length: randomLength,
        optionsCount: enabledCount
      });
    }
  };
  
  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    analytics.trackToolInteraction('password-generator', 'copy', {
      passwordLength: password.length
    });
  };

  // Keyboard shortcuts
  useKeyboardShortcut(SHORTCUTS.execute, generate, { enabled: true });
  useKeyboardShortcut(SHORTCUTS.copy, copyPassword, { enabled: !!password });

  const strength = getPasswordStrength(password);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center font-bold text-sm hover:opacity-80 transition">
              🔐
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold">Password Generator</h1>
          </div>
          <button
            onClick={randomize}
            aria-label="Generate random password with random settings"
            className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Random</span>
          </button>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Main Password Display */}
        <Card className="bg-card border-border mb-6">
          <CardContent className="pt-6">
            <button 
              onClick={copyPassword}
              aria-label="Copy generated password to clipboard"
              className="w-full p-4 sm:p-6 bg-muted rounded-lg cursor-pointer hover:bg-accent transition"
            >
              <p className="font-mono text-lg sm:text-2xl break-all text-center">{password}</p>
              <p className="text-center text-sm text-muted-foreground mt-2">
                {isCopied ? "Copied!" : "Click to copy"}
              </p>
            </button>
            
            {/* Strength Indicator */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Strength</span>
                <span className={`font-medium ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${strength.color} transition-all`}
                  style={{ width: `${(strength.score / 7) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Mode Toggle */}
        <Card className="bg-card border-border mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-2 p-1 bg-muted rounded-lg" role="group" aria-label="Password generation mode">
              <button
                onClick={() => setMode("password")}
                aria-pressed={mode === "password"}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                  mode === "password"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Random Password
              </button>
              <button
                onClick={() => setMode("passphrase")}
                aria-pressed={mode === "passphrase"}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition ${
                  mode === "passphrase"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Memorable Passphrase
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Options */}
        <Card className="bg-card border-border mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {mode === "password" ? (
              <>
                {/* Length Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Length</span>
                    <span className="text-sm font-mono">{length}</span>
                  </div>
                  <Slider
                    value={[length]}
                    onValueChange={([val]) => setLength(val)}
                    min={4}
                    max={64}
                    step={1}
                    className="[&_[role=slider]]:bg-emerald-500"
                  />
                </div>
                {/* Character Options */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { key: "lowercase", label: "Lowercase (a-z)" },
                    { key: "uppercase", label: "Uppercase (A-Z)" },
                    { key: "numbers", label: "Numbers (0-9)" },
                    { key: "symbols", label: "Symbols (!@#...)" },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={options[key as keyof typeof options]}
                        onCheckedChange={(checked) =>
                          setOptions((prev) => ({ ...prev, [key]: checked }))
                        }
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Word Count Slider */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Number of Words</span>
                    <span className="text-sm font-mono">{wordCount}</span>
                  </div>
                  <Slider
                    value={[wordCount]}
                    onValueChange={([val]) => setWordCount(val)}
                    min={3}
                    max={10}
                    step={1}
                    className="[&_[role=slider]]:bg-emerald-500"
                  />
                </div>
                {/* Separator */}
                <div>
                  <span className="text-sm text-muted-foreground mb-2 block">Separator</span>
                  <div className="flex gap-2">
                    {[
                      { value: "-", label: "Hyphen" },
                      { value: "_", label: "Underscore" },
                      { value: ".", label: "Dot" },
                      { value: " ", label: "Space" },
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => setPassphraseOptions(prev => ({ ...prev, separator: value }))}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm transition ${
                          passphraseOptions.separator === value
                            ? "bg-emerald-600 text-white"
                            : "bg-muted hover:bg-accent"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Include Number */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={passphraseOptions.includeNumber}
                    onCheckedChange={(checked) =>
                      setPassphraseOptions(prev => ({ ...prev, includeNumber: checked === true }))
                    }
                  />
                  <span className="text-sm">Add random number (increases entropy)</span>
                </label>
              </>
            )}
            <Button className="min-h-[44px] w-full bg-emerald-600 hover:bg-emerald-700" onClick={generate} >
              Generate New {mode === "password" ? "Password" : "Passphrase"}
            </Button>
          </CardContent>
        </Card>
        {/* History */}
        {history.length > 0 && (
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {history.map((pw, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      navigator.clipboard.writeText(pw);
                    }}
                    className="p-2 bg-muted rounded text-xs font-mono cursor-pointer hover:bg-accent transition truncate"
                  >
                    {pw}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        <div className="mt-8 p-4 bg-card border border-border rounded-lg">
          <h3 className="font-medium mb-2">{mode === "password" ? "Password Tips" : "Passphrase Tips"}</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            {mode === "password" ? (
              <>
                <p>• Use at least 12 characters for important accounts</p>
                <p>• Mix uppercase, lowercase, numbers, and symbols</p>
                <p>• Never reuse passwords across sites</p>
                <p>• Consider using a password manager</p>
              </>
            ) : (
              <>
                <p>• Passphrases are easier to remember than random passwords</p>
                <p>• Use 4+ words for good security (more = better)</p>
                <p>• Adding a number increases entropy significantly</p>
                <p>• Great for master passwords and password managers</p>
              </>
            )}
          </div>
        </div>

        {/* GEO Content - Professional Design System */}
        <GeoContentLayout>
          {/* Quick Start Guide */}
          <GeoSection
            id="quick-start"
            title="Quick Start Guide"
            subtitle="Create strong passwords in seconds"
            variant="highlight"
          >
            <QuickStartGuide steps={passwordGuideContent.quickStartSteps} />
          </GeoSection>

          {/* Password Security Section */}
          <GeoSection
            id="password-security"
            title={passwordGuideContent.introduction.title}
            subtitle="Understanding password strength and security principles"
            variant="default"
          >
            <MarkdownContent content={passwordGuideContent.introduction.content} />
          </GeoSection>

          {/* Use Cases - Feature Grid */}
          <GeoSection
            id="use-cases"
            title="Common Use Cases"
            subtitle="How to use generated passwords securely"
            variant="default"
          >
            <FeatureGrid
              features={passwordGuideContent.useCases.map(uc => ({
                title: uc.title,
                description: uc.description
              }))}
              columns={2}
            />
          </GeoSection>

          {/* How to Use This Tool */}
          <GeoSection
            id="how-to-use"
            title={passwordGuideContent.howToUse.title}
            subtitle="Master password generation and best practices"
            variant="minimal"
          >
            <HowToSchema
              name={`How to use ${passwordGuideContent.toolName}`}
              description="Step-by-step guide to generating secure passwords"
              steps={passwordGuideContent.howToUse.steps}
              toolUrl={`https://openkit.tools${passwordGuideContent.toolPath}`}
            />
            <MarkdownContent content={passwordGuideContent.howToUse.content} />
          </GeoSection>

          {/* FAQ */}
          <GeoSection
            id="faq"
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about password security"
            variant="default"
          >
            <ToolFAQ faqs={passwordGuideContent.faqs} />
          </GeoSection>

          {/* Security & Privacy */}
          <GeoSection
            id="security"
            title={passwordGuideContent.security.title}
            subtitle="Your passwords never leave your browser"
            variant="highlight"
          >
            <MarkdownContent content={passwordGuideContent.security.content} />
          </GeoSection>

          {/* Statistics - Stats Bar */}
          {passwordGuideContent.stats && (
            <GeoSection
              id="stats"
              title="By the Numbers"
              subtitle="Password generation capabilities and security metrics"
              variant="minimal"
            >
              <StatsBar
                stats={Object.entries(passwordGuideContent.stats).map(([label, value]) => ({
                  label,
                  value
                }))}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        {/* Related Tools */}
        <RelatedTools currentPath="/password" />

        {/* Last Updated */}
        <LastUpdated date={passwordGuideContent.lastUpdated} />
      </div>
      <footer className="border-t border-border px-4 sm:px-6 py-4 mt-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
          <p>Generate secure passwords. All processing happens in your browser.</p>
          <p className="mt-2">
            <Link href="/" className="hover:text-foreground transition">← Back to tools</Link>
          </p>
        </div>
      </footer>

      <StructuredData
        type="WebApplication"
        name="Password Generator | OpenKit.tools"
        description="Generate secure random passwords with customizable length and character types. Create strong passwords instantly for maximum security."
        url="https://openkit.tools/password"
        applicationCategory="SecurityApplication"
        datePublished="2024-01-15"
        dateModified={passwordGuideContent.lastUpdated}
        version={passwordGuideContent.version}
        aggregateRating={{
          ratingValue: "4.9",
          ratingCount: "3215",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: 'https://openkit.tools' },
          { name: 'Password Generator', url: 'https://openkit.tools/password' },
        ]}
      />
    </main>
  );
}
