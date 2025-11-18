"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface OptionListDialogProps {
  isOpen: boolean;
  onClose: () => void;
  columnName: string;
  onAddOptions: (options: string[]) => void;
}

export default function OptionListDialog({
  isOpen,
  onClose,
  columnName,
  onAddOptions,
}: OptionListDialogProps) {
  const [optionsText, setOptionsText] = useState("");
  const [error, setError] = useState("");

  const handleAddOptions = () => {
    if (!optionsText.trim()) {
      setError("Please enter at least one option");
      return;
    }

    // Split by newlines, commas, or semicolons
    const options = optionsText
      .split(/[\n,;]+/)
      .map((option) => option.trim())
      .filter(Boolean);

    if (options.length === 0) {
      setError("No valid options found");
      return;
    }

    onAddOptions(options);
    setOptionsText("");
    setError("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Options List for {columnName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Alert variant="default" className="bg-blue-50">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Enter multiple options separated by commas, semicolons, or new
              lines.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="options-list">Options List</Label>
            <Textarea
              id="options-list"
              value={optionsText}
              onChange={(e) => {
                setOptionsText(e.target.value);
                setError("");
              }}
              placeholder="Option 1&#10;Option 2&#10;Option 3"
              className="min-h-[150px]"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAddOptions}>Add Options</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
