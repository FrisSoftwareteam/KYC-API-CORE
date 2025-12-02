export interface IVerification {
  [x: string]: any;
  createdAt: Date;
  candidate: {
    firstName: string;
    lastName: string;
  };
  agent: {
    firstName: string;
    lastName: string;
  };
  type: string;
  status: string;
  _id: string;
}
