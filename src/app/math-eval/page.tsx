"use client";
import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Calculator, Copy, RotateCcw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";

const CONSTANTS: Record<string, number> = {
  PI: Math.PI,
  E: Math.E,
  TAU: Math.PI * 2,
  PHI: (1 + Math.sqrt(5)) / 2,
  SQRT2: Math.SQRT2,
  LN2: Math.LN2,
  LN10: Math.LN10,
};

const FUNCTIONS: Record<string, (x: number) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  sqrt: Math.sqrt,
  cbrt: Math.cbrt,
  abs: Math.abs,
  ceil: Math.ceil,
  floor: Math.floor,
  round: Math.round,
  log: Math.log,
  log2: Math.log2,
  log10: Math.log10,
  exp: Math.exp,
  sign: Math.sign,
  trunc: Math.trunc,
};

const FUNCTIONS2: Record<string, (a: number, b: number) => number> = {
  pow: Math.pow,
  min: Math.min,
  max: Math.max,
  mod: (a, b) => ((a % b) + b) % b,
};

function tokenize(expr: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < expr.length) {
    if (/\s/.test(expr[i])) { i++; continue; }
    // Numbers (decimal, hex, binary, scientific)
    if (/[\d.]/.test(expr[i]) || (expr[i] === '0' && i + 1 < expr.length && /[xXbB]/.test(expr[i + 1]))) {
      let num = '';
      if (expr[i] === '0' && i + 1 < expr.length && /[xX]/.test(expr[i + 1])) {
        num = expr[i] + expr[i + 1]; i += 2;
        while (i < expr.length && /[0-9a-fA-F]/.test(expr[i])) num += expr[i++];
      } else if (expr[i] === '0' && i + 1 < expr.length && /[bB]/.test(expr[i + 1])) {
        num = expr[i] + expr[i + 1]; i += 2;
        while (i < expr.length && /[01]/.test(expr[i])) num += expr[i++];
      } else {
        while (i < expr.length && /[\d.]/.test(expr[i])) num += expr[i++];
        if (i < expr.length && /[eE]/.test(expr[i])) {
          num += expr[i++];
          if (i < expr.length && /[+-]/.test(expr[i])) num += expr[i++];
          while (i < expr.length && /\d/.test(expr[i])) num += expr[i++];
        }
      }
      tokens.push(num);
      continue;
    }
    // Identifiers (functions, constants, variables)
    if (/[a-zA-Z_]/.test(expr[i])) {
      let id = '';
      while (i < expr.length && /[a-zA-Z0-9_]/.test(expr[i])) id += expr[i++];
      tokens.push(id);
      continue;
    }
    // Operators
    if ('+-*/%^()!,'.includes(expr[i])) {
      // ** for power
      if (expr[i] === '*' && i + 1 < expr.length && expr[i + 1] === '*') {
        tokens.push('**'); i += 2; continue;
      }
      // Factorial
      if (expr[i] === '!') {
        tokens.push('!'); i++; continue;
      }
      tokens.push(expr[i]); i++; continue;
    }
    throw new Error(`Unexpected character: '${expr[i]}'`);
  }
  return tokens;
}

function parseNumber(s: string): number {
  if (s.startsWith('0x') || s.startsWith('0X')) return parseInt(s, 16);
  if (s.startsWith('0b') || s.startsWith('0B')) return parseInt(s.slice(2), 2);
  return parseFloat(s);
}

function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) throw new Error("Factorial requires non-negative integer");
  if (n > 170) return Infinity;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

