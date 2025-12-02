import { axios } from '@/lib/axios';
import { ApiResponse } from '@/shared/interface/api';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { useToast } from '@/hooks/useToast';
import { getErrorMessage } from '@/utils/handle-error';

export const suspendUser = async (data: { user: string }) => {
  const response = await axios.post<ApiResponse<string>>(
    'partners/suspend-user',
    data
  );
  return response.data;
};

type MutationFnType = typeof suspendUser;

export const useSuspendUserApi = (config?: MutationConfig<MutationFnType>) => {
  const toast = useToast();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: (data) => {
      toast({ description: data.data, status: 'success' });
    },
    retry: false,
    mutationKey: ['suspend-user'],
    mutationFn: suspendUser,
    ...config,
  });
};
