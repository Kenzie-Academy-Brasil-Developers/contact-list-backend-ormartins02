import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entities";
import jwt from "jsonwebtoken";
import "dotenv/config";
import AppError from "../../errors/appError";
import { IUserLogin } from "../../interfaces/usersInterfaces";

export const createSessionsService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const bcrypt = require("bcryptjs");

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("Invalid user or password", 403);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid user or password", 403);
  }

  const token = jwt.sign(
    {
      id: user.id,
      isAdm: user.isAdm
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user.id,
    }
  );

  return token;
};
