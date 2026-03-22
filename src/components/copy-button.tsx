"use client";

import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { getCopyAriaLabel } from "@/lib/accessibility";

interface CopyButtonProps {
  content: string;
  contentType?: string;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

/**
 * Accessible copy button with proper ARIA labels and visual feedback
 */
export function CopyButton({ 
  content, 
  contentType,
  className,
  variant = "ghost",
  size = "icon"
}: CopyButtonProps) {
  const { isCopied, copy } = useCopyToClipboard({ duration: 1500 });
  
  const ariaLabel = getCopyAriaLabel(contentType);
  
  return (
    <Button
      onClick={() => copy(content)}
      variant={variant}
      size={size}
      className={className}
      aria-label={isCopied ? `${contentType || 'Content'} copied` : ariaLabel}
    >
      {isCopied ? (
        <Check className="w-4 h-4" aria-hidden="true" />
      ) : (
        <Copy className="w-4 h-4" aria-hidden="true" />
      )}
    </Button>
  );
}
