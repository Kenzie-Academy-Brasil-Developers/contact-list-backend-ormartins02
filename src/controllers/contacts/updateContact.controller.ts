import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { updateContactService } from "../../services/contacts/updateContact.services";
import { IContactUpdate } from "../../interfaces/contactsInterfaces";

export const updateContactController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const contact: IContactUpdate = req.body;

  const updatedUser = await updateContactService(contact, id);

  return res.status(200).json(instanceToPlain(updatedUser));
};
