import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { forgotPasswordInitialValue } from '../formhandling/initialvalues/forgot-password';
import { forgotPasswordSchema } from '../formhandling/validations/forgot-password';
import { useForgotPasswordApi } from '../api/forgot-password';

interface ForgotPasswordRequest {
  email: string;
  dashboardType: string;
}

export const useForgetPasswordHook = () => {
  const { mutateAsync, isLoading } = useForgotPasswordApi();
  const navigate = useNavigate();

  const formik = useFormik<ForgotPasswordRequest>({
    initialValues: forgotPasswordInitialValue,
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      await mutateAsync({ ...values, dashboardType: 'partner' });
      navigate('/login');
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
  };
};
