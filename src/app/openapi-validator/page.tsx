"use client";
import { useState, useCallback, useMemo } from "react";
import { Copy, RotateCcw, CheckCircle2, XCircle, AlertTriangle, FileJson, Code2, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { useToolTracker } from "@/hooks/use-tool-tracker";
import { useAnalytics } from "@/hooks/use-analytics";
import { ExportHubV2 } from "@/components/export-hub-v2";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";

interface ValidationResult {
  valid: boolean;
  version: string;
  title: string;
  description: string;
  errors: string[];
  warnings: string[];
  endpoints: { method: string; path: string; summary?: string; operationId?: string; tags?: string[] }[];
  schemas: { name: string; type: string; properties: number }[];
  servers: string[];
  securitySchemes: string[];
  stats: { paths: number; operations: number; schemas: number; parameters: number };
}

const SAMPLE_OPENAPI = `{
  "openapi": "3.0.3",
  "info": {
    "title": "Pet Store API",
    "description": "A sample API for a pet store",
    "version": "1.0.0",
    "contact": {
      "name": "API Support",
      "email": "support@example.com"
    },
    "license": {
      "name": "MIT"
    }
  },
  "servers": [
    {
      "url": "https://api.petstore.example.com/v1",
      "description": "Production"
    }
  ],
  "paths": {
    "/pets": {
      "get": {
        "operationId": "listPets",
        "summary": "List all pets",
        "tags": ["pets"],
        "parameters": [
          {
            "name": "limit",
            "in": "query",
            "required": false,
            "schema": { "type": "integer", "maximum": 100 }
          }
        ],
        "responses": {
          "200": {
            "description": "A list of pets",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": { "$ref": "#/components/schemas/Pet" }
                }
              }
            }
          }
        }
      },
      "post": {
        "operationId": "createPet",
        "summary": "Create a pet",
        "tags": ["pets"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/NewPet" }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Pet created",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Pet" }
              }
            }
          }
        },
        "security": [{ "bearerAuth": [] }]
      }
    },
    "/pets/{petId}": {
      "get": {
        "operationId": "getPet",
        "summary": "Get a pet by ID",
        "tags": ["pets"],
        "parameters": [
          {
            "name": "petId",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "200": {
            "description": "A pet",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Pet" }
              }
            }
          },
          "404": {
            "description": "Pet not found"
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Pet": {
        "type": "object",
        "required": ["id", "name"],
        "properties": {
          "id": { "type": "integer", "format": "int64" },
          "name": { "type": "string" },
          "tag": { "type": "string" },
          "status": { "type": "string", "enum": ["available", "pending", "sold"] }
        }
      },
      "NewPet": {
        "type": "object",
        "required": ["name"],
        "properties": {
          "name": { "type": "string" },
          "tag": { "type": "string" }
        }
      }
    },
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT"
      }
    }
  }
}`;

const SAMPLE_INVALID = `{
  "openapi": "3.0.3",
  "info": {
    "title": "Broken API"
  },
  "paths": {
    "/users": {
      "get": {
        "responses": {}
      }
    }
  }
}`;

function validateSpec(input: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const endpoints: ValidationResult["endpoints"] = [];
  const schemas: ValidationResult["schemas"] = [];
  const servers: string[] = [];
  const securitySchemes: string[] = [];

  let spec: Record<string, unknown>;
  try {
    spec = JSON.parse(input) as Record<string, unknown>;
  } catch {
    return {
      valid: false, version: "unknown", title: "", description: "",
      errors: ["Invalid JSON. Paste a valid OpenAPI spec in JSON format. For YAML, use our YAML to JSON converter first."],
      warnings: [], endpoints: [], schemas: [], servers: [], securitySchemes: [],
      stats: { paths: 0, operations: 0, schemas: 0, parameters: 0 },
    };
  }

  // Detect version
  const version = (spec.openapi as string) || (spec.swagger as string) || "unknown";
  if (!spec.openapi && !spec.swagger) {
    errors.push("Missing 'openapi' or 'swagger' version field");
  }

  // Info validation
  const info = spec.info as Record<string, unknown> | undefined;
  const title = (info?.title as string) || "";
  const description = (info?.description as string) || "";

  if (!info) {
    errors.push("Missing required 'info' object");
  } else {
    if (!info.title) errors.push("Missing required 'info.title'");
    if (!info.version) errors.push("Missing required 'info.version'");
    if (!info.description) warnings.push("Consider adding 'info.description' for better documentation");
    if (!info.contact) warnings.push("Consider adding 'info.contact' for API support information");
    if (!info.license) warnings.push("Consider adding 'info.license'");
  }

  // Servers
  if (spec.servers && Array.isArray(spec.servers)) {
    for (const server of spec.servers) {
      const s = server as Record<string, unknown>;
      if (s.url) servers.push(s.url as string);
      if (!s.url) errors.push("Server entry missing 'url'");
    }
  } else if (spec.openapi) {
    warnings.push("No 'servers' defined. Clients may default to '/'");
  }

  // Paths validation
  const paths = spec.paths as Record<string, unknown> | undefined;
  let operationCount = 0;
  let parameterCount = 0;
  const HTTP_METHODS = ["get", "post", "put", "patch", "delete", "options", "head", "trace"];

  if (!paths) {
    errors.push("Missing required 'paths' object");
  } else {
    for (const [path, methods] of Object.entries(paths)) {
      if (!path.startsWith("/")) {
        errors.push(`Path '${path}' must start with '/'`);
      }
      if (typeof methods !== "object" || !methods) continue;
      const methodObj = methods as Record<string, unknown>;
      
      for (const method of HTTP_METHODS) {
        if (!methodObj[method]) continue;
        operationCount++;
        const op = methodObj[method] as Record<string, unknown>;
        
        endpoints.push({
          method: method.toUpperCase(),
          path,
          summary: op.summary as string | undefined,
          operationId: op.operationId as string | undefined,
          tags: op.tags as string[] | undefined,
        });

        if (!op.operationId) {
          warnings.push(`${method.toUpperCase()} ${path} - Missing 'operationId'`);
        }
        if (!op.summary && !op.description) {
          warnings.push(`${method.toUpperCase()} ${path} - Missing summary/description`);
        }
        if (!op.responses || Object.keys(op.responses as object).length === 0) {
          errors.push(`${method.toUpperCase()} ${path} - Must have at least one response defined`);
        }
        if (op.parameters && Array.isArray(op.parameters)) {
          parameterCount += op.parameters.length;
          for (const param of op.parameters) {
            const p = param as Record<string, unknown>;
            if (!p.name) errors.push(`${method.toUpperCase()} ${path} - Parameter missing 'name'`);
            if (!p.in) errors.push(`${method.toUpperCase()} ${path} - Parameter missing 'in'`);
            if (p.in === "path" && !p.required) {
              errors.push(`${method.toUpperCase()} ${path} - Path parameter '${p.name}' must be required`);
            }
          }
        }
      }
    }
  }

  // Components / Schemas
  const components = spec.components as Record<string, unknown> | undefined;
  const definitions = spec.definitions as Record<string, unknown> | undefined;
  const schemaSource = (components?.schemas || definitions) as Record<string, unknown> | undefined;
  
  if (schemaSource) {
    for (const [name, schema] of Object.entries(schemaSource)) {
      const s = schema as Record<string, unknown>;
      const props = s.properties as Record<string, unknown> | undefined;
      schemas.push({
        name,
        type: (s.type as string) || "object",
        properties: props ? Object.keys(props).length : 0,
      });
    }
  }

  // Security schemes
  const secSchemes = (components?.securitySchemes || (spec.securityDefinitions as Record<string, unknown>)) as Record<string, unknown> | undefined;
  if (secSchemes) {
    for (const [name, scheme] of Object.entries(secSchemes)) {
      const s = scheme as Record<string, unknown>;
      securitySchemes.push(`${name} (${s.type}${s.scheme ? `/${s.scheme}` : ""})`);
    }
  }

  const valid = errors.length === 0;

  return {
    valid,
    version,
    title,
    description,
    errors,
    warnings,
    endpoints,
    schemas,
    servers,
    securitySchemes,
    stats: {
      paths: paths ? Object.keys(paths).length : 0,
      operations: operationCount,
      schemas: schemas.length,
      parameters: parameterCount,
    },
  };
}

const METHOD_COLORS: Record<string, string> = {
  GET: "text-green-400 bg-green-500/10",
  POST: "text-blue-400 bg-blue-500/10",
  PUT: "text-amber-400 bg-amber-500/10",
  PATCH: "text-orange-400 bg-orange-500/10",
  DELETE: "text-red-400 bg-red-500/10",
  OPTIONS: "text-purple-400 bg-purple-500/10",
  HEAD: "text-cyan-400 bg-cyan-500/10",
  TRACE: "text-pink-400 bg-pink-500/10",
};

export default function OpenAPIValidator() {
  useToolTracker("openapi-validator", "OpenAPI Validator", "devtools");
  const analytics = useAnalytics();
  const [input, setInput] = useState(SAMPLE_OPENAPI);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "endpoints" | "schemas">("overview");

  const handleValidate = useCallback(() => {
    const r = validateSpec(input);
    setResult(r);
    setActiveTab("overview");
    analytics.trackToolUsage("openapi-validator", { action: "validate", valid: r.valid, version: r.version });
  }, [input, analytics]);

  const handleReset = useCallback(() => {
    setInput(SAMPLE_OPENAPI);
    setResult(null);
  }, []);

  const handleLoadInvalid = useCallback(() => {
    setInput(SAMPLE_INVALID);
    setResult(null);
  }, []);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(input);
  }, [input]);

  const lineCount = useMemo(() => input.split("\n").length, [input]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <StructuredData
        type="WebApplication"
        name="OpenAPI Validator - OpenKit.tools"
        description="Validate and inspect OpenAPI 3.x and Swagger 2.0 specifications"
        url="https://openkit.tools/openapi-validator"
        applicationCategory="DeveloperApplication"
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://openkit.tools" },
          { name: "OpenAPI Validator", url: "https://openkit.tools/openapi-validator" },
        ]}
      />

      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-2xl" aria-label="Home">📋</Link>
            <div>
              <h1 className="text-lg font-bold">OpenAPI / Swagger Validator</h1>
              <p className="text-xs text-muted-foreground">Validate and inspect API specifications</p>
            </div>
          </div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition">
            ← All Tools
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">        {/* Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">OpenAPI / Swagger Spec (JSON)</label>
            <span className="text-xs text-muted-foreground">{lineCount} lines</span>
          </div>
          <Textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setResult(null); }}
            className="bg-card border-border font-mono text-xs min-h-[300px]"
            placeholder="Paste your OpenAPI spec in JSON format..."
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleValidate} size="sm">
            <CheckCircle2 className="w-4 h-4 mr-1" /> Validate
          </Button>
          <Button onClick={handleCopy} variant="outline" size="sm">
            <Copy className="w-4 h-4 mr-1" /> Copy
          </Button>
          <Button onClick={handleLoadInvalid} variant="outline" size="sm">
            <AlertTriangle className="w-4 h-4 mr-1" /> Load Invalid Sample
          </Button>
          <ExportHubV2
            content={input}
            toolName="OpenAPI Validator"
            filename="openapi-spec"
            formats={["json", "txt"]}
          />
          <Button onClick={handleReset} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-1" /> Reset
          </Button>
        </div>

        {/* Result */}
        {result && (
          <div className="space-y-4">
            {/* Status Banner */}
            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${
              result.valid
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}>
              {result.valid ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              <div>
                <p className="font-bold text-sm">
                  {result.valid ? "Valid" : "Invalid"} — {result.title || "Untitled API"}
                </p>
                <p className="text-xs opacity-80">
                  Version: {result.version} • {result.stats.paths} paths • {result.stats.operations} operations • {result.stats.schemas} schemas
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-border">
              {(["overview", "endpoints", "schemas"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm capitalize transition border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-400"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                  {tab === "endpoints" && ` (${result.endpoints.length})`}
                  {tab === "schemas" && ` (${result.schemas.length})`}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-4">
                {result.errors.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-red-400 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" /> Errors ({result.errors.length})
                    </h3>
                    <div className="space-y-1">
                      {result.errors.map((err, i) => (
                        <div key={i} className="text-xs bg-red-500/10 text-red-300 px-3 py-2 rounded-md font-mono">
                          {err}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.warnings.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Warnings ({result.warnings.length})
                    </h3>
                    <div className="space-y-1">
                      {result.warnings.map((warn, i) => (
                        <div key={i} className="text-xs bg-amber-500/10 text-amber-300 px-3 py-2 rounded-md font-mono">
                          {warn}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                  <h3 className="text-sm font-bold flex items-center gap-1.5">
                    <FileJson className="w-4 h-4" /> API Info
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div><span className="text-muted-foreground">Title:</span> <span className="font-medium">{result.title || "N/A"}</span></div>
                    <div><span className="text-muted-foreground">Version:</span> <span className="font-medium">{result.version}</span></div>
                    {result.description && (
                      <div className="col-span-2"><span className="text-muted-foreground">Description:</span> <span className="font-medium">{result.description}</span></div>
                    )}
                  </div>
                </div>

                {result.servers.length > 0 && (
                  <div className="bg-card border border-border rounded-lg p-4 space-y-2">
                    <h3 className="text-sm font-bold flex items-center gap-1.5">
                      <Globe className="w-4 h-4" /> Servers ({result.servers.length})
                    </h3>
                    {result.servers.map((url, i) => (
                      <div key={i} className="text-xs font-mono text-blue-400">{url}</div>
                    ))}
                  </div>
                )}

                {result.securitySchemes.length > 0 && (
                  <div className="bg-card border border-border rounded-lg p-4 space-y-2">
                    <h3 className="text-sm font-bold flex items-center gap-1.5">
                      <Lock className="w-4 h-4" /> Security Schemes ({result.securitySchemes.length})
                    </h3>
                    {result.securitySchemes.map((scheme, i) => (
                      <div key={i} className="text-xs font-mono">{scheme}</div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Endpoints Tab */}
            {activeTab === "endpoints" && (
              <div className="space-y-1">
                {result.endpoints.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No endpoints found</p>
                ) : (
                  result.endpoints.map((ep, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2 bg-card border border-border rounded-md text-xs font-mono">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${METHOD_COLORS[ep.method] || ""}`}>
                        {ep.method}
                      </span>
                      <span className="font-medium">{ep.path}</span>
                      {ep.summary && <span className="text-muted-foreground ml-auto hidden sm:block">{ep.summary}</span>}
                      {ep.tags && ep.tags.length > 0 && (
                        <div className="flex gap-1 ml-auto sm:ml-0">
                          {ep.tags.map((tag) => (
                            <span key={tag} className="px-1.5 py-0.5 bg-accent rounded text-[10px]">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Schemas Tab */}
            {activeTab === "schemas" && (
              <div className="space-y-1">
                {result.schemas.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No schemas found</p>
                ) : (
                  result.schemas.map((schema, i) => (
                    <div key={i} className="flex items-center gap-3 px-3 py-2 bg-card border border-border rounded-md text-xs font-mono">
                      <Code2 className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="font-medium">{schema.name}</span>
                      <span className="text-muted-foreground">({schema.type})</span>
                      <span className="ml-auto text-muted-foreground">{schema.properties} properties</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {result && (
          <StatsBar stats={[
            { label: "Version", value: result.version },
            { label: "Paths", value: result.stats.paths.toString() },
            { label: "Operations", value: result.stats.operations.toString() },
            { label: "Schemas", value: result.stats.schemas.toString() },
          ]} />
        )}

        <RelatedTools currentPath="/openapi-validator" />

        {/* Guide */}
        <GeoContentLayout>
          <GeoSection title="About OpenAPI Validator" icon="📖">
            <p>Validate your OpenAPI 3.x or Swagger 2.0 specifications directly in your browser. Get instant feedback on errors, warnings, and best practice suggestions. Browse endpoints, schemas, and security configurations at a glance.</p>
          </GeoSection>

          <QuickStartGuide steps={[
            { title: "Paste your spec", description: "Paste your OpenAPI/Swagger JSON specification" },
            { title: "Click Validate", description: "Get instant validation with errors and warnings" },
            { title: "Browse endpoints", description: "View all API endpoints with methods, paths, and tags" },
            { title: "Inspect schemas", description: "Review data models and their properties" },
          ]} />

          <FeatureGrid features={[
            { icon: "✅", title: "Validation", description: "Check spec structure, required fields, and consistency" },
            { icon: "🛣️", title: "Endpoint Viewer", description: "Browse all paths with method badges and tags" },
            { icon: "📦", title: "Schema Inspector", description: "View data models and property counts" },
            { icon: "🔐", title: "Security Review", description: "See authentication schemes at a glance" },
            { icon: "🌐", title: "Server Info", description: "View configured server URLs and environments" },
            { icon: "⚠️", title: "Best Practices", description: "Warnings for missing descriptions, operationIds, etc." },
          ]} />

          <ToolFAQ faqs={[
            { question: "Does this support YAML specs?", answer: "Currently JSON only. Use our YAML to JSON converter to transform your spec first, then paste the JSON here." },
            { question: "Which OpenAPI versions are supported?", answer: "OpenAPI 3.0.x, 3.1.x, and Swagger 2.0 are all supported for structural validation." },
            { question: "Is my API spec sent to a server?", answer: "No. All validation happens 100% client-side in your browser. Your spec never leaves your device." },
            { question: "How thorough is the validation?", answer: "We check required fields, path structure, parameter definitions, response codes, security schemes, and best practices. For full OAS compliance, consider also using official tooling." },
          ]} />
        </GeoContentLayout>

        <LastUpdated date="2026-02-07" />
      </div>
    </main>
  );
}
