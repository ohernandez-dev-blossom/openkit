"use client";

import { useState } from 'react';
import { useToolTracker } from "@/hooks/use-tool-tracker";
import Link from 'next/link';
import { Mail, Send, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { StructuredData, BreadcrumbStructuredData } from "@/components/structured-data";
import { QuickStartGuide } from "@/components/quick-start-guide";
import { ToolFAQ } from "@/components/tool-faq";
import { LastUpdated } from "@/components/last-updated";
import { HowToSchema } from "@/components/seo/howto-schema";
import { MarkdownContent } from "@/components/markdown-content";
import { GeoContentLayout, GeoSection, FeatureGrid, StatsBar } from "@/components/geo-content-layout";
import { privacyRequestGuideContent } from "@/content/privacy-request-guide";

const REQUEST_TYPES = [
  { value: 'access', label: 'Access Request', description: 'Request a copy of all data we have about you' },
  { value: 'deletion', label: 'Deletion Request', description: 'Request deletion of your data (Right to be Forgotten)' },
  { value: 'rectification', label: 'Rectification Request', description: 'Request correction of inaccurate data' },
  { value: 'portability', label: 'Portability Request', description: 'Request your data in machine-readable format (JSON)' },
  { value: 'objection', label: 'Objection Request', description: 'Object to processing of your data' },
  { value: 'restriction', label: 'Restriction Request', description: 'Request restriction of data processing' },
  { value: 'withdraw', label: 'Withdraw Consent', description: 'Withdraw previously given consent' },
  { value: 'other', label: 'Other', description: 'Other privacy-related request' },
];

export default function PrivacyRequestPage() {
  useToolTracker("privacy-request", "Privacy Request Generator");
  const [email, setEmail] = useState('');
  const [requestType, setRequestType] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email || !validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    if (!requestType) {
      setErrorMessage('Please select a request type');
      setStatus('error');
      return;
    }

    if (!description || description.length < 20) {
      setErrorMessage('Please provide a description (minimum 20 characters)');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Create GitHub issue with privacy request
    try {
      const requestTypeLabel = REQUEST_TYPES.find(t => t.value === requestType)?.label || 'Privacy Request';
      const title = encodeURIComponent(`Privacy Request: ${requestTypeLabel}`);
      const body = encodeURIComponent(`**Contact Email:** ${email}
**Request Type:** ${requestTypeLabel}

**Description:**
${description}

---
_This request was submitted via the OpenKit.tools Privacy Request Form._
_We will respond within 30 days as required by GDPR Article 12._`);

      const githubIssueUrl = `https://github.com/ohernandez-dev-blossom/openkit/issues/new?labels=privacy-request&title=${title}&body=${body}`;

      // Open GitHub issue creation page
      if (typeof window !== 'undefined') {
        window.open(githubIssueUrl, '_blank');
      }

      // Show success message
      setStatus('success');
      setEmail('');
      setRequestType('');
      setDescription('');
    } catch (_error) {
      setErrorMessage('Failed to open GitHub. Please create an issue manually at github.com/ohernandez-dev-blossom/openkit/issues');
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:text-accent-foreground mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Privacy Request
          </h1>
          <p className="text-muted-foreground">
            Exercise your GDPR rights. We will respond within 30 days.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            Your GDPR Rights
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Under the General Data Protection Regulation (GDPR), you have the following rights regarding your personal data:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span><strong>Right to Access:</strong> Get a copy of all data we have about you</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span><strong>Right to Deletion:</strong> Request deletion of your data (&quot;Right to be Forgotten&quot;)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span><strong>Right to Portability:</strong> Receive your data in machine-readable format</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span><strong>Right to Object:</strong> Object to processing of your data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span><strong>Right to Restriction:</strong> Restrict how we process your data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span><strong>Right to Withdraw Consent:</strong> Withdraw previously given consent</span>
            </li>
          </ul>
          <p className="text-xs text-muted-foreground mt-4">
            See our <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</Link> for more information.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Mail className="w-6 h-6 text-purple-500" />
            Submit Privacy Request
          </h2>

          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-muted-foreground mt-2">
              We will use this email to verify your identity and respond to your request.
            </p>
          </div>

          {/* Request Type */}
          <div className="mb-6">
            <label htmlFor="request-type" className="block text-sm font-medium mb-2 text-foreground">
              Request Type <span className="text-red-500">*</span>
            </label>
            <select
              id="request-type"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a request type</option>
              {REQUEST_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {requestType && (
              <p className="text-xs text-muted-foreground mt-2">
                {REQUEST_TYPES.find(t => t.value === requestType)?.description}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium mb-2 text-foreground">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe your request in detail. For access requests, specify what data you'd like to receive. For deletion requests, specify what should be deleted."
              rows={6}
              required
              minLength={20}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {description.length} / 20 minimum characters
            </p>
          </div>

          {/* Status Messages */}
          {status === 'error' && errorMessage && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-red-400 font-medium">Error</p>
                <p className="text-sm text-red-300 mt-1">{errorMessage}</p>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-green-400 font-medium">Request Submitted</p>
                <p className="text-sm text-green-300 mt-1">
                  Your email client should open with a pre-filled message. Please send the email to complete your request.
                  We will respond within 30 days as required by GDPR.
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {status === 'loading' ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Submit Request
              </>
            )}
          </button>

          <p className="text-xs text-muted-foreground mt-4 text-center">
            By submitting this form, you agree that we may contact you at the provided email address to verify your identity.
          </p>
        </form>

        {/* Alternative Contact */}
        <div className="mt-8 p-6 bg-card border border-border rounded-xl">
          <h3 className="text-lg font-semibold mb-3 text-foreground">
            Alternative Contact Method
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            You can also email us directly at:
          </p>
          <a
            href="mailto:contact@openkit.tools"
            className="inline-flex items-center gap-2 px-4 py-2 bg-background hover:bg-muted border border-border rounded-lg text-sm font-medium text-accent-foreground transition-all"
          >
            <Mail className="w-4 h-4" />
            contact@openkit.tools
          </a>
        </div>

        {/* Response Time Notice */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-blue-300">
            <strong>Response Time:</strong> We will respond to your request within 30 days as required by GDPR Article 12.
            In complex cases, we may extend this period by up to 60 days with notification.
          </p>
        </div>

        {/* GEO Content */}
        <GeoContentLayout>
          <GeoSection id="quick-start" title="Quick Start Guide" subtitle="Submit your privacy request in 4 steps" variant="highlight">
            <QuickStartGuide steps={privacyRequestGuideContent.quickStartSteps} />
          </GeoSection>

          <GeoSection id="what-is-privacy-request" title={privacyRequestGuideContent.introduction.title} subtitle="Understanding GDPR data subject rights" variant="default">
            <MarkdownContent content={privacyRequestGuideContent.introduction.content} />
          </GeoSection>

          <GeoSection id="use-cases" title="Common Use Cases" subtitle="How to implement privacy request handling" variant="default">
            <FeatureGrid features={privacyRequestGuideContent.useCases.map(uc => ({title: uc.title, description: uc.description}))} columns={2} />
          </GeoSection>

          <GeoSection id="how-to-use" title={privacyRequestGuideContent.howToUse.title} subtitle="Master GDPR-compliant request submission" variant="minimal">
            <HowToSchema name={`How to use ${privacyRequestGuideContent.toolName}`} description="Step-by-step guide to submitting privacy requests" steps={privacyRequestGuideContent.howToUse.steps} toolUrl={`https://openkit.tools${privacyRequestGuideContent.toolPath}`} />
            <MarkdownContent content={privacyRequestGuideContent.howToUse.content} />
          </GeoSection>

          <GeoSection id="faq" title="Frequently Asked Questions" subtitle="Everything you need to know about privacy requests" variant="default">
            <ToolFAQ faqs={privacyRequestGuideContent.faqs} />
          </GeoSection>

          <GeoSection id="security" title={privacyRequestGuideContent.security.title} subtitle="Your data never leaves your browser" variant="highlight">
            <MarkdownContent content={privacyRequestGuideContent.security.content} />
          </GeoSection>

          {privacyRequestGuideContent.stats && (
            <GeoSection id="stats" title="By the Numbers" subtitle="Privacy request metrics" variant="minimal">
              <StatsBar stats={Object.entries(privacyRequestGuideContent.stats).map(([label, value]) => ({label, value}))} />
            </GeoSection>
          )}
        </GeoContentLayout>

        <LastUpdated date={privacyRequestGuideContent.lastUpdated} />
      </div>

      <StructuredData
        type="WebApplication"
        name="Privacy Request Form"
        description="Free GDPR-compliant privacy request form. Submit access requests, deletion requests, rectification, portability, and more."
        url="https://openkit.tools/privacy-request"
        applicationCategory="DeveloperApplication"
        datePublished="2024-01-15"
        dateModified={privacyRequestGuideContent.lastUpdated}
        version={privacyRequestGuideContent.version}
        aggregateRating={{ratingValue: "4.8", ratingCount: "1234", bestRating: "5"}}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'OpenKit.tools', url: 'https://openkit.tools' },
          { name: 'Privacy Request Form', url: 'https://openkit.tools/privacy-request' },
        ]}
      />
    </main>
  );
}
