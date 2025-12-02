import CustomModal from '@/components/ui/CustomModal';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import ChangeRoleModal from './ChangeRoleModal';
import RemoveModal from './RemoveModal';
import RestoreModal from './RestoreModal';

export default function RowActions({ row }: any) {
  const updateDisclosure = useDisclosure();
  const removeDisclosure = useDisclosure();
  const restoreDisclosure = useDisclosure();
  const isUserSuspended = row?.original?.status === 'suspended';
  return (
    <Flex justifyContent={'flex-end'} alignItems={'center'} gap={'1rem'}>
      <Button
        color={'#4F4F4F'}
        fontWeight={500}
        fontFamily={'heading'}
        border="1px solid #4F4F4F"
        maxH={'1.2rem'}
        bg={'white'}
        fontSize={'.7rem'}
        _hover={{ bg: 'none' }}
        _focus={{ border: '1px solid #4F4F4F' }}
        onClick={updateDisclosure.onOpen}
        isDisabled={Boolean(isUserSuspended)}
      >
        Change role
      </Button>
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
        isOpen={updateDisclosure.isOpen}
        onClose={updateDisclosure.onClose}
        headertext={'Change role'}
      >
        <ChangeRoleModal onClose={updateDisclosure.onClose} row={row} />
      </CustomModal>
      <CustomModal
        modalWidth={{ base: '90%', md: '20rem' }}
        isOpen={removeDisclosure.isOpen}
        onClose={removeDisclosure.onClose}
        headertext={'Remove user'}
      >
        <RemoveModal onClose={removeDisclosure.onClose} row={row} />
      </CustomModal>
      <CustomModal
        modalWidth={{ base: '90%', md: '20rem' }}
        isOpen={restoreDisclosure.isOpen}
        onClose={restoreDisclosure.onClose}
        headertext={'Restore user'}
      >
        <RestoreModal onClose={restoreDisclosure.onClose} row={row} />
      </CustomModal>
    </Flex>
  );
}
