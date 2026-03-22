/**
 * DNS Lookup Tool Guide Content
 */

import type { ToolGuideContent } from "./types";

export const dnsLookupGuideContent: ToolGuideContent = {
  toolName: "DNS Lookup",
  toolPath: "/dns-lookup",
  lastUpdated: "2026-02-06",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Enter a Domain",
      description: "Type a domain name like example.com or subdomain.example.com. No protocol prefix needed — just the bare domain."
    },
    {
      title: "Choose Record Types",
      description: "Select one or more record types: A (IPv4), AAAA (IPv6), CNAME, MX (mail), TXT (SPF/DKIM), NS (nameservers), SOA, PTR (reverse). Multiple selections query all at once."
    },
    {
      title: "Click Lookup",
      description: "Hit the Lookup button (or press Enter) to query Google's public DNS-over-HTTPS API. Results appear with record values, TTLs, and response times."
    },
    {
      title: "Batch Lookup",
      description: "Switch to Batch mode to query multiple domains at once. Enter one domain per line or comma-separated. All selected record types are queried for every domain."
    }
  ],

  introduction: {
    title: "What is DNS?",
    content: `DNS (Domain Name System) translates human-readable domain names (google.com) into machine-readable IP addresses (142.250.80.46). It is the phonebook of the internet.

### Common DNS Record Types

- **A:** Maps a domain to an IPv4 address (e.g. 93.184.216.34)
- **AAAA:** Maps a domain to an IPv6 address
- **CNAME:** Alias from one domain to another (www → example.com)
- **MX:** Mail exchange servers with priority values
- **TXT:** Arbitrary text, often used for SPF, DKIM, domain verification
- **NS:** Authoritative nameservers for the domain
- **SOA:** Start of Authority — primary NS, admin email, serial, timers
- **PTR:** Reverse DNS — maps an IP back to a domain name

### DNS-over-HTTPS

This tool uses Google's public DoH endpoint (dns.google/resolve) to perform lookups directly from your browser. DoH encrypts DNS queries over HTTPS, preventing eavesdropping compared to traditional plaintext DNS (port 53).`
  },

  useCases: [
    {
      title: "Domain Migration Verification",
      description: "After changing DNS providers or migrating a domain, verify that A, CNAME, MX, and NS records point to the correct targets before and after TTL expiry.",
      example: "Check A record for app.example.com → 203.0.113.5 after Vercel deploy"
    },
    {
      title: "Email Deliverability Debugging",
      description: "Check MX records to confirm mail routing, TXT records for SPF and DKIM, and ensure no conflicting records that cause mail to be rejected or marked as spam.",
      example: "Lookup TXT for example.com → v=spf1 include:_spf.google.com ~all"
    },
    {
      title: "SSL Certificate Validation",
      description: "Verify CNAME or TXT records required for domain validation by certificate authorities (Let's Encrypt, AWS ACM). Confirm propagation before requesting cert issuance.",
      example: "Check TXT _acme-challenge.example.com → validation token"
    },
    {
      title: "CDN & Load Balancer Setup",
      description: "Confirm CNAME or A records point to CDN endpoints (CloudFront, Cloudflare) and verify NS delegation for sub-domains used by third-party services.",
      example: "CNAME cdn.example.com → d1234.cloudfront.net"
    }
  ],

  howToUse: {
    title: "How to Use This DNS Lookup Tool",
    content: `This tool queries Google's public DNS-over-HTTPS (DoH) API directly from your browser. No server-side proxy is involved — your browser makes HTTPS requests to dns.google.

### Single Domain Lookup

Enter a domain name and select one or more record types. Press Enter or click Lookup. Results display each answer with its name, type, TTL (time to live in seconds), and value. Response time is measured from your browser to Google's DNS server.

### Batch Lookup

Toggle Batch mode to query multiple domains at once. Enter one domain per line or separate with commas. Each domain is queried for all selected record types. This is useful for auditing DNS across multiple properties or checking propagation for several sub-domains.

### Understanding TTL

TTL (Time To Live) indicates how long DNS resolvers should cache the record. A TTL of 300 means 5 minutes of caching. After changing a record, you may need to wait for the old TTL to expire before the new value propagates worldwide. During migrations, lower TTL beforehand to speed up propagation.

### Response Time

The displayed response time measures the round-trip from your browser to Google's DoH API. It includes network latency and Google's internal DNS resolution time. Typical times range from 20-100ms depending on your location.`,
    steps: [
      { name: "Enter Domain", text: "Type a domain name (example.com). No protocol prefix needed." },
      { name: "Select Record Types", text: "Choose one or more: A, AAAA, CNAME, MX, TXT, NS, SOA, PTR." },
      { name: "Click Lookup", text: "Query Google DoH API. Results show values, TTLs, and response times." },
      { name: "Copy or Batch", text: "Copy individual values or all results. Use Batch mode for multiple domains." }
    ]
  },

  faqs: [
    {
      question: "Which DNS resolver does this tool use?",
      answer: "This tool queries Google's public DNS-over-HTTPS API at dns.google/resolve. Your browser makes direct HTTPS requests to Google's servers. No intermediate proxy or backend is involved."
    },
    {
      question: "Why might I see different results than `dig` or `nslookup`?",
      answer: "Google's public DNS may have different cache state than your local resolver. TTL-based caching means recently changed records may show stale values until the TTL expires. Google's resolvers also implement DNSSEC validation and may filter certain responses."
    },
    {
      question: "What does NXDOMAIN mean?",
      answer: "NXDOMAIN (Non-Existent Domain) means the domain name does not exist in DNS. This could mean the domain is unregistered, expired, or you have a typo. It's different from 'no records' which means the domain exists but has no records of the queried type."
    },
    {
      question: "Can I do reverse DNS lookups?",
      answer: "Yes. Select the PTR record type and enter a reverse DNS name (e.g. 34.216.184.93.in-addr.arpa for IP 93.184.216.34). PTR records map IP addresses back to domain names."
    },
    {
      question: "Are my DNS queries private?",
      answer: "Your queries are sent over HTTPS to Google's DNS API, which encrypts them in transit. Google may log queries per their privacy policy. No queries pass through our servers — the requests go directly from your browser to dns.google."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `DNS queries are sent from your browser directly to Google's public DNS-over-HTTPS API (dns.google). No data passes through OpenKit.tools servers.

- **Encrypted in transit:** All queries use HTTPS, preventing network-level eavesdropping.
- **No server proxy:** Your browser connects directly to Google DNS. We have no backend that handles or logs your queries.
- **No storage:** Domain names and results are not saved, logged, or tracked by OpenKit.tools. Refresh the page to clear everything.
- **Google's privacy policy** applies to queries sent to their DoH endpoint. See dns.google for details.

Safe for checking production domains, sensitive infrastructure, and pre-launch configurations.`
  },

  stats: {
    "Record Types": "8",
    "DNS Provider": "Google DoH",
    "Batch Limit": "Unlimited",
    "Typical Response": "20–100ms"
  }
};
