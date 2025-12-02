import { atom } from 'recoil';

export interface CandidateFilter {
  size: number;
  page: number;

  search: string;
  customStartDate: string;
  customEndDate: string;
}

export const CandidateFilterState = atom<CandidateFilter>({
  key: 'CandidateFilterState',
  default: {
    size: 10,
    page: 1,
    customEndDate: '',
    customStartDate: '',
    search: '',
  },
});
