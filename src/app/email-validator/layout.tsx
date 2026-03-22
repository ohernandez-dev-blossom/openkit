import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Validator - Validate Email Addresses Online | OpenKit.tools",
  description:
    "Validate email addresses with syntax checking, MX record hints, disposable email detection, and format analysis. Free online email validation tool.",
  keywords: [
    "email validator",
    "validate email",
    "email checker",
    "email syntax check",
    "email format validator",
    "email verification",
    "disposable email check",
    "email tester",
    "email address validator",
    "developer tools",
  ],
  openGraph: {
    title: "Email Validator - Validate Email Addresses Online",
    description:
      "Validate email addresses with syntax checking, disposable detection, and format analysis.",
    url: "https://openkit.tools/email-validator",
    images: [
      {
        url: "/og-images/email-validator.jpg",
        width: 1200,
        height: 630,
        alt: "Email Validator - OpenKit.tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Email Validator - Validate Email Addresses Online",
    description:
      "Validate email addresses with syntax and format analysis. Free online tool.",
    images: ["/og-images/email-validator.jpg"],
  },
  alternates: {
    canonical: "https://openkit.tools/email-validator",
  },
};

export default function EmailValidatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
