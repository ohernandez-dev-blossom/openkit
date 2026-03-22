/**
 * HowTo Schema for SEO
 * Provides HowTo structured data for step-by-step instructions
 */

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export interface HowToSchemaProps {
  name: string;
  description?: string;
  steps: HowToStep[];
  toolUrl?: string;
}

export function HowToSchema({ name, description, steps, toolUrl }: HowToSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    ...(description && { "description": description }),
    ...(toolUrl && { "url": toolUrl }),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image })
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
