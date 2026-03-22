import type { ToolGuideContent } from "./types";

export const sshKeygenGuideContent: ToolGuideContent = {
  toolName: "SSH Key Generator",
  toolPath: "/ssh-keygen",
  lastUpdated: "2026-02-06",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Select Key Type",
      description: "Choose Ed25519 (recommended) for modern systems, or RSA 2048/4096 for older compatibility."
    },
    {
      title: "Add a Comment",
      description: "Optionally add a comment (like user@hostname) to identify the key."
    },
    {
      title: "Generate Key Pair",
      description: "Click Generate. Your key pair is created instantly in your browser using the Web Crypto API."
    },
    {
      title: "Save Your Keys",
      description: "Download or copy both keys. Add the public key to your server's authorized_keys file."
    }
  ],

  introduction: {
    title: "What Are SSH Keys?",
    content: `SSH keys provide a more secure way to authenticate with remote servers than passwords. They use asymmetric cryptography — a **public key** (shared with servers) and a **private key** (kept secret on your machine).

When you connect to a server, SSH uses your private key to prove your identity without transmitting any passwords. This eliminates brute-force attacks and makes authentication both more secure and more convenient.

**Ed25519** is the modern standard — it produces smaller, faster keys with equivalent or better security than RSA. Use RSA only when connecting to systems that don't support Ed25519.`
  },

  useCases: [
    {
      title: "GitHub/GitLab Access",
      description: "Set up SSH authentication for Git operations instead of HTTPS tokens"
    },
    {
      title: "Server Administration",
      description: "Securely connect to VPS, cloud instances, and remote machines"
    },
    {
      title: "CI/CD Pipelines",
      description: "Generate deploy keys for automated deployment workflows"
    },
    {
      title: "Quick Testing",
      description: "Generate temporary keys for development and testing environments"
    }
  ],

  howToUse: {
    title: "How to Use SSH Keys",
    content: `After generating your key pair:

1. **Save the private key** to \`~/.ssh/id_ed25519\` (or \`id_rsa\`)
2. **Set permissions:** \`chmod 600 ~/.ssh/id_ed25519\`
3. **Copy the public key** to your server's \`~/.ssh/authorized_keys\`
4. **Connect:** \`ssh user@server\` — no password needed

For GitHub: Go to Settings → SSH and GPG keys → New SSH key, paste your public key.`,
    steps: [
      {
        name: "Choose key algorithm",
        text: "Select Ed25519 (recommended) or RSA with your preferred bit length"
      },
      {
        name: "Generate the key pair",
        text: "Click Generate to create your public and private keys in the browser"
      },
      {
        name: "Download private key",
        text: "Save the private key file and set permissions to 600 (owner read/write only)"
      },
      {
        name: "Deploy public key",
        text: "Copy the public key to your server's authorized_keys or Git hosting provider"
      }
    ]
  },

  faqs: [
    {
      question: "Is it safe to generate SSH keys in a browser?",
      answer: "Yes. This tool uses the Web Crypto API built into your browser. Keys are generated entirely on your device — no data is sent to any server. The private key exists only in your browser's memory until you download it."
    },
    {
      question: "Should I use Ed25519 or RSA?",
      answer: "Ed25519 is recommended for most use cases. It's faster, produces shorter keys, and provides equivalent security to RSA 3072-bit keys. Use RSA only if you need to connect to older systems that don't support Ed25519."
    },
    {
      question: "What's the difference between RSA 2048 and 4096?",
      answer: "RSA 4096 provides a higher security margin than 2048, but key operations are slower. For most uses, RSA 2048 is sufficient, but 4096 is recommended if you want extra longevity. Ed25519 is better than both."
    },
    {
      question: "Can I use these keys for GitHub?",
      answer: "Yes. GitHub supports both RSA (2048+ bits) and Ed25519 keys. Go to GitHub → Settings → SSH and GPG keys → New SSH key, then paste your public key."
    },
    {
      question: "Why does my browser show an error for Ed25519?",
      answer: "Ed25519 support in Web Crypto was added recently. You need Chrome 113+, Edge 113+, or Firefox 128+. If your browser doesn't support it, use RSA instead."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `**Your keys never leave your browser.** This tool uses the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) — a cryptographic standard built into modern browsers.

- ✅ No server communication during key generation
- ✅ No keys stored in cookies, localStorage, or any persistence layer
- ✅ Source code is open and auditable
- ✅ Keys are generated using cryptographically secure random number generators

**Best practices:**
- Always protect your private key with file permissions (\`chmod 600\`)
- Use a passphrase for additional protection (encrypt the private key locally after download)
- Rotate keys periodically (every 1-2 years)
- Never share your private key`
  },

  stats: {
    "Key Types": "3",
    "Client-Side": "100%",
    "Server Data": "None"
  },

  features: [
    { title: "Ed25519", description: "Modern elliptic curve keys" },
    { title: "RSA 2048/4096", description: "Traditional RSA for compatibility" },
    { title: "OpenSSH Format", description: "Standard format for authorized_keys" },
    { title: "SHA-256 Fingerprint", description: "Verify key identity" },
    { title: "One-Click Download", description: "Save keys instantly" },
    { title: "Zero Server Contact", description: "100% client-side generation" }
  ]
};
