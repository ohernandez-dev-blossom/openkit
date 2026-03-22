import type { Metadata } from "next";
import PasswordClient from "./password-client";

export const metadata: Metadata = {
  title: "Password Generator - Secure Passwords & Passphrases | OpenKit.tools",
  description: "Generate secure random passwords and memorable passphrases instantly. Customize length, character types, and strength. Client-side generation - passwords never leave your browser.",
  keywords: [
    "password generator",
    "secure password",
    "random password",
    "passphrase generator",
    "strong password",
    "password creator",
    "secure passphrase",
    "password strength",
    "developer tools",
    "security tools"
  ],
  openGraph: {
    title: "Password Generator - Secure Passwords & Passphrases",
    description: "Generate secure random passwords and memorable passphrases instantly. Client-side generation for maximum security.",
    url: "https://openkit.tools/password",
    images: [
      {
        url: "/og-images/password.jpg",
        width: 1200,
        height: 630,
        alt: "Password Generator - Create Secure Passwords",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Generator - Secure Passwords & Passphrases",
    description: "Generate secure random passwords and memorable passphrases instantly. Client-side generation for maximum security.",
    images: ["/og-images/password.jpg"],
  },
  alternates: {
    canonical: "https://openkit.tools/password",
  },
};

export default function PasswordPage() {
  return <PasswordClient />;
}
