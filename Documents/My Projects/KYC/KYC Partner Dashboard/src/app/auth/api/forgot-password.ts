import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';

interface ForgotPasswordRequest {
  email: string;
  dashboardType: string;
}

export const forgotPasswordApi = async (data: ForgotPasswordRequest) => {
  const response = await axios.post<ApiResponse<{ resetLink: string }>>(
    '/auth/forgot-password',
    data
  );
  return response.data;
};

export const useForgotPasswordApi = (
  config?: MutationConfig<typeof forgotPasswordApi>
) => {
  const toast = useToast();

  return useMutation({
    mutationFn: forgotPasswordApi,
    mutationKey: ['forgot-password'],
    retry: false,
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },
    onSuccess: () => {
      toast({
        status: 'success',
        description: 'Password reset link sent successfully!',
      });
    },
    ...config,
  });
};
