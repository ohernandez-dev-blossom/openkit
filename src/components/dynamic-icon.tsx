"use client";

import { ComponentType, lazy, Suspense } from 'react';
import type { LucideProps } from 'lucide-react';

interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  name: string;
  fallback?: React.ReactNode;
}

// Fallback component when icon is not found
const EmptyIcon: ComponentType<LucideProps> = () => null;

/**
 * Dynamic Icon Component
 *
 * Loads lucide-react icons on-demand instead of bundling all icons.
 * Reduces initial bundle size by ~400-500KB.
 *
 * Usage:
 *   <DynamicIcon name="Braces" size={20} />
 *   <DynamicIcon name="Palette" className="w-5 h-5" />
 *
 * Note: Icon names must be PascalCase (e.g., "Braces", "DollarSign")
 */
const DynamicIcon = ({ name, fallback, ...props }: DynamicIconProps) => {
  const Icon = lazy<ComponentType<LucideProps>>(() =>
    import('lucide-react')
      .then((mod): { default: ComponentType<LucideProps> } => {
        const IconComponent = mod[name as keyof typeof mod] as ComponentType<LucideProps>;
        if (!IconComponent) {
          console.warn(`Icon "${name}" not found in lucide-react`);
          return { default: EmptyIcon };
        }
        return { default: IconComponent };
      })
      .catch((err): { default: ComponentType<LucideProps> } => {
        console.error(`Failed to load icon "${name}":`, err);
        return { default: EmptyIcon };
      })
  );
  
  return (
    <Suspense fallback={fallback || <div className="w-5 h-5" />}>
      <Icon {...props} />
    </Suspense>
  );
};

export default DynamicIcon;
