import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import AppError from "../errors/appError";
import { Contact } from "../entities/contact.entities";

export const ensureIdContactVerifyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id

  const contactsRepository = AppDataSource.getRepository(Contact);

  const contact = await contactsRepository.findOneBy({id});

  if (!contact) {
    throw new AppError("This contact dont exist", 404);
  }

  return next();
};
