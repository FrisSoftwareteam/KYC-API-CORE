import CustomSelect from '@/components/input/CustomSelect';
import { itemPerPageOptions } from '@/data/options/pagination';
import { Box, Button, Center, Flex, chakra } from '@chakra-ui/react';
import { useGetAllWithdrawalHook } from '@/app/dashboard/hooks/useGetAllWithdrawalHook';

type GetAllAgentHookReturnType = ReturnType<typeof useGetAllWithdrawalHook>;

export default function TableFooter({
  meta,
  setFilter,
  filter,
}: GetAllAgentHookReturnType) {
  const cannotPrev = meta?.currentPage === 1 || !meta?.prevPage;
  const cannotNext = meta?.currentPage === meta?.lastPage || !meta?.nextPage;

  const handlePrev = () => {
    if (cannotPrev) {
      return;
    }
    setFilter({ ...filter, page: filter.page - 1 });
  };
  const handleNext = () => {
    if (cannotNext) {
      return;
    }
    setFilter({ ...filter, page: filter.page + 1 });
  };
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'flex-end'}
      gap={'.6rem'}
      px={'3rem'}
    >
      <Box>
        <CustomSelect
          placeholder="Type  search..."
          options={itemPerPageOptions}
          onChange={(val) => {
            setFilter({ ...filter, size: Number(val.value), page: 1 });
          }}
          defaultValue={itemPerPageOptions.find(
            (item) => Number(item.value) === Number(filter.size)
          )}
          controlStyle={{ border: '1px solid #4F4F4F' }}
        />
      </Box>
      <Button
        color={'#4F4F4F'}
        fontSize={'.9rem'}
        border="1px solid #4F4F4F"
        bg={'white'}
        rounded={'.4rem'}
        h={'2.5rem'}
        px={'1.5rem'}
        cursor={'pointer'}
        _hover={{ bg: 'white' }}
        _focus={{ border: '1px solid #4F4F4F' }}
        onClick={handlePrev}
        isDisabled={cannotPrev}
      >
        Previous
      </Button>
      <Center
        fontSize={'.9rem'}
        bg={'white'}
        rounded={'.4rem'}
        h={'2.5rem'}
        px={'1rem'}
        cursor={'pointer'}
        gap={'.2rem'}
      >
        <chakra.span color={'#11406F'} fontWeight={700}>
          {meta?.currentPage}
        </chakra.span>
        {meta?.nextPage && (
          <chakra.span
            color={'#B6B6B6'}
            onClick={() =>
              setFilter({ ...filter, page: meta?.nextPage as number })
            }
          >
            {meta?.nextPage}
          </chakra.span>
        )}
        {meta?.nextPage && meta.lastPage !== meta.currentPage + 1 && (
          <chakra.span
            color={'#B6B6B6'}
            onClick={() =>
              setFilter({
                ...filter,
                page: ((meta?.nextPage || 0) + 1) as number,
              })
            }
          >
            {(meta?.nextPage || 0) + 1}
          </chakra.span>
        )}
      </Center>
      <Button
        color={'#4F4F4F'}
        fontSize={'.9rem'}
        border="1px solid #4F4F4F"
        bg={'white'}
        rounded={'.4rem'}
        h={'2.5rem'}
        px={'1.5rem'}
        cursor={'pointer'}
        fontWeight={500}
        _hover={{ bg: 'white' }}
        _focus={{ border: '1px solid #4F4F4F' }}
        onClick={handleNext}
        isDisabled={cannotNext}
      >
        Next
      </Button>
    </Flex>
  );
}
