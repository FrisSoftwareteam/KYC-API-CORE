import { useGetAllUsersApi } from '@/app/dashboard/api/get-al-users';
import { useRestoreUserApi } from '@/app/dashboard/api/restore-user';
import { Button, Divider, Flex, Text, chakra } from '@chakra-ui/react';
import React from 'react';

export default function RestoreModal({ onClose, row }: any) {
  const { mutateAsync, isLoading } = useRestoreUserApi();
  const { refetch } = useGetAllUsersApi();
  // console.log("row is ", row);

  const restoreUser = async () => {
    await mutateAsync({ user: row?.original?.user?._id as string });
    await refetch();
    onClose();
  };

  return (
    <div>
      <Text fontWeight={400}>
        <chakra.span fontStyle={'italic'} fontWeight={500}>
          {row?.original?.user?.firstName} {row?.original?.user?.lastName}
        </chakra.span>{' '}
        will now be able to access your dashboard. Do you want to Proceed?
      </Text>
      <Divider mt={'1rem'} borderColor={'#EFF4FD'} />
      <Flex
        gap={'1rem'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        py={'2rem'}
      >
        <Button
          color={'#4F4F4F'}
          fontSize={'.9rem'}
          maxW={'6rem'}
          variant={'outline'}
          minH={'2.5rem'}
        >
          Cancel
        </Button>
        <Button
          onClick={restoreUser}
          isLoading={isLoading}
          minH={'2.5rem'}
          fontSize={'.9rem'}
          minW={'10rem'}
          bg={'gray'}
          _hover={{ bg: 'gray' }}
        >
          Restore user
        </Button>
      </Flex>
    </div>
  );
}