// Recursive descent parser
function evaluate(expr: string, vars: Record<string, number>): number {
  const tokens = tokenize(expr);
  let pos = 0;

  function peek(): string | undefined { return tokens[pos]; }
  function next(): string { return tokens[pos++]; }
  function expect(t: string) {
    if (next() !== t) throw new Error(`Expected '${t}'`);
  }

  function parseExpr(): number {
    let left = parseTerm();
    while (peek() === '+' || peek() === '-') {
      const op = next();
      const right = parseTerm();
      left = op === '+' ? left + right : left - right;
    }
    return left;
  }

  function parseTerm(): number {
    let left = parseUnary();
    while (peek() === '*' || peek() === '/' || peek() === '%') {
      const op = next();
      const right = parseUnary();
      if (op === '*') left *= right;
      else if (op === '/') { if (right === 0) throw new Error("Division by zero"); left /= right; }
      else left %= right;
    }
    return left;
  }

  function parseUnary(): number {
    if (peek() === '-') { next(); return -parsePower(); }
    if (peek() === '+') { next(); return parsePower(); }
    return parsePower();
  }

  function parsePower(): number {
    let base = parsePostfix();
    if (peek() === '**' || peek() === '^') {
      next();
      const exp = parseUnary(); // Right associative
      base = Math.pow(base, exp);
    }
    return base;
  }

  function parsePostfix(): number {
    let val = parsePrimary();
    while (peek() === '!') {
      next();
      val = factorial(val);
    }
    return val;
  }

  function parsePrimary(): number {
    const t = peek();
    if (!t) throw new Error("Unexpected end of expression");

    // Parenthesized expression
    if (t === '(') {
      next();
      const val = parseExpr();
      expect(')');
      return val;
    }

    // Number
    if (/^[\d.]/.test(t) || t.startsWith('0x') || t.startsWith('0X') || t.startsWith('0b') || t.startsWith('0B')) {
      return parseNumber(next());
    }

    // Identifier: function, constant, or variable
    if (/^[a-zA-Z_]/.test(t)) {
      const id = next();

      // Function call
      if (peek() === '(') {
        next(); // consume (
        const args: number[] = [];
        if (peek() !== ')') {
          args.push(parseExpr());
          while (peek() === ',') { next(); args.push(parseExpr()); }
        }
        expect(')');

        if (id in FUNCTIONS) {
          if (args.length !== 1) throw new Error(`${id}() expects 1 argument`);
          return FUNCTIONS[id](args[0]);
        }
        if (id in FUNCTIONS2) {
          if (args.length !== 2) throw new Error(`${id}() expects 2 arguments`);
          return FUNCTIONS2[id](args[0], args[1]);
        }
        throw new Error(`Unknown function: ${id}`);
      }

      // Constant
      if (id in CONSTANTS) return CONSTANTS[id];

      // Variable
      if (id in vars) return vars[id];

      throw new Error(`Unknown identifier: ${id}`);
    }

    throw new Error(`Unexpected token: ${t}`);
  }

  const result = parseExpr();
  if (pos < tokens.length) throw new Error(`Unexpected token: ${tokens[pos]}`);
  return result;
}

interface LineResult {
  input: string;
  output: string;
  isComment: boolean;
  isAssignment: boolean;
  isError: boolean;
  varName?: string;
}

function evaluateLines(input: string): { results: LineResult[]; variables: Record<string, number> } {
  const lines = input.split('\n');
  const variables: Record<string, number> = {};
  const results: LineResult[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      results.push({ input: line, output: "", isComment: false, isAssignment: false, isError: false });
      continue;
    }

    // Comment
    if (trimmed.startsWith('//') || trimmed.startsWith('#')) {
      results.push({ input: line, output: "", isComment: true, isAssignment: false, isError: false });
      continue;
    }

    // Variable assignment: x = expr
    const assignMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
    if (assignMatch) {
      try {
        const val = evaluate(assignMatch[2], variables);
        variables[assignMatch[1]] = val;
        results.push({
          input: line,
          output: formatNumber(val),
          isComment: false,
          isAssignment: true,
          isError: false,
          varName: assignMatch[1],
        });
      } catch (e) {
        results.push({ input: line, output: (e as Error).message, isComment: false, isAssignment: true, isError: true });
      }
      continue;
    }

    // Expression
    try {
      const val = evaluate(trimmed, variables);
      variables["ans"] = val;
      results.push({ input: line, output: formatNumber(val), isComment: false, isAssignment: false, isError: false });
    } catch (e) {
      results.push({ input: line, output: (e as Error).message, isComment: false, isAssignment: false, isError: true });
    }
  }

  return { results, variables };
}

