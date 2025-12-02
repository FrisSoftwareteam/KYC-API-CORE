import { useFormik } from 'formik';
import { useSearchParams } from 'react-router-dom';
import { registrationInitialValues } from '../formhandling/initialvalues/registration';
import { useCompleteRegistrationApi } from '../api/complete-registration';
import { registrationValidationSchema } from '../formhandling/validations/registration';

export const useCompleteRegistrationHook = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { mutateAsync, isLoading } = useCompleteRegistrationApi();

  const { values, handleSubmit, errors, handleChange, touched, handleBlur } =
    useFormik({
      initialValues: registrationInitialValues,
      validationSchema: registrationValidationSchema,
      onSubmit: async (values) => {
        await mutateAsync({
          ...values,
          inviteToken: token as string,
          phoneNumber: {
            number: values.phoneNumber,
            countryCode: '+234',
          },
        });
      },
    });

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    handleSubmit();
  };

  return {
    values,
    handleFormSubmit,
    errors,
    handleChange,
    touched,
    handleBlur,
    isLoading,
  };
};
