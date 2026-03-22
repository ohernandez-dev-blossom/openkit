"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Star, X } from "lucide-react";

interface Tool {
  name: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  category: string;
  tags: string[];
}

interface PinnedToolsProps {
  allTools: Tool[];
}

export function PinnedTools({ allTools }: PinnedToolsProps) {
  const [pinned, setPinned] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem("openkit-pinned");
    return saved ? JSON.parse(saved) : [];
  });
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  useEffect(() => {
    // Listen for pin changes
    const handlePinChange = () => {
      const updated = localStorage.getItem("openkit-pinned");
      if (updated) setPinned(JSON.parse(updated));
    };

    window.addEventListener("pinned-tools-changed", handlePinChange);
    return () => window.removeEventListener("pinned-tools-changed", handlePinChange);
  }, []);

  const removePin = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    const newPinned = pinned.filter((p) => p !== href);
    setPinned(newPinned);
    localStorage.setItem("openkit-pinned", JSON.stringify(newPinned));
    window.dispatchEvent(new CustomEvent("pinned-tools-changed"));
  };

  const handleDragStart = (href: string) => {
    setDraggedItem(href);
  };

  const handleDragOver = (e: React.DragEvent, targetHref: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetHref) return;

    const dragIndex = pinned.indexOf(draggedItem);
    const targetIndex = pinned.indexOf(targetHref);

    if (dragIndex === -1 || targetIndex === -1) return;

    const newPinned = [...pinned];
    newPinned.splice(dragIndex, 1);
    newPinned.splice(targetIndex, 0, draggedItem);

    setPinned(newPinned);
    localStorage.setItem("openkit-pinned", JSON.stringify(newPinned));
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  // Filter tools that are pinned, preserving the order
  const pinnedTools = pinned
    .map((href) => allTools.find((t) => t.href === href))
    .filter((tool): tool is Tool => tool !== undefined);

  if (pinnedTools.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <h2 className="text-lg font-semibold">Pinned Tools</h2>
          <span className="text-xs text-muted-foreground/70 bg-card/50 px-2 py-0.5 rounded-full">
            {pinnedTools.length}/10
          </span>
        </div>
        {pinnedTools.length > 1 && (
          <p className="text-xs text-muted-foreground/70">Drag to reorder</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {pinnedTools.map((tool) => (
          <div
            key={tool.href}
            draggable
            onDragStart={() => handleDragStart(tool.href)}
            onDragOver={(e) => handleDragOver(e, tool.href)}
            onDragEnd={handleDragEnd}
            className={`group relative p-3 bg-gradient-to-br from-card to-muted/50 border border-border/80 rounded-xl hover:border-border hover:shadow-lg hover:shadow-yellow-500/5 transition-all duration-200 cursor-grab active:cursor-grabbing ${
              draggedItem === tool.href ? "opacity-50 scale-95" : ""
            }`}
          >
            <button
              onClick={(e) => removePin(e, tool.href)}
              className="absolute top-2 right-2 p-1 rounded-md text-muted-foreground/70 hover:text-red-400 hover:bg-red-400/10 transition opacity-0 group-hover:opacity-100 z-10"
              title="Unpin"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <Link href={tool.href} className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg text-white`}
              >
                {tool.icon}
              </div>
              <div className="min-w-0 pr-6">
                <h3 className="font-semibold text-sm mb-0.5 group-hover:text-white transition truncate">
                  {tool.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{tool.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
