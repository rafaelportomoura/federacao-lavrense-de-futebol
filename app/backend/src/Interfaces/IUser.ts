export interface IUser {
  email: string;
  password: string;
  token?: string;
  codigo?: number;
  expiration?: string;
}

export interface IUserLoginReturn {
  expiration: string;
  token: string;
}