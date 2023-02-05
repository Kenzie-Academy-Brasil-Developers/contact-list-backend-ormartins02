import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { retrieveContactService } from "../../services/contacts/retrieveContact.services";

export const retrieveContactController = async (req: Request, res: Response) => {
  const contacts = await retrieveContactService();

  return res.status(200).json(instanceToPlain(contacts));
};
