"use client";

import { ColumnDef } from "@tanstack/react-table";
//import { Expense } from "./schema";
//import { DataTableColumnHeader } from "./data-table-column-header";
//import { DataTableRowActions } from "./data-table-row-actions";
import { BookOpen, User } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./dataHeaderColumn";

import { z } from "zod";
import { Badge } from "@mantine/core";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";

import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";

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
  id: number;
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

export const DatatableColumnUserResultLog: ColumnDef<Row>[] = [
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
  //   {
  //     accessorKey: "id",
  //     header: ({ column }) => (
  //       <DataTableColumnHeader column={column} title="CN" />
  //     ),
  //     cell: ({ row }) => (
  //       <div className="w-[70px] capitalize">
  //         <Badges>{row.getValue("id")}</Badges>
  //       </div>
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    accessorKey: "appraisee_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Appraisee Name" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status");

      const id = row.original.id;

      //console.log(status);

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {status === "PENDING" ? (
              <> {row.getValue("appraisee_name")}</>
            ) : status === "TREATED" ? (
              <>
                <Link href={`/users/comfirmation/${id}`}>
                  <Button variant="link">
                    {" "}
                    {row.getValue("appraisee_name")}{" "}
                  </Button>
                </Link>
              </>
            ) : null}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "staff_score",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Your Score" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue("staff_score")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "hod_score",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="HOD Score" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue("hod_score")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "divisional_score",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Divisional-Head Score" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue("divisional_score")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "group_score",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group-Head Score" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue("group_score")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "appraisal_comitt_score",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Appraisal Committee Score"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue("appraisal_comitt_score")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "appraisal_accept",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Appraisal Acceptance" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue("appraisal_accept")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "score",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Final Score" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue("score")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            <Badge
              color={
                row.getValue("status") === "PENDING"
                  ? "red"
                  : row.getValue("status") === "TREATED"
                  ? "orange"
                  : "orange"
              }>
              {" "}
              {row.getValue("status")}{" "}
            </Badge>
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
  //     let control = row?.original?.controlno;
  //     let status = row?.original?.status;
  //     return (
  //       <TooltipProvider>
  //         <div className="flex items-center gap-1">
  //           <CollapsibleTrigger>
  //             <Tooltip>
  //               <TooltipTrigger asChild>
  //                 <Button
  //                   variant="outline"
  //                   size={"icon"}
  //                   className="text-sky-900">
  //                   {" "}
  //                   <BookOpen className="h-4 w-4 text-green-600" />
  //                 </Button>
  //               </TooltipTrigger>
  //               <TooltipContent>
  //                 <p>Dropdown for uploaded Docs</p>
  //               </TooltipContent>
  //             </Tooltip>

  //             {row.getValue("")}
  //           </CollapsibleTrigger>
  //         </div>
  //       </TooltipProvider>
  //     );
  //   },
  // },
];
