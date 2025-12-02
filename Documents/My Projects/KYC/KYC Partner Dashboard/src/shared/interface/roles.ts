export interface Iroles {
  date: Date;
  name: string;
  users: string;
}

export interface IRole {
  _id: string;
  name: string;
  permissions: Array<string>;
}
