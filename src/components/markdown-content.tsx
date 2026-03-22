/**
 * Markdown Content Component
 * Renders markdown content with beautiful, professional styling
 * Optimized for readability and visual hierarchy
 */

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface MarkdownContentProps {
  content: string;
  className?: string;
}

export function MarkdownContent({ content, className = "" }: MarkdownContentProps) {
  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Paragraphs - optimized line height and spacing
          p: ({ children }) => (
            <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
              {children}
            </p>
          ),

          // H3 headings - clear visual hierarchy
          h3: ({ children }) => (
            <h3 className="text-xl md:text-2xl font-bold mb-4 mt-10 text-foreground tracking-tight flex items-center gap-3">
              <span className="inline-block w-1 h-6 bg-blue-500 rounded-full" />
              {children}
            </h3>
          ),

          // Unordered lists - generous spacing
          ul: ({ children }) => (
            <ul className="space-y-3 mb-8 ml-2">
              {children}
            </ul>
          ),

          // List items - with custom bullet
          li: ({ children }) => (
            <li className="text-muted-foreground leading-relaxed pl-2 relative before:content-[''] before:absolute before:left-[-1rem] before:top-[0.6rem] before:w-1.5 before:h-1.5 before:rounded-full before:bg-blue-500/50 list-none">
              {children}
            </li>
          ),

          // Strong/bold - visual emphasis
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),

          // Inline code - subtle highlight
          code: ({ className, children }) => {
            // Check if it's a code block (has className)
            if (className) {
              return <code className={className}>{children}</code>;
            }
            // Inline code
            return (
              <code className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded text-sm font-mono border border-blue-500/20">
                {children}
              </code>
            );
          },

          // Code blocks - professional styling
          pre: ({ children }) => (
            <pre className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-xl p-6 overflow-x-auto mb-8 shadow-sm">
              {children}
            </pre>
          ),

          // Ordered lists
          ol: ({ children }) => (
            <ol className="space-y-3 mb-8 ml-6 list-decimal marker:text-blue-500 marker:font-semibold">
              {children}
            </ol>
          ),

          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 italic text-muted-foreground bg-blue-500/5 rounded-r-lg">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
