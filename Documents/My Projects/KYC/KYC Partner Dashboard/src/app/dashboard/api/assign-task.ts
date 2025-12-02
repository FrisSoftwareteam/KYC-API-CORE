import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { getErrorMessage } from '@/utils/handle-error';

const assignTask = async (data: { agent: string; task: string }) => {
  const response = await axios.post('partners/reassign-task', data);
  return response.data;
};

type MutFnType = typeof assignTask;

export const useAssignTaskApi = (config?: MutationConfig<MutFnType>) => {
  const toast = useToast();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: () => {
      toast({ description: 'Operation Successful', status: 'success' });
    },
    retry: false,
    mutationKey: ['assign-task'],
    mutationFn: assignTask,
    ...config,
  });
};
