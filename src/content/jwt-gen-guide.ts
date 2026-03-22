/**
 * JWT Generator Tool Guide Content
 * Comprehensive developer guide for JWT token generation
 */

import type { ToolGuideContent } from "./types";

export const jwtGenGuideContent: ToolGuideContent = {
  toolName: "JWT Generator",
  toolPath: "/jwt-gen",
  lastUpdated: "2026-02-05",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Select Algorithm",
      description: "Choose your signing algorithm: HS256 (most common), HS384, or HS512."
    },
    {
      title: "Set Secret Key",
      description: "Enter a secure secret key for signing your JWT."
    },
    {
      title: "Configure Header",
      description: "Edit the JWT header JSON to specify the algorithm and token type."
    },
    {
      title: "Add Claims",
      description: "Define your JWT payload with claims like sub, exp, and iat."
    }
  ],

  introduction: {
    title: "What is JWT Token Generation?",
    content: `JWT (JSON Web Token) generation creates cryptographically signed tokens for secure information transmission. JWTs are used for authentication and authorization in modern applications.`
  },

  useCases: [
    {
      title: "API Authentication",
      description: "Generate test JWTs for API development and testing.",
      example: "curl -H 'Authorization: Bearer TOKEN' https://api.example.com"
    },
    {
      title: "Microservices Communication",
      description: "Create service-to-service authentication tokens.",
      example: "const token = generateJWT({ sub: 'service-a', aud: 'service-b' });"
    },
    {
      title: "Webhook Security",
      description: "Generate signed webhooks that receivers can verify.",
      example: '{ "event": "payment.received", "signature": "eyJhbGc..." }'
    },
    {
      title: "Development Testing",
      description: "Create various JWT scenarios for testing.",
      example: '{ "sub": "test-user", "exp": 1609459200 }'
    }
  ],

  howToUse: {
    title: "How to Use the JWT Generator",
    content: `Select your algorithm, enter a secret key, configure the header and payload, then generate your token.`,
    steps: [
      { name: "Choose Algorithm", text: "Select HS256, HS384, or HS512" },
      { name: "Set Secret", text: "Enter a secure secret key" },
      { name: "Configure Header", text: "Edit the JWT header JSON" },
      { name: "Add Claims", text: "Define payload claims" },
      { name: "Generate Token", text: "Create and copy the JWT" }
    ]
  },

  faqs: [
    {
      question: "Is this JWT generator secure?",
      answer: "Yes, all processing happens in your browser using the Web Crypto API. Your secrets never leave your device."
    },
    {
      question: "What algorithms are supported?",
      answer: "We support HMAC-SHA algorithms: HS256, HS384, and HS512."
    },
    {
      question: "Can I decode the generated JWT?",
      answer: "Yes! Use our JWT Decoder tool to verify the token contents."
    },
    {
      question: "What are common JWT claims?",
      answer: "Common claims include: sub (subject), iss (issuer), aud (audience), exp (expiration), iat (issued at)."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All JWT generation happens in your browser. Your secret keys and tokens are never sent to our servers.`
  },

  stats: {
    "Algorithms Supported": "3",
    "Processing": "Client-side only",
    "Standard Compliance": "RFC 7519"
  }
};
