import {
  Box,
  useToast as useChakraToast,
  UseToastOptions,
} from '@chakra-ui/react';
export function useToast() {
  const chakraToast = useChakraToast();

  function toast(options?: UseToastOptions | undefined) {
    chakraToast({
      ...options,
      position: 'top',
      isClosable: true,
      size: 'sm',
      variant: 'left-accent',
      icon: undefined,
      description: (
        <Box
          fontSize={'sm'}
          _firstLetter={{
            textTransform: 'capitalize',
          }}
          fontFamily={'body'}
          fontWeight={'medium'}
        >
          {options?.description}
        </Box>
      ),
    });
  }

  return toast;
}
