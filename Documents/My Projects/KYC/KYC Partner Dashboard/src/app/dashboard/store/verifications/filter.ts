import { atom } from 'recoil';

export interface VerificationsFilter {
  size: number;
  page: number;
  status: string;
  type: string;
  name: string;
  customStartDate: string;
  customEndDate: string;
  search: string;
  state: string;
}

export const VerificationFilterState = atom<VerificationsFilter>({
  key: 'verificationFilterState',
  default: {
    size: 10,
    page: 1,
    status: 'accepted',
    type: '',
    name: '',
    search: '',
    customStartDate: '',
    customEndDate: '',
    state: '',
  },
});
