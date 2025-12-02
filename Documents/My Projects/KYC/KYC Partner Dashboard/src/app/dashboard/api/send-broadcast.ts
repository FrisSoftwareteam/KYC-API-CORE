import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { getErrorMessage } from '@/utils/handle-error';

const sendBroadcast = async (state: string) => {
  const response = await axios.post('partners/reassign-all-task', { state });
  return response.data;
};

type MutFnType = typeof sendBroadcast;

export const useSendBroadcastApi = (config?: MutationConfig<MutFnType>) => {
  const toast = useToast();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: () => {
      toast({ description: 'Operation Successful', status: 'success' });
    },
    retry: false,
    mutationKey: ['send-broad-cast'],
    mutationFn: sendBroadcast,
    ...config,
  });
};
