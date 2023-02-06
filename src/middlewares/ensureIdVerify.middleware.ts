import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Contact } from "../entities/contact.entities";
import { AppError } from "../errors/appError";

export const ensureIdVerifyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const contactsRepository =
      AppDataSource.getRepository(Contact);

    const contact = await contactsRepository.findOneBy({
      id: req.params.id,
    });

    if (!contact) {
      throw new AppError("This contact dont exist", 404);
    }

    return next();
  } catch (error) {
    res.status(404).json({ message: "This ID dont exist" });
  }
};
