import { useGetPaternPermissionApi } from '@/app/dashboard/api/get-partner-permission';

export const useAuth = () => {
  const { data: GUPapi, isLoading: GUPloading } = useGetPaternPermissionApi();

  const userHasPermission = (permission) => {
    const permissionGranted = GUPapi?.data?.settings?.[permission];

    return permissionGranted;
  };

  return {
    permissionIsLoading: GUPloading,
    userHasPermission,
  };
};
