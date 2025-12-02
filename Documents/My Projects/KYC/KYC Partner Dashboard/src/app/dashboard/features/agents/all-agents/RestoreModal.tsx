import { useGetAllAgentApi } from '@/app/dashboard/api/get-all-agent';
import { useRestoreAgentApi } from '@/app/dashboard/api/restore-agent';
import { Button, Divider, Flex, Text, chakra } from '@chakra-ui/react';

export default function RestoreModal({ onClose, row }: any) {
  const { mutateAsync, isLoading } = useRestoreAgentApi();
  const { refetch } = useGetAllAgentApi();
  // console.log("row is ", row);

  const restoreAgent = async () => {
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
        will now be restored. Do you want to Proceed?
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
          onClick={restoreAgent}
          isLoading={isLoading}
          minH={'2.5rem'}
          fontSize={'.9rem'}
          minW={'10rem'}
          bg={'gray'}
          _hover={{ bg: 'gray' }}
        >
          Restore agent
        </Button>
      </Flex>
    </div>
  );
}
