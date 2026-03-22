/* eslint-disable react/no-unescaped-entities */
import { Shield, Eye, Lock, Server, Cookie, FileText } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { BreadcrumbStructuredData } from "@/components/structured-data";

export default function PrivacyPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy",
    "description": "Privacy Policy for OpenKit.tools - How we handle your data and protect your privacy",
    "url": "https://openkit.tools/privacy",
    "datePublished": "2026-02-01",
    "dateModified": "2026-02-01",
    "isPartOf": {
      "@type": "WebSite",
      "name": "OpenKit.tools",
      "url": "https://openkit.tools"
    },
    "about": {
      "@type": "Thing",
      "name": "Privacy Policy"
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Script
        id="privacy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 text-white rounded-2xl shadow-refined-lg mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your privacy matters. Here's how we protect it.
            </p>
            <p className="text-sm text-muted-foreground">
              Last updated: February 1, 2026
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <BreadcrumbStructuredData
          items={[
            { name: "Home", url: "https://openkit.tools" },
            { name: "Privacy Policy", url: "https://openkit.tools/privacy" },
          ]}
        />
        
        {/* Key Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 bg-card border border-border rounded-2xl shadow-refined-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Client-Side Processing</h3>
            <p className="text-sm text-muted-foreground">
              All tools run in your browser. Your data never leaves your device.
            </p>
          </div>
          
          <div className="p-6 bg-card border border-border rounded-2xl shadow-refined-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl mb-4">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">No Data Storage</h3>
            <p className="text-sm text-muted-foreground">
              We don't collect, store, or transmit your tool inputs or outputs.
            </p>
          </div>
          
          <div className="p-6 bg-card border border-border rounded-2xl shadow-refined-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl mb-4">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">No Accounts</h3>
            <p className="text-sm text-muted-foreground">
              Use all tools without signing up. No personal information required.
            </p>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-500" />
              1. Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              OpenKit.tools ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our website and services at openkit.tools (the "Service").
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong>TL;DR:</strong> We don't collect your tool data. All processing happens client-side in your browser. We only collect anonymous analytics to improve the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6 text-green-500" />
              2. Information We DON'T Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Here's what we explicitly do NOT collect:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Tool inputs and outputs:</strong> Any text, code, files, or data you enter into our tools</li>
              <li><strong>Personal information:</strong> No names, phone numbers, or personal details are collected for standard tools</li>
              <li><strong>Account data (AI tools only):</strong> If you create an account for AI-powered features, we store your email address and a securely hashed password. We also track your usage count for rate limiting purposes</li>
              <li><strong>AI tool uploads:</strong> When using AI-powered tools (e.g., Chart Pattern Analyzer), uploaded content (such as images) is sent to third-party AI model providers for processing. This data is transmitted securely, processed in real time, and is not stored by us or the provider beyond the request</li>
              <li><strong>Sensitive data:</strong> No financial, health, or identification documents</li>
              <li><strong>File contents:</strong> Files processed (e.g., images, documents) stay in your browser</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4 font-semibold">
              Everything you do in our tools happens 100% client-side in your browser. We never see, store, or transmit your data.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">3. Information We DO Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect minimal, anonymous data to improve the Service:
            </p>
            
            <h3 className="text-xl font-bold mb-3 mt-6 flex items-center gap-2">
              <Cookie className="w-5 h-5 text-orange-500" />
              Analytics Data (via Google Analytics)
            </h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Pages visited and tools used</li>
              <li>Device type, browser, and operating system</li>
              <li>Referral source (where you came from)</li>
              <li>Geographic location (country/city level only)</li>
              <li>Session duration and interactions</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              This data is anonymized and aggregated. We use it to understand which tools are popular, identify bugs, and improve user experience.
            </p>

            <h3 className="text-xl font-bold mb-3 mt-6">Technical Data (Automatic)</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>IP address (for rate limiting and abuse prevention)</li>
              <li>Browser user agent</li>
              <li>Timestamps of requests</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              This information is automatically logged by our web server and is not linked to your identity.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">4. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the limited data we collect to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Operate and maintain the Service</li>
              <li>Improve tool functionality and user experience</li>
              <li>Analyze usage patterns and identify popular features</li>
              <li>Detect and prevent abuse or malicious activity</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              <strong>We do NOT:</strong>
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Sell or share your data with third parties</li>
              <li>Use your data for advertising or marketing</li>
              <li>Track you across other websites</li>
              <li>Create user profiles or target you personally</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use minimal cookies:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Google Analytics cookies:</strong> Anonymous session tracking (_ga, _gid)</li>
              <li><strong>Preference cookies:</strong> Theme (dark/light mode), settings</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You can disable cookies in your browser settings. The Service will still work without them (except preferences won't be saved).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">6. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Google Analytics:</strong> Anonymous usage analytics (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Privacy Policy</a>)</li>
              <li><strong>Cloudflare:</strong> CDN and DDoS protection (<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Privacy Policy</a>)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              These services may collect data according to their own privacy policies. We recommend reviewing them.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">7. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We don&apos;t store your data — all processing is client-side. All data is transmitted using HTTPS/TLS encryption. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">8. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Depending on your location, you may have rights under GDPR, CCPA, or other privacy laws:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Access:</strong> Request what data we have about you (spoiler: very little)</li>
              <li><strong>Deletion:</strong> Request deletion of your data</li>
              <li><strong>Opt-out:</strong> Disable analytics cookies in your browser</li>
              <li><strong>Portability:</strong> Request a copy of your data</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise these rights, contact us at{" "}
              <a href="mailto:privacy@openkit.tools" className="text-blue-500 hover:underline">
                privacy@openkit.tools
              </a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you are a parent and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">10. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the Service after any changes constitutes acceptance of the new policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none text-muted-foreground space-y-2 mt-4">
              <li>📧 Email: <a href="mailto:privacy@openkit.tools" className="text-blue-500 hover:underline">privacy@openkit.tools</a></li>
              <li>🌐 Website: <a href="https://openkit.tools" className="text-blue-500 hover:underline">https://openkit.tools</a></li>
            </ul>
          </section>

        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl shadow-refined text-center">
          <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Your Data Stays Private</h3>
          <p className="text-muted-foreground mb-6">
            All tools process data client-side. We never see or store your information.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all shadow-refined-lg"
          >
            Start Using OpenKit.tools Safely
          </Link>
        </div>
      </div>
    </main>
  );
}
