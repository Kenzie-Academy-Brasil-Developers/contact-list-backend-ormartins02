import { Request, Response } from "express";
import { createUserService } from "../../services/users/createUser.services";
import { instanceToPlain } from "class-transformer";
import { User } from "../../entities/user.entities";

export const createUserController = async (req: Request, res: Response) => {
  const user = req.body;

  const newUser = await createUserService(user);
  if (newUser instanceof User) {
    return res.status(201).json(instanceToPlain(newUser));
  }
  return res.status(newUser[1] as number).json(newUser[0]);
};
