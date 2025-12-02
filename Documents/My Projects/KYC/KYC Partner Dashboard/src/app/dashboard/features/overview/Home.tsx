import { Box } from '@chakra-ui/react';
import Top from './Top';
import Verification from './Verification';

export function Home() {
  return (
    <Box p={'1.5rem'}>
      <Top />
      <Verification />
    </Box>
  );
}
