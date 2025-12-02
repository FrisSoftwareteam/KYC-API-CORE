import Axios from 'axios';
import {
  authRequestInterceptor,
  refreshTokenInterceptor,
  rejectErrorInterceptor,
} from './interceptors';
import { env } from '@/shared/constants/env';

export const axios = Axios.create({
  baseURL: env.API_BASE_URL,
});

axios.interceptors.request.use(authRequestInterceptor, rejectErrorInterceptor);
// axios.interceptors.response.use((response) => {
//   return response;
// }, VerifyPhoneNumber);
axios.interceptors.response.use((response) => {
  return response;
}, refreshTokenInterceptor);
