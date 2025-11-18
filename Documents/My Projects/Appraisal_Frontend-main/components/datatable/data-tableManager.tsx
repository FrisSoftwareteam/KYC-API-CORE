"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import _ from "lodash";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Table as Tables, Group, Text } from "@mantine/core";
import { Eye } from "lucide-react";

import { Card } from "../ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

//import { DataTablePagination } from "./data-table-pagination";

import { DataTablePagination } from "./datatablePagination";
import { DataTableToolbarManager } from "./dataTableToolbarManager";

//import { DataTableToolbar } from "./data-table-toolbar";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { useGetAnswers } from "@/zustand/store";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTableManager<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const { answer, getAnswer } = useGetAnswers();

  React.useEffect(() => {
    getAnswer();
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  let CollapsibleRowContent = ({ row }: { row: any }) => {
    type AnswerResponse = {
      id: number;
      filename: string;
      reasons: string;
      controlno: string;
      filetype: string;
    };

    let objs: any = _.filter(answer, function (o: any) {
      // console.log(o);

      return o?.id === row?.id;
    });

    // console.log(objs);

    return (
      <td colSpan={12}>
        {!_.isEmpty(objs) ? (
          <>
            <Tables
              striped
              highlightOnHover
              withColumnBorders
              //minWidth={800}
            >
              <Tables verticalSpacing="sm">
                <Tables.Thead>
                  <Tables.Tr>
                    <Tables.Th className="m-3 p-3">Decision(s)</Tables.Th>
                    <Tables.Th />
                  </Tables.Tr>
                </Tables.Thead>

                <Tables.Tbody>
                  {objs?.map((obj: AnswerResponse) => (
                    // {isloadings ? }

                    <Tables.Tr key={objs.id}>
                      <Tables.Td>
                        <Group gap="sm" className="p-2">
                          {/* <Avatar size={30} src={item.avatar} radius={30} /> */}
                          <Text fz="sm">{obj.reasons}</Text>
                        </Group>
                      </Tables.Td>

                      <Tables.Td>
                        <Group gap={0} justify="flex-end p-2">
                          <></>
                        </Group>
                      </Tables.Td>
                    </Tables.Tr>
                  ))}
                </Tables.Tbody>
              </Tables>
            </Tables>
          </>
        ) : (
          <Card className="p-10 rounded-md border">
            No Decision/comments/feedback yet
          </Card>
        )}
      </td>
    );
  };

  return (
    <div className="space-y-4">
      <DataTableToolbarManager table={table} />
      <div className="overflow-y-auto rounded-md border">
        <Table>
          <TableHeader>
            {table?.getHeaderGroups()?.map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup?.headers.map((header) => (
                  <TableHead
                    className="px-4 py-2"
                    key={header.id}
                    colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel()?.rows?.length ? (
              table?.getRowModel()?.rows?.map((row, index) => (
                <Collapsible key={index} asChild>
                  <>
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell className="px-4 py-2" key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>

                    <CollapsibleContent className="p-2 bg-slate-200" asChild>
                      <tr>
                        <CollapsibleRowContent row={row?.original} />
                      </tr>
                    </CollapsibleContent>
                  </>
                </Collapsible>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
