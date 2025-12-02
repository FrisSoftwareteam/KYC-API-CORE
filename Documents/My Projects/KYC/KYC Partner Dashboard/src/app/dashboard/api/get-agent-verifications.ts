import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse, IMeta } from '@/shared/interface/api';
import { useRecoilValue } from 'recoil';
import {
  AgentVerificationFilterState,
  AgentVerificationsFilter,
} from '../store/agentverification/filter';
import { IAgentVerification } from '@/shared/interface/agent';
import { buildUrlWithQueryParams } from '@/utils/build-url-query';

export interface IGetAgentVerificationResponse {
  meta: IMeta;
  addresses: Array<IAgentVerification>;
}

export const getAgentVerifications = async (data: {
  id: string;
  filter: AgentVerificationsFilter;
}) => {
  const baseUrl = 'partners/agents/' + data.id + '/verifications';
  const apiUrl = buildUrlWithQueryParams(baseUrl, {
    ...data.filter,
    size: 1000,
  });
  const response =
    await axios.get<ApiResponse<IGetAgentVerificationResponse>>(apiUrl);
  return response.data;
};

type QueryFnType = typeof getAgentVerifications;

export const useGetAgentVerificationApi = (
  id: string,
  config?: QueryConfigType<QueryFnType>
) => {
  const filter = useRecoilValue(AgentVerificationFilterState);
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-agent-verifications', filter, id],
    queryFn: () => getAgentVerifications({ id, filter }),
    ...config,
  });
};
