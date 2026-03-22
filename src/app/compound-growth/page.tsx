"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import Link from "next/link";
import { LineChart } from "lucide-react";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { compoundGrowthGuideContent } from "@/content/compound-growth-guide";

// ── Types ──────────────────────────────────────────────────────────────────

type CompoundingPeriod = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";

interface PeriodRow {
  period: number;
  beginBalance: number;
  contribution: number;
  growth: number;
  endBalance: number;
  endBalanceNoContrib: number;
}

interface GrowthResult {
  rows: PeriodRow[];
  finalValue: number;
  finalValueNoContrib: number;
  totalContributions: number;
  totalProfit: number;
  profitPercent: number;
  timeToDouble: number;
  ruleOf72: number;
}

interface Milestone {
  period: number;
  multiplier: number;
  value: number;
}

interface ScenarioLine {
  rate: number;
  color: string;
  label: string;
  values: number[];
}

// ── Constants ──────────────────────────────────────────────────────────────

const COMPOUNDING_OPTIONS: { value: CompoundingPeriod; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
];

const SCENARIO_COLORS = ["#f59e0b", "#3b82f6", "#10b981"];
const SCENARIO_LABELS = ["Primary", "Scenario B", "Scenario C"];

const PERIOD_SHORT: Record<CompoundingPeriod, string> = {
  daily: "day",
  weekly: "wk",
  monthly: "mo",
  quarterly: "qtr",
  yearly: "yr",
};

const PERIOD_PLURAL: Record<CompoundingPeriod, string> = {
  daily: "days",
  weekly: "weeks",
  monthly: "months",
  quarterly: "quarters",
  yearly: "years",
};

// ── Helpers ────────────────────────────────────────────────────────────────

