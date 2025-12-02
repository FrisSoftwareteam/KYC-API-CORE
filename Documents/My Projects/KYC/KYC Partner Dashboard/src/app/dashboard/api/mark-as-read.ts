import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';

export interface IMarkReadResponse {
  data: string;
  status: boolean;
}

interface IRequest {
  ids: string[];
}

export const markAsRead = async (data: IRequest) => {
  const response = await axios.put<ApiResponse<any>>(
    'notifications/mark-as-read',
    data
  );
  return response.data;
};

type MutationFnType = typeof markAsRead;

export const useMarkAsReadApi = (config?: MutationConfig<MutationFnType>) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },
    onSuccess: () => {
      toast({ status: 'success', description: 'Mark as read successfully' });
    },

    retry: false,
    mutationKey: ['mark-as-read'],
    mutationFn: markAsRead,
    ...config,
  });
};
