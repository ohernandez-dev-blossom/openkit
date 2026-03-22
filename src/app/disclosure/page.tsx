"use client";
import Link from 'next/link';
import { Heart, ExternalLink, Shield, Eye } from 'lucide-react';
import { StructuredData, BreadcrumbStructuredData } from '@/components/structured-data';
import { QuickStartGuide } from '@/components/quick-start-guide';
import { ToolFAQ } from '@/components/tool-faq';
import { LastUpdated } from '@/components/last-updated';
import { HowToSchema } from '@/components/seo/howto-schema';
import { MarkdownContent } from '@/components/markdown-content';
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from '@/components/geo-content-layout';
import { disclosureGuideContent } from '@/content/disclosure-guide';
import { useAnalytics } from '@/hooks/use-analytics';

export default function DisclosurePage() {
  const analytics = useAnalytics();
  
  // Track page engagement
  analytics.trackToolUsage('disclosure', { action: 'view' });
  return (
    <main className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-accent-foreground mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Affiliate & Sponsorship Disclosure
          </h1>
          <p className="text-muted-foreground text-sm">
            Last Updated: {disclosureGuideContent.lastUpdated} • Version {disclosureGuideContent.version}
          </p>
        </div>

        {/* TL;DR Section */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            Summary (TL;DR)
          </h2>
          <ul className="space-y-2 text-sm text-accent-foreground">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>OpenKit.tools is free and always will be</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>We accept voluntary donations (Ko-fi, GitHub Sponsors)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>We currently have NO affiliate links or paid sponsors</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>If we add them in the future, we&apos;ll be 100% transparent</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>We only promote products we genuinely use and trust</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Your privacy is our priority - no tracking, no data collection</span>
            </li>
          </ul>
        </div>

        {/* Full Disclosure */}
        <div className="prose prose-invert prose-zinc max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Full Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed">
              OpenKit.tools is committed to transparency. This page explains our financial relationships
              and how we may earn revenue from this website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              Support & Donations
            </h2>

            <h3 className="text-xl font-medium mb-3 text-foreground">Voluntary Support</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              OpenKit.tools accepts voluntary financial support through:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>Ko-fi</strong> - One-time or monthly donations</li>
              <li><strong>GitHub Sponsors</strong> - Recurring sponsorship from individuals or organizations</li>
            </ul>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-4">
              <p className="text-blue-300 text-sm mb-2">
                <strong>Important:</strong> All tools remain 100% free regardless of whether you support us.
                Donations are purely voluntary and help cover hosting costs and development time.
              </p>
              <p className="text-blue-300 text-sm">
                <strong>No strings attached:</strong> We don&apos;t collect any personal information from donors
                beyond what Ko-fi or GitHub provides to us. We don&apos;t track who donates or correlate it with usage data.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Affiliate Relationships</h2>

            <div className="bg-card border border-border rounded-lg p-4 mb-4">
              <p className="text-accent-foreground text-sm">
                <strong>Current Status (as of Feb 2026):</strong> OpenKit.tools does <em>not</em> currently
                have any active affiliate relationships or affiliate links.
              </p>
            </div>

            <h3 className="text-xl font-medium mb-3 text-foreground">Future Plans</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may join affiliate programs for tools and services we genuinely use and recommend, such as:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Hosting Providers (e.g., DigitalOcean, Vercel)</li>
              <li>Domain Registrars (e.g., Namecheap, Cloudflare)</li>
              <li>Developer Tools (e.g., IDEs, SaaS platforms)</li>
              <li>Educational Resources (e.g., books, courses)</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 text-foreground">Our Affiliate Policy</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When we do add affiliate links (if ever), we commit to:
            </p>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>Honesty First</strong> - We will only recommend products/services we genuinely use or believe are valuable</li>
              <li><strong>Clear Labeling</strong> - All affiliate links will be clearly marked with &quot;affiliate link&quot; or similar disclosure</li>
              <li><strong>No Bias</strong> - Affiliate commissions will not influence our recommendations or tool functionality</li>
              <li><strong>Relevant Only</strong> - Affiliate links will only appear where contextually relevant</li>
              <li><strong>SEO Compliance</strong> - All affiliate links will include <code className="text-xs bg-muted px-1 py-0.5 rounded">rel=&quot;nofollow sponsored&quot;</code> attributes</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Sponsorships</h2>

            <div className="bg-card border border-border rounded-lg p-4 mb-4">
              <p className="text-accent-foreground text-sm">
                <strong>Current Status (as of Feb 2026):</strong> OpenKit.tools does <em>not</em> currently
                have any paid sponsors.
              </p>
            </div>

            <h3 className="text-xl font-medium mb-3 text-foreground">Sponsorship Guidelines</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If we accept sponsorships in the future:
            </p>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2 mb-4">
              <li><strong>Transparency</strong> - All sponsored content will be clearly labeled</li>
              <li><strong>Editorial Independence</strong> - Sponsors do not control content, recommendations, or tool functionality</li>
              <li><strong>Relevance</strong> - Sponsors must be relevant to developers and our audience</li>
              <li><strong>Privacy Respect</strong> - We will not partner with companies that violate user privacy</li>
              <li><strong>Quality Standards</strong> - Sponsors must offer legitimate, high-quality products/services</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
              <Eye className="w-6 h-6 text-purple-500" />
              Data & Privacy
            </h2>

            <h3 className="text-xl font-medium mb-3 text-foreground">Tracking Affiliate Clicks</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>We use Plausible Analytics (privacy-first, no cookies, no personal data)</li>
              <li>Aggregate data only: &quot;X people clicked this link&quot;</li>
              <li>No individual user tracking or identification</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 text-foreground">Third-Party Services</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Ko-fi and GitHub handle payment processing - we don&apos;t see payment details</li>
              <li>Affiliate platforms (if we join them) may use cookies on their own sites after you click</li>
              <li>We don&apos;t share user data with affiliate partners or sponsors</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">FTC Compliance</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              OpenKit.tools complies with the <strong>FTC&apos;s Endorsement Guides</strong> and{' '}
              <strong>EU Consumer Rights Directive</strong>:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>All material connections (sponsorships, affiliate relationships) are clearly disclosed</li>
              <li>Endorsements reflect honest opinions and actual experiences</li>
              <li>We do not make deceptive claims or misrepresent products/services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Questions?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have questions about our monetization, affiliate relationships, or sponsorships:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>
                <a
                  href="https://twitter.com/openkit_tools"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                >
                  Twitter: @openkit_tools <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We&apos;re committed to transparency and will answer any questions openly.
            </p>
          </section>
        </div>

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Overview" subtitle="Understanding our transparency commitment" variant="highlight">
            <QuickStartGuide steps={disclosureGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="why-disclosure" title={disclosureGuideContent.introduction.title} subtitle="Our commitment to transparency" variant="default">
            <MarkdownContent content={disclosureGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="support-details" title="Support & Monetization Details" subtitle="How OpenKit.tools operates financially" variant="default">
            <FeatureGrid features={disclosureGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-support" title={disclosureGuideContent.howToUse.title} subtitle="Ways to contribute to ongoing development" variant="minimal">
            <HowToSchema name={`How to support ${disclosureGuideContent.toolName}`} description="Step-by-step guide to supporting OpenKit.tools" steps={disclosureGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${disclosureGuideContent.toolPath}`} />
            <MarkdownContent content={disclosureGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know about our policies" variant="default">
            <ToolFAQ faqs={disclosureGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="privacy" title={disclosureGuideContent.security.title} subtitle="Your data protection is our foundation" variant="highlight">
            <MarkdownContent content={disclosureGuideContent.security.content} />
          </GeoSection>

          {disclosureGuideContent.stats && (
            <GeoSection id="stats" title="Current Status" subtitle="Transparency metrics" variant="minimal">
              <StatsBar stats={Object.entries(disclosureGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={disclosureGuideContent.lastUpdated} />

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6 mt-8">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Support OpenKit.tools
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            If you find these tools useful and want to support their development, consider making a voluntary donation:
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://ko-fi.com/ohernandez"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-rose-500/20 hover:from-pink-500/30 hover:to-rose-500/30 border border-pink-500/30 rounded-lg text-sm font-medium text-pink-400 hover:text-pink-300 transition-all"
            >
              Support on Ko-fi
            </a>
          </div>
        </div>
      </div>

      <StructuredData
        type="WebApplication"
        name="Affiliate & Sponsorship Disclosure"
        description="Complete transparency about OpenKit.tools monetization, affiliate relationships, and privacy practices. Full disclosure of revenue sources and sponsorships."
        url="https://openkit.tools/disclosure"
        applicationCategory="WebPage"
        datePublished="2026-01-31"
        dateModified={disclosureGuideContent.lastUpdated}
        version={disclosureGuideContent.version}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Disclosure', url: 'https://openkit.tools/disclosure' },
        ]}
      />
    </main>
  );
}
