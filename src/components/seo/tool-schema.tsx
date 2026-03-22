/**
 * Tool-specific JSON-LD Schema Component
 * Add this to individual tool pages for enhanced SEO
 */

import { SoftwareApplicationSchema, BreadcrumbSchema } from "./json-ld";

export interface ToolSchemaProps {
  name: string;
  description: string;
  path: string;
  category?: string;
}

export function ToolSchema({ name, description, path }: ToolSchemaProps) {
  const url = `https://openkit.tools${path}`;
  
  const breadcrumbItems = [
    {
      name: "Home",
      url: "https://openkit.tools"
    },
    {
      name: name,
      url: url
    }
  ];

  return (
    <>
      <SoftwareApplicationSchema
        name={name}
        description={description}
        url={url}
        applicationCategory="DeveloperApplication"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
    </>
  );
}
