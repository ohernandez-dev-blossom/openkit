---
name: webhook-test
description: Generate sample webhook payloads for GitHub, Stripe, Slack, Discord, or a custom format. Use when the user asks for a webhook payload example, wants to test a webhook handler, or needs a realistic webhook body for GitHub push, Stripe payment, Slack message, or Discord interaction events. This skill generates payload JSON only — it does NOT send HTTP requests.
---

# Webhook Payload Generator

Return a realistic sample webhook payload (headers + body) for a specified provider and event type. This skill generates the JSON payload for inspection and handler testing — it does not send any HTTP requests.

## Input
- `provider` — one of: `github` | `stripe` | `slack` | `discord` | `generic`
- Optional: specific event type (e.g. `push` for GitHub, `payment_intent.succeeded` for Stripe)

## Output
1. **Headers** — the HTTP headers the provider sends with the webhook
2. **Payload body** — the JSON body as a formatted code block
3. **Signature info** — which header carries the signature and how to verify it
4. **cURL command** — a ready-to-use curl command to replay the payload to a local endpoint

## Instructions
1. Select the provider payload from the reference data below.
2. Present headers as a key-value list.
3. Present the payload as a formatted JSON block.
4. Explain the signature header and verification method.
5. Generate a curl command: `curl -X POST \\\n  {header flags} \\\n  -d '{minified_body}' \\\n  https://your-endpoint.com/webhook`

### Provider reference payloads

**github** (event: push)

Headers:
```
Content-Type: application/json
X-GitHub-Event: push
X-GitHub-Delivery: 72d3162e-cc78-11e3-81ab-4c9367dc0958
X-Hub-Signature-256: sha256=d57c68ca6f92289e6987922ff26938930f6e66a2d161ef06abdf1859230aa23c
User-Agent: GitHub-Hookshot/044aadd
```

Payload:
```json
{
  "ref": "refs/heads/main",
  "before": "6113728f27ae82c7b1a177c8d03f9e96e0adf246",
  "after": "0d1a26e67d8f5eaf1f6ba5c57fc3c7d91ac0fd1c",
  "repository": {
    "id": 35129377,
    "name": "my-repo",
    "full_name": "octocat/my-repo",
    "private": false,
    "html_url": "https://github.com/octocat/my-repo"
  },
  "pusher": {"name": "octocat", "email": "octocat@github.com"},
  "sender": {"login": "octocat", "id": 1, "avatar_url": "https://github.com/images/error/octocat.png"},
  "commits": [
    {
      "id": "0d1a26e67d8f5eaf1f6ba5c57fc3c7d91ac0fd1c",
      "message": "Update README.md",
      "timestamp": "2026-02-07T08:00:00+00:00",
      "author": {"name": "The Octocat", "email": "octocat@github.com"},
      "added": [], "removed": [], "modified": ["README.md"]
    }
  ]
}
```

Signature: `X-Hub-Signature-256` — HMAC SHA-256 of the payload body using your webhook secret.

---

**stripe** (event: payment_intent.succeeded)

Headers:
```
Content-Type: application/json
Stripe-Signature: t=1614556828,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd
User-Agent: Stripe/1.0
```

Payload:
```json
{
  "id": "evt_1NG8du2eZvKYlo2CuITNJXbZ",
  "object": "event",
  "api_version": "2023-10-16",
  "created": 1686089428,
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_3NG8du2eZvKYlo2C1GpWQ1u6",
      "object": "payment_intent",
      "amount": 2000,
      "currency": "usd",
      "status": "succeeded",
      "customer": "cus_NffrFeUfNV2Hib",
      "payment_method": "pm_1NG8du2eZvKYlo2CjLY5a9nP"
    }
  }
}
```

Signature: `Stripe-Signature` — timestamp + HMAC SHA-256 using your endpoint secret. Verify with `stripe.webhooks.constructEvent()`.

---

**slack** (event: message)

Headers:
```
Content-Type: application/json
X-Slack-Signature: v0=a2114d57b48eac39b9ad189dd8316235a7b4a8d21a10bd27519666489c69b503
X-Slack-Request-Timestamp: 1531420618
```

Payload:
```json
{
  "token": "Jhj5dZrVaK7ZwHHjRyZWjbDl",
  "team_id": "T061EG9R6",
  "event": {
    "type": "message",
    "channel": "C024BE91L",
    "user": "U2147483697",
    "text": "Hello world",
    "ts": "1355517523.000005"
  },
  "type": "event_callback",
  "event_id": "Ev024BE91F",
  "event_time": 1355517523
}
```

Signature: `X-Slack-Signature` — `v0=` + HMAC SHA-256 of `v0:{timestamp}:{body}` using your signing secret.

---

**discord** (event: application command interaction)

Headers:
```
Content-Type: application/json
X-Signature-Ed25519: a1b2c3d4e5f6...
X-Signature-Timestamp: 1614556828
```

Payload:
```json
{
  "id": "901234567890123456",
  "type": 1,
  "data": {
    "id": "123456789012345678",
    "name": "test",
    "type": 1,
    "options": [{"name": "message", "type": 3, "value": "Hello!"}]
  },
  "guild_id": "987654321098765432",
  "channel_id": "123456789012345678",
  "member": {
    "user": {"id": "123456789012345678", "username": "testuser", "discriminator": "0001"},
    "roles": [],
    "joined_at": "2021-01-01T00:00:00.000000+00:00"
  }
}
```

Signature: `X-Signature-Ed25519` — Ed25519 signature of `{timestamp}{body}` using your application public key.

---

**generic** (custom event)

Headers:
```
Content-Type: application/json
X-Webhook-ID: wh_abc12345
X-Webhook-Timestamp: 2026-02-07T08:00:00Z
```

Payload:
```json
{
  "event": "custom.event",
  "timestamp": "2026-02-07T08:00:00Z",
  "data": {
    "id": "abc123",
    "action": "created",
    "resource": {"type": "item", "name": "Example Item", "value": 42}
  }
}
```

No standard signature scheme — implement your own HMAC verification.

## Options
- `provider` — github | stripe | slack | discord | generic (default: github)
- `endpoint` — local URL to use in the curl command (default: https://your-endpoint.com/webhook)

## Examples

**Input:** "show me a GitHub webhook payload"
**Output:** GitHub push event headers + payload + signature explanation + curl command.

**Input:** "Stripe payment webhook example"
**Output:** Stripe payment_intent.succeeded headers + payload + Stripe-Signature explanation + curl command.

## Error Handling
- If the provider is not one of the five supported options, list them and ask for clarification.
- Remind the user that this skill generates static sample payloads — actual webhook signatures use real secrets and are not reproducible without them.
- If the user asks to send the webhook, clarify that this skill only generates payloads; use the curl command to send it yourself.
