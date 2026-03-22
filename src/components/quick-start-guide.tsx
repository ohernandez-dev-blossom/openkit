/**
 * Quick Start Guide Component
 * Step-by-step guide for tool usage
 */

import { ReactNode } from "react";
import { ToolGuideSection } from "./tool-guide-section";

export interface QuickStartStep {
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface QuickStartGuideProps {
  steps: QuickStartStep[];
  title?: string;
  id?: string;
}

export function QuickStartGuide({
  steps,
  title = "Quick Start Guide",
  id = "quick-start"
}: QuickStartGuideProps) {
  return (
    <ToolGuideSection title={title} id={id}>
      <ol className="space-y-4 list-none p-0">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              {index + 1}
            </span>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
              <p className="text-muted-foreground m-0">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </ToolGuideSection>
  );
}
