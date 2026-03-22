/* eslint-disable react/no-unescaped-entities */
import { Cookie, Shield, Settings, Eye, BarChart3, Megaphone } from "lucide-react";
import Link from "next/link";
import { BreadcrumbStructuredData } from "@/components/structured-data";

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-orange-500/10 rounded-xl">
              <Cookie className="w-8 h-8 text-orange-400" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Cookie Policy
              </h1>
              <p className="text-muted-foreground mt-2">Last updated: February 7, 2026</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            This Cookie Policy explains what cookies are, how OpenKit.tools uses them, and how you can control them. We believe in transparency and giving you full control over your privacy.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* What Are Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold">What Are Cookies?</h2>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, understand how you use the site, and provide relevant content.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Cookies can be "session" cookies (deleted when you close your browser) or "persistent" cookies (remain until they expire or you delete them).
              </p>
            </div>
          </section>

          {/* How We Use Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">How We Use Cookies</h2>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                OpenKit.tools uses a minimal number of cookies. All our tools process data 100% client-side in your browser — cookies are only used for site functionality, analytics, and advertising.
              </p>
            </div>
          </section>

          {/* Essential Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold">Essential Cookies</h2>
            </div>
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded font-medium">Always Active</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                These cookies are required for the website to function properly. They cannot be disabled.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Cookie</th>
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Purpose</th>
                      <th className="text-left py-2 text-foreground font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono text-xs">theme</td>
                      <td className="py-2 pr-4">Stores your dark/light mode preference</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono text-xs">cookie-consent</td>
                      <td className="py-2 pr-4">Remembers your cookie preferences</td>
                      <td className="py-2">1 year</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-xs">pinned-tools</td>
                      <td className="py-2 pr-4">Stores your pinned/favorite tools (localStorage)</td>
                      <td className="py-2">Persistent</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Analytics Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold">Analytics Cookies</h2>
            </div>
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded font-medium">Optional — Requires Consent</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We use Google Analytics to understand how visitors interact with our website. This helps us improve the tools and prioritize new features. Analytics cookies collect anonymized data about page views, tool usage, and general traffic patterns.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Cookie</th>
                      <th className="text-left py-2 pr-4 text-foreground font-semibold">Purpose</th>
                      <th className="text-left py-2 text-foreground font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono text-xs">_ga</td>
                      <td className="py-2 pr-4">Distinguishes unique visitors</td>
                      <td className="py-2">2 years</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-4 font-mono text-xs">_ga_*</td>
                      <td className="py-2 pr-4">Maintains session state for Google Analytics 4</td>
                      <td className="py-2">2 years</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-xs">_gid</td>
                      <td className="py-2 pr-4">Distinguishes unique visitors (24h)</td>
                      <td className="py-2">24 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Advertising Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Megaphone className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold">Advertising Cookies</h2>
            </div>
            <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded font-medium">Optional — Requires Consent</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We use Google AdSense to display ads that help fund this free service. Advertising cookies may be used for ad personalization and performance measurement. You can reject these cookies entirely — the site will still work perfectly.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                When advertising cookies are rejected, you may still see ads, but they won't be personalized to your interests.
              </p>
            </div>
          </section>

          {/* Do Not Track */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold">Do Not Track (DNT)</h2>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                We respect the Do Not Track browser signal. If your browser sends a DNT header, we automatically reject all non-essential cookies without showing you the consent banner. No analytics or advertising cookies will be set.
              </p>
            </div>
          </section>

          {/* How to Manage Cookies */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold">How to Manage Cookies</h2>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                You have several options to control cookies:
              </p>
              <ul className="text-muted-foreground space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-foreground font-medium">Cookie Banner:</span>
                  <span>When you first visit, choose Accept All, Reject All, or Customize your preferences.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground font-medium">Cookie Settings:</span>
                  <span>Click "Cookie Settings" in the footer at any time to change your preferences.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-foreground font-medium">Browser Settings:</span>
                  <span>Most browsers allow you to block or delete cookies through their settings. Note that blocking essential cookies may affect site functionality.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Changes to This Policy */}
          <section>
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-bold">Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Cookie Policy from time to time. Any changes will be reflected on this page with an updated "Last updated" date. We encourage you to review this policy periodically.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section>
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-bold">Questions?</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about our use of cookies, please review our{" "}
                <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                  Privacy Policy
                </Link>{" "}
                or contact us through our{" "}
                <Link href="/privacy-request" className="text-blue-400 hover:text-blue-300 underline">
                  Privacy Request
                </Link>{" "}
                page.
              </p>
            </div>
          </section>
        </div>
      </div>

      <BreadcrumbStructuredData
        items={[
          { name: "OpenKit.tools", url: "https://openkit.tools" },
          { name: "Cookie Policy", url: "https://openkit.tools/cookie-policy" },
        ]}
      />
    </main>
  );
}
