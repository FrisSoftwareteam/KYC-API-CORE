import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';

export interface IAgentPerformance {
  totalVerifications: number;
  totalCompletedVerifications: number;
  totalPendingVerification: number;

  outstanding: number;
  withrawableAmount: number;
  totalPaid: number;
  completionRate: number;
}
export const getAgentPerformance = async (id: string) => {
  const response = await axios.get<ApiResponse<IAgentPerformance>>(
    `partners/agents/${id}/performance`
  );
  return response.data;
};

type QueryFnType = typeof getAgentPerformance;

export const useGetAgentPerformanceApi = (
  id: string,
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-agent-performance', id],
    queryFn: () => getAgentPerformance(id),
    ...config,
  });
};
