import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TOTP Generator - Time-Based One-Time Passwords | OpenKit",
  description: "Generate TOTP codes for two-factor authentication. Supports Google Authenticator, Authy, and other 2FA apps. Free online developer tool with QR code generation. 100% client-side, private processing.",
  keywords: ["totp generator", "2fa", "two factor authentication", "otp generator", "google authenticator", "time-based otp"],
  openGraph: {
    title: "TOTP Generator - Time-Based One-Time Passwords",
    description: "Generate TOTP codes for two-factor authentication with support for Google Authenticator and other 2FA apps.",
    url: "https://openkit.tools/totp",
  },
  alternates: {
    canonical: "https://openkit.tools/totp",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
