import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { retrieveUserService } from "../services/retrieveUser.services";

export const retrieveUserController = async (req: Request, res: Response) => {
  const users = await retrieveUserService();

  return res.status(200).json(instanceToPlain(users));
};
