import { useGetAllUsersApi } from '@/app/dashboard/api/get-al-users';
import { useUnFlagVerification } from '@/app/dashboard/api/unflag-verification';
import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export default function UnFlagModal({ onClose /**row*/ }: any) {
  const { mutateAsync, isLoading } = useUnFlagVerification();
  const { refetch } = useGetAllUsersApi();

  const suspendUser = async () => {
    await mutateAsync('');
    await refetch();
    onClose();
  };

  return (
    <div>
      <Text fontWeight={400}>
        This verification will be <b>unflagged</b> . Do you want to Proceed?
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
          onClick={suspendUser}
          isLoading={isLoading}
          minH={'2.5rem'}
          fontSize={'.9rem'}
          minW={'10rem'}
          bg={'#00AF94'}
          _hover={{ bg: '#00AF94' }}
        >
          Unflag
        </Button>
      </Flex>
    </div>
  );
}
