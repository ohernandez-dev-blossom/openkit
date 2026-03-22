import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function EmailValidatorLoading() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <Skeleton className="h-6 w-44" />
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-card border-border">
            <CardHeader><Skeleton className="h-5 w-36" /></CardHeader>
            <CardContent>
              <Skeleton className="h-[200px] w-full mb-4" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader><Skeleton className="h-5 w-24" /></CardHeader>
            <CardContent><Skeleton className="h-[200px] w-full" /></CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
