import { DurationType } from '@/shared/interface/time';
import { getExpiresTime } from './getExpirationTime';

const storagePrefix = 'firstregistrar_web_app__';

export type keyType =
  | 'refresh_token'
  | 'access_token'
  | 'redirect_path'
  | 'theme'
  | 'msw-data';

const DEFAULT_EXPIRY_DURATION: DurationType = { unit: 'DAY', value: 1 };

const storage = {
  getValue: (key: keyType) => {
    const itemStr = window.localStorage.getItem(`${storagePrefix}${key}`);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date().getTime();

    if (now > item.expiresIn) {
      storage.clearValue(key);
      return null;
    }

    return item.value;
  },

  setValue: (
    key: keyType,
    value: unknown,
    duration?: DurationType | undefined
  ) => {
    const item = {
      value: value,
      expiresIn: getExpiresTime(duration || DEFAULT_EXPIRY_DURATION),
    };
    window.localStorage.setItem(`${storagePrefix}${key}`, JSON.stringify(item));
  },

  clearValue: (key: keyType) => {
    window.localStorage.removeItem(`${storagePrefix}${key}`);
  },

  reset: () => {
    window.localStorage.clear();
  },

  session: {
    getValue: (key: keyType) => {
      return JSON.parse(
        sessionStorage.getItem(`${storagePrefix}${key}`) as string
      );
    },
    setValue: (key: keyType, value: unknown) => {
      sessionStorage.setItem(`${storagePrefix}${key}`, JSON.stringify(value));
    },
    clearValue: (key: keyType) => {
      sessionStorage.removeItem(`${storagePrefix}${key}`);
    },
    reset: () => {
      window.sessionStorage.clear();
    },
  },
};

export default storage;
