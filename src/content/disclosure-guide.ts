/**
 * Disclosure Page Content
 * Transparency guide for OpenKit.tools monetization and affiliate relationships
 */

import type { ToolGuideContent } from "./types";

export const disclosureGuideContent: ToolGuideContent = {
  toolName: "Affiliate & Sponsorship Disclosure",
  toolPath: "/disclosure",
  lastUpdated: "2026-02-02",
  version: "1.1",

  quickStartSteps: [
    {
      title: "OpenKit.tools is Free Forever",
      description: "All tools remain 100% free with no premium tiers, paywalls, or feature restrictions. Every developer gets full access to all functionality without payment or registration."
    },
    {
      title: "No Current Affiliates or Sponsors",
      description: "As of February 2026, we have zero active affiliate links or paid sponsorships. We accept voluntary donations through Ko-fi and voluntary support to cover hosting costs and development time."
    },
    {
      title: "Future Transparency Commitment",
      description: "If we add affiliate links or sponsors, we'll clearly label them and only promote products we genuinely use. Your trust is more valuable than any commission or sponsorship deal."
    },
    {
      title: "Privacy-First Always",
      description: "We don't track what you generate, collect personal data, or sell user information. All tools run client-side in your browser. No analytics on your content, no data harvesting, no surveillance."
    }
  ],

  introduction: {
    title: "Why This Page Exists",
    content: `OpenKit.tools operates transparently about how we generate revenue and handle financial relationships. This disclosure page explains our current monetization status, future plans, and commitment to ethical practices.

### Current Revenue Model (2026)

We accept **voluntary donations** through Ko-fi and voluntary support. These platforms handle payment processing - we don't see your payment details. Donations help cover domain registration, hosting costs, and developer time. They're completely optional and don't unlock features or provide special access.

**No affiliate links exist on this site as of February 2026.** We haven't joined affiliate programs for hosting providers, domain registrars, or developer tools. If this changes, we'll update this page immediately and clearly mark all affiliate links.

**No paid sponsors exist as of February 2026.** We haven't accepted sponsorship deals from companies or organizations. If we do, sponsored content will be clearly labeled and sponsors won't control editorial decisions or tool functionality.

### Why Transparency Matters

Developers deserve to know if recommendations are genuine or financially motivated. Undisclosed affiliate links erode trust and create conflicts of interest. Some sites promote inferior products because they offer higher commissions. We won't do that.

This page follows FTC Endorsement Guides and EU Consumer Rights Directive requirements for disclosing material connections. Even though we currently have no affiliates or sponsors, this page exists to establish our policy before we consider monetization.

### Our Philosophy

**Tools first, revenue second.** We built OpenKit.tools because developers need privacy-respecting, high-performance utilities. If we never monetize beyond voluntary donations, that's fine. Revenue won't compromise tool quality, user privacy, or editorial independence.

**Honesty over optimization.** We'd rather lose potential affiliate income than recommend subpar products. If we link to a service, it's because we genuinely use it or believe it solves real problems - not because it offers the highest commission.

**Privacy is non-negotiable.** We'll never partner with companies that track users, sell data, or violate privacy. No surveillance capitalism, no data brokers, no behavioral tracking. Client-side processing isn't just a feature - it's a core principle.`
  },

  useCases: [
    {
      title: "Understanding Our Donation Model",
      description: "OpenKit.tools accepts voluntary support through Ko-fi (one-time or monthly) and voluntary support (recurring). Donations are purely optional and don't unlock features, remove ads (there are none), or provide priority support. Every feature remains free forever regardless of donation status.",
      example: `// What donations support:
- Domain registration ($15/year)
- Hosting costs ($20-50/month for edge CDN)
- Developer time for new tools and bug fixes
- Infrastructure monitoring and security

// What donations DON'T provide:
- Premium features (all features are free)
- Faster processing (all processing is client-side)
- Priority support (we help everyone equally)
- Access to private tools (all tools are public)

// Donation platforms we use:
- Ko-fi: https://ko-fi.com/ohernandez
  - One-time donations ($3, $5, $10, custom)
  - Monthly memberships ($5/month, $10/month)
  - 95% goes to us (Ko-fi takes 5% payment processing)`
    },
    {
      title: "Future Affiliate Link Policy",
      description: "If we join affiliate programs, we'll only promote services we genuinely use: hosting providers we deploy on, domain registrars we buy from, developer tools we rely on, or educational resources we've learned from. All affiliate links will include 'affiliate link' labels and rel='nofollow sponsored' attributes for SEO compliance.",
      example: `// Example of clear affiliate disclosure:
<a href="https://example.com?ref=openkit"
   rel="nofollow sponsored"
   title="Affiliate Link - We may earn commission">
  DigitalOcean Hosting (affiliate link)
</a>

// We'll only recommend if:
✓ We actively use the product/service ourselves
✓ It solves real developer problems effectively
✓ Pricing is competitive and transparent
✓ Privacy policy respects user data
✓ Quality matches or exceeds alternatives

// We'll NEVER recommend based on:
✗ Commission rates (even if higher)
✗ Sponsorship pressure from vendors
✗ Paid promotional campaigns
✗ Affiliate network incentives
✗ Traffic arbitrage opportunities`
    },
    {
      title: "Sponsorship Guidelines",
      description: "If we accept sponsors, they must be relevant to developers, offer legitimate high-quality products/services, and respect user privacy. Sponsors don't control content, recommendations, or tool functionality. All sponsored content will be clearly labeled as 'Sponsored' or 'Partner Content' in prominent locations.",
      example: `// Acceptable sponsors (hypothetical examples):
✓ Developer-focused SaaS (e.g., Vercel, Railway)
✓ Infrastructure providers (e.g., Cloudflare, AWS)
✓ Education platforms (e.g., Frontend Masters)
✓ Security tools (e.g., 1Password, Bitwarden)
✓ Open-source companies (e.g., Sentry, PostHog)

// Unacceptable sponsors:
✗ Gambling or betting sites
✗ Cryptocurrency pump-and-dump schemes
✗ Data brokers or surveillance companies
✗ Ad networks that track users
✗ Low-quality "make money online" courses
✗ Competitors to services we recommend

// Editorial independence requirements:
- Sponsors can't demand positive coverage
- We reserve right to criticize sponsor products
- Sponsorships don't influence tool recommendations
- We can terminate sponsorships anytime
- No pay-to-play for homepage placement`
    },
    {
      title: "Privacy and Tracking Commitments",
      description: "We use Plausible Analytics (privacy-first, no cookies, no personal data) to track aggregate site metrics only. We don't track individual users, what tools you use, what content you generate, or how you navigate the site. No Google Analytics, no Facebook Pixel, no retargeting ads, no behavioral profiling.",
      example: `// What we track (aggregate only):
- Page views per tool (e.g., "500 views on JSON formatter today")
- Referrer sources (e.g., "200 visitors from Google search")
- Country-level location (e.g., "30% from United States")
- Browser/device type (e.g., "60% desktop, 40% mobile")

// What we DON'T track:
✗ Individual user identification or fingerprinting
✗ What content you paste/generate in tools
✗ Your IP address or precise location
✗ Cross-site tracking or third-party cookies
✗ Behavioral profiling or audience segments
✗ Time-on-site or engagement metrics

// Affiliate link tracking (if we add them):
- Plausible tracks aggregate clicks: "100 people clicked this link"
- NO individual user tracking or identification
- NO correlation with other user activity
- Third-party affiliate platforms may use cookies on THEIR sites after click

// Third-party services we use:
- Ko-fi: Handles payment processing (we don't see card details)
- voluntary support: Handles sponsorships (we see sponsor name only)
- Vercel: Hosting platform (standard CDN logs only)
- Plausible Analytics: Privacy-first analytics (no personal data)`
    }
  ],

  howToUse: {
    title: "How to Support OpenKit.tools",
    content: `If you find these tools useful and want to contribute to ongoing development, we offer several transparent ways to support the project.

### Making a Donation

Visit our Ko-fi page (https://ko-fi.com/ohernandez) for one-time donations ($3, $5, $10, or custom amount) or monthly memberships. Ko-fi takes 5% for payment processing. Your donation goes toward hosting costs, domain renewals, and developer time for new features and bug fixes.

### What Your Support Enables

Donations help us maintain infrastructure (CDN hosting, domain registration, SSL certificates), develop new tools (researching algorithms, building UIs, writing tests), and improve existing tools (fixing bugs, adding features, optimizing performance). We don't monetize through ads, data sales, or premium tiers, so voluntary support keeps the project sustainable.

### No Strings Attached

You don't need to donate to use any tools. All features remain free forever. Donors don't get priority support, early access to tools, or special features. Everyone gets the same experience whether they donate $0 or $100/month.

### Transparency in Use of Funds

We'll share periodic updates on how donations are used (approximate hosting costs, development hours, infrastructure upgrades). We won't publish exact financials but aim to show that support directly funds tool development and maintenance, not unrelated expenses.

### Non-Monetary Support

Can't donate? No problem. You can help by:
- **Sharing tools** with colleagues, on social media, or in developer communities
- **Reporting bugs** through GitHub issues to help us improve quality
- **Suggesting features** for new tools or enhancements to existing ones
- **Contributing code** if you're a developer (GitHub repo is public)
- **Writing reviews** or testimonials about tools you find useful

### Future Affiliate Commissions

If we add affiliate links in the future, you clicking them (when making purchases you were already going to make) generates small commissions. This costs you nothing extra - merchants pay the commission. We'll only link to services we genuinely recommend, never promote products solely for commission potential.`,
    steps: [
      {
        name: "Choose Support Method",
        text: "Use Ko-fi for one-time or monthly donations. It's a transparent and widely trusted platform."
      },
      {
        name: "Set Your Amount",
        text: "Pick $3, $5, $10, or custom amount. Even small donations help cover hosting costs. Monthly support provides sustainable funding."
      },
      {
        name: "Complete Payment",
        text: "Ko-fi handles payment processing securely. We don't see your payment details or credit card numbers."
      },
      {
        name: "Continue Using Tools",
        text: "All tools remain free forever. Your donation unlocks nothing - it simply supports ongoing development and infrastructure costs."
      }
    ]
  },

  faqs: [
    {
      question: "Why don't you have ads or premium features?",
      answer: "Ads compromise privacy (tracking pixels, behavioral profiling) and user experience (clutter, distraction, slow page loads). Premium tiers create two-class systems where features are paywalled behind subscriptions. We believe developer tools should be accessible to everyone, regardless of budget. Our mission is providing high-quality utilities, not maximizing revenue. Voluntary donations and potential future affiliate commissions can sustain infrastructure without compromising principles."
    },
    {
      question: "Do donations unlock any features or remove limitations?",
      answer: "No. Every tool feature is free for everyone forever, regardless of donation status. No premium tiers, no feature gates, no usage limits. Donors and non-donors get identical experiences. We don't even track who donates (beyond what Ko-fi/GitHub tells us) or correlate it with tool usage. Donations support ongoing development and hosting costs but don't provide special access or perks."
    },
    {
      question: "How do I know if a link is an affiliate link?",
      answer: "All affiliate links (if we add them) will be clearly labeled with 'affiliate link' text next to the hyperlink or in parentheses. They'll also include rel='nofollow sponsored' HTML attributes for SEO compliance and transparency. If a link doesn't say 'affiliate' explicitly, it's NOT an affiliate link. We'll never hide affiliate relationships or use URL shorteners to obfuscate commissions."
    },
    {
      question: "Will sponsors influence your tool recommendations or content?",
      answer: "Never. Sponsors don't control editorial decisions, tool functionality, or content on this site. If we accept sponsorships, sponsored content will be clearly labeled and segregated from editorial content. We reserve the right to criticize sponsor products if they have issues and can terminate sponsorships without penalty if sponsors violate our principles or user trust."
    },
    {
      question: "Do you track what tools I use or what content I generate?",
      answer: "No. All tools run entirely client-side in your browser using JavaScript. Your input data, generated outputs, and tool usage never leave your device or get uploaded to servers. We use Plausible Analytics for aggregate site metrics (page views, traffic sources) but don't track individual users, content, or behavior. No Google Analytics, no Facebook Pixel, no session recordings."
    },
    {
      question: "What happens to my donation if I stop subscribing?",
      answer: "Nothing changes. You retain full access to all tools (which are free for everyone anyway). No features are removed, no access is revoked, no punishment for canceling. Recurring donations on Ko-fi or GitHub can be canceled anytime without consequences. One-time donations are just that - one time with no ongoing commitment."
    },
    {
      question: "Can I donate anonymously?",
      answer: "Ko-fi allows anonymous donations where your name isn't publicly displayed. voluntary support can be private if you enable that setting. We don't publish donor lists or names without explicit permission. We may share aggregate donation metrics ('we received 50 donations this month') but never identify individuals unless they publicly share their support."
    },
    {
      question: "How will I know if you add affiliate links or sponsors?",
      answer: "This disclosure page will be updated immediately with current affiliate relationships and active sponsors. We'll include dates when relationships start/end. All affiliate links on the site will be clearly labeled. We may announce significant sponsorships in a blog post or site notice. The 'Last Updated' timestamp at the top of this page shows when we last modified our disclosure policy."
    },
    {
      question: "What's your refund policy for donations?",
      answer: "Ko-fi and voluntary support have their own refund policies - contact their support if needed. We view donations as voluntary contributions rather than purchases (since nothing is sold). If you accidentally donate or want to cancel recurring donations, reach out through GitHub issues or Twitter and we'll help resolve it, including facilitating refunds through the donation platforms if appropriate."
    },
    {
      question: "Do you sell or share user data with third parties?",
      answer: "We don't collect user data to sell or share. Tools run client-side - your content never reaches our servers. We don't have user accounts, emails, or personal information to sell. Plausible Analytics gives us aggregate metrics only (no individual user data). Ko-fi and GitHub provide donor names (if not anonymous) but we don't share that information. No data brokers, no advertising networks, no third-party data sharing of any kind."
    }
  ],

  security: {
    title: "Privacy & Data Protection",
    content: `OpenKit.tools operates on a privacy-first architecture where user data protection isn't just policy - it's technical design. We can't collect your content because tools run entirely client-side in your browser.

### Client-Side Processing Architecture

Every tool executes locally in your browser using JavaScript. When you paste JSON to format, convert CSV to JSON, or generate slugs, that data never leaves your device. No network requests contain your content. No server-side processing happens. Disconnect from the internet after page load - tools still work perfectly offline.

### Zero Data Collection

We don't collect, store, log, or transmit:
- Tool input content (text, JSON, code, etc.)
- Generated outputs or results
- User sessions or browsing history
- Personal information or account data
- IP addresses or device fingerprints

### Privacy-First Analytics

We use Plausible Analytics, an open-source analytics platform that doesn't use cookies, doesn't track individuals, and doesn't collect personal data. Plausible provides aggregate metrics only: "500 people viewed the JSON formatter today from 30 countries". No user-level tracking, no behavioral profiling, no cross-site surveillance.

### Third-Party Service Privacy

**Ko-fi** handles donation payments and provides donor names (unless anonymous). We don't see credit card details or payment information. Ko-fi's privacy policy applies to their payment processing.

**voluntary support** handles sponsorships and provides sponsor names (unless private). GitHub's privacy policy applies to their platform.

**Vercel** hosts our site and sees standard CDN logs (page requests, referrers, user agents) but doesn't track individual users or content. Vercel's privacy policy applies to hosting infrastructure.

### No Surveillance Capitalism

We don't participate in behavioral advertising, retargeting campaigns, data broker networks, or audience profiling. No Google Analytics, no Facebook Pixel, no advertising tracking pixels, no cross-site cookies. Your usage patterns aren't monetized or sold.

### Future Privacy Commitments

If we add affiliate links, clicking them may trigger cookies on the destination site (merchant's domain) but we don't track clicks at an individual level. Plausible may show aggregate data like "100 clicks on this affiliate link this week" but can't identify who clicked.

If we accept sponsors, we won't share user data, audience demographics, or behavioral insights with sponsors. Sponsors pay for placement, not for data access.

### Transparent & Auditable

Our tools are built with open web technologies. Inspect browser DevTools Network tab while using any tool - you'll see zero outbound requests containing your content. View page source to verify client-side processing. We encourage technical users to audit our privacy claims.

Safe for generating content from proprietary codebases, confidential documents, customer data, or any sensitive information. Use with confidence for regulated industries (healthcare, finance, legal) where data sovereignty and privacy compliance matter.`
  },

  stats: {
    "Active Affiliates": "0",
    "Active Sponsors": "0",
    "Data Collection": "None",
    "Privacy Rating": "100%",
    "Last Updated": "Feb 2026"
  }
};
