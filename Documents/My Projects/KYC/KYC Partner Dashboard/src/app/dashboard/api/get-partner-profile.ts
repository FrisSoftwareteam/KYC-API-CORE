import { axios } from '@/lib/axios';
import {
  ExtractFnReturnType,
  QueryConfigType,
  useQuery,
} from '@/lib/react-query';
import { ApiResponse } from '@/shared/interface/api';

export interface IGetPartnerProfileRespopnse {
  _id: '660af24713d0626f6da25de5';
  name: 'Gennaios Technology';
  email: 'gettosin4me@gmail.com';
  address: 'lagos Nigeria, test';
  phoneNumber: '07035038923';
  active: true;
  prices: {
    address: {
      partner: {
        lagos: 500;
        others: 700;
      };
      agent: {
        lagos: 200;
        others: 500;
      };
    };
  };
  mainUser: {
    _id: '660af37a14487d8713fe93ba';
    firstName: 'Tosin';
    lastName: 'Seun';
    email: 'gettosin4me1@gmail.com';
    phoneNumber: {
      countryCode: '+234';
      number: '7035038924';
    };
    userType: 'partner';
    mustChangePassword: false;
    isEmailVerified: false;
    createdAt: '2024-04-01T17:48:42.673Z';
  };
  country: {
    code: 'NG';
    name: 'nigeria';
  };
  wallet: {
    outstanding: 0;
    withdrawable: 0;
    totalPaidOut: 0;
  };
  bank: {
    bankName: string;
    accountName: string;
    accountNumber: string;
  };
}
export const getPartnerProfile = async () => {
  const response =
    await axios.get<ApiResponse<IGetPartnerProfileRespopnse>>(
      'partners/profile'
    );
  return response.data;
};

type QueryFnType = typeof getPartnerProfile;

export const useGetPartnerProfileApi = (
  config?: QueryConfigType<QueryFnType>
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    retry(failureCount, error: any) {
      if ([404, 401].includes(error.status)) return false;
      else if (failureCount < 1) return true;
      else return false;
    },
    queryKey: ['get-partners-profile'],
    queryFn: getPartnerProfile,
    ...config,
  });
};
