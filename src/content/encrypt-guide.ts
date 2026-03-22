/**
 * Text Encryption Tool Guide Content
 * Comprehensive developer guide for browser-based encryption
 */

import type { ToolGuideContent } from "./types";

export const encryptGuideContent: ToolGuideContent = {
  toolName: "Text Encryption Tool",
  toolPath: "/encrypt",
  lastUpdated: "2026-02-02",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Text to Encrypt",
      description: "Paste sensitive text like API keys, passwords, notes, or confidential data into the input field. The tool supports any UTF-8 text including special characters, emojis, and multi-line content."
    },
    {
      title: "Set Encryption Password",
      description: "Choose a strong password (12+ characters, mixed case, numbers, symbols) to encrypt your data. The password is never stored or transmitted - only you know it. Stronger passwords = harder to crack."
    },
    {
      title: "Copy Encrypted Output",
      description: "Click Encrypt to generate encrypted ciphertext. The output is Base64-encoded and safe to store in text files, send via email, or paste into chat. Only someone with the password can decrypt it."
    },
    {
      title: "Decrypt When Needed",
      description: "Paste encrypted text back into the tool, enter the same password, and click Decrypt to recover the original plaintext. Wrong password produces gibberish or error."
    }
  ],

  introduction: {
    title: "What is Browser-Based Encryption?",
    content: `Browser-based encryption uses client-side JavaScript to encrypt and decrypt text entirely in your web browser without server transmission. This approach ensures sensitive data never leaves your device in plaintext, making it safe for encrypting passwords, API keys, private notes, or confidential information before storing or sharing them. Unlike server-based encryption where you trust the service provider, client-side encryption keeps you in full control.

Modern web browsers support the Web Crypto API, a built-in cryptographic library providing industry-standard encryption algorithms like AES-GCM (Advanced Encryption Standard with Galois/Counter Mode). AES-256 is the gold standard for symmetric encryption, used by governments, banks, and security organizations worldwide. When you encrypt text with this tool, it generates a random initialization vector (IV), derives an encryption key from your password using PBKDF2 (key stretching), and encrypts the data with AES-GCM. The output includes both the IV and ciphertext, Base64-encoded for text-safe storage and transmission.

### Why Use Client-Side Encryption

**Zero-knowledge architecture:** Your plaintext and password never leave your browser. Even if this website were compromised, attackers cannot access your data because encryption happens locally. The server never sees your content or password. This is fundamentally different from services that encrypt on their servers - you must trust them completely.

**Offline security:** After the page loads, disconnect from the internet and the tool still works. This proves no network requests are made with your data. Inspect browser DevTools Network tab while encrypting - you'll see zero uploads. Perfect for air-gapped encryption of highly sensitive data.

**No account required:** No registration, no login, no email verification. Paste your text, enter a password, and encrypt. No centralized database stores your encrypted data, no accounts can be hacked, no password reset mechanisms to exploit. The encrypted output is yours alone to store however you choose.

### How Encryption Works

When you click Encrypt, the tool uses your password to derive a cryptographic key using PBKDF2 with 100,000 iterations. PBKDF2 is a key derivation function that makes brute-force attacks exponentially harder by forcing attackers to perform thousands of hash operations per password guess. This transforms your human-readable password into a 256-bit encryption key suitable for AES.

AES-GCM encryption then processes your plaintext with the derived key and a randomly generated 12-byte initialization vector (IV). The IV ensures that encrypting the same plaintext twice produces different ciphertexts, preventing pattern analysis. AES-GCM also provides authenticated encryption - the ciphertext includes a message authentication tag that detects tampering. If someone modifies the encrypted data, decryption fails.

The encrypted output is Base64-encoded: a text representation of binary data that's safe to copy-paste, store in JSON, send via email, or include in configuration files. Base64 uses only letters, numbers, +, /, and = characters, avoiding encoding issues in various systems.

### Encryption vs Encoding vs Hashing

**Encryption** (AES) is reversible: encrypted data can be decrypted back to original plaintext with the correct password. Use for data you need to read later (passwords you'll use, API keys for services, confidential notes).

**Encoding** (Base64) is reversible transformation with no security: anyone can decode Base64. It's not encryption. Use encoding only for data format conversion, never for security. This tool encodes encrypted data as Base64 for convenience, but security comes from AES encryption, not Base64.

**Hashing** (SHA-256, bcrypt) is one-way: impossible to reverse back to original. Use for verifying data integrity or storing passwords where you only need to check if a guess matches, never retrieve the original (user password authentication, file checksums).

### Security Considerations

**Password strength is critical:** AES-256 is unbreakable with current technology, but weak passwords are cracked in seconds. Use 12+ character passwords with mixed case, numbers, and symbols. Avoid dictionary words, personal info, or common patterns. Password managers generate strong random passwords.

**Password storage:** This tool does not store your password anywhere. You must remember it or save it securely (password manager, written down in a safe place). If you forget the password, the encrypted data is unrecoverable - there is no password reset or recovery mechanism. This is a feature, not a bug: no backdoors mean no way for attackers to bypass encryption.

**Encrypted data storage:** The encrypted output can be stored anywhere: cloud storage, git repositories, email, chat apps, or text files. Since it's encrypted, even if storage is compromised, attackers only get ciphertext. However, if they also capture your password (keylogger, phishing), they can decrypt it. Keep passwords separate from encrypted data.

### Common Use Cases

Encrypt API keys before committing to version control: encrypt the key, commit the encrypted value, decrypt locally when needed. Prevents accidental API key exposure in public repositories. Encrypt database credentials for storage in configuration management tools. Encrypt sensitive notes or passwords for backup to cloud storage. Encrypt personal information before sending via email or chat where you don't trust end-to-end encryption.`
  },

  useCases: [
    {
      title: "Encrypt API Keys for Version Control",
      description: "Encrypt sensitive API keys, OAuth secrets, or credentials before committing to git repositories. Prevents accidental exposure in public or compromised repositories. Decrypt locally in your development environment.",
      example: `# Scenario: Need to store API key in repository
# Bad: Plaintext in config file
API_KEY=sk_live_abc123xyz789  # Exposed if repo is leaked!

# Good: Encrypt first
1. Paste API key into encryption tool
2. Set password: "MyS3cur3P@ssw0rd!"
3. Get encrypted output:
   encrypted_key=U2FsdGVkX1/abc123...xyz789==

# Commit encrypted value
# .env.encrypted
API_KEY_ENCRYPTED=U2FsdGVkX1/abc123...xyz789==

# Decrypt locally when needed
1. Copy encrypted value from .env.encrypted
2. Paste into decryption tool
3. Enter password
4. Get original: sk_live_abc123xyz789

# Or automate with script
# decrypt.js
const encryptedKey = process.env.API_KEY_ENCRYPTED;
const password = process.env.ENCRYPTION_PASSWORD;
const apiKey = decrypt(encryptedKey, password);
// Use apiKey in application

# Benefits:
# ✓ API key safe even if repo is public
# ✓ Password separate from encrypted data
# ✓ No plaintext credentials in version control
# ✓ Audit trail of when credentials changed`
    },
    {
      title: "Secure Password Backup",
      description: "Encrypt your master password list or password manager backup before storing in cloud storage. Adds extra layer of encryption on top of cloud provider's encryption, protecting against cloud breaches or employee access.",
      example: `# Export passwords from password manager
passwords.txt:
--------------
Gmail: myP@ssw0rd123
AWS: r00t_P@ss_456
GitHub: gh_token_xyz

# Encrypt the entire file content
1. Copy all passwords into encryption tool
2. Set strong password: "BackupMaster2024!@#"
3. Get encrypted output: U2FsdGVkX1/...

# Save to cloud
passwords-encrypted.txt:
U2FsdGVkX1/abc123...xyz789

# Upload to Dropbox/Google Drive/OneDrive
# Even if cloud is breached:
# ✓ Encrypted with YOUR password
# ✓ Cloud provider can't read it
# ✓ Hackers can't read it
# ✓ Only you can decrypt

# To restore:
1. Download passwords-encrypted.txt
2. Paste into decryption tool
3. Enter "BackupMaster2024!@#"
4. Get original passwords back

# Best practices:
# - Use different password than your password manager
# - Store decryption password separately (written down, secure location)
# - Update encrypted backup when passwords change
# - Test decryption periodically to verify password`
    },
    {
      title: "Encrypt Configuration Secrets",
      description: "Encrypt database passwords, SMTP credentials, or webhook secrets in configuration files. Store encrypted values in Ansible playbooks, Terraform configs, or deployment scripts without exposing secrets in plaintext.",
      example: `# Terraform variables with encrypted secrets
# terraform.tfvars
database_password_encrypted = "U2FsdGVkX1/abc123xyz"
smtp_password_encrypted = "U2FsdGVkX1/def456uvw"

# Decrypt in deployment script
# deploy.sh
#!/bin/bash
DECRYPT_PASSWORD="MyTerraform2024!"

# Decrypt secrets
DB_PASS=$(decrypt "$database_password_encrypted" "$DECRYPT_PASSWORD")
SMTP_PASS=$(decrypt "$smtp_password_encrypted" "$DECRYPT_PASSWORD")

# Export for Terraform
export TF_VAR_db_password="$DB_PASS"
export TF_VAR_smtp_password="$SMTP_PASS"

terraform apply

# Or Ansible vault alternative
# vars/secrets.yml
db_password: "U2FsdGVkX1/encrypted_value"

# Decrypt in playbook
- name: Decrypt database password
  set_fact:
    db_password_plain: "{{ db_password | decrypt(vault_password) }}"

# Benefits:
# ✓ Terraform/Ansible configs can be committed to git
# ✓ Secrets encrypted with your password, not service-specific encryption
# ✓ Portable: decrypt with any tool supporting same algorithm
# ✓ No dependency on HashiCorp Vault or cloud secret managers`
    },
    {
      title: "Share Sensitive Info via Unsecured Channels",
      description: "Encrypt passwords, credentials, or confidential information before sending via email, Slack, or SMS where end-to-end encryption isn't guaranteed. Share encrypted text and password separately for security.",
      example: `# Scenario: Send database credentials to team member
# Bad: Send via Slack DM
"Database password is: MyS3cr3tP@ss"
# Problem: Slack employees can read it, logs are persistent, can be forwarded

# Good: Encrypt first
1. Encrypt "MyS3cr3tP@ss" with password "ProjectAlpha2024"
2. Send encrypted text via Slack:
   "Here's the DB password (encrypted): U2FsdGVkX1/abc123xyz"

3. Send decryption password via separate channel (SMS, phone call):
   "Decryption password is: ProjectAlpha2024"

# Recipient:
1. Copy encrypted text from Slack
2. Open encryption tool
3. Paste encrypted text
4. Enter password from SMS
5. Decrypt to get: "MyS3cr3tP@ss"

# Security benefits:
# ✓ Slack compromise doesn't expose password
# ✓ Attacker needs both channels (Slack + SMS)
# ✓ Encrypted text can be stored in logs safely
# ✓ Password separate from ciphertext (defense in depth)

# Alternative: Encrypt entire message
Plaintext:
---------
Server: db.example.com
Port: 5432
Username: admin
Password: MyS3cr3tP@ss
Database: production

Encrypted and sent via email:
U2FsdGVkX1/entire_message_encrypted...

# More secure than sending plaintext in encrypted email
# because email encryption might be compromised`
    }
  ],

  howToUse: {
    title: "How to Use This Encryption Tool",
    content: `This browser-based encryption tool uses AES-256-GCM with PBKDF2 key derivation for secure client-side encryption. All processing happens in your browser using the Web Crypto API - no server uploads, no data transmission, no account required.

### Encrypting Text

Paste or type the text you want to encrypt into the plaintext input field. This can be passwords, API keys, multi-line notes, or any sensitive data. Choose a strong password (12+ characters minimum, mix of upper/lowercase, numbers, and symbols). The password is used to derive the encryption key - stronger passwords are exponentially harder to brute-force.

Click Encrypt. The tool generates a random initialization vector (IV), derives a 256-bit key from your password using PBKDF2 with 100,000 iterations, encrypts your plaintext with AES-GCM, and encodes the result as Base64. Copy the encrypted output - it looks like random characters: \`U2FsdGVkX1/abc123xyz789==\`. This encrypted text is safe to store anywhere.

### Decrypting Text

Paste the encrypted text (Base64-encoded ciphertext) into the input field. Enter the same password you used for encryption. Click Decrypt. If the password is correct, you get the original plaintext. If the password is wrong, decryption fails with an error or produces gibberish.

### Password Management

**Critical:** This tool does not store your password. You must remember it or save it securely. If you forget the password, encrypted data is permanently unrecoverable - there is no password reset mechanism. This is intentional: no backdoors means no way for attackers to bypass encryption.

Write down passwords and store them securely (safe, locked drawer), use a password manager to store encryption passwords, or use a memorable passphrase (4+ random words: "correct-horse-battery-staple" style). Never save the password in the same location as the encrypted data.

### Security Best Practices

Use different passwords for different encrypted data. If one password is compromised, others remain safe. Use 16+ character passwords for highly sensitive data. For shared secrets (team API keys), share the password via a different channel than the encrypted text (if you send encrypted text via Slack, send password via SMS or phone call).

Store encrypted data separately from passwords. Encrypted text can be stored in cloud storage, version control, or email safely. Passwords should be stored separately (password manager, written down, memorized). Attackers need both to decrypt.

### Understanding Encryption Output

The encrypted output includes the initialization vector (IV) and the ciphertext, both Base64-encoded. The IV is not secret - it's safe to store with the ciphertext. The IV ensures encrypting the same plaintext twice produces different ciphertexts, preventing pattern analysis attacks.

The output length is longer than input due to IV overhead, authentication tag, and Base64 encoding overhead (~33% size increase for Base64). Expect encrypted output to be 1.5-2x the size of plaintext.`,
    steps: [
      {
        name: "Enter Plaintext",
        text: "Paste sensitive text, passwords, API keys, or confidential data into the input field. Supports any UTF-8 text including multi-line content.",
      },
      {
        name: "Set Strong Password",
        text: "Choose a strong password (12+ characters, mixed case, numbers, symbols). The password derives the encryption key - stronger = more secure.",
      },
      {
        name: "Encrypt and Copy",
        text: "Click Encrypt to generate Base64-encoded ciphertext. Copy the output - it's safe to store anywhere. Only someone with the password can decrypt.",
      },
      {
        name: "Decrypt When Needed",
        text: "Paste encrypted text, enter the same password, and click Decrypt. Wrong password produces error or gibberish. Correct password recovers plaintext.",
      }
    ]
  },

  faqs: [
    {
      question: "Is this encryption secure for sensitive data?",
      answer: "Yes. This tool uses AES-256-GCM, the same encryption standard used by governments and militaries worldwide, with PBKDF2 key derivation (100,000 iterations) to make password cracking exponentially harder. All encryption happens client-side in your browser - your data never leaves your device. The encryption algorithm is unbreakable with current technology. The only weakness is a weak password - use 12+ characters with mixed case, numbers, and symbols."
    },
    {
      question: "What happens if I forget my encryption password?",
      answer: "The encrypted data is permanently unrecoverable. There is no password reset, recovery mechanism, or backdoor. This is by design: no backdoors means no way for attackers (or anyone else) to bypass encryption. Write down your password and store it securely, use a password manager, or use a memorable passphrase. Test decryption immediately after encrypting to verify you remember the password."
    },
    {
      question: "Can this website or its owner decrypt my data?",
      answer: "No. Encryption happens entirely in your browser using client-side JavaScript. Your plaintext and password never leave your device or get sent to any servers. Even if this website were compromised, attackers cannot access your data because encryption is done locally. Open browser DevTools Network tab while encrypting - you'll see zero uploads. The website serves the code, but cannot see your data."
    },
    {
      question: "How is this different from password-protecting a zip file?",
      answer: "Zip file password protection uses outdated encryption (ZipCrypto) that can be cracked in minutes with free tools. This tool uses AES-256-GCM with PBKDF2, modern encryption standards resistant to all known attacks. Zip file encryption exposes metadata (filenames, sizes), while this tool encrypts everything. Also, this tool works in browsers without requiring compression software. For security, never use zip password protection - use real encryption."
    },
    {
      question: "Can I use this to encrypt files?",
      answer: "This tool encrypts text only. For files (images, documents, videos), copy the file content if it's text-based (source code, config files), or convert to Base64 first, encrypt, then reverse the process. For large files or binary data, use dedicated file encryption tools (GPG, 7-Zip with AES-256, VeraCrypt). This tool is optimized for passwords, API keys, notes, and text snippets."
    },
    {
      question: "What's the maximum text length I can encrypt?",
      answer: "Browser memory is the only practical limit - typically 100MB+ of text. However, for very large data, consider file encryption tools instead. This tool is optimized for passwords, API keys, credentials, and notes (up to a few KB). Encrypting megabytes of text works but is slower and produces large output due to Base64 encoding overhead."
    },
    {
      question: "Can someone crack my encrypted data?",
      answer: "Only if they guess your password. AES-256 itself is unbreakable with current technology - even supercomputers would take billions of years to try all possible keys. However, if you use a weak password (dictionary word, common password, short password), attackers can try millions of password guesses per second. Use 12+ character passwords with mixed case, numbers, and symbols to make cracking infeasible (trillions of years)."
    },
    {
      question: "Should I encrypt the same data twice with different passwords?",
      answer: "It doesn't significantly improve security for AES-256 - the encryption is already unbreakable. The only benefit is if one password is compromised but not the other. Better approach: use one very strong password (16+ characters) instead of layering encryption. Double encryption adds complexity without meaningful security gains for already-strong algorithms. Focus on password strength, not encryption layers."
    },
    {
      question: "Can I share the encrypted text publicly?",
      answer: "Yes, encrypted text is safe to share publicly (post on websites, commit to public git repositories, send via email) as long as the password remains secret. AES-256 ciphertext reveals nothing about the plaintext without the password. However, never share the password with the encrypted text in the same location. Share password separately (different channel, in person, phone call) to maintain security."
    },
    {
      question: "Does encryption protect against quantum computers?",
      answer: "Current quantum computers cannot break AES-256. While quantum computers can break RSA and ECC (asymmetric encryption), symmetric encryption like AES remains secure. AES-256 has 256-bit keys - quantum computers would need 2^128 operations to break it (still infeasible). However, for future-proof security, NIST is developing post-quantum encryption standards. For now, AES-256 is safe against both classical and quantum attacks."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `This encryption tool operates entirely client-side in your browser using the Web Crypto API. Your plaintext data, passwords, and encrypted output never leave your device. All encryption and decryption happen locally using JavaScript without any server communication.

### Privacy Guarantees

- **100% Client-Side Processing:** All encryption uses your browser's built-in Web Crypto API. No data transmission to servers.
- **No Server Uploads:** We have no backend servers to process your data. The tool works completely offline after page load.
- **No Data Storage:** Your plaintext, passwords, and encrypted data are not saved, logged, or transmitted. Refresh the page and everything is cleared.
- **No Analytics Tracking:** We don't track what you encrypt, what passwords you use, or any usage patterns.
- **Transparent & Auditable:** The code is transparent and auditable. Inspect browser DevTools Network tab during encryption - zero uploads.

The encryption algorithm (AES-256-GCM) is the same standard used by governments, militaries, and security agencies worldwide. PBKDF2 key derivation with 100,000 iterations makes password cracking exponentially harder. All cryptographic operations use native browser implementations (Web Crypto API), not custom JavaScript crypto (which is vulnerable to timing attacks).

Safe for encrypting production credentials, API keys, customer data, financial information, health records (HIPAA), payment data (PCI-DSS), or any data requiring confidentiality. Use with confidence for regulated industries, compliance requirements, or personal privacy needs.`
  },

  stats: {
    "Encryption": "AES-256-GCM",
    "Key Derivation": "PBKDF2",
    "Iterations": "100,000",
    "Key Size": "256-bit"
  }
};
