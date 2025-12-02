import { ReactNode } from 'react';
import { ThemeProvider } from './theme-provider';
import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';

const helmetContext = {};
type AppProviderProps = { children: ReactNode };
export function AppProvider({ children }: AppProviderProps) {
  return (
    <HelmetProvider context={helmetContext}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools
            client={queryClient}
            position="right"
            buttonPosition="bottom-right"
          /> */}
          <RecoilRoot>{children}</RecoilRoot>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
