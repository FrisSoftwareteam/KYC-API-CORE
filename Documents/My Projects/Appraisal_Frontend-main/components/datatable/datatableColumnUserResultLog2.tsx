"use client";

import { ColumnDef } from "@tanstack/react-table";
//import { Expense } from "./schema";
//import { DataTableColumnHeader } from "./data-table-column-header";
//import { DataTableRowActions } from "./data-table-row-actions";
import { User } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./dataHeaderColumn";

import { z } from "zod";
import { Badge } from "@mantine/core";
import Link from "next/link";
import { Button } from "../ui/button";
import TriggerButton from "../TriggerButton";
import { DataTableColumn } from "../appriasal-screen-ui/Datatable/datatableUI";

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
  id: string;
  appraisee_name: string;
  user_email: string;
  staff_score: string;
  hod_score: string;
  divisional_score: string;
  group_score: string;
  appraisal_comitt_score: string;
  score: string;
  createdAt: string;

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

// export const DatatableColumnUserResultLog2: ColumnDef<Row>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//         className="translate-y-0.5"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//         className="translate-y-0.5"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   //   {
//   //     accessorKey: "id",
//   //     header: ({ column }) => (
//   //       <DataTableColumnHeader column={column} title="CN" />
//   //     ),
//   //     cell: ({ row }) => (
//   //       <div className="w-[70px] capitalize">
//   //         <Badges>{row.getValue("id")}</Badges>
//   //       </div>
//   //     ),
//   //     enableSorting: false,
//   //     enableHiding: false,
//   //   },
//   {
//     accessorKey: "appraisee_name",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Appraisee Name" />
//     ),
//     cell: ({ row }) => {
//       const status = row.getValue("status");

//       const id = row.original.id;
//       const name: string = row.getValue("appraisee_name");

//       const email = row.original?.user_email;

//       return (
//         <div className="flex space-x-2">
//           <span className="max-w-[500px] truncate font-medium capitalize">
//             {/* {status === "PENDING" ? (
//               <>
//                 {" "}
//                 <TriggerButton />
//               </>
//             ) : status === "TREATED" ? (
//               <>
//                 <Link href={``}>
//                   <TriggerButton />
//                 </Link>
//               </>
//             ) : null} */}
//             <TriggerButton id={id} email={email} name={name} />
//           </span>
//         </div>
//       );
//     },
//   },

//   {
//     accessorKey: "staff_score",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Your Score" />
//     ),
//     cell: ({ row }) => {
//       return (
//         <div className="flex space-x-2">
//           <span className="max-w-[500px] truncate font-medium capitalize">
//             {row.getValue("staff_score")}
//           </span>
//         </div>
//       );
//     },
//   },

//   {
//     accessorKey: "hod_score",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="HOD Score" />
//     ),
//     cell: ({ row }) => {
//       return (
//         <div className="flex space-x-2">
//           <span className="max-w-[500px] truncate font-medium capitalize">
//             {row.getValue("hod_score")}
//           </span>
//         </div>
//       );
//     },
//   },

//   {
//     accessorKey: "divisional_score",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Divisional-Head Score" />
//     ),
//     cell: ({ row }) => {
//       return (
//         <div className="flex space-x-2">
//           <span className="max-w-[500px] truncate font-medium capitalize">
//             {row.getValue("divisional_score")}
//           </span>
//         </div>
//       );
//     },
//   },

//   {
//     accessorKey: "group_score",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Group-Head Score" />
//     ),
//     cell: ({ row }) => {
//       return (
//         <div className="flex space-x-2">
//           <span className="max-w-[500px] truncate font-medium capitalize">
//             {row.getValue("group_score")}
//           </span>
//         </div>
//       );
//     },
//   },

//   {
//     accessorKey: "appraisal_comitt_score",
//     header: ({ column }) => (
//       <DataTableColumnHeader
//         column={column}
//         title="Appraisal Committee Score"
//       />
//     ),
//     cell: ({ row }) => {
//       return (
//         <div className="flex space-x-2">
//           <span className="max-w-[500px] truncate font-medium capitalize">
//             {row.getValue("appraisal_comitt_score")}
//           </span>
//         </div>
//       );
//     },
//   },

