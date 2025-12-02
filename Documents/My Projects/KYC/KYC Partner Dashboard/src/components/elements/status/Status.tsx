import { getColor } from '@/utils/get-color';
import { BoxProps, Center } from '@chakra-ui/react';
import React, { useCallback } from 'react';

export default function Status({
  name,
  ...props
}: { name?: string } & BoxProps) {
  const getColorFun = useCallback(() => getColor(name || ''), [name]);
  return (
    <Center
      bg={getColorFun()}
      rounded={'1rem'}
      py={'.15rem'}
      fontWeight={500}
      fontSize={'.8rem'}
      color={'white'}
      {...props}
    >
      {name}
    </Center>
  );
}
