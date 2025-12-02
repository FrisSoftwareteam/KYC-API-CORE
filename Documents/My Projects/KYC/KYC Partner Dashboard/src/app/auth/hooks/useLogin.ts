import { useFormik } from 'formik';
import { LoginUserRequest, useLoginUserApi } from '../api/login';
import { logininitialValue } from '../formhandling/initialvalues/login';
import { loginSchema } from '../formhandling/validations/login';

export const useLoginHook = () => {
  const { mutateAsync, isLoading } = useLoginUserApi();

  const { values, handleSubmit, errors, handleChange, touched, handleBlur } =
    useFormik<LoginUserRequest>({
      initialValues: logininitialValue,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        await mutateAsync(values);
      },
    });

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit();
  };

  return {
    values,
    errors,
    handleChange,
    touched,
    handleBlur,
    handleFormSubmit,
    isLoading,
  };
};
