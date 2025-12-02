import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';

export const getAvailableAgents = async (id: string) => {
  const response = await axios.get<
    ApiResponse<
      Array<{
        distance: number;
        presence: string;
        agent: {
          id: string;
          imageUrl: string;
          user: {
            firstName: string;
            lastName: string;
            phoneNumber: {
              countryCode: string;
              number: string;
            };
          };
        };
      }>
    >
  >(`partners/verifications/${id}/available-agents`);
  return response.data;
};

type QueryFnType = typeof getAvailableAgents;

export const useGetAvailableAgentsApi = (
  id: string,
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-available-agents', id],
    queryFn: () => getAvailableAgents(id),
    ...config,
  });
};
