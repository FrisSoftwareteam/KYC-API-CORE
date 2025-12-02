import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';
import { useNavigate } from 'react-router-dom';

interface ResetPasswordRequest {
  email: string;
  password: string;
  verificationToken?: string;
}

export const resetPasswordApi = async (data: ResetPasswordRequest) => {
  const response = await axios.post<ApiResponse<{ message: string }>>(
    '/auth/reset-password',
    data
  );
  return response.data;
};

export const useResetPasswordApi = (
  config?: MutationConfig<typeof resetPasswordApi>
) => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPasswordApi,
    mutationKey: ['reset-password'],
    retry: false,
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },
    onSuccess: () => {
      toast({
        status: 'success',
        description: 'Password reset successfully!',
      });
      navigate('/login');
    },
    ...config,
  });
};
