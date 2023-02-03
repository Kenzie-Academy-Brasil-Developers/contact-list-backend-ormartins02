import { Request, Response } from "express";
import { deleteUserService } from "../../services/user/deleteUser.services";

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const userDeleted = await deleteUserService(id);

  return res.status(204).json({ message: userDeleted });
};
