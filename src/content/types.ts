/**
 * Content Types for Tool Guides
 * Shared types for tool content data
 */

import type { FAQItem } from "@/components/seo/faq-schema";
import type { QuickStartStep } from "@/components/quick-start-guide";
import type { UseCase } from "@/components/use-cases";
import type { HowToStep } from "@/components/seo/howto-schema";

export interface ToolGuideContent {
  // Meta
  toolName: string;
  toolPath: string;
  lastUpdated: string;
  version?: string;

  // Quick Start
  quickStartSteps: QuickStartStep[];

  // Introduction section
  introduction: {
    title: string;
    content: string; // Markdown format
  };

  // Use Cases
  useCases: UseCase[];

  // How to Use section
  howToUse: {
    title: string;
    content: string; // Markdown format
    steps: HowToStep[];
  };

  // FAQ
  faqs: FAQItem[];

  // Security & Privacy
  security: {
    title: string;
    content: string; // Markdown format
  };

  // Statistics (optional)
  stats?: {
    [key: string]: string;
  };

  // Features (optional)
  features?: {
    title: string;
    description: string;
  }[];
}
