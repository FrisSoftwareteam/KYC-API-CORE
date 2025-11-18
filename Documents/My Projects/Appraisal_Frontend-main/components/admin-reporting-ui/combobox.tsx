"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus, ListPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ComboboxProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  allowCreate?: boolean;
  onCreateOption?: (value: string) => void;
  isUpdating?: boolean;
  columnName?: string;
  onAddOptionsList?: () => void;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  allowCreate = false,
  onCreateOption,
  isUpdating = false,
  columnName,
  onAddOptionsList,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredOptions = React.useMemo(() => {
    if (!searchTerm) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const handleCreateOption = () => {
    if (searchTerm && onCreateOption) {
      onCreateOption(searchTerm);
      onChange(searchTerm);
      setSearchTerm("");
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            isUpdating ? "opacity-70" : ""
          )}
          disabled={disabled}
        >
          <span className="truncate">{value || placeholder}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0"
        align="start"
      >
        <div className="flex flex-col p-2">
          <Input
            placeholder="Search options..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2"
          />
          <ScrollArea className="h-[200px]">
            <div className="space-y-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <Button
                    key={option}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      value === option && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                      setSearchTerm("");
                    }}
                  >
                    {value === option && <Check className="mr-2 h-4 w-4" />}
                    {option}
                  </Button>
                ))
              ) : (
                <div className="py-2 px-1 text-sm text-muted-foreground">
                  No options found
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="mt-2 flex flex-col gap-2">
            {allowCreate && searchTerm && !options.includes(searchTerm) && (
              <Button
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={handleCreateOption}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create "{searchTerm}"
              </Button>
            )}

            {allowCreate && onAddOptionsList && (
              <Button
                variant="secondary"
                className="w-full flex items-center justify-center"
                onClick={() => {
                  onAddOptionsList();
                  setOpen(false);
                }}
              >
                <ListPlus className="mr-2 h-4 w-4" />
                Add Options List
              </Button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
