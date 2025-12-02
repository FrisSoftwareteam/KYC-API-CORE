import { atom } from 'recoil';

export interface IGetWithdrawalFilter {
  size: number;
  page: number;
  customStartDate: string;
  customEndDate: string;
  status: string;
}

export const GetWithdrawalFilter = atom<IGetWithdrawalFilter>({
  key: 'GetWithdrawalFilter',
  default: {
    size: 10,
    page: 1,
    customEndDate: '',
    customStartDate: '',
    status: '',
  },
});
