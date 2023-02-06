import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entities";
import { AppError } from "../../errors/appError";

export const deleteUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({
    id,
  });

  if (!findUser) {
    throw new AppError("User not Found", 404);
  }

  await userRepository.delete(id)

  return "User deleted";
};
