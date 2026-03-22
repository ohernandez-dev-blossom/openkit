import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Token Counter - Count GPT, Claude, Llama Tokens | OpenKit.tools',
  description: 'Count tokens for GPT-4, Claude, Llama, and other AI models. Estimate costs, compare tokenizers, analyze text complexity. 100% client-side, your text never leaves the browser.',
  keywords: [
    'token counter',
    'gpt token counter',
    'claude token counter',
    'tiktoken',
    'openai tokens',
    'llm token count',
    'ai token calculator',
    'token estimator',
    'gpt-4 tokens',
    'token cost calculator'
  ],
  openGraph: {
    title: 'AI Token Counter - Count GPT, Claude, Llama Tokens',
    description: 'Count tokens for GPT-4, Claude, Llama, and other AI models. Estimate costs per model. Client-side, private, free.',
    url: 'https://openkit.tools/token-counter',
    siteName: 'OpenKit.tools',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Token Counter - GPT, Claude, Llama Token Calculator',
    description: 'Count tokens for AI models, estimate costs, compare tokenizers. 100% client-side.',
  },
  alternates: {
    canonical: 'https://openkit.tools/token-counter',
  },
};

export default function TokenCounterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
