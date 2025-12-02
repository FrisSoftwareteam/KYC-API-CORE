import * as Yup from 'yup';

export const changePasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Current password is required'),
  password: Yup.string().required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});
