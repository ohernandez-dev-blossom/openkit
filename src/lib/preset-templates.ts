/**
 * Preset Templates Library
 * Common preset configurations for OpenKit.tools
 */

export interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  toolName: string;
  data: Record<string, unknown>;
  tags: string[];
}

export const PRESET_TEMPLATES: PresetTemplate[] = [
  // JSON Formatter Templates
  {
    id: "json-compact",
    name: "Compact JSON",
    description: "Minified JSON with no spacing",
    toolName: "json-formatter",
    data: {
      indentSize: 0,
    },
    tags: ["json", "minify"],
  },
  {
    id: "json-readable",
    name: "Readable JSON (2 spaces)",
    description: "Human-readable JSON with 2-space indentation",
    toolName: "json-formatter",
    data: {
      indentSize: 2,
    },
    tags: ["json", "format"],
  },
  {
    id: "json-expanded",
    name: "Expanded JSON (4 spaces)",
    description: "Highly readable JSON with 4-space indentation",
    toolName: "json-formatter",
    data: {
      indentSize: 4,
    },
    tags: ["json", "format"],
  },

  // Color Palette Templates
  {
    id: "color-monochrome",
    name: "Monochrome Palette",
    description: "Grayscale color scheme",
    toolName: "colors",
    data: {
      baseColor: "#808080",
      count: 5,
      algorithm: "monochromatic",
    },
    tags: ["color", "grayscale"],
  },
  {
    id: "color-vibrant",
    name: "Vibrant Primary Colors",
    description: "Bold, saturated primary colors",
    toolName: "colors",
    data: {
      baseColor: "#FF3366",
      count: 6,
      algorithm: "complementary",
    },
    tags: ["color", "vibrant"],
  },
  {
    id: "color-pastel",
    name: "Pastel Palette",
    description: "Soft, muted pastel colors",
    toolName: "colors",
    data: {
      baseColor: "#FFB6C1",
      count: 5,
      algorithm: "analogous",
    },
    tags: ["color", "pastel"],
  },

  // API Formatter Templates
  {
    id: "api-rest-get",
    name: "REST GET Request",
    description: "Standard REST GET request format",
    toolName: "api-formatter",
    data: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    },
    tags: ["api", "rest", "get"],
  },
  {
    id: "api-rest-post",
    name: "REST POST Request",
    description: "Standard REST POST request with JSON body",
    toolName: "api-formatter",
    data: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ example: "data" }, null, 2),
    },
    tags: ["api", "rest", "post"],
  },
  {
    id: "api-graphql",
    name: "GraphQL Query",
    description: "GraphQL query format",
    toolName: "api-formatter",
    data: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          query: `query {
  user(id: 1) {
    id
    name
    email
  }
}`,
        },
        null,
        2
      ),
    },
    tags: ["api", "graphql"],
  },

  // Gradient Templates
  {
    id: "gradient-sunset",
    name: "Sunset Gradient",
    description: "Warm sunset colors",
    toolName: "gradient",
    data: {
      colors: ["#FF6B6B", "#FFA500", "#FFD700"],
      direction: 135,
      type: "linear",
    },
    tags: ["gradient", "warm"],
  },
  {
    id: "gradient-ocean",
    name: "Ocean Gradient",
    description: "Cool ocean blue tones",
    toolName: "gradient",
    data: {
      colors: ["#0077BE", "#00C9FF", "#92FE9D"],
      direction: 180,
      type: "linear",
    },
    tags: ["gradient", "cool"],
  },
  {
    id: "gradient-neon",
    name: "Neon Gradient",
    description: "Vibrant neon colors",
    toolName: "gradient",
    data: {
      colors: ["#FF00FF", "#00FFFF", "#FFFF00"],
      direction: 90,
      type: "linear",
    },
    tags: ["gradient", "neon"],
  },

  // Case Converter Templates
  {
    id: "case-snake",
    name: "Snake Case (API)",
    description: "snake_case for API responses",
    toolName: "case",
    data: {
      targetCase: "snake",
    },
    tags: ["case", "api"],
  },
  {
    id: "case-camel",
    name: "Camel Case (JavaScript)",
    description: "camelCase for JavaScript variables",
    toolName: "case",
    data: {
      targetCase: "camel",
    },
    tags: ["case", "javascript"],
  },
  {
    id: "case-pascal",
    name: "Pascal Case (Components)",
    description: "PascalCase for React components",
    toolName: "case",
    data: {
      targetCase: "pascal",
    },
    tags: ["case", "react"],
  },
  {
    id: "case-kebab",
    name: "Kebab Case (URLs)",
    description: "kebab-case for URLs and file names",
    toolName: "case",
    data: {
      targetCase: "kebab",
    },
    tags: ["case", "url"],
  },

  // Slug Generator Templates
  {
    id: "slug-url-friendly",
    name: "URL-Friendly Slug",
    description: "Clean, SEO-friendly URL slug",
    toolName: "slug",
    data: {
      lowercase: true,
      strict: true,
      replacement: "-",
    },
    tags: ["slug", "url", "seo"],
  },
  {
    id: "slug-file-name",
    name: "File Name Slug",
    description: "Safe file name with underscores",
    toolName: "slug",
    data: {
      lowercase: true,
      strict: true,
      replacement: "_",
    },
    tags: ["slug", "file"],
  },
];

/**
 * Get templates for a specific tool
 */
export function getTemplatesForTool(toolName: string): PresetTemplate[] {
  return PRESET_TEMPLATES.filter((t) => t.toolName === toolName);
}

/**
 * Get template by ID
 */
export function getTemplateById(id: string): PresetTemplate | undefined {
  return PRESET_TEMPLATES.find((t) => t.id === id);
}

/**
 * Search templates by tag
 */
export function getTemplatesByTag(tag: string): PresetTemplate[] {
  return PRESET_TEMPLATES.filter((t) => t.tags.includes(tag));
}
