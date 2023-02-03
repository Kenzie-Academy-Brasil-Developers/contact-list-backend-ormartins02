import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Properties } from "../entities/propeties.entities";
import { AppError } from "../errors/appError";

export const ensureIdVerifyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const schedulesPropertyIdRespository =
      AppDataSource.getRepository(Properties);

    const property = await schedulesPropertyIdRespository.findOneBy({
      id: req.params.id,
    });

    if (!property) {
      throw new AppError("This property dont exist", 404);
    }

    return next();
  } catch (error) {
    res.status(404).json({ message: "This ID dont exist" });
  }
};
