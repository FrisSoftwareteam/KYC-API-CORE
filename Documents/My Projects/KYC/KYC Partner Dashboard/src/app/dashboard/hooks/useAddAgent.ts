import { useFormik } from 'formik';
import { useAddAgentApi } from '../api/add-agent';
import { IAddAgent } from '../types/agent';
import { addAgentInitialValues } from '../formhandling/initialvalues/add-agent';
import { addAgentValidationschema } from '../formhandling/validations/add-agent';
import { FormEvent } from 'react';
import { useRecoilValue } from 'recoil';
import { UserState } from '@/app/auth/store';
import { useToast } from '@/hooks/useToast';
import { useGetAllAgentApi } from '../api/get-all-agent';

export const useAddAgentHook = ({ onClose }) => {
  const { mutateAsync: AAapi, isLoading: AAloading } = useAddAgentApi();
  const user = useRecoilValue(UserState);
  const { refetch } = useGetAllAgentApi();
  const toast = useToast();

  const {
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    setFieldValue,
  } = useFormik<IAddAgent>({
    initialValues: addAgentInitialValues,
    validationSchema: addAgentValidationschema,
    onSubmit: async (values) => {
      if (!user.partnerId) {
        toast({ description: 'Invalid partner', status: 'error' });
        return;
      }
      let number = values.phoneNumber;
      if (values.phoneNumber.startsWith('0')) {
        number = values.phoneNumber.slice(1);
      }

      await AAapi({
        ...values,
        phoneNumber: { countryCode: '+234', number },
        partner: user.partnerId,
      });
      await refetch();
      onClose();
    },
  });

  const submitform = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return {
    values,
    touched,
    handleBlur,
    handleChange,
    errors,
    submitform,
    isLoading: AAloading,
    setFieldValue,
  };
};
