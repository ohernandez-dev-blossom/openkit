"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { HowToSchema } from "@/components/seo/howto-schema";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { AlertCircle, Check, Copy, Trash, Wand2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { codeFormatterGuideContent } from "@/content/code-formatter-guide";

type Language = "html" | "css" | "javascript" | "json" | "sql";

interface FormatResult {
  formatted: string;
  error?: string;
}

function formatHTML(code: string): FormatResult {
  try {
    let formatted = code;
    let indent = 0;
    const indentSize = 2;
    
    // Simple HTML formatter
    formatted = formatted
      .replace(/>\s*</g, ">\n<")
      .split("\n")
      .map((line) => {
        line = line.trim();
        if (!line) return "";
        
        // Decrease indent for closing tags
        if (line.match(/^<\/\w/)) {
          indent = Math.max(0, indent - 1);
        }
        
        const result = " ".repeat(indent * indentSize) + line;
        
        // Increase indent for opening tags (not self-closing)
        if (line.match(/^<\w/) && !line.match(/\/>$/) && !line.match(/<\/.*>$/)) {
          indent++;
        }
        
        return result;
      })
      .filter(Boolean)
      .join("\n");
    
    return { formatted };
  } catch (_error) {
    return { formatted: code, error: "Failed to format HTML" };
  }
}

function formatCSS(code: string): FormatResult {
  try {
    const formatted = code
      .replace(/\s*{\s*/g, " {\n  ")
      .replace(/;\s*/g, ";\n  ")
      .replace(/\s*}\s*/g, "\n}\n\n")
      .replace(/:\s+/g, ": ")
      .replace(/,\s*/g, ", ")
      .trim();
    
    return { formatted };
  } catch (_error) {
    return { formatted: code, error: "Failed to format CSS" };
  }
}

function formatJavaScript(code: string): FormatResult {
  try {
    let formatted = code
      // Add newlines after semicolons
      .replace(/;\s*/g, ";\n")
      // Add spaces around operators
      .replace(/([=+\-*/<>!])+/g, " $1 ")
      .replace(/\s+/g, " ")
      // Fix spacing
      .replace(/\s*;\s*/g, "; ")
      .replace(/\s*,\s*/g, ", ")
      // Add newlines before/after braces
      .replace(/\s*{\s*/g, " {\n")
      .replace(/\s*}\s*/g, "\n}\n")
      .trim();
    
    // Simple indentation
    const lines = formatted.split("\n");
    let indent = 0;
    const indentSize = 2;
    
    formatted = lines
      .map((line) => {
        line = line.trim();
        if (!line) return "";
        
        if (line.startsWith("}")) {
          indent = Math.max(0, indent - 1);
        }
        
        const result = " ".repeat(indent * indentSize) + line;
        
        if (line.endsWith("{")) {
          indent++;
        }
        
        return result;
      })
      .filter(Boolean)
      .join("\n");
    
    return { formatted };
  } catch (_error) {
    return { formatted: code, error: "Failed to format JavaScript" };
  }
}

function formatJSON(code: string): FormatResult {
  try {
    const parsed = JSON.parse(code);
    return { formatted: JSON.stringify(parsed, null, 2) };
  } catch (error) {
    return { formatted: code, error: "Invalid JSON: " + (error as Error).message };
  }
}

function formatSQL(code: string): FormatResult {
  try {
    const keywords = [
      "SELECT", "FROM", "WHERE", "INSERT", "UPDATE", "DELETE",
      "JOIN", "LEFT", "RIGHT", "INNER", "OUTER", "ON", "GROUP BY",
      "ORDER BY", "HAVING", "LIMIT", "OFFSET", "UNION", "VALUES",
      "CREATE", "TABLE", "ALTER", "DROP", "INDEX"
    ];
    
    let formatted = code;
    
    // Newline before keywords
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      formatted = formatted.replace(regex, `\n${keyword}`);
    });
    
    // Clean up
    formatted = formatted
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .join("\n")
      .replace(/\n+/g, "\n")
      .trim();
    
    return { formatted };
  } catch (_error) {
    return { formatted: code, error: "Failed to format SQL" };
  }
}

function formatCode(code: string, language: Language): FormatResult {
  switch (language) {
    case "html":
      return formatHTML(code);
    case "css":
      return formatCSS(code);
    case "javascript":
      return formatJavaScript(code);
    case "json":
      return formatJSON(code);
    case "sql":
      return formatSQL(code);
    default:
      return { formatted: code };
  }
}

