import { atom } from 'recoil';

import implementPersist from '@/utils/implement-persist';

export const UserState = atom<{
  id: string;
  partnerId: string;
}>({
  key: 'UserState',
  default: {
    id: '',
    partnerId: '',
  },
  effects_UNSTABLE: implementPersist('UserState'),
});
