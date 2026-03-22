import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Math Expression Evaluator - Calculate Expressions Online | OpenKit.tools',
  description: 'Evaluate mathematical expressions with variables, functions (sin, cos, log, sqrt), constants (PI, E), and multi-line calculations. Supports hex, binary, and scientific notation. Free, client-side.',
  keywords: [
    'math evaluator',
    'expression calculator',
    'math parser',
    'scientific calculator',
    'online calculator',
    'evaluate expression',
    'math expression',
    'formula calculator',
    'calculate online',
    'math tool'
  ],
  openGraph: {
    title: 'Math Expression Evaluator - Calculate Expressions Online',
    description: 'Evaluate math expressions with variables, functions, and constants. Multi-line, scientific notation, hex/binary. Client-side, free.',
    url: 'https://openkit.tools/math-eval',
    siteName: 'OpenKit.tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Math Expression Evaluator - Calculate Expressions Online',
    description: 'Evaluate math expressions with functions, variables, and multi-line support. 100% client-side.',
  },
  alternates: {
    canonical: 'https://openkit.tools/math-eval',
  },
};

export default function MathEvalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
