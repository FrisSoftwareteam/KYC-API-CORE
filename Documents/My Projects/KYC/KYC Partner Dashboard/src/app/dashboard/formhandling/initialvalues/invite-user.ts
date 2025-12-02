import { IInviteUserRequest } from '../../api/add-user';

export type IInviteUserRequestWithStringPhoneNumber = Omit<
  IInviteUserRequest,
  'phoneNumber'
> & {
  phoneNumber: string;
};

export const inviteUserInitialValues: IInviteUserRequestWithStringPhoneNumber =
  {
    email: '',
    role: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  };
