---
name: nginx-config
description: Generate an Nginx server block configuration. Use when the user asks to create an Nginx config, set up a reverse proxy with Nginx, configure SSL/TLS for a domain, serve a static site or SPA with Nginx, or generate an Nginx site configuration.
---

# Nginx Config Generator

Generate a production-ready Nginx `server` block for a reverse proxy, static site, SPA, or redirect configuration.

## Input
- `type` — server type: `reverse-proxy` | `static` | `spa` | `redirect` (default: reverse-proxy)
- `domain` — server domain name (default: example.com)
- `ssl` — SSL mode: `none` | `letsencrypt` | `custom` (default: letsencrypt)
- `proxy_pass` — backend URL for reverse-proxy (default: http://127.0.0.1:3000)
- `root_path` — document root for static/SPA (default: /var/www/html)
- `listen_port` — port when SSL is none (default: 80)
- `ssl_cert` — certificate path for custom SSL
- `ssl_key` — key path for custom SSL
- `features` — comma-separated list of optional features:
  - `gzip` — enable gzip compression (default: on)
  - `caching` — cache static assets (default: on, duration 30d)
  - `security_headers` — add security headers (default: on)
  - `rate_limit` — add rate limiting (default: off, rate: 10r/s)
  - `websocket` — WebSocket support for reverse-proxy (default: off)
  - `cors` — CORS headers (default: off, origin: *)
- `redirect_target` — full redirect URL for redirect type

## Output
A complete Nginx configuration as a text/nginx code block, ready to save to `/etc/nginx/sites-available/{domain}`.

## Instructions
1. For `letsencrypt` or `custom` SSL (and type != redirect): prepend an HTTP→HTTPS redirect server block that listens on port 80, with certbot acme-challenge location if Let's Encrypt.
2. For redirect type: emit a single server block with `return 301 {redirect_target}`.
3. For the main server block:
   - SSL: listen 443 ssl http2 / listen [::]:443 ssl http2
   - No SSL: listen {port} / listen [::]:{port}
   - `server_name {domain};`
4. SSL config block (when SSL enabled):
   - cert/key paths (Let's Encrypt: `/etc/letsencrypt/live/{domain}/fullchain.pem` and `privkey.pem`)
   - `ssl_protocols TLSv1.2 TLSv1.3;`
   - strong ciphers, `ssl_prefer_server_ciphers off;`, session cache, timeout
   - OCSP stapling for Let's Encrypt
5. `client_max_body_size 10m;`
6. Security headers (if enabled):
   - `add_header X-Frame-Options "SAMEORIGIN" always;`
   - `add_header X-Content-Type-Options "nosniff" always;`
   - `add_header X-XSS-Protection "1; mode=block" always;`
   - `add_header Referrer-Policy "strict-origin-when-cross-origin" always;`
   - `add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;`
   - HSTS if SSL: `add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;`
7. Gzip (if enabled): on, vary, proxied any, level 6, common types.
8. Rate limit zone at top if enabled: `limit_req_zone $binary_remote_addr zone=ratelimit:10m rate={rate};`; then `limit_req zone=ratelimit burst=20 nodelay;` inside server.
9. CORS (if enabled): Access-Control headers + OPTIONS preflight returning 204.
10. Location blocks:
    - reverse-proxy: `proxy_pass {proxy_pass}; proxy_http_version 1.1; proxy_set_header Host $host; X-Real-IP $remote_addr; X-Forwarded-For; X-Forwarded-Proto;` + WebSocket headers if enabled
    - static: `root {root}; index index.html index.htm; location / { try_files $uri $uri/ =404; }`
    - spa: `root {root}; index index.html; location / { try_files $uri $uri/ /index.html; }`
11. Static asset caching (if enabled): `location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$` with `expires {duration};` and `Cache-Control: public, immutable`.
12. Deny dotfiles: `location ~ /\. { deny all; access_log off; log_not_found off; }`
13. Logging: `access_log /var/log/nginx/{domain}.access.log;` and `error_log /var/log/nginx/{domain}.error.log;`

## Options
All fields have defaults. The most important parameters to ask for are `type`, `domain`, and `ssl`.

## Examples

**Input:** type=reverse-proxy, domain=api.example.com, proxy_pass=http://127.0.0.1:3000, ssl=letsencrypt, features=gzip,security_headers,caching

**Output:** HTTP→HTTPS redirect block + HTTPS server block with proxy_pass, SSL, gzip, security headers, asset caching, and deny dotfiles.

**Input:** type=spa, domain=app.example.com, root_path=/var/www/app/dist, ssl=letsencrypt

**Output:** HTTP→HTTPS redirect block + HTTPS server block with `try_files $uri $uri/ /index.html`.

**Input:** type=redirect, domain=example.com, redirect_target=https://www.example.com$request_uri

**Output:** Single server block on port 80 with `return 301 https://www.example.com$request_uri;`.

## Error Handling
- If `type` is not one of the four valid values, list them and ask for clarification.
- If `ssl=custom` but cert/key paths are not provided, use placeholder paths and note they must be replaced.
- If `type=reverse-proxy` and `proxy_pass` is not provided, use the default `http://127.0.0.1:3000` and note it.
- If `type=redirect` and no `redirect_target` is provided, ask for the destination URL.
