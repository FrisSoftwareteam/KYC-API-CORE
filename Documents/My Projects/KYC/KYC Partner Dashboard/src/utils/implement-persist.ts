import { recoilPersist } from 'recoil-persist';

export default function implementPersist(key: string) {
  const { persistAtom } = recoilPersist({
    key,
    storage: localStorage,
  });

  return [persistAtom];
}
