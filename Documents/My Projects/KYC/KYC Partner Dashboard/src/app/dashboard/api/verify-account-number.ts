import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';

interface IVerifyRequest {
  accountNumber: string;
  bankCode: string;
}

export const verifyAccount = async (data: IVerifyRequest) => {
  const response = await axios.post<ApiResponse<any>>(
    'apps/resolve-account',
    data
  );
  return response.data;
};

type MutationFnType = typeof verifyAccount;

export const useVerifyAccountNumberApi = (
  config?: MutationConfig<MutationFnType>
) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },
    // onSuccess: () => {
    //   toast({ status: 'success', description: 'Operation successful' });
    // },
    retry: false,
    mutationKey: ['verify-account'],
    mutationFn: verifyAccount,
    ...config,
  });
};
