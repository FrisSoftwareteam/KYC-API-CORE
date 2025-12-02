import MetricCard from '@/components/cards/MetricCard';
import {
  Box,
  Center,
  Flex,
  GridItem,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { LuShieldCheck } from 'react-icons/lu';
import { BsLightning } from 'react-icons/bs';
import { LiaDollarSignSolid } from 'react-icons/lia';
import { IAgent } from '@/shared/interface/agent';
import { useGetAgentPerformanceApi } from '@/app/dashboard/api/get-agent-performance';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/app/auth/hooks/useAuth';
import { Permissions } from '@/data/permission';

function MetricItem({ name, value }: { name: string; value: string }) {
  return (
    <Flex alignItems={'center'} justifyContent={'space-between'}>
      <Text
        fontFamily={'heading'}
        fontSize={'.9rem'}
        fontWeight={400}
        color={'#4F4F4F'}
      >
        {name}
      </Text>
      <Text
        fontFamily={'heading'}
        fontSize={'.9rem'}
        fontWeight={500}
        color={'#333333'}
      >
        {value}
      </Text>
    </Flex>
  );
}
export default function AgentMetrics({
  user,
  imageUrl,
  state,
  wallet,
}: Partial<IAgent>) {
  const { id } = useParams();
  const { data: GAPapi, isLoading: GAPloading } = useGetAgentPerformanceApi(
    id as string,
    { enabled: Boolean(id) }
  );
  const { userHasPermission } = useAuth();

  return (
    <Box mx={'1.5rem'} p={'1rem'} rounded={'.4rem'} bg={'white'}>
      <SimpleGrid
        gap={'1.4rem'}
        columns={3}
        row={2}
        templateColumns="25rem 1fr 1fr"
      >
        <GridItem
          rounded={'.3rem'}
          border="1px solid #EFF4FD"
          h={'100%'}
          gridRow={'span 2'}
        >
          <Box
            h={'100%'}
            pt={'2.5rem'}
            px={'1.5rem'}
            bg={'#FFFFFF'}
            rounded={'.3rem'}
          >
            <Center
              mb={'3.3rem'}
              h={'6rem'}
              w={'6rem'}
              rounded={'100%'}
              bg={'#F5A62326'}
              overflow={'hidden'}
            >
              <Image
                src={imageUrl}
                h={'100%'}
                w={'100%'}
                alt={user?.firstName + 'image'}
              />
            </Center>

            <Stack spacing={'1rem'}>
              <MetricItem
                name="Name"
                value={`${user?.firstName} ${user?.lastName}`}
              />
              <MetricItem
                name="Phone number"
                value={`${user?.phoneNumber.countryCode}${user?.phoneNumber.number}`}
              />
              <MetricItem name="Email address" value={`${user?.email}`} />
              {state && (
                <MetricItem
                  name="State of residence"
                  value={state?.toLocaleLowerCase()}
                />
              )}
            </Stack>
          </Box>
        </GridItem>
        <GridItem>
          <MetricCard
            name="COMPLETED VERIFICATIONS"
            value={
              GAPloading ? '...' : GAPapi?.data.totalCompletedVerifications
            }
            icon={LuShieldCheck}
            iconColor={'rgba(0, 175, 148, 0.5)'}
            iconBg={'rgba(0, 175, 148, 0.15)'}
            isAgent={true}
          />
        </GridItem>
        <GridItem>
          <MetricCard
            name="COMPLETION RATE"
            value={GAPloading ? '...' : `${GAPapi?.data.completionRate}%`}
            icon={BsLightning}
            iconColor={'rgba(160, 32, 240, 0.5)'}
            iconBg={'rgba(160, 32, 240, 0.15)'}
            isAgent={true}
          />
        </GridItem>
        <GridItem>
          {userHasPermission(
            Permissions.CAN_VIEW_AGENTS_PAYMENT_ACTIVITIES
          ) && (
            <MetricCard
              name="TOTAL EARNED"
              value={GAPloading ? '...' : wallet?.formatted?.totalPaidOut}
              icon={LiaDollarSignSolid}
              iconColor={'#00AF94B2'}
              iconBg={'#00AF9426'}
              isAgent={true}
            />
          )}
        </GridItem>
        <GridItem>
          {userHasPermission(
            Permissions.CAN_VIEW_AGENTS_PAYMENT_ACTIVITIES
          ) && (
            <MetricCard
              name="OUTSTANDING PAYMENT"
              value={GAPloading ? '...' : wallet?.formatted?.outstanding}
              icon={LiaDollarSignSolid}
              iconColor={'rgba(245, 166, 35, 0.8)'}
              iconBg={'rgba(245, 166, 35, 0.15)'}
              isAgent={true}
            />
          )}
        </GridItem>
      </SimpleGrid>{' '}
    </Box>
  );
}
