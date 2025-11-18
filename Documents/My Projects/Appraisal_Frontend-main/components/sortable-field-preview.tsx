import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { type FieldProps } from "@/components/field";
import { FieldPreview } from "./fieldPreview";

export const SortableFieldPreview = React.memo(
  ({ formField, form }: FieldProps) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: formField.name,
    });

    const style: React.CSSProperties = {
      transform: CSS.Translate.toString(transform),
      transition,
    };

    return (
      <FieldPreview
        formField={formField}
        form={form}
        ref={setNodeRef}
        style={style}
        isDragging={isDragging}
        {...attributes}
        {...listeners}
      />
    );
  }
);

SortableFieldPreview.displayName = "SortableField";
