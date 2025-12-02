import {
  Center,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  useDisclosure,
  Text,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { FiFilter } from 'react-icons/fi';
import CustomModal from '@/components/ui/CustomModal';
import AddAgentModal from './AddAgentModal';
import Filter from './Filter';
import { useGetAllAgentsHook } from '@/app/dashboard/hooks/useGetAllAgentsHook';

type GetAllAgentHookReturnType = ReturnType<typeof useGetAllAgentsHook>;

export default function TableHeader(
  useGetAgentsHook: GetAllAgentHookReturnType
) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const addUserDisclosure = useDisclosure();

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
        {useGetAgentsHook.meta?.total} Agents
      </Text>

      <Flex pr={'1.5rem'} gap={'1rem'} alignItems={'center'}>
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
            <Filter {...useGetAgentsHook} />
          </PopoverContent>
        </Popover>
        <Button
          onClick={addUserDisclosure.onOpen}
          fontWeight={500}
          fontFamily={'heading'}
          minH={'2rem'}
          fontSize={'.8rem'}
          maxW={'6rem'}
        >
          Add agent{' '}
        </Button>
      </Flex>

      <CustomModal
        modalWidth={{ base: '90%', md: '20rem' }}
        isOpen={addUserDisclosure.isOpen}
        onClose={addUserDisclosure.onClose}
        headertext={'Add agent'}
      >
        <AddAgentModal onClose={addUserDisclosure.onClose} />
      </CustomModal>
    </Flex>
  );
}
