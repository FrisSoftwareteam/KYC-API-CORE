import { useFormik } from 'formik';

import { FormEvent } from 'react';
import {
  IChangePasswordForm,
  useChangePaswordApi,
} from '@/app/auth/api/change-password';
import { changepasswordInitialValues } from '../formhandling/initialvalues/change-password';
import { changePasswordValidationSchema } from '../formhandling/validations/change-password';

export const useChangePasswordHook = () => {
  const { mutateAsync, isLoading } = useChangePaswordApi();
  const {
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    resetForm,
  } = useFormik<IChangePasswordForm>({
    initialValues: changepasswordInitialValues,
    validationSchema: changePasswordValidationSchema,
    onSubmit: async (values) => {
      await mutateAsync({ ...values });
      resetForm();
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
    isLoading,
  };
};
