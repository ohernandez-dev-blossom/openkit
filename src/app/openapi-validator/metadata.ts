import { Metadata } from "next";

const title = "OpenAPI / Swagger Validator & Viewer - Validate API Specs | OpenKit.tools";
const description = "Validate and inspect OpenAPI 3.x and Swagger 2.0 specifications. Check for errors, view endpoints, schemas, and parameters. Supports JSON and YAML. Client-side only.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["openapi validator", "swagger validator", "openapi 3.0", "openapi 3.1", "swagger 2.0", "api spec validator", "api specification", "openapi editor", "swagger editor", "rest api validator"],
  openGraph: {
    title,
    description,
    url: "https://openkit.tools/openapi-validator",
    siteName: "OpenKit.tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: {
    canonical: "https://openkit.tools/openapi-validator",
  },
};
