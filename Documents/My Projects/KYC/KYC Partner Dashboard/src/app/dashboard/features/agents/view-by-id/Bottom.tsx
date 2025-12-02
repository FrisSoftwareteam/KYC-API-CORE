import React, { Fragment } from 'react';
import TableHeader from './TableHeader';
import { LogoLoader } from '@/components/elements/loader/Loader';
import CustomTable from '@/components/table/CustomTable';
import { Flex, Box } from '@chakra-ui/react';
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { columnDef } from './columndef';
import { useAgentVerificationHook } from '@/app/dashboard/hooks/useAgentVerificationHook';
import { TabContainer, TabProps } from './Tabs';
import { Permissions } from '@/data/permission';

export default function Bottom() {
  const { data, isLoading, arrayData, setFilter, filter, userHasPermission } =
    useAgentVerificationHook();
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
  const tabs: TabProps[] = [
    {
      label: 'Pending Verifications',
      isActive: filter.status === 'accepted',
      onClick: () => setFilter({ ...filter, status: 'accepted', page: 1 }),
    },
    {
      label: 'Verifications In-Progress',
      isActive: filter.status === 'inprogress',
      onClick: () => setFilter({ ...filter, status: 'inprogress', page: 1 }),
    },
    {
      label: 'Completed Verifications ',
      isActive: filter.status === 'completed',
      onClick: () => setFilter({ ...filter, status: 'completed', page: 1 }),
    },
  ];
  return (
    <Box p={'1.5rem'} pb={'10rem'}>
      {userHasPermission(Permissions.CAN_VIEW_AGENTS_ACTIVITIES) && (
        <Fragment>
          <Flex
            pr={'3rem'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <TabContainer tabs={tabs} />
          </Flex>

          <Box bg={'white'}>
            {isLoading ? (
              <LogoLoader h={'40rem'} w={'100%'} />
            ) : (
              <CustomTable
                tableHeader={<TableHeader total={data?.data.meta.total} />}
                sorting={sorting}
                pagination={pagination}
                setSorting={setSorting}
                setPagination={setPagination}
                columnDef={columnDef}
                data={arrayData}
                filter={{
                  tableName: 'Recent Service History',
                }}
                total={data?.data.meta.total}
                tableOptions={{
                  pageCount: data?.data?.meta?.lastPage,
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
            )}
          </Box>
        </Fragment>
      )}
    </Box>
  );
}
