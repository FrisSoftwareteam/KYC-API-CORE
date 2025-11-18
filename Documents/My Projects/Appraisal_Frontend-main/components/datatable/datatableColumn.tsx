"use client";

import { ColumnDef } from "@tanstack/react-table";
//import { Expense } from "./schema";
//import { DataTableColumnHeader } from "./data-table-column-header";
//import { DataTableRowActions } from "./data-table-row-actions";
import {
  // TrendingUp,
  // TrendingDown,
  User,
  // CircleUser,
  // BookOpen,
} from "lucide-react";
// import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./dataHeaderColumn";
// import { DataTableRowActions } from "./datatableRowAction";
import { z } from "zod";
// import { Badge, Group } from "@mantine/core";
import { Badge as Badges } from "@/components/ui/badge";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";

//import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";

export type User = {
  departmentId: number;
  firstName: string;
};

export type Row = {
  controlno: string;
  nameonthedocument: string;
  sourceofthedocument: string;
  jobtypes: string;
  submittedby: string;
  status: string;
  documentcounts: string;
  createdAt: string;
  userClerkId: string;
  user: User;
  //   collapsibleContent: string;
};

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const expenseSchema = z.object({
  id: z.string(),
  label: z.string(),
  note: z.string(),
  category: z.string(),
  type: z.enum(["income", "expense"]),
  amount: z.number(),
  date: z.string(),
});

export type Expense = z.infer<typeof expenseSchema>;

export const datatableColumn: ColumnDef<Row>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CN" />
    ),
    cell: ({ row }) => (
      <div className="w-[70px] capitalize">
        <Badges>{row.getValue("id")}</Badges>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "form_title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Form Title" />
    ),
    cell: ({ row }) => {
      //const id = row.getValue("id");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue("form_title")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      return (
        <div className="flex w-[100px] items-center">
          <span className="capitalize">{formattedDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    },
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     return (
  //       <TooltipProvider>
  //         <div className="flex items-center gap-1">
  //           {row?.original.status === "NEW" ? <></> : null}

  //           {row?.original.status === "SCAN-COMPLETED" && <></>}
  //           {row?.original.status === "NEW" && <></>}
  //           {row?.original.status === "TRANSFERED" ? null : <></>}
  //         </div>
  //       </TooltipProvider>
  //     );
  //   },
  // },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
