import { LogoLoader } from '@/components/elements/loader/Loader';
import CustomTable from '@/components/table/CustomTable';
import { Box } from '@chakra-ui/react';
import React from 'react';
import { columnDef } from './columndef';
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import TableHeader from './TableHeader';
import { useGetAllAgentsHook } from '@/app/dashboard/hooks/useGetAllAgentsHook';
import TableFooter from './TableFooter';

export default function AllAgents() {
  const useGetAgentsHook = useGetAllAgentsHook();
  const { GAAapi, pagination, setPagination, GAAloading, sorting, setSorting } =
    useGetAgentsHook;

  return (
    <Box mt={'1.8rem'} mx={'1.4rem'}>
      <Box rounded={'.4rem'} overflow={'hidden'} bg={'white'}>
        {GAAloading ? (
          <LogoLoader h={'40rem'} w={'100%'} />
        ) : (
          <Box mb={'5rem'}>
            <CustomTable
              tableHeader={<TableHeader {...useGetAgentsHook} />}
              sorting={sorting}
              pagination={pagination}
              setSorting={setSorting}
              setPagination={setPagination}
              columnDef={columnDef}
              data={GAAapi?.data.agents}
              filter={{
                tableName: 'Users',
              }}
              total={GAAapi?.data.meta.total || 0}
              tableOptions={{
                pageCount: GAAapi?.data.meta.currentPage,
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
            />
            <TableFooter {...useGetAgentsHook} />{' '}
          </Box>
        )}
      </Box>
    </Box>
  );
}
