import { UserState } from '@/app/auth/store';
import { useGetAllNotification } from '../api/get-all-notification';
import { useMarkAsReadApi } from '../api/mark-as-read';
import { useRecoilState } from 'recoil';

export const useNotificationHook = () => {
  const [user] = useRecoilState(UserState);
  const { data, isLoading, error, refetch } = useGetAllNotification(
    user?.partnerId as string,
    {
      enabled: Boolean(user?.partnerId),
    }
  );
  const { mutateAsync: markAllAsRead } = useMarkAsReadApi();

  const handleMarkAllAsRead = async () => {
    const ids = data?.data?.map((item) => item._id);
    await markAllAsRead({ ids: ids });
    await refetch();
  };

  return {
    notifications: data?.data,
    isLoading,
    error,
    handleMarkAllAsRead,
  };
};
