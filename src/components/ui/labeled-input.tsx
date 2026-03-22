import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export type InputProps = React.ComponentProps<"input">

interface LabeledInputProps extends Omit<InputProps, 'id'> {
  /**
   * Label text to display above input
   * If not provided, uses placeholder as aria-label
   */
  label?: string

  /**
   * Hide label visually but keep it for screen readers
   * Useful when label is redundant with visible UI
   */
  hideLabel?: boolean

  /**
   * Error message to display below input
   */
  error?: string

  /**
   * Optional helper text to display below input
   */
  helperText?: string

  /**
   * Optional ID for the input
   * If not provided, a unique ID will be generated
   */
  id?: string

  /**
   * Optional className for the container div
   */
  containerClassName?: string

  /**
   * Optional className for the label element
   */
  labelClassName?: string
}

/**
 * Accessible input component with built-in label support.
 * 
 * Features:
 * - Automatic ID generation for label association
 * - Falls back to aria-label if no visual label
 * - Error state with aria-invalid
 * - Screen-reader-only labels with hideLabel prop
 * - Helper text support
 * 
 * @example
 * // With visible label
 * <LabeledInput label="Email" type="email" placeholder="you@example.com" />
 * 
 * @example
 * // With screen-reader-only label
 * <LabeledInput label="Search" hideLabel placeholder="Search tools..." />
 * 
 * @example
 * // Without label (uses placeholder as aria-label)
 * <LabeledInput placeholder="Enter your name" />
 */
const LabeledInput = React.forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ label, hideLabel, error, helperText, className, id, containerClassName, labelClassName, ...props }, ref) => {
    // Generate unique ID if not provided
    const generatedId = React.useId()
    const inputId = id || `input-${generatedId}`

    // Use label, placeholder, or aria-label as accessible name
    const ariaLabel = !label ? (props.placeholder || props["aria-label"]) : undefined

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <Label
            htmlFor={inputId}
            className={cn(
              hideLabel && "sr-only", // Screen reader only class
              labelClassName
            )}
          >
            {label}
          </Label>
        )}
        
        <Input
          ref={ref}
          id={inputId}
          aria-label={ariaLabel}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            error ? `${inputId}-error` : 
            helperText ? `${inputId}-helper` : 
            undefined
          }
          className={cn(
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
        
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    )
  }
)

LabeledInput.displayName = "LabeledInput"

export { LabeledInput }
export type { LabeledInputProps }
