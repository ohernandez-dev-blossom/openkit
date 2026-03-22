/**
 * Privacy Request Tool Guide Content
 * Note: This tool appears to be a form for submitting GDPR requests
 */

import type { ToolGuideContent } from "./types";

export const privacyRequestGuideContent: ToolGuideContent = {
  toolName: "Privacy Request Form",
  toolPath: "/privacy-request",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Select Request Type",
      description: "Choose from 8 GDPR-compliant request types: Access Request (get your data), Deletion Request (Right to be Forgotten), Rectification (correct inaccurate data), Portability (machine-readable export), Objection (stop processing), Restriction (limit processing), Withdraw Consent, or Other."
    },
    {
      title: "Enter Email Address",
      description: "Provide the email address associated with your account or data. This email is used to verify your identity and send the response. Email validation ensures correct format before submission."
    },
    {
      title: "Describe Your Request",
      description: "Write a clear description (minimum 20 characters) explaining your request. Include relevant details like what data you're requesting, why you want deletion, or what information needs correction. Specific requests get faster responses."
    },
    {
      title: "Submit and Track",
      description: "Submit your request via the form which opens your email client with pre-filled subject and body. Your request is sent to the organization's data protection contact. Expect response within 30 days per GDPR Article 12 requirements."
    }
  ],

  introduction: {
    title: "What are Privacy Requests?",
    content: `Privacy requests are formal communications from data subjects (individuals) to data controllers (organizations) exercising rights guaranteed by data protection regulations including GDPR (Europe), CCPA (California), and similar privacy laws worldwide. These requests enable individuals to access, correct, delete, or control how their personal data is processed by companies and services. For developers building applications that process personal data, implementing compliant privacy request handling is a legal requirement with significant penalties for non-compliance.

The General Data Protection Regulation (GDPR) introduced comprehensive data subject rights in 2018, fundamentally changing how companies worldwide handle personal data. GDPR applies to any organization processing data of EU residents regardless of company location - a US company selling to European customers must comply. California Consumer Privacy Act (CCPA) and similar laws in Brazil (LGPD), Canada (PIPEDA), and other jurisdictions have created a global standard for privacy rights.

### GDPR Data Subject Rights

**Right to Access (Article 15):** Individuals can request a copy of all personal data an organization holds about them. Organizations must provide data in commonly used electronic format within 30 days. Access requests help users understand what information companies have collected through account activity, tracking, and third-party data purchases.

**Right to Erasure / "Right to be Forgotten" (Article 17):** Individuals can request deletion of their personal data under certain conditions: data no longer necessary for original purpose, consent withdrawn, objection to processing, data unlawfully processed, or legal obligation to delete. Organizations must delete data and inform third parties with whom data was shared.

**Right to Rectification (Article 16):** Individuals can request correction of inaccurate or incomplete personal data. Organizations must update records within 30 days and notify third parties who received the data. Common in scenarios where addresses, names, or biographical information changed but old data persists.

**Right to Data Portability (Article 20):** Individuals can receive their personal data in structured, machine-readable format (typically JSON or CSV) and transmit to another controller. Facilitates switching between services (e.g., moving from one social network to another) without losing personal content and connections.

**Right to Object (Article 21):** Individuals can object to processing for direct marketing (unconditional right) or processing based on legitimate interests (must demonstrate particular situation). Organizations must stop processing unless they demonstrate compelling legitimate grounds overriding individual's interests.

**Right to Restrict Processing (Article 18):** Individuals can request temporary restriction of data processing during verification of accuracy, assessment of legitimate grounds, or while deletion request is processed. Restricted data can be stored but not processed.

**Right to Withdraw Consent (Article 7):** When processing is based on consent, individuals can withdraw consent at any time. Withdrawal doesn't affect lawfulness of processing before withdrawal but organization must stop processing after withdrawal.

### Why Privacy Request Handling Matters

**Legal Compliance:** GDPR violations can result in fines up to €20 million or 4% of global annual revenue (whichever is higher). CCPA fines range from $2,500 to $7,500 per violation. Non-compliance isn't just about fines - lawsuits, regulatory investigations, and class actions create significant legal exposure.

**Response Timeframes:** Organizations must respond to requests within 30 days under GDPR (extendable to 60 days for complex requests with notification). CCPA requires 45-day response (extendable to 90 days). Missing deadlines is non-compliance with direct regulatory consequences.

**Identity Verification:** Organizations must verify requester identity to prevent unauthorized data access. Verification methods include email confirmation, account login, government ID verification, or two-factor authentication. Balance security (prevent fraud) with accessibility (don't make legitimate requests impossible).

**Operational Impact:** Manual privacy request processing is resource-intensive. Companies receiving 100+ requests monthly need dedicated teams, ticketing systems, data discovery tools, and automated workflows. Enterprises process thousands of requests annually requiring significant operational investment.

### Implementation Requirements

**Request Intake:** Provide multiple channels for requests: web forms, email addresses (privacy@company.com, dpo@company.com), postal mail, or phone. GDPR doesn't mandate specific channels but form must be "easily accessible" and "easy to use". Some jurisdictions require toll-free phone numbers.

**Request Tracking:** Implement ticketing system to track requests from submission to completion. Record request type, submission date, verification status, data discovery progress, and response sent date. Audit trail demonstrates compliance during regulatory investigations.

**Data Discovery:** Organizations must locate all personal data across systems: production databases, backups, logs, analytics platforms, marketing tools, customer support systems, file shares, and third-party processors. Incomplete data discovery leads to incomplete responses and compliance violations.

**Data Compilation:** For access requests, compile data in readable format with explanations of technical fields. Provide context for retention periods, processing purposes, and data recipients. Raw database dumps don't satisfy accessibility requirements.

**Third-Party Coordination:** Organizations must notify third-party processors of deletion and rectification requests within reasonable timeframe. Track which third parties received data, document notification, and verify deletion. Failure to notify third parties violates GDPR.

### Common Privacy Request Challenges

**Identity Verification Balance:** Too lenient verification enables data breaches (attackers request others' data). Too strict verification prevents legitimate requests (users can't verify identity without access to account). Implement risk-based verification: simple requests get email verification, sensitive requests require stronger authentication.

**Data Discovery Complexity:** Personal data spreads across dozens of systems in modern architectures. Data warehouses, analytics platforms, third-party integrations, backups, and logs all potentially contain personal data. Incomplete discovery is common compliance failure. Implement data mapping to document where personal data lives.

**Conflicting Legal Obligations:** Organizations may have legal obligations to retain data (tax records, transaction history) that conflict with deletion requests. GDPR allows retention for legal obligations. Document legal basis for retention and communicate clearly to requesters.

**Technical Deletion Challenges:** True deletion is complex. Database soft-deletes don't comply. Backups containing personal data must eventually be deleted. Anonymization must be irreversible. Logs in read-only systems pose deletion challenges. Design systems with privacy from the outset ("privacy by design").

**Resource Constraints:** Small companies receiving dozens of requests monthly struggle with manual processing. Automated request handling, data discovery tools, and standardized workflows reduce operational burden. Enterprise privacy management platforms (OneTrust, TrustArc, BigID) automate compliance at scale.

This privacy request form helps users submit GDPR-compliant requests to OpenKit.tools. All processing is client-side - form opens your email client with pre-filled request details to send to our data protection contact.`
  },

  useCases: [
    {
      title: "Implement GDPR-Compliant Request Form",
      description: "Create a privacy request form that meets GDPR requirements for accessible, easy-to-use data subject request submission. Implement request type selection, identity verification, and automated routing to compliance team.",
      example: `// GDPR-compliant privacy request form
import { useState } from 'react';
import { z } from 'zod';

const requestTypes = [
  { value: 'access', label: 'Access Request', article: 'Article 15' },
  { value: 'deletion', label: 'Right to be Forgotten', article: 'Article 17' },
  { value: 'rectification', label: 'Rectification', article: 'Article 16' },
  { value: 'portability', label: 'Data Portability', article: 'Article 20' },
  { value: 'objection', label: 'Objection', article: 'Article 21' },
  { value: 'restriction', label: 'Restriction', article: 'Article 18' },
  { value: 'withdraw', label: 'Withdraw Consent', article: 'Article 7(3)' }
] as const;

// Validation schema
const requestSchema = z.object({
  email: z.string().email('Invalid email address'),
  type: z.enum(['access', 'deletion', 'rectification', 'portability', 'objection', 'restriction', 'withdraw']),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  verificationMethod: z.enum(['email', '2fa', 'id']).optional()
});

type RequestData = z.infer<typeof requestSchema>;

function PrivacyRequestForm() {
  const [formData, setFormData] = useState<Partial<RequestData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    const result = requestSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Submit request to backend
    const response = await fetch('/api/privacy-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.data)
    });

    if (response.ok) {
      const { ticketId } = await response.json();
      setSubmitted(true);

      // Send verification email
      await sendVerificationEmail(result.data.email, ticketId);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="privacy-request-form">
      <h2>Data Subject Rights Request</h2>
      <p className="legal-notice">
        Under GDPR Articles 15-22, you have rights regarding your personal data.
        We will respond within 30 days.
      </p>

      <div className="form-field">
        <label htmlFor="email">Email Address *</label>
        <input
          id="email"
          type="email"
          value={formData.email || ''}
          onChange={e => setFormData({...formData, email: e.target.value})}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="type">Request Type *</label>
        <select
          id="type"
          value={formData.type || ''}
          onChange={e => setFormData({...formData, type: e.target.value as any})}
          required
        >
          <option value="">Select request type</option>
          {requestTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label} ({type.article})
            </option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          value={formData.description || ''}
          onChange={e => setFormData({...formData, description: e.target.value})}
          placeholder="Please describe your request in detail..."
          rows={5}
          required
        />
        {errors.description && <span className="error">{errors.description}</span>}
        <span className="hint">Minimum 20 characters</span>
      </div>

      <button type="submit" disabled={submitted}>
        {submitted ? 'Request Submitted' : 'Submit Request'}
      </button>

      {submitted && (
        <div className="success-message">
          <h3>Request Submitted Successfully</h3>
          <p>
            Verification email sent to {formData.email}.
            Click link in email to verify your identity.
            We will respond within 30 days per GDPR Article 12.
          </p>
        </div>
      )}
    </form>
  );
},

// Backend API handler
export async function POST(req: Request) {
  const data: RequestData = await req.json();

  // Validate
  const result = requestSchema.safeParse(data);
  if (!result.success) {
    return Response.json({ error: 'Validation failed' }, { status: 400 });
  }

  // Create ticket in compliance system
  const ticket = await createComplianceTicket({
    type: data.type,
    email: data.email,
    description: data.description,
    submittedAt: new Date(),
    status: 'pending_verification',
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  });

  // Send verification email
  await sendEmail({
    to: data.email,
    subject: \`Verify Privacy Request #\${ticket.id}\`,
    template: 'privacy-verification',
    data: {
      ticketId: ticket.id,
      verificationToken: ticket.verificationToken,
      type: data.type
    }
  });

  // Log for audit
  await auditLog({
    action: 'privacy_request_submitted',
    ticketId: ticket.id,
    email: data.email,
    type: data.type
  });

  return Response.json({ ticketId: ticket.id });
}`
    },
    {
      title: "Automate Privacy Request Processing Pipeline",
      description: "Build automated workflow for processing privacy requests from intake through data discovery, compilation, review, and response. Track progress, automate data exports, and ensure regulatory compliance with proper audit trails.",
      example: `// Privacy request processing pipeline
import { Queue } from 'bullmq';

interface PrivacyRequest {
  id: string;
  type: 'access' | 'deletion' | 'rectification' | 'portability';
  email: string;
  verified: boolean;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  dueDate: Date;
}

// Queue for async processing
const privacyQueue = new Queue('privacy-requests', {
  connection: { host: 'redis', port: 6379 }
});

// Step 1: Identity Verification
async function verifyIdentity(requestId: string): Promise<boolean> {
  const request = await db.privacyRequests.findById(requestId);

  // Send verification email with token
  const token = generateSecureToken();
  await db.verificationTokens.create({
    requestId,
    token,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  });

  await sendEmail({
    to: request.email,
    subject: 'Verify Your Privacy Request',
    body: \`Click to verify: https://example.com/verify/\${token}\`
  });

  // Wait for verification (handled by webhook)
  return true;
},

// Step 2: Data Discovery
async function discoverPersonalData(email: string): Promise<any> {
  // Search across all systems
  const userData = await Promise.all([
    // Main database
    db.users.findByEmail(email),
    db.orders.findByEmail(email),
    db.subscriptions.findByEmail(email),

    // Analytics
    analytics.getUserEvents(email),

    // Marketing platforms
    mailchimp.findSubscriber(email),
    sendgrid.getContactDetails(email),

    // Customer support
    zendesk.searchTickets(email),

    // Logs (last 90 days only)
    searchLogs({ email, days: 90 })
  ]);

  return {
    user: userData[0],
    orders: userData[1],
    subscriptions: userData[2],
    events: userData[3],
    marketing: [...userData[4], ...userData[5]],
    support: userData[6],
    logs: userData[7]
  };
}

// Step 3: Process Access Request
async function processAccessRequest(requestId: string) {
  const request = await db.privacyRequests.findById(requestId);
  const data = await discoverPersonalData(request.email);

  // Compile data in readable format
  const export = {
    requestId,
    exportDate: new Date().toISOString(),
    dataSubject: request.email,
    personalData: {
      profile: sanitizeForExport(data.user),
      orders: data.orders.map(sanitizeForExport),
      subscriptions: data.subscriptions.map(sanitizeForExport),
      activityLog: data.events.slice(0, 1000), // Limit for size
      marketingData: data.marketing,
      supportTickets: data.support.map(ticket => ({
        id: ticket.id,
        subject: ticket.subject,
        created: ticket.createdAt,
        // Redact sensitive info from ticket content
        messages: ticket.messages.map(m => ({
          from: m.from === request.email ? 'You' : 'Support',
          date: m.date,
          preview: m.content.slice(0, 200)
        }))
      }))
    },
    processingPurposes: {
      profile: 'Service provision, account management',
      orders: 'Contract fulfillment, legal obligation',
      marketing: 'Consent-based marketing (withdrawn upon request)'
    },
    retentionPeriods: {
      profile: 'Account lifetime + 30 days',
      orders: '7 years (tax law)',
      marketing: 'Until consent withdrawn'
    },
    dataRecipients: [
      'AWS (hosting)',
      'Stripe (payment processing)',
      'SendGrid (email delivery)'
    ]
  };

  // Generate JSON export
  const exportPath = await generateExport(requestId, export);

  // Send download link
  await sendEmail({
    to: request.email,
    subject: 'Your Personal Data Export',
    body: \`Your data export is ready: \${exportPath}\n\nDownload expires in 7 days.\`
  });

  await db.privacyRequests.update(requestId, {
    status: 'completed',
    completedAt: new Date()
  });
},

// Step 4: Process Deletion Request
async function processDeletionRequest(requestId: string) {
  const request = await db.privacyRequests.findById(requestId);

  // Check for legal holds
  const legalHolds = await checkLegalObligations(request.email);
  if (legalHolds.length > 0) {
    await db.privacyRequests.update(requestId, {
      status: 'rejected',
      rejectionReason: \`Cannot delete due to legal obligations: \${legalHolds.join(', ')}\`
    });
    return;
  },

  // Delete from all systems
  await Promise.all([
    db.users.deleteByEmail(request.email),
    db.subscriptions.cancelByEmail(request.email),
    analytics.deleteUser(request.email),
    mailchimp.unsubscribe(request.email),
    sendgrid.deleteContact(request.email)
  ]);

  // Anonymize orders (legal obligation to retain transaction history)
  await db.orders.anonymize(request.email, {
    email: \`deleted-user-\${Date.now()}@example.com\`,
    name: 'Deleted User',
    address: '[REDACTED]'
  });

  // Notify third parties
  await notifyThirdParties('deletion', request.email);

  await db.privacyRequests.update(requestId, {
    status: 'completed',
    completedAt: new Date()
  });

  await sendEmail({
    to: request.email,
    subject: 'Data Deletion Completed',
    body: 'Your personal data has been deleted as requested.'
  });
},

// Worker processing queue
privacyQueue.process(async (job) => {
  const { requestId, type } = job.data;

  switch (type) {
    case 'access':
      await processAccessRequest(requestId);
      break;
    case 'deletion':
      await processDeletionRequest(requestId);
      break;
    // ... other types
  },
});`
    },
    {
      title: "Build Privacy Dashboard for Request Tracking",
      description: "Create admin dashboard for compliance teams to track privacy requests, monitor response deadlines, review data exports, and maintain audit trails. Provide metrics on request volume, average response time, and compliance status.",
      example: `// Privacy compliance dashboard
function PrivacyDashboard() {
  const [requests, setRequests] = useState<PrivacyRequest[]>([]);
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    // Fetch requests and metrics
    Promise.all([
      fetch('/api/privacy/requests').then(r => r.json()),
      fetch('/api/privacy/metrics').then(r => r.json())
    ]).then(([reqs, mets]) => {
      setRequests(reqs);
      setMetrics(mets);
    });
  }, []);

  return (
    <div className="privacy-dashboard">
      <h1>Privacy Request Management</h1>

      {/* Metrics Cards */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Open Requests</h3>
          <div className="metric-value">{metrics?.openRequests}</div>
          <span className="metric-trend">
            {metrics?.trendDirection === 'up' ? '↑' : '↓'} {metrics?.trendPercent}%
          </span>
        </div>

        <div className="metric-card">
          <h3>Overdue Requests</h3>
          <div className="metric-value danger">
            {metrics?.overdueRequests}
          </div>
          <span className="metric-label">Past 30-day deadline</span>
        </div>

        <div className="metric-card">
          <h3>Avg Response Time</h3>
          <div className="metric-value">{metrics?.avgResponseDays} days</div>
          <span className="metric-label">Target: ≤30 days</span>
        </div>

        <div className="metric-card">
          <h3>Completion Rate</h3>
          <div className="metric-value success">
            {metrics?.completionRate}%
          </div>
          <span className="metric-label">Last 90 days</span>
        </div>
      </div>

      {/* Request Table */}
      <div className="requests-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Email</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => {
              const daysRemaining = Math.floor(
                (request.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
              );
              const isOverdue = daysRemaining < 0;

              return (
                <tr key={request.id} className={isOverdue ? 'overdue' : ''}>
                  <td>#{request.id}</td>
                  <td>
                    <span className={\`badge badge-\${request.type}\`}>
                      {request.type}
                    </span>
                  </td>
                  <td>{request.email}</td>
                  <td>
                    <span className={\`status status-\${request.status}\`}>
                      {request.status}
                    </span>
                  </td>
                  <td>{request.submittedAt.toLocaleDateString()}</td>
                  <td className={isOverdue ? 'danger' : ''}>
                    {request.dueDate.toLocaleDateString()}
                    {isOverdue && ' (OVERDUE)'}
                  </td>
                  <td>
                    <button onClick={() => viewRequest(request.id)}>
                      View
                    </button>
                    <button onClick={() => processRequest(request.id)}>
                      Process
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Request Type Distribution */}
      <div className="request-distribution">
        <h3>Request Distribution (Last 90 Days)</h3>
        <div className="chart">
          {/* Chart showing breakdown by type */}
        </div>
      </div>
    </div>
  );
}`
    },
    {
      title: "Implement Multi-Tenant Privacy Request Handling",
      description: "Build privacy request system for SaaS platforms managing multiple customer tenants. Route requests to appropriate tenant, enforce tenant isolation, provide per-tenant compliance dashboards, and aggregate reporting.",
      example: `// Multi-tenant privacy request system
interface Tenant {
  id: string;
  name: string;
  privacyEmail: string;
  dpoEmail?: string;
  complianceSettings: {
    autoVerification: boolean;
    responseDeadline: number; // days
    retentionPolicy: Record<string, number>; // data type -> days
  };
},

// Tenant-aware request routing
async function routePrivacyRequest(email: string): Promise<Tenant | null> {
  // Determine tenant from email domain or user account
  const user = await db.users.findByEmail(email);
  if (!user) return null;

  return await db.tenants.findById(user.tenantId);
}

// Create tenant-specific request
export async function createPrivacyRequest(data: {
  email: string;
  type: string;
  description: string;
}) {
  const tenant = await routePrivacyRequest(data.email);
  if (!tenant) {
    throw new Error('No tenant found for email');
  },

  const request = await db.privacyRequests.create({
    ...data,
    tenantId: tenant.id,
    dueDate: new Date(
      Date.now() + tenant.complianceSettings.responseDeadline * 24 * 60 * 60 * 1000
    ),
    status: 'pending'
  });

  // Notify tenant compliance team
  await sendEmail({
    to: tenant.privacyEmail,
    subject: \`New Privacy Request: #\${request.id}\`,
    template: 'tenant-privacy-notification',
    data: { request, tenant }
  });

  return request;
},

// Tenant-specific data discovery
async function discoverTenantData(tenantId: string, email: string) {
  // Enforce tenant isolation in queries
  return {
    user: await db.users.findOne({ tenantId, email }),
    data: await db.tenantData.find({ tenantId, userEmail: email }),
    activity: await db.activityLogs.find({ tenantId, userEmail: email })
  };
},

// Tenant compliance dashboard
function TenantPrivacyDashboard({ tenantId }: { tenantId: string }) {
  const [requests, setRequests] = useState([]);
  const [settings, setSettings] = useState<Tenant['complianceSettings']>();

  useEffect(() => {
    // Fetch only this tenant's requests
    fetch(\`/api/tenants/\${tenantId}/privacy-requests\`)
      .then(r => r.json())
      .then(setRequests);

    fetch(\`/api/tenants/\${tenantId}/compliance-settings\`)
      .then(r => r.json())
      .then(setSettings);
  }, [tenantId]);

  return (
    <div className="tenant-privacy-dashboard">
      <h1>Privacy Request Management</h1>

      <div className="settings-panel">
        <h3>Compliance Settings</h3>
        <label>
          Response Deadline:
          <input
            type="number"
            value={settings?.responseDeadline}
            onChange={e => updateSetting('responseDeadline', parseInt(e.target.value))}
          />
          days
        </label>

        <label>
          <input
            type="checkbox"
            checked={settings?.autoVerification}
            onChange={e => updateSetting('autoVerification', e.target.checked)}
          />
          Auto-verify known users
        </label>
      </div>

      <div className="requests-list">
        {requests.map(request => (
          <PrivacyRequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
}`
    }
  ],

  howToUse: {
    title: "How to Use This Privacy Request Form",
    content: `This privacy request form allows you to exercise your data protection rights under GDPR, CCPA, and similar regulations. Submit requests for data access, deletion, rectification, portability, or to object to processing. The form validates your input and sends your request via email to the organization's data protection contact.

### Selecting Request Type

Click the dropdown menu to see 8 available request types. Access Request retrieves all personal data the organization holds about you. Deletion Request (Right to be Forgotten) requests permanent deletion of your personal data. Rectification Request corrects inaccurate or incomplete data.

Portability Request provides your data in machine-readable format (JSON) for transfer to another service. Objection Request stops processing of your data for specific purposes. Restriction Request limits data processing temporarily. Withdraw Consent removes previously given consent. Other covers any privacy request not listed.

Each request type shows the corresponding GDPR article number. Selecting a type pre-fills relevant description templates to guide your request.

### Entering Email Address

Type the email address associated with your account or the email you used when providing data to the organization. This email is used to verify your identity and send responses. The form validates email format automatically - you cannot submit with invalid email.

If you have multiple email addresses with the organization, use the primary email associated with your account. If unsure, use the email you use for login.

### Describing Your Request

Write a clear, specific description of your privacy request (minimum 20 characters). For access requests, specify what data you want (all data, specific categories, date ranges). For deletion requests, confirm you understand implications. For rectification requests, specify which data is incorrect and correct values.

Specific requests get faster responses. Instead of "delete my data", write "delete my account including profile, order history, and marketing subscriptions". Instead of "access my data", write "access all personal data collected since January 2023 including account details and purchase history".

### Submitting Request

Click Submit Request button. The form opens your default email client with pre-filled subject and body containing your request details. The email is addressed to the organization's data protection contact (e.g., privacy@company.com or dpo@company.com).

Send the email from your email client. The organization's compliance team receives your request and begins processing. You should receive confirmation email within 1-2 business days acknowledging receipt.

### After Submission

Organizations must respond within 30 days under GDPR (45 days under CCPA). For complex requests, they may extend deadline by additional 30 days with notification. You'll receive email updates on request status.

For access requests, expect a secure download link or password-protected file containing your personal data. For deletion requests, expect confirmation that data was deleted. For rectification requests, expect updated records showing corrections.

### If No Response

If you don't receive acknowledgment within 72 hours, check spam/junk folders. If still no response, resend your request or contact support directly. If no response within deadline (30-45 days), you can file complaint with supervisory authority (data protection authority in your country).

In Europe, contact your national Data Protection Authority. In California, contact California Privacy Protection Agency. Provide your request details, submission date, and lack of response as evidence.`,
    steps: [
      {
        name: "Select Request Type",
        text: "Choose from 8 GDPR/CCPA request types: Access, Deletion, Rectification, Portability, Objection, Restriction, Withdraw Consent, or Other. Each type corresponds to specific data protection rights."
      },
      {
        name: "Enter Email and Details",
        text: "Provide email address associated with your account. Write clear description (minimum 20 characters) specifying exactly what you're requesting. Be specific for faster processing."
      },
      {
        name: "Submit Via Email",
        text: "Click Submit to open pre-filled email in your email client. Send email from your email address. Organization's compliance team receives and processes your request."
      },
      {
        name: "Wait for Response",
        text: "Organization must respond within 30 days (GDPR) or 45 days (CCPA). Check email for acknowledgment, verification requests, and final response with requested data or confirmation."
      }
    ]
  },

  faqs: [
    {
      question: "How long does the organization have to respond to my request?",
      answer: "Under GDPR, organizations must respond within 30 days (1 month). For complex requests, they can extend by additional 60 days (total 90 days) with notification explaining why. Under CCPA, initial response is 45 days with possible 45-day extension (total 90 days). Response includes acknowledgment within 10 days and fulfillment within deadline."
    },
    {
      question: "Do I need to provide ID to verify my identity?",
      answer: "Organizations must verify your identity before fulfilling requests to prevent unauthorized data access. Verification methods vary: email confirmation (click link sent to your email), account login (verify through existing account), government ID (for high-risk requests), or two-factor authentication. Verification requirements depend on request type and data sensitivity."
    },
    {
      question: "Can organizations refuse my privacy request?",
      answer: "Organizations can refuse requests under specific conditions: (1) Identity cannot be verified. (2) Request is manifestly unfounded or excessive (e.g., repetitive requests). (3) Legal obligations require data retention (tax records, contracts). (4) Data is necessary for legal claims. Organizations must explain refusal reasons and inform you of right to complain to supervisory authority."
    },
    {
      question: "What happens to my data when I request deletion?",
      answer: "Organizations must delete all personal data unless they have legal grounds to retain it (legal obligations, legitimate interests, pending legal claims). Data in backups doesn't need immediate deletion but must be deleted when backups are refreshed. Organizations must also notify third parties who received your data to delete it. Some data may be anonymized instead of deleted if complete removal is technically impossible."
    },
    {
      question: "How do I know if my request was successful?",
      answer: "For access requests, you receive secure download link with your personal data in readable format (JSON, CSV, PDF). For deletion requests, you receive confirmation that data was deleted and which third parties were notified. For rectification requests, you receive confirmation of corrections made. All responses include explanation of data retained (if any) with legal justification."
    },
    {
      question: "Can I request data for someone else (family member, employee)?",
      answer: "Generally no - privacy requests must come from the data subject themselves. Exceptions: (1) Legal guardians can request for minors or incapacitated adults (proof required). (2) Executors can request for deceased persons (death certificate required). (3) Authorized representatives with written authorization. Organizations verify authorization to prevent unauthorized access."
    },
    {
      question: "What if I don't receive any response within the deadline?",
      answer: "If no response within deadline (30-45 days depending on regulation), you can: (1) Send follow-up email referencing original request. (2) Contact organization's customer support. (3) File complaint with supervisory authority (Data Protection Authority in EU, Attorney General in California). (4) Consider legal action for GDPR/CCPA violations. Document all communication for complaint evidence."
    },
    {
      question: "Can organizations charge fees for privacy requests?",
      answer: "GDPR: First request is free. Organizations can charge \"reasonable fee\" for additional copies or manifestly unfounded/excessive requests. CCPA: No fees for up to 2 requests per 12-month period. Beyond that, organizations may charge reasonable fee covering administrative costs. Fees must be communicated before processing request with opportunity to withdraw."
    },
    {
      question: "What data is included in access requests?",
      answer: "Access requests must include: (1) All personal data categories (profile info, activity logs, communications). (2) Processing purposes (why data is collected). (3) Data recipients (who received your data). (4) Retention periods (how long data is kept). (5) Data sources (where data came from if not directly from you). (6) Automated decision-making details (if applicable). Data must be in commonly used format (JSON, CSV, PDF)."
    },
    {
      question: "Can I withdraw consent and keep using the service?",
      answer: "Depends on legal basis for processing. If processing is based solely on consent, withdrawing consent may prevent continued service use. If processing has another legal basis (contract, legitimate interest), you can withdraw marketing consent but continue using core service. Example: Withdraw email marketing consent but keep account. Cannot withdraw consent for data necessary for service provision (account info, order history)."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This privacy request form operates client-side in your browser and sends requests via your email client. Form data is not transmitted to OpenKit.tools servers or stored remotely. The form validates your input and generates pre-filled email content for you to send from your own email account.

### Privacy Guarantees

- **Client-Side Processing:** Form validation and email generation happen locally in your browser using JavaScript. No form data sent to OpenKit.tools servers.
- **Email Client Sending:** Clicking Submit opens your default email client (Gmail, Outlook, Apple Mail) with pre-filled request. Email sends from your email account, not through OpenKit.tools infrastructure.
- **No Data Storage:** Your email address, request type, and description are not saved or logged anywhere. Form data exists only in your browser memory.
- **No Tracking:** We don't track what request types you select, what you write in descriptions, or any form interactions. Standard analytics track page views only.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect browser DevTools Network tab during form usage - zero network requests occur with your form data.

This form demonstrates GDPR-compliant privacy request submission. Use it as reference for implementing similar forms on your own websites or applications. All code is available for review and adaptation to your specific privacy compliance needs.`
  },

  stats: {
    "Request Types": "8",
    "Response Deadline": "30 days",
    "GDPR Articles": "7",
    "Verification Methods": "3+"
  }
};
