import { atom } from 'recoil';

export interface IGetAgentsFilter {
  size: number;
  page: number;
  search: string;
  customStartDate: string;
  customEndDate: string;
  email: string;
  status: string;
  state: string;
}

export const GetAgentsFilter = atom<IGetAgentsFilter>({
  key: 'GetAgentsFilter',
  default: {
    size: 10,
    page: 1,
    customEndDate: '',
    customStartDate: '',
    search: '',
    email: '',
    status: '',
    state: '',
  },
});
