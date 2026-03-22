"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, RefreshCcw, Shield, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid } from "@/components/geo-content-layout";

// Dynamic import bcrypt to avoid SSR issues
let bcrypt: typeof import("bcryptjs") | null = null;

async function getBcrypt() {
  if (!bcrypt) {
    bcrypt = await import("bcryptjs");
  }
  return bcrypt;
}

const SALT_ROUNDS_INFO = [
  { value: 8, label: "8", time: "~0.05s", desc: "Fast (testing)" },
  { value: 10, label: "10", time: "~0.1s", desc: "Standard" },
  { value: 12, label: "12", time: "~0.4s", desc: "Recommended" },
  { value: 14, label: "14", time: "~1.6s", desc: "High security" },
  { value: 16, label: "16", time: "~6s", desc: "Maximum" },
] as const;

export default function BcryptTool() {
  useToolTracker("bcrypt", "Bcrypt Hash Generator", "generators");
  const { isCopied: isHashCopied, copy: copyHash } = useCopyToClipboard({ duration: 2000 });
  const analytics = useAnalytics();

  const [password, setPassword] = useState("");
  const [saltRounds, setSaltRounds] = useState(12);
  const [hash, setHash] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [comparePassword, setComparePassword] = useState("");
  const [compareHash, setCompareHash] = useState("");
  const [compareResult, setCompareResult] = useState<boolean | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  const handleGenerate = useCallback(async () => {
    if (!password) return;

    setIsGenerating(true);
    try {
      const bcryptLib = await getBcrypt();
      const generatedHash = await bcryptLib.hash(password, saltRounds);
      setHash(generatedHash);
      analytics.trackToolUsage("bcrypt", { action: "generate", rounds: saltRounds });
    } catch {
      setHash("Error: Failed to generate hash");
    } finally {
      setIsGenerating(false);
    }
  }, [password, saltRounds, analytics]);

  const handleCompare = useCallback(async () => {
    if (!comparePassword || !compareHash) return;

    setIsComparing(true);
    try {
      const bcryptLib = await getBcrypt();
      const match = await bcryptLib.compare(comparePassword, compareHash);
      setCompareResult(match);
      analytics.trackToolUsage("bcrypt", { action: "compare", result: match });
    } catch {
      setCompareResult(false);
    } finally {
      setIsComparing(false);
    }
  }, [comparePassword, compareHash, analytics]);

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    const length = 16;
    let result = "";
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);
    for (let i = 0; i < length; i++) {
      result += chars[randomValues[i] % chars.length];
    }
    setPassword(result);
    setHash("");
    analytics.trackToolInteraction("bcrypt", "random-password", {});
  };

  useKeyboardShortcut(
    { key: "Enter", ctrl: true, meta: true, description: "Generate hash" },
    handleGenerate,
    { enabled: !!password && !isGenerating }
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <StructuredData 
        type="WebApplication" 
        name="Bcrypt Hash Generator" 
        description="Generate secure bcrypt password hashes with customizable salt rounds. Verify passwords against existing hashes."
        applicationCategory="DeveloperApplication"
        url="https://openkit.tools/bcrypt"
      />
      <BreadcrumbStructuredData items={[
        { name: "Home", url: "/" },
        { name: "Bcrypt Hash Generator", url: "/bcrypt" }
      ]} />

      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-semibold">Bcrypt Hash Generator</h1>
          </div>
          <LastUpdated date="2026-02-05" />
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <QuickStartGuide
          steps={[
            { icon: "edit", title: "Enter Password", description: "Type or generate a password" },
            { icon: "settings", title: "Set Salt Rounds", description: "Choose 12 for production" },
            { icon: "copy", title: "Get Hash", description: "Copy the bcrypt hash" },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Generate Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lock className="w-5 h-5" />
                Generate Hash
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Password</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={generateRandomPassword}
                    className="h-7 text-xs"
                  >
                    <RefreshCcw className="mr-1 h-3 w-3" />
                    Random
                  </Button>
                </div>
                <Input
                  type="text"
                  placeholder="Enter password to hash..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setHash("");
                  }}
                  className="font-mono"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Salt Rounds: {saltRounds}</label>
                  <span className="text-xs text-muted-foreground">
                    {SALT_ROUNDS_INFO.find((s) => s.value === saltRounds)?.desc}
                  </span>
                </div>
                <Slider
                  value={[saltRounds]}
                  onValueChange={(value) => setSaltRounds(value[0])}
                  min={8}
                  max={16}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  {SALT_ROUNDS_INFO.map((info) => (
                    <button
                      key={info.value}
                      onClick={() => setSaltRounds(info.value)}
                      className={`px-2 py-1 rounded ${saltRounds === info.value ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                    >
                      {info.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !password}
                className="w-full"
              >
                <Lock className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate Bcrypt Hash"}
              </Button>

              {hash && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Generated Hash</label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyHash(hash)}
                      disabled={hash.startsWith("Error")}
                    >
                      <Copy className="mr-1 h-3 w-3" />
                      {isHashCopied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <Textarea
                    value={hash}
                    readOnly
                    className={`font-mono text-xs min-h-[80px] ${hash.startsWith("Error") ? "border-red-500" : "bg-green-50/50 dark:bg-green-950/20"}`}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Compare Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Verify Password
                </div>
                <Switch
                  checked={showCompare}
                  onCheckedChange={setShowCompare}
                  aria-label="Toggle verify section"
                />
              </CardTitle>
            </CardHeader>
            {showCompare && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password to Verify</label>
                  <Input
                    type="text"
                    placeholder="Enter password..."
                    value={comparePassword}
                    onChange={(e) => {
                      setComparePassword(e.target.value);
                      setCompareResult(null);
                    }}
                    className="font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Bcrypt Hash</label>
                  <Textarea
                    placeholder="$2a$12$..."
                    value={compareHash}
                    onChange={(e) => {
                      setCompareHash(e.target.value);
                      setCompareResult(null);
                    }}
                    className="font-mono text-xs min-h-[80px]"
                  />
                </div>

                <Button
                  onClick={handleCompare}
                  disabled={isComparing || !comparePassword || !compareHash}
                  variant="outline"
                  className="w-full"
                >
                  {isComparing ? "Verifying..." : "Verify Password"}
                </Button>

                {compareResult !== null && (
                  <div className={`flex items-center justify-center gap-2 p-3 rounded-md ${compareResult ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"}`}>
                    {compareResult ? (
                      <>
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Password matches!</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-5 w-5" />
                        <span className="font-medium">Password does not match</span>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        </div>

        <RelatedTools currentPath="/bcrypt" maxVisible={8} />
      </section>

      <GeoContentLayout>
        <GeoSection title="What is Bcrypt?">
          <MarkdownContent content={`Bcrypt is a password hashing function designed by Niels Provos and David Mazières in 1999. 
It's based on the Blowfish cipher and includes a salt to protect against rainbow table attacks. 
Bcrypt is adaptive, meaning you can increase the iteration count (salt rounds) over time to 
make it slower and more resistant to brute-force attacks as computers get faster.`} />
        </GeoSection>

        <GeoSection title="How to Use">
          <FeatureGrid features={[
            { title: "1. Enter Password", description: "Type or generate a password you want to hash" },
            { title: "2. Choose Salt Rounds", description: "Select 12 for production use, 10 for development" },
            { title: "3. Generate Hash", description: "Click the button to create your bcrypt hash" },
            { title: "4. Verify (Optional)", description: "Use the verify section to test password matching" },
          ]} />
        </GeoSection>

        <GeoSection title="Salt Rounds Explained">
          <MarkdownContent content={`Salt rounds determine how many times the hashing algorithm iterates. More rounds = more secure but slower:

- **8-10 rounds:** Good for development and testing (fast)
- **12 rounds:** Recommended for production (balanced security/performance)
- **14+ rounds:** Maximum security (slower, use for highly sensitive applications)`} />
        </GeoSection>

        <HowToSchema
          name="How to Generate Bcrypt Hashes"
          description="Generate secure bcrypt password hashes for your applications"
          steps={[
            { name: "Enter Password", text: "Type or generate a password to hash" },
            { name: "Choose Salt Rounds", text: "Select 12 rounds for production use" },
            { name: "Generate Hash", text: "Click the button to create your bcrypt hash" },
            { name: "Copy and Store", text: "Copy the hash to your database or configuration" },
          ]}
        />

        <LastUpdated date="2026-02-05" />
      </GeoContentLayout>
    </main>
  );
}
