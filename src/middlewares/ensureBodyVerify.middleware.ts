import { Request, Response, NextFunction } from "express";

export const ensureBodyVerifyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, isAdm, isActive } = req.body;

  if (id !== undefined) {
    return res
      .status(401)
      .json({ message: "These properties cannot be updated" });
  }

  if (isActive !== undefined) {
    return res
      .status(401)
      .json({ message: "These properties cannot be updated" });
  }

  if (isAdm !== undefined) {
    return res
      .status(401)
      .json({ message: "These properties cannot be updated" });
  }

  return next();
};
