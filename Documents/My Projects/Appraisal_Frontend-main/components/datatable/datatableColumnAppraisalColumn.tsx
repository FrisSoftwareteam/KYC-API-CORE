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
import { Button } from "../ui/button";
import { TimelineDialog } from "../timeline/timeline-dialog";

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

export const datatableColumnAppraisal: ColumnDef<Row>[] = [
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
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="CN" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="w-[70px] capitalize">
  //       <Badges>{row.getValue("id")}</Badges>
  //     </div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "appraisee_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Appraisee Name" />
    ),
    cell: ({ row }) => {
      //const id = row.getValue("id");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row?.getValue("appraisee_name")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "user_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Appraisee Status" />
    ),
    cell: ({ row }) => {
      //const id = row.getValue("id");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row?.getValue("user_status")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "hod_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="HOD Status" />
    ),
    cell: ({ row }) => {
      //const id = row.getValue("id");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row?.getValue("hod_status")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "divisional_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Divisional Head Status" />
    ),
    cell: ({ row }) => {
      //const id = row.getValue("id");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row?.getValue("divisional_status")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "group_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group Head Status" />
    ),
    cell: ({ row }) => {
      //const id = row.getValue("id");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row?.getValue("group_status")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "appraisal_status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Appraisal Committee Status"
      />
    ),
    cell: ({ row }) => {
      //const id = row.getValue("id");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium capitalize">
            {row?.getValue("appraisal_status")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "score",
    header: ({ column }) => <>Score</>,
    cell: ({ row }) => {
      //const id = row.getValue("id");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row?.getValue("score")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "reasons",
    header: ({ column }) => <>Reasons </>,
    cell: ({ row }) => {
      //const id = row.getValue("id");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[700px] truncate font-medium capitalize">
            {row?.getValue("reasons")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => <>Date</>,
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

  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      return <TimelineDialog />;
    },
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
