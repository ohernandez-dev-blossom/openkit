/**
 * Password Generator Tool Guide Content
 * Comprehensive developer guide for password generation
 */

import type { ToolGuideContent } from "./types";

export const passwordGuideContent: ToolGuideContent = {
  toolName: "Password Generator",
  toolPath: "/password",
  lastUpdated: "2026-02-01",
  version: "1.0",

  quickStartSteps: [
    {
      title: "Set Password Length",
      description: "Use the slider to select password length from 4 to 64 characters. For critical accounts (email, banking, primary password manager), use 16+ characters. For general accounts, 12-14 characters provides strong security while remaining manageable."
    },
    {
      title: "Select Character Types",
      description: "Enable or disable lowercase (a-z), uppercase (A-Z), numbers (0-9), and symbols (!@#$%^&*). More character types increase entropy - use all four for maximum security. Some legacy systems restrict symbols, so adjust based on requirements."
    },
    {
      title: "Generate Password",
      description: "Click Generate to create a cryptographically random password using the Web Crypto API. Each password uses crypto.getRandomValues() for unpredictable, secure randomness - the same technology securing your browser's HTTPS connections."
    },
    {
      title: "Copy & Store Securely",
      description: "Click the password to copy it to your clipboard. Immediately paste it into your password manager (1Password, Bitwarden, KeePass) - NEVER reuse passwords across sites. The password disappears when you close this page, so save it before leaving."
    }
  ],

  introduction: {
    title: "Password Security Fundamentals",
    content: `Strong passwords are the first line of defense against unauthorized access to your accounts, systems, and data. Despite advances in biometrics and multi-factor authentication, passwords remain the primary authentication method for 90%+ of online accounts. Understanding password security is critical for developers building authentication systems and users protecting their digital identity.

A password's strength depends on three factors: length (more characters = exponentially more guesses), complexity (character variety increases possible combinations), and uniqueness (reuse across sites creates catastrophic single-point-of-failure). Modern password security focuses on length over complexity - a 16-character password using only lowercase letters (26^16 combinations) is stronger than an 8-character password with all character types.

### How Password Attacks Work

**Brute Force Attacks:** Attackers systematically try every possible password combination. For an 8-character password with lowercase only (26^8 = 208 billion combinations), a modern GPU can crack it in under 2 hours. Add uppercase (52^8 = 53 trillion combinations) and crack time extends to weeks. At 12 characters with all types (95^12), brute force becomes computationally infeasible with current technology.

**Dictionary Attacks:** Attackers use wordlists containing millions of common passwords, variations, and leaked passwords from data breaches. Passwords like "password123", "qwerty", "letmein", and "admin" appear in every dictionary. Adding a random special character ("password123!") helps minimally - attackers try these variations automatically. True randomness defeats dictionary attacks.

**Credential Stuffing:** When one site is breached, attackers try those username/password combinations on other sites. If you use "MyP@ssw0rd" for Gmail and Amazon, a Gmail breach compromises your Amazon account. This is why password reuse is catastrophic - a single weak site in a chain exposes all accounts. Password managers solve this by generating unique passwords per site.

### Password Entropy Explained

Entropy measures password unpredictability in bits. More entropy = stronger password. For a password of length L using a character set of size N, entropy = L × log2(N). Examples:

- **8 lowercase chars:** 8 × log2(26) = 37.6 bits (crackable in hours)
- **12 mixed case + numbers:** 12 × log2(62) = 71.5 bits (years to crack)
- **16 all character types:** 16 × log2(95) = 105 bits (centuries to crack)

Industry consensus recommends 80+ bits of entropy for strong passwords. A 12-character password with uppercase, lowercase, and numbers (71.5 bits) provides acceptable security for most accounts. Critical accounts (email, banking, password manager master password) should target 100+ bits with 16+ character passwords including symbols.

### Character Set Impact

Each character type added to your password exponentially increases the search space attackers must explore:

- **Lowercase only (a-z):** 26 possible characters per position
- **+ Uppercase (A-Z):** 52 characters (2× increase)
- **+ Numbers (0-9):** 62 characters (2.4× increase)
- **+ Symbols (!@#$%^&*):** 95 characters (3.7× increase)

However, character variety alone doesn't guarantee strength. "Password1!" uses four character types but is weak because it's predictable (dictionary word + common substitution). "zK9#mL2$pQ4&" uses four types and is unpredictable - that's true strength.

### Length vs Complexity Trade-off

Modern password guidance prioritizes length over complexity. NIST (National Institute of Standards and Technology) recommends minimum 8 characters for user-chosen passwords, 12+ for sensitive accounts, and no forced complexity rules that create predictable patterns (Password1! → Password2! → Password3!).

For auto-generated passwords (like this tool), both length and complexity matter. A 16-character password with all character types provides the best balance: strong enough to resist cracking, short enough to type when needed (though password managers should auto-fill), and universally compatible with most systems.

### Common Password Mistakes

**Pattern-based Passwords:** Sequential characters ("abcd1234"), keyboard patterns ("qwerty", "asdfgh"), or repeated characters ("aaaa1111") are trivial to crack despite appearing random. Attackers try these patterns first.

**Personal Information:** Passwords containing your name, birthdate, address, pet names, or family member names are vulnerable to social engineering attacks. Attackers research targets on social media to build custom dictionaries of personally relevant terms.

**Minimal Variation:** Reusing a base password with site-specific suffixes ("MyPassword-Gmail", "MyPassword-Amazon") provides false security. Attackers who crack one variation immediately try others. Each password must be completely unique and random.

**Short Passwords:** Length is the primary security factor. A 6-character password with all character types (95^6 = 735 billion combinations) is weaker than a 10-character lowercase password (26^10 = 141 trillion). Always prefer longer passwords.

### Password Storage Best Practices

**For Users:** Store passwords in a dedicated password manager like 1Password, Bitwarden, KeePass, or Dashlane. These apps encrypt your password vault with a master password, sync across devices, auto-fill credentials, and generate strong random passwords automatically. Never store passwords in plain text files, spreadsheets, or browser bookmarks.

**For Developers:** Never store passwords in plain text. Use bcrypt, scrypt, or Argon2 (best) for password hashing with unique salts per user. These algorithms are intentionally slow (preventing brute force) and use memory-hard computations (preventing GPU acceleration). Set appropriate work factors: bcrypt cost 12+, scrypt N=2^14+, Argon2 memory 64MB+.

### Multi-Factor Authentication (MFA)

While strong passwords are essential, they're not sufficient alone. Enable MFA on all critical accounts. Even if attackers crack or phish your password, they can't access your account without the second factor. Preference order:

1. **Hardware security keys (YubiKey, Titan):** Phishing-resistant, most secure
2. **Authenticator apps (Authy, Google Authenticator):** TOTP-based, very secure
3. **SMS/Phone:** Better than nothing, vulnerable to SIM swapping
4. **Email-based:** Least secure, only use when nothing else available

Combining a strong unique password (16+ characters, random, unique per site) with hardware MFA provides enterprise-grade security for personal accounts.

### Password Rotation Myths

Forced password rotation (changing passwords every 60-90 days) is outdated advice that often reduces security. Users forced to change passwords create predictable patterns (Password1 → Password2) or write passwords down. NIST no longer recommends periodic password changes unless there's evidence of compromise.

Instead, focus on: unique passwords per site (no reuse), adequate length (12+ chars), and monitoring for breaches. Use Have I Been Pwned to check if your accounts appear in known breaches, then change only compromised passwords.`
  },

  useCases: [
    {
      title: "User Registration Systems",
      description: "Generate secure default passwords for new user accounts, password reset flows, or temporary access credentials. Ensure auto-generated passwords meet your security requirements (length, complexity, unpredictability) while remaining compatible with your password validation rules.",
      example: `// User registration with generated password
const tempPassword = crypto.getRandomValues(new Uint8Array(16))
  .reduce((acc, byte) => acc + chars[byte % chars.length], '');

// Email to user
await sendEmail(user.email, {
  subject: 'Account Created',
  body: \`Your temporary password: \${tempPassword}
         Please change it on first login.\`
});

// Store hashed version
await db.users.update({
  id: user.id,
  passwordHash: await bcrypt.hash(tempPassword, 12),
  requirePasswordChange: true
});`
    },
    {
      title: "API Keys & Tokens",
      description: "Create high-entropy secrets for API authentication, webhook signing, encryption keys, or service-to-service authentication. Long random passwords provide the unpredictability required for cryptographic security without the overhead of asymmetric keys.",
      example: `// Generate API key for service authentication
const apiKey = generatePassword(32, {
  uppercase: true,
  lowercase: true,
  numbers: true
});

// Store hashed version (never plain text)
await db.apiKeys.create({
  userId: user.id,
  keyHash: sha256(apiKey),
  name: 'Production API Key',
  createdAt: new Date()
});

// Return to user ONCE (can't be retrieved later)
return { apiKey }; // e.g., zK9mL2pQ4rT6sV8xA1bC3dE5fG7hJ0kM`
    },
    {
      title: "Database Credentials",
      description: "Generate strong passwords for database users, especially for production deployments, CI/CD pipelines, or automated systems. Use maximum length (64+ chars) for database passwords since they're stored in environment variables and never typed manually.",
      example: `// Database password for production deployment
const dbPassword = generatePassword(64, {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true
});

// Store in environment variables or secrets manager
process.env.DATABASE_URL =
  \`postgresql://app_user:\${encodeURIComponent(dbPassword)}@db.example.com:5432/production\`;

// Or AWS Secrets Manager
await secretsManager.createSecret({
  Name: 'prod/db/password',
  SecretString: dbPassword
});`
    },
    {
      title: "Temporary Access Codes",
      description: "Create time-limited one-time passwords for account verification, password resets, or temporary guest access. Short, high-entropy codes balance security (unpredictable) with usability (can be typed if needed). Always set expiration times.",
      example: `// Password reset flow
const resetCode = generatePassword(12, {
  uppercase: true,
  numbers: true
});

// Store with expiration
await redis.set(
  \`reset:\${user.id}\`,
  resetCode,
  'EX', 900 // 15 minutes
);

// Email to user
await sendEmail(user.email, {
  subject: 'Password Reset',
  body: \`Your reset code: \${resetCode}
         Expires in 15 minutes.\`
});`
    }
  ],

  howToUse: {
    title: "How to Use This Password Generator",
    content: `This password generator creates cryptographically secure random passwords using the Web Crypto API (crypto.getRandomValues()), the same cryptographic primitive used for HTTPS/TLS encryption in your browser. All generation happens client-side - your passwords never touch our servers.

### Basic Generation Workflow

Adjust the length slider to your desired password length (4-64 characters). For most accounts, 12-16 characters provides excellent security. For critical accounts or API keys, use 20+ characters. Enable or disable character types based on your requirements - systems sometimes restrict certain symbols.

Click Generate New Password to create a cryptographically random password. The password appears in the main display area with a real-time strength indicator showing password quality (weak, fair, good, strong). Click the password to copy it to your clipboard instantly.

### Password Strength Indicator

The strength meter analyzes your password based on length, character variety, and entropy:

- **Weak (red):** Under 8 characters or limited character types. Vulnerable to brute force within hours/days.
- **Fair (yellow):** 8-12 characters with 2-3 character types. Provides basic security but not recommended for important accounts.
- **Good (blue):** 12-16 characters with 3-4 character types. Suitable for most accounts (~70-90 bits entropy).
- **Strong (green):** 16+ characters with all character types. Excellent security for critical accounts (100+ bits entropy).

Target "Strong" for password manager master passwords, email, banking, and other high-value accounts. "Good" is acceptable for lower-risk accounts when combined with MFA.

### Character Type Selection

**Lowercase (a-z):** Always recommended. Provides base character set of 26 characters. Required by virtually all systems.

**Uppercase (A-Z):** Doubles character space to 52 characters. Some systems require mixed case. Significantly improves entropy.

**Numbers (0-9):** Adds 10 more characters. Most systems require at least one number. Essential for strong passwords.

**Symbols (!@#$%^&*):** Provides maximum entropy with 95 total characters. Some legacy systems restrict symbols - disable if you encounter validation errors. For API keys and secrets, always include symbols.

### Generation History

The tool maintains a history of your last 10 generated passwords. Click any password in the history to copy it. Useful for retrieving a recently generated password if you forgot to save it. History is stored only in browser memory - it disappears when you close the page, ensuring old passwords aren't permanently stored.

### Best Practices

**Use a Password Manager:** Copy generated passwords directly into 1Password, Bitwarden, or KeePass. Never try to memorize random passwords or write them down.

**One Password Per Site:** Generate a unique password for every account. Password reuse is the biggest security mistake - a breach of one site compromises all accounts with that password.

**Length Over Complexity:** A 16-character lowercase password is stronger than an 8-character password with all character types. Prefer longer passwords when possible.

**Don't Modify Generated Passwords:** Resist the urge to make passwords "more memorable" by adding personal touches. This reduces randomness and weakens security. Trust the cryptographic randomness.`,
    steps: [
      {
        name: "Set Password Length",
        text: "Use the slider to choose password length (4-64 characters). Minimum 12 for general accounts, 16+ for critical accounts, 32+ for API keys and secrets."
      },
      {
        name: "Select Character Types",
        text: "Enable lowercase, uppercase, numbers, and symbols based on system requirements. Use all four types for maximum security unless restricted by legacy systems."
      },
      {
        name: "Generate Password",
        text: "Click Generate New Password to create a cryptographically secure random password using Web Crypto API. Check the strength indicator for quality feedback."
      },
      {
        name: "Copy & Store in Password Manager",
        text: "Click the password to copy it to clipboard. Immediately paste into your password manager (1Password, Bitwarden, KeePass). Never reuse across sites."
      }
    ]
  },

  faqs: [
    {
      question: "How long should my password be?",
      answer: "Minimum 12 characters for general accounts, 16+ for critical accounts (email, banking, password manager master password), and 32+ for API keys or secrets. Length is the primary factor in password strength - each additional character exponentially increases crack time. A 16-character password with all character types provides ~105 bits of entropy, requiring centuries to crack with current technology. Prefer longer passwords when practical, especially for credentials stored in password managers (no need to memorize or type them)."
    },
    {
      question: "Should I include special characters/symbols?",
      answer: "Yes, when possible. Symbols increase the character space from 62 (alphanumeric) to 95 characters, significantly boosting entropy. However, some legacy systems restrict symbols - if you encounter validation errors, generate without symbols. For API keys, database passwords, or any credential stored in environment variables, always include symbols for maximum security. For manually-typed passwords, balance security (symbols add entropy) with usability (some symbols are hard to type on mobile keyboards)."
    },
    {
      question: "Are password managers safe?",
      answer: "Yes, password managers are the gold standard for password security. They encrypt your password vault with a master password using AES-256 encryption, the same standard used by governments and militaries. Popular managers (1Password, Bitwarden, KeePass) have been extensively audited and proven secure. The risk of database breaches or memory attacks is far lower than the risk of password reuse (credential stuffing). Use a password manager with a strong, unique master password (20+ characters) and enable MFA. The convenience (auto-fill, cross-device sync) eliminates excuses for weak or reused passwords."
    },
    {
      question: "How often should I change my passwords?",
      answer: "Change passwords only when: (1) there's evidence of compromise (Have I Been Pwned alert, suspicious login activity), (2) you suspect you've been phished, (3) a service you use reports a data breach, or (4) you're eliminating reused passwords. Forced periodic rotation (every 60-90 days) is outdated advice that often reduces security - users create predictable patterns (Password1 → Password2) or write passwords down. NIST no longer recommends regular password changes. Focus on password uniqueness, adequate length (12+ chars), and breach monitoring instead."
    },
    {
      question: "Can I trust this generator's randomness?",
      answer: "Yes. This generator uses crypto.getRandomValues() from the Web Crypto API, which provides cryptographically secure random number generation (CSRNG) suitable for security-critical applications. It's the same randomness source used for HTTPS/TLS encryption, cryptocurrency wallets, and other high-security browser features. The randomness is generated by your device's hardware random number generator (entropy from CPU thermal noise, mouse movements, etc.) and is suitable for generating authentication tokens, encryption keys, and passwords. All major browsers implement this standard correctly - the randomness quality is equivalent to /dev/urandom on Linux."
    },
    {
      question: "What makes a password 'strong'?",
      answer: "Strong passwords have three characteristics: (1) Length - 16+ characters provide sufficient entropy to resist brute force, (2) Unpredictability - truly random characters defeat dictionary attacks and pattern matching, and (3) Uniqueness - never reused across sites to prevent credential stuffing. This tool's 'Strong' rating indicates 16+ characters with all character types (~105+ bits entropy), requiring centuries to crack. Weak passwords are short (<8 chars), use predictable patterns (Password123!), or appear in breach databases. Always aim for 'Strong' rating on critical accounts, 'Good' minimum for others, and combine with MFA for defense-in-depth."
    },
    {
      question: "Is it safe to generate passwords online?",
      answer: "Yes, when the generator operates client-side like this tool. All password generation happens in your browser's JavaScript engine using the Web Crypto API - there are no server uploads, no backend processing, and no network transmission of generated passwords. You can verify this by opening browser DevTools Network tab - zero outbound requests containing password data. For maximum paranoia, disconnect from the internet before generating, or use the offline PWA version. This is safe for production passwords, API keys, and security-critical secrets. The code is transparent and auditable. and auditable."
    },
    {
      question: "How do I remember complex passwords?",
      answer: "Don't. Use a password manager to store all passwords except your master password. For the master password (the only one you need to memorize), use a long passphrase: 5-7 random words from Diceware wordlist, like 'correct-horse-battery-staple-mountain-purple'. This provides excellent entropy (77+ bits for 6 words) while being memorizable. Or use a personally meaningful sentence converted to initials + numbers + symbols: 'I graduated from MIT in 2010!' → 'IgfMi2010!'. Never try to memorize random character passwords - that's what password managers are for."
    },
    {
      question: "What's the difference between password and passphrase?",
      answer: "Passwords are random character strings (e.g., 'zK9#mL2$pQ4&') that maximize entropy per character but are hard to memorize. Passphrases are sequences of random words (e.g., 'correct-horse-battery-staple') that are easier to remember while still providing strong security through length. A 6-word Diceware passphrase provides ~77 bits of entropy vs ~42 bits for an 8-character random password. Use passphrases for master passwords you must memorize (password manager master password, disk encryption). Use random passwords (like this tool generates) for everything else stored in your password manager."
    },
    {
      question: "Can I use the same password if I add a suffix per site?",
      answer: "No. Patterns like 'MyPassword-Gmail', 'MyPassword-Amazon' provide false security. Attackers who crack one variation immediately try common site suffixes. This is programmatically trivial and offers no protection. Each password must be completely unique and random. Password managers make this easy - they auto-generate and auto-fill unique passwords per site. There's no usability benefit to password patterns when using a password manager, and the security cost is catastrophic. One site breach = all accounts compromised."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `All password generation happens entirely client-side using your browser's Web Crypto API (crypto.getRandomValues()). This API provides cryptographically secure random number generation suitable for authentication tokens, encryption keys, and security-critical passwords. Your generated passwords never leave your device - there are no server uploads, no backend processing, and no data transmission to external servers.

### Privacy Guarantees

- **100% Client-Side Generation:** All passwords are created in your browser's JavaScript engine using cryptographic APIs. Zero server communication.
- **Cryptographic Randomness:** Uses crypto.getRandomValues() backed by your device's hardware random number generator (HRNG) - the same source used for HTTPS/TLS encryption.
- **No Data Storage:** Generated passwords are not saved, logged, or persisted anywhere. They exist only in browser memory and disappear when you close the page.
- **No Analytics Tracking:** We don't track what passwords you generate, password parameters, or any usage analytics. Completely private.
- **Offline Capable:** Works completely offline after first load. Add to home screen as PWA for instant access without internet.

### Cryptographic Quality

The Web Crypto API's getRandomValues() function provides cryptographically secure randomness suitable for security-sensitive applications. Each password character is selected from the character set using truly random values (not pseudo-random). The implementation is FIPS 140-2 compliant and suitable for generating passwords, API tokens, encryption keys, and other secrets.

This generator is safe for production use including user passwords, database credentials, API keys, and any scenario requiring high-entropy secrets. The randomness quality is equivalent to /dev/urandom on Linux systems and meets cryptographic standards for unpredictability.

### Best Practices After Generation

After generating a password, immediately copy it to a password manager and save. Never send passwords via email, SMS, or chat - these channels are insecure. For sharing secrets with team members, use dedicated tools like 1Password Shared Vaults, Bitwarden Organizations, or encrypted password sharing services. Never screenshot or write down passwords - this creates persistent copies outside your password manager's encryption.`
  },

  stats: {
    "Max Length": "128 chars",
    "Entropy": "Up to 256 bits",
    "Character Sets": "4 types",
    "Generation Speed": "<10ms",
    "Server Uploads": "0"
  }
};
