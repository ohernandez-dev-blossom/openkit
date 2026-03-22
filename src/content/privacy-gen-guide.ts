/**
 * Privacy Policy Generator Tool Guide Content
 * Comprehensive developer guide for GDPR-compliant privacy policy creation
 */

import type { ToolGuideContent } from "./types";

export const privacyGenGuideContent: ToolGuideContent = {
  toolName: "Privacy Policy Generator",
  toolPath: "/privacy-gen",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Company Information",
      description: "Fill in company name, website URL, contact email, country, and last updated date. This information appears throughout the generated privacy policy and establishes the data controller identity required by GDPR."
    },
    {
      title: "Select Data Collection Practices",
      description: "Check boxes for data you collect: personal information (name, email, phone), analytics (Google Analytics, Plausible), cookies (essential, analytics, marketing), and third-party services (payment processors, email services, cloud storage)."
    },
    {
      title: "Configure User Rights",
      description: "Enable user rights your service offers: data access requests, data deletion (Right to be Forgotten), data portability (machine-readable exports), and opt-out options. GDPR requires offering all these rights."
    },
    {
      title: "Generate and Download Policy",
      description: "Click Generate Policy to create complete privacy policy document. Review generated text, make any necessary customizations, then download as TXT, copy to clipboard, or export as formatted document."
    }
  ],

  introduction: {
    title: "What is a Privacy Policy?",
    content: `A privacy policy is a legal document that discloses how an organization collects, uses, shares, and protects user personal data. Required by privacy laws including GDPR (Europe), CCPA (California), and similar regulations worldwide, privacy policies inform users about their data rights and the organization's data handling practices. For developers building websites, applications, or services that process personal data, publishing a comprehensive, legally-compliant privacy policy is not optional - it's a legal requirement with significant penalties for non-compliance.

The General Data Protection Regulation (GDPR) introduced strict privacy policy requirements in 2018 that fundamentally changed how companies worldwide disclose data practices. GDPR applies to any organization processing personal data of EU residents regardless of company location - a US startup with European customers must comply. California Consumer Privacy Act (CCPA), Brazil's LGPD, Canada's PIPEDA, and dozens of other jurisdictions have created a global standard for privacy policy transparency.

### Legal Requirements for Privacy Policies

**GDPR Requirements (Articles 13-14):** Privacy policies must disclose: identity and contact details of data controller, Data Protection Officer contact (if applicable), purposes of processing, legal basis for processing, categories of personal data collected, retention periods for each data category, data recipients (third parties who receive data), international data transfers, user rights (access, rectification, erasure, restriction, portability, objection), right to lodge complaint with supervisory authority, whether providing data is statutory/contractual requirement, existence of automated decision-making.

**CCPA Requirements:** California law requires: categories of personal information collected, sources of personal information, business or commercial purposes for collection, categories of third parties with whom information is shared, specific pieces of personal information collected, data selling or sharing practices, consumer rights (know, delete, opt-out), and how to exercise these rights.

**Must Be Accessible:** Privacy policies must be easily accessible from every page of website/application. Common implementations: footer link on every page, dedicated /privacy-policy URL, link in account creation flow, and disclosure during data collection (signup forms, checkout).

**Must Be Clear:** Legal jargon is acceptable but policy must be understandable to average users. Use clear headings, short paragraphs, plain language explanations, and bullet points. Complex legalese that obscures actual practices violates transparency requirements.

**Must Be Current:** Update privacy policy whenever data practices change: new analytics tools added, new third-party services integrated, new data collection added, retention periods changed, or new countries storing data. Notify users of material changes via email or prominent notice.

### Key Privacy Policy Sections

**Introduction:** Identifies data controller (company name, address), explains policy scope, defines key terms (personal data, processing, controller, processor), and states effective date and last updated date.

**Data Collection:** Lists all personal data categories collected with examples: contact information (name, email, phone, address), account information (username, password, preferences), payment information (credit card, billing address - note if stored or processed by third party), device information (IP address, browser, operating system), usage data (pages visited, features used, time spent), location data (GPS coordinates, IP geolocation), and cookies/tracking data.

**Purpose and Legal Basis:** For each data category, explains why collected and legal basis under GDPR: contract performance (data necessary to provide service), legal obligation (data required by law like tax records), consent (user explicitly agreed to collection), legitimate interests (data collection benefits organization without harming user rights), or vital interests (emergency situations). Most web services rely on contract performance and legitimate interests.

**Data Sharing:** Lists all third parties receiving user data: payment processors (Stripe, PayPal), email services (SendGrid, Mailchimp), analytics (Google Analytics, Plausible), cloud hosting (AWS, Google Cloud), customer support (Intercom, Zendesk), and advertising networks (if applicable). For each, explain what data is shared and why.

**Data Retention:** Specifies how long data is kept: active accounts (retained until account deletion + 30 days), deleted accounts (retained 30 days for recovery), transaction data (7 years for tax compliance), logs (90 days), marketing data (until consent withdrawn), and backups (retained according to backup schedule but not used for processing).

**User Rights:** Explains how to exercise: right to access (request copy of all data), right to rectification (correct inaccurate data), right to erasure (delete data unless legal obligation), right to restrict processing (limit data use), right to data portability (receive machine-readable copy), right to object (stop processing for specific purposes), and right to withdraw consent (remove previously given consent).

**Security Measures:** Describes how data is protected: SSL/TLS encryption in transit, encryption at rest for sensitive data, access controls and authentication, regular security audits, secure data centers, employee training, and incident response procedures.

**International Transfers:** If data is transferred outside user's country, disclose: countries where data is stored/processed, safeguards used (Standard Contractual Clauses, adequacy decisions, binding corporate rules), and user rights regarding international transfers.

**Children's Privacy:** If service is directed at children or knowingly collects children's data, disclose: minimum age requirement, parental consent requirements, what happens if child data is discovered, and how parents can request deletion. COPPA (US) requires this for under-13. GDPR requires parental consent for under-16 (member states can lower to 13).

**Contact Information:** Provide multiple contact methods: privacy-specific email (privacy@company.com), Data Protection Officer email (if applicable), postal address, online form, and phone number (optional).

**Updates and Changes:** Explain how policy changes are communicated: email notification for material changes, effective date of changes, user acceptance requirement (continued use implies acceptance), and archive of previous versions.

### Common Privacy Policy Mistakes

**Too Generic:** Using template privacy policies without customization leads to inaccurate disclosures. Every organization's data practices are unique. Generic policies miss specific tools, third parties, and data types your service uses.

**Outdated:** Adding Google Analytics without updating privacy policy violates transparency requirements. Failure to disclose new data collection or third parties is non-compliance. Update policy whenever data practices change.

**Missing User Rights:** GDPR requires offering access, deletion, portability, and other rights. Privacy policy must explain how to exercise these rights. "Email us" is not sufficient - provide specific process and response timeframes.

**Vague Retention Periods:** "We keep data as long as necessary" doesn't satisfy GDPR. Specify retention periods by data category: "Profile data: account lifetime + 30 days. Transaction data: 7 years (tax law)."

**Hidden or Inaccessible:** Privacy policy buried in footer tiny text or requiring multiple clicks violates accessibility requirements. Link prominently from footer, account creation flow, and anywhere data is collected.

### Generating Privacy Policies

**Manual Creation:** Hiring lawyers to draft custom privacy policies costs $2,000-$10,000+ depending on complexity. Appropriate for large enterprises with complex data practices, high compliance risk, or operating in heavily regulated industries.

**Template Customization:** Using privacy policy templates (TermsFeed, iubenda, Termly) with customization options. Costs $0-$500/year. Templates cover common scenarios but require accurate input about your specific data practices.

**Automated Generators:** Tools like this privacy policy generator create policies based on questionnaire responses. Free or low-cost. Suitable for startups and small businesses with straightforward data practices. Still requires legal review for high-risk scenarios.

### After Generating Your Policy

**Legal Review:** Even generated policies should be reviewed by lawyer familiar with privacy law, especially if: processing sensitive data (health, financial, children), operating in regulated industry (healthcare, finance), or high-risk data processing (large-scale profiling, automated decisions).

**Publish and Link:** Upload policy to /privacy-policy URL, link from website footer, link in signup/checkout flows, include in mobile app settings, and reference in terms of service.

**Keep Updated:** Establish process for policy updates: review quarterly, update when adding new tools/services, notify users of material changes, and maintain archive of previous versions.

This privacy policy generator creates comprehensive policies based on your data practices. All generation happens client-side - your company information and data practices are never uploaded to servers.`
  },

  useCases: [
    {
      title: "Create GDPR-Compliant Policy for New Website",
      description: "Generate comprehensive privacy policy for new website or application that meets GDPR, CCPA, and international privacy law requirements. Cover all data collection, usage, sharing, and user rights with legally-compliant language.",
      example: `// Privacy policy generation for SaaS application
// 1. Gather information about data practices

const dataPractices = {
  companyName: 'CloudSync Inc.',
  websiteUrl: 'https://cloudsync.com',
  contactEmail: 'privacy@cloudsync.com',
  country: 'United States',

  // Data we collect
  personalInfo: {
    collect: true,
    types: [
      'Name',
      'Email address',
      'Company name',
      'Job title',
      'Phone number (optional)',
      'Profile photo'
    ]
  },

  paymentInfo: {
    collect: true,
    processor: 'Stripe',
    stored: false, // Stripe tokenizes, we don't store cards
    types: ['Credit card info (tokenized)', 'Billing address']
  },

  usageData: {
    collect: true,
    types: [
      'IP address',
      'Browser type and version',
      'Device information',
      'Pages visited',
      'Features used',
      'Time spent',
      'File names and sizes'
    ]
  },

  // Analytics
  analytics: {
    use: true,
    providers: [
      { name: 'Google Analytics', dataShared: ['Usage patterns', 'Device info'] },
      { name: 'Mixpanel', dataShared: ['Feature usage', 'User flows'] }
    ]
  },

  // Cookies
  cookies: {
    use: true,
    types: [
      { type: 'Essential', purpose: 'Authentication, security', duration: 'Session' },
      { type: 'Analytics', purpose: 'Usage tracking', duration: '2 years', optOut: true },
      { type: 'Preferences', purpose: 'Remember settings', duration: '1 year' }
    ]
  },

  // Third-party services
  thirdParties: [
    { name: 'AWS', purpose: 'Cloud hosting', dataShared: ['All application data'] },
    { name: 'Stripe', purpose: 'Payment processing', dataShared: ['Payment info'] },
    { name: 'SendGrid', purpose: 'Email delivery', dataShared: ['Email, name'] },
    { name: 'Intercom', purpose: 'Customer support', dataShared: ['Profile, usage data'] }
  ],

  // User rights
  rights: {
    access: true, // Users can request data copies
    deletion: true, // Right to be Forgotten
    portability: true, // Machine-readable export
    rectification: true, // Correct inaccurate data
    optOut: true, // Opt out of marketing

    // How to exercise rights
    process: 'Email privacy@cloudsync.com or use in-app Data & Privacy settings'
  },

  // Data retention
  retention: {
    activeAccount: 'Account lifetime + 30 days after deletion',
    deletedAccount: '30 days (recovery period)',
    transactions: '7 years (tax law)',
    logs: '90 days',
    backups: '30 days (not used for active processing)',
    marketing: 'Until consent withdrawn'
  },

  // Security
  security: [
    'TLS encryption for data in transit',
    'AES-256 encryption for data at rest',
    'Two-factor authentication',
    'Role-based access controls',
    'Regular security audits',
    'SOC 2 Type II certified'
  ],

  // International transfers
  international: {
    transfers: true,
    countries: ['United States', 'European Union (AWS Dublin)'],
    safeguards: 'AWS Standard Contractual Clauses'
  },

  // Children
  children: {
    minAge: 16,
    verifyAge: true,
    policy: 'Service not intended for children. If we discover child data, we delete immediately and notify parents.'
  },
};

// 2. Generate privacy policy using tool or template
// 3. Review generated policy for accuracy
// 4. Have lawyer review for compliance
// 5. Publish to website

// Example policy section (generated):
/*
## What Personal Information We Collect

CloudSync collects the following personal information:

**Account Information:**
- Name
- Email address
- Company name
- Job title
- Phone number (optional)
- Profile photo

**Payment Information:**
We use Stripe to process payments. We do not store your credit card information. Stripe stores:
- Tokenized credit card information
- Billing address

**Usage Information:**
- IP address
- Browser type and version
- Device information
- Pages visited and features used
- Time spent in the application
- File names and sizes of uploaded files

**Why We Collect This Data:**
- Account Information: To create and manage your account (legal basis: contract performance)
- Payment Information: To process subscription payments (legal basis: contract performance)
- Usage Information: To improve our service and provide customer support (legal basis: legitimate interests)
*/`
    },
    {
      title: "Update Policy for New Analytics Tool",
      description: "Modify existing privacy policy when adding new analytics, marketing tools, or third-party services. Ensure policy accurately discloses new data collection and sharing practices to maintain compliance.",
      example: `// Privacy policy update process
// Before: Using only Plausible Analytics (privacy-friendly, no cookies)
const previousAnalytics = {
  providers: [
    { name: 'Plausible Analytics', cookies: false, personalData: false }
  ]
};

// After: Adding Google Analytics for deeper insights
const newAnalytics = {
  providers: [
    { name: 'Plausible Analytics', cookies: false, personalData: false },
    { name: 'Google Analytics', cookies: true, personalData: true }
  ]
};

// Privacy policy changes required:

/*
OLD SECTION:
## Analytics

We use Plausible Analytics to understand how our website is used. Plausible:
- Does not use cookies
- Does not collect personally identifiable information
- Does not track users across websites
- Complies with GDPR, CCPA, and PECR

NEW SECTION:
## Analytics

We use the following analytics tools:

**Plausible Analytics:**
- Privacy-friendly analytics
- Does not use cookies
- Does not collect personally identifiable information
- Does not track users across websites

**Google Analytics:**
- Collects usage data including pages visited, time spent, device info
- Uses cookies for tracking (you can opt out)
- May share data with Google for their services
- IP addresses are anonymized
- You can opt out: https://tools.google.com/dlpage/gaoptout

Your Choices:
You can disable Google Analytics tracking by:
1. Installing Google Analytics Opt-out Browser Add-on
2. Enabling "Do Not Track" in your browser
3. Blocking analytics cookies in our cookie consent banner
*/

// Implementation checklist:
const updateProcess = {
  steps: [
    '1. Update privacy policy text with new analytics disclosure',
    '2. Add cookie consent banner if not present (required for GA)',
    '3. Implement opt-out mechanism',
    '4. Notify existing users via email about policy changes',
    '5. Update "Last Updated" date in policy',
    '6. Archive previous version of policy',
    '7. Document change in internal compliance log'
  ],

  notificationEmail: \`
Subject: Privacy Policy Update - New Analytics Tool

Dear [Name],

We're writing to inform you of an update to our Privacy Policy effective [DATE].

What's Changed:
We've added Google Analytics to better understand how users interact with our service. This helps us improve features and user experience.

What This Means:
- Google Analytics may use cookies to track your usage
- We anonymize IP addresses to protect your privacy
- You can opt out via our cookie settings or Google's opt-out tool

Your Rights:
You continue to have the right to:
- Access your data
- Request deletion
- Opt out of analytics tracking
- Export your data

Review Full Policy:
Read the updated policy at: https://example.com/privacy-policy

Questions:
Contact us at privacy@example.com

Thank you,
[Company] Privacy Team
  \`,

  // User notification in app
  inAppNotice: {
    show: true,
    dismissible: true,
    message: 'We\\'ve updated our Privacy Policy to reflect use of Google Analytics. Review changes.',
    cta: { text: 'Review Policy', url: '/privacy-policy' }
  },
};

// Track compliance
await db.complianceLog.create({
  event: 'privacy_policy_updated',
  changes: 'Added Google Analytics disclosure',
  notifiedUsers: true,
  effectiveDate: new Date('2024-02-15'),
  previousVersion: 'v2.1',
  newVersion: 'v2.2'
});`
    },
    {
      title: "Generate Multi-Language Privacy Policies",
      description: "Create privacy policies in multiple languages for international services. Ensure translations are legally accurate and compliant with local regulations in each jurisdiction where you operate.",
      example: `// Multi-language privacy policy generation
interface PrivacyPolicyTranslation {
  language: string;
  locale: string;
  url: string;
  content: string;
  legalReview: boolean;
  lastUpdated: Date;
}

const translations: PrivacyPolicyTranslation[] = [
  {
    language: 'English',
    locale: 'en-US',
    url: '/privacy-policy',
    content: generateEnglishPolicy(),
    legalReview: true,
    lastUpdated: new Date('2024-01-15')
  },
  {
    language: 'German',
    locale: 'de-DE',
    url: '/de/datenschutz',
    content: generateGermanPolicy(),
    legalReview: true,
    lastUpdated: new Date('2024-01-15')
  },
  {
    language: 'French',
    locale: 'fr-FR',
    url: '/fr/politique-de-confidentialite',
    content: generateFrenchPolicy(),
    legalReview: true,
    lastUpdated: new Date('2024-01-15')
  },
  {
    language: 'Spanish',
    locale: 'es-ES',
    url: '/es/politica-de-privacidad',
    content: generateSpanishPolicy(),
    legalReview: true,
    lastUpdated: new Date('2024-01-15')
  },
];

// Jurisdiction-specific requirements
const jurisdictionRequirements = {
  'en-US': {
    laws: ['CCPA', 'COPPA'],
    supervisoryAuthority: 'California Privacy Protection Agency',
    dataProtectionOfficer: false, // Optional in US
    cookieConsent: 'opt-out', // CCPA allows opt-out
    ageOfConsent: 13
  },
  'de-DE': {
    laws: ['GDPR', 'BDSG'], // Bundesdatenschutzgesetz
    supervisoryAuthority: 'Der Bundesbeauftragte für den Datenschutz und die Informationsfreiheit',
    dataProtectionOfficer: true, // Required if processing > 20 people
    cookieConsent: 'opt-in', // GDPR requires opt-in
    ageOfConsent: 16
  },
  'fr-FR': {
    laws: ['GDPR'],
    supervisoryAuthority: 'Commission Nationale de l\\'Informatique et des Libertés (CNIL)',
    dataProtectionOfficer: true,
    cookieConsent: 'opt-in',
    ageOfConsent: 15 // France lowered from 16 to 15
  },
  'es-ES': {
    laws: ['GDPR', 'LOPDGDD'], // Ley Orgánica de Protección de Datos
    supervisoryAuthority: 'Agencia Española de Protección de Datos (AEPD)',
    dataProtectionOfficer: true,
    cookieConsent: 'opt-in',
    ageOfConsent: 14 // Spain lowered to 14
  },
};

// Generate jurisdiction-specific section
function generateJurisdictionSection(locale: string): string {
  const req = jurisdictionRequirements[locale];

  if (locale === 'de-DE') {
    return \`
## Zuständige Aufsichtsbehörde

Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren:

\${req.supervisoryAuthority}
Graurheindorfer Str. 153
53117 Bonn
Deutschland
Tel: +49 (0)228-997799-0
E-Mail: poststelle@bfdi.bund.de

## Datenschutzbeauftragter

Unser Datenschutzbeauftragter:
E-Mail: datenschutz@example.com
    \`;
  }

  if (locale === 'fr-FR') {
    return \`
## Autorité de Contrôle

Vous avez le droit de déposer une réclamation auprès de la CNIL:

Commission Nationale de l'Informatique et des Libertés
3 Place de Fontenoy
TSA 80715
75334 PARIS CEDEX 07
France
Tél: +33 1 53 73 22 22

## Délégué à la Protection des Données

Notre DPO:
E-mail: dpo@example.com
    \`;
  },

  // English version
  return \`
## Supervisory Authority

You have the right to lodge a complaint with a supervisory authority:

California Privacy Protection Agency (for California residents)
2101 Arena Boulevard
Sacramento, CA 95834
Website: cppa.ca.gov

European Data Protection Board (for EU residents)
Rue Wiertz 60
B-1047 Brussels
Belgium
    \`;
},

// Serve policy based on user locale
app.get('/privacy-policy', (req, res) => {
  const userLocale = req.acceptsLanguages(['en-US', 'de-DE', 'fr-FR', 'es-ES']) || 'en-US';
  const policy = translations.find(t => t.locale === userLocale);

  res.render('privacy-policy', {
    content: policy?.content,
    locale: policy?.locale,
    lastUpdated: policy?.lastUpdated,
    otherLanguages: translations.filter(t => t.locale !== userLocale)
  });
});`
    },
    {
      title: "Implement Privacy Policy Acceptance Tracking",
      description: "Track user acceptance of privacy policy and policy version updates. Maintain audit trail of when users accepted which policy version for compliance verification and dispute resolution.",
      example: `// Privacy policy acceptance tracking
interface PolicyAcceptance {
  userId: string;
  policyVersion: string;
  acceptedAt: Date;
  ipAddress: string;
  userAgent: string;
  acceptanceMethod: 'signup' | 'update_prompt' | 'explicit_consent';
}

// Database schema
const PolicyAcceptanceSchema = {
  userId: { type: String, required: true, index: true },
  policyVersion: { type: String, required: true }, // e.g., "v2.3"
  acceptedAt: { type: Date, required: true },
  ipAddress: { type: String },
  userAgent: { type: String },
  acceptanceMethod: { type: String },
  policyContent: { type: String }, // Store snapshot of accepted policy
  checksum: { type: String } // SHA-256 of policy content for verification
};

// Record acceptance
async function recordPolicyAcceptance(
  userId: string,
  policyVersion: string,
  method: string,
  req: Request
): Promise<void> {
  const policy = await getPolicy(policyVersion);
  const checksum = crypto
    .createHash('sha256')
    .update(policy.content)
    .digest('hex');

  await db.policyAcceptances.create({
    userId,
    policyVersion,
    acceptedAt: new Date(),
    ipAddress: req.ip,
    userAgent: req.headers['user-agent'],
    acceptanceMethod: method,
    policyContent: policy.content,
    checksum
  });

  // Update user record
  await db.users.update(userId, {
    acceptedPolicyVersion: policyVersion,
    acceptedPolicyAt: new Date()
  });
}

// Check if user accepted latest policy
async function requireLatestPolicyAcceptance(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.user.id;
  const latestVersion = 'v2.4';

  const user = await db.users.findById(userId);

  if (user.acceptedPolicyVersion !== latestVersion) {
    // Force policy acceptance
    return res.status(403).json({
      error: 'policy_acceptance_required',
      message: 'You must accept the updated Privacy Policy to continue',
      policyUrl: '/privacy-policy',
      policyVersion: latestVersion,
      changes: 'Added Google Analytics disclosure'
    });
  }

  next();
},

// Policy acceptance UI component
function PolicyAcceptancePrompt() {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = async () => {
    await fetch('/api/privacy-policy/accept', {
      method: 'POST',
      body: JSON.stringify({ version: 'v2.4' })
    });
    setAccepted(true);
  };

  return (
    <div className="policy-modal">
      <h2>Privacy Policy Update</h2>
      <p>
        We've updated our Privacy Policy effective February 1, 2024.
        Please review the changes and accept to continue using our service.
      </p>

      <div className="policy-changes">
        <h3>What Changed:</h3>
        <ul>
          <li>Added Google Analytics for usage tracking</li>
          <li>Updated data retention periods</li>
          <li>Added new third-party service disclosures</li>
        </ul>
      </div>

      <a href="/privacy-policy" target="_blank">
        Read Full Privacy Policy
      </a>

      <label>
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        I have read and accept the updated Privacy Policy
      </label>

      <button
        onClick={handleAccept}
        disabled={!accepted}
      >
        Accept and Continue
      </button>
    </div>
  );
},

// Audit trail query
async function getPolicyAcceptanceHistory(userId: string) {
  return await db.policyAcceptances.find({ userId })
    .sort({ acceptedAt: -1 })
    .lean();
}

// Example audit trail:
/*
[
  {
    userId: "user_123",
    policyVersion: "v2.4",
    acceptedAt: "2024-02-01T10:30:00Z",
    ipAddress: "203.0.113.42",
    acceptanceMethod: "update_prompt"
  },
  {
    userId: "user_123",
    policyVersion: "v2.3",
    acceptedAt: "2023-12-15T14:22:00Z",
    ipAddress: "203.0.113.41",
    acceptanceMethod: "signup"
  },
]
*/`
    }
  ],

  howToUse: {
    title: "How to Use This Privacy Policy Generator",
    content: `This privacy policy generator creates comprehensive, legally-compliant privacy policies based on your specific data practices. Follow the multi-step wizard to input your company information, data collection practices, third-party services, and user rights, then generate a complete policy ready for publication.

### Step 1: Company Information

Enter basic company details that identify you as the data controller. Company Name appears throughout the policy. Website URL is used in policy references. Contact Email provides data protection contact (privacy@company.com or dpo@company.com). Country determines which regulations apply primarily. Last Updated shows policy currency.

These fields are required for legal compliance - GDPR requires clear identification of data controller including name, address, and contact information.

### Step 2: Data Collection

Check all types of data your service collects. Personal Information includes name, email, phone, address. Device Information includes IP address, browser, operating system. Analytics Data includes page views, feature usage, time spent. Payment Information includes credit card details (specify if you or payment processor stores).

For each data type, the generator includes appropriate disclosure language explaining collection purpose, legal basis (contract, consent, legitimate interest), and retention period.

### Step 3: Analytics and Cookies

Select analytics providers you use: Google Analytics, Plausible, Mixpanel, Amplitude, Fathom, Matomo. For each, generator discloses data shared with provider and opt-out options.

Check cookie types: Essential (authentication, security), Analytics (usage tracking), Marketing (advertising), Preferences (settings), Security (fraud prevention). Generator includes cookie consent requirements based on your country (EU requires opt-in, US allows opt-out).

### Step 4: Third-Party Services

Select all third-party services that process user data: payment processors (Stripe, PayPal), email services (SendGrid, Mailchimp), cloud storage (AWS, Google Cloud), authentication (Auth0, Firebase), social media integrations, customer support (Intercom, Zendesk).

Generator discloses what data is shared with each service and processing purposes. Lists each service as "data processor" per GDPR terminology.

### Step 5: User Rights

Enable rights your service offers users. GDPR requires offering all these rights:
- Data Access: Users request copy of all data
- Data Deletion: Right to be Forgotten
- Data Portability: Machine-readable data export
- Rectification: Correct inaccurate data
- Opt-Out: Unsubscribe from marketing

Generator includes language explaining each right, how to exercise, and response timeframes (30 days for GDPR).

### Step 6: Additional Policies

Configure special sections: Children's Policy (set minimum age, parental consent requirements), Data Retention (how long data is kept by category), Security Measures (encryption, access controls, audits), International Transfers (countries storing data, safeguards like Standard Contractual Clauses).

These sections address specific regulatory requirements and demonstrate compliance rigor.

### Step 7: Generate and Download

Click Generate Policy to create complete privacy policy based on your inputs. Generator assembles all sections with appropriate legal language, formatting, and cross-references.

Review generated policy carefully - verify all disclosures accurately reflect your actual practices. Click Copy to copy entire policy text, Download TXT to save as text file, or use Export to get formatted document (HTML, Markdown, PDF).

### After Generation

Have lawyer review generated policy before publication, especially if processing sensitive data or operating in regulated industry. Upload to /privacy-policy URL on your website. Link from footer, signup forms, and anywhere data is collected. Notify existing users if updating existing policy.`,
    steps: [
      {
        name: "Enter Company Information",
        text: "Fill in company name, website URL, contact email, country, and last updated date. This information identifies you as data controller and appears throughout the policy."
      },
      {
        name: "Select Data Practices",
        text: "Check boxes for all data you collect (personal info, analytics, cookies) and third-party services you use (payments, email, hosting). Be comprehensive - missing disclosures violate transparency."
      },
      {
        name: "Configure User Rights",
        text: "Enable all user rights: data access, deletion, portability, rectification, opt-out. GDPR requires offering these rights with clear exercise instructions."
      },
      {
        name: "Generate and Review Policy",
        text: "Click Generate to create complete policy. Review carefully for accuracy. Copy, download, or export. Have lawyer review before publication. Upload to website and link from footer."
      }
    ]
  },

  faqs: [
    {
      question: "Is the generated privacy policy legally binding and compliant?",
      answer: "Generated policies cover GDPR, CCPA, and common privacy law requirements based on your inputs. However, every business has unique data practices requiring legal review. Use generated policy as foundation but have privacy lawyer review before publication, especially for sensitive data processing, children's services, or regulated industries (healthcare, finance)."
    },
    {
      question: "How often should I update my privacy policy?",
      answer: "Update privacy policy whenever data practices change: adding new analytics tools, integrating new third-party services, collecting new data types, changing retention periods, or expanding to new countries. Review quarterly to ensure accuracy. Notify users of material changes via email or prominent notice."
    },
    {
      question: "Do I need to notify users when updating the policy?",
      answer: "Yes, for material changes (new data collection, new third parties, different retention). Notification methods: email to all users, prominent banner on website, in-app notification, or requiring acceptance on next login. For minor changes (clarifications, typos), updating 'Last Modified' date may suffice."
    },
    {
      question: "What's the difference between privacy policy and terms of service?",
      answer: "Privacy policy discloses data handling practices (what data collected, why, how shared, user rights). Terms of service define contractual relationship (what you provide, user obligations, liability, dispute resolution). Both are legally required but serve different purposes. Many sites have separate documents."
    },
    {
      question: "Do I need a Data Protection Officer (DPO)?",
      answer: "GDPR requires DPO if: (1) You're public authority. (2) Core activities involve large-scale systematic monitoring. (3) Core activities involve large-scale processing of sensitive data. Most small businesses don't need DPO. CCPA doesn't require DPO but many companies appoint privacy officer for compliance management."
    },
    {
      question: "Can I use same privacy policy for all countries?",
      answer: "Yes, but include jurisdiction-specific sections. GDPR (EU) requires specific disclosures about data transfers, supervisory authorities, legal basis. CCPA (California) requires sale/sharing disclosures and consumer rights. Create single policy covering all jurisdictions or separate policies per region with translations."
    },
    {
      question: "What happens if my privacy policy is inaccurate?",
      answer: "Inaccurate privacy policies violate transparency requirements and can result in: regulatory enforcement (GDPR fines up to 4% global revenue), consumer lawsuits, loss of user trust, and regulatory investigations. Accuracy is critical - policy must match actual practices. Review and update whenever practices change."
    },
    {
      question: "Should I include children's privacy section?",
      answer: "Include if: (1) Service is directed at children under 13 (US COPPA). (2) Service knowingly collects children's data. (3) Service allows accounts for users under 16 (GDPR age of consent). Children's section must explain age requirements, parental consent process, what happens if child data discovered, and how parents request deletion."
    },
    {
      question: "How do I handle privacy policy for mobile apps?",
      answer: "Mobile apps need same privacy policy as websites. Additional requirements: link in app store listing (required by Apple, Google), link in app settings/about section, disclosure of device permissions (camera, location, contacts), mobile-specific tracking (IDFA, Android ID), and push notification opt-in. App stores reject apps without privacy policies."
    },
    {
      question: "Can users sue me if privacy policy is missing or wrong?",
      answer: "Yes. GDPR allows individuals to sue for damages from privacy violations. CCPA provides statutory damages ($100-$750 per consumer per incident) plus actual damages. Class action lawsuits for privacy violations are increasingly common. Proper privacy policy and compliance practices reduce legal risk significantly."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This privacy policy generator operates entirely client-side in your browser using JavaScript. All form inputs, policy generation, and text assembly happen locally on your device. No company information, data practices, or generated policy text is transmitted to servers or stored remotely.

### Privacy Guarantees

- **100% Client-Side Processing:** All policy text generation uses browser JavaScript to assemble sections based on form inputs. String concatenation and formatting happen on your device.
- **No Data Uploads:** Your company name, contact information, data practices, and generated policy never leave your browser. No server-side processing or API calls with your information.
- **No Data Storage:** Form inputs and generated policy text are not saved or logged anywhere. Refresh page and everything clears from browser memory.
- **No Analytics on Content:** We don't track what company information you enter, what data practices you select, or any content-specific data. Standard analytics track page views only.
- **Transparent & Auditable:** Code is transparent and auditable. Inspect browser DevTools Network tab during generation - zero network requests with your data.

Safe for generating privacy policies for confidential projects, client work under NDA, pre-launch products, or any use case requiring confidentiality. Use with confidence for enterprise applications, client services, or competitive products where data practices must remain private until public launch.`
  },

  stats: {
    "Policy Sections": "12+",
    "Regulations": "GDPR+CCPA",
    "Languages": "1",
    "Format": "Text+HTML"
  }
};
