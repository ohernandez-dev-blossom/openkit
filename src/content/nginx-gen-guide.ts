import type { ToolGuideContent } from "./types";

export const nginxGenGuideContent: ToolGuideContent = {
  toolName: "Nginx Config Generator",
  toolPath: "/nginx-gen",
  lastUpdated: "2026-02-06",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Choose Server Type",
      description: "Select Reverse Proxy (for Node.js, Python, etc.), Static Site, SPA (React/Vue/Angular), or Redirect."
    },
    {
      title: "Set Domain & Backend",
      description: "Enter your domain name and backend address (for reverse proxy) or document root (for static/SPA)."
    },
    {
      title: "Configure SSL",
      description: "Choose Let's Encrypt (automatic paths), custom certificate, or no SSL. HTTP→HTTPS redirect is auto-generated."
    },
    {
      title: "Enable Features & Copy",
      description: "Toggle gzip, caching, security headers, rate limiting, WebSocket support, and CORS. Copy the config."
    }
  ],

  introduction: {
    title: "What is Nginx?",
    content: `Nginx (pronounced "engine-x") is the world's most popular web server and reverse proxy, powering over 30% of all websites. It's known for high performance, stability, and low resource consumption.

### Why Generate Nginx Configs?

Nginx configuration syntax is powerful but verbose. A typical reverse proxy setup with SSL, security headers, gzip, and caching easily exceeds 80 lines. Getting the syntax wrong means silent failures or security gaps.

### What This Tool Generates

- **Reverse Proxy configs** — proxy_pass to Node.js, Python, Go, Java backends
- **Static site configs** — serve HTML/CSS/JS with proper caching
- **SPA configs** — try_files fallback for React, Vue, Angular routing
- **Redirect configs** — HTTP→HTTPS, domain→domain
- **SSL/TLS** — Let's Encrypt or custom certs with modern cipher suites
- **Security headers** — HSTS, X-Frame-Options, CSP-ready
- **Load balancing** — upstream blocks with weighted servers
- **Performance** — gzip, static caching, rate limiting`
  },

  useCases: [
    {
      title: "Reverse Proxy for Node.js/Python",
      description: "Proxy traffic from port 80/443 to your app running on localhost:3000 (or any port). Includes WebSocket support for Socket.IO/ws.",
      example: "Node.js Express app → nginx → Let's Encrypt SSL → public internet"
    },
    {
      title: "Static Site Hosting",
      description: "Serve static files with proper MIME types, gzip compression, and cache headers. Perfect for Hugo, Jekyll, 11ty, or plain HTML.",
      example: "Hugo build output in /var/www/mysite → nginx with 30d cache for assets"
    },
    {
      title: "SPA Deployment",
      description: "Deploy React, Vue, or Angular apps with try_files fallback for client-side routing. No more 404s on page refresh.",
      example: "React Router app → try_files $uri /index.html → works on all routes"
    },
    {
      title: "Load Balancing",
      description: "Distribute traffic across multiple backend servers with weighted round-robin. Scale horizontally without external load balancers.",
      example: "3 Node.js instances on ports 3001-3003 → upstream block → nginx"
    }
  ],

  howToUse: {
    title: "How to Use Nginx Config Generator",
    content: `Build your Nginx configuration step by step with sensible defaults.

### Server Types

- **Reverse Proxy:** Forwards requests to a backend application (Node.js, Python Flask/Django, Go, Java Spring, etc.)
- **Static Site:** Serves files from a directory. Uses try_files for clean URLs.
- **SPA:** Like static but with fallback to index.html for client-side routing.
- **Redirect:** Simple 301/302 redirect (HTTP→HTTPS, www→non-www, etc.)

### SSL Configuration

Three modes:
- **No SSL:** Plain HTTP on port 80 (development only)
- **Let's Encrypt:** Auto-generates correct cert paths and ACME challenge location
- **Custom:** Enter your own certificate and key paths

When SSL is enabled, an HTTP→HTTPS redirect block is automatically added.

### Feature Toggles

Each feature adds production-ready config blocks:
- **Gzip:** Compresses text, JSON, CSS, JS, SVG (level 6)
- **Caching:** expires + Cache-Control for static assets
- **Security Headers:** HSTS, X-Frame-Options, X-Content-Type-Options, etc.
- **Rate Limiting:** limit_req_zone with configurable rate and burst
- **WebSocket:** Upgrade headers for Socket.IO, ws, etc.
- **CORS:** Access-Control-Allow-* headers with OPTIONS preflight`,
    steps: [
      { name: "Select Server Type", text: "Choose reverse proxy, static site, SPA, or redirect." },
      { name: "Enter Domain", text: "Set your domain name and backend address or document root." },
      { name: "Configure SSL", text: "Choose Let's Encrypt, custom cert, or no SSL." },
      { name: "Toggle Features", text: "Enable gzip, caching, security headers, rate limiting, etc." },
      { name: "Copy Config", text: "Copy the generated config and save to /etc/nginx/sites-available/." }
    ]
  },

  faqs: [
    {
      question: "Where do I put this config file?",
      answer: "Save it to /etc/nginx/sites-available/yourdomain.com, then create a symlink: sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/. Test with sudo nginx -t and reload with sudo systemctl reload nginx."
    },
    {
      question: "How do I set up Let's Encrypt with this config?",
      answer: "First deploy the config without SSL (set to 'No SSL'), then run: sudo certbot --nginx -d yourdomain.com. Or use the standalone method: deploy the config with Let's Encrypt selected (it includes the ACME challenge location), then run certbot certonly --webroot -w /var/www/certbot -d yourdomain.com."
    },
    {
      question: "Does this work with Docker?",
      answer: "Yes. For Docker, change the proxy_pass address to the container name (e.g., http://my-app:3000) if using Docker networks, or use the host IP. The generated config works as-is inside an nginx Docker container."
    },
    {
      question: "Why HTTP2 with SSL only?",
      answer: "HTTP/2 requires TLS in all major browsers. While the HTTP/2 spec allows plaintext (h2c), no browser supports it. The generated config enables http2 only when SSL is configured."
    },
    {
      question: "Is the generated config production-ready?",
      answer: "Yes, with caveats. The SSL ciphers, protocol versions, and security headers follow current best practices (Mozilla recommended). However, always test with nginx -t before deploying, and adjust values (rate limits, body size, cache duration) for your specific use case."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Server configurations contain domain names, internal IP addresses, and architecture details. This tool keeps all of that private.

- **100% client-side:** No server processing. Your config never leaves your browser.
- **No storage:** Nothing saved or cached. Close the tab to clear.
- **No analytics on content:** We track page views but never log domains, IPs, or paths you enter.
- **Best-practice defaults:** Modern TLS 1.2+1.3, secure ciphers, HSTS, security headers included by default.

Safe for generating configs with internal IPs, production domains, and infrastructure details.`
  },

  stats: {
    "Server Types": "4",
    "Security Headers": "6",
    "Feature Toggles": "6",
    "Processing": "Client-side"
  }
};
