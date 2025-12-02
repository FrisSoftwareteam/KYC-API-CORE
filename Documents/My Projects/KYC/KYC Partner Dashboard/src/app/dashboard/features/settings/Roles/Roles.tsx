import CustomTable from '@/components/table/CustomTable';
import React from 'react';
import TableHeader from './TableHeader';
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { columnDef } from './columndef';
import { Box } from '@chakra-ui/react';
import { roleData } from '@/data/roles';

export default function Role() {
  const [sorting, setSorting] = React.useState([
    {
      id: 'name',
      desc: true,
    },
  ]);

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  return (
    <div>
      <Box bg={'white'}>
        <CustomTable
          tableHeader={<TableHeader />}
          sorting={sorting}
          pagination={pagination}
          setSorting={setSorting}
          setPagination={setPagination}
          columnDef={columnDef}
          data={roleData?.data?.roles}
          filter={{
            tableName: 'roles',
          }}
          total={roleData?.data?.roles.length || 0}
          tableOptions={{
            pageCount: Math.ceil(
              Number(roleData?.data?.roles.length) / Number(pagination.pageSize)
            ),
            manualPagination: true,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            // getPaginationRowModel: getPaginationRowModel(),
            onPaginationChange: setPagination,
            state: {
              //...
              pagination,
            },
          }}
        />{' '}
      </Box>
    </div>
  );
}
