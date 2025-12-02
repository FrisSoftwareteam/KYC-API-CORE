import { useFormik } from 'formik';
import { useLocation } from 'react-router-dom';
import { resetPasswordInitialValue } from '../formhandling/initialvalues/reset-password';
import { resetPasswordSchema } from '../formhandling/validations/reset-password';
import { useResetPasswordApi } from '../api/reset-password';

export const useResetPasswordHook = () => {
  const { mutateAsync, isLoading } = useResetPasswordApi();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const verificationToken = searchParams.get('verificationToken');
  const email = searchParams.get('email');

  const formik = useFormik({
    initialValues: {
      ...resetPasswordInitialValue,
      email: email as string,
      verificationToken: verificationToken as string,
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      await mutateAsync(values);
    },
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return {
    ...formik,
    handleFormSubmit,
    isLoading,
    email: formik.values.email,
  };
};
