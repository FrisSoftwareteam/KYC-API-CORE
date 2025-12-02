import { DurationType } from '@/shared/interface/time';

export function getExpiresTime(payload: DurationType) {
  switch (payload.unit) {
    case 'SECOND':
      return new Date().getTime() + 1000 * payload.value;
    case 'MINUTE':
      return new Date().getTime() + 1000 * 60 * payload.value;
    case 'HOUR':
      return new Date().getTime() + 1000 * 60 * 60 * payload.value;
  }
}
