import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';
import { useNavigate } from 'react-router-dom';

export interface CompleteRegistrationReq {
  firstName: string;
  lastName: string;
  phoneNumber: any;
  email: string;
  inviteToken: string;
  password: string;
  confirmPassword: string;
}

export const completeRegistration = async (data: CompleteRegistrationReq) => {
  const response = await axios.post<ApiResponse<any>>(
    'partners/complete-signup',
    data
  );
  return response.data;
};

type MutationFnType = typeof completeRegistration;

export const useCompleteRegistrationApi = (
  config?: MutationConfig<MutationFnType>
) => {
  const toast = useToast();

  const navigate = useNavigate();
  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },
    async onSuccess() {
      toast({ status: 'success', description: 'Operation Successful' });
      navigate('/login');
    },

    retry: false,
    mutationKey: ['completeRegistration'],
    mutationFn: completeRegistration,
    ...config,
  });
};
