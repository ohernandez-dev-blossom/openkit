"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton variant="circle" width={32} height={32} />
            <Skeleton variant="text" width={150} height={24} />
          </div>
          <Skeleton variant="circle" width={32} height={32} />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Input Area */}
        <div className="space-y-2 mb-4">
          <Skeleton variant="text" width={80} height={16} />
          <Skeleton variant="default" height={128} />
        </div>

        {/* Preset Manager */}
        <div className="mb-4 pb-4 border-b border-border">
          <Skeleton variant="default" height={40} />
        </div>

        {/* Toggle Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-2">
            <Skeleton variant="circle" width={36} height={20} />
            <Skeleton variant="text" width={200} height={16} />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton variant="circle" width={36} height={20} />
            <Skeleton variant="text" width={120} height={16} />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Skeleton variant="button" width={100} height={32} />
            <Skeleton variant="button" width={40} height={32} />
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="p-3 bg-card border border-border rounded-lg space-y-2">
              <Skeleton variant="text" width={80} height={12} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width={60} height={12} />
            </div>
          ))}
        </div>

        {/* Examples Card */}
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          <Skeleton variant="text" width={200} height={24} />
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex gap-2">
              <Skeleton variant="text" width={4} height={16} />
              <Skeleton variant="text" width={120} height={16} />
              <Skeleton variant="text" width={200} height={16} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
