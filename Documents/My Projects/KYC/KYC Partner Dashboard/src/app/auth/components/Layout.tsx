import { Center } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Center minW={'100vw'} minH={'100vh'} bg={'#11406F'}>
      {children}
    </Center>
  );
}
