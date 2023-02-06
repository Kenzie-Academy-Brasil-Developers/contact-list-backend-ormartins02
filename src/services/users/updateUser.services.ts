import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entities";
import { User } from "../../entities/user.entities";
import { AppError } from "../../errors/appError";
import { IUserUpdate } from "../../interfaces/usersInterfaces";

export const updateUserService = async (
  { name, email, phone, password }: IUserUpdate,
  id: string
): Promise<User> => {

  const bcrypt = require('bcryptjs')

  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id,
  });

  if (!findUser) {
    throw new AppError("User not Found", 404);
  }

  await userRepository.update(id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    phone: phone ? phone : findUser.phone,
    password: password ? await bcrypt.hash(password, 10) : findUser.password,
  });

  const updatedUser = await userRepository.findOneBy({
    id,
  });

  return updatedUser!;
};
