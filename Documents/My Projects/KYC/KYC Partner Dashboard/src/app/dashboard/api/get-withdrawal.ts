import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse, IMeta } from '@/shared/interface/api';
import { buildUrlWithQueryParams } from '@/utils/build-url-query';
import { useRecoilValue } from 'recoil';
import {
  GetWithdrawalFilter,
  IGetWithdrawalFilter,
} from '../store/withdrawal/get-withdrawal-filter';
import { IWithdrawal } from '@/shared/interface/withdrawal';

export interface IGetAllAgentsResponse {
  meta: IMeta;
  transactions: Array<IWithdrawal>;
}
export const getWithdrawal = async (filter: IGetWithdrawalFilter) => {
  const baseUrl = 'partners/withdrawals';
  const apiUrl = buildUrlWithQueryParams(baseUrl, filter);

  const response = await axios.get<ApiResponse<IGetAllAgentsResponse>>(apiUrl);
  return response.data;
};

type QueryFnType = typeof getWithdrawal;

export const useGetAllWithdrawalApi = (
  config?: QueryConfigType<QueryFnType>
) => {
  const filter = useRecoilValue(GetWithdrawalFilter);
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-all-withdrawals', filter],
    queryFn: () => getWithdrawal(filter),
    ...config,
  });
};
