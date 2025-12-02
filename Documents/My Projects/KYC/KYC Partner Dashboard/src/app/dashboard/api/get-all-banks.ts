import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';

interface IBanksResponse {
  name: '9mobile 9Payment Service Bank';
  slug: '9mobile-9payment-service-bank-ng';
  code: '120001';
  active: true;
  isDeleted: false;
  payWithBank: false;
}

export const getBank = async () => {
  const response = await axios.get<ApiResponse<IBanksResponse[]>>('apps/banks');
  return response.data;
};

type QueryFnType = typeof getBank;

export const useGetBankApi = (config?: QueryConfigType<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-all-banks'],
    queryFn: getBank,
    ...config,
  });
};
