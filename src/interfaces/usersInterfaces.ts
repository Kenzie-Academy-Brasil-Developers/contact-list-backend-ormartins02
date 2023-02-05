export interface IUserRequest {
  name: string;
  email: string;
  phone: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: boolean;
  createdAt: Date;
}
export interface IUserUpdate {
  name?: string;
  email?: string;
  phone?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}