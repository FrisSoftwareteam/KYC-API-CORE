"use client";

import { useFormStore } from "@/zustand/form";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useFormState } from "@/zustand/store";

export function ClearForm() {
  const clearFormFields = useFormStore((state) => state.clearFormFields);

  const { formstate } = useFormState();

  return (
    <>
      {formstate && (
        <Button className="ml-auto" size="sm" onClick={clearFormFields}>
          <Trash2 className="size-4" />
          Clear form fields
        </Button>
      )}
    </>
  );
}
