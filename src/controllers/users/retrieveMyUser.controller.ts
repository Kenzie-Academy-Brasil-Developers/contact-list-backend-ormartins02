import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { retrieveMyUserService } from "../../services/users/retrieveMyUser.services";

export const retrieveMyUserController = async (req: Request, res: Response) => {
  const id = req.params.id

  const users = await retrieveMyUserService(id);

  return res.status(200).json(instanceToPlain(users));
};
