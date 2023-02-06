import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entities";

export const retrieveUserService = async (): Promise<User[]> => {
  const userRespository = AppDataSource.getRepository(User);

  const user = await userRespository.find();

  return user;
};
