import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CodeFormatterLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <Skeleton className="h-10 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-2xl mx-auto" />
        </div>
        
        {/* Language Selector */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Skeleton className="h-10 w-48" />
          </CardContent>
        </Card>
        
        {/* Input/Output */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[400px] w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[400px] w-full" />
            </CardContent>
          </Card>
        </div>
        
        {/* Format Button */}
        <div className="mt-6 text-center">
          <Skeleton className="h-12 w-48 mx-auto" />
        </div>
      </div>
    </main>
  );
}
