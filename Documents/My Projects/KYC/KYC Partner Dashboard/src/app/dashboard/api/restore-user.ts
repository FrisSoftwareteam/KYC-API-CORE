import { axios } from '@/lib/axios';
import { ApiResponse } from '@/shared/interface/api';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { useToast } from '@/hooks/useToast';
import { getErrorMessage } from '@/utils/handle-error';

export const restoreUser = async (data: { user: string }) => {
  const response = await axios.post<ApiResponse<string>>(
    'partners/restore-user',
    data
  );
  return response.data;
};

type MutationFnType = typeof restoreUser;

export const useRestoreUserApi = (config?: MutationConfig<MutationFnType>) => {
  const toast = useToast();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: (data) => {
      toast({ description: data.data, status: 'success' });
    },
    retry: false,
    mutationKey: ['restore-user'],
    mutationFn: restoreUser,
    ...config,
  });
};