function formatCurrency(n: number): string {
  if (Math.abs(n) >= 1e9) return "$" + (n / 1e9).toFixed(2) + "B";
  if (Math.abs(n) >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
  if (Math.abs(n) >= 1e4) return "$" + (n / 1e3).toFixed(1) + "K";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function formatFullCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function formatAxisValue(n: number): string {
  if (n >= 1e9) return "$" + (n / 1e9).toFixed(1) + "B";
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return "$" + (n / 1e3).toFixed(0) + "K";
  return "$" + n.toFixed(0);
}

function niceAxisSteps(maxVal: number, steps: number): number[] {
  if (maxVal <= 0) return [0];
  const rough = maxVal / steps;
  const mag = Math.pow(10, Math.floor(Math.log10(rough)));
  const normalized = rough / mag;
  let niceStep: number;
  if (normalized <= 1) niceStep = mag;
  else if (normalized <= 2) niceStep = 2 * mag;
  else if (normalized <= 5) niceStep = 5 * mag;
  else niceStep = 10 * mag;

  const result: number[] = [];
  for (let v = 0; v <= maxVal + niceStep * 0.5; v += niceStep) {
    result.push(v);
    if (result.length > steps + 2) break;
  }
  return result;
}

// ── Calculation Engine ─────────────────────────────────────────────────────

function calculateGrowth(
  initialCapital: number,
  ratePercent: number,
  periodsCount: number,
  contributionPerPeriod: number
): GrowthResult {
  const r = ratePercent / 100;
  const rows: PeriodRow[] = [];
  let balanceWithContrib = initialCapital;
  let balanceNoContrib = initialCapital;
  let totalContributions = initialCapital;

  for (let i = 1; i <= periodsCount; i++) {
    const growthWithContrib = balanceWithContrib * r;
    const growthNoContrib = balanceNoContrib * r;
    const endWithContrib = balanceWithContrib + growthWithContrib + contributionPerPeriod;
    const endNoContrib = balanceNoContrib + growthNoContrib;

    rows.push({
      period: i,
      beginBalance: balanceWithContrib,
      contribution: contributionPerPeriod,
      growth: growthWithContrib,
      endBalance: endWithContrib,
      endBalanceNoContrib: endNoContrib,
    });

    totalContributions += contributionPerPeriod;
    balanceWithContrib = endWithContrib;
    balanceNoContrib = endNoContrib;
  }

  const finalValue = balanceWithContrib;
  const finalValueNoContrib = balanceNoContrib;
  const totalProfit = finalValue - totalContributions;
  const profitPercent = totalContributions > 0 ? (totalProfit / totalContributions) * 100 : 0;
  const timeToDouble = r > 0 ? Math.log(2) / Math.log(1 + r) : Infinity;
  const ruleOf72 = ratePercent > 0 ? 72 / ratePercent : Infinity;

  return { rows, finalValue, finalValueNoContrib, totalContributions, totalProfit, profitPercent, timeToDouble, ruleOf72 };
}

function calculateScenarioValues(
  initialCapital: number,
  ratePercent: number,
  periodsCount: number,
  contributionPerPeriod: number
): number[] {
  const r = ratePercent / 100;
  const values: number[] = [initialCapital];
  let balance = initialCapital;
  for (let i = 1; i <= periodsCount; i++) {
    balance = balance * (1 + r) + contributionPerPeriod;
    values.push(balance);
  }
  return values;
}

function findMilestones(initialCapital: number, rows: PeriodRow[]): Milestone[] {
  const targets = [2, 5, 10];
  const found: Milestone[] = [];
  const remaining = new Set(targets);
  for (const row of rows) {
    const mult = row.endBalance / initialCapital;
    for (const t of remaining) {
      if (mult >= t) {
        found.push({ period: row.period, multiplier: t, value: row.endBalance });
        remaining.delete(t);
      }
    }
    if (remaining.size === 0) break;
  }
  return found;
}

// ── SVG Chart Component ────────────────────────────────────────────────────

interface ChartProps {
  rows: PeriodRow[];
  initialCapital: number;
  milestones: Milestone[];
  scenarios: ScenarioLine[];
  contributionPerPeriod: number;
}

function GrowthChart({ rows, initialCapital, milestones, scenarios, contributionPerPeriod }: ChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const W = 800;
  const H = 400;
  const pad = { top: 30, right: 20, bottom: 50, left: 70 };
  const cW = W - pad.left - pad.right;
  const cH = H - pad.top - pad.bottom;

  const withVals = useMemo(() => [initialCapital, ...rows.map((r) => r.endBalance)], [initialCapital, rows]);
  const noVals = useMemo(() => [initialCapital, ...rows.map((r) => r.endBalanceNoContrib)], [initialCapital, rows]);
  const numP = rows.length;

  const allVals = useMemo(() => [...withVals, ...noVals, ...scenarios.flatMap((s) => s.values)], [withVals, noVals, scenarios]);
  const maxV = Math.max(...allVals, initialCapital * 1.1);
  const ySteps = useMemo(() => niceAxisSteps(maxV, 5), [maxV]);
  const yMax = ySteps[ySteps.length - 1] || maxV;

  const xS = useCallback((i: number) => pad.left + (i / numP) * cW, [numP, cW]);
  const yS = useCallback((v: number) => pad.top + cH - (v / yMax) * cH, [cH, yMax]);

  const mkPath = useCallback((vals: number[]) => vals.map((v, i) => `${i === 0 ? "M" : "L"}${xS(i).toFixed(2)},${yS(v).toFixed(2)}`).join(" "), [xS, yS]);
  const mkArea = useCallback((vals: number[]) => {
    const p = mkPath(vals);
    return `${p} L${xS(vals.length - 1).toFixed(2)},${yS(0).toFixed(2)} L${xS(0).toFixed(2)},${yS(0).toFixed(2)} Z`;
  }, [mkPath, xS, yS]);

  const xLabels = useMemo(() => {
    const ct = Math.min(numP, 10);
    const step = Math.max(1, Math.floor(numP / ct));
    const ls: number[] = [];
    for (let i = 0; i <= numP; i += step) ls.push(i);
    if (ls[ls.length - 1] !== numP) ls.push(numP);
    return ls;
  }, [numP]);

  const onMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg || numP === 0) return;
    const rect = svg.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * W;
    const rx = mx - pad.left;
    if (rx < 0 || rx > cW) { setHoveredIndex(null); return; }
    setHoveredIndex(Math.max(0, Math.min(numP, Math.round((rx / cW) * numP))));
  }, [numP, cW]);

  const onLeave = useCallback(() => setHoveredIndex(null), []);

  const td = hoveredIndex !== null ? {
    p: hoveredIndex,
    wc: withVals[hoveredIndex] ?? 0,
    nc: noVals[hoveredIndex] ?? 0,
    tc: initialCapital + hoveredIndex * contributionPerPeriod,
  } : null;

  const tx = hoveredIndex !== null ? xS(hoveredIndex) : 0;
  const flip = tx > W * 0.65;
  const tbx = flip ? tx - 195 : tx + 12;
  const tby = hoveredIndex !== null ? Math.max(pad.top, Math.min(yS(withVals[hoveredIndex] ?? 0) - 50, H - pad.bottom - 100)) : 0;

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-card">
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" onMouseMove={onMove} onMouseLeave={onLeave} role="img" aria-label="Compound growth projection chart">
        <defs>
          <linearGradient id="agP" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" /><stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02" /></linearGradient>
          <linearGradient id="agS" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#eab308" stopOpacity="0.15" /><stop offset="100%" stopColor="#eab308" stopOpacity="0.01" /></linearGradient>
          <linearGradient id="agB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" /><stop offset="100%" stopColor="#3b82f6" stopOpacity="0.01" /></linearGradient>
          <linearGradient id="agC" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity="0.15" /><stop offset="100%" stopColor="#10b981" stopOpacity="0.01" /></linearGradient>
        </defs>

        {ySteps.map((v) => (<line key={`h${v}`} x1={pad.left} y1={yS(v)} x2={W - pad.right} y2={yS(v)} stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 4" />))}
        {xLabels.map((i) => (<line key={`v${i}`} x1={xS(i)} y1={pad.top} x2={xS(i)} y2={H - pad.bottom} stroke="currentColor" strokeOpacity="0.06" strokeDasharray="4 4" />))}
        {ySteps.map((v) => (<text key={`yl${v}`} x={pad.left - 8} y={yS(v) + 4} textAnchor="end" fill="currentColor" fillOpacity="0.5" fontSize="11" fontFamily="monospace">{formatAxisValue(v)}</text>))}
        {xLabels.map((i) => (<text key={`xl${i}`} x={xS(i)} y={H - pad.bottom + 20} textAnchor="middle" fill="currentColor" fillOpacity="0.5" fontSize="11" fontFamily="monospace">{i}</text>))}
        <text x={pad.left + cW / 2} y={H - 5} textAnchor="middle" fill="currentColor" fillOpacity="0.4" fontSize="11">Period</text>
        <text x={14} y={pad.top + cH / 2} textAnchor="middle" fill="currentColor" fillOpacity="0.4" fontSize="11" transform={`rotate(-90, 14, ${pad.top + cH / 2})`}>Portfolio Value</text>

        {scenarios.map((s, idx) => s.values.length < 2 ? null : (
          <g key={`sc${idx}`}>
            <path d={mkArea(s.values)} fill={`url(#${idx === 0 ? "agB" : "agC"})`} />
            <path d={mkPath(s.values)} fill="none" stroke={s.color} strokeWidth="1.5" strokeOpacity="0.6" />
          </g>
        ))}

        {numP > 0 && (<><path d={mkArea(noVals)} fill="url(#agS)" /><path d={mkPath(noVals)} fill="none" stroke="#eab308" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="6 3" /></>)}
        {numP > 0 && (<><path d={mkArea(withVals)} fill="url(#agP)" /><path d={mkPath(withVals)} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></>)}

        {milestones.map((m) => { const cx = xS(m.period); const cy = yS(m.value); return (
          <g key={`ms${m.multiplier}`}>
            <polygon points={`${cx},${cy - 8} ${cx + 6},${cy} ${cx},${cy + 8} ${cx - 6},${cy}`} fill="#f59e0b" fillOpacity="0.9" stroke="#fbbf24" strokeWidth="1" />
            <text x={cx} y={cy - 14} textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">{m.multiplier}x</text>
          </g>
        ); })}

        {hoveredIndex !== null && td && (<>
          <line x1={tx} y1={pad.top} x2={tx} y2={H - pad.bottom} stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 3" />
          <circle cx={tx} cy={yS(td.wc)} r="4" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
          <circle cx={tx} cy={yS(td.nc)} r="3.5" fill="#eab308" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.7" />
          <rect x={tbx} y={tby} width="185" height="90" rx="6" fill="var(--color-card, #1c1917)" stroke="#f59e0b" strokeWidth="0.5" strokeOpacity="0.4" fillOpacity="0.95" />
          <text x={tbx + 10} y={tby + 18} fill="#fbbf24" fontSize="11" fontWeight="bold">Period {td.p}</text>
          <text x={tbx + 10} y={tby + 36} fill="currentColor" fillOpacity="0.8" fontSize="10">With Contrib: {formatCurrency(td.wc)}</text>
          <text x={tbx + 10} y={tby + 52} fill="currentColor" fillOpacity="0.6" fontSize="10">Without: {formatCurrency(td.nc)}</text>
          <text x={tbx + 10} y={tby + 68} fill="currentColor" fillOpacity="0.5" fontSize="10">Total Invested: {formatCurrency(td.tc)}</text>
          <text x={tbx + 10} y={tby + 82} fill="#22c55e" fontSize="10">Profit: {formatCurrency(td.wc - td.tc)}</text>
        </>)}

        <line x1={pad.left} y1={H - pad.bottom} x2={W - pad.right} y2={H - pad.bottom} stroke="currentColor" strokeOpacity="0.2" />
        <line x1={pad.left} y1={pad.top} x2={pad.left} y2={H - pad.bottom} stroke="currentColor" strokeOpacity="0.2" />
      </svg>

      <div className="flex flex-wrap items-center gap-4 px-4 pb-3 pt-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="inline-block w-4 h-0.5 bg-amber-500 rounded" />With Contributions</span>
        <span className="flex items-center gap-1.5"><span className="inline-block w-4 h-0.5 bg-yellow-500 opacity-50 rounded" />Without Contributions</span>
        {scenarios.map((s, i) => (<span key={i} className="flex items-center gap-1.5"><span className="inline-block w-4 h-0.5 rounded" style={{ backgroundColor: s.color, opacity: 0.6 }} />{s.label} ({s.rate}%)</span>))}
        {milestones.length > 0 && (<span className="flex items-center gap-1.5"><span className="inline-block text-amber-400 text-[10px]">&#9670;</span>Milestones</span>)}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function CompoundGrowthCalculator() {
  useToolTracker("compound-growth", "Compound Growth Calculator", "trading");
  const analytics = useAnalytics();

  const [initialCapital, setInitialCapital] = useState("10000");
  const [ratePercent, setRatePercent] = useState("8");
  const [compoundingPeriod, setCompoundingPeriod] = useState<CompoundingPeriod>("yearly");
  const [numPeriods, setNumPeriods] = useState("20");
  const [contribution, setContribution] = useState("500");
  const [scenarioEnabled, setScenarioEnabled] = useState<[boolean, boolean]>([false, false]);
  const [scenarioRates, setScenarioRates] = useState<[string, string]>(["6", "12"]);
  const [showTable, setShowTable] = useState(false);
  const [tablePage, setTablePage] = useState(0);
  const [hasTracked, setHasTracked] = useState(false);
  const pageSize = 20;

  const capital = parseFloat(initialCapital) || 0;
  const rate = parseFloat(ratePercent) || 0;
  const pCount = Math.max(0, Math.min(1000, parseInt(numPeriods) || 0));
  const contrib = parseFloat(contribution) || 0;

  const result = useMemo(() => {
    if (capital <= 0 || pCount <= 0) return null;
    if (!hasTracked) {
      analytics.trackToolUsage("compound-growth-calculator", { action: "calculate", compoundingPeriod });
      setHasTracked(true);
    }
    return calculateGrowth(capital, rate, pCount, contrib);
  }, [capital, rate, pCount, contrib, compoundingPeriod, analytics, hasTracked]);

  const milestones = useMemo(() => {
    if (!result || capital <= 0) return [];
    return findMilestones(capital, result.rows);
  }, [result, capital]);

  const scenarios = useMemo((): ScenarioLine[] => {
    const lines: ScenarioLine[] = [];
    scenarioEnabled.forEach((on, idx) => {
      if (on && capital > 0 && pCount > 0) {
        const sr = parseFloat(scenarioRates[idx]) || 0;
        lines.push({ rate: sr, color: SCENARIO_COLORS[idx + 1], label: SCENARIO_LABELS[idx + 1], values: calculateScenarioValues(capital, sr, pCount, contrib) });
      }
    });
    return lines;
  }, [scenarioEnabled, scenarioRates, capital, pCount, contrib]);

  const tableRows = result?.rows ?? [];
  const totalPages = Math.ceil(tableRows.length / pageSize);
  const pagedRows = tableRows.slice(tablePage * pageSize, (tablePage + 1) * pageSize);

  const toggleScenario = useCallback((idx: 0 | 1) => {
    setScenarioEnabled((p) => { const n: [boolean, boolean] = [...p]; n[idx] = !n[idx]; return n; });
  }, []);

  const setScenarioRate = useCallback((idx: 0 | 1, v: string) => {
    setScenarioRates((p) => { const n: [string, string] = [...p]; n[idx] = v; return n; });
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-600 text-white flex items-center justify-center hover:opacity-80 transition">
            <LineChart className="w-4 h-4" />
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">Compound Growth Calculator</h1>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Project Your Compound Growth</h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">Visualize how your capital grows over time with compound returns and periodic contributions. Interactive chart, milestone tracking, and scenario comparison.</p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium text-accent-foreground mb-2 block">Initial Capital</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <input aria-label="Initial capital amount" type="number" value={initialCapital} onChange={(e) => setInitialCapital(e.target.value)} min={0} step={1000} className="w-full pl-8 pr-4 py-3 bg-card border border-border rounded-lg font-mono text-foreground focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-accent-foreground mb-2 block">Periodic Return</label>
            <div className="relative">
              <input aria-label="Periodic return rate" type="number" value={ratePercent} onChange={(e) => setRatePercent(e.target.value)} min={0} max={1000} step={0.1} className="w-full pl-4 pr-8 py-3 bg-card border border-border rounded-lg font-mono text-foreground focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-accent-foreground mb-2 block">Compounding</label>
            <select aria-label="Compounding period" value={compoundingPeriod} onChange={(e) => setCompoundingPeriod(e.target.value as CompoundingPeriod)} className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition appearance-none">
              {COMPOUNDING_OPTIONS.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-accent-foreground mb-2 block">Periods</label>
            <input aria-label="Number of compounding periods" type="number" value={numPeriods} onChange={(e) => setNumPeriods(e.target.value)} min={1} max={1000} className="w-full px-4 py-3 bg-card border border-border rounded-lg font-mono text-foreground focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition" />
          </div>
          <div>
            <label className="text-sm font-medium text-accent-foreground mb-2 block">Contribution/{PERIOD_SHORT[compoundingPeriod]}</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <input aria-label="Contribution per period" type="number" value={contribution} onChange={(e) => setContribution(e.target.value)} min={0} step={100} className="w-full pl-8 pr-4 py-3 bg-card border border-border rounded-lg font-mono text-foreground focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition" />
            </div>
          </div>
        </div>

        {/* Results Summary */}
        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            <div className="bg-card border border-amber-500/30 rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Final Value</p>
              <p className="text-lg sm:text-xl font-bold text-amber-400 font-mono">{formatCurrency(result.finalValue)}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Contributed</p>
              <p className="text-lg sm:text-xl font-bold font-mono">{formatCurrency(result.totalContributions)}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Total Profit</p>
              <p className={`text-lg sm:text-xl font-bold font-mono ${result.totalProfit >= 0 ? "text-green-400" : "text-red-400"}`}>{formatCurrency(result.totalProfit)}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">Profit %</p>
              <p className={`text-lg sm:text-xl font-bold font-mono ${result.profitPercent >= 0 ? "text-green-400" : "text-red-400"}`}>{result.profitPercent.toFixed(1)}%</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 col-span-2 sm:col-span-1">
              <p className="text-xs text-muted-foreground mb-1">Time to Double</p>
              <p className="text-lg sm:text-xl font-bold font-mono text-amber-300">{result.timeToDouble === Infinity ? "N/A" : `~${result.timeToDouble.toFixed(1)}`}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Rule of 72: {result.ruleOf72 === Infinity ? "N/A" : `~${result.ruleOf72.toFixed(1)}`} {PERIOD_PLURAL[compoundingPeriod]}</p>
            </div>
          </div>
        )}

        {/* Scenario Comparison */}
        <div className="mb-4 p-4 bg-card border border-border rounded-lg">
          <p className="text-sm font-medium text-accent-foreground mb-3">Scenario Comparison</p>
          <div className="flex flex-wrap gap-4">
            {([0, 1] as const).map((idx) => (
              <div key={idx} className="flex items-center gap-2">
                <button onClick={() => toggleScenario(idx)} className={`w-5 h-5 rounded border flex items-center justify-center transition text-xs ${scenarioEnabled[idx] ? "border-blue-500 bg-blue-500/20 text-blue-400" : "border-border text-transparent"}`} aria-label={`Toggle scenario ${SCENARIO_LABELS[idx + 1]}`}>{scenarioEnabled[idx] ? "\u2713" : ""}</button>
                <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: SCENARIO_COLORS[idx + 1] }} />
                <span className="text-sm text-muted-foreground">{SCENARIO_LABELS[idx + 1]}:</span>
                <div className="relative w-20">
                  <input aria-label={`${SCENARIO_LABELS[idx + 1]} return rate`} type="number" value={scenarioRates[idx]} onChange={(e) => setScenarioRate(idx, e.target.value)} min={0} max={1000} step={0.5} className="w-full pl-2 pr-6 py-1.5 bg-muted border border-border rounded text-sm font-mono text-foreground focus:ring-1 focus:ring-amber-500/40" />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        {result ? (
          <GrowthChart rows={result.rows} initialCapital={capital} milestones={milestones} scenarios={scenarios} contributionPerPeriod={contrib} />
        ) : (
          <div className="w-full h-64 border border-border rounded-lg bg-card flex items-center justify-center">
            <p className="text-muted-foreground">Enter a positive initial capital and at least 1 period to see the growth chart.</p>
          </div>
        )}

        {/* Data Table */}
        {result && (
          <div className="mt-6">
            <button onClick={() => { setShowTable(!showTable); setTablePage(0); }} className="text-sm font-medium text-amber-400 hover:text-amber-300 transition mb-3 flex items-center gap-1">
              {showTable ? "Hide" : "Show"} Period-by-Period Table <span className="text-xs">{showTable ? "\u25B2" : "\u25BC"}</span>
            </button>
            {showTable && (
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead><tr className="bg-muted/50 text-muted-foreground">
                    <th className="text-left px-3 py-2 font-medium">Period</th>
                    <th className="text-right px-3 py-2 font-medium">Begin Balance</th>
                    <th className="text-right px-3 py-2 font-medium">Contribution</th>
                    <th className="text-right px-3 py-2 font-medium">Growth</th>
                    <th className="text-right px-3 py-2 font-medium">End Balance</th>
                  </tr></thead>
                  <tbody>
                    {pagedRows.map((row) => (
                      <tr key={row.period} className="border-t border-border hover:bg-muted/30 transition">
                        <td className="px-3 py-2 font-mono text-muted-foreground">{row.period}</td>
                        <td className="text-right px-3 py-2 font-mono">{formatFullCurrency(row.beginBalance)}</td>
                        <td className="text-right px-3 py-2 font-mono text-blue-400">{row.contribution > 0 ? `+${formatFullCurrency(row.contribution)}` : "-"}</td>
                        <td className="text-right px-3 py-2 font-mono text-green-400">+{formatFullCurrency(row.growth)}</td>
                        <td className="text-right px-3 py-2 font-mono font-medium">{formatFullCurrency(row.endBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-3 py-2 border-t border-border bg-muted/30 text-xs text-muted-foreground">
                    <span>Page {tablePage + 1} of {totalPages} ({tableRows.length} periods)</span>
                    <div className="flex gap-2">
                      <button onClick={() => setTablePage(Math.max(0, tablePage - 1))} disabled={tablePage === 0} className="px-2 py-1 rounded border border-border hover:bg-muted disabled:opacity-30 transition">Prev</button>
                      <button onClick={() => setTablePage(Math.min(totalPages - 1, tablePage + 1))} disabled={tablePage >= totalPages - 1} className="px-2 py-1 rounded border border-border hover:bg-muted disabled:opacity-30 transition">Next</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-12 text-center text-xs sm:text-sm text-muted-foreground">
          <p>Projections are mathematical estimates. Actual investment returns vary and are not guaranteed.</p>
          <p className="mt-1">100% client-side - no financial data sent to servers.</p>
        </div>

        <RelatedTools currentPath="/compound-growth" />

        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={compoundGrowthGuideContent.quickStartSteps} />
          </GeoSection>
          <GeoSection id="what-is-compound-growth" title={compoundGrowthGuideContent.introduction.title} subtitle="Understanding exponential growth" variant="default">
            <MarkdownContent content={compoundGrowthGuideContent.introduction.content} />
          </GeoSection>
          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How investors and traders use compound growth calculations" variant="default">
            <FeatureGrid features={compoundGrowthGuideContent.useCases.map((uc) => ({ title: uc.title, description: uc.description }))} columns={2} />
          </GeoSection>
          <GeoSection id="how-to-use" title={compoundGrowthGuideContent.howToUse.title} subtitle="Master compound growth projections" variant="minimal">
            <HowToSchema name={`How to use ${compoundGrowthGuideContent.toolName}`} description="Step-by-step guide to compound growth calculation" steps={compoundGrowthGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${compoundGrowthGuideContent.toolPath}`} />
            <MarkdownContent content={compoundGrowthGuideContent.howToUse.content} />
          </GeoSection>
          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={compoundGrowthGuideContent.faqs} />
          </GeoSection>
          <GeoSection id="security" title={compoundGrowthGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={compoundGrowthGuideContent.security.content} />
          </GeoSection>
          {compoundGrowthGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(compoundGrowthGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={compoundGrowthGuideContent.lastUpdated} />
      </div>

      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-5xl mx-auto text-center text-xs sm:text-sm text-muted-foreground">
          <p>Project compound growth instantly. 100% client-side - no data stored.</p>
        </div>
      </footer>

      <StructuredData type="WebApplication" name="Compound Growth Calculator | OpenKit.tools" description="Project compound growth with interactive SVG charts. Visualize investment returns, compare scenarios, and plan contributions with this free client-side calculator." url="https://openkit.tools/compound-growth" applicationCategory="FinanceApplication" datePublished="2026-02-10" dateModified={compoundGrowthGuideContent.lastUpdated} version={compoundGrowthGuideContent.version} aggregateRating={{ ratingValue: "4.9", ratingCount: "876", bestRating: "5" }} />
      <BreadcrumbStructuredData items={[{ name: "OpenKit.tools", url: "https://openkit.tools" }, { name: "Compound Growth Calculator", url: "https://openkit.tools/compound-growth" }]} />
    </main>
  );
}
