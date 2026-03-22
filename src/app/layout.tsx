import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { ShortcutsProvider } from "@/contexts/shortcuts-context";
import { ThemeProvider } from "@/contexts/theme-context";
import { ToastProvider } from "@/contexts/toast-context";
import { GlobalShortcuts } from "@/components/global-shortcuts";
import { ChunkReloadHandler } from "@/components/chunk-reload";
import { Analytics } from "@/components/analytics";
import { AdSenseScript } from "@/components/adsense-script";
import { CookieConsent } from "@/components/cookie-consent";
import { SkipNav } from "@/components/skip-nav";

import { OrganizationSchema, WebSiteSchema } from "@/components/seo/json-ld";
import {
  PWARegister,
  PWAInstallPrompt,
  KonamiEasterEgg
} from "@/components/client-only-components";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { ToolBreadcrumb } from "@/components/tool-breadcrumb";

const Footer = dynamic(() => import("@/components/footer").then(m => ({ default: m.Footer })));

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openkit.tools"),
  title: {
    default: "OpenKit.tools — Free Online Tools — Built for Developers, Useful for Everyone",
    template: "%s | OpenKit.tools",
  },
  description: "Free online tools for developers, designers, writers, and everyone. JSON formatter, color palettes, text utilities, finance calculators, unit converters, and 160+ tools. Privacy-first, client-side processing.",
  keywords: [
    "online tools",
    "free tools",
    "developer tools",
    "dev tools",
    "design tools",
    "text tools",
    "conversion tools",
    "coding utilities",
    "programming tools",
    "web developer tools",
    "css generators",
    "color palettes",
    "finance calculators",
    "unit converters",
    "json formatter",
    "base64 encoder",
    "hash generator",
    "color converter",
    "qr code generator",
    "uuid generator",
    "password generator",
    "regex tester",
    "timestamp converter",
    "css generator",
    "code formatter",
    "free developer tools",
    "word counter",
    "case converter",
    "tip calculator"
  ],
  authors: [{ name: "OpenKit.tools Team" }],
  creator: "OpenKit.tools",
  publisher: "OpenKit.tools",
  category: "Technology",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "OpenKit.tools",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://openkit.tools",
    siteName: "OpenKit.tools",
    title: "OpenKit.tools — Free Online Tools — Built for Developers, Useful for Everyone",
    description: "Free online tools for developers, designers, writers, and everyone. 160+ privacy-first utilities with client-side processing. JSON formatter, color palettes, text tools, finance calculators, and more — no signup required.",
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "OpenKit.tools — Free Online Tools for Everyone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@OpenKitTools",
    creator: "@OpenKitTools",
    title: "OpenKit.tools — Free Online Tools for Developers & Everyone",
    description: "160+ free online tools — JSON formatter, color palettes, text utilities, finance calculators, and more. Privacy-first, client-side processing, no signup required.",
    images: ["/og/home.jpg"],
  },
  alternates: {
    canonical: "https://openkit.tools",
  },
  verification: {
    google: "verified", // Google Search Console verified
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a", // Dark mode only
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} translate="no">
      <head>
        {/* Prevent browser auto-translation (breaks React DOM reconciliation) */}
        <meta name="google" content="notranslate" />
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <OrganizationSchema />
        <WebSiteSchema />
        {process.env.NEXT_PUBLIC_UMAMI_URL && process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script async src={process.env.NEXT_PUBLIC_UMAMI_URL} data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID} strategy="afterInteractive" />
        )}
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SkipNav />
        <ThemeProvider>
          <ToastProvider>
            <ShortcutsProvider>
              <ToolBreadcrumb />
              <div id="main-content" className="pb-20 md:pb-0">
                {children}
                <Footer />
              </div>
              <MobileBottomNav />
              <GlobalShortcuts />
              <ChunkReloadHandler />
              <PWARegister />
              <PWAInstallPrompt />
              <KonamiEasterEgg />
              <CookieConsent />
              <Analytics />
              <AdSenseScript />
            </ShortcutsProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
