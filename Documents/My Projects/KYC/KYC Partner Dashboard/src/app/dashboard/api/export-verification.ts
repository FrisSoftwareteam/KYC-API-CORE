import { useToast } from '@/hooks/useToast';
import { axios } from '@/lib/axios';
import { MutationConfig, useMutation } from '@/lib/react-query';
import { getErrorMessage } from '@/utils/handle-error';
import {
  VerificationFilterState,
  VerificationsFilter,
} from '../store/verifications/filter';
import { buildUrlWithQueryParams } from '@/utils/build-url-query';
import { ApiResponse } from '@/shared/interface/api';
import { useRecoilValue } from 'recoil';

const exportVerifications = async (filter: VerificationsFilter) => {
  const baseUrl = 'businesses/export-address-verifications';
  const apiUrl = buildUrlWithQueryParams(baseUrl, filter);
  const response = await axios.get<ApiResponse<any>>(apiUrl);
  return response.data;
};

type MutFnType = typeof exportVerifications;

export const useExportVerificationApi = (
  config?: MutationConfig<MutFnType>
) => {
  const filter = useRecoilValue(VerificationFilterState);

  const toast = useToast();
  return useMutation({
    onError: (err) => {
      toast({ description: getErrorMessage(err), status: 'error' });
    },
    onSuccess: () => {
      toast({ description: 'Operation Successful', status: 'success' });
    },
    retry: false,
    mutationKey: ['export-verifications'],
    mutationFn: () => exportVerifications(filter),
    ...config,
  });
};
