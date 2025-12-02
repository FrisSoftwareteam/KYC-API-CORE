import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';
import { IUser } from '@/shared/interface/user';

interface IGetUserResponse {
  status: string;
  user: IUser;
  createdAt: string;
  _id: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  active: true;
  prices: {
    address: {
      partner: {
        lagos: number;
        others: number;
        [key: string]: number;
      };
      agent: {
        lagos: number;
        others: number;
        [key: string]: number;
      };
    };
  };
  mainUser: IUser;
  country: {
    code: string;
    name: string;
  };
  wallet: {
    outstanding: number;
    withdrawable: number;
    totalPaidOut: number;
  };
  bank: {
    bankName: string;
    accountName: string;
    accountNumber: string;
  };
  settings: {
    'can-manage-task': boolean;
    'can-reassign-task': boolean;
    'can-manage-agents': boolean;
    'can-view-agents-task': boolean;
    'can-view-agents-location': boolean;
    'can-view-agents-activities': boolean;
    'can-view-agents-payment-activities': boolean;
  };
}
export const getPartnerPermission = async () => {
  const response =
    await axios.get<ApiResponse<IGetUserResponse>>('partners/profile');
  return response.data;
};

type QueryFnType = typeof getPartnerPermission;

export const useGetPaternPermissionApi = (
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-partner-permission'],
    queryFn: getPartnerPermission,
    ...config,
  });
};
