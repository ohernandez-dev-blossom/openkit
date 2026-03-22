"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { RefreshCw, AlertTriangle, Home } from "lucide-react";

interface ToolErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
  toolName: string;
}

export function ToolErrorBoundary({ error, reset, toolName }: ToolErrorBoundaryProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 text-white flex items-center justify-center font-bold text-sm hover:opacity-80 transition">
            #
          </Link>
          <h1 className="text-lg sm:text-xl font-semibold">{toolName}</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Card className="bg-card border-border border-red-500/30">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <CardTitle className="text-lg">Something went wrong</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              An error occurred in the {toolName} tool. This could be due to:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Browser compatibility issues</li>
              <li>Corrupted local storage data</li>
              <li>Temporary script loading problems</li>
            </ul>
            
            {error.message && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">Error details:</p>
                <code className="text-sm text-red-400 break-all">{error.message}</code>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-4">
              <Button onClick={reset} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Try Again
              </Button>
              <Button variant="outline" asChild>
                <Link href="/" className="gap-2">
                  <Home className="w-4 h-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
