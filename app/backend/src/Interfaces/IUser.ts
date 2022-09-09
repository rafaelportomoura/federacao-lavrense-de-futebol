export interface IUser {
  email: string;
  password: string;
  token?: string;
  codigo?: number;
  expiration: Date;
}