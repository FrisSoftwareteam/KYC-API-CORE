"use client";
import * as React from "react";

import { GripVertical } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

import type { FormField as FormFieldType } from "@/types/field";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { renderFormFieldComponent } from "@/components/render-form-field-component";

export interface FieldProps {
  formField: FormFieldType;
  form?: UseFormReturn<
    {
      [x: string]: any;
    },
    any,
    undefined
  >;
  style?: React.CSSProperties;
  isDragging?: boolean;
}

// const selector = (state: FormState) => ({
//   deleteFormField: state.deleteFormField,
//   setSelectedFormField: state.setSelectedFormField,
//   setIsEditFormFieldOpen: state.setIsEditFormFieldOpen,
// });

export const FieldPreview = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ formField, form, style, isDragging, ...props }, ref) => {
    // const { deleteFormField, setSelectedFormField, setIsEditFormFieldOpen } =
    //   useFormStore(useShallow(selector));

    return (
      <div
        className={cn(
          "group relative flex items-center gap-2 rounded-md border-2 border-dashed border-transparent",
          {
            "rounded-md border-foreground bg-muted opacity-60": isDragging,
          }
        )}
        style={style}
        ref={ref}
      >
        <div className="absolute -left-12 top-1/2 flex -translate-y-1/2 flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100"></div>
        <div className="w-full">
          <FormField
            control={form?.control}
            name={formField.name}
            render={({ field }) =>
              renderFormFieldComponent({ field, formField })
            }
          />
        </div>
        <Button
          size="icon"
          variant="ghost"
          type="button"
          {...props}
          className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <GripVertical className="size-4" />
        </Button>
      </div>
    );
  }
);

FieldPreview.displayName = "FieldPreview";
