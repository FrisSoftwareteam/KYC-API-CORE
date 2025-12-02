import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { IAgent } from '@/shared/interface/agent';
import { ApiResponse } from '@/shared/interface/api';

export const getAgentById = async (id: string) => {
  const response = await axios.get<ApiResponse<IAgent>>(
    `partners/agents/${id}`
  );
  return response.data;
};

type QueryFnType = typeof getAgentById;

export const useGetAgentByIdApi = (
  id: string,
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-agent-by-id', id],
    queryFn: () => getAgentById(id),
    ...config,
  });
};
