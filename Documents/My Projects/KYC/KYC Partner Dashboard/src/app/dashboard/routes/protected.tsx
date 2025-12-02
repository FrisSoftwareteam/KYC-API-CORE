import { LogoLoader } from '@/components/elements/loader/Loader';
import { ReactNode } from 'react';
import { useAuth } from '@/app/auth/hooks/useAuth';
import { PermissionLoader } from '@/components/elements/loader/PermissionLoader';

interface IProtectedRoutes {
  permission: string;
  children: ReactNode;
}

export function ProtectedRoutes({ permission, children }: IProtectedRoutes) {
  const { userHasPermission, permissionIsLoading } = useAuth();

  if (permissionIsLoading) {
    return <LogoLoader h={'40rem'} w={'100%'} />;
  }

  return userHasPermission(permission) ? (
    children
  ) : (
    <PermissionLoader
      h={'40rem'}
      w={'100%'}
      text={'You are not authorized to view this page'}
    />
  );
}
