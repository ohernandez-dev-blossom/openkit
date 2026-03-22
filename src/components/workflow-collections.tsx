"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Folder,
  Plus,
  Edit,
  Trash2,
  Share2,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface Tool {
  name: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  category: string;
  tags: string[];
}

export interface WorkflowCollection {
  id: string;
  name: string;
  description?: string;
  toolHrefs: string[];
  createdAt: number;
  updatedAt: number;
}

interface WorkflowCollectionsProps {
  allTools: Tool[];
}

const STORAGE_KEY = "openkit-workflow-collections";

export function WorkflowCollections({ allTools }: WorkflowCollectionsProps) {
  // Load collections from localStorage with lazy initialization
  const [collections, setCollections] = useState<WorkflowCollection[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Failed to load workflow collections:", error);
    }
    return [];
  });

  const [expandedCollections, setExpandedCollections] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [showNewForm, setShowNewForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Listen for changes from other components
  useEffect(() => {
    const handleCollectionChange = () => {
      const updated = localStorage.getItem(STORAGE_KEY);
      if (updated) {
        try {
          setCollections(JSON.parse(updated));
        } catch (error) {
          console.error("Failed to parse updated collections:", error);
        }
      }
    };

    window.addEventListener("workflow-collections-changed", handleCollectionChange);
    return () =>
      window.removeEventListener("workflow-collections-changed", handleCollectionChange);
  }, []);

  // Save collections to localStorage
  const saveCollections = (updatedCollections: WorkflowCollection[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCollections));
      setCollections(updatedCollections);
      window.dispatchEvent(new CustomEvent("workflow-collections-changed"));
    } catch (error) {
      console.error("Failed to save workflow collections:", error);
    }
  };

  // Create new collection
  const createCollection = () => {
    if (!newName.trim()) return;

    const newCollection: WorkflowCollection = {
      id: `workflow_${Date.now()}`,
      name: newName.trim(),
      description: newDescription.trim() || undefined,
      toolHrefs: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    saveCollections([...collections, newCollection]);
    setNewName("");
    setNewDescription("");
    setShowNewForm(false);
    setExpandedCollections(new Set([...expandedCollections, newCollection.id]));
  };

  // Update collection
  const updateCollection = (id: string) => {
    if (!editName.trim()) return;

    const updated = collections.map((col) =>
      col.id === id
        ? {
            ...col,
            name: editName.trim(),
            description: editDescription.trim() || undefined,
            updatedAt: Date.now(),
          }
        : col
    );

    saveCollections(updated);
    setEditingId(null);
    setEditName("");
    setEditDescription("");
  };

  // Delete collection
  const deleteCollection = (id: string) => {
    if (!confirm("Delete this workflow collection?")) return;

    const updated = collections.filter((col) => col.id !== id);
    saveCollections(updated);
    expandedCollections.delete(id);
    setExpandedCollections(new Set(expandedCollections));
  };

  // Toggle expanded state
  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedCollections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCollections(newExpanded);
  };

  // Remove tool from collection
  const removeToolFromCollection = (collectionId: string, toolHref: string) => {
    const updated = collections.map((col) =>
      col.id === collectionId
        ? {
            ...col,
            toolHrefs: col.toolHrefs.filter((href) => href !== toolHref),
            updatedAt: Date.now(),
          }
        : col
    );
    saveCollections(updated);
  };

  // Share collection via URL
  const shareCollection = (collection: WorkflowCollection) => {
    const data = {
      name: collection.name,
      description: collection.description,
      tools: collection.toolHrefs,
    };
    const encoded = btoa(JSON.stringify(data));
    const url = `${window.location.origin}/?workflow=${encoded}`;
    
    navigator.clipboard.writeText(url).then(() => {
      alert("Share link copied to clipboard!");
    }).catch(() => {
      prompt("Copy this link to share:", url);
    });
  };

  // Import collection from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const workflowData = params.get("workflow");

    if (workflowData) {
      try {
        const decoded = JSON.parse(atob(workflowData));
        const imported: WorkflowCollection = {
          id: `workflow_${Date.now()}`,
          name: decoded.name || "Imported Workflow",
          description: decoded.description,
          toolHrefs: decoded.tools || [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        // Check if collection with same name exists and import using functional update
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCollections(currentCollections => {
          const exists = currentCollections.some((col) => col.name === imported.name);
          const importedWithName = exists ? { ...imported, name: `${imported.name} (imported)` } : imported;

          const updated = [...currentCollections, importedWithName];

          // Save to localStorage
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            window.dispatchEvent(new CustomEvent("workflow-collections-changed"));
          } catch (error) {
            console.error("Failed to save imported workflow:", error);
          }

          // Expand the new collection in the same update cycle
          setExpandedCollections(prev => new Set([...prev, importedWithName.id]));

          return updated;
        });

        // Clean URL
        window.history.replaceState({}, "", window.location.pathname);
      } catch (error) {
        console.error("Failed to import workflow:", error);
      }
    }
  }, []);

  if (collections.length === 0 && !showNewForm) {
    return (
      <div className="mb-8 p-6 bg-card/50 border border-border rounded-xl">
        <div className="text-center">
          <Folder className="w-12 h-12 text-muted-foreground/70 mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2">Workflow Collections</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Group tools you frequently use together for quick access
          </p>
          <button
            onClick={() => setShowNewForm(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-2 mx-auto"
          >
            <Plus className="w-4 h-4" />
            Create Your First Workflow
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Folder className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold">Workflow Collections</h2>
          <span className="text-xs text-muted-foreground/70 bg-muted/50 px-2 py-0.5 rounded-full">
            {collections.length}
          </span>
        </div>
        {!showNewForm && (
          <button
            onClick={() => setShowNewForm(true)}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            New Workflow
          </button>
        )}
      </div>

      {/* New Collection Form */}
      {showNewForm && (
        <div className="mb-4 p-4 bg-card border border-border/80 rounded-xl">
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Workflow name (e.g., API Development)"
              aria-label="Workflow name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createCollection()}
              className="w-full px-3 py-2 bg-muted border border-border/80 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <input
              type="text"
              placeholder="Description (optional)"
              aria-label="Workflow description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createCollection()}
              className="w-full px-3 py-2 bg-muted border border-border/80 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={createCollection}
                disabled={!newName.trim()}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-muted/80 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewForm(false);
                  setNewName("");
                  setNewDescription("");
                }}
                className="px-3 py-1.5 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg text-sm transition flex items-center gap-1.5"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Collections List */}
      <div className="space-y-3">
        {collections.map((collection) => {
          const isExpanded = expandedCollections.has(collection.id);
          const isEditing = editingId === collection.id;
          const toolsInCollection = collection.toolHrefs
            .map((href) => allTools.find((t) => t.href === href))
            .filter((tool): tool is Tool => tool !== undefined);

          return (
            <div
              key={collection.id}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              {/* Collection Header */}
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleExpanded(collection.id)}
                    className="mt-1 text-muted-foreground hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded p-0.5"
                    aria-label={isExpanded ? "Collapse workflow" : "Expand workflow"}
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <ChevronRight className="w-5 h-5" aria-hidden="true" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          aria-label="Edit workflow name"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && updateCollection(collection.id)
                          }
                          className="w-full px-3 py-1.5 bg-muted border border-border/80 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                          autoFocus
                        />
                        <input
                          type="text"
                          aria-label="Edit workflow description"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && updateCollection(collection.id)
                          }
                          placeholder="Description (optional)"
                          className="w-full px-3 py-1.5 bg-muted border border-border/80 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateCollection(collection.id)}
                            className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setEditName("");
                              setEditDescription("");
                            }}
                            className="px-2 py-1 bg-zinc-600 hover:bg-zinc-700 text-white rounded text-xs flex items-center gap-1"
                          >
                            <X className="w-3 h-3" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white">
                            {collection.name}
                          </h3>
                          <span className="text-xs text-muted-foreground/70 bg-muted px-2 py-0.5 rounded-full">
                            {collection.toolHrefs.length} tools
                          </span>
                        </div>
                        {collection.description && (
                          <p className="text-sm text-muted-foreground">
                            {collection.description}
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  {!isEditing && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => shareCollection(collection)}
                        className="p-1.5 text-muted-foreground hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="Share workflow collection"
                        title="Share collection"
                      >
                        <Share2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(collection.id);
                          setEditName(collection.name);
                          setEditDescription(collection.description || "");
                        }}
                        className="p-1.5 text-muted-foreground hover:text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="Edit workflow collection"
                        title="Edit collection"
                      >
                        <Edit className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => deleteCollection(collection.id)}
                        className="p-1.5 text-muted-foreground hover:text-red-400 hover:bg-red-400/10 rounded-lg transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label="Delete workflow collection"
                        title="Delete collection"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded Tools List */}
              {isExpanded && (
                <div className="border-t border-border p-4 bg-card/50">
                  {toolsInCollection.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-sm text-muted-foreground/70 mb-2">
                        No tools in this workflow yet
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        Click the <Folder className="w-3 h-3 inline" /> icon on any
                        tool to add it here
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {toolsInCollection.map((tool) => (
                        <div
                          key={tool.href}
                          className="group relative p-3 bg-muted/50 border border-border/80 rounded-lg hover:border-border transition"
                        >
                          <button
                            onClick={() =>
                              removeToolFromCollection(collection.id, tool.href)
                            }
                            className="absolute top-2 right-2 p-1 rounded text-muted-foreground/70 hover:text-red-400 hover:bg-red-400/10 transition opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            aria-label={`Remove ${tool.name} from workflow`}
                            title="Remove from workflow"
                          >
                            <X className="w-3 h-3" aria-hidden="true" />
                          </button>

                          <Link
                            href={tool.href}
                            className="flex items-start gap-2"
                          >
                            <div
                              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center shrink-0 text-white`}
                            >
                              {tool.icon}
                            </div>
                            <div className="min-w-0 pr-6">
                              <h4 className="font-medium text-sm text-white truncate">
                                {tool.name}
                              </h4>
                              <p className="text-xs text-muted-foreground truncate">
                                {tool.description}
                              </p>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Quick Open All Link */}
                  {toolsInCollection.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <button
                        onClick={() => {
                          toolsInCollection.forEach((tool, index) => {
                            setTimeout(() => {
                              window.open(tool.href, "_blank");
                            }, index * 100);
                          });
                        }}
                        className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open all tools in new tabs
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