export default function CodeFormatter() {
  useToolTracker("code-formatter", "Code Formatter", "developer");
  const analytics = useAnalytics();
  const { copy, isCopied } = useCopyToClipboard();
  
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState<Language>("json");
  const [error, setError] = useState<string | null>(null);
  
  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter some code to format");
      return;
    }
    
    const result = formatCode(input, language);
    
    if (result.error) {
      setError(result.error);
      setOutput("");
    } else {
      setOutput(result.formatted);
      setError(null);
      
      analytics.trackToolUsage("code-formatter", {
        action: "format",
        language,
        inputLength: input.length,
      });
    }
  }, [input, language, analytics]);
  
  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    analytics.trackToolInteraction("code-formatter", "clear");
  };
  
  const handleCopy = () => {
    if (output) {
      copy(output);
      analytics.trackToolInteraction("code-formatter", "copy");
    }
  };
  
  const handleSample = () => {
    const samples: Record<Language, string> = {
      html: `<!DOCTYPE html><html><head><title>Example</title></head><body><div class="container"><h1>Hello World</h1><p>This is a paragraph.</p></div></body></html>`,
      css: `.container {max-width:1200px;margin:0 auto;padding:20px;}h1{color:#333;font-size:2rem;}p{line-height:1.6;}`,
      javascript: `function greet(name){if(!name){return"Hello, World!";}return"Hello, "+name+"!";}const result=greet("Developer");console.log(result);`,
      json: `{"name":"John Doe","age":30,"email":"john@example.com","address":{"street":"123 Main St","city":"New York"},"hobbies":["reading","coding","gaming"]}}`,
      sql: `SELECT users.id, users.name, orders.total FROM users JOIN orders ON users.id=orders.user_id WHERE orders.total>100 GROUP BY users.id ORDER BY orders.total DESC LIMIT 10;`,
    };
    
    setInput(samples[language]);
    setOutput("");
    setError(null);
    analytics.trackToolInteraction("code-formatter", "sample", { language });
  };
  
  return (
    <main className="min-h-screen bg-background text-foreground">
      <StructuredData
        type="WebApplication"
        name="Code Formatter & Beautifier"
        description="Free online code formatter for HTML, CSS, JavaScript, JSON, and SQL"
        url="https://openkit.tools/code-formatter"
        applicationCategory="DeveloperApplication"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://openkit.tools" },
          { name: "Code Formatter", url: "https://openkit.tools/code-formatter" },
        ]}
      />
      <HowToSchema
        name="How to Format Code Online"
        description="Step-by-step guide to beautify your code using our free online formatter"
        steps={codeFormatterGuideContent.quickStartSteps.map((step, index) => ({
          name: step.title,
          text: step.description,
          position: index + 1,
        }))}
      />
      
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Code Formatter & Beautifier</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Clean up and beautify your code instantly. Supports HTML, CSS, JavaScript, JSON, and SQL.
          </p>
        </div>
        
        {/* Language Selector */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="w-full sm:w-48">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="sql">SQL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" onClick={handleSample}>
                  Load Sample
                </Button>
                <Button variant="outline" size="sm" onClick={handleClear}>
                  <Trash className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Input/Output */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Input</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Paste your ${language.toUpperCase()} code here...`}
                className="min-h-[400px] font-mono text-sm"
              />
            </CardContent>
          </Card>
          
          {/* Output */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Formatted Output</CardTitle>
              {output && (
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {isCopied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  {isCopied ? "Copied!" : "Copy"}
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {error ? (
                <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <p className="text-sm">{error}</p>
                </div>
              ) : output ? (
                <Textarea
                  value={output}
                  readOnly
                  className="min-h-[400px] font-mono text-sm bg-muted"
                />
              ) : (
                <div className="min-h-[400px] flex items-center justify-center text-muted-foreground border rounded-lg bg-muted/50">
                  <p>Formatted code will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Format Button */}
        <div className="mt-6 text-center">
          <Button size="lg" onClick={handleFormat} className="min-w-[200px]">
            <Wand2 className="w-5 h-5 mr-2" />
            Format Code
          </Button>
        </div>
        
        {/* Features */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Multi-Language Support</h3>
              <p className="text-sm text-muted-foreground">
                Format HTML, CSS, JavaScript, JSON, and SQL with a single tool.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Instant Formatting</h3>
              <p className="text-sm text-muted-foreground">
                Get beautifully formatted code with proper indentation in milliseconds.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                All formatting happens in your browser. Your code never leaves your device.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Related Tools */}
        <div className="mt-16">
          <RelatedTools
            currentPath="/code-formatter"
          />
        </div>
      </div>
    </main>
  );
}
