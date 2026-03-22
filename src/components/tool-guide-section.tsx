/**
 * Tool Guide Section Component
 * Reusable section wrapper for tool guide content
 */

import { ReactNode } from "react";

export interface ToolGuideSectionProps {
  title: string;
  children: ReactNode;
  id?: string;
  level?: 2 | 3;
  className?: string;
}

export function ToolGuideSection({
  title,
  children,
  id,
  level = 2,
  className = ""
}: ToolGuideSectionProps) {
  const headingClasses = level === 2
    ? "text-2xl font-bold mb-4 text-foreground"
    : "text-xl font-semibold mb-3 text-foreground";

  return (
    <section id={id} className={`my-8 ${className}`}>
      {level === 2 ? (
        <h2 className={headingClasses}>{title}</h2>
      ) : (
        <h3 className={headingClasses}>{title}</h3>
      )}
      <div className="prose dark:prose-invert max-w-none text-muted-foreground">
        {children}
      </div>
    </section>
  );
}
