import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';

export interface IChangePasswordForm {
  password: string;
  confirmPassword: string;
  oldPassword: string;
  // partnerUserId?: string;
}

export const changePassword = async (data: IChangePasswordForm) => {
  const response = await axios.post<ApiResponse<any>>(
    '/partners/change-password',
    data
  );
  return response.data;
};

type MutationFnType = typeof changePassword;

export const useChangePaswordApi = (
  config?: MutationConfig<MutationFnType>
) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },
    async onSuccess() {
      toast({ status: 'success', description: 'Operation Successful' });
    },

    retry: false,
    mutationKey: ['change-password'],
    mutationFn: changePassword,
    ...config,
  });
};
