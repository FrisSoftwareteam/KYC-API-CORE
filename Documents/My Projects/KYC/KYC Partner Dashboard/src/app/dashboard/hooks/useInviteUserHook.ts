import { useFormik } from 'formik';

import { FormEvent, useMemo } from 'react';
import { useInviteUserApi } from '../api/add-user';
import { useGetRoleApi } from '../api/get-roles';
import {
  IInviteUserRequestWithStringPhoneNumber,
  inviteUserInitialValues,
} from '../formhandling/initialvalues/invite-user';
import { inviteUserValidationSchema } from '../formhandling/validations/invite-user';
import { useGetAllUsersApi } from '../api/get-al-users';

export const useInviteUserHook = ({ onClose }) => {
  const { mutateAsync, isLoading } = useInviteUserApi();
  const { data: GRapi, isLoading: GRloading } = useGetRoleApi();
  const { refetch } = useGetAllUsersApi();

  const roles = useMemo(
    () =>
      GRapi?.data?.map((item) => ({
        [item.name]: `${item.permissions.map((item) => {
          let str = '';
          str += ' ' + item;
          return str;
        })}`,
      })),
    [GRapi?.data]
  );
  const roleOptions = useMemo(
    () =>
      GRapi?.data?.map((item) => ({
        label: item.name,
        value: item._id,
      })),
    [GRapi?.data]
  );
  const {
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    setFieldValue,
  } = useFormik<IInviteUserRequestWithStringPhoneNumber>({
    initialValues: inviteUserInitialValues,
    validationSchema: inviteUserValidationSchema,
    onSubmit: async (values) => {
      let number = values.phoneNumber;
      if (values.phoneNumber.startsWith('0')) {
        number = values.phoneNumber.slice(1);
      }

      await mutateAsync({
        ...values,
        phoneNumber: {
          countryCode: '+234',
          number,
        },
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
    isLoading,
    setFieldValue,
    GRloading,
    roleOptions,
    roles,
  };
};
