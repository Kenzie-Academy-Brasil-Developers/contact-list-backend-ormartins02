import { Request, Response } from "express";
import { deleteContactService } from "../../services/contacts/deleteContact.services";

export const deleteContactController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const contactDeleted = await deleteContactService(id);

  return res.status(204).json({ message: contactDeleted });
};
