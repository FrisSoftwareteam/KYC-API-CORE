import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { IAgent } from '@/shared/interface/agent';
import { ApiResponse, IMeta } from '@/shared/interface/api';
import {
  GetAgentsFilter,
  IGetAgentsFilter,
} from '../store/agent/get-agents-filter';
import { buildUrlWithQueryParams } from '@/utils/build-url-query';
import { useRecoilValue } from 'recoil';

export interface IGetAllAgentsResponse {
  meta: IMeta;
  agents: Array<IAgent>;
}
export const getAllAgents = async (filter: IGetAgentsFilter) => {
  const baseUrl = 'partners/agents';
  const apiUrl = buildUrlWithQueryParams(baseUrl, filter);

  const response = await axios.get<ApiResponse<IGetAllAgentsResponse>>(apiUrl);
  return response.data;
};

type QueryFnType = typeof getAllAgents;

export const useGetAllAgentApi = (config?: QueryConfigType<QueryFnType>) => {
  const filter = useRecoilValue(GetAgentsFilter);
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-all-agents', filter],
    queryFn: () => getAllAgents(filter),
    ...config,
  });
};
