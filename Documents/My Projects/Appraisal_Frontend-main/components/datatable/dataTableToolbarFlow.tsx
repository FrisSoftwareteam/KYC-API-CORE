"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { incomeType, statuses } from "./data";
//import { DataTableFacetedFilter } from "./data-table-faceted-filter";
// import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
//import { CalendarDatePicker } from "@/components/calendar-date-picker";
// import { useState } from "react";
//import { DataTableViewOptions } from "./data-table-view-options";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// import { useRouter } from "next/navigation";
import { UploadButton } from "../admin-page-ui/admin-dialog-upload/admin-dialog-upload";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbarFlow<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
  //   from: new Date(new Date().getFullYear(), 0, 1),
  //   to: new Date(),
  // });

  // const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
  //   setDateRange({ from, to });
  //   // Filter table data based on selected date range
  //   table.getColumn("createdAt")?.setFilterValue([from, to]);
  // };

  // const router = useRouter();

  // const handleReload = () => {
  //   router.refresh();
  // };

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center p-3 gap-2">
        <Input
          placeholder="Filter Flow Title"
          value={
            (table.getColumn("flow_title")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) => {
            table.getColumn("flow_title")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          // <DataTableFacetedFilter
          //   column={table.getColumn("status")}
          //   title="Status"
          //  options={statuses}
          // />
          <></>
        )}
        {table.getColumn("type") && (
          // <DataTableFacetedFilter
          //   column={table.getColumn("type")}
          //   title="Type"
          //  // options={""}
          // />
          <></>
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        {/* <CalendarDatePicker
          date={dateRange}
          onDateSelect={handleDateSelect}
          className="h-9 w-[220px]"
          variant="outline"
        /> */}

        {/* <Button variant="outline" className="gap-1">
          <File className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Export
          </span>
        </Button> */}

        {/* <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size={"sm"}
              className="text-sky-900"
              onClick={handleReload}
            >
              <RefreshCcw className="h-4 w-4 text-green-600" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Refresh</p>
          </TooltipContent>
        </Tooltip>  */}

        <Tooltip>
          <TooltipTrigger asChild>
            {/* <Button className="gap-1 bg-sky-900 m-1" onClick={UploadButton}>
            <HardDriveUpload className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Bulk Upload
            </span>
          </Button> */}
            <UploadButton />
          </TooltipTrigger>
          <TooltipContent>
            <p>Add Job(s)</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
