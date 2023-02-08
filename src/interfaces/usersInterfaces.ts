
export interface IUserRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  isAdm: boolean;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  isAdm: boolean;
  createdAt: Date;
}
export interface IUserUpdate {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}