export const base32GuideContent = {
  introduction: `
Base32 is a binary-to-text encoding scheme that represents binary data in an ASCII string format using a 32-character alphabet. 

## What is Base32?

Base32 encoding converts binary data into a text string using 32 different characters:
- **Alphabet**: A-Z and 2-7 (excluding 0, 1, 8, 9 to avoid confusion)
- **Padding**: Uses '=' characters to ensure the output length is a multiple of 8
- **Standard**: RFC 4648 compliant

## Common Uses

- **Cryptography**: Encoding keys and secrets (compatible with URL-safe formats)
- **OTP (One-Time Passwords)**: Google Authenticator and similar apps use Base32
- **File Sharing**: Safe transmission of binary data through text channels
- **Data Storage**: Human-readable storage of binary data

## Base32 vs Base64

| Feature | Base32 | Base64 |
|---------|--------|--------|
| Alphabet size | 32 chars | 64 chars |
| Output size | ~160% of input | ~133% of input |
| Case sensitive | No (uppercase only) | Yes |
| URL safe | Yes | Requires URL encoding |
| Human readable | More readable | Less readable |
  `,
  faqs: [
    {
      question: "What is Base32 encoding used for?",
      answer: "Base32 is commonly used in OTP (One-Time Password) applications like Google Authenticator, cryptographic key storage, and scenarios where case-insensitive encoding is needed. It's more human-readable than Base64."
    },
    {
      question: "Is Base32 case-sensitive?",
      answer: "No, Base32 uses only uppercase letters A-Z and numbers 2-7. This makes it case-insensitive and easier to communicate verbally or in handwriting."
    },
    {
      question: "Why does Base32 output end with '='?",
      answer: "The '=' characters are padding added to make the output length a multiple of 8 characters. This ensures proper alignment during decoding and is defined in RFC 4648."
    },
    {
      question: "Is this tool secure?",
      answer: "Yes, all processing happens entirely in your browser. Your data is never sent to any server, making it safe for encoding sensitive information like cryptographic keys."
    },
    {
      question: "Can I decode any Base32 string?",
      answer: "This tool decodes RFC 4648 standard Base32. Some applications may use custom variants with different alphabets, which may not decode correctly."
    }
  ]
};
