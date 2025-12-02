import CustomTable from '@/components/table/CustomTable';
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import { getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import React from 'react';
import { columnDef } from './columndef';
import TableHeader from './TableHeader';

import { LogoLoader } from '@/components/elements/loader/Loader';
import TableFooter from './TableFooter';
import { useGetAllWithdrawalHook } from '@/app/dashboard/hooks/useGetAllWithdrawalHook';
import BankDetails from './BankDetails';
import CustomModal from '@/components/ui/CustomModal';
import WithdrawModal from './WithdrawModal';

export function Payment() {
  const withdrawalHook = useGetAllWithdrawalHook();

  const [sorting, setSorting] = React.useState([
    {
      id: 'name',
      desc: true,
    },
  ]);

  return (
    <Box>
      <Box
        px={'1.5rem'}
        pt={'1.3rem'}
        pb={'1rem'}
        minH={'5vh'}
        bg={'white'}
        rounded={'.4rem'}
        mb={'1rem'}
      >
        <HStack justifyContent={'space-between'} alignItems={'start'}>
          <Box>
            <Flex gap={'5px'}>
              <Text color={'#828282'} fontSize={'sm'} mb={'.7rem'}>
                Account Name:
              </Text>
              <Text color={'#828282'} mb={'.7rem'} fontSize={'smaller'}>
                {withdrawalHook?.GBPapi?.data?.bank?.accountName}
              </Text>
            </Flex>
            <Flex gap={'5px'}>
              <Text color={'#828282'} fontSize={'sm'} mb={'.7rem'}>
                Account Number:
              </Text>
              <Text color={'#828282'} mb={'.7rem'} fontSize={'smaller'}>
                {withdrawalHook?.GBPapi?.data?.bank?.accountNumber}
              </Text>
            </Flex>
            <Flex gap={'5px'}>
              <Text color={'#828282'} fontSize={'sm'} mb={'.7rem'}>
                Bank Name:
              </Text>
              <Text color={'#828282'} mb={'.7rem'} fontSize={'smaller'}>
                {withdrawalHook?.GBPapi?.data?.bank?.bankName}
              </Text>
            </Flex>
          </Box>
          <Box>
            <Text
              color={'#828282'}
              fontSize={'.8rem'}
              fontWeight={500}
              fontFamily={'heading'}
              textTransform={'uppercase'}
              mb={'.7rem'}
            >
              Balance
            </Text>
            <Text
              fontFamily={'heading'}
              color={'#4F4F4F'}
              fontSize={'1.4rem'}
              fontWeight={500}
            >
              {withdrawalHook?.GBPapi?.data?.wallet?.withdrawable || 0}
            </Text>
          </Box>
        </HStack>

        <Flex mt={'1rem'} justifyContent={'flex-end'}>
          <Button
            onClick={withdrawalHook.onOpen}
            fontWeight={500}
            fontFamily={'heading'}
            // minH={'2.5rem'}
          >
            Withdraw
          </Button>
        </Flex>
      </Box>

      {withdrawalHook?.isBankDetailsLoading ? (
        <LogoLoader h={'15rem'} w={'100%'} />
      ) : (
        <BankDetails {...withdrawalHook} />
      )}

      <Box bg={'white'}>
        {withdrawalHook?.Withdrawloading ? (
          <LogoLoader h={'40rem'} w={'100%'} />
        ) : (
          <Box pb={'1rem'}>
            <CustomTable
              tableHeader={<TableHeader {...withdrawalHook} />}
              sorting={sorting}
              pagination={withdrawalHook?.pagination}
              setSorting={setSorting}
              setPagination={withdrawalHook?.setPagination}
              columnDef={columnDef}
              data={withdrawalHook?.Withdrawapi?.data?.transactions || []}
              filter={{
                tableName: 'withdrawal',
              }}
              total={withdrawalHook?.Withdrawapi?.data?.meta?.total || 0}
              tableOptions={{
                pageCount: withdrawalHook?.Withdrawapi?.data?.meta?.currentPage,
                manualPagination: true,
                getCoreRowModel: getCoreRowModel(),
                getPaginationRowModel: getPaginationRowModel(),
                // getPaginationRowModel: getPaginationRowModel(),
                onPaginationChange: withdrawalHook?.setPagination,
                state: {
                  //...
                  pagination: withdrawalHook?.pagination,
                },
              }}
            />
            <TableFooter {...withdrawalHook} />
          </Box>
        )}
      </Box>

      <CustomModal
        modalWidth={{ base: '90%', md: '20rem' }}
        isOpen={withdrawalHook.isOpen}
        onClose={withdrawalHook.onClose}
        headertext={'Withdraw amount'}
      >
        <WithdrawModal {...withdrawalHook} />
      </CustomModal>
    </Box>
  );
}
