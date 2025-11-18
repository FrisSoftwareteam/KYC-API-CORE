import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Field, type FieldProps } from "@/components/field";
// import { FieldPreview } from "./fieldPreview";

export const SortableField = React.memo(({ formField, form }: FieldProps) => {
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
    <Field
      formField={formField}
      form={form}
      ref={setNodeRef}
      style={style}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
    />
  );
});

SortableField.displayName = "SortableField";
