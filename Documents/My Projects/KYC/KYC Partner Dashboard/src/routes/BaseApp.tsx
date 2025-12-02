import { Box } from '@chakra-ui/react';
import { ReactNode, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { LogoLoader } from '@/components/elements/loader/Loader';

export const BaseApp = ({ children }: { children?: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <Box h={'100vh'}>
          <LogoLoader text="Loading..." />
        </Box>
      }
    >
      {children ? children : <Outlet />}
    </Suspense>
  );
};
