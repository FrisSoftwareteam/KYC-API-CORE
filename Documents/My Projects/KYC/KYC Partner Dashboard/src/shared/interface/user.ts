export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: {
    countryCode: string;
    number: string;
  };
  userType: string;
  status: string;
  mustChangePassword: boolean;
  isEmailVerified: boolean;
}

export interface BusinessUser extends IUser {
  role: string;
  name: string;
  lastLogin: string;
}
