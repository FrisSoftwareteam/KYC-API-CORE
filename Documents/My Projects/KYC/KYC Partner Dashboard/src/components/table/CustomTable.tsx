import {
  Box,
  InputProps,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  chakra,
} from '@chakra-ui/react';
import {
  TableOptions,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { ReactNode } from 'react';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

interface CustomTableProps {
  sorting: any;
  pagination: any;
  setSorting: any;
  setPagination: any;
  columnDef: any;
  data: Array<any> | undefined;
  filter: {
    tableName: string;
    inputProps?: InputProps;
  };
  total?: number;
  tableOptions?: Partial<TableOptions<any>>;
  tableHeader?: ReactNode;
  tableFooter?: ReactNode;
}
export default function CustomTable({
  sorting,
  pagination,
  setSorting,
  setPagination,
  columnDef,
  data = [],

  tableOptions,
  tableHeader,
  tableFooter,
}: CustomTableProps) {
  const table = useReactTable({
    columns: columnDef,
    data,
    getCoreRowModel: getCoreRowModel(),

    onSortingChange: setSorting,
    renderFallbackValue: undefined,
    state: { sorting, pagination },
    onPaginationChange: setPagination,
    ...tableOptions,
  });

  return (
    <Box>
      {tableHeader}
      <Box p={'1.8rem'} pt={'0rem'}>
        <Table variant="unstyled">
          <Thead>
            {table?.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      color={'#606060'}
                      fontFamily={'body'}
                      fontSize={'.8rem'}
                      fontWeight={'500'}
                      textTransform={'uppercase'}
                      px={0}
                      pt={'1.5rem'}
                      borderBottom="1px solid #F7F7FF"
                      pb={'1rem'}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      <chakra.span pl="4">
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === 'desc' ? (
                            <FaSortDown aria-label="sorted descending" />
                          ) : (
                            <FaSortUp aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table?.getRowModel().rows.map((row) => (
              <Tr
                key={row.id}
                color={'black'}
                fontWeight={400}
                mb={4}
                borderBottom="1px solid #F7F7FF"
                fontSize={'.9rem'}
              >
                {row.getVisibleCells().map((cell: any) => {
                  // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                  const meta: any = cell.column.columnDef.meta;
                  return (
                    <Td pl={0} key={cell.id} isNumeric={meta?.isNumeric}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
        {tableFooter}
      </Box>
    </Box>
  );
}
