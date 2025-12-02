import React from 'react';
import Top from './Top';
import { Link, useParams } from 'react-router-dom';
import { useGetAgentByIdApi } from '@/app/dashboard/api/get-agent-by-id';
import { LogoLoader } from '@/components/elements/loader/Loader';
import { Flex, Text } from '@chakra-ui/react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import AgentMetrics from './AgentMetrics';
import Bottom from './Bottom';
export function AgentById() {
  const { id } = useParams();
  const { data: GAapi, isLoading: GAloading } = useGetAgentByIdApi(
    id as string,
    { enabled: Boolean(id) }
  );
  if (GAloading) {
    return <LogoLoader />;
  }
  return (
    <div>
      <Top {...GAapi?.data} />
      <Link to={'/agents'}>
        <Flex pl={'1.5rem'} my={'1.6rem'} gap={'.2rem'} alignItems={'center'}>
          <IoIosArrowRoundBack fontSize={'1.7rem'} />
          <Text fontFamily={'heading'}>Back to agents</Text>
        </Flex>
      </Link>
      <AgentMetrics {...GAapi?.data} />
      <Bottom />
    </div>
  );
}
