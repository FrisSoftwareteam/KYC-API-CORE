"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { incomeType, statuses } from "./data";
//import { DataTableFacetedFilter } from "./data-table-faceted-filter";
// import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
//import { CalendarDatePicker } from "@/components/calendar-date-picker";
import { useState } from "react";
//import { DataTableViewOptions } from "./data-table-view-options";
import { DownloadCloud, PlusCircle, RefreshCcw, TrashIcon } from "lucide-react";
import { CalendarDatePicker } from "./calendar/calenderDatePicker";
// import { DataTableFacetedFilter } from "./datatableFaceted";
// import { DataTableViewOptions } from "./dataTableViewOptions";

import { useSwitchMode } from "@/zustand/store";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useRouter } from "next/navigation";
import { UploadButton } from "../admin-page-ui/admin-dialog-upload/admin-dialog-upload";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useQuery } from "@tanstack/react-query";
import { saveAs } from "file-saver";
import UploadFile from "../admin-page-ui/admin-upload-file/admin-upload-file";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const [selectChange, setSelectChange] = useState("ALL");

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    setDateRange({ from, to });
    // Filter table data based on selected date range
    table.getColumn("createdAt")?.setFilterValue([from, to]);
  };

  const router = useRouter();

  const handleReload = () => {
    router.refresh();
  };

  const { isSwitch, switchState } = useSwitchMode();

  // const onChange = async () => {

  //   return data;
  // };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["depart_info"],
    queryFn: async () => {
      try {
        // console.log(selectChange);
        return await fetch(`/api/get-department`)
          .then((res: any) => res.json())
          .then((data: any) => data?.data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const saveFile = () => {
    saveAs(
      "https://drive.google.com/uc?export=download&id=1q9pXQYts4dSP7Owc2u1755lk6gF46k1O",
      "statff_detail.csv"
    );
  };

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center p-3 gap-2">
        <Input
          placeholder="Filter employees' name"
          value={
            (table.getColumn("fullnames")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) => {
            table.getColumn("fullnames")?.setFilterValue(event.target.value);
          }}
          className="h-9 w-[350px] lg:w-[250px]"
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
        {/* {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )} */}
        <CalendarDatePicker
          date={dateRange}
          onDateSelect={handleDateSelect}
          className="h-9 w-[220px]"
          variant="outline"
        />

        {/* <Button variant="outline" className="gap-1">
          <File className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Export
          </span>
        </Button> */}

        <div className="items-center grid w-full max-w-sm  mb-7 gap-1.5">
          <label htmlFor="groupBy" className="font-semibold">
            Filter by Department:
          </label>
          <Select
            value={selectChange}
            onValueChange={(e: any) => {
              // console.log(e);
              setSelectChange(e);
              table.getColumn("department")?.setFilterValue(e);
            }}
          >
            <SelectTrigger id="groupBy" className="w-[340px]">
              <SelectValue placeholder="Select a Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>All</SelectLabel>
                {data?.map((dept: any) => (
                  <SelectItem key={dept?.id} value={dept?.department_name}>
                    {dept?.department_name}
                  </SelectItem>
                ))}
              </SelectGroup>
              {/* <SelectItem value="Mkting Sales & Market Research">
                Mkting Sales & Market Research
              </SelectItem>
              <SelectItem value="Product Mgt & Brand Comms">
                Product Mgt & Brand Comms
              </SelectItem>
              <SelectItem value="New Issue">New Issue</SelectItem>
              <SelectItem value="COO's offfice">COO's offfice</SelectItem>
              <SelectItem value="Information Technology">
                Information Tech.
              </SelectItem>
              <SelectItem value="Compliance">Compliance</SelectItem>
              <SelectItem value="Reconciliation /CSCS Update">
                Reconciliation /CSCS Update
              </SelectItem>
              <SelectItem value="salary">Compliance</SelectItem>
              <SelectItem value="salary">Compliance</SelectItem> */}
            </SelectContent>
          </Select>
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              setSelectChange("");
              table.resetColumnFilters();
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2 p-3">
        {/* <DataTableViewOptions table={table} /> */}
      </div>
      {/* 
      <div className="flex items-center space-x-2">
        <Switch
          onCheckedChange={(e: boolean) => {
            switchState(e);
          }}
          checked={isSwitch}
          id="edit-mode"
        />
        <Label htmlFor="edit-mode">Edit Mode</Label>
      </div> */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="gap-1  bg-lime-900  m-2" onClick={() => {}}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Entries
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add Job(s)</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger>
          {/* <Button className="gap-1 bg-sky-900 m-1" onClick={UploadButton}>
            <HardDriveUpload className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Bulk Upload
            </span>
          </Button> */}
          <UploadButton />
          {/* <UploadFile uuid={""} /> */}
        </TooltipTrigger>
        <TooltipContent>
          <p>Add Job(s)</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className="gap-1 bg-red-800 hover:bg-red-600 m-1"
            onClick={saveFile}
          >
            <DownloadCloud className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Download Template
            </span>
          </Button>
          {/* <UploadButton /> */}
        </TooltipTrigger>
        <TooltipContent>
          <p>Download teamplate for the upload</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
