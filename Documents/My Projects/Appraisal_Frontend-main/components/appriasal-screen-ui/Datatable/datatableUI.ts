import type React from "react";

// Basic DataTable column type used by custom tables
// Provides minimal shape required by current column configs
export type DataTableColumn<T> = {
  id: string;
  header: string;
  accessorKey?: keyof T | string;
  sortable?: boolean;
  searchable?: boolean;
  // Render cell given a row-like object; kept as any to match current usage
  cell?: (row: any) => React.ReactNode;
};
