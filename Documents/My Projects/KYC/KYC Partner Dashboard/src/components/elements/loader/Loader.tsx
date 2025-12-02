import { Logo } from '@/components/Logo/Logo';
import {
  Box,
  BoxProps,
  Center,
  Spinner,
  Text,
  VisuallyHidden,
} from '@chakra-ui/react';

type Props = {
  text?: string;
} & BoxProps;
export const LogoLoader = ({ text = 'Loading...', ...boxProps }: Props) => {
  return (
    <Box
      role="status"
      w="100vw"
      h="100vh"
      overflow="hidden"
      inset={0}
      {...boxProps}
    >
      <Center gap="4" h="full" w="full" flexDirection={'column'}>
        <Spinner size={'sm'} color="primary.100" />

        <Logo fontSize="8xl" h="max-content" />
        <Text fontSize={'lg'} fontWeight={'semibold'} color={'primary.100'}>
          {text}
        </Text>
      </Center>
      <VisuallyHidden>Loading...</VisuallyHidden>
    </Box>
  );
};
