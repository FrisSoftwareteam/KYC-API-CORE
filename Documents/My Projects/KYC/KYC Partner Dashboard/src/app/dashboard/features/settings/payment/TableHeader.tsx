import {
  Flex,
  useDisclosure,
  Text,
  Center,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import React from 'react';
import { FiFilter } from 'react-icons/fi';
import { useGetAllWithdrawalHook } from '@/app/dashboard/hooks/useGetAllWithdrawalHook';
import Filter from './Filter';

type GetAllWithdrawalHookReturnType = ReturnType<
  typeof useGetAllWithdrawalHook
>;

export default function TableHeader(
  useGetAllWithdrawalHook: GetAllWithdrawalHookReturnType
) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { Withdrawapi } = useGetAllWithdrawalHook;

  return (
    <Flex
      p={'1.8rem'}
      h={'3.5rem'}
      boxShadow="0px 5px 8px 0px #0A00820C"
      alignItems={'center'}
      justifyContent={'space-between'}
      bg={'#FFFFFF'}
    >
      <Text fontWeight={500} fontSize={'.8rem'}>
        {Withdrawapi?.data?.meta?.total} withdrawal
      </Text>

      <Flex
        pr={'1.5rem'}
        gap={'1rem'}
        alignItems={'center'}
        // w={'100%'}
      >
        <Popover
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          placement="bottom"
          closeOnBlur={true}
        >
          <PopoverTrigger>
            <Center h={'1.5rem'} gap={'.3rem'} cursor={'pointer'}>
              <FiFilter fontSize={'.8rem'} />
              <Text fontWeight={500} fontSize={'.7rem'}>
                Fliter
              </Text>
            </Center>
          </PopoverTrigger>
          <PopoverContent
            w={'23rem'}
            mr={'2rem'}
            rounded={'.5rem'}
            border="none !important"
            outline={'none !important'}
            _focusVisible={{
              boxShadow:
                '0px 1px 2px 0px #0000001A, 0px 4px 4px 0px #00000017, 0px 9px 5px 0px #0000000D, 0px 15px 6px 0px #00000003, 0px 24px 7px 0px #00000000, 0px 1px 0px 0px #6867671A, 0px -4px 4px 0px #0000001A', // Apply the specified box shadows
            }}
            boxShadow="0px 1px 2px 0px #0000001A, 0px 4px 4px 0px #00000017, 0px 9px 5px 0px #0000000D, 0px 15px 6px 0px #00000003, 0px 24px 7px 0px #00000000, 0px 1px 0px 0px #6867671A, 0px -4px 4px 0px #0000001A" // Apply the specified box shadows
          >
            <PopoverArrow />
            <Filter {...useGetAllWithdrawalHook} />
          </PopoverContent>
        </Popover>
      </Flex>
    </Flex>
  );
}
