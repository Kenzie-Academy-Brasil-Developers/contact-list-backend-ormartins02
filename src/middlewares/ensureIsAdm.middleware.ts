import { Request, Response, NextFunction } from "express";

export const ensureIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!req.user.isAdm) {
    return res.status(401).json({
      message: "User is not admin",
    });
  }
  return next();
};
