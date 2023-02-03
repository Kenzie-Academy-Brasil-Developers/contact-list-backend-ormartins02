import { Request, Response, NextFunction } from "express";
import { SchemaOf } from "yup";
import { IUserUpdate } from "../interfaces/users";

export const validateUpdateUserSchemaMiddleware =
  (schema: SchemaOf<IUserUpdate>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedBodyUpdate = await schema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      });

      req.body = validatedBodyUpdate;

      return next();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }
    }
  };
