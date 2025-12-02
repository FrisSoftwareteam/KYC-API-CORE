import Status from '@/components/elements/status/Status';
import { IAgent } from '@/shared/interface/agent';
import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

export default function Top({ user, realtimeStatus }: Partial<IAgent>) {
  return (
    <Flex
      m={'1px'}
      alignItems={'center'}
      justifyContent={'space-between'}
      h={'4rem'}
      bg={'white'}
      px={'1.5rem'}
    >
      <Flex gap={'1rem'} alignItems={'center'}>
        <Text fontFamily={'heading'} fontWeight={500} fontSize={'1.1rem'}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Status px={'1rem'} name={realtimeStatus} />
      </Flex>

      {/* <Button fontFamily={'heading'} fontWeight={500} minW={'10rem'}>
        Account options
      </Button> */}
    </Flex>
  );
}
