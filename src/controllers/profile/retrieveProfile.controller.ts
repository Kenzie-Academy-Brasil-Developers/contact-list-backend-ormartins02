import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { retrieveProfileService } from "../../services/profile/retrieveProfile.services";

export const retrieveProfileController = async (req: Request, res: Response) => {
  const id = req.user.id

  const users = await retrieveProfileService(id);

  return res.status(200).json(instanceToPlain(users));
};
