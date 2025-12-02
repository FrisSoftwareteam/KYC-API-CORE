import { useGetAllAgentsHook } from '@/app/dashboard/hooks/useGetAllAgentsHook';
import DateFilterItem from '@/components/elements/datefilter/DateFilterItem';
import CustomInput from '@/components/input/CustomInput';
import CustomSelect from '@/components/input/CustomSelect';
import { stateOptions } from '@/data/options/state';
import { getLastNDaysDates } from '@/utils/date-formater';
import { Box, Button, Divider, Flex, Stack, Text } from '@chakra-ui/react';

type GetAllAgentHookReturnType = ReturnType<typeof useGetAllAgentsHook>;

export default function Filter({
  datesFilter,
  dateRange,
  setDateRange,
  statusOptions,
  handleInputChange,
  tempFilter,
  setTempFilter,
  clearFilter,
  applyFilter,
}: GetAllAgentHookReturnType) {
  const px = '1.4rem';

  return (
    <Box>
      <Text
        pt={'1.8rem'}
        pb={'.8rem'}
        px={px}
        fontFamily={'heading'}
        color={'#4F4F4F'}
        fontSize={'.7rem'}
      >
        Filters
      </Text>

      <Divider borderColor={'#E5E9EC'} />
      <Stack spacing={'1.2rem'} px={px} py={'1.5rem'}>
        <Box>
          <Text mb={'.3rem'} color={'#828282'} fontSize={'.8rem'}>
            Date Range{' '}
          </Text>
          <Flex
            mr={'.7rem'}
            gap={'.8rem'}
            justifyContent={'space-between'}
            flexWrap={'wrap'}
          >
            {datesFilter?.map((item) => {
              const isActive = item.name === dateRange.name;
              return (
                <DateFilterItem
                  key={item.name}
                  item={item.name}
                  onClick={() => {
                    setDateRange(item);
                    const { customEndDate, customStartDate } =
                      getLastNDaysDates(item.value);
                    setTempFilter({
                      ...tempFilter,
                      customEndDate,
                      customStartDate,
                    });
                  }}
                  isActive={isActive}
                />
              );
            })}
          </Flex>
        </Box>
        <Box>
          <Text color={'#828282'} fontSize={'.8rem'}>
            Name
          </Text>
          <Box mt={'.3rem'}>
            <CustomInput
              inputProps={{
                type: 'text',
                placeholder: 'Adewale',
                value: tempFilter.search,
                onChange: handleInputChange,
              }}
              formControlProps={{ isRequired: true }}
            />
          </Box>
        </Box>
        <Box>
          <Text color={'#828282'} fontSize={'.8rem'}>
            Email
          </Text>
          <Box mt={'.3rem'}>
            <CustomInput
              inputProps={{
                type: 'email',
                placeholder: 'test@gmail.com',
                value: tempFilter.email,
                onChange: (e) => {
                  setTempFilter({
                    ...tempFilter,
                    email: e.target.value,
                  });
                },
              }}
              formControlProps={{ isRequired: true }}
            />
          </Box>
        </Box>

        <Box>
          <Text color={'#828282'} fontSize={'.8rem'}>
            State
          </Text>
          <Box mt={'.3rem'}>
            <CustomSelect
              placeholder="Type  search..."
              options={stateOptions}
              onChange={(val) => {
                setTempFilter({
                  ...tempFilter,
                  state: val.value?.toLowerCase(),
                });
              }}
              defaultValue={stateOptions[0]}
            />
          </Box>
        </Box>
        <Box>
          <Text color={'#828282'} fontSize={'.8rem'}>
            Status
          </Text>
          <Box mt={'.3rem'}>
            <CustomSelect
              placeholder="Type  search..."
              options={statusOptions}
              onChange={(val) => {
                setTempFilter({ ...tempFilter, status: val.value });
              }}
              defaultValue={statusOptions[0]}
            />
          </Box>
        </Box>
      </Stack>
      <Divider borderColor={'#E5E9EC'} />
      <Flex
        px={px}
        gap={'1rem'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        py={'1.5rem'}
      >
        <Button
          color={'#4F4F4F'}
          fontSize={'.8rem'}
          maxW={'6rem'}
          variant={'outline'}
          onClick={clearFilter}
        >
          Clear filter
        </Button>
        <Button onClick={applyFilter} fontSize={'.8rem'} maxW={'6rem'}>
          Apply filter
        </Button>
      </Flex>
    </Box>
  );
}
