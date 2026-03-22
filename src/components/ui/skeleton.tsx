import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "default" | "circle" | "card" | "text" | "button";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ 
  className, 
  variant = "default",
  width,
  height 
}: SkeletonProps) {
  const baseStyles = "animate-pulse bg-muted rounded-md";
  
  const variantStyles = {
    default: "",
    circle: "rounded-full",
    card: "rounded-lg",
    text: "h-4 rounded",
    button: "h-10 rounded-md"
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], className)}
      style={style}
      role="status"
      aria-label="Loading..."
    />
  );
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)} role="status" aria-label="Loading text content">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={i === lines - 1 ? "w-3/4" : "w-full"}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("p-4 space-y-3 bg-card border border-border rounded-lg", className)} role="status" aria-label="Loading card">
      <Skeleton variant="text" className="w-1/2 h-6" />
      <SkeletonText lines={3} />
    </div>
  );
}

export function SkeletonGrid({ count = 4, columns = 2, className }: { count?: number; columns?: number; className?: string }) {
  return (
    <div 
      className={cn(`grid grid-cols-1 md:grid-cols-${columns} gap-4`, className)}
      role="status" 
      aria-label="Loading grid"
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
