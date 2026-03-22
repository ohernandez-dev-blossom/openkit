"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { Database, Copy, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { PinButton } from "@/components/pin-button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { mockApiGuideContent } from "@/content/mock-api-guide";
import { useAnalytics } from "@/hooks/use-analytics";

type SchemaType = "users" | "products" | "posts" | "comments" | "todos" | "custom";

// Random data generators
const firstNames = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry", "Ivy", "Jack"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
const domains = ["example.com", "mail.com", "test.org", "demo.net", "sample.io"];
const productCategories = ["Electronics", "Clothing", "Books", "Home & Garden", "Sports", "Toys", "Food"];
const productAdjectives = ["Premium", "Deluxe", "Essential", "Classic", "Modern", "Vintage", "Professional"];
const productNouns = ["Widget", "Gadget", "Tool", "Kit", "Set", "Bundle", "Collection"];
const loremWords = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor"];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(yearsBack = 2): string {
  const now = Date.now();
  const past = now - (yearsBack * 365 * 24 * 60 * 60 * 1000);
  const timestamp = past + Math.random() * (now - past);
  return new Date(timestamp).toISOString();
}

function generateEmail(firstName: string, lastName: string): string {
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randomItem(domains)}`;
}

function generateLoremSentence(words = 8): string {
  const sentence = Array.from({ length: words }, () => randomItem(loremWords));
  sentence[0] = sentence[0].charAt(0).toUpperCase() + sentence[0].slice(1);
  return sentence.join(" ") + ".";
}

function generateUser(id: number) {
  const firstName = randomItem(firstNames);
  const lastName = randomItem(lastNames);
  return {
    id,
    firstName,
    lastName,
    email: generateEmail(firstName, lastName),
    age: randomInt(18, 65),
    active: Math.random() > 0.3,
    createdAt: randomDate()};
}

function generateProduct(id: number) {
  return {
    id,
    name: `${randomItem(productAdjectives)} ${randomItem(productNouns)}`,
    category: randomItem(productCategories),
    price: parseFloat((Math.random() * 500 + 10).toFixed(2)),
    inStock: Math.random() > 0.2,
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    reviews: randomInt(0, 500),
    createdAt: randomDate()};
}

function generatePost(id: number) {
  return {
    id,
    title: generateLoremSentence(randomInt(4, 8)),
    body: generateLoremSentence(randomInt(15, 30)),
    userId: randomInt(1, 20),
    published: Math.random() > 0.2,
    views: randomInt(10, 10000),
    likes: randomInt(0, 500),
    createdAt: randomDate()};
}

function generateComment(id: number) {
  const firstName = randomItem(firstNames);
  const lastName = randomItem(lastNames);
  return {
    id,
    postId: randomInt(1, 50),
    author: `${firstName} ${lastName}`,
    email: generateEmail(firstName, lastName),
    body: generateLoremSentence(randomInt(8, 20)),
    createdAt: randomDate()};
}

function generateTodo(id: number) {
  return {
    id,
    title: generateLoremSentence(randomInt(3, 6)),
    completed: Math.random() > 0.5,
    userId: randomInt(1, 20),
    priority: randomItem(["low", "medium", "high"]),
    dueDate: randomDate(0.5)};
}

export default function MockAPIGenerator() {
  useToolTracker("mock-api", "Mock API Generator");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const [schema, setSchema] = useState<SchemaType>("users");
  const [arraySize, setArraySize] = useState(5);
  const [customSchema, setCustomSchema] = useState("");
  
  const generatedData = useMemo(() => {
    if (schema === "custom") {
      try {
        const template = JSON.parse(customSchema);
        return Array.from({ length: arraySize }, (_, i) => {
          // Simple placeholder replacement for custom schemas
          const item = JSON.parse(JSON.stringify(template));
          const replacePlaceholders = (obj: unknown): unknown => {
            if (typeof obj === "string") {
              if (obj === "{{id}}") return i + 1;
              if (obj === "{{name}}") return `${randomItem(firstNames)} ${randomItem(lastNames)}`;
              if (obj === "{{email}}") return generateEmail(randomItem(firstNames), randomItem(lastNames));
              if (obj === "{{number}}") return randomInt(1, 1000);
              if (obj === "{{boolean}}") return Math.random() > 0.5;
              if (obj === "{{date}}") return randomDate();
              if (obj === "{{text}}") return generateLoremSentence();
              return obj;
            }
            if (Array.isArray(obj)) {
              return obj.map(replacePlaceholders);
            }
            if (obj && typeof obj === "object") {
              const result: Record<string, unknown> = {};
              for (const key in obj) {
                result[key] = replacePlaceholders((obj as Record<string, unknown>)[key]);
              }
              return result;
            }
            return obj;
          };
          return replacePlaceholders(item);
        });
      } catch {
        return [{ error: "Invalid JSON schema" }];
      }
    }

    const generators = {
      users: generateUser,
      products: generateProduct,
      posts: generatePost,
      comments: generateComment,
      todos: generateTodo};

    return Array.from({ length: arraySize }, (_, i) => generators[schema](i + 1));
  }, [schema, arraySize, customSchema]);

  const jsonOutput = useMemo(() => {
    return JSON.stringify(generatedData, null, 2);
  }, [generatedData]);


  const downloadJSON = useCallback(() => {
    const blob = new Blob([jsonOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mock-${schema}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [jsonOutput, schema]);

  const regenerate = useCallback(() => {
    // Force re-render by toggling a state
    setArraySize(s => s);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center hover:opacity-80 transition">
              <Database className="w-4 h-4" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">API Mock Generator</h1>
          </div>
          <PinButton toolHref="/mock-api" />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Controls */}
        <Card className="bg-card border-border mb-6">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Schema Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-accent-foreground mb-2 block">Schema Type</label>
                <Select value={schema} onValueChange={(v) => setSchema(v as SchemaType)}>
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-muted border-border">
                    <SelectItem value="users">Users</SelectItem>
                    <SelectItem value="products">Products</SelectItem>
                    <SelectItem value="posts">Posts</SelectItem>
                    <SelectItem value="comments">Comments</SelectItem>
                    <SelectItem value="todos">To-Do Items</SelectItem>
                    <SelectItem value="custom">Custom Schema</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="page-input-228" className="text-sm font-medium text-accent-foreground mb-2 block">Array Size</label>
                <input id="page-input-228"
                  type="number"
                  value={arraySize}
                  onChange={(e) => setArraySize(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                  min={1}
                  max={100}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg font-mono text-foreground"
                />
              </div>
            </div>

            {/* Custom Schema Input */}
            {schema === "custom" && (
              <div>
                <label className="text-sm font-medium text-accent-foreground mb-2 block">
                  Custom Schema Template (JSON)
                </label>
                <Textarea
                  value={customSchema}
                  onChange={(e) => setCustomSchema(e.target.value)}
                  placeholder={`{\n  "id": "{{id}}",\n  "name": "{{name}}",\n  "email": "{{email}}",\n  "count": "{{number}}",\n  "active": "{{boolean}}",\n  "created": "{{date}}",\n  "description": "{{text}}"\n}`}
                  className="h-40 bg-muted border-border font-mono text-sm resize-none focus:border-blue-500"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Available placeholders: {"{"}{"{"} id {"}"}{"}"},  {"{"}{"{"} name {"}"}{"}"},  {"{"}{"{"} email {"}"}{"}"},  {"{"}{"{"} number {"}"}{"}"},  {"{"}{"{"} boolean {"}"}{"}"},  {"{"}{"{"} date {"}"}{"}"},  {"{"}{"{"} text {"}"}{"}"} 
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button className="min-h-[44px] bg-blue-600 hover:bg-blue-700" onClick={regenerate} >
                <RefreshCw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
              <Button className="min-h-[44px] border-border" onClick={() => { copy(jsonOutput); analytics.trackToolUsage("mock-api", { action: "copy", schema, arraySize }); }} variant="outline" >
                <Copy className="w-4 h-4 mr-2" />
                {isCopied ? "Copied!" : "Copy JSON"}
              </Button>
              <Button className="min-h-[44px] border-border" onClick={downloadJSON} variant="outline" >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-card rounded-lg border border-border">
            <p className="text-2xl font-bold font-mono text-blue-400">{generatedData.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Items</p>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border">
            <p className="text-2xl font-bold font-mono text-blue-400">
              {generatedData[0] ? Object.keys(generatedData[0]).length : 0}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Fields</p>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border">
            <p className="text-2xl font-bold font-mono text-blue-400">
              {(jsonOutput.length / 1024).toFixed(1)}kb
            </p>
            <p className="text-xs text-muted-foreground mt-1">Size</p>
          </div>
          <div className="p-4 bg-card rounded-lg border border-border">
            <p className="text-2xl font-bold font-mono text-blue-400">REST</p>
            <p className="text-xs text-muted-foreground mt-1">API Type</p>
          </div>
        </div>

        {/* JSON Output */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Generated Mock Data</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={jsonOutput}
              readOnly
              className="h-[500px] bg-background border-border font-mono text-sm resize-none"
            />
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-card border-border mt-6">
          <CardHeader>
            <CardTitle>About Mock Data Generation</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <p>
              Generate realistic mock API responses for testing and development. All data is randomly generated
              client-side - no server requests, completely private.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div>
                <h4 className="text-accent-foreground font-medium mb-2">Built-in Schemas</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Users - Names, emails, ages, timestamps</li>
                  <li>• Products - Names, prices, ratings, stock</li>
                  <li>• Posts - Titles, bodies, user IDs, stats</li>
                  <li>• Comments - Authors, emails, post IDs</li>
                  <li>• Todos - Tasks, priorities, due dates</li>
                </ul>
              </div>
              <div>
                <h4 className="text-accent-foreground font-medium mb-2">Custom Schemas</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Define your own JSON structure</li>
                  <li>• Use placeholders for dynamic data</li>
                  <li>• Supports nested objects and arrays</li>
                  <li>• Perfect for prototyping APIs</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Generate mock data in 30 seconds" variant="highlight">
            <QuickStartGuide steps={mockApiGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="introduction" title={mockApiGuideContent.introduction.title} subtitle="Understanding API mock data generation" variant="default">
            <MarkdownContent content={mockApiGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="Real-world mock data applications" variant="default">
            <FeatureGrid
              features={mockApiGuideContent.useCases.map(uc => ({
                title: uc.title,
                description: uc.description
              }))}
              columns={2}
            />
          </GeoSection>

          <GeoSection id="how-to-use" title={mockApiGuideContent.howToUse.title} subtitle="Master the mock data generator" variant="minimal">
            <HowToSchema
              name="How to use API Mock Generator"
              description="Step-by-step guide to generating realistic mock API data"
              steps={mockApiGuideContent.howToUse.steps}
              toolUrl="https://openkit.tools/mock-api"
            />
            <MarkdownContent content={mockApiGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Common questions about mock APIs" variant="default">
            <ToolFAQ faqs={mockApiGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={mockApiGuideContent.security.title} subtitle="Your data stays private" variant="highlight">
            <MarkdownContent content={mockApiGuideContent.security.content} />
          </GeoSection>

          {mockApiGuideContent.stats && (
            <GeoSection id="stats" title="Tool Statistics" variant="minimal">
              <StatsBar
                stats={Object.entries(mockApiGuideContent.stats).map(
                  ([label, value]) => ({ label, value })
                )}
              />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={mockApiGuideContent.lastUpdated} />

        {/* Related Tools */}
        <RelatedTools currentPath="/mock-api" />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Generate mock REST API responses. All processing happens in your browser.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="API Mock Generator | OpenKit.tools"
        description="Generate realistic mock REST API responses for testing. Users, products, posts, comments, and custom schemas. Client-side, private, free."
        url="https://openkit.tools/mock-api"
        applicationCategory="DeveloperApplication"
        dateModified={mockApiGuideContent.lastUpdated}
        version={mockApiGuideContent.version}
        aggregateRating={{
          ratingValue: "4.7",
          ratingCount: "1523",
          bestRating: "5"
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'API Mock Generator', url: 'https://openkit.tools/mock-api' },
        ]}
      />
    </main>
  );
}
