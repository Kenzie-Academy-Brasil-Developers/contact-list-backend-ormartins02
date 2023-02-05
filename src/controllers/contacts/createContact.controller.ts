import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { Contact } from "../../entities/contact.entities";
import { createNewContactService } from "../../services/contacts/createContact.services";

export const createContactController = async (req: Request, res: Response) => {
  const contact = req.body;

  const newContact = await createNewContactService(contact);
  if (newContact instanceof Contact) {
    return res.status(201).json(instanceToPlain(newContact));
  }
  return res.status(newContact[1] as number).json(newContact[0]);
};
