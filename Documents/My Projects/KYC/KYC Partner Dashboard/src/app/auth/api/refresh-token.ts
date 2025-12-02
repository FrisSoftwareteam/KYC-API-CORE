import { MutationConfig, useMutation } from '@/lib/react-query';
import { env } from '@/shared/constants/env';
import { getToken } from '@/utils/persistToken';
import Axios from 'axios';

export interface RefreshTokenDTO {
  token: string;
}

export interface RefreshTokenresponse {
  data: {
    user: {
      id: string;
    };
    jwt: {
      accessToken: string;
      refreshToken: string;
    };
  };
  code: number;
  status: boolean;
}
export const axios = Axios.create({
  baseURL: env.API_BASE_URL,
});

export const refreshToken = async () => {
  const localRefreshToken = getToken().refreshToken;

  try {
    const response = await axios.post<RefreshTokenresponse>(
      '/auth/refresh-token',
      null,
      {
        headers: {
          Authorization: `Bearer ${localRefreshToken}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    window.location.assign(window.location.origin + '/login');
    throw new Error('');
  }
};

type UseRefreshTokenOptions = {
  config?: MutationConfig<typeof refreshToken>;
};

export const useRefreshToken = ({ config }: UseRefreshTokenOptions = {}) => {
  return useMutation({
    onSuccess: (data) => {
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.data.jwt.accessToken}`;
    },
    retry: 0,
    mutationFn: refreshToken,
    ...config,
  });
};
