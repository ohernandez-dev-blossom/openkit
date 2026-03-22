/* eslint-disable react/no-unescaped-entities */
import { FileText, Scale, Shield } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { BreadcrumbStructuredData } from "@/components/structured-data";

export default function TermsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service",
    "description": "Terms of Service for OpenKit.tools - Free online developer tools",
    "url": "https://openkit.tools/terms",
    "datePublished": "2026-02-01",
    "dateModified": "2026-02-01",
    "isPartOf": {
      "@type": "WebSite",
      "name": "OpenKit.tools",
      "url": "https://openkit.tools"
    },
    "about": {
      "@type": "Thing",
      "name": "Terms of Service"
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Script
        id="terms-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl shadow-refined-lg mb-4">
              <Scale className="w-8 h-8" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
            { name: "Terms of Service", url: "https://openkit.tools/terms" },
          ]}
        />
        <div className="prose prose-lg dark:prose-invert max-w-none">
          
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-500" />
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using OpenKit.tools ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              OpenKit.tools provides a collection of free online developer tools including, but not limited to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>JSON formatters and validators</li>
              <li>Code converters and generators</li>
              <li>Text manipulation tools</li>
              <li>Color utilities</li>
              <li>Hash generators</li>
              <li>And 100+ other developer utilities</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              All tools process data client-side in your browser. We do not store, transmit, or have access to your data.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <Shield className="w-6 h-6 text-green-500" />
              3. Privacy & Data Processing
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              OpenKit.tools is designed with privacy in mind:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Client-side processing:</strong> All standard tool operations happen in your browser</li>
              <li><strong>No data collection for standard tools:</strong> We do not collect, store, or transmit your input data for standard (non-AI) tools</li>
              <li><strong>Analytics:</strong> We use Google Analytics to understand usage patterns (anonymized)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              For more details, see our <Link href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">4. Accounts & AI-Powered Tools</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Certain AI-powered features require you to create an account:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Account creation:</strong> AI tools require a free account. You provide an email address and password to register</li>
              <li><strong>Email use:</strong> Your email is used solely for authentication, email confirmation, and account recovery. We do not send marketing emails</li>
              <li><strong>Data processing:</strong> When using AI tools (e.g., Chart Pattern Analyzer), your uploaded content (such as chart images) is sent to third-party AI model providers for analysis. This data is processed in real time and is not stored by us or the model provider beyond the duration of the request</li>
              <li><strong>Rate limiting:</strong> Free accounts have usage limits (e.g., 5 analyses per day). Usage is tracked per account to enforce these limits</li>
              <li><strong>AI output disclaimer:</strong> AI-generated analysis is for informational and educational purposes only. It does not constitute financial, investment, or trading advice. Always do your own research before making any financial decisions</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              All other {`160+`} standard tools remain fully free with no account required.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">5. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree to use OpenKit.tools only for lawful purposes. You agree not to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Use the Service in any way that violates applicable laws or regulations</li>
              <li>Attempt to interfere with or disrupt the Service or servers</li>
              <li>Use automated systems (bots, scrapers) to access the Service in a manner that sends more requests than a human can reasonably produce</li>
              <li>Reverse engineer or attempt to extract source code</li>
              <li>Use the Service to harm, threaten, or harass others</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service and its original content, features, and functionality are owned by OpenKit.tools and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">6. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground leading-relaxed">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              IN NO EVENT SHALL OPENKIT.TOOLS, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">8. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service may contain links to third-party websites or services that are not owned or controlled by OpenKit.tools. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify or replace these Terms at any time at our sole discretion. We will provide notice of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of Spain, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms, please contact us at:{" "}
              <a href="mailto:hello@openkit.tools" className="text-blue-500 hover:underline">
                hello@openkit.tools
              </a>
            </p>
          </section>

        </div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-card border border-border rounded-2xl shadow-refined text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Use OpenKit.tools?</h3>
          <p className="text-muted-foreground mb-6">
            No signup required. Start using 118+ free developer tools now.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold transition-all shadow-refined-lg"
          >
            Start Using OpenKit.tools
          </Link>
        </div>
      </div>
    </main>
  );
}
