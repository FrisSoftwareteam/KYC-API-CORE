import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';

interface IUpsertRequest {
  accountNumber: string;
  bankCode: number;
}

export const upsertBank = async (data: IUpsertRequest) => {
  const response = await axios.post<ApiResponse<any>>(
    'partners/upsert-bank',
    data
  );
  return response.data;
};

type MutationFnType = typeof upsertBank;

export const useUpsertBankApi = (config?: MutationConfig<MutationFnType>) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },
    onSuccess: () => {
      toast({ status: 'success', description: 'Operation successful' });
    },

    retry: false,
    mutationKey: ['upsert-bank'],
    mutationFn: upsertBank,
    ...config,
  });
};
