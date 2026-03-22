"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Copy, Trash2, Minimize2, Maximize2, FileCode } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { PinButton } from "@/components/pin-button";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { SHORTCUTS } from "@/lib/keyboard-shortcuts";
import { useToolTracker } from "@/hooks/use-tool-tracker";

type IndentStyle = "2" | "4" | "tab";

function formatJavaScript(code: string, indentStyle: IndentStyle): string {
  const indent = indentStyle === "tab" ? "\t" : " ".repeat(Number(indentStyle));
  let result = "";
  let depth = 0;
  let inString: string | null = null;
  let inTemplate = false;
  let inLineComment = false;
  let inBlockComment = false;
  let i = 0;

  const addNewline = () => {
    result = result.trimEnd();
    result += "\n" + indent.repeat(depth);
  };

  while (i < code.length) {
    const ch = code[i];
    const next = code[i + 1];

    // Line comments
    if (!inString && !inBlockComment && ch === "/" && next === "/") {
      inLineComment = true;
      result += "//";
      i += 2;
      continue;
    }
    if (inLineComment) {
      if (ch === "\n") {
        inLineComment = false;
        addNewline();
      } else {
        result += ch;
      }
      i++;
      continue;
    }

    // Block comments
    if (!inString && !inLineComment && ch === "/" && next === "*") {
      inBlockComment = true;
      result += "/*";
      i += 2;
      continue;
    }
    if (inBlockComment) {
      if (ch === "*" && next === "/") {
        inBlockComment = false;
        result += "*/";
        i += 2;
      } else {
        result += ch;
        i++;
      }
      continue;
    }

    // Template literals
    if (!inString && ch === "`") {
      inTemplate = !inTemplate;
      result += ch;
      i++;
      continue;
    }
    if (inTemplate) {
      result += ch;
      i++;
      continue;
    }

    // Strings
    if (!inString && (ch === '"' || ch === "'")) {
      inString = ch;
      result += ch;
      i++;
      continue;
    }
    if (inString) {
      result += ch;
      if (ch === inString && code[i - 1] !== "\\") {
        inString = null;
      }
      i++;
      continue;
    }

    // Opening braces/brackets
    if (ch === "{" || ch === "[" || ch === "(") {
      result += ch;
      depth++;
      addNewline();
      i++;
      continue;
    }

    // Closing braces/brackets
    if (ch === "}" || ch === "]" || ch === ")") {
      depth = Math.max(0, depth - 1);
      addNewline();
      result += ch;
      i++;
      continue;
    }

    // Semicolons
    if (ch === ";") {
      result += ";";
      if (next && next !== "\n" && next !== "}" && next !== ")") {
        addNewline();
      }
      i++;
      continue;
    }

    // Commas
    if (ch === ",") {
      result += ",";
      addNewline();
      i++;
      continue;
    }

    // Skip existing whitespace/newlines (we control indentation)
    if (ch === "\n" || ch === "\r") {
      i++;
      continue;
    }

    // Collapse multiple spaces
    if (ch === " " || ch === "\t") {
      if (result.length > 0 && !result.endsWith(" ") && !result.endsWith("\n") && !result.endsWith(indent)) {
        result += " ";
      }
      i++;
      continue;
    }

    result += ch;
    i++;
  }

  // Clean up: remove excessive blank lines
  return result
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function minifyJavaScript(code: string): string {
  let result = "";
  let inString: string | null = null;
  let inTemplate = false;
  let inLineComment = false;
  let inBlockComment = false;
  let i = 0;

  while (i < code.length) {
    const ch = code[i];
    const next = code[i + 1];

    if (!inString && !inBlockComment && !inTemplate && ch === "/" && next === "/") {
      inLineComment = true;
      i += 2;
      continue;
    }
    if (inLineComment) {
      if (ch === "\n") inLineComment = false;
      i++;
      continue;
    }

    if (!inString && !inLineComment && !inTemplate && ch === "/" && next === "*") {
      inBlockComment = true;
      i += 2;
      continue;
    }
    if (inBlockComment) {
      if (ch === "*" && next === "/") {
        inBlockComment = false;
        i += 2;
      } else {
        i++;
      }
      continue;
    }

    if (!inString && ch === "`") {
      inTemplate = !inTemplate;
      result += ch;
      i++;
      continue;
    }
    if (inTemplate) {
      result += ch;
      i++;
      continue;
    }

    if (!inString && (ch === '"' || ch === "'")) {
      inString = ch;
      result += ch;
      i++;
      continue;
    }
    if (inString) {
      result += ch;
      if (ch === inString && code[i - 1] !== "\\") inString = null;
      i++;
      continue;
    }

    if (ch === "\n" || ch === "\r") {
      if (result.length > 0 && !result.endsWith(" ") && !result.endsWith(";") && !result.endsWith("{") && !result.endsWith("}")) {
        result += " ";
      }
      i++;
      continue;
    }

    if (ch === " " || ch === "\t") {
      if (result.length > 0 && !result.endsWith(" ") && !result.endsWith("\n")) {
        const prev = result[result.length - 1];
        const isNeeded = /[a-zA-Z0-9_$]/.test(prev) && next && /[a-zA-Z0-9_$]/.test(next);
        if (isNeeded) result += " ";
      }
      i++;
      continue;
    }

    result += ch;
    i++;
  }

  return result.trim();
}

const EXAMPLES = [
  {
    name: "Function",
    code: `function greet(name,options){const greeting=options&&options.formal?"Dear "+name:"Hey "+name;if(options&&options.excited){return greeting+"!!";}return greeting+".";}`,
  },
  {
    name: "Arrow/Object",
    code: `const config={api:{baseUrl:"https://api.example.com",timeout:5000,retries:3},auth:{token:null,refreshToken:null},features:{darkMode:true,notifications:false,beta:true}};const fetchData=async(url,opts)=>{const response=await fetch(url,{...opts,headers:{"Content-Type":"application/json",...opts.headers}});return response.json();};`,
  },
  {
    name: "Class",
    code: `class EventEmitter{constructor(){this.events={};}on(event,listener){if(!this.events[event]){this.events[event]=[];}this.events[event].push(listener);return this;}emit(event,...args){if(this.events[event]){this.events[event].forEach(listener=>listener(...args));}return this;}off(event,listener){if(this.events[event]){this.events[event]=this.events[event].filter(l=>l!==listener);}return this;}}`,
  },
];

export default function JsFormat() {
  useToolTracker("js-format", "JavaScript Formatter", "formatters");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [indentStyle, setIndentStyle] = useState<IndentStyle>("2");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const doFormat = useCallback(() => {
    setError(null);
    if (!input.trim()) {
      setOutput("");
      return;
    }
    try {
      setOutput(formatJavaScript(input, indentStyle));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Formatting error");
    }
  }, [input, indentStyle]);

  const doMinify = useCallback(() => {
    setError(null);
    if (!input.trim()) {
      setOutput("");
      return;
    }
    try {
      setOutput(minifyJavaScript(input));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Minification error");
    }
  }, [input]);

  const copyOutput = useCallback(async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  const clearAll = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
  }, []);

  useKeyboardShortcut(SHORTCUTS.copy, copyOutput);
  useKeyboardShortcut(SHORTCUTS.clear, clearAll);

  const inputLines = input.split("\n").length;
  const outputLines = output.split("\n").length;
  const savings = input.length > 0 && output.length > 0
    ? Math.round((1 - output.length / input.length) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <StructuredData
        type="WebApplication"
        name="JavaScript Formatter & Beautifier"
        description="Format, beautify, and minify JavaScript code with configurable indentation."
        url="https://openkit.tools/js-format"
        applicationCategory="DeveloperApplication"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://openkit.tools" },
          { name: "JavaScript Formatter", url: "https://openkit.tools/js-format" },
        ]}
      />

      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Code className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">JavaScript Formatter</h1>
              <p className="text-xs text-muted-foreground">Beautify & minify JavaScript</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <PinButton toolHref="/js-format" />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">        {/* Controls */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Indent:</span>
            {(["2", "4", "tab"] as IndentStyle[]).map((style) => (
              <Button
                key={style}
                variant={indentStyle === style ? "default" : "outline"}
                size="sm"
                onClick={() => setIndentStyle(style)}
              >
                {style === "tab" ? "Tab" : `${style} spaces`}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Examples:</span>
            {EXAMPLES.map((ex) => (
              <Button
                key={ex.name}
                variant="outline"
                size="sm"
                onClick={() => {
                  setInput(ex.code);
                  setOutput("");
                  setError(null);
                }}
              >
                <FileCode className="w-3 h-3 mr-1" />
                {ex.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Input */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Input JavaScript
                {input.trim() && (
                  <span className="font-normal text-muted-foreground ml-2">
                    {input.length.toLocaleString()} chars · {inputLines} lines
                  </span>
                )}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAll}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste JavaScript code here..."
                className="min-h-[300px] font-mono text-sm resize-none bg-muted/50"
                spellCheck={false}
              />
            </CardContent>
          </Card>

          {/* Output */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Output
                {output && (
                  <span className="font-normal text-muted-foreground ml-2">
                    {output.length.toLocaleString()} chars · {outputLines} lines
                    {savings !== 0 && (
                      <span className={savings > 0 ? "text-green-400" : "text-amber-400"}>
                        {" "}({savings > 0 ? "-" : "+"}{Math.abs(savings)}%)
                      </span>
                    )}
                  </span>
                )}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={copyOutput} disabled={!output}>
                <Copy className="w-4 h-4 mr-1" />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea
                value={output}
                readOnly
                placeholder="Formatted output will appear here..."
                className="min-h-[300px] font-mono text-sm resize-none bg-muted/50"
                spellCheck={false}
              />
              {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3">
          <Button onClick={doFormat} size="lg" disabled={!input.trim()}>
            <Maximize2 className="w-4 h-4 mr-2" />
            Format / Beautify
          </Button>
          <Button onClick={doMinify} size="lg" variant="secondary" disabled={!input.trim()}>
            <Minimize2 className="w-4 h-4 mr-2" />
            Minify
          </Button>
        </div>

        {/* Guide */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">About JavaScript Formatting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Format and beautify minified or messy JavaScript code with proper indentation
              and line breaks. Minify code by removing whitespace and comments for smaller file sizes.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-foreground mb-1">Beautifier Features</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Configurable indentation (2/4 spaces or tabs)</li>
                  <li>Handles strings, template literals, comments</li>
                  <li>Smart brace/bracket formatting</li>
                  <li>Preserves string content exactly</li>
                  <li>Works with ES6+, arrow functions, classes</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Minifier Features</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Remove comments (line & block)</li>
                  <li>Strip unnecessary whitespace</li>
                  <li>Preserve required spaces (keywords)</li>
                  <li>Keep string content intact</li>
                  <li>Show size reduction percentage</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <RelatedTools currentPath="/js-format" />
      </div>
    </main>
  );
}
