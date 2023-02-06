import { IUserLogin, IUserRequest } from "../../interfaces/usersInterfaces";

export const mockedUserAdm: IUserRequest = {
  name: "Ricardo Martins",
  email: "ricardo@mail.com",
  password: "123456",
  isAdm: true,
  phone: "11999888666",
};

export const mockedUserNoAdm: IUserRequest = {
  name: "Janaína Martins",
  email: "janaina@mail.com",
  password: "123456",
  isAdm: false,
  phone: "11913434556",
};

export const mockedContact1: IUserRequest = {
  name: "Guilherme Martins",
  email: "guilherme@mail.com",
  password: "123456",
  isAdm: false,
  phone: "11999897898",
};

export const mockedContact2: IUserRequest = {
  name: "Henrique Martins",
  email: "henrique@mail.com",
  password: "123456",
  isAdm: false,
  phone: "11999897899",
};

export const mockedContact3: IUserRequest = {
  name: "Gabriela Martins",
  email: "guilherme@mail.com",
  password: "123456",
  isAdm: false,
  phone: "11999897900",
};

export const mockedContact4: IUserRequest = {
  name: "Isabela Martins",
  email: "henrique@mail.com",
  password: "123456",
  isAdm: false,
  phone: "11999897901",
};

export const mockedAdmLogin: IUserLogin = {
  email: "ricardo@mail.com",
  password: "123456",
};

export const mockedNoAdmLogin: IUserLogin = {
  email: "janaina@mail.com",
  password: "123456",
};