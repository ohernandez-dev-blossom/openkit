/**
 * Tool FAQ Component
 * FAQ accordion with structured data
 */

import { FAQSchema, type FAQItem } from "@/components/seo/faq-schema";
import { ToolGuideSection } from "./tool-guide-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface ToolFAQProps {
  faqs: FAQItem[];
  title?: string;
  id?: string;
}

export function ToolFAQ({
  faqs,
  title = "Frequently Asked Questions",
  id = "faq"
}: ToolFAQProps) {
  return (
    <>
      <FAQSchema faqs={faqs} />
      <ToolGuideSection title={title} id={id}>
        <Accordion type="single" collapsible className="w-full not-prose">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-foreground hover:text-blue-500">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ToolGuideSection>
    </>
  );
}
