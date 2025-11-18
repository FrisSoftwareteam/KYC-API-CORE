"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type FormChoice = "text" | "multiple-choice" | "checkboxes";

const QuestionTypes = [
  {
    value: "text",
    label: "Text",
  },
  {
    value: "multiple-choice",
    label: "Multiple Choice",
  },
  {
    value: "checkboxes",
    label: "Checkbox",
  },
] as Array<{
  label: string;
  value: FormChoice;
}>;

type FormQuestionProps = {
  value?: FormChoice;
  onChange: (value: FormChoice) => void;
};

export function FormQuestionTypes({ value, onChange }: FormQuestionProps) {
  const [open, setOpen] = React.useState(false);
  //const [value, setValue] = React.useState(defaultType);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? QuestionTypes.find((question) => question.value === value)?.label
            : "Select framework..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {QuestionTypes.map((questionType: any) => (
                <CommandItem
                  key={questionType.value}
                  value={questionType.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue as FormChoice);
                    setOpen(false);
                  }}
                >
                  {questionType.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === questionType.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
