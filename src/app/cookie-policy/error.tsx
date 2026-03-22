"use client";

export default function Error() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-muted-foreground">Unable to load the cookie policy page.</p>
      </div>
    </div>
  );
}
