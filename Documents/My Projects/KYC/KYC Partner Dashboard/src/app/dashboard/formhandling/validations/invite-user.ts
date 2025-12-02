import * as Yup from 'yup';

export const inviteUserValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Emeil is required'),
  phoneNumber: Yup.string(),
  role: Yup.string(),
});
