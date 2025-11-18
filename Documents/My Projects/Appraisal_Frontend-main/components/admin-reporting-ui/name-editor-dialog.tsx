"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NameEditorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  currentNames: string[];
  onSave: (email: string, names: string[]) => void;
}

export default function NameEditorDialog({
  isOpen,
  onClose,
  email,
  currentNames = [],
  onSave,
}: NameEditorDialogProps) {
  const [names, setNames] = useState<string[]>([]);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");

  // Initialize names when dialog opens
  useEffect(() => {
    if (isOpen) {
      setNames(currentNames || []);
      setNewName("");
      setError("");
    }
  }, [isOpen, currentNames]);

  const handleAddName = () => {
    if (!newName.trim()) {
      setError("Name cannot be empty");
      return;
    }

    if (names.includes(newName.trim())) {
      setError("This name already exists");
      return;
    }

    setNames([...names, newName.trim()]);
    setNewName("");
    setError("");
  };

  const handleRemoveName = (nameToRemove: string) => {
    setNames(names.filter((name) => name !== nameToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddName();
    }
  };

  const handleSave = () => {
    onSave(email, names);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Additional Names for {email}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="new-name">Add a new name</Label>
            <div className="flex gap-2">
              <Input
                id="new-name"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                  setError("");
                }}
                onKeyDown={handleKeyDown}
                placeholder="Enter a name"
                className="flex-1"
              />
              <Button type="button" onClick={handleAddName} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <div className="space-y-2">
            <Label>Current names</Label>
            {names.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No additional names added yet.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[100px]">
                {names.map((name, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-1"
                  >
                    {name}
                    <button
                      onClick={() => handleRemoveName(name)}
                      className="ml-1 rounded-full hover:bg-slate-200 p-0.5"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {name}</span>
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Names</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
