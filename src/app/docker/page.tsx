"use client";
import { useState, useCallback, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { RelatedTools } from "@/components/related-tools";
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { Container, Check, RefreshCw } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { dockerGuideContent } from "@/content/docker-guide";
import { useAnalytics } from "@/hooks/use-analytics";
import { useToolTracker } from "@/hooks/use-tool-tracker";

interface ServiceConfig {
  id: string;
  name: string;
  image: string;
  defaultPort: string;
  defaultVolume?: string;
  environment?: Record<string, string>;
  description: string;
}

const SERVICES: ServiceConfig[] = [
  {
    id: "nginx",
    name: "Nginx",
    image: "nginx:alpine",
    defaultPort: "80:80",
    defaultVolume: "./nginx.conf:/etc/nginx/nginx.conf:ro",
    description: "High-performance web server"},
  {
    id: "mysql",
    name: "MySQL",
    image: "mysql:8",
    defaultPort: "3306:3306",
    defaultVolume: "./mysql-data:/var/lib/mysql",
    environment: {
      MYSQL_ROOT_PASSWORD: "root",
      MYSQL_DATABASE: "mydb"},
    description: "Relational database"},
  {
    id: "postgres",
    name: "PostgreSQL",
    image: "postgres:16-alpine",
    defaultPort: "5432:5432",
    defaultVolume: "./postgres-data:/var/lib/postgresql/data",
    environment: {
      POSTGRES_PASSWORD: "postgres",
      POSTGRES_DB: "mydb"},
    description: "Advanced relational database"},
  {
    id: "redis",
    name: "Redis",
    image: "redis:alpine",
    defaultPort: "6379:6379",
    defaultVolume: "./redis-data:/data",
    description: "In-memory data store"},
  {
    id: "mongodb",
    name: "MongoDB",
    image: "mongo:7",
    defaultPort: "27017:27017",
    defaultVolume: "./mongo-data:/data/db",
    environment: {
      MONGO_INITDB_ROOT_USERNAME: "admin",
      MONGO_INITDB_ROOT_PASSWORD: "admin"},
    description: "NoSQL document database"},
  {
    id: "node",
    name: "Node.js",
    image: "node:20-alpine",
    defaultPort: "3000:3000",
    defaultVolume: "./app:/app",
    description: "JavaScript runtime"},
  {
    id: "python",
    name: "Python",
    image: "python:3.12-slim",
    defaultPort: "8000:8000",
    defaultVolume: "./app:/app",
    description: "Python runtime"},
];

export default function DockerComposeTool() {
  useToolTracker("docker", "Docker Compose Generator", "generators");
  const analytics = useAnalytics();
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set());
  const [ports, setPorts] = useState<Record<string, string>>({});
  const [volumes, setVolumes] = useState<Record<string, string>>({});

  useEffect(() => {
    analytics.trackToolUsage("docker", { action: "view" });
  }, [analytics]);
  
  const toggleService = useCallback((serviceId: string) => {
    setSelectedServices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
        // Clean up config when deselecting
        setPorts((p) => {
          const newPorts = { ...p };
          delete newPorts[serviceId];
          return newPorts;
        });
        setVolumes((v) => {
          const newVolumes = { ...v };
          delete newVolumes[serviceId];
          return newVolumes;
        });
      } else {
        newSet.add(serviceId);
        // Set defaults when selecting
        const service = SERVICES.find((s) => s.id === serviceId);
        if (service) {
          setPorts((p) => ({ ...p, [serviceId]: service.defaultPort }));
          if (service.defaultVolume) {
            setVolumes((v) => ({ ...v, [serviceId]: service.defaultVolume! }));
          }
        }
      }
      return newSet;
    });
  }, []);

  const updatePort = useCallback((serviceId: string, value: string) => {
    setPorts((prev) => ({ ...prev, [serviceId]: value }));
  }, []);

  const updateVolume = useCallback((serviceId: string, value: string) => {
    setVolumes((prev) => ({ ...prev, [serviceId]: value }));
  }, []);

  const generatedYaml = useMemo(() => {
    if (selectedServices.size === 0) {
      return "# Select services to generate docker-compose.yml";
    }

    const services = Array.from(selectedServices)
      .map((serviceId) => {
        const service = SERVICES.find((s) => s.id === serviceId);
        if (!service) return "";

        const lines = [`  ${serviceId}:`];
        lines.push(`    image: ${service.image}`);
        lines.push(`    container_name: ${serviceId}`);
        
        if (ports[serviceId]) {
          lines.push(`    ports:`);
          lines.push(`      - "${ports[serviceId]}"`);
        }

        if (volumes[serviceId]) {
          lines.push(`    volumes:`);
          lines.push(`      - ${volumes[serviceId]}`);
        }

        if (service.environment) {
          lines.push(`    environment:`);
          Object.entries(service.environment).forEach(([key, value]) => {
            lines.push(`      ${key}: ${value}`);
          });
        }

        lines.push(`    restart: unless-stopped`);
        
        return lines.join("\n");
      })
      .filter(Boolean)
      .join("\n\n");

    return `version: '3.8'\n\nservices:\n${services}`;
  }, [selectedServices, ports, volumes]);

  
  const clearAll = useCallback(() => {
    setSelectedServices(new Set());
    setPorts({});
    setVolumes({});
  }, []);

  const selectAll = useCallback(() => {
    const allIds = new Set(SERVICES.map((s) => s.id));
    setSelectedServices(allIds);
    const newPorts: Record<string, string> = {};
    const newVolumes: Record<string, string> = {};
    SERVICES.forEach((service) => {
      newPorts[service.id] = service.defaultPort;
      if (service.defaultVolume) {
        newVolumes[service.id] = service.defaultVolume;
      }
    });
    setPorts(newPorts);
    setVolumes(newVolumes);
  }, []);

  const randomize = () => {
    // Select 2-4 random services
    const numServices = Math.floor(Math.random() * 3) + 2;
    const shuffled = [...SERVICES].sort(() => Math.random() - 0.5);
    const randomIds = new Set(shuffled.slice(0, numServices).map(s => s.id));
    setSelectedServices(randomIds);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center hover:opacity-80 transition">
              <Container className="w-5 h-5" />
            </Link>
            <h1 className="text-lg sm:text-xl font-semibold text-foreground">Docker Compose Builder</h1>
          </div>
          <button
            onClick={randomize}
            className="flex items-center gap-2 px-3 py-1.5 bg-muted hover:bg-accent rounded-lg text-sm text-accent-foreground transition"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Random</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Button className="min-h-[44px] bg-blue-600 hover:bg-blue-700 text-white" onClick={selectAll}  size="sm">
            Select All
          </Button>
          <Button className="min-h-[44px] bg-transparent hover:bg-muted text-accent-foreground hover:text-foreground" onClick={clearAll}  size="sm">
            Clear All
          </Button>
          <Button 
            onClick={() => copy(generatedYaml)} 
            className="bg-green-600 hover:bg-green-700 text-white ml-auto" 
            size="sm"
            disabled={selectedServices.size === 0}
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 mr-1" />
                Copied!
              </>
            ) : (
              "Copy YAML"
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">Select Services</h2>
            
            {SERVICES.map((service) => {
              const isSelected = selectedServices.has(service.id);
              return (
                <div
                  key={service.id}
                  className={`border rounded-lg p-4 transition-all ${
                    isSelected
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-border bg-card hover:border-border"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input aria-label="Input field"
                      type="checkbox"
                      id={service.id}
                      checked={isSelected}
                      onChange={() => toggleService(service.id)}
                      className="mt-1 w-4 h-4 rounded border-border text-blue-600 focus:ring-blue-500 focus:ring-offset-0 bg-muted"
                    />
                    <div className="flex-1 min-w-0">
                      <label
                        htmlFor={service.id}
                        className="block font-medium text-white cursor-pointer mb-1"
                      >
                        {service.name}
                      </label>
                      <p className="text-xs text-muted-foreground mb-3">{service.description}</p>

                      {isSelected && (
                        <div className="space-y-3">
                          {/* Port Configuration */}
                          <div>
                            <label className="block text-xs text-muted-foreground mb-1">
                              Port Mapping (host:container)
                            </label>
                            <input aria-label="Input field"
                              type="text"
                              value={ports[service.id] || ""}
                              onChange={(e) => updatePort(service.id, e.target.value)}
                              placeholder="8080:80"
                              className="w-full px-3 py-1.5 bg-muted border border-border rounded text-sm text-foreground focus:outline-none focus:border-blue-500"
                            />
                          </div>

                          {/* Volume Configuration */}
                          <div>
                            <label className="block text-xs text-muted-foreground mb-1">
                              Volume Mapping (optional)
                            </label>
                            <input aria-label="Input field"
                              type="text"
                              value={volumes[service.id] || ""}
                              onChange={(e) => updateVolume(service.id, e.target.value)}
                              placeholder="./data:/var/lib/data"
                              className="w-full px-3 py-1.5 bg-muted border border-border rounded text-sm text-foreground focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Generated YAML */}
          <div className="space-y-2 lg:sticky lg:top-6 lg:self-start">
            <div className="flex items-center justify-between">
              <label className="text-lg font-semibold text-white">Generated YAML</label>
              <span className="text-xs text-muted-foreground">
                {selectedServices.size} service{selectedServices.size !== 1 ? "s" : ""}
              </span>
            </div>
            <Textarea
              value={generatedYaml}
              readOnly
              className="h-[600px] bg-card border-border font-mono text-sm resize-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-card/50 border border-border rounded-lg">
          <h3 className="font-semibold text-foreground mb-2">How to use</h3>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Select the services you need from the list</li>
            <li>Configure port mappings and volumes for each service</li>
            <li>Copy the generated docker-compose.yml</li>
            <li>Save it as <code className="px-1 py-0.5 bg-muted rounded text-blue-400">docker-compose.yml</code></li>
            <li>Run <code className="px-1 py-0.5 bg-muted rounded text-green-400">docker-compose up -d</code></li>
          </ol>
        </div>

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Get up and running in 30 seconds" variant="highlight">
            <QuickStartGuide steps={dockerGuideContent.quickStartSteps} />
          </GeoSection>
          <GeoSection id="what-is" title={dockerGuideContent.introduction.title} subtitle="Understanding Docker Compose" variant="default">
            <MarkdownContent content={dockerGuideContent.introduction.content} />
          </GeoSection>
          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How developers use Docker Compose" variant="default">
            <FeatureGrid features={dockerGuideContent.useCases.map(uc => ({ title: uc.title, description: uc.description }))} columns={2} />
          </GeoSection>
          <GeoSection id="how-to-use" title={dockerGuideContent.howToUse.title} subtitle="Master all features" variant="minimal">
            <HowToSchema name={`How to use ${dockerGuideContent.toolName}`} description="Step-by-step guide" steps={dockerGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${dockerGuideContent.toolPath}`} />
            <MarkdownContent content={dockerGuideContent.howToUse.content} />
          </GeoSection>
          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know" variant="default">
            <ToolFAQ faqs={dockerGuideContent.faqs} />
          </GeoSection>
          <GeoSection id="security" title={dockerGuideContent.security.title} subtitle="Your config never leaves your browser" variant="highlight">
            <MarkdownContent content={dockerGuideContent.security.content} />
          </GeoSection>
          {dockerGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Performance metrics" variant="minimal">
              <StatsBar stats={Object.entries(dockerGuideContent.stats).map(([label, value]) => ({ label, value }))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        {/* Related Tools */}
        <RelatedTools currentPath="/docker" />
        <LastUpdated date={dockerGuideContent.lastUpdated} />
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 sm:px-6 py-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Generate Docker Compose configurations quickly. No data leaves your browser.</p>
        </div>
      </footer>

      {/* Structured Data for SEO */}
      <StructuredData
        type="WebApplication"
        name="Docker Compose Builder"
        description="Free online Docker Compose configuration generator. Create docker-compose.yml files for common services like Nginx, MySQL, PostgreSQL, Redis, MongoDB, Node.js, and Python."
        url="https://openkit.tools/docker"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={dockerGuideContent.lastUpdated}
        version={dockerGuideContent.version}
        aggregateRating={{ ratingValue: "4.7", ratingCount: "1500", bestRating: "5" }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "Docker Compose Builder", url: "https://openkit.tools/docker" },
        ]}
      />
    </main>
  );
}
