/**
 * FAQ Schema for SEO
 * Provides FAQPage structured data for Google rich results
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Common FAQs for OpenKit.tools
export const commonFAQs: FAQItem[] = [
  {
    question: "Are OpenKit.tools really free?",
    answer: "Yes, all core tools on OpenKit.tools are completely free to use with no signup required. AI-powered features are available with a free account and include a generous daily limit. No hidden fees, no credit card required."
  },
  {
    question: "Is my data safe when using OpenKit.tools?",
    answer: "Absolutely. All processing happens in your browser using client-side JavaScript. Your data never leaves your device or gets sent to any servers. We don't collect, store, or transmit any of your input data."
  },
  {
    question: "Do I need to create an account to use OpenKit.tools?",
    answer: "No account required. All tools are instantly accessible without any registration or login. Just visit the tool you need and start using it immediately."
  },
  {
    question: "Can I use OpenKit.tools offline?",
    answer: "Yes! OpenKit.tools works as a Progressive Web App (PWA). After your first visit, you can install it to your device and use most tools offline since they run entirely in your browser."
  },
  {
    question: "What browsers are supported?",
    answer: "OpenKit.tools works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience."
  },
  {
    question: "Can I use OpenKit.tools on mobile devices?",
    answer: "Yes! All tools are fully responsive and work great on mobile phones and tablets. The interface adapts to your screen size for optimal usability."
  },
  {
    question: "How many tools are available on OpenKit.tools?",
    answer: "We currently offer 100+ developer tools across multiple categories including formatters, encoders, generators, converters, text tools, CSS utilities, and more. We regularly add new tools based on community feedback."
  },
  {
    question: "Can I suggest a new tool?",
    answer: "Absolutely! We welcome suggestions for new tools. You can reach out through our GitHub repository or contact us directly. We prioritize tools that would benefit the developer community."
  }
];
