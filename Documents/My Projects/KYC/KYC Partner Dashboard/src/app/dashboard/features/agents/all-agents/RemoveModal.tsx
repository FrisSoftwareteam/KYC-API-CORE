import { useGetAllAgentApi } from '@/app/dashboard/api/get-all-agent';
import { useSuspendAgentApi } from '@/app/dashboard/api/suspend-agent';
import { Button, Divider, Flex, Text, chakra } from '@chakra-ui/react';
import React from 'react';

export default function RemoveModal({ onClose, row }: any) {
  const { mutateAsync, isLoading } = useSuspendAgentApi();
  const { refetch } = useGetAllAgentApi();

  const suspendAgent = async () => {
    await mutateAsync(row?.original?._id);
    await refetch();
    onClose();
  };

  return (
    <div>
      <Text fontWeight={400}>
        <chakra.span fontStyle={'italic'} fontWeight={500}>
          {row?.original?.user?.firstName} {row?.original?.user?.lastName}
        </chakra.span>{' '}
        will be suspended. Do you want to Proceed?
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
          onClick={suspendAgent}
          isLoading={isLoading}
          minH={'2.5rem'}
          fontSize={'.9rem'}
          minW={'10rem'}
          bg={'#D0021B'}
          _hover={{ bg: '#D0021B' }}
        >
          Suspend agent
        </Button>
      </Flex>
    </div>
  );
}
