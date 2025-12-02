import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { buildUrlWithQueryParams } from '@/utils/build-url-query';

interface IPartnerMetrics {
  totalVerifications: number;
  totalCompletedVerifications: number;
  totalVerificationInProgress: number;
  totalPendingVerification: number;
  totalUnassignVerification: number;
  totalAssignedVerification: number;
  totalAgents: number;
}
export interface DateFilter {
  customStartDate: string;
  customEndDate: string;
}
export const getPartnermetrics = async (filter: any) => {
  const baseUrl = 'partners/metrics';
  const apiUrl = buildUrlWithQueryParams(baseUrl, filter);

  const response = await axios.get<ApiResponse<IPartnerMetrics>>(apiUrl);
  return response.data;
};

type QueryFnType = typeof getPartnermetrics;

export const useGetPartnerMetricsApi = (
  filter = {},
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-partner-metrics', filter],
    queryFn: () => getPartnermetrics(filter),
    ...config,
  });
};
