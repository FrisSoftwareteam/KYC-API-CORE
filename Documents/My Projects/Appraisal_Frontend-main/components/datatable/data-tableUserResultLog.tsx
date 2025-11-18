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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

//import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./dataTableToolbar";
import { DataTablePagination } from "./datatablePagination";

//import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTableUserResultLog<TData, TValue>({
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

  // let CollapsibleRowContent = ({ row }: { row: any }) => {
  //   type ScanType = {
  //     id: number;
  //     filename: string;
  //     fileUrl: string;
  //     controlno: string;
  //     filetype: string;
  //   };

  //   let objs: any = _.filter(dataAllScanned, function (o: any) {
  //     // console.log(o);

  //     return o?.controlno === row?.controlno;
  //   });

  //   // console.log(objs);

  //   return (
  //     <td colSpan={12}>
  //       {!_.isEmpty(objs) ? (
  //         <>
  //           <Tables
  //             striped
  //             highlightOnHover
  //             withColumnBorders
  //             //minWidth={800}
  //           >
  //             <Tables verticalSpacing="sm">
  //               <Tables.Thead>
  //                 <Tables.Tr>
  //                   <Tables.Th className="m-3 p-3">FileName</Tables.Th>
  //                   <Tables.Th />
  //                 </Tables.Tr>
  //               </Tables.Thead>

  //               <Tables.Tbody>
  //                 {objs?.map((obj: ScanType) => (
  //                   // {isloadings ? }

  //                   <Tables.Tr key={objs.id}>
  //                     <Tables.Td>
  //                       <Group gap="sm" className="p-2">
  //                         {/* <Avatar size={30} src={item.avatar} radius={30} /> */}
  //                         <Text fz="sm">{obj.filename}</Text>
  //                       </Group>
  //                     </Tables.Td>

  //                     <Tables.Td>
  //                       <Group gap={0} justify="flex-end p-2">
  //                         {Boolean(dataUsersRights?.rights?.viewscan) ===
  //                         true ? (
  //                           <>
  //                             <Dialog>
  //                               <DialogTrigger asChild>
  //                                 <button className="border h-8 w-8 flex items-center justify-center rounded-sm p-2 text-muted-foreground">
  //                                   <Eye />
  //                                 </button>
  //                               </DialogTrigger>
  //                               <DialogContent className="max-w-[899px] bg-muted/10 border-orange-600">
  //                                 <DialogHeader>
  //                                   <DialogDescription></DialogDescription>
  //                                 </DialogHeader>
  //                                 <DatableScanImages url={obj.fileUrl} />
  //                               </DialogContent>
  //                             </Dialog>
  //                           </>
  //                         ) : (
  //                           <></>
  //                         )}

  //                         {/* <Link
  //                           href={obj.fileUrl}
  //                           target="_blank"
  //                           rel="noopener noreferrer"
  //                         ></Link> */}
  //                         {/* <ActionIcon variant="subtle" color="red">
  //                           <IconTrash
  //                             style={{ width: rem(16), height: rem(16) }}
  //                             stroke={1.5}
  //                           />
  //                         </ActionIcon> */}
  //                       </Group>
  //                     </Tables.Td>
  //                   </Tables.Tr>
  //                 ))}
  //               </Tables.Tbody>
  //             </Tables>
  //           </Tables>
  //         </>
  //       ) : (
  //         <Card className="p-10 rounded-md border">No Document uploaded</Card>
  //       )}
  //     </td>
  //   );
  // };

  return (
    <div className="space-y-4">
      {/* <DataTableToolbar table={table} /> */}
      <div className="overflow-y-auto rounded-md border">
        <Table>
          <TableHeader>
            {table?.getHeaderGroups()?.map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-slate-100">
                {headerGroup?.headers.map((header) => (
                  <TableHead
                    className="border border-slate-300 px-4 py-2 text-left font-bold"
                    key={header.id}
                    colSpan={header.colSpan}
                  >
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <>
                  {console.log(index)}
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className="border border-slate-300 px-4 py-2"
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
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
