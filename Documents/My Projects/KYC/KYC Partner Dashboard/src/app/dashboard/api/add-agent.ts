import { axios } from '@/lib/axios';
import { IAddAgent } from '../types/agent';
import { ApiResponse } from '@/shared/interface/api';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { useToast } from '@/hooks/useToast';
import { getErrorMessage } from '@/utils/handle-error';

export const addAgent = async (
  data: Omit<IAddAgent, 'phoneNumber'> & {
    phoneNumber: {
      countryCode: string;
      number: string;
    };
  }
) => {
  const response = await axios.post<ApiResponse<string>>(
    'partners/create-agents',
    data
  );
  return response.data;
};

type MutationFnType = typeof addAgent;

export const useAddAgentApi = (config?: MutationConfig<MutationFnType>) => {
  const toast = useToast();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: (data) => {
      toast({ description: data.data, status: 'success' });
    },
    retry: false,
    mutationKey: ['add-agent'],
    mutationFn: addAgent,
    ...config,
  });
};
