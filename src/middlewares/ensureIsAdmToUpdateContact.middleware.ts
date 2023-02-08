import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Contact } from "../entities/contact.entities";

export const ensureIsAdmToUpdateContactMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idParams = req.params.id;
  const user = req.user;

  const contactRepository = AppDataSource.getRepository(Contact);

  const findContact = await contactRepository.findOne({where: {id: idParams}});

  if (findContact.user !== user && req.user.isAdm === false) {
    return res.status(401).json({
      message: "You can only edit your own contact",
    });
  }

  return next();
};
