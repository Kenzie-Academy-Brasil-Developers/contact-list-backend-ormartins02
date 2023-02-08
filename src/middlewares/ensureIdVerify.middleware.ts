import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import AppError from "../errors/appError";
import { User } from "../entities/user.entities";

export const ensureIdVerifyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id

  if (!id) {
    throw new AppError("Id is required", 404);
  }

  const contactsRepository =
    AppDataSource.getRepository(User);


  const contact = await contactsRepository.findOneBy({id});

  if (!contact) {
    throw new AppError("This user dont exist", 404);
  }

  return next();
};
