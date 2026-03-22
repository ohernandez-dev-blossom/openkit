import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator - Secure Random Passwords",
  description: "Generate secure random passwords with customizable length and character types. Cryptographically secure password generator with strength indicator. 100% client-side for privacy.",
  keywords: ["password generator", "secure password", "random password", "strong password", "password creator", "generate password"],
  openGraph: {
    title: "Password Generator - Secure Random Password Creator",
    description: "Create cryptographically secure passwords instantly. Customizable length, character types, and real-time strength analysis.",
    url: "https://openkit.tools/password",
    images: [{
      url: "/og/password.jpg",
      width: 1200,
      height: 630,
      alt: "Password Generator - Secure Random Passwords",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Generator - Secure Random Passwords",
    description: "Create cryptographically secure passwords instantly. Customizable length and strength analysis.",
    images: ["/og/password.jpg"],
  },
  alternates: {
    canonical: "https://openkit.tools/password",
  },
};

export default function PasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
