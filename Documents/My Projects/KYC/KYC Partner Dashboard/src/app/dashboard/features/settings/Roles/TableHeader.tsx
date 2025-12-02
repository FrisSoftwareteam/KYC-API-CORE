import { Flex, useDisclosure, Text, Button } from '@chakra-ui/react';
import React from 'react';

export default function TableHeader() {
  const addUserDisclosure = useDisclosure();

  return (
    <Flex
      p={'1.8rem'}
      h={'3.5rem'}
      boxShadow="0px 5px 8px 0px #0A00820C"
      alignItems={'center'}
      justifyContent={'space-between'}
      bg={'#FFFFFF'}
    >
      <Text fontWeight={500} fontSize={'.8rem'}>
        2 Roles
      </Text>

      <Flex pr={'1.5rem'} gap={'1rem'} alignItems={'center'}>
        <Button
          onClick={addUserDisclosure.onOpen}
          fontWeight={500}
          fontFamily={'heading'}
          minH={'2.5rem'}
        >
          Add role
        </Button>
      </Flex>
    </Flex>
  );
}
