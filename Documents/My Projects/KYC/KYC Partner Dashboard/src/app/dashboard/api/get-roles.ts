import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { IRole } from '@/shared/interface/roles';

export const getRoles = async () => {
  const response = await axios.get<ApiResponse<Array<IRole>>>('partners/roles');
  return response.data;
};

type QueryFnType = typeof getRoles;

export const useGetRoleApi = (config?: QueryConfigType<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-roles'],
    queryFn: getRoles,
    ...config,
  });
};
