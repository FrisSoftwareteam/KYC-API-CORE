import CustomInput from '@/components/input/CustomInput';
import CustomSelect from '@/components/input/CustomSelect';
import { StatusTypeOptions } from '@/data/options/status';
import { categoryOptions } from '@/data/options/verification-type';
import { Box, Button, Divider, Flex, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { VerificationFilterState } from '../../store/verifications/filter';
import { stateOptions } from '@/data/options/state';
import { getLastNDaysDates } from '@/utils/date-formater';
import { datesFilter } from '@/data/datefilter';
import DateFilterItem from '@/components/elements/datefilter/DateFilterItem';

export default function Filter() {
  const [filter, setFilter] = useRecoilState(VerificationFilterState);
  const resetFilter = useResetRecoilState(VerificationFilterState);
  const [tempFilter, setTempFilter] = useState({
    status: filter.status,
    type: filter.type,
    search: filter.search,
    state: filter.state,
    customEndDate: filter.customEndDate,
    customStartDate: filter.customStartDate,
  });

  type DatesFilterType = (typeof datesFilter)[number];
  const [dateRange, setDateRange] = useState<DatesFilterType>({
    name: '30 days',
    value: 30,
  });
  const px = '1.4rem';

  const applyFilter = () => {
    setFilter({ ...filter, ...tempFilter, page: 1 });
  };

  const clearFilter = () => {
    resetFilter();
    setTempFilter({
      status: filter.status,
      type: filter.type,
      search: filter.search,
      state: filter.state,
      customEndDate: filter.customEndDate,
      customStartDate: filter.customStartDate,
    });
  };
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
          <Text color={'#828282'} fontSize={'.8rem'}>
            Date range
          </Text>
          <Flex mt={'.3rem'} justifyContent={'space-between'} flexWrap={'wrap'}>
            {datesFilter?.map((item) => {
              const isActive = item === dateRange;
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
            Category
          </Text>
          <Box mt={'.3rem'}>
            <CustomSelect
              placeholder="Type  search..."
              options={categoryOptions}
              onChange={(val) => {
                setTempFilter({
                  ...tempFilter,
                  type: val.value?.toLowerCase(),
                });
              }}
              defaultValue={categoryOptions.find(
                (item) => item.value === filter.type
              )}
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
              defaultValue={stateOptions.find(
                (item) => item.value === filter.state
              )}
            />
          </Box>
        </Box>
        <Box>
          <Text color={'#828282'} fontSize={'.8rem'}>
            Candidate’s name
          </Text>
          <Box mt={'.3rem'}>
            <CustomInput
              inputProps={{
                value: tempFilter.search,
                onChange: (e) =>
                  setTempFilter({
                    ...tempFilter,
                    search: e.target.value,
                  }),
                type: 'text',
                placeholder: 'Candidate’s name',
              }}
              formControlProps={{ isRequired: true }}
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
              options={StatusTypeOptions}
              onChange={(val) => {
                setTempFilter({
                  ...tempFilter,
                  status: val.value?.toLowerCase(),
                });
              }}
              defaultValue={
                StatusTypeOptions.find(
                  (item) => item.value === filter.status
                ) || StatusTypeOptions[0]
              }
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
