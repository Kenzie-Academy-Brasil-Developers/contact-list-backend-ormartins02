import { Request, Response, NextFunction } from "express";
import { SchemaOf } from "yup";
import { IUserRequest } from "../interfaces/users";

export const validateCreateUserSchemaMiddleware =
  (schema: SchemaOf<IUserRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBody = await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      req.body = validatedBody;

      return next();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  };
