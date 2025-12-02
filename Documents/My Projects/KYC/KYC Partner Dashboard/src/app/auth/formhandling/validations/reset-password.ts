import * as yup from 'yup';
export const resetPasswordSchema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
  verificationToken: yup.string().required('Verification token is required'),
});
