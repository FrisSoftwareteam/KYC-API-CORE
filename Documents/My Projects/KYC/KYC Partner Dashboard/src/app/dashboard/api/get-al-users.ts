import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { IRole } from '@/shared/interface/roles';
import { IUser } from '@/shared/interface/user';

export type IGetAllUsersResponse = Array<{
  _id: string;
  status: string;
  role: IRole;
  user: IUser;
  createdAt: string;
}>;
export const getAllUsers = async () => {
  const response =
    await axios.get<ApiResponse<IGetAllUsersResponse>>('partners/users');
  return response.data;
};

type QueryFnType = typeof getAllUsers;

export const useGetAllUsersApi = (config?: QueryConfigType<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-all-users'],
    queryFn: getAllUsers,
    ...config,
  });
};
