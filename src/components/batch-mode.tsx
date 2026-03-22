"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Download, Loader2 } from "lucide-react";

export interface BatchResult {
  input: string;
  output: string | object;
  error?: string;
}

export interface BatchModeProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  onProcess: (inputs: string[]) => Promise<BatchResult[]> | BatchResult[];
  placeholder?: string;
  delimiter?: "line" | "comma" | "semicolon" | "custom";
  customDelimiter?: string;
  label?: string;
  description?: string;
}

export function BatchMode({
  enabled,
  onToggle,
  onProcess,
  placeholder = "Enter multiple inputs (one per line)...",
  delimiter = "line",
  customDelimiter,
  label = "Batch Mode",
  description = "Process multiple inputs at once"}: BatchModeProps) {
  const [batchInput, setBatchInput] = useState("");
  const [results, setResults] = useState<BatchResult[]>([]);
  const [processing, setProcessing] = useState(false);

  const parseInputs = useCallback((): string[] => {
    if (!batchInput.trim()) return [];

    let delim: string | RegExp;
    switch (delimiter) {
      case "line":
        delim = /\r?\n/;
        break;
      case "comma":
        delim = ",";
        break;
      case "semicolon":
        delim = ";";
        break;
      case "custom":
        delim = customDelimiter || "\n";
        break;
    }

    return batchInput
      .split(delim)
      .map((s) => s.trim())
      .filter(Boolean);
  }, [batchInput, delimiter, customDelimiter]);

  const handleProcess = useCallback(async () => {
    const inputs = parseInputs();
    if (inputs.length === 0) {
      return;
    }

    setProcessing(true);
    try {
      const batchResults = await Promise.resolve(onProcess(inputs));
      setResults(batchResults);
    } catch (error) {
      console.error("Batch processing failed:", error);
      setResults([]);
    } finally {
      setProcessing(false);
    }
  }, [parseInputs, onProcess]);

  const handleClear = useCallback(() => {
    setBatchInput("");
    setResults([]);
  }, []);

  const exportCSV = useCallback(() => {
    if (results.length === 0) return "";

    const headers = ["Input", "Output", "Error"];
    const rows = results.map((r) => [
      r.input,
      typeof r.output === "object" ? JSON.stringify(r.output) : r.output,
      r.error || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    return csvContent;
  }, [results]);

  const exportJSON = useCallback(() => {
    return JSON.stringify(results, null, 2);
  }, [results]);

  if (!enabled) {
    return (
      <div className="flex items-center space-x-3 p-4 bg-card border border-border rounded-lg">
        <Switch
          id="batch-mode"
          checked={enabled}
          onCheckedChange={onToggle}
        />
        <div className="flex-1">
          <Label htmlFor="batch-mode" className="text-sm font-medium cursor-pointer">
            {label}
          </Label>
          <p className="text-xs text-muted-foreground/70 mt-0.5">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{label}</CardTitle>
          <Switch
            id="batch-mode"
            checked={enabled}
            onCheckedChange={onToggle}
          />
        </div>
        <p className="text-xs text-muted-foreground/70 mt-1">{description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm text-foreground/70 mb-2 block">
            Batch Input ({parseInputs().length} inputs)
          </Label>
          <Textarea
            value={batchInput}
            onChange={(e) => setBatchInput(e.target.value)}
            placeholder={placeholder}
            className="h-48 bg-muted border-border/80 font-mono text-sm resize-none focus:border-blue-500"
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleProcess}
            disabled={processing || parseInputs().length === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Processing...
              </>
            ) : (
              `Process ${parseInputs().length} Input${parseInputs().length !== 1 ? "s" : ""}`
            )}
          </Button>
          <Button onClick={handleClear} variant="ghost" className="text-muted-foreground">
            Clear
          </Button>
        </div>

        {results.length > 0 && (
          <>
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm text-foreground/70">
                  Results ({results.length})
                </Label>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      const csv = exportCSV();
                      const blob = new Blob([csv], { type: "text/csv" });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = "batch-results.csv";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    }}
                    variant="outline"
                    size="sm"
                    className="bg-zinc-600 hover:bg-zinc-700 text-white border-0"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    CSV
                  </Button>
                  <Button
                    onClick={() => {
                      const json = exportJSON();
                      const blob = new Blob([json], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = "batch-results.json";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    }}
                    variant="outline"
                    size="sm"
                    className="bg-zinc-600 hover:bg-zinc-700 text-white border-0"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    JSON
                  </Button>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-2 bg-muted rounded-lg p-3">
                {results.map((result, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg ${
                      result.error
                        ? "bg-red-950 border border-red-800"
                        : "bg-card border border-border/80"
                    }`}
                  >
                    <div className="text-xs text-muted-foreground/70 mb-1">
                      Input #{idx + 1}
                    </div>
                    <div className="font-mono text-sm text-foreground/70 mb-2">
                      {result.input}
                    </div>
                    <div className="text-xs text-muted-foreground/70 mb-1">Output</div>
                    {result.error ? (
                      <div className="font-mono text-sm text-red-400">
                        Error: {result.error}
                      </div>
                    ) : (
                      <div className="font-mono text-sm text-emerald-400 break-all">
                        {typeof result.output === "object"
                          ? JSON.stringify(result.output, null, 2)
                          : result.output}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
