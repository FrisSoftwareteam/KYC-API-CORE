import CustomInput from '@/components/input/CustomInput';
import CustomSelect from '@/components/input/CustomSelect';
import { StatusTypeOptions } from '@/data/options/status';
import { VerificationTypeOptions } from '@/data/options/verification-type';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function Filter() {
  const datesFilter = ['Today', 'Last 7 days', '30 days', '1 year'] as const;
  type DatesFilterType = (typeof datesFilter)[number];
  const [dateRange, setDateRange] = useState<DatesFilterType>('Last 7 days');
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
          <Text color={'#828282'} fontSize={'.8rem'}>
            Date range
          </Text>
          <Flex mt={'.3rem'} justifyContent={'space-between'} flexWrap={'wrap'}>
            {datesFilter?.map((item) => {
              const isActive = item === dateRange;
              return (
                <Center
                  key={item}
                  fontSize={'.8rem'}
                  cursor={'pointer'}
                  h={'2rem'}
                  px={'.6rem'}
                  rounded={'4px'}
                  fontWeight={isActive ? 500 : 400}
                  border={isActive ? '1px solid #11406F' : '1px solid #DDDDDD'}
                  color={isActive ? '#11406F' : '#828282'}
                  onClick={() => setDateRange}
                >
                  {item}
                </Center>
              );
            })}
          </Flex>
        </Box>
        <Box>
          <Text color={'#828282'} fontSize={'.8rem'}>
            Verification type
          </Text>
          <Box mt={'.3rem'}>
            <CustomSelect
              placeholder="Type  search..."
              options={VerificationTypeOptions}
              onChange={(val) => {
                return val;
              }}
              defaultValue={VerificationTypeOptions[0]}
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
                return val;
              }}
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
        >
          Clear filter
        </Button>
        <Button fontSize={'.8rem'} maxW={'6rem'}>
          Apply filter
        </Button>
      </Flex>
    </Box>
  );
}
