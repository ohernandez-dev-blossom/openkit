"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton variant="circle" width={32} height={32} />
            <Skeleton variant="text" width={200} height={24} />
          </div>
          <Skeleton variant="button" width={80} height={32} />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Preview */}
        <Skeleton variant="card" height={320} />

        {/* Color Stops Bar */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="button" width={60} height={28} />
          </div>
          <Skeleton variant="default" height={48} />
          
          {/* Color stop controls */}
          <div className="space-y-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton variant="circle" width={40} height={40} />
                <Skeleton variant="default" className="flex-1" height={40} />
                <Skeleton variant="text" width={64} height={40} />
                <Skeleton variant="text" width={40} height={40} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Type & Angle/Position */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-4">
            <Skeleton variant="text" width={120} height={18} />
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} variant="button" height={36} />
              ))}
            </div>
            <div className="space-y-3 pt-2">
              <Skeleton variant="text" width={80} height={16} />
              <Skeleton variant="default" height={20} />
            </div>
          </div>

          {/* Export */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-4">
            <Skeleton variant="text" width={100} height={18} />
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} variant="button" height={36} />
              ))}
            </div>
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <Skeleton variant="text" width={80} height={14} />
                <Skeleton variant="button" width={60} height={24} />
              </div>
              <Skeleton variant="default" height={60} />
            </div>
            <Skeleton variant="button" className="w-full" height={44} />
          </div>
        </div>

        {/* Preset Gallery */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton variant="circle" width={16} height={16} />
            <Skeleton variant="text" width={160} height={20} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {Array.from({ length: 15 }).map((_, i) => (
              <Skeleton key={i} variant="card" height={96} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
