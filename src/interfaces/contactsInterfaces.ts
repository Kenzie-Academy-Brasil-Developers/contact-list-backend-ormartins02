
export interface IContactRequest {
  name: string;
  email: string;
  phone: string;
  userId: any;
}

export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  userId: any;
  createdAt: Date;
}
export interface IContactUpdate {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export interface IContactMockedRequest {
  name: string;
  email: string;
  phone: string;
}