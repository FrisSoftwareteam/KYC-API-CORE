import { Logo } from '@/components/Logo/Logo';
import { Box, BoxProps, Center, Text } from '@chakra-ui/react';

type Props = {
  text?: string;
} & BoxProps;
export const PermissionLoader = ({
  text = 'Loading...',
  ...boxProps
}: Props) => {
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
        <Logo fontSize="8xl" h="max-content" />
        <Text fontSize={'lg'} fontWeight={'semibold'} color={'red.500'}>
          {text}
        </Text>
      </Center>
    </Box>
  );
};
