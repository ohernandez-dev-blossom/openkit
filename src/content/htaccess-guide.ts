/**
 * .htaccess Generator Tool Guide Content
 * Comprehensive developer guide for Apache server configuration
 */

import type { ToolGuideContent } from "./types";

export const htaccessGuideContent: ToolGuideContent = {
  toolName: ".htaccess Generator",
  toolPath: "/htaccess",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Select Configuration Rules",
      description: "Choose from common .htaccess rules: HTTPS redirect, www canonicalization, URL rewrites, caching headers, security headers, and access control. Each option includes production-tested Apache directives."
    },
    {
      title: "Customize Domain Settings",
      description: "Enter your domain name for redirect rules. Specify paths or file types for custom caching, compression, or access control. Configure security headers (CSP, X-Frame-Options) for your site."
    },
    {
      title: "Generate .htaccess File",
      description: "Click Generate to create a complete .htaccess file with all selected rules organized by function. Includes comments explaining each directive and compatibility notes for different Apache versions."
    },
    {
      title: "Upload to Server",
      description: "Copy generated .htaccess content and save as .htaccess file in your website root directory. Upload via FTP, SFTP, or cPanel File Manager. Test immediately - syntax errors break the entire site."
    }
  ],

  introduction: {
    title: "What is .htaccess?",
    content: `.htaccess (hypertext access) is a configuration file for Apache web servers that controls website behavior at the directory level without modifying main server configuration. It enables URL rewrites, HTTPS redirection, caching policies, security headers, access control, and custom error pages through simple directives. Understanding .htaccess is essential for SEO (canonicalization, redirects), performance (compression, caching), and security (headers, access restrictions) on Apache-powered hosting.

Apache reads .htaccess files in every directory when processing requests, applying rules recursively from root to the requested file's directory. This distributed configuration approach allows shared hosting customers to customize server behavior without root access to httpd.conf. However, .htaccess processing has performance overhead - each request checks every directory in the path for .htaccess files. High-traffic sites on dedicated servers should move rules to httpd.conf and disable .htaccess with AllowOverride None for better performance.

### Why .htaccess Matters

**SEO and canonicalization:** Search engines penalize duplicate content - www.example.com and example.com are treated as separate sites, diluting PageRank. .htaccess redirects enforce canonical URLs (301 redirect non-www to www or vice versa), combine HTTP and HTTPS versions, and redirect old URLs to new ones during site restructure. Without proper redirects, SEO suffers from split ranking signals.

**HTTPS enforcement:** Modern websites require HTTPS for security, user trust, and SEO rankings. .htaccess redirects all HTTP requests to HTTPS automatically, preventing mixed content warnings and man-in-the-middle attacks. The Secure flag on cookies only works with HTTPS - without HTTPS redirect, authentication cookies leak over HTTP.

**Performance optimization:** .htaccess configures browser caching (Cache-Control headers), GZIP compression, and ETags to reduce bandwidth and speed up page loads. Proper caching headers tell browsers to cache CSS/JS/images for days or months, reducing repeat visitor load times by 80%+. GZIP compression reduces HTML/CSS/JS transfer size by 70%.

**Security hardening:** .htaccess sets security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, CSP) that defend against clickjacking, MIME sniffing, and XSS attacks. It blocks access to sensitive files (.env, .git/, database backups), restricts directory browsing, and implements IP-based access control for admin areas.

**URL rewriting:** Pretty URLs (example.com/products/123 instead of example.com/product.php?id=123) improve SEO, user experience, and maintainability. .htaccess rewrites clean URLs to dynamic scripts transparently. Essential for modern web applications, RESTful APIs, and CMS platforms like WordPress.

### Common .htaccess Rules

**HTTPS redirect:** Redirect all HTTP traffic to HTTPS to ensure encrypted connections. Required for modern websites with SSL certificates. Improves SEO (Google ranking boost) and user trust (padlock icon in browser).

\`\`\`apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
\`\`\`

**WWW canonicalization:** Redirect non-www to www (or vice versa) to consolidate duplicate content. Search engines treat www.example.com and example.com as different sites - choose one and redirect the other.

\`\`\`apache
RewriteEngine On
RewriteCond %{HTTP_HOST} !^www\\.
RewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
\`\`\`

**Browser caching:** Set Cache-Control and Expires headers for static assets (CSS, JS, images). Browsers cache files for specified duration, reducing server load and speeding up repeat visits. Cache static files for 1 year, HTML for 1 hour.

\`\`\`apache
<IfModule mod_expires.c>
ExpiresActive On
ExpiresByType image/jpg "access plus 1 year"
ExpiresByType text/css "access plus 1 month"
ExpiresByType application/javascript "access plus 1 month"
</IfModule>
\`\`\`

**GZIP compression:** Compress HTML, CSS, and JavaScript before sending to browsers. Reduces transfer size by 70%, speeding up page loads especially on slow connections. Essential for performance.

\`\`\`apache
<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
\`\`\`

**Security headers:** Set HTTP security headers to defend against common web attacks. X-Frame-Options prevents clickjacking, X-Content-Type-Options prevents MIME sniffing attacks, CSP restricts resource loading to prevent XSS.

\`\`\`apache
<IfModule mod_headers.c>
Header set X-Frame-Options "SAMEORIGIN"
Header set X-Content-Type-Options "nosniff"
Header set X-XSS-Protection "1; mode=block"
</IfModule>
\`\`\`

**Block file access:** Prevent access to sensitive files (.env, .git/, database backups) that accidentally end up in web root. One misconfigured server exposing .env file leaks all API keys and passwords.

\`\`\`apache
<FilesMatch "^\\.(env|git|htaccess)">
Order allow,deny
Deny from all
</FilesMatch>
\`\`\`

**Custom error pages:** Display branded 404, 500 error pages instead of default server errors. Improves user experience and provides navigation options when pages don't exist.

\`\`\`apache
ErrorDocument 404 /404.html
ErrorDocument 500 /500.html
\`\`\`

### .htaccess Syntax and Directives

Apache .htaccess uses directive-based syntax. **RewriteEngine On** enables URL rewriting module (mod_rewrite). **RewriteCond** sets conditions that must be met for following RewriteRule. **RewriteRule pattern substitution flags** matches URL patterns and rewrites them. **Header set** adds or modifies HTTP response headers. **FilesMatch** and **DirectoryMatch** match file or directory names with regex. **Order allow,deny** and **Deny/Allow from** control access based on IP addresses.

Flags modify directive behavior: **[L]** (last) stops processing further rules if matched, **[R=301]** returns 301 redirect (permanent), **[R=302]** returns 302 redirect (temporary), **[NC]** (no case) makes pattern case-insensitive, **[QSA]** (query string append) preserves query parameters.

### .htaccess Debugging

Syntax errors in .htaccess break the entire website with 500 Internal Server Error. Test rules carefully. Check Apache error logs (/var/log/apache2/error.log) for specific syntax errors. Use Apache config test: apachectl configtest (requires server access). Test rules incrementally - add one rule at a time, test, then add next.

Common mistakes: missing RewriteEngine On before RewriteRule, incorrect regex patterns, missing IfModule checks (directives fail if module disabled), conflicting rules, wrong flag syntax. Always keep a backup of working .htaccess before making changes.`
  },

  useCases: [
    {
      title: "Force HTTPS and WWW Canonicalization",
      description: "Redirect all HTTP traffic to HTTPS and enforce www (or non-www) canonical URL. Essential for SEO and security - consolidates ranking signals and encrypts all connections.",
      example: `# .htaccess for HTTPS + WWW canonicalization

RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Force WWW
RewriteCond %{HTTP_HOST} !^www\\.
RewriteRule ^(.*)$ https://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Result:
# http://example.com → https://www.example.com (301)
# http://www.example.com → https://www.example.com (301)
# https://example.com → https://www.example.com (301)
# https://www.example.com → no redirect (canonical)

# Why this matters for SEO:
# ✓ Consolidates 4 URL variants into 1 canonical
# ✓ All backlinks redirect to HTTPS www version
# ✓ Search engines see single authoritative URL
# ✓ PageRank not split across HTTP/HTTPS/www/non-www

# Test:
curl -I http://example.com
# HTTP/1.1 301 Moved Permanently
# Location: https://www.example.com/

# Security benefit:
# ✓ All traffic encrypted (no HTTP)
# ✓ Cookies with Secure flag work correctly
# ✓ Prevents MITM attacks on HTTP`
    },
    {
      title: "Browser Caching and Compression",
      description: "Configure aggressive caching for static assets and GZIP compression to reduce bandwidth and speed up page loads. Improves Core Web Vitals and reduces server load.",
      example: `# .htaccess for performance optimization

# GZIP Compression (reduce file sizes by 70%)
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml
  AddOutputFilterByType DEFLATE text/css text/javascript
  AddOutputFilterByType DEFLATE application/javascript application/json
  AddOutputFilterByType DEFLATE application/xml application/rss+xml
</IfModule>

# Browser Caching (reduce repeat visitor load times)
<IfModule mod_expires.c>
  ExpiresActive On

  # Images (1 year)
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"

  # CSS and JavaScript (1 month)
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"

  # Fonts (1 year)
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType application/font-woff2 "access plus 1 year"

  # HTML (1 hour)
  ExpiresByType text/html "access plus 1 hour"

  # Default (1 week)
  ExpiresDefault "access plus 1 week"
</IfModule>

# Cache-Control headers
<IfModule mod_headers.c>
  <FilesMatch "\\.(jpg|jpeg|png|gif|webp|svg|css|js|woff2)$">
    Header set Cache-Control "max-age=31536000, public"
  </FilesMatch>

  <FilesMatch "\\.html$">
    Header set Cache-Control "max-age=3600, public, must-revalidate"
  </FilesMatch>
</IfModule>

# Performance impact:
# Before: 2.5MB page load, 3.2s load time
# After: 800KB page load (68% smaller), 1.1s load time (66% faster)

# Cache strategy:
# - Images/CSS/JS cached 1 year (versioned filenames: style.v123.css)
# - HTML cached 1 hour (content updates frequently)
# - Repeat visitors load from cache (zero server requests)

# Test compression:
curl -H "Accept-Encoding: gzip" -I https://example.com/style.css
# Content-Encoding: gzip
# Content-Length: 15000 (vs 50000 uncompressed)

# Test caching:
curl -I https://example.com/logo.png
# Cache-Control: max-age=31536000, public
# Expires: Mon, 02 Feb 2027 12:00:00 GMT`
    },
    {
      title: "Security Headers and File Protection",
      description: "Implement security headers to defend against clickjacking, XSS, and MIME sniffing. Block access to sensitive files like .env, .git, and database backups.",
      example: `# .htaccess for security hardening

# Security Headers
<IfModule mod_headers.c>
  # Prevent clickjacking (don't allow site in iframes)
  Header set X-Frame-Options "SAMEORIGIN"

  # Prevent MIME sniffing (don't guess content types)
  Header set X-Content-Type-Options "nosniff"

  # Enable XSS filter in browsers
  Header set X-XSS-Protection "1; mode=block"

  # Referrer policy (control referer header)
  Header set Referrer-Policy "strict-origin-when-cross-origin"

  # Content Security Policy (restrict resource loading)
  Header set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
</IfModule>

# Block access to sensitive files
<FilesMatch "^\\.(env|git|htaccess|htpasswd)">
  Order allow,deny
  Deny from all
</FilesMatch>

# Block directory listing
Options -Indexes

# Block access to specific file types
<FilesMatch "\\.(sql|log|bak|backup|conf|ini)$">
  Order allow,deny
  Deny from all
</FilesMatch>

# Block access to .git directory
<DirectoryMatch "^\\.git">
  Order allow,deny
  Deny from all
</DirectoryMatch>

# Disable server signature (hide Apache version)
ServerSignature Off

# Disable trace method (prevents XST attacks)
TraceEnable off

# Impact:
# ✓ Blocks clickjacking attempts (X-Frame-Options)
# ✓ Prevents XSS in legacy browsers (X-XSS-Protection)
# ✓ Stops MIME sniffing attacks (X-Content-Type-Options)
# ✓ .env file cannot be downloaded (credential protection)
# ✓ .git directory not browsable (source code protection)
# ✓ Database backups not accessible (data leak prevention)

# Common attacks prevented:
# 1. Attacker tries: https://example.com/.env
#    → 403 Forbidden (file blocked)
# 2. Attacker tries: https://example.com/.git/config
#    → 403 Forbidden (directory blocked)
# 3. Attacker embeds site in iframe for phishing
#    → X-Frame-Options blocks rendering
# 4. Attacker uploads file, tricks browser into executing
#    → X-Content-Type-Options prevents MIME confusion

# Test headers:
curl -I https://example.com
# X-Frame-Options: SAMEORIGIN
# X-Content-Type-Options: nosniff
# X-XSS-Protection: 1; mode=block`
    },
    {
      title: "Pretty URLs and Routing",
      description: "Rewrite clean URLs to dynamic PHP scripts. Transform /products/123 to /product.php?id=123 transparently for SEO-friendly URLs and better user experience.",
      example: `# .htaccess for URL rewriting (WordPress/CMS style)

RewriteEngine On
RewriteBase /

# Redirect trailing slashes (optional but cleaner)
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)/$ /$1 [R=301,L]

# Products: /products/123 → /product.php?id=123
RewriteRule ^products/([0-9]+)$ /product.php?id=$1 [L,QSA]

# Categories: /category/electronics → /category.php?slug=electronics
RewriteRule ^category/([a-z0-9-]+)$ /category.php?slug=$1 [L,QSA]

# User profiles: /users/john-doe → /profile.php?username=john-doe
RewriteRule ^users/([a-z0-9-]+)$ /profile.php?username=$1 [L,QSA]

# Blog posts: /blog/2024/my-post-slug → /post.php?slug=my-post-slug
RewriteRule ^blog/[0-9]{4}/([a-z0-9-]+)$ /post.php?slug=$1 [L,QSA]

# API routing: /api/users/123 → /api.php?resource=users&id=123
RewriteRule ^api/([a-z]+)/([0-9]+)$ /api.php?resource=$1&id=$2 [L,QSA]

# Fallback: if not a file or directory, route to index.php
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /index.php?url=$1 [L,QSA]

# URL transformation examples:
# https://example.com/products/123
#   ↓ rewrites to ↓
# https://example.com/product.php?id=123
#   (URL in browser stays pretty)

# Benefits:
# ✓ SEO: Clean URLs rank better than query strings
# ✓ UX: Users see /products/laptop vs /product.php?id=5&cat=tech
# ✓ Maintainability: URL structure independent of file structure
# ✓ Security: Hides .php extension and internal structure

# Flags explained:
# [L] - Last rule, stop processing if matched
# [QSA] - Query String Append, preserve existing query params
# [R=301] - 301 redirect (visible URL changes)
# [NC] - No Case, case-insensitive matching

# Test:
# Visit: https://example.com/products/123
# Browser shows: https://example.com/products/123
# Server executes: product.php with $_GET['id'] = 123

# WordPress-style routing:
# Any URL not matching a file → index.php handles routing
# Enables front controller pattern for MVC frameworks`
    }
  ],

  howToUse: {
    title: "How to Use This .htaccess Generator",
    content: `This .htaccess generator creates production-ready Apache configuration files with common rules for HTTPS, caching, security, and URL rewriting. Select desired features, customize settings, and download a complete .htaccess file ready for deployment.

### Selecting Rules

Choose from categories: Redirects (HTTPS, www canonicalization), Performance (caching, compression), Security (headers, file blocking), Rewrites (pretty URLs), and Access Control (IP whitelist/blacklist). Each option includes tested Apache directives that work across shared hosting environments.

The generator includes IfModule checks to ensure rules only apply when required Apache modules are enabled. This prevents 500 errors on servers with different module configurations. Common modules checked: mod_rewrite (URL rewriting), mod_expires (caching), mod_deflate (compression), mod_headers (HTTP headers).

### Customizing Settings

Enter your domain name for HTTPS and www redirects (example.com). Specify cache durations for different file types (images 1 year, HTML 1 hour). Configure security headers with your Content Security Policy directives. Add IP addresses for access control whitelist/blacklist.

The generator provides sensible defaults based on best practices but allows customization for specific requirements. Cache durations balance performance (longer = better caching) with freshness (shorter = more up-to-date content).

### Understanding Generated Code

The .htaccess file is organized into commented sections (HTTPS Redirect, Caching, Security) for readability. Each directive includes inline comments explaining purpose and effect. Module availability checks (IfModule) ensure compatibility across different Apache configurations.

Critical rules like HTTPS redirect are placed first to ensure security before processing other rules. Order matters in .htaccess - rules are processed sequentially, and [L] flag stops further processing.

### Installing .htaccess

Save generated content as .htaccess (with leading dot, no extension) in your website root directory (where index.html or index.php resides). Upload via FTP, SFTP, cPanel File Manager, or command line. Set permissions to 644 (rw-r--r--) - readable by Apache but not writable by others.

**Critical:** Test immediately after upload. Syntax errors break the entire site with 500 Internal Server Error. Check that site still loads before closing upload tool. If site breaks, delete or rename .htaccess to restore functionality, then debug errors.

### Testing .htaccess Rules

Test HTTPS redirect: visit http://example.com, verify redirect to https://. Test caching: curl -I to check Cache-Control headers. Test compression: curl -H "Accept-Encoding: gzip" to verify Content-Encoding: gzip. Test security headers: curl -I to see X-Frame-Options, CSP headers. Test file blocking: try accessing //.env, verify 403 Forbidden.

Use browser DevTools Network tab to inspect response headers and verify caching/compression/security headers are present. Test from different browsers and devices for compatibility. Monitor Apache error logs for .htaccess errors: /var/log/apache2/error.log (requires server access).

### Common Issues

**500 Internal Server Error:** Syntax error in .htaccess or required Apache module disabled. Check error logs for specific line. Comment out rules incrementally to identify problematic directive. Verify modules enabled: mod_rewrite, mod_headers, mod_expires.

**Redirects not working:** RewriteEngine On missing or AllowOverride not set in httpd.conf (requires server admin to fix). Test with simple redirect first before complex patterns.

**Caching not applied:** mod_expires or mod_headers disabled. Use IfModule checks and fallback to alternative caching methods.

**Performance issues:** Too many .htaccess files in directory tree. Apache checks every directory for .htaccess on each request. For high-traffic sites, move rules to httpd.conf and disable .htaccess with AllowOverride None.`,
    steps: [
      {
        name: "Select Configuration Rules",
        text: "Choose HTTPS redirect, caching, compression, security headers, URL rewrites, and access control based on your site's needs.",
      },
      {
        name: "Customize Settings",
        text: "Enter your domain for redirects, set cache durations, configure security headers (CSP, X-Frame-Options), and add IP access control.",
      },
      {
        name: "Generate and Download",
        text: "Click Generate to create complete .htaccess file with selected rules, module checks, and comments. Copy or download the output.",
      },
      {
        name: "Upload and Test",
        text: "Save as .htaccess in site root, upload to server, set permissions to 644. Test immediately - syntax errors break the site.",
      }
    ]
  },

  faqs: [
    {
      question: "Why do I get 500 Internal Server Error after uploading .htaccess?",
      answer: "Syntax error in .htaccess or required Apache module is disabled on your server. Check Apache error logs for the specific error. Common causes: missing RewriteEngine On, incorrect regex syntax, module directives when module is disabled (mod_rewrite, mod_headers). Comment out rules one by one to identify the problematic directive. Contact hosting support if modules need to be enabled."
    },
    {
      question: "How do I know which Apache modules are enabled?",
      answer: "Create info.php with <?php phpinfo(); ?> and search for 'Loaded Modules'. Or SSH into server and run 'apachectl -M' or 'apache2 -M'. Common modules needed: mod_rewrite (URL rewriting), mod_headers (HTTP headers), mod_expires (caching), mod_deflate (compression). On shared hosting, contact support to enable modules."
    },
    {
      question: "Should I use .htaccess or httpd.conf?",
      answer: "Use httpd.conf if you have server access - it's faster because Apache reads it once at startup vs .htaccess on every request. .htaccess is for shared hosting where you don't have httpd.conf access. High-traffic dedicated servers should move rules to httpd.conf and disable .htaccess with AllowOverride None for performance."
    },
    {
      question: "Do .htaccess rules apply to subdirectories?",
      answer: "Yes, .htaccess rules apply to the directory it's in and all subdirectories. Subdirectories can have their own .htaccess files that override or extend parent rules. Apache processes .htaccess from root to requested file's directory. Place shared rules in root .htaccess, directory-specific rules in subdirectory .htaccess."
    },
    {
      question: "Can .htaccess slow down my website?",
      answer: "Yes, Apache checks every directory for .htaccess on each request, adding processing overhead. For high-traffic sites (10,000+ requests/day), move rules to httpd.conf and set AllowOverride None to disable .htaccess. For typical sites, .htaccess performance impact is negligible compared to benefits (caching, compression)."
    },
    {
      question: "Why doesn't my HTTPS redirect work?",
      answer: "Most common: RewriteEngine On is missing. Or AllowOverride is not set to All in httpd.conf (requires server admin). Or mod_rewrite is disabled. Or SSL certificate not installed (redirect fails without HTTPS). Test with simple redirect first. If nothing works, contact hosting support - server configuration may prevent .htaccess rewrites."
    },
    {
      question: "What's the difference between 301 and 302 redirects?",
      answer: "301 Moved Permanently tells browsers and search engines the redirect is permanent - they cache it and transfer SEO value to new URL. 302 Found (temporary) doesn't transfer SEO value and isn't cached. Use 301 for permanent changes (HTTPS redirect, domain migration, URL structure changes). Use 302 only for temporary redirects (A/B testing, maintenance pages)."
    },
    {
      question: "Can I combine multiple .htaccess rules?",
      answer: "Yes, combine rules in a single .htaccess file with sections for different functions (HTTPS, Caching, Security). Rules are processed sequentially. Order matters for RewriteRules - more specific patterns before general patterns. Use [L] flag to stop processing after a match. Organize with comments for maintainability."
    },
    {
      question: "What does AllowOverride need to be set to?",
      answer: "AllowOverride All in httpd.conf enables .htaccess to use all directives. This is set by server admins in main Apache config. On shared hosting, it's typically already set. On VPS/dedicated servers, you may need to edit httpd.conf or apache2.conf and set AllowOverride All for your directory, then restart Apache."
    },
    {
      question: "Do I need .htaccess if using Nginx?",
      answer: "No, Nginx doesn't support .htaccess. Nginx requires rules in server config files (/etc/nginx/sites-available/). If migrating from Apache to Nginx, convert .htaccess rules to Nginx syntax (very different). Many hosting panels (cPanel) provide automatic conversion. Or manually rewrite: RewriteRule becomes try_files, Header becomes add_header."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This .htaccess generator operates entirely client-side in your browser. No domain names, server configurations, or custom rules are transmitted to servers. All .htaccess generation happens locally using JavaScript template processing.

### Privacy Guarantees

- **100% Client-Side Processing:** All rule selection and .htaccess generation happens in your browser. No server communication with your data.
- **No Server Uploads:** We have no backend servers to process configurations. The tool works completely offline after page load.
- **No Data Storage:** Your domain names and custom rules are not saved, logged, or transmitted. Refresh the page and settings are cleared.
- **No Analytics Tracking:** We don't track what rules you generate, what domains you configure, or any usage patterns.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect browser DevTools Network tab during generation - zero uploads.

Safe for generating .htaccess for production domains, confidential projects, client sites, or any server configuration that must remain private. Use with confidence for enterprise websites, sensitive applications, or pre-launch products.`
  },

  stats: {
    "Rule Categories": "5",
    "Common Directives": "20+",
    "Module Checks": "Yes",
    "Apache Version": "2.4+"
  }
};
