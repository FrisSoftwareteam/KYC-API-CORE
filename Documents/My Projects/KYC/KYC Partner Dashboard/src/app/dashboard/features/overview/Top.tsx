import MetricCard from '@/components/cards/MetricCard';
import DateFilterItem from '@/components/elements/datefilter/DateFilterItem';
import {
  Box,
  Center,
  Divider,
  Flex,
  GridItem,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { LuShieldCheck } from 'react-icons/lu';
import { LuUsers2 } from 'react-icons/lu';
import { useGetPartnerMetricsApi } from '../../api/get-partner-metrics';
import { getLastNDaysDates } from '@/utils/date-formater';
import { datesFilter } from '@/data/datefilter';

export default function Top() {
  type DatesFilterType = (typeof datesFilter)[number];
  const [dateFilter, setDateFilter] = useState<any>({});
  const [dateRange, setDateRange] = useState<DatesFilterType>({
    name: '30 days',
    value: 30,
  });
  const { data: GPMapi, isLoading: GPMloading } =
    useGetPartnerMetricsApi(dateFilter);
  return (
    <Box p={'1.5rem'} bg={'white'}>
      <Flex
        mb={'1.5rem'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Text fontFamily={'heading'} fontWeight={700} fontSize={'1.4rem'}>
          Overview
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
                key={item.value}
                item={item.name}
                onClick={() => {
                  setDateRange(item);

                  const { customEndDate, customStartDate } = getLastNDaysDates(
                    item.value
                  );
                  setDateFilter({ customEndDate, customStartDate });
                }}
                isActive={isActive}
              />
            );
          })}
        </Flex>
      </Flex>
      <SimpleGrid gap={'1.4rem'} columns={3} row={2}>
        <GridItem
          rounded={'.3rem'}
          border="1px solid #EFF4FD"
          h={'100%'}
          gridRow={'span 2'}
        >
          <Box h={'100%'} p={'1.5rem'} bg={'#FFFFFF'} rounded={'.3rem'}>
            <Center
              mb={'2.3rem'}
              h={'4.3rem'}
              w={'4.3rem'}
              rounded={'100%'}
              bg={'#F5A62326'}
            >
              <Icon
                fontSize={'2.3rem'}
                color={'#F5A623B2'}
                as={LuShieldCheck}
              />
            </Center>
            <Text
              color={'#828282'}
              fontSize={'.8rem'}
              fontWeight={500}
              fontFamily={'heading'}
              textTransform={'uppercase'}
              mb={'.7rem'}
            >
              TOTAL PENDING VERIFICATIONS
            </Text>
            <Text
              fontFamily={'heading'}
              color={'#4F4F4F'}
              fontSize={'1.4rem'}
              fontWeight={500}
            >
              {GPMloading ? '...' : GPMapi?.data.totalPendingVerification}
            </Text>
            <Flex
              alignItems={'center'}
              justifyContent={'space-between'}
              mt={'3rem'}
            >
              <Stack>
                <Text
                  color={'#828282'}
                  fontSize={'.8rem'}
                  fontWeight={500}
                  fontFamily={'heading'}
                  textTransform={'uppercase'}
                  mb={'.7rem'}
                >
                  UNASSIGNED
                </Text>
                <Text
                  fontFamily={'heading'}
                  color={'#4F4F4F'}
                  fontSize={'1.4rem'}
                  fontWeight={500}
                >
                  {GPMloading ? '...' : GPMapi?.data.totalUnassignVerification}
                </Text>
              </Stack>
              <Divider
                borderColor={'#D4D4D4'}
                h={'3rem'}
                orientation="vertical"
              />
              <Stack>
                <Text
                  color={'#828282'}
                  fontSize={'.8rem'}
                  fontWeight={500}
                  fontFamily={'heading'}
                  textTransform={'uppercase'}
                  mb={'.7rem'}
                >
                  ASSIGNED
                </Text>
                <Text
                  fontFamily={'heading'}
                  color={'#4F4F4F'}
                  fontSize={'1.4rem'}
                  fontWeight={500}
                >
                  {GPMloading ? '...' : GPMapi?.data.totalAssignedVerification}
                </Text>
              </Stack>
            </Flex>
          </Box>
        </GridItem>
        <GridItem>
          <MetricCard
            name="TOTAL VERIFICATIONS"
            value={GPMloading ? '...' : GPMapi?.data.totalVerifications}
            percentage="+2.7%"
            rate="increase"
            icon={LuShieldCheck}
            iconColor={'rgba(17, 64, 111, 0.7)'}
            iconBg={'rgba(17, 64, 111, 0.15)'}
          />
        </GridItem>
        <GridItem>
          <MetricCard
            name="VERIFICATIONS IN-PROGRESS "
            value={
              GPMloading ? '...' : GPMapi?.data.totalVerificationInProgress
            }
            percentage="+2.7%"
            rate="increase"
            icon={LuShieldCheck}
            iconColor={'#5B8BFFB2'}
            iconBg={'#5B8BFF26'}
          />
        </GridItem>
        <GridItem>
          <MetricCard
            name="COMPLETED VERIFICATIONS"
            value={
              GPMloading ? '...' : GPMapi?.data.totalCompletedVerifications
            }
            percentage="+2.7%"
            rate="decrease"
            icon={LuShieldCheck}
            iconColor={'#00AF94B2'}
            iconBg={'#00AF9426'}
          />
        </GridItem>
        <GridItem>
          <MetricCard
            name="TOTAL AGENTS"
            value={GPMloading ? '...' : GPMapi?.data.totalAgents}
            percentage="+2.7%"
            rate="increase"
            icon={LuUsers2}
            iconColor={'#11406FB2'}
            iconBg={'#11406F26'}
          />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}
