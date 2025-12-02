import React from 'react';
import { Box, Center, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { TabContainer } from './Tabs';
import CustomTable from '@/components/table/CustomTable';
import { assignedcolumnDef, unAssignedcolumnDef } from './columndef';
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import TableHeader from './TableHeader';
import TableFooter from './TableFooter';
import { LogoLoader } from '@/components/elements/loader/Loader';
import { useVerificationsHook } from '@/app/dashboard/hooks/useVerificationsHook';
import { ReactComponent as BadgeSvg } from '@/assets/svg/verification/badge.svg';
import { Permissions } from '@/data/permission';

export const Verifications: React.FC = () => {
  const {
    data,
    isLoading,
    arrayData,
    filter,
    setPagination,
    pagination,
    statusTabs,
    sorting,
    setSorting,
    userHasPermission,
    tabs,
    isPending,
  } = useVerificationsHook();

  return (
    <Box p={'1.5rem'} pb={'10rem'}>
      <Flex pr={'3rem'} alignItems={'center'} justifyContent={'space-between'}>
        <TabContainer tabs={tabs} />
      </Flex>
      {isPending && (
        <HStack gap={'24px'} w={'fit-content'} mb={'16px'}>
          {statusTabs.map(({ isActive, onClick, name, total }) => {
            return (
              <HStack
                key={name}
                cursor={'pointer'}
                onClick={onClick}
                py={'32px'}
                px={'27px'}
                bg={isActive ? '#F5A6231A' : '#EAEAEA'}
                w={'auto'}
                gap={'48px'}
                borderColor={isActive ? '#F5A623B2' : '#D4D4D4'}
                borderWidth={'1px'}
                borderRadius={'4px'}
              >
                <VStack alignItems={'flex-start'}>
                  <Text
                    fontWeight={500}
                    fontSize={'14px'}
                    textTransform={'uppercase'}
                    color={'#828282'}
                  >
                    {`${name} verifications`}
                  </Text>
                  <Text fontWeight={500} fontSize={'24px'}>
                    {total}
                  </Text>
                </VStack>
                <Center
                  h={'56px'}
                  w={'56px'}
                  bg={isActive ? '#F5A62326' : '#D4D4D4B2'}
                  borderRadius={'full'}
                >
                  <BadgeSvg color={isActive ? '#F5A623B2' : '#B6B6B6'} />
                </Center>
              </HStack>
            );
          })}
        </HStack>
      )}

      <Box position={'relative'} bg={'white'}>
        {isLoading ? (
          <LogoLoader h={'40rem'} w={'100%'} />
        ) : (
          <CustomTable
            tableHeader={<TableHeader total={data?.data.meta.total} />}
            sorting={sorting}
            pagination={pagination}
            setSorting={setSorting}
            setPagination={setPagination}
            columnDef={
              filter.status === 'created'
                ? unAssignedcolumnDef(
                    userHasPermission(Permissions.CAN_VIEW_AGENTS_TASK)
                  )
                : assignedcolumnDef(
                    userHasPermission(Permissions.CAN_VIEW_AGENTS_TASK)
                  )
            }
            data={arrayData}
            filter={{
              tableName: 'Recent Service History',
            }}
            total={data?.data.meta.total}
            tableOptions={{
              pageCount: 1,
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
      <TableFooter meta={data?.data?.meta} />
    </Box>
  );
};
