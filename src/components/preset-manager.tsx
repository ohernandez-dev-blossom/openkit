"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Trash2, Download, Upload, Edit2, Share2 } from "lucide-react";
import { PresetLibrary } from "@/components/preset-library";

export interface PresetData {
  [key: string]: unknown;
}

interface Preset {
  id: string;
  name: string;
  data: PresetData;
  createdAt: number;
}

interface PresetManagerProps {
  toolName: string;
  currentState: PresetData;
  onLoadPreset: (data: PresetData) => void;
  className?: string;
}

export function PresetManager({
  toolName,
  currentState,
  onLoadPreset,
  className = "",
}: PresetManagerProps) {
  const storageKey = `openkit_presets_${toolName}`;

  const [presets, setPresets] = useState<Preset[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Failed to load presets:", error);
    }
    return [];
  });
  const [selectedPresetId, setSelectedPresetId] = useState<string>("");
  const [presetName, setPresetName] = useState("");
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [showRenameInput, setShowRenameInput] = useState(false);
  const [renameValue, setRenameValue] = useState("");
  const [shareUrl, setShareUrl] = useState("");

  // Check URL params for shared preset on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const presetData = params.get("preset");
      if (presetData) {
        const decoded = JSON.parse(atob(presetData));
        onLoadPreset(decoded);
        // Clear URL after loading
        window.history.replaceState({}, "", window.location.pathname);
      }
    } catch (error) {
      console.error("Failed to load preset from URL:", error);
    }
  }, [onLoadPreset]);

  // Save presets to localStorage whenever they change
  const savePresetsToStorage = useCallback(
    (updatedPresets: Preset[]) => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(updatedPresets));
        setPresets(updatedPresets);
      } catch (error) {
        console.error("Failed to save presets:", error);
      }
    },
    [storageKey]
  );

  // Save current state as new preset
  const savePreset = useCallback(() => {
    if (!presetName.trim()) return;

    const newPreset: Preset = {
      id: `preset_${Date.now()}`,
      name: presetName.trim(),
      data: currentState,
      createdAt: Date.now(),
    };

    const updatedPresets = [...presets, newPreset];
    savePresetsToStorage(updatedPresets);
    setPresetName("");
    setShowSaveInput(false);
    setSelectedPresetId(newPreset.id);
  }, [presetName, currentState, presets, savePresetsToStorage]);

  // Load selected preset
  const loadPreset = useCallback(
    (presetId: string) => {
      const preset = presets.find((p) => p.id === presetId);
      if (preset) {
        onLoadPreset(preset.data);
        setSelectedPresetId(presetId);
      }
    },
    [presets, onLoadPreset]
  );

  // Delete selected preset
  const deletePreset = useCallback(() => {
    if (!selectedPresetId) return;

    const updatedPresets = presets.filter((p) => p.id !== selectedPresetId);
    savePresetsToStorage(updatedPresets);
    setSelectedPresetId("");
  }, [selectedPresetId, presets, savePresetsToStorage]);

  // Rename selected preset
  const renamePreset = useCallback(() => {
    if (!selectedPresetId || !renameValue.trim()) return;

    const updatedPresets = presets.map((p) =>
      p.id === selectedPresetId ? { ...p, name: renameValue.trim() } : p
    );
    savePresetsToStorage(updatedPresets);
    setShowRenameInput(false);
    setRenameValue("");
  }, [selectedPresetId, renameValue, presets, savePresetsToStorage]);

  // Export presets as JSON file
  const exportPresets = useCallback(() => {
    const dataStr = JSON.stringify(presets, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${toolName}-presets.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [presets, toolName]);

  // Import presets from JSON file
  const importPresets = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          if (Array.isArray(imported)) {
            // Merge with existing presets, avoiding duplicates
            const mergedPresets = [...presets];
            imported.forEach((preset) => {
              if (!mergedPresets.find((p) => p.id === preset.id)) {
                mergedPresets.push(preset);
              }
            });
            savePresetsToStorage(mergedPresets);
          }
        } catch (error) {
          console.error("Failed to import presets:", error);
          alert("Invalid preset file format");
        }
      };
      reader.readAsText(file);
      event.target.value = ""; // Reset input
    },
    [presets, savePresetsToStorage]
  );

  // Share preset via URL
  const sharePreset = useCallback(() => {
    if (!selectedPresetId) return;
    const preset = presets.find((p) => p.id === selectedPresetId);
    if (!preset) return;

    const encoded = btoa(JSON.stringify(preset.data));
    const url = `${window.location.origin}${window.location.pathname}?preset=${encoded}`;
    setShareUrl(url);
    navigator.clipboard.writeText(url);
  }, [selectedPresetId, presets]);

  // Handle key press in save input
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        savePreset();
      } else if (e.key === "Escape") {
        setShowSaveInput(false);
        setPresetName("");
      }
    },
    [savePreset]
  );

  // Handle key press in rename input
  const handleRenameKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        renamePreset();
      } else if (e.key === "Escape") {
        setShowRenameInput(false);
        setRenameValue("");
      }
    },
    [renamePreset]
  );

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex flex-wrap items-center gap-2">
        {/* Preset Library (Templates) */}
        <PresetLibrary toolName={toolName} onLoadTemplate={onLoadPreset} />

        {/* Load Preset Dropdown */}
        {presets.length > 0 && (
          <Select value={selectedPresetId} onValueChange={loadPreset}>
            <SelectTrigger
              size="sm"
              className="w-[160px] bg-zinc-700 border-border text-white hover:bg-zinc-600"
            >
              <SelectValue placeholder="Load preset..." />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-border">
              {presets.map((preset) => (
                <SelectItem
                  key={preset.id}
                  value={preset.id}
                  className="text-white hover:bg-zinc-700 focus:bg-zinc-700"
                >
                  {preset.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Save Input or Button */}
        {showSaveInput ? (
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Preset name..."
              aria-label="Preset name"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              onKeyDown={handleKeyPress}
              className="h-8 w-[140px] bg-zinc-800 border-border text-white placeholder:text-zinc-400"
              autoFocus
            />
            <Button
              onClick={savePreset}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white h-8"
              disabled={!presetName.trim()}
            >
              <Save className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => {
                setShowSaveInput(false);
                setPresetName("");
              }}
              size="sm"
              variant="ghost"
              className="text-zinc-400 hover:text-foreground h-8"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setShowSaveInput(true)}
            size="sm"
            className="bg-zinc-600 hover:bg-zinc-700 text-white border-0 h-8"
          >
            <Save className="w-4 h-4 mr-1.5" />
            Save
          </Button>
        )}

        {/* Preset Management Buttons */}
        {selectedPresetId && !showRenameInput && (
          <>
            <Button
              onClick={() => {
                const preset = presets.find((p) => p.id === selectedPresetId);
                if (preset) {
                  setRenameValue(preset.name);
                  setShowRenameInput(true);
                }
              }}
              size="sm"
              variant="ghost"
              className="text-zinc-400 hover:text-foreground h-8"
              title="Rename preset"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              onClick={sharePreset}
              size="sm"
              variant="ghost"
              className="text-zinc-400 hover:text-foreground h-8"
              title="Share preset via URL"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              onClick={deletePreset}
              size="sm"
              variant="ghost"
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8"
              title="Delete preset"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </>
        )}

        {/* Export/Import Buttons */}
        {presets.length > 0 && !showSaveInput && !showRenameInput && (
          <>
            <Button
              onClick={exportPresets}
              size="sm"
              variant="ghost"
              className="text-zinc-400 hover:text-foreground h-8"
              title="Export all presets"
            >
              <Download className="w-4 h-4" />
            </Button>
            <label className="cursor-pointer">
              <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:text-white h-8 pointer-events-none"
                title="Import presets"
              >
                <Upload className="w-4 h-4" />
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={importPresets}
                className="hidden"
              />
            </label>
          </>
        )}

        {/* Preset Count Badge */}
        {presets.length > 0 && !showSaveInput && !showRenameInput && (
          <span className="text-xs text-muted-foreground/70 ml-1">
            {presets.length} saved
          </span>
        )}
      </div>

      {/* Rename Input */}
      {showRenameInput && (
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="New name..."
            aria-label="New preset name"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={handleRenameKeyPress}
            className="h-8 w-[160px] bg-zinc-800 border-border text-white placeholder:text-zinc-400"
            autoFocus
          />
          <Button
            onClick={renamePreset}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white h-8"
            disabled={!renameValue.trim()}
          >
            Rename
          </Button>
          <Button
            onClick={() => {
              setShowRenameInput(false);
              setRenameValue("");
            }}
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-white h-8"
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Share URL Feedback */}
      {shareUrl && (
        <div className="flex items-center gap-2 p-2 bg-green-500/10 border border-green-500/30 rounded text-sm text-green-400">
          <span>✓ Link copied to clipboard!</span>
          <Button
            onClick={() => setShareUrl("")}
            size="sm"
            variant="ghost"
            className="text-green-400 hover:text-green-300 h-6 ml-auto"
          >
            Dismiss
          </Button>
        </div>
      )}
    </div>
  );
}
