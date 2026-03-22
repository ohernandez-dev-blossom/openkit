/**
 * QR Code Generator Tool Guide Content
 * Comprehensive developer guide for QR code generation
 */

import type { ToolGuideContent } from "./types";

export const qrGuideContent: ToolGuideContent = {
  toolName: "QR Code Generator",
  toolPath: "/qr",
  lastUpdated: "2026-02-01",
  version: "2.0",

  quickStartSteps: [
    {
      title: "Enter Your Content",
      description: "Type or paste any text, URL, contact information, or data you want to encode. QR codes support URLs, plain text, vCards, WiFi credentials, phone numbers, and more."
    },
    {
      title: "Customize Appearance",
      description: "Adjust size (128px to 1024px), error correction level (L, M, Q, H), colors (foreground and background), and add a logo or custom image in the center for branded QR codes."
    },
    {
      title: "Generate QR Code",
      description: "Click 'Generate' to instantly create your QR code. The code appears in real-time as an SVG or PNG image, optimized for both screen display and print quality."
    },
    {
      title: "Download or Share",
      description: "Download as PNG, SVG, or PDF for printing on business cards, posters, or packaging. Copy the image or share the QR code directly for digital use on websites, emails, or social media."
    }
  ],

  introduction: {
    title: "What are QR Codes?",
    content: `QR (Quick Response) codes are two-dimensional barcodes invented by Denso Wave in 1994 for tracking automotive parts in Japan. Unlike traditional linear barcodes that store data horizontally, QR codes store information both horizontally and vertically, allowing them to hold significantly more data - up to 4,296 alphanumeric characters or 7,089 numeric characters.

QR codes have evolved from industrial use to ubiquitous consumer technology. Smartphones' native camera apps can scan QR codes without additional apps, driving mass adoption for contactless menus, payment systems, authentication, product tracking, and marketing campaigns.

### Key Characteristics of QR Codes

- **High Data Capacity:** Store URLs (up to 2,953 bytes), vCards, WiFi credentials, plain text, phone numbers, email addresses, geographic coordinates, and structured data. Much more versatile than traditional barcodes limited to product IDs.
- **Error Correction:** Built-in Reed-Solomon error correction allows QR codes to remain scannable even when partially damaged or obscured. Four error correction levels: L (7%), M (15%), Q (25%), H (30%) recovery capability.
- **Fast Scanning:** Designed for rapid recognition - smartphone cameras detect and decode QR codes in under 1 second from any angle. Three position markers (corner squares) enable instant orientation detection.
- **Customizable Design:** Supports color customization, logo embedding (using error correction redundancy), and artistic modifications while maintaining scannability. Enables branded QR codes for marketing.

### Why Developers Use QR Codes

Mobile app deep linking relies on QR codes to direct users to specific app pages or trigger app downloads. Conference badges use QR codes for instant attendee check-in and contact sharing. Product packaging embeds QR codes for authenticity verification, usage instructions, and warranty registration.

Payment systems (PayPal, Venmo, crypto wallets) generate QR codes for transaction requests - users scan to complete payments without manual data entry. Two-factor authentication (2FA) apps like Google Authenticator use QR codes to transfer TOTP secrets from services to user devices securely.

WiFi networks encode credentials in QR format (SSID, password, encryption type) for instant guest connectivity without sharing passwords verbally. Event tickets, boarding passes, and venue entries use QR codes for contactless scanning and real-time validation.

### QR Code Standards and Formats

**URL Encoding:** Most common use case. Encodes https:// links for websites, landing pages, app downloads, or tracking URLs. Modern cameras automatically open links after scanning.

**vCard Format:** Stores contact information (name, phone, email, address, company) in structured format. Scanning adds contact directly to phone's address book.

**WiFi Credentials:** Special format: WIFI:T:WPA;S:NetworkName;P:Password;; enables instant network joining without manual password entry.

**SEPA/Bitcoin Payment:** Encodes payment requests with amount, recipient, and memo. Wallet apps parse and pre-fill transaction details.`
  },

  useCases: [
    {
      title: "Contactless Menus and Ordering",
      description: "Restaurants place QR codes on tables - customers scan to view menus, order, and pay without physical contact. Became essential during COVID-19 and remains popular for convenience and reduced printing costs.",
      example: `// Generate restaurant menu QR code
const menuURL = "https://restaurant.com/menu/table-5";
// QR code links to digital menu
// Customer scans → Opens menu → Places order → Pays online`
    },
    {
      title: "Product Authentication and Tracking",
      description: "Embed unique QR codes on product packaging for authenticity verification, serial number lookup, warranty registration, and supply chain tracking. Luxury brands use QR codes to combat counterfeiting.",
      example: `// Product QR data structure
{
  "product_id": "ABC-12345",
  "serial": "SN-987654321",
  "manufactured": "2026-01-15",
  "verify_url": "https://brand.com/verify?id=ABC-12345&s=hash",
  "warranty": "2-year-extended"
}
// Encode as JSON in QR → Customer scans → Verifies authenticity`
    },
    {
      title: "Event Ticketing and Check-in",
      description: "Generate unique QR codes for event tickets, conference badges, and venue access passes. Scanning validates tickets instantly, prevents duplicate entries, and enables real-time attendance tracking.",
      example: `// Event ticket QR structure
{
  "ticket_id": "EVT-2026-00123",
  "event": "Tech Conference 2026",
  "attendee": "John Doe",
  "tier": "VIP",
  "valid_until": "2026-03-15T18:00:00Z"
}
// Encode as signed JWT in QR → Scan at entrance → Validate signature → Grant access`
    },
    {
      title: "WiFi Network Sharing",
      description: "Create QR codes containing WiFi credentials - guests scan to connect instantly without typing passwords. Especially useful for complex passwords, guest networks, and Airbnb rentals.",
      example: `// WiFi QR code format
WIFI:T:WPA;S:MyNetwork5G;P:SecurePassword123!;;

// T = Security type (WPA, WEP, or nopass)
// S = Network SSID
// P = Password
// Scan on iOS/Android → Automatic WiFi connection`
    }
  ],

  howToUse: {
    title: "How to Use This QR Code Generator",
    content: `This QR code generator creates customizable, high-quality QR codes entirely in your browser using client-side JavaScript. No server uploads - your data stays private.

### Basic QR Code Generation

Enter your content (URL, text, phone number, etc.) in the input field and click "Generate". The QR code appears instantly as a scalable image. Default settings (medium error correction, black foreground, white background) work for most use cases.

### Choosing Error Correction Level

Error correction determines how much damage a QR code can sustain while remaining scannable:

**L (Low - 7% recovery):** Smallest QR code size, best for clean environments (digital screens, high-quality prints). Not recommended for outdoor use or small sizes.

**M (Medium - 15% recovery):** Default and recommended for most applications. Good balance between size and reliability. Suitable for business cards, posters, product labels.

**Q (Quartile - 25% recovery):** Higher redundancy, slightly larger code. Recommended when adding logos/images to QR codes or printing on textured surfaces.

**H (High - 30% recovery):** Maximum error correction, largest code size. Use for outdoor signage, heavily customized designs, or harsh environments (construction sites, outdoor events).

### Customizing Appearance

**Size:** Choose 128px for small digital uses (email signatures), 256-512px for standard applications (websites, documents), 1024px+ for large format printing (posters, banners).

**Colors:** Customize foreground (typically black) and background (typically white) colors. Maintain high contrast ratio (>4.5:1) for reliable scanning. Dark foreground on light background works best.

**Logo/Image:** Add center logo using H error correction level. Logo should occupy <30% of QR code area to maintain scannability. Upload transparent PNG for best results.

### Download Formats

**PNG:** Raster image, best for digital use (websites, emails, social media). Choose high resolution (1024px) for printing to maintain quality.

**SVG:** Vector format, infinitely scalable without quality loss. Ideal for professional printing, large format (posters, banners), and design software integration.

**PDF:** Document format with embedded QR code. Best for business cards, flyers, or when combining QR code with other printable content.

### Keyboard Shortcuts

- **Cmd/Ctrl+Enter:** Generate QR code
- **Cmd/Ctrl+K:** Clear input
- **Cmd/Ctrl+S:** Download as PNG`,
    steps: [
      {
        name: "Enter Content",
        text: "Type or paste your content (URL, text, vCard, WiFi credentials) into the input field."
      },
      {
        name: "Customize Settings",
        text: "Adjust size, error correction level, colors, and optionally add a logo or image to the center."
      },
      {
        name: "Generate Code",
        text: "Click 'Generate' button or press Cmd/Ctrl+Enter. QR code appears instantly with live preview."
      },
      {
        name: "Download or Share",
        text: "Download as PNG, SVG, or PDF format. Copy image for digital use or print for physical materials."
      }
    ]
  },

  faqs: [
    {
      question: "What's the maximum amount of data a QR code can store?",
      answer: "QR codes can store up to 4,296 alphanumeric characters, 7,089 numeric characters, or 2,953 bytes of binary data. However, practical limits are much lower for scannability - complex QR codes with thousands of characters require perfect lighting and high-quality cameras. For reliable scanning, keep content under 300 characters for URLs or 1,000 characters for plain text. Use link shorteners for long URLs."
    },
    {
      question: "Do QR codes expire or stop working?",
      answer: "QR codes themselves never expire - the encoded data is permanent. However, if a QR code contains a URL, the destination website may go offline, breaking the link. Dynamic QR codes (where the QR points to a redirect service that can be updated) don't expire as long as the redirect service is active. Static QR codes (data directly encoded) work forever but cannot be changed after generation."
    },
    {
      question: "Can I add a logo to my QR code?",
      answer: "Yes, using error correction redundancy. Set error correction to Q (25%) or H (30%) level, then add a logo occupying no more than 20-30% of the QR code's center area. The error correction compensates for the logo's obstruction. Use transparent PNG logos for best results. Test scanning after adding logos to ensure reliability - complex logos may reduce scannability."
    },
    {
      question: "What's the difference between error correction levels?",
      answer: "Error correction determines how much of the QR code can be damaged while remaining scannable: L (7%), M (15%), Q (25%), H (30%). Higher levels create larger QR codes with more data redundancy. Use L for clean digital displays, M for standard use, Q when adding logos, and H for outdoor/rough environments. The tradeoff is size - H level QR codes are significantly larger than L level for the same data."
    },
    {
      question: "Why won't my QR code scan on some phones?",
      answer: "Common scanning issues: insufficient contrast (use dark foreground on light background), low resolution (use at least 256x256px for print), poor lighting (ensure good illumination), excessive customization (too many colors or patterns reduce scannability), or damaged/partially obscured code. Test QR codes on multiple devices before deployment. iOS cameras are generally more sensitive than Android. Increase error correction level if scanning is unreliable."
    },
    {
      question: "Can I track who scans my QR code?",
      answer: "Only with dynamic QR codes using redirect services. If your QR code points directly to a URL (static QR), you cannot track scans. To track, use a QR redirect service or link shortener (bit.ly, qr.io) - the QR points to the redirect URL which tracks scans and forwards to your destination. This enables analytics (scan count, location, device type) but adds a dependency on the redirect service remaining active."
    },
    {
      question: "How do I create a WiFi QR code?",
      answer: "Use the special WiFi format: WIFI:T:WPA;S:YourNetworkName;P:YourPassword;; where T is security type (WPA, WEP, or nopass for open networks), S is the network SSID, and P is the password. Generate a QR code with this text - iOS and Android devices automatically detect WiFi QR codes and offer to connect. Perfect for sharing guest network access without revealing passwords verbally."
    },
    {
      question: "What's the best size for printing QR codes?",
      answer: "Minimum print size is 2cm x 2cm (0.8in x 0.8in) for arm's length scanning. For optimal results: business cards (3cm x 3cm), posters/flyers (5-10cm), banners (15cm+). The rule is 10:1 ratio - if scanning from 1 meter, QR code should be at least 10cm. Generate high resolution (1024px+) and use SVG format for professional printing to maintain quality at any size. Test print and scan before mass production."
    },
    {
      question: "Can QR codes be different colors besides black and white?",
      answer: "Yes, but maintain high contrast for reliable scanning. Dark foreground on light background works best (black on white, dark blue on light yellow). Avoid low contrast combinations (light gray on white, yellow on white) which cameras struggle to detect. Artistic QR codes with gradients or multiple colors may look attractive but significantly reduce scannability. For branded QR codes, use your brand colors but test scanning extensively before deployment."
    },
    {
      question: "Is my data private when generating QR codes with this tool?",
      answer: "Completely private. All QR code generation happens entirely in your browser using client-side JavaScript libraries. Your input data never leaves your device or gets sent to any servers. No data is uploaded, logged, or stored. You can verify this by disconnecting from the internet - the generator still works offline. Safe for generating QR codes containing sensitive information, though consider security implications of QR code content being scannable by anyone with camera access."
    }
  ],

  security: {
    title: "Security & Privacy",
    content: `Your data never leaves your browser. This QR code generator operates entirely client-side using JavaScript QR code generation libraries. There are no server uploads, no backend processing, and no data transmission to any external services.

### Privacy Guarantees

- **100% Client-Side Generation:** All QR code creation happens in your browser. Your data stays on your device.
- **No Server Uploads:** We don't have servers to process your data. Works completely offline after first load.
- **No Data Storage:** Your input is not saved, logged, or stored anywhere. Refresh the page and it's gone.
- **No Analytics Tracking:** We don't track what you encode, how often you use the tool, or any content.
- **Transparent & Auditable:** Inspect Network tab in DevTools - zero outbound requests with your data.

This makes the generator safe for creating QR codes containing sensitive information like WiFi passwords, private URLs, payment details, or confidential contact information.

### Security Best Practices

**QR Code Phishing Awareness:** Malicious actors can create QR codes linking to phishing sites. Users should verify URLs before opening from untrusted QR codes.

**URL Shorteners:** When using link shorteners for tracking, choose reputable services as shortened URLs obscure the actual destination.

**Dynamic QR Risks:** QR codes pointing to redirect services can have their destination changed by the service owner. Use static QR codes for permanent content.`
  },

  stats: {
    "Max Data": "4,296 chars",
    "Generation Speed": "<100ms",
    "Error Correction": "Up to 30%",
    "Formats": "PNG/SVG/PDF",
    "Server Uploads": "0"
  }
};
