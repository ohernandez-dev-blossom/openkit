/**
 * IP Address Lookup Tool Guide Content
 * Comprehensive developer guide for IP detection and geolocation
 */

import type { ToolGuideContent } from "./types";

export const ipGuideContent: ToolGuideContent = {
  toolName: "IP Address Lookup",
  toolPath: "/ip",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Automatic IP Detection",
      description: "The tool automatically detects your public IP address on page load using multiple API fallbacks for reliability. Works across all browsers and devices, with special handling for Safari's privacy features."
    },
    {
      title: "View Location Details",
      description: "See comprehensive geolocation data including city, region, country, timezone, ISP organization, and GPS coordinates. All information is fetched in real-time from trusted IP lookup APIs."
    },
    {
      title: "Copy IP Address",
      description: "Tap or click the IP address display to instantly copy it to your clipboard. Works on desktop and mobile devices with fallback methods for older browsers and restrictive environments."
    },
    {
      title: "Refresh for Updates",
      description: "Click Refresh button to re-detect your IP address if you switch networks, enable/disable VPN, or encounter detection errors. Useful for verifying proxy configurations or network changes."
    }
  ],

  introduction: {
    title: "What is an IP Address?",
    content: `An IP (Internet Protocol) address is a unique numerical identifier assigned to every device connected to a network using the Internet Protocol. IP addresses serve two primary functions: identifying the host or network interface, and providing the location of the host in the network for routing purposes. For developers, understanding IP addresses is critical for implementing geolocation features, security measures, network debugging, and analytics.

There are two types of IP addresses: IPv4 (e.g., 192.168.1.1) uses 32-bit addresses allowing approximately 4.3 billion unique addresses, while IPv6 (e.g., 2001:0db8:85a3::8a2e:0370:7334) uses 128-bit addresses supporting virtually unlimited devices. Most consumer networks still use IPv4, but IPv6 adoption is growing due to IPv4 address exhaustion.

### Public vs Private IP Addresses

**Public IP addresses** are globally unique addresses assigned by ISPs (Internet Service Providers) that identify your network on the internet. When you visit a website, your public IP is visible to the server. Public IPs are routable on the internet and can be used to determine approximate geolocation (city, country, ISP). Your home router, office network, and mobile carrier all have public IPs.

**Private IP addresses** are used within local networks (LAN) and are not directly accessible from the internet. Common private IP ranges include 192.168.x.x (home routers), 10.x.x.x (corporate networks), and 172.16.x.x to 172.31.x.x (enterprise networks). Devices on your home WiFi have private IPs (192.168.1.100, 192.168.1.101) that your router translates to the public IP using NAT (Network Address Translation).

### Why IP Address Lookup Matters for Developers

**Geolocation and Localization:** Detecting user location via IP allows you to display content in the correct language, show regional pricing, restrict access based on geography (geo-blocking), or customize user experience. E-commerce sites use IP geolocation to calculate shipping costs and taxes. Streaming services use it for content licensing compliance.

**Security and Fraud Prevention:** IP addresses help detect suspicious activity: multiple failed login attempts from the same IP, account access from unusual locations, bot traffic, or credential stuffing attacks. Security systems block or rate-limit requests from suspicious IP ranges. Payment processors flag transactions when billing address country doesn't match IP country.

**Analytics and User Insights:** Track visitor geographic distribution to understand your audience. See which countries generate the most traffic, identify regional growth opportunities, or detect DDoS attacks from specific IP ranges. IP data powers analytics dashboards showing real-time visitor maps and demographic insights.

**Network Debugging:** When troubleshooting connectivity issues, knowing your public IP is essential. Verify VPN connections (IP changes when VPN activates), test proxy configurations, debug API calls (some APIs whitelist specific IPs), or diagnose DNS problems. Network administrators use IP lookups to verify routing and firewall rules.

### IP Geolocation Accuracy

IP geolocation accuracy varies by provider and network type. **Country-level accuracy** is typically 95-99% reliable - almost always correct. **City-level accuracy** ranges from 50-80% depending on ISP and network topology. Small towns and rural areas have less accurate city detection than major metropolitan areas.

**ISP and Organization** detection is highly accurate (90-95%) - identifies Internet Service Provider or corporate network. **Timezone** is usually accurate based on detected region. **GPS Coordinates** are approximate (not precise) - typically accurate to within 5-50 miles, not exact street address. Never use IP geolocation for precise location tracking - use device GPS for that.

Accuracy degrades for VPNs (shows VPN server location, not user's real location), mobile networks (may show carrier hub location), corporate networks (may show headquarters, not branch office), and Tor/proxies (shows exit node, not origin).

### Common IP Detection Challenges

**Browser Privacy Settings:** Modern browsers (especially Safari and Firefox) block cross-site tracking which can interfere with IP detection APIs. Safari's "Prevent Cross-Site Tracking" feature may block third-party IP lookup services. Solution: use multiple API fallbacks or detect user agent and show appropriate error messages.

**VPN and Proxy Detection:** Users behind VPNs or proxies show the VPN server's IP, not their real IP. This affects geolocation accuracy and can bypass geo-restrictions. Some IP lookup APIs provide VPN/proxy detection flags. For applications requiring accurate location, warn users that VPNs affect functionality.

**IPv4 vs IPv6:** Some users have IPv6 addresses which may not be supported by older IP geolocation databases. Modern IP lookup services support both, but legacy systems may fail. Always handle both address types and provide fallbacks.

**Corporate Firewalls:** Enterprise networks may block IP lookup API requests through Content Security Policies or firewall rules. Detection fails silently or returns firewall's public IP instead of user's device. Provide manual IP entry option as fallback.

### Developer Use Cases

**Auto-detect user country for region-specific features:** Automatically select currency, language, and content based on detected location. E-commerce checkout shows prices in local currency. Media sites display region-appropriate content.

**Implement IP-based rate limiting:** Prevent abuse by limiting requests per IP address. API endpoints track request counts by IP and return 429 (Too Many Requests) when thresholds are exceeded. Protect login endpoints from brute force attacks.

**Build admin dashboards with visitor maps:** Display real-time traffic on world maps showing visitor origins. Analytics platforms use IP data to generate geographic reports. Marketing teams use this data to understand market penetration.

**Verify VPN status during testing:** QA teams check if VPN is active before running region-specific tests. Developers verify proxy configurations by comparing expected vs actual IP addresses.

### Security and Privacy Considerations

IP addresses are considered Personal Identifiable Information (PII) under GDPR when combined with other data. Store IP addresses securely, implement data retention policies (delete old IPs), anonymize IPs in logs (remove last octet), and comply with data protection regulations. Allow users to request deletion of their IP data.

Never use IP addresses alone for authentication or authorization - they can be spoofed or shared. Use IP as one factor in multi-factor authentication or fraud scoring, not the sole security measure. Implement IP whitelisting carefully - users behind carrier-grade NAT (CGNAT) may share IPs with thousands of others.

This IP lookup tool uses third-party APIs (ipify, ipinfo.io, ipapi) to detect your IP and location. Your IP is not stored or logged by OpenKit.tools. The tool works entirely in your browser with API calls made directly to these services, not through our servers.`
  },

  useCases: [
    {
      title: "Auto-Detect User Country for Currency Display",
      description: "Detect visitor's country via IP address to automatically display prices in local currency. Improves conversion rates by showing relevant pricing without forcing users to manually select region.",
      example: `// Currency detection with IP geolocation
import { useState, useEffect } from 'react';

interface IPInfo {
  ip: string;
  country: string;
  city: string;
  currency?: string;
}

// Country to currency mapping
const countryCurrency: Record<string, string> = {
  US: 'USD', GB: 'GBP', CA: 'CAD', AU: 'AUD',
  DE: 'EUR', FR: 'EUR', ES: 'EUR', IT: 'EUR',
  JP: 'JPY', CN: 'CNY', IN: 'INR', BR: 'BRL'
};

async function fetchIPInfo(): Promise<IPInfo> {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();

    return {
      ip: data.ip,
      country: data.country_code,
      city: data.city,
      currency: countryCurrency[data.country_code] || 'USD'
    };
  } catch (error) {
    console.error('IP detection failed:', error);
    return { ip: '', country: 'US', city: '', currency: 'USD' };
  }
}

function PricingPage() {
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIPInfo().then(info => {
      setIpInfo(info);
      setLoading(false);
    });
  }, []);

  const formatPrice = (usdPrice: number): string => {
    if (!ipInfo) return \`$\${usdPrice}\`;

    // Currency conversion rates (in production, fetch from API)
    const rates: Record<string, number> = {
      USD: 1, EUR: 0.92, GBP: 0.79, CAD: 1.35,
      AUD: 1.52, JPY: 149.5, CNY: 7.24, INR: 83.2
    };

    const currency = ipInfo.currency!;
    const rate = rates[currency] || 1;
    const convertedPrice = (usdPrice * rate).toFixed(2);

    const symbols: Record<string, string> = {
      USD: '$', EUR: '€', GBP: '£', JPY: '¥',
      CAD: 'CA$', AUD: 'A$', CNY: '¥', INR: '₹'
    };

    return \`\${symbols[currency] || '$'}\${convertedPrice}\`;
  };

  if (loading) {
    return <div>Detecting location...</div>;
  },

  return (
    <div>
      <div className="location-info">
        Showing prices for: {ipInfo?.country || 'US'} ({ipInfo?.currency})
      </div>

      <div className="pricing-plans">
        <div className="plan">
          <h3>Basic Plan</h3>
          <div className="price">{formatPrice(9.99)}/month</div>
        </div>
        <div className="plan">
          <h3>Pro Plan</h3>
          <div className="price">{formatPrice(29.99)}/month</div>
        </div>
        <div className="plan">
          <h3>Enterprise Plan</h3>
          <div className="price">{formatPrice(99.99)}/month</div>
        </div>
      </div>

      <button onClick={() => {
        // Allow manual currency override
        const newCurrency = prompt('Select currency:');
        if (newCurrency) {
          setIpInfo(prev => prev ? {...prev, currency: newCurrency} : null);
        }
      }}>
        Change Currency
      </button>
    </div>
  );
},

// Automatically shows EUR prices for German visitors
// Shows GBP for UK visitors, JPY for Japanese, etc.
// Improves UX by removing manual country selection step`
    },
    {
      title: "Implement IP-Based Rate Limiting",
      description: "Protect APIs from abuse by tracking and limiting requests per IP address. Prevents brute force attacks, scraping, and denial-of-service attempts while allowing legitimate traffic.",
      example: `// Express.js rate limiting by IP address
import express from 'express';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

const app = express();
const redis = new Redis(process.env.REDIS_URL);

// Strict rate limit for login endpoints
const loginLimiter = rateLimit({
  store: new RedisStore({
    client: redis,
    prefix: 'rl:login:'
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 attempts per IP
  message: {
    error: 'Too many login attempts. Try again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Use IP from X-Forwarded-For if behind proxy
  keyGenerator: (req) => {
    return req.ip || req.headers['x-forwarded-for'] as string || 'unknown';
  },
  // Custom handler for rate limit exceeded
  handler: (req, res) => {
    const retryAfter = Math.ceil(req.rateLimit.resetTime! / 1000);
    res.status(429).json({
      error: 'Too many requests',
      retryAfter,
      message: \`Please wait \${Math.ceil(retryAfter / 60)} minutes\`
    });
  }
});

// Standard API rate limit
const apiLimiter = rateLimit({
  store: new RedisStore({ client: redis, prefix: 'rl:api:' }),
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Max 100 requests per minute per IP
  message: { error: 'Rate limit exceeded' }
});

// Aggressive rate limit for public endpoints
const publicLimiter = rateLimit({
  store: new RedisStore({ client: redis, prefix: 'rl:public:' }),
  windowMs: 60 * 1000,
  max: 20, // Max 20 requests per minute
  message: { error: 'Slow down! Too many requests.' }
});

// Apply rate limiters to routes
app.post('/api/auth/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  // Login logic...
  res.json({ success: true });
});

app.post('/api/auth/register', loginLimiter, async (req, res) => {
  // Registration logic...
  res.json({ success: true });
});

app.get('/api/data', apiLimiter, async (req, res) => {
  // API logic...
  res.json({ data: [] });
});

// IP-specific blocking for detected abuse
const blockedIPs = new Set<string>();

async function checkBlockedIP(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = req.ip || req.headers['x-forwarded-for'] as string;

  if (blockedIPs.has(ip)) {
    return res.status(403).json({
      error: 'Access denied',
      message: 'Your IP has been blocked due to suspicious activity'
    });
  }

  next();
},

app.use('/api', checkBlockedIP);

// Admin endpoint to block IPs
app.post('/admin/block-ip', async (req, res) => {
  const { ip, reason } = req.body;
  blockedIPs.add(ip);

  await redis.set(\`blocked:\${ip}\`, JSON.stringify({
    reason,
    blockedAt: new Date().toISOString()
  }));

  res.json({ success: true, message: \`Blocked \${ip}\` });
});

app.listen(3000);`
    },
    {
      title: "Build Real-Time Visitor Analytics Dashboard",
      description: "Track visitor geographic distribution in real-time by logging IP addresses and displaying traffic on world maps. Helps understand audience demographics, identify growth markets, and detect traffic anomalies.",
      example: `// Real-time visitor analytics with IP geolocation
import { Server } from 'socket.io';
import { createServer } from 'http';
import geoip from 'geoip-lite';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

interface Visitor {
  ip: string;
  country: string;
  city: string;
  timestamp: number;
  userAgent: string;
}

const activeVisitors = new Map<string, Visitor>();
const visitHistory: Visitor[] = [];

// Track visitor connections
io.on('connection', (socket) => {
  const ip = socket.handshake.address;
  const userAgent = socket.handshake.headers['user-agent'] || 'Unknown';

  // Lookup IP geolocation
  const geo = geoip.lookup(ip);

  const visitor: Visitor = {
    ip,
    country: geo?.country || 'Unknown',
    city: geo?.city || 'Unknown',
    timestamp: Date.now(),
    userAgent
  };

  activeVisitors.set(socket.id, visitor);
  visitHistory.push(visitor);

  // Broadcast new visitor to admin dashboard
  io.emit('visitor:new', {
    id: socket.id,
    ...visitor,
    total: activeVisitors.size
  });

  console.log(\`New visitor from \${visitor.city}, \${visitor.country}\`);

  socket.on('disconnect', () => {
    activeVisitors.delete(socket.id);
    io.emit('visitor:left', {
      id: socket.id,
      total: activeVisitors.size
    });
  });
});

// API endpoint for dashboard data
httpServer.on('request', (req, res) => {
  if (req.url === '/api/analytics') {
    // Calculate statistics
    const countryCounts: Record<string, number> = {};
    const cityCounts: Record<string, number> = {};

    visitHistory.forEach(v => {
      countryCounts[v.country] = (countryCounts[v.country] || 0) + 1;
      cityCounts[v.city] = (cityCounts[v.city] || 0) + 1;
    });

    const topCountries = Object.entries(countryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([country, count]) => ({ country, count }));

    const topCities = Object.entries(cityCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([city, count]) => ({ city, count }));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      activeVisitors: activeVisitors.size,
      totalVisits: visitHistory.length,
      topCountries,
      topCities,
      recentVisitors: Array.from(activeVisitors.values()).slice(-20)
    }));
  }
});

httpServer.listen(3001);

// React dashboard component
function AnalyticsDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(setStats);

    const interval = setInterval(() => {
      fetch('/api/analytics')
        .then(res => res.json())
        .then(setStats);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Real-Time Visitor Analytics</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Active Visitors</h3>
          <div className="stat-value">{stats.activeVisitors}</div>
        </div>
        <div className="stat-card">
          <h3>Total Visits</h3>
          <div className="stat-value">{stats.totalVisits}</div>
        </div>
      </div>

      <div className="top-countries">
        <h3>Top Countries</h3>
        <ul>
          {stats.topCountries.map((item: any) => (
            <li key={item.country}>
              {item.country}: {item.count} visits
            </li>
          ))}
        </ul>
      </div>

      <div className="recent-visitors">
        <h3>Recent Visitors</h3>
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>City</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentVisitors.map((v: Visitor, i: number) => (
              <tr key={i}>
                <td>{v.country}</td>
                <td>{v.city}</td>
                <td>{new Date(v.timestamp).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}`
    },
    {
      title: "Detect VPN Usage for Testing and Security",
      description: "Verify if users are behind VPNs or proxies by comparing expected location with detected IP geolocation. Useful for testing region-specific features, enforcing geo-restrictions, or detecting suspicious activity.",
      example: `// VPN detection for security and testing
import axios from 'axios';

interface IPAnalysis {
  ip: string;
  country: string;
  isVPN: boolean;
  isProxy: boolean;
  isTor: boolean;
  risk: 'low' | 'medium' | 'high';
}

async function analyzeIP(ip: string): Promise<IPAnalysis> {
  try {
    // Use IP analysis API (e.g., IPQualityScore, IPHub)
    const response = await axios.get(
      \`https://ipqualityscore.com/api/json/ip/\${process.env.IPQS_KEY}/\${ip}\`
    );

    const data = response.data;

    return {
      ip,
      country: data.country_code,
      isVPN: data.vpn === true,
      isProxy: data.proxy === true,
      isTor: data.tor === true,
      risk: data.fraud_score > 75 ? 'high' : data.fraud_score > 50 ? 'medium' : 'low'
    };
  } catch (error) {
    console.error('IP analysis failed:', error);
    // Fallback: basic geolocation without VPN detection
    return {
      ip,
      country: 'Unknown',
      isVPN: false,
      isProxy: false,
      isTor: false,
      risk: 'low'
    };
  }
}

// Express middleware for VPN detection
async function detectVPN(req: any, res: any, next: any) {
  const ip = req.ip || req.headers['x-forwarded-for'];

  const analysis = await analyzeIP(ip);

  // Attach to request for downstream handlers
  req.ipAnalysis = analysis;

  // Warn or block VPN users if required
  if (analysis.isVPN && req.path.startsWith('/restricted')) {
    return res.status(403).json({
      error: 'VPN detected',
      message: 'This content is not available via VPN or proxy services.'
    });
  }

  // Log high-risk IPs for security monitoring
  if (analysis.risk === 'high') {
    console.warn(\`High-risk IP detected: \${ip}\`, analysis);
  }

  next();
}

// Test automation: verify VPN is active before region tests
async function runRegionTests() {
  const myIP = await fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => data.ip);

  const analysis = await analyzeIP(myIP);

  if (!analysis.isVPN) {
    throw new Error(
      'VPN not active! Region-specific tests require VPN to simulate different countries.'
    );
  }

  console.log(\`VPN active. Testing from: \${analysis.country}\`);

  // Run tests that depend on geographic location
  // ...
}

// User-facing VPN status indicator
function VPNStatusBanner() {
  const [vpnStatus, setVpnStatus] = useState<IPAnalysis | null>(null);

  useEffect(() => {
    fetch('/api/check-vpn')
      .then(res => res.json())
      .then(setVpnStatus);
  }, []);

  if (!vpnStatus) return null;

  if (vpnStatus.isVPN || vpnStatus.isProxy) {
    return (
      <div className="banner warning">
        ⚠️ VPN or proxy detected. Some features may not work correctly.
        Detected location: {vpnStatus.country}
      </div>
    );
  }

  return null;
}

// Helps developers verify proxy configuration
// Security teams detect suspicious traffic patterns
// QA ensures test environment uses correct VPN region`
    }
  ],

  howToUse: {
    title: "How to Use This IP Lookup Tool",
    content: `This IP lookup tool automatically detects your public IP address and associated geolocation data when you load the page. The tool uses multiple API providers with automatic fallback to ensure reliable detection across all browsers, networks, and devices.

### Automatic IP Detection

On page load, the tool makes API requests to trusted IP lookup services (ipify, ipinfo.io, ipapi) to detect your public IP address. The first API that responds successfully provides your IP data. If one API fails due to network issues or browser privacy settings, the tool automatically tries the next provider until successful detection.

The detected IP address is your public IP - the address visible to websites you visit. This is typically your ISP-assigned address or, if you're behind a VPN/proxy, the VPN server's IP address. The tool cannot detect your private/local IP (192.168.x.x) because that information is not exposed to web applications.

### Viewing Location Details

Below the IP address display, the tool shows comprehensive geolocation data: city (approximate location based on IP routing), region (state or province), country (usually 95%+ accurate), timezone (local time zone), ISP organization (Internet Service Provider or network operator), and GPS coordinates (approximate latitude/longitude, not precise address).

Geolocation accuracy varies: country is almost always correct, city is 50-80% accurate (better in urban areas), coordinates are approximate (within 5-50 miles). Never use IP geolocation for precise location - it's for general regional identification only.

### Copying IP Address

Click or tap anywhere on the IP address display (the large number in the center) to copy it to your clipboard. A "Copied!" message confirms successful copy. The tool uses multiple clipboard methods (modern Clipboard API, legacy execCommand) to ensure compatibility with all browsers including older mobile devices.

Use the copied IP for network troubleshooting, API IP whitelisting configuration, security analysis, or sharing with support teams. The IP is copied in standard dotted-decimal format (e.g., 203.0.113.42) for IPv4 or full notation for IPv6.

### Refreshing Detection

Click the Refresh button in the header to re-detect your IP address. This is useful when you switch networks (WiFi to mobile), enable/disable VPN (verifies VPN is active by checking IP change), encounter detection errors (browser privacy settings blocking API), or need to update location after traveling.

The refresh button shows a spinning animation while detection is in progress. If detection fails after trying all API providers, an error message explains possible causes (browser privacy features, ad blockers, network restrictions) with troubleshooting suggestions.

### Safari Privacy Handling

Safari's "Prevent Cross-Site Tracking" feature can block IP lookup APIs because they're considered third-party services. If detection fails in Safari, the tool shows a Safari-specific error message with instructions: disable "Prevent Cross-Site Tracking" in Settings → Safari → Privacy & Security, then refresh the page.

For maximum compatibility, the tool uses simple fetch requests without custom headers and implements long timeouts (10 seconds per API). This minimizes issues with restrictive browser settings while maintaining fast performance for most users.`,
    steps: [
      {
        name: "Wait for Automatic Detection",
        text: "The page automatically detects your IP address on load using multiple API providers. Detection typically completes in 1-2 seconds. If you see 'Detecting your IP...' for more than 5 seconds, check browser privacy settings."
      },
      {
        name: "Review IP and Location Data",
        text: "Check your public IP address displayed prominently in the center. Below it, review geolocation details including city, country, ISP, timezone, and coordinates. Remember that city-level accuracy is approximate."
      },
      {
        name: "Copy IP Address",
        text: "Click the IP address display to copy it to your clipboard. A confirmation message appears. Use the copied IP for network diagnostics, API configuration, security analysis, or support tickets."
      },
      {
        name: "Refresh If Needed",
        text: "Click Refresh button after switching networks or enabling VPN to verify IP change. If detection fails, check for browser privacy features or ad blockers that may block IP lookup APIs."
      }
    ]
  },

  faqs: [
    {
      question: "Why does the tool show a different location than where I am?",
      answer: "IP geolocation is approximate, especially at city level. Your ISP's routing infrastructure may route through a different city than your actual location. Mobile carriers often show the carrier hub city, not your phone's location. For precise location, use device GPS - IP geolocation is for general regional identification only."
    },
    {
      question: "Can this tool detect my exact address or physical location?",
      answer: "No. IP geolocation provides approximate region (city, country) based on ISP routing, not precise GPS coordinates. Accuracy is typically within 5-50 miles for city detection. The tool cannot and does not access your device's GPS. For privacy reasons, IP-based location is deliberately imprecise and cannot reveal street addresses."
    },
    {
      question: "Why does the tool fail to detect my IP in Safari?",
      answer: "Safari's 'Prevent Cross-Site Tracking' feature blocks third-party API requests including IP lookup services. Solution: Open Settings → Safari → Privacy & Security → disable 'Prevent Cross-Site Tracking' → refresh the page. This is a privacy feature in Safari and Firefox that affects all IP detection tools, not just ours."
    },
    {
      question: "Does this tool work with VPNs and proxies?",
      answer: "Yes, but it shows the VPN server's IP and location, not your real IP and location. This is expected behavior - VPNs route your traffic through their servers, so websites (including this tool) see the VPN IP. Use this to verify your VPN is working: detected country should match your VPN server's country."
    },
    {
      question: "What's the difference between public and private IP addresses?",
      answer: "Public IP (shown by this tool) is your network's internet-facing address assigned by your ISP. It's globally unique and visible to websites. Private IP (like 192.168.1.100) is your device's address on your local network (home WiFi, office LAN). Web applications cannot see private IPs - only public IPs are visible on the internet."
    },
    {
      question: "Can I use this tool to find someone else's IP address?",
      answer: "No. This tool only detects the IP address of the device accessing it. To find someone else's IP, they would need to use the tool themselves. IP addresses are not publicly searchable - you can only see your own IP or IPs connecting to servers you control (web servers, APIs, game servers)."
    },
    {
      question: "Why does my IP address keep changing?",
      answer: "Most residential ISPs use dynamic IP assignment - your IP changes periodically (daily, weekly, or when modem restarts). This is normal and reduces ISP costs. Business accounts often have static IPs (never change). Mobile IPs change frequently as you move between cell towers. Switching WiFi networks changes your IP to the new network's public IP."
    },
    {
      question: "Is it safe to share my IP address?",
      answer: "Generally yes for legitimate purposes (tech support, API whitelisting, network debugging). Your IP reveals approximate location (city/country) and ISP but not personal details. However, don't post your IP publicly on forums or social media - attackers could target your network with DDoS attacks or port scans. Share IPs only with trusted parties for specific purposes."
    },
    {
      question: "Can ad blockers or privacy extensions block IP detection?",
      answer: "Yes. Privacy-focused browser extensions (uBlock Origin, Privacy Badger, Ghostery) may block requests to IP lookup APIs classified as 'tracking services.' If detection fails, try disabling extensions temporarily or whitelist the IP lookup APIs (ipify.org, ipinfo.io, ipapi.co) in your extension settings."
    },
    {
      question: "How does this tool detect IPv6 addresses?",
      answer: "The tool supports both IPv4 (e.g., 203.0.113.42) and IPv6 (e.g., 2001:0db8:85a3::8a2e:0370:7334). If your ISP provides IPv6 and your device uses it, the API returns your IPv6 address. Many home networks still use IPv4 only or IPv6 with IPv4 fallback (dual stack). Mobile networks increasingly use IPv6."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This IP lookup tool operates with strong privacy protections. Your IP address is detected using third-party IP lookup APIs (ipify, ipinfo.io, ipapi) but is not stored, logged, or transmitted to OpenKit.tools servers.

### Privacy Guarantees

- **No Server Storage:** OpenKit.tools does not store your IP address or location data. All API requests go directly from your browser to IP lookup services, not through our servers.
- **No Logging:** We do not log, track, or record IP detection requests. Your usage of this tool is private and anonymous.
- **Third-Party APIs:** The tool uses established IP lookup services (ipify, ipinfo.io, ipapi). These services have their own privacy policies. They detect your IP by nature of the HTTP request but typically don't store personal data.
- **No Analytics on IP Data:** We do not track which IPs use this tool or correlate IP addresses with other user behavior. Standard analytics (page views, referrers) do not include IP-specific data.
- **Client-Side Processing:** All IP detection logic runs in your browser. No backend processing of your IP or location occurs on OpenKit.tools infrastructure.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect browser DevTools Network tab during detection - you'll see requests to IP lookup APIs, not to OpenKit.tools servers.

Safe for checking your IP before configuring VPNs, verifying proxy settings, troubleshooting network issues, or identifying your public IP for API whitelisting. Use with confidence knowing your IP is not stored or shared beyond the necessary API calls for detection.`
  },

  stats: {
    "API Providers": "3",
    "Detection Time": "<2s",
    "Country Accuracy": "95%+",
    "City Accuracy": "50-80%"
  }
};
