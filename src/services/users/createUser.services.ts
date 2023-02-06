import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entities";
import { AppError } from "../../errors/appError";
import { IUserRequest } from "../../interfaces/usersInterfaces";

export const createUserService = async ({
  name,
  email,
  phone,
  password,
  isAdm
}: IUserRequest): Promise<User> => {

  const bcrypt = require('bcryptjs')

  const userRepository = AppDataSource.getRepository(User);

  const emailExist = await userRepository.findOneBy({ email });

  if (emailExist) {
    throw new AppError("This email is already being used", 400);
  }

  const user = userRepository.create({
    name,
    email,
    phone,
    password: await bcrypt.hash(password, 10),
    isAdm
  });

  await userRepository.save(user);

  return user;
};
