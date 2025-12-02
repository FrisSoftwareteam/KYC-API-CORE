import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { IRole } from '@/shared/interface/roles';
import { IUser } from '@/shared/interface/user';

interface IGetUserResponse {
  _id: string;
  status: string;
  role: IRole;
  user: IUser;
  createdAt: '2024-04-05T14:36:19.482Z';
}
export const getUserProfile = async () => {
  const response = await axios.get<ApiResponse<IGetUserResponse>>(
    'partners/users/profile'
  );
  return response.data;
};

type QueryFnType = typeof getUserProfile;

export const useGetUserProfileApi = (config?: QueryConfigType<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-user-profile'],
    queryFn: getUserProfile,
    ...config,
  });
};
