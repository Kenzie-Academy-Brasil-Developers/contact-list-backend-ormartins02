import { Request, Response } from "express";
import { createNewContactService } from "../../services/contacts/createContact.services";

export const createContactController = async (req: Request, res: Response) => {
  const contact = req.body;
  const id = req.user.id

  const newContact = await createNewContactService(contact, id);

  return res.status(201).json(newContact);
};
