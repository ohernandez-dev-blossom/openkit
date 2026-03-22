/**
 * Last Updated Component
 * Display when content was last updated (freshness signal)
 */

export interface LastUpdatedProps {
  date: string;
  className?: string;
}

export function LastUpdated({ date, className = "" }: LastUpdatedProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={`text-xs text-muted-foreground border-t border-border pt-4 mt-8 ${className}`}>
      Last updated: <time dateTime={date} className="font-medium">{formattedDate}</time>
    </div>
  );
}
