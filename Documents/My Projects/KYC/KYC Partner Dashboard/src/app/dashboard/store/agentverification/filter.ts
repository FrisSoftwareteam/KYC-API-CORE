import { atom } from 'recoil';

export interface AgentVerificationsFilter {
  size: number;
  page: number;
  status: string;
  type: string;
  name: string;
  search: string;
}

export const AgentVerificationFilterState = atom<AgentVerificationsFilter>({
  key: 'AgentVerificationFilterState',
  default: {
    size: 10,
    page: 1,
    status: 'accepted',
    type: '',
    name: '',
    search: '',
  },
});
