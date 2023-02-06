import { Request, Response, NextFunction } from "express";

export const ensureBodyVerifyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, createdAt,  } = req.body;

  if (id !== undefined) {
    return res
      .status(401)
      .json({ message: "These properties cannot be updated" });
  }

  if (createdAt !== undefined) {
    return res
      .status(401)
      .json({ message: "These properties cannot be updated" });
  }
  return next();
};
