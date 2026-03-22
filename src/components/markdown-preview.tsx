"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewProps {
  children: string;
  className?: string;
}

/**
 * Markdown Preview Component
 * 
 * Renders markdown with GitHub Flavored Markdown support.
 * This component is lazy-loaded to reduce initial bundle size (~60KB).
 */
export const MarkdownPreview = ({ children, className }: MarkdownPreviewProps) => {
  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {children}
      </ReactMarkdown>
    </div>
  );
};