function formatNumber(n: number): string {
  if (Number.isNaN(n)) return "NaN";
  if (!Number.isFinite(n)) return n > 0 ? "Infinity" : "-Infinity";
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString("en-US");
  // Show up to 12 significant digits
  const s = n.toPrecision(12);
  // Remove trailing zeros after decimal
  if (s.includes('.')) return s.replace(/\.?0+$/, '');
  return s;
}

const sampleInput = `// Basic arithmetic
2 + 3 * 4
(10 - 2) ** 3

// Variables
radius = 5
area = PI * radius ^ 2

// Functions
sqrt(144)
sin(PI / 4)
log2(1024)

// Hex & binary
0xFF + 0b1010
5!`;

export default function MathEvalPage() {
  useToolTracker("math-eval", "Math Expression Evaluator");
  const { trackEvent } = useAnalytics();
  const { copy, isCopied } = useCopyToClipboard();
  const [input, setInput] = useState(sampleInput);
  const [showVars, setShowVars] = useState(true);

  const { results, variables } = useMemo(() => evaluateLines(input), [input]);

  const outputText = results.map((r) => r.output).join("\n");

  const handleCopy = useCallback(() => {
    const out = results.filter(r => r.output && !r.isError).map(r => `${r.input.trim()} = ${r.output}`).join("\n");
    copy(out);
    trackEvent("tool_interaction", "copy", { lines: results.length });
  }, [results, copy, trackEvent]);

  const varEntries = Object.entries(variables).filter(([k]) => k !== "ans");

  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="WebApplication"
        name="Math Expression Evaluator"
        description="Evaluate mathematical expressions with variables, functions, and constants. Multi-line support with hex, binary, and scientific notation."
        url="https://openkit.tools/math-eval"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://openkit.tools" },
          { name: "Math Evaluator", url: "https://openkit.tools/math-eval" },
        ]}
      />
      <HowToSchema
        name="How to evaluate math expressions"
        description="Evaluate mathematical expressions with variables, functions, and multi-line support"
        steps={[
          { name: "Enter expressions", text: "Type math expressions, one per line. Use // for comments." },
          { name: "Use variables", text: "Assign values with x = 5, then use them in later expressions." },
          { name: "View results", text: "Results appear in real-time on the right side." },
        ]}
        toolUrl="https://openkit.tools/math-eval"
      />

      <main className="container mx-auto px-3 sm:px-6 py-4 sm:py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Math Evaluator</span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-violet-500/10">
              <Calculator className="w-6 h-6 text-violet-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">Math Expression Evaluator</h1>
          </div>
          <p className="text-muted-foreground">
            Evaluate expressions with variables, functions (sin, cos, sqrt, log), constants (PI, E), hex, binary, factorials, and more.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="w-3.5 h-3.5 mr-1" />
            {isCopied ? "Copied!" : "Copy Results"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => setInput(sampleInput)}>
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Load Example
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowVars(!showVars)}>
            {showVars ? "Hide" : "Show"} Variables
          </Button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Expressions</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type math expressions, one per line..."
              className="font-mono text-sm min-h-[420px] resize-y"
              spellCheck={false}
            />
          </div>
          {/* Output */}
          <div>
            <label className="block text-sm font-medium mb-2">Results</label>
            <div className="font-mono text-sm min-h-[420px] p-3 rounded-md border bg-muted/30 overflow-auto">
              {results.map((r, i) => (
                <div key={i} className="flex justify-between py-0.5 min-h-[1.5em]">
                  <span className={r.isComment ? "text-muted-foreground italic" : "text-muted-foreground truncate mr-4"}>
                    {r.isComment ? r.input.trim() : (r.input.trim() || "\u00A0")}
                  </span>
                  {!r.isComment && r.output && (
                    <span className={`font-semibold whitespace-nowrap ${r.isError ? "text-red-500" : "text-foreground"}`}>
                      {r.isAssignment && r.varName ? `${r.varName} = ` : "= "}
                      {r.output}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Variables Panel */}
        {showVars && varEntries.length > 0 && (
          <div className="mb-8 p-3 rounded-lg border bg-card">
            <h3 className="text-sm font-medium mb-2">Variables</h3>
            <div className="flex flex-wrap gap-3">
              {varEntries.map(([name, val]) => (
                <span key={name} className="text-sm font-mono px-2 py-1 rounded bg-muted">
                  {name} = {formatNumber(val)}
                </span>
              ))}
              {variables.ans !== undefined && (
                <span className="text-sm font-mono px-2 py-1 rounded bg-primary/10 text-primary">
                  ans = {formatNumber(variables.ans)}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Reference */}
        <div className="mb-8 p-4 rounded-lg border bg-card">
          <h3 className="text-sm font-semibold mb-3">Quick Reference</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-1">Operators</h4>
              <div className="text-muted-foreground space-y-0.5">
                <div><code>+ - * /</code> arithmetic</div>
                <div><code>** ^</code> power</div>
                <div><code>%</code> modulo</div>
                <div><code>!</code> factorial</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-1">Functions</h4>
              <div className="text-muted-foreground space-y-0.5">
                <div><code>sin cos tan</code></div>
                <div><code>sqrt cbrt abs</code></div>
                <div><code>log log2 log10</code></div>
                <div><code>pow(a,b) min max</code></div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-1">Constants</h4>
              <div className="text-muted-foreground space-y-0.5">
                <div><code>PI</code> = {Math.PI.toFixed(6)}</div>
                <div><code>E</code> = {Math.E.toFixed(6)}</div>
                <div><code>TAU</code> = {(Math.PI * 2).toFixed(6)}</div>
                <div><code>PHI</code> = {((1 + Math.sqrt(5)) / 2).toFixed(6)}</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-1">Formats</h4>
              <div className="text-muted-foreground space-y-0.5">
                <div><code>0xFF</code> hexadecimal</div>
                <div><code>0b1010</code> binary</div>
                <div><code>1.5e3</code> scientific</div>
                <div><code>{'// #'}</code> comments</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        <QuickStartGuide
          title="How to use the Math Evaluator"
          steps={[
            { title: "Type expressions", description: "Enter math expressions, one per line. Results update in real-time." },
            { title: "Use variables", description: "Assign with x = 5, then reference in later lines: x * 2" },
            { title: "Use functions", description: "Call sin(x), sqrt(x), pow(a,b), etc. Use PI, E constants." },
          ]}
        />

        {/* FAQ */}
        <ToolFAQ
          faqs={[
            { question: "What operators are supported?", answer: "Addition (+), subtraction (-), multiplication (*), division (/), modulo (%), power (** or ^), and factorial (!). Standard operator precedence applies." },
            { question: "Can I define variables?", answer: "Yes! Use 'name = expression' syntax. Variables persist across lines, so you can build up complex calculations step by step." },
            { question: "What number formats are supported?", answer: "Decimal (3.14), hexadecimal (0xFF), binary (0b1010), and scientific notation (1.5e3). All are evaluated to regular numbers." },
            { question: "Is this safe?", answer: "100% client-side with a custom math parser. No eval() or code execution — just pure arithmetic parsing." },
          ]}
        />

        {/* Related Tools */}
        <RelatedTools currentPath="/math-eval" />

        <LastUpdated date="2026-02-06" />
      </main>
    </div>
  );
}
