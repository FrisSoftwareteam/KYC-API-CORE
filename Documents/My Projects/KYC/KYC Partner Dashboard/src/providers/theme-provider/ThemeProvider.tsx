import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { theme } from './theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {children}
    </ChakraProvider>
  );
};
