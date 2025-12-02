import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { IAgentVerification } from '@/shared/interface/agent';
import { ApiResponse } from '@/shared/interface/api';

export const getVerificationById = async (id: string) => {
  const response = await axios.get<ApiResponse<IAgentVerification>>(
    `partners/verifications/${id}`
  );
  return response.data;
};

type QueryFnType = typeof getVerificationById;

export const useGetVerificationByIdApi = (
  id: string,
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-verification-by-id', id],
    queryFn: () => getVerificationById(id),
    ...config,
  });
};
