/**
 * Use Cases Component
 * Display common use cases for a tool
 */

import { ReactNode } from "react";
import { ToolGuideSection } from "./tool-guide-section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export interface UseCase {
  title: string;
  description: string;
  example?: string;
  icon?: ReactNode;
}

export interface UseCasesProps {
  cases: UseCase[];
  title?: string;
  id?: string;
}

export function UseCases({
  cases,
  title = "Common Use Cases",
  id = "use-cases"
}: UseCasesProps) {
  return (
    <ToolGuideSection title={title} id={id}>
      <div className="grid gap-6 md:grid-cols-2 not-prose">
        {cases.map((useCase, index) => (
          <Card key={index} className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                {useCase.icon && <span className="text-blue-500">{useCase.icon}</span>}
                {useCase.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-3">{useCase.description}</p>
              {useCase.example && (
                <pre className="mt-4 p-4 bg-muted rounded-lg text-sm overflow-x-auto">
                  <code className="text-foreground">{useCase.example}</code>
                </pre>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </ToolGuideSection>
  );
}
