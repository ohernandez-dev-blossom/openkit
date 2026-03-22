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
            <Skeleton variant="text" width={200} height={24} />
          </div>
          <Skeleton variant="button" width={80} height={32} />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Controls Card */}
        <div className="bg-card border border-border rounded-lg mb-8 p-6 space-y-6">
          <Skeleton variant="text" width={100} height={20} />
          
          {/* Output Type Row */}
          <div className="flex items-center gap-4">
            <Skeleton variant="text" width={60} height={16} />
            <Skeleton variant="button" width={160} height={36} />
          </div>

          {/* Slider */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <Skeleton variant="text" width={50} height={16} />
              <Skeleton variant="text" width={30} height={16} />
            </div>
            <Skeleton variant="default" height={20} />
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-3">
            <Skeleton variant="circle" width={16} height={16} />
            <Skeleton variant="text" width={180} height={16} />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Skeleton variant="button" width={100} height={36} />
            <Skeleton variant="button" width={100} height={36} />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-card rounded-lg border border-border text-center space-y-2">
              <Skeleton variant="text" width={40} height={32} className="mx-auto" />
              <Skeleton variant="text" width={80} height={16} className="mx-auto" />
            </div>
          ))}
        </div>

        {/* Output Card */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <SkeletonText lines={5} />
        </div>
      </div>
    </main>
  );
}

function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
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
