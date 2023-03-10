import { Request, Response, NextFunction } from "express";

export const ensureIsAdmToUpdateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idParams = req.params.id;
  const idUser = req.user.id;

  

  if (idParams !== idUser && req.user.isAdm === false) {
    return res.status(401).json({
      message: "Only admin can update or delete other users",
    });
  }

  return next();
};
