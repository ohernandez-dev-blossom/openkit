export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-4 w-24 bg-muted rounded mx-auto mb-6 animate-pulse" />
          <div className="h-10 w-64 bg-muted rounded mx-auto mb-3 animate-pulse" />
          <div className="h-5 w-96 bg-muted rounded mx-auto mb-4 animate-pulse" />
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="h-10 bg-muted rounded-lg mb-6 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="p-3 bg-card border border-border rounded-xl animate-pulse"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-muted shrink-0" />
                <div className="flex-1">
                  <div className="h-4 w-32 bg-muted rounded mb-1.5" />
                  <div className="h-3 w-full bg-muted rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
