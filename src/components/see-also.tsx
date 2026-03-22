import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SeeAlsoProps {
  tools: Array<{
    name: string;
    href: string;
    description: string;
    icon?: string;
  }>;
  title?: string;
  className?: string;
}

/**
 * Inline "See Also" component for contextual internal linking
 * Use this within tool pages to suggest specific related tools at relevant points
 */
export function SeeAlso({ tools, title = "See Also", className = "" }: SeeAlsoProps) {
  if (tools.length === 0) return null;

  return (
    <div className={`my-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-lg ${className}`}>
      <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
        <span>💡</span>
        <span>{title}</span>
      </h3>
      <div className="space-y-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="flex items-start gap-2 p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
          >
            {tool.icon && (
              <span className="text-lg mt-0.5 group-hover:scale-110 transition-transform">
                {tool.icon}
              </span>
            )}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-blue-700 dark:text-blue-300 group-hover:text-blue-600 dark:group-hover:text-blue-200 flex items-center gap-1">
                {tool.name}
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-xs text-blue-600/80 dark:text-blue-400/80 mt-0.5">
                {tool.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
