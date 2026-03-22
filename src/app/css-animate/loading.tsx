"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton variant="circle" width={32} height={32} />
            <Skeleton variant="text" width={220} height={24} />
          </div>
          <Skeleton variant="button" width={100} height={36} />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Preset Buttons */}
        <div className="mb-6">
          <Skeleton variant="text" width={150} height={20} className="mb-3" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} variant="button" width={70} height={28} />
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Timeline Card */}
            <div className="bg-card border border-border rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton variant="text" width={80} height={20} />
                <Skeleton variant="button" width={100} height={28} />
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-3 rounded-lg border border-border bg-muted/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton variant="text" width={50} height={24} />
                    <Skeleton variant="text" width={50} height={20} />
                  </div>
                </div>
              ))}
            </div>

            {/* Properties Editor */}
            <div className="bg-card border border-border rounded-xl p-4 space-y-4">
              <Skeleton variant="text" width={180} height={20} />
              
              {/* Transform Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton variant="text" width={80} height={16} />
                  <Skeleton variant="circle" width={16} height={16} />
                </div>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-1">
                    <Skeleton variant="text" width={100} height={14} />
                    <Skeleton variant="default" height={20} />
                    <Skeleton variant="default" height={28} />
                  </div>
                ))}
              </div>
            </div>

            {/* Animation Settings */}
            <div className="bg-card border border-border rounded-xl p-4 space-y-4">
              <Skeleton variant="text" width={140} height={18} />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <Skeleton variant="text" width={100} height={14} />
                  <Skeleton variant="default" height={32} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Live Preview */}
            <div className="bg-card border border-border rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton variant="text" width={100} height={20} />
                <div className="flex gap-2">
                  <Skeleton variant="button" width={60} height={28} />
                  <Skeleton variant="button" width={36} height={28} />
                </div>
              </div>
              <Skeleton variant="default" height={300} />
            </div>

            {/* CSS Output */}
            <div className="bg-card border border-border rounded-xl p-4 space-y-4">
              <Skeleton variant="text" width={120} height={20} />
              <Skeleton variant="default" height={200} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
