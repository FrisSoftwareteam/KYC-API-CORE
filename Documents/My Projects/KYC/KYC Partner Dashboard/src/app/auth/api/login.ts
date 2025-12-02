import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { setAccessToken, setRefreshToken } from '@/utils/persistToken';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { UserState } from '../store';
import { getErrorMessage } from '@/utils/handle-error';

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    partnerId: string;
  };
  jwt: {
    accessToken: string;
    refreshToken: string;
  };
}
export const loginUser = async (data: LoginUserRequest) => {
  const response = await axios.post<ApiResponse<LoginResponse>>(
    '/auth/partner-login',
    data
  );
  return response.data;
};

type MutationFnType = typeof loginUser;

export const useLoginUserApi = (config?: MutationConfig<MutationFnType>) => {
  const toast = useToast();
  const setUser = useSetRecoilState(UserState);

  const navigate = useNavigate();
  return useMutation({
    onError: (err: any) => {
      toast({ status: 'error', description: getErrorMessage(err) });
    },
    async onSuccess({ data }) {
      setAccessToken(data.jwt.accessToken);
      setRefreshToken(data.jwt.refreshToken);
      setUser({ ...data.user });
      navigate('/');
    },

    retry: false,
    mutationKey: ['loginUser'],
    mutationFn: loginUser,
    ...config,
  });
};