//   {
//     accessorKey: "score",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Final Score" />
//     ),
//     cell: ({ row }) => {
//       return (
//         <div className="flex space-x-2">
//           <span className="max-w-[500px] truncate font-medium capitalize">
//             {row.getValue("score")}
//           </span>
//         </div>
//       );
//     },
//   },

//   {
//     accessorKey: "createdAt",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Date" />
//     ),
//     cell: ({ row }) => {
//       const date = new Date(row.getValue("createdAt"));
//       const formattedDate = date.toLocaleDateString("en-US", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       });
//       return (
//         <div className="flex w-[100px] items-center">
//           <span className="capitalize">{formattedDate}</span>
//         </div>
//       );
//     },
//     filterFn: (row, id, value) => {
//       const rowDate = new Date(row.getValue(id));
//       const [startDate, endDate] = value;
//       return rowDate >= startDate && rowDate <= endDate;
//     },
//   },
// ];

export const DatatableColumnUserResultLog2: DataTableColumn<Row>[] = [
  {
    id: "appraisee_name",
    header: "Appraisee Name",
    // accessorKey: "appraisee_name",
    sortable: true,
    searchable: true,
    cell: (row: any) => {
      // const id = row?.original.id;
      //  const name: string = row?.getValue("appraisee_name");

      //const email = row?.original?.user_email;

      // console.log(row?.id);

      return (
        <div>
          <TriggerButton
            id={row?.id}
            email={row?.user_email}
            name={row?.appraisee_name}
          />
        </div>
      );
    },
  },
  {
    id: "staff_score",
    header: "Your Score",
    accessorKey: "staff_score",
    // row.getValue("staff_score")
    //sortable: true,
    cell: (row: any) => (
      <div className="text-center">
        <span className="inline-flex items-center justify-center w-12 h-8 bg-blue-50 text-blue-700 font-semibold text-sm rounded-md border border-blue-200">
          {row?.staff_score}
        </span>
      </div>
    ),
  },
  {
    id: "hod_score",
    header: "HOD Score",
    accessorKey: "hod_score",
    // sortable: true,
    cell: (row: any) => (
      <div className="text-center">
        <span className="inline-flex items-center justify-center w-12 h-8 bg-emerald-50 text-emerald-700 font-semibold text-sm rounded-md border border-emerald-200">
          {row?.hod_score}
        </span>
      </div>
    ),
  },
  {
    id: "divisional_score",
    header: "Divisional Head Score",
    accessorKey: "divisional_score",
    // sortable: true,
    cell: (row: any) => (
      <div className="text-center">
        {row?.divisional_score ? (
          <span className="inline-flex items-center justify-center w-12 h-8 bg-amber-50 text-amber-700 font-semibold text-sm rounded-md border border-amber-200">
            {row?.divisional_score}
          </span>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        )}
      </div>
    ),
  },
  {
    id: "group_score",
    header: "Group Head Score",
    // accessorKey: "group_head_score",
    //   sortable: true,
    cell: (row: any) => (
      <div className="text-center">
        {row?.group_score ? (
          <span className="inline-flex items-center justify-center w-12 h-8 bg-purple-50 text-purple-700 font-semibold text-sm rounded-md border border-purple-200">
            {row?.group_score}
          </span>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        )}
      </div>
    ),
  },
  {
    id: "appraisal_comitt_score",
    header: "Appraisal Committee Score",
    //accessorKey: "appraisal_committee_score",
    // sortable: true,
    cell: (row: any) => (
      <div className="text-center">
        {row?.appraisal_comitt_score ? (
          <span className="inline-flex items-center justify-center w-12 h-8 bg-rose-50 text-rose-700 font-semibold text-sm rounded-md border border-rose-200">
            {row?.appraisal_comitt_score}
          </span>
        ) : (
          <span className="text-muted-foreground text-sm">—</span>
        )}
      </div>
    ),
  },
  {
    id: "score",
    header: "Final Score",
    // accessorKey: "final_score",
    //sortable: true,
    cell: (row: any) => (
      <div className="text-center">
        <span className="inline-flex items-center justify-center w-12 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold text-sm rounded-md shadow-sm">
          {row?.score}
        </span>
      </div>
    ),
  },
];
