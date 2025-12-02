import CustomModal from '@/components/ui/CustomModal';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import RemoveModal from './RemoveModal';
import RestoreModal from './RestoreModal';

export default function RowActions({ row }: any) {
  const removeDisclosure = useDisclosure();
  const restoreDisclosure = useDisclosure();
  const isUserSuspended = row?.original?.status === 'suspended';
  return (
    <Flex justifyContent={'flex-end'} alignItems={'center'} gap={'1rem'}>
      <Button
        color={'white'}
        fontWeight={500}
        fontFamily={'heading'}
        maxH={'1.2rem'}
        bg={isUserSuspended ? 'gray' : '#D0021B'}
        fontSize={'.7rem'}
        _hover={{ bg: isUserSuspended ? 'gray' : '#D0021B' }}
        onClick={
          isUserSuspended ? restoreDisclosure.onOpen : removeDisclosure.onOpen
        }
        // isDisabled={Boolean(isUserSuspended)}
      >
        {isUserSuspended ? 'Restore' : 'Suspend'}
      </Button>

      <CustomModal
        modalWidth={{ base: '90%', md: '20rem' }}
        isOpen={removeDisclosure.isOpen}
        onClose={removeDisclosure.onClose}
        headertext={'Remove agent'}
      >
        <RemoveModal onClose={removeDisclosure.onClose} row={row} />
      </CustomModal>
      <CustomModal
        modalWidth={{ base: '90%', md: '20rem' }}
        isOpen={restoreDisclosure.isOpen}
        onClose={restoreDisclosure.onClose}
        headertext={'Restore agent'}
      >
        <RestoreModal onClose={restoreDisclosure.onClose} row={row} />
      </CustomModal>
    </Flex>
  );
}
