'use client';

import Link from 'next/link';
import { Heart, Github, Coffee, ArrowLeft } from 'lucide-react';

// X (formerly Twitter) icon
const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { CookieSettingsButton } from '@/components/cookie-consent';

/**
 * Footer component with non-intrusive monetization
 * - Support/donation links (Ko-fi)
 * - GitHub Sponsors
 * - Sponsor showcase section
 * - Social links
 */
export function Footer() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isToolPage = pathname !== '/' && !pathname.startsWith('/about') && !pathname.startsWith('/privacy') && !pathname.startsWith('/terms') && !pathname.startsWith('/cookies') && !pathname.startsWith('/cookie-policy') && !pathname.startsWith('/faq') && !pathname.startsWith('/blog') && !pathname.startsWith('/disclosure') && !pathname.startsWith('/privacy-request');

  useEffect(() => {
    // Hydration check - prevents SSR/client mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="bg-background mt-16">
      {/* Gradient accent line */}
      <div className="h-px bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50" />
      {/* Back to tools link - shown on all tool pages for consistent navigation */}
      {isToolPage && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to all tools
          </Link>
        </div>
      )}
      {/* Sponsors Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 border-b border-border/50 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
        <div className="text-center">
          <p className="text-xs text-muted-foreground/70 mb-4">Supported by</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* Placeholder for future sponsors */}
            <div className="text-sm text-muted-foreground/70 italic">
              Your company here? <Link href="/disclosure" className="text-muted-foreground hover:text-foreground/70 underline">Sponsor us</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">OpenKit.tools</h3>
            <p className="text-xs text-muted-foreground/70 leading-relaxed mb-3">
              Free online tools — built for developers, useful for everyone. Continuously improving.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com/openkit_tools"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/70 hover:text-foreground/70 transition-colors"
                title="Follow on X"
              >
                <XIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground/70 mb-3">Resources</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="text-muted-foreground/70 hover:text-foreground/70 transition-colors">
                  About OpenKit
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground/70 hover:text-foreground/70 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground/70 hover:text-foreground/70 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
              </li>
            </ul>
            <h3 className="text-sm font-semibold text-foreground/70 mb-3 mt-5">Browse by Category</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/tools/design" className="text-muted-foreground/70 hover:text-foreground/70 transition-colors">
                  🎨 Design Tools
                </Link>
              </li>
              <li>
                <Link href="/tools/text" className="text-muted-foreground/70 hover:text-foreground/70 transition-colors">
                  📝 Text Tools
                </Link>
              </li>
              <li>
                <Link href="/tools/finance" className="text-muted-foreground/70 hover:text-foreground/70 transition-colors">
                  💰 Finance Calculators
                </Link>
              </li>
              <li>
                <Link href="/tools/converters" className="text-muted-foreground/70 hover:text-foreground/70 transition-colors">
                  🔄 Converters
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground/70 mb-3">Legal & Privacy</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="text-muted-foreground/70 hover:text-foreground/70 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-muted-foreground/70 hover:text-foreground/70 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground/70 hover:text-foreground/70 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-request" className="text-muted-foreground/70 hover:text-foreground/70 transition-colors">
                  Privacy Requests
                </Link>
              </li>
              <li>
                <Link href="/disclosure" className="text-muted-foreground/70 hover:text-foreground/70 transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>

          {/* Support */}
          <div id="support">
            <h3 className="text-sm font-semibold text-foreground/70 mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              Support OpenKit
            </h3>
            <p className="text-xs text-muted-foreground/70 mb-3 leading-relaxed">
              OpenKit.tools is free for everyone. Your support helps us maintain and improve the tools.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://ko-fi.com/ohernandez"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/10 to-rose-500/10 hover:from-pink-500/20 hover:to-rose-500/20 border border-pink-500/20 hover:border-pink-500/40 rounded-lg text-xs font-medium text-pink-400 hover:text-pink-300 transition-all hover:scale-105 hover:shadow-lg"
              >
                <Coffee className="w-4 h-4" />
                Support on Ko-fi
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-border/50 bg-muted/30 -mx-4 sm:-mx-6 px-4 sm:px-6 pb-6 rounded-b-lg flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground/70">
          <div>
            © {new Date().getFullYear()} OpenKit.tools. Free for everyone.
          </div>
        </div>
      </div>
    </footer>
  );
}
