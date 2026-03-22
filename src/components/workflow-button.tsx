"use client";

import { Folder, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { WorkflowCollection } from "./workflow-collections";

interface WorkflowButtonProps {
  toolHref: string;
  className?: string;
}

const STORAGE_KEY = "openkit-workflow-collections";

export function WorkflowButton({ toolHref, className = "" }: WorkflowButtonProps) {
  const [collections, setCollections] = useState<WorkflowCollection[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [inCollections, setInCollections] = useState<Set<string>>(new Set());
  const menuRef = useRef<HTMLDivElement>(null);

  // Load collections and check which ones contain this tool
  useEffect(() => {
    const loadCollections = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: WorkflowCollection[] = JSON.parse(stored);
          setCollections(parsed);
          
          // Track which collections contain this tool
          const collectionsWithTool = new Set<string>();
          parsed.forEach((col) => {
            if (col.toolHrefs.includes(toolHref)) {
              collectionsWithTool.add(col.id);
            }
          });
          setInCollections(collectionsWithTool);
        }
      } catch (error) {
        console.error("Failed to load workflow collections:", error);
      }
    };

    loadCollections();

    // Listen for changes
    const handleCollectionChange = () => {
      loadCollections();
    };

    window.addEventListener("workflow-collections-changed", handleCollectionChange);
    return () =>
      window.removeEventListener("workflow-collections-changed", handleCollectionChange);
  }, [toolHref]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const toggleToolInCollection = (e: React.MouseEvent, collectionId: string) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const parsed: WorkflowCollection[] = JSON.parse(stored);
      const updated = parsed.map((col) => {
        if (col.id === collectionId) {
          const hasTool = col.toolHrefs.includes(toolHref);
          return {
            ...col,
            toolHrefs: hasTool
              ? col.toolHrefs.filter((href) => href !== toolHref)
              : [...col.toolHrefs, toolHref],
            updatedAt: Date.now(),
          };
        }
        return col;
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent("workflow-collections-changed"));
      
      // Update local state
      const newInCollections = new Set(inCollections);
      if (newInCollections.has(collectionId)) {
        newInCollections.delete(collectionId);
      } else {
        newInCollections.add(collectionId);
      }
      setInCollections(newInCollections);
    } catch (error) {
      console.error("Failed to update workflow collection:", error);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  if (collections.length === 0) {
    return null; // Don't show button if no collections exist
  }

  const isInAnyCollection = inCollections.size > 0;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={handleButtonClick}
        className={`p-1.5 rounded-lg transition-all duration-150 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          isInAnyCollection
            ? "text-blue-400 bg-blue-400/10 hover:bg-blue-400/20 active:bg-blue-400/30"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/80 active:bg-muted sm:opacity-0 sm:group-hover:opacity-100"
        } ${className}`}
        title={
          isInAnyCollection
            ? `In ${inCollections.size} workflow${inCollections.size > 1 ? "s" : ""}`
            : "Add to workflow"
        }
        aria-label={
          isInAnyCollection
            ? `In ${inCollections.size} workflow${inCollections.size > 1 ? "s" : ""}`
            : "Add to workflow"
        }
      >
        <Folder className={`w-4 h-4 ${isInAnyCollection ? "fill-blue-400" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute top-full left-0 mt-1 bg-muted border border-border/80 rounded-lg shadow-xl z-50 min-w-[200px] overflow-hidden">
          <div className="p-2 border-b border-border/80 bg-card">
            <p className="text-xs text-muted-foreground font-medium">Add to workflow:</p>
          </div>
          <div className="max-h-[240px] overflow-y-auto">
            {collections.map((collection) => {
              const isSelected = inCollections.has(collection.id);
              return (
                <button
                  key={collection.id}
                  onClick={(e) => toggleToolInCollection(e, collection.id)}
                  className="w-full px-3 py-2 text-left hover:bg-muted/80 active:bg-muted transition-all duration-150 flex items-center justify-between gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-white truncate font-medium">
                      {collection.name}
                    </p>
                    {collection.description && (
                      <p className="text-xs text-muted-foreground truncate">
                        {collection.description}
                      </p>
                    )}
                  </div>
                  {isSelected && (
                    <Check className="w-4 h-4 text-blue-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
          {collections.length === 0 && (
            <div className="p-3 text-center">
              <p className="text-xs text-muted-foreground/70">No workflows created yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
