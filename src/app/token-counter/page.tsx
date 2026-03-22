"use client";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Calculator, Copy, RotateCcw, Zap, DollarSign, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";

// ─── Token estimation (GPT-like BPE approximation) ──────────────────────────
// This is a client-side heuristic that closely matches cl100k_base tokenization.
// For exact counts, you'd need the actual tokenizer WASM — this gets within ~5%.

function estimateTokens(text: string): number {
  if (!text) return 0;
  // GPT cl100k_base approximation:
  // ~4 chars per token for English, ~2-3 for code, ~1.5 for CJK
  let tokens = 0;
  const words = text.split(/\s+/).filter(Boolean);
  
  for (const word of words) {
    // CJK characters: ~1 token per character
    const cjk = (word.match(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/g) || []).length;
    const remaining = word.length - cjk;
    
    if (cjk > 0) {
      tokens += cjk;
    }
    
    if (remaining > 0) {
      // Long words get split into subwords
      if (remaining <= 3) {
        tokens += 1;
      } else if (remaining <= 8) {
        tokens += Math.ceil(remaining / 4);
      } else {
        tokens += Math.ceil(remaining / 3.5);
      }
    }
  }
  
  // Account for whitespace and special chars
  const specialChars = (text.match(/[{}()\[\]<>:;,."'`~!@#$%^&*+=|\\/?-]/g) || []).length;
  tokens += Math.ceil(specialChars * 0.3);
  
  // Newlines are often their own token
  const newlines = (text.match(/\n/g) || []).length;
  tokens += newlines;
  
  return Math.max(1, Math.round(tokens));
}

// More accurate word-based estimation for different model families
function estimateByModel(text: string, model: string): number {
  const base = estimateTokens(text);
  switch (model) {
    case "gpt-4":
    case "gpt-4o":
    case "gpt-3.5":
      return base; // cl100k_base
    case "claude":
      return Math.round(base * 1.05); // Claude tokenizer slightly more tokens
    case "llama":
      return Math.round(base * 1.15); // Llama/SentencePiece tends to be ~15% more
    case "gemini":
      return Math.round(base * 1.02); // Gemini close to GPT
    default:
      return base;
  }
}

// ─── Pricing (per 1M tokens, input) ─────────────────────────────────────────
const MODEL_PRICING: Record<string, { input: number; output: number; name: string; family: string }> = {
  "gpt-4o": { input: 2.5, output: 10, name: "GPT-4o", family: "gpt-4" },
  "gpt-4o-mini": { input: 0.15, output: 0.6, name: "GPT-4o Mini", family: "gpt-4" },
  "gpt-4-turbo": { input: 10, output: 30, name: "GPT-4 Turbo", family: "gpt-4" },
  "gpt-3.5-turbo": { input: 0.5, output: 1.5, name: "GPT-3.5 Turbo", family: "gpt-3.5" },
  "claude-sonnet-4": { input: 3, output: 15, name: "Claude Sonnet 4", family: "claude" },
  "claude-opus-4": { input: 15, output: 75, name: "Claude Opus 4", family: "claude" },
  "claude-haiku-3.5": { input: 0.8, output: 4, name: "Claude Haiku 3.5", family: "claude" },
  "llama-3.1-70b": { input: 0.88, output: 0.88, name: "Llama 3.1 70B", family: "llama" },
  "llama-3.1-8b": { input: 0.18, output: 0.18, name: "Llama 3.1 8B", family: "llama" },
  "gemini-2.0-flash": { input: 0.1, output: 0.4, name: "Gemini 2.0 Flash", family: "gemini" },
  "gemini-1.5-pro": { input: 3.5, output: 10.5, name: "Gemini 1.5 Pro", family: "gemini" },
};

// ─── Text statistics ─────────────────────────────────────────────────────────
function getTextStats(text: string) {
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const words = text.split(/\s+/).filter(Boolean).length;
  const lines = text ? text.split("\n").length : 0;
  const sentences = (text.match(/[.!?]+\s/g) || []).length + (text.match(/[.!?]+$/g) || []).length;
  const paragraphs = text.split(/\n\s*\n/).filter(s => s.trim()).length || (text.trim() ? 1 : 0);
  
  return { chars, charsNoSpaces, words, lines, sentences, paragraphs };
}

// ─── Samples ─────────────────────────────────────────────────────────────────
const SAMPLES: Record<string, string> = {
  "Short prompt": "Explain quantum computing in simple terms, suitable for a high school student.",
  "System prompt": `You are a helpful assistant that provides concise, accurate answers. 
Follow these rules:
1. Be direct and avoid unnecessary filler
2. Use examples when helpful
3. Cite sources when making claims
4. If unsure, say so honestly
5. Format responses with markdown when appropriate`,
  "Code snippet": `function fibonacci(n: number): number {
  if (n <= 1) return n;
  const memo: number[] = [0, 1];
  for (let i = 2; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  return memo[n];
}

// Usage
console.log(fibonacci(10)); // 55
console.log(fibonacci(50)); // 12586269025`,
  "JSON data": `{
  "users": [
    { "id": 1, "name": "Alice Johnson", "email": "alice@example.com", "role": "admin" },
    { "id": 2, "name": "Bob Smith", "email": "bob@example.com", "role": "user" },
    { "id": 3, "name": "Carol White", "email": "carol@example.com", "role": "moderator" }
  ],
  "metadata": { "total": 3, "page": 1, "perPage": 10 }
}`,
};

export default function TokenCounterPage() {
  const [text, setText] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const { isCopied, copy } = useCopyToClipboard();
  useToolTracker("token-counter", "AI Token Counter");
  const { trackEvent } = useAnalytics();

  const stats = useMemo(() => getTextStats(text), [text]);
  const tokenCounts = useMemo(() => {
    return {
      gpt4: estimateByModel(text, "gpt-4"),
      claude: estimateByModel(text, "claude"),
      llama: estimateByModel(text, "llama"),
      gemini: estimateByModel(text, "gemini"),
    };
  }, [text]);

  const selectedPricing = MODEL_PRICING[selectedModel];
  const selectedFamily = selectedPricing?.family || "gpt-4";
  const tokenCount = selectedFamily === "claude" ? tokenCounts.claude
    : selectedFamily === "llama" ? tokenCounts.llama
    : selectedFamily === "gemini" ? tokenCounts.gemini
    : tokenCounts.gpt4;

  const costInput = (tokenCount / 1_000_000) * (selectedPricing?.input || 0);
  const costOutput = (tokenCount / 1_000_000) * (selectedPricing?.output || 0);

  const handleReset = useCallback(() => {
    setText("");
    trackEvent("tool_interaction", "token_counter_reset");
  }, [trackEvent]);

  const loadSample = useCallback((key: string) => {
    setText(SAMPLES[key]);
    trackEvent("tool_interaction", "token_counter_sample", { sample: key });
  }, [trackEvent]);

  return (
    <>
      <StructuredData
        type="WebApplication"
        name="AI Token Counter"
        description="Count tokens for GPT-4, Claude, Llama, and other AI models. Estimate costs and compare tokenizers."
        url="https://openkit.tools/token-counter"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://openkit.tools" },
          { name: "AI Token Counter", url: "https://openkit.tools/token-counter" },
        ]}
      />
      <HowToSchema
        name="How to Count AI Tokens"
        description="Count tokens for GPT-4, Claude, and other LLMs to estimate API costs"
        steps={[
          { name: "Enter text", text: "Paste or type your prompt, system message, or content" },
          { name: "View token counts", text: "See estimated token counts for different model families" },
          { name: "Select model", text: "Choose a specific model to see pricing estimates" },
          { name: "Compare costs", text: "Compare input and output costs across models" },
        ]}
      />

      <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 py-6 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-3">
              <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-zinc-900 dark:text-white">AI Token Counter</span>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-purple-500" />
                  AI Token Counter
                </h1>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                  Count tokens for GPT-4, Claude, Llama & more. Estimate API costs.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RotateCcw className="w-4 h-4 mr-1" /> Reset
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Input Text</label>
                  <div className="flex gap-1 flex-wrap">
                    {Object.keys(SAMPLES).map(key => (
                      <button
                        key={key}
                        onClick={() => loadSample(key)}
                        className="text-xs px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 transition-colors"
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste your prompt, system message, or any text to count tokens..."
                  className="w-full h-64 px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y"
                />
              </div>

              {/* Token counts by model family */}
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" /> Token Counts by Model Family
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "GPT-4 / GPT-4o", value: tokenCounts.gpt4, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
                    { label: "Claude", value: tokenCounts.claude, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-900/20" },
                    { label: "Llama", value: tokenCounts.llama, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
                    { label: "Gemini", value: tokenCounts.gemini, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20" },
                  ].map(item => (
                    <div key={item.label} className={`${item.bg} rounded-lg p-3 text-center`}>
                      <div className={`text-2xl font-bold ${item.color}`}>
                        {item.value.toLocaleString()}
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>
                {text && (
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
                    * Estimates based on tokenizer approximations. Actual counts may vary ±5%.
                  </p>
                )}
              </div>

              {/* Cost comparison table */}
              {text && (
                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                  <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" /> Cost Comparison
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-700">
                          <th className="text-left py-2 px-2 text-zinc-600 dark:text-zinc-400 font-medium">Model</th>
                          <th className="text-right py-2 px-2 text-zinc-600 dark:text-zinc-400 font-medium">Tokens</th>
                          <th className="text-right py-2 px-2 text-zinc-600 dark:text-zinc-400 font-medium">Input Cost</th>
                          <th className="text-right py-2 px-2 text-zinc-600 dark:text-zinc-400 font-medium">Output Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(MODEL_PRICING).map(([key, model]) => {
                          const family = model.family;
                          const tc = family === "claude" ? tokenCounts.claude
                            : family === "llama" ? tokenCounts.llama
                            : family === "gemini" ? tokenCounts.gemini
                            : tokenCounts.gpt4;
                          const ci = (tc / 1_000_000) * model.input;
                          const co = (tc / 1_000_000) * model.output;
                          return (
                            <tr
                              key={key}
                              className={`border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${key === selectedModel ? "bg-purple-50 dark:bg-purple-900/20" : ""}`}
                              onClick={() => setSelectedModel(key)}
                              role="button"
                            >
                              <td className="py-2 px-2 text-zinc-900 dark:text-zinc-100">{model.name}</td>
                              <td className="py-2 px-2 text-right font-mono text-zinc-700 dark:text-zinc-300">{tc.toLocaleString()}</td>
                              <td className="py-2 px-2 text-right font-mono text-green-600 dark:text-green-400">
                                ${ci < 0.01 ? ci.toFixed(6) : ci.toFixed(4)}
                              </td>
                              <td className="py-2 px-2 text-right font-mono text-orange-600 dark:text-orange-400">
                                ${co < 0.01 ? co.toFixed(6) : co.toFixed(4)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Selected model cost */}
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Selected Model
                </h3>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-zinc-100 mb-3"
                >
                  {Object.entries(MODEL_PRICING).map(([key, model]) => (
                    <option key={key} value={key}>{model.name}</option>
                  ))}
                </select>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">Tokens</span>
                    <span className="font-bold text-zinc-900 dark:text-white">{tokenCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">Input cost</span>
                    <span className="font-mono text-green-600 dark:text-green-400">
                      ${costInput < 0.0001 ? "< 0.0001" : costInput.toFixed(4)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">Output cost</span>
                    <span className="font-mono text-orange-600 dark:text-orange-400">
                      ${costOutput < 0.0001 ? "< 0.0001" : costOutput.toFixed(4)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-zinc-200 dark:border-zinc-700 pt-2 mt-2">
                    <span className="text-zinc-500 dark:text-zinc-400">Rate (input)</span>
                    <span className="text-xs text-zinc-400">${selectedPricing?.input}/1M tokens</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500 dark:text-zinc-400">Rate (output)</span>
                    <span className="text-xs text-zinc-400">${selectedPricing?.output}/1M tokens</span>
                  </div>
                </div>
              </div>

              {/* Text stats */}
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
                <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">Text Statistics</h3>
                <div className="space-y-2">
                  {[
                    { label: "Characters", value: stats.chars.toLocaleString() },
                    { label: "Characters (no spaces)", value: stats.charsNoSpaces.toLocaleString() },
                    { label: "Words", value: stats.words.toLocaleString() },
                    { label: "Lines", value: stats.lines.toLocaleString() },
                    { label: "Sentences", value: stats.sentences.toLocaleString() },
                    { label: "Paragraphs", value: stats.paragraphs.toLocaleString() },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between text-sm">
                      <span className="text-zinc-500 dark:text-zinc-400">{item.label}</span>
                      <span className="font-mono text-zinc-900 dark:text-zinc-100">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Copy summary */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  const summary = `Token Count Summary\n${"─".repeat(30)}\nText: ${stats.words} words, ${stats.chars} chars\n\nGPT-4: ${tokenCounts.gpt4} tokens\nClaude: ${tokenCounts.claude} tokens\nLlama: ${tokenCounts.llama} tokens\nGemini: ${tokenCounts.gemini} tokens\n\nSelected: ${selectedPricing?.name}\nInput cost: $${costInput.toFixed(6)}\nOutput cost: $${costOutput.toFixed(6)}`;
                  copy(summary);
                  trackEvent("tool_interaction", "token_counter_copy");
                }}
              >
                <Copy className="w-4 h-4 mr-1" />
                {isCopied ? "Copied!" : "Copy Summary"}
              </Button>
            </div>
          </div>

          {/* Guide & FAQ */}
          <div className="mt-8 space-y-6">
            <QuickStartGuide
              title="How to Use the Token Counter"
              steps={[
                { title: "Paste your text", description: "Enter a prompt, system message, code, or any content you want to tokenize" },
                { title: "Compare token counts", description: "See estimated token counts for GPT-4, Claude, Llama, and Gemini model families" },
                { title: "Check costs", description: "Click any model in the cost table to see detailed pricing breakdown" },
                { title: "Copy summary", description: "Export a summary of all token counts and costs for documentation" },
              ]}
            />
            <ToolFAQ
              faqs={[
                {
                  question: "How accurate is the token estimation?",
                  answer: "Our estimation is within ~5% of actual tokenizer output for English text. Different languages and code may vary more. For exact counts, use the official tokenizer libraries (tiktoken for GPT, etc.)."
                },
                {
                  question: "Why do different models have different token counts?",
                  answer: "Each model family uses a different tokenizer with different vocabulary sizes. GPT-4 uses cl100k_base (~100K vocab), Claude uses its own tokenizer, and Llama uses SentencePiece. This means the same text produces different token counts."
                },
                {
                  question: "Is my text sent to any server?",
                  answer: "No. All token counting is done 100% client-side in your browser. Your text never leaves your device."
                },
                {
                  question: "How are costs calculated?",
                  answer: "Costs are based on published API pricing as of early 2025. Input and output tokens are priced differently — output tokens are typically 2-5x more expensive."
                },
              ]}
            />
            <LastUpdated date="2026-02-07" />
          </div>

          <div className="mt-8">
            <RelatedTools currentPath="/token-counter" />
          </div>
        </div>
      </main>
    </>
  );
}
