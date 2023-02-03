import AppDataSource from "../data-source";
import { User } from "../entities/user.entities";
import { AppError } from "../errors/appError";
import { IUserRequest } from "../interfaces/users";

export const createUserService = async ({
  name,
  email,
  isAdm,
  password,
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
    isAdm,
    password: await bcrypt.hash(password, 10),
  });

  await userRepository.save(user);

  return user;
};
