import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';

export interface IGetAgentLocationResponse {
  position: {
    longitude: number;
    latitude: number;
  };
  status: string;
}

export const getAgentLocation = async (id: string) => {
  const response = await axios.get<ApiResponse<IGetAgentLocationResponse>>(
    `partners/agents/${id}/last-location`
  );
  return response.data;
};

type QueryFnType = typeof getAgentLocation;

export const useGetAgentLocationApi = (
  id: string,
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-agent-location', id],
    queryFn: () => getAgentLocation(id),
    ...config,
  });
};
