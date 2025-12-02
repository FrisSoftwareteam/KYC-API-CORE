import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';

interface IWithdrawRequest {
  amount: number;
}

export const withdrawFund = async (data: IWithdrawRequest) => {
  const response = await axios.post<ApiResponse<any>>(
    'partners/transactions/withdraw-fund',
    data
  );
  return response.data;
};

type MutationFnType = typeof withdrawFund;

export const useWithdrawFundApi = (config?: MutationConfig<MutationFnType>) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },
    onSuccess: () => {
      toast({ status: 'success', description: 'Operation successful' });
    },

    retry: false,
    mutationKey: ['withdraw-fund'],
    mutationFn: withdrawFund,
    ...config,
  });
};
