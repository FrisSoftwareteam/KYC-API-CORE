"use client";

import { ColumnDef } from "@tanstack/react-table";
//import { Expense } from "./schema";
//import { DataTableColumnHeader } from "./data-table-column-header";
//import { DataTableRowActions } from "./data-table-row-actions";
import { BookOpen, ScanEyeIcon, User, ShieldAlert } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./dataHeaderColumn";

import { z } from "zod";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Link from "next/link";

import OrgChartAppraisal from "../reporting-chain-preview/reporting-chain-preview";
import { Badge } from "@mantine/core";

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
  id: string;
  user_email: string;
  //   collapsibleContent: string;
};

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const expenseSchema = z.object({
  id: z.string(),
  divisional_head_name: z.string(),
  note: z.string(),
  category: z.string(),
  type: z.enum(["income", "expense"]),
  amount: z.number(),
  date: z.string(),
});

export type Expense = z.infer<typeof expenseSchema>;

export const datatableColumnManagerLog: ColumnDef<Row>[] = [
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
    accessorKey: "appraisee_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Appraisee Name" />
    ),
    cell: ({ row }) => {
      // const id = row.getValue("id");
      const ids = row.original.id;

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium ">
            <Link href={`/manager/view/${ids}`}>
              {" "}
              {row.getValue("appraisee_name")}{" "}
            </Link>
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "user_email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Appraisee Email" />
    ),
    cell: ({ row }) => {
      // const id = row.getValue("id");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium ">
            {" "}
            {row.getValue("user_email")}{" "}
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
      const status: any = row.getValue("status");

      //   let dept_name: any;
      //   departmental?.map((name: any) => {
      //     // console.log(name);
      //     if (name?.title == "Departmental Head") {
      //       dept_name = name.name;
      //     }
      //   });

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-normal capitalize">
            {status}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "score",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Appraisees' Score " />
    ),
    cell: ({ row }) => {
      const score: any = row.getValue("score");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-normal capitalize">
            <Badge
              color={`${score < 10 ? "red" : score > 70 ? "lime" : "dark"}`}>
              {" "}
              {score}
              {" / 100 "}
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

  //   {
  //     id: "actions",
  //     cell: ({ row }) => {
  //       const email = row.getValue("user_email");

  //       //console.log(email);
  //       return (
  //         <TooltipProvider>
  //           <div className="flex items-center gap-1">
  //             {/* <AdminViewEmployeeeComponent /> */}

  //             <div className="w-[140px] flex flex-row gap-1 truncate">
  //               {/* <Badges> */}{" "}
  //               {/* <div className="flex w-[100px] gap-1 items-center">
  //             {" "}
  //             <RollbackComponent control={control} />
  //           </div> */}
  //               <div className="flex w-[400px] gap-1 items-center">
  //                 {" "}
  //                 <TooltipProvider>
  //                   <Tooltip>
  //                     <TooltipTrigger asChild>
  //                       <div className="flex items-center gap-1">
  //                         <Dialog>
  //                           <DialogTrigger asChild>
  //                             <Button
  //                               asChild
  //                               variant="outline"
  //                               size={"icon"}
  //                               className="text-sky-900"
  //                             >
  //                               <Link
  //                                 href={``}
  //                                 // variant="outline"
  //                                 //W size={"icon"}
  //                                 className="text-sky-900"
  //                               >
  //                                 <ScanEyeIcon className="h-4 w-4 text-blue-900" />
  //                               </Link>
  //                             </Button>
  //                           </DialogTrigger>
  //                           <DialogContent className="max-w-[890px] bg-muted/10 border-blue-900 ">
  //                             <DialogHeader></DialogHeader>
  //                             <div>
  //                               <div className=" items-center ">
  //                                 {/* hehec */}
  //                                 {/* <ReadJobs cn={control} />  */}
  //                                 <OrgChartAppraisal email={email} />
  //                               </div>
  //                             </div>
  //                             {/* <DialogFooter>
  //                       <Button type="submit">Save changes</Button>
  //                     </DialogFooter> */}
  //                           </DialogContent>
  //                         </Dialog>
  //                       </div>
  //                     </TooltipTrigger>
  //                     <TooltipContent>
  //                       <p>Preview Chart</p>
  //                     </TooltipContent>
  //                   </Tooltip>
  //                 </TooltipProvider>
  //               </div>
  //             </div>
  //           </div>
  //         </TooltipProvider>
  //       );
  //     },
  //   },

  {
    id: "actions",
    cell: ({ row }) => {
      let control = row?.original?.controlno;
      let status = row?.original?.status;
      return (
        <TooltipProvider>
          <div className="flex items-center gap-1">
            <CollapsibleTrigger>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size={"icon"}
                    className="text-sky-900">
                    {" "}
                    {/* <BookOpen className="h-4 w-4 text-green-600" /> */}
                    {/* <CircleQuestionMark className="h-4 w-4 text-rose-600" /> */}
                    <ShieldAlert
                      color="#ee1111"
                      className="h-4 w-4 text-rose-600"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Dropdown for uploaded Docs</p>
                </TooltipContent>
              </Tooltip>

              {row.getValue("")}
            </CollapsibleTrigger>
          </div>
        </TooltipProvider>
      );
    },
  },
];
