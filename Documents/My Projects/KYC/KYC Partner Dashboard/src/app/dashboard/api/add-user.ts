import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { getErrorMessage } from '@/utils/handle-error';

export interface IInviteUserRequest {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phoneNumber: {
    countryCode: string;
    number: string;
  };
}

export const inviteUser = async (data: IInviteUserRequest) => {
  const response = await axios.post<ApiResponse<any>>(
    'partners/invite-user',
    data
  );
  return response.data;
};

type MutationFnType = typeof inviteUser;

export const useInviteUserApi = (config?: MutationConfig<MutationFnType>) => {
  const toast = useToast();

  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },
    onSuccess: () => {
      toast({ status: 'success', description: 'Operation successful' });
    },

    retry: false,
    mutationKey: ['invite-user'],
    mutationFn: inviteUser,
    ...config,
  });
};
