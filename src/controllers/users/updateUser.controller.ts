import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { IUserUpdate } from "../../interfaces/usersInterfaces";
import { updateUserService } from "../../services/users/updateUser.services";

export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user: IUserUpdate = req.body;

  const updatedUser = await updateUserService(user, id);

  return res.status(200).json(instanceToPlain(updatedUser));
};
