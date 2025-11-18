"use client";

import { ColumnDef } from "@tanstack/react-table";
//import { Expense } from "./schema";
//import { DataTableColumnHeader } from "./data-table-column-header";
//import { DataTableRowActions } from "./data-table-row-actions";

import { User, ScanEyeIcon } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./dataHeaderColumn";

import { z } from "zod";
import { Badge } from "@mantine/core";
import { Badge as Badges } from "@/components/ui/badge";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import ReadEmployee from "../admin-page-ui/admin-view-employee/admin-view-employee";
import DatatableRowSelect from "./datatableRowSelect/datatableRowSelect";

//import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";

export type User = {
  departmentId: number;
  firstName: string;
};

export type Row = {
  controlno: string;
  id: number;
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

// let show = false;

export const datatableColumnUser: ColumnDef<Row>[] = [
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
    accessorKey: "fullnames",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => {
      // const id = row.getValue("id");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue("fullnames")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "date_of_birth",
    header: "Date of Birth",
    cell: ({ row }) => {
      // const id = row.getValue("id");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue("date_of_birth")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => {
      const department: string = row?.getValue("department");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium ">
            {department}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Users' Role" />
    ),
    cell: ({ row }) => {
      const role: string = row?.getValue("role");
      const id: string = row?.getValue("id");

      return (
        <>
          <DatatableRowSelect role={role} id={id} />
        </>
      );
    },
  },

  {
    accessorKey: "workflow",
    header: "Workflow",
    cell: ({ row }) => {
      const flow: any = row.getValue("workflow");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium ">
            {flow === null ? (
              <Badge variant="filled" color="red">
                {" "}
                Not Assigned
              </Badge>
            ) : (
              <Badge variant="filled" color="lime">
                {" "}
                {flow?.flow_title}
              </Badge>
            )}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "question",
    header: "Question",
    cell: ({ row }) => {
      const flow: any = row.getValue("question");

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium ">
            {flow === null ? (
              <Badge variant="filled" color="red">
                {" "}
                Not Assigned
              </Badge>
            ) : (
              <Badge variant="filled" color="gray">
                {" "}
                Assigned - {flow.form_title}
              </Badge>
            )}
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

  {
    id: "actions",
    cell: ({ row }) => {
      const control = row?.original?.id;

      // console.log(contr)

      // const show = false;
      //const role: string = row?.getValue("role");

      return (
        <TooltipProvider>
          <div className="flex items-center gap-1">
            {/* <AdminViewEmployeeeComponent /> */}

            <div className="w-[140px] flex flex-row gap-1 truncate">
              {/* <Badges> */}{" "}
              {/* <div className="flex w-[100px] gap-1 items-center">
            {" "}
            <RollbackComponent control={control} />
          </div> */}
              <div className="flex w-[100px] gap-1 items-center">
                {" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              asChild
                              variant="outline"
                              size={"icon"}
                              className="text-sky-900"
                            >
                              <Link
                                href={``}
                                // variant="outline"
                                //W size={"icon"}
                                className="text-sky-900"
                              >
                                <ScanEyeIcon className="h-4 w-4 text-blue-900" />
                              </Link>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[890px] bg-muted/10 border-blue-900 ">
                            <DialogHeader></DialogHeader>
                            <div>
                              <div className=" items-center ">
                                {/* hehec */}
                                {/* <ReadJobs cn={control} />  */}
                                <ReadEmployee cn={control} />
                              </div>
                            </div>
                            {/* <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter> */}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View the Document</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild></TooltipTrigger>
                    <TooltipContent>
                      <p>Edit Role</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </TooltipProvider>
      );
    },
  },
];
