import { Router } from "express";
import { createUserController } from "../controllers/users/createUser.controller";
import { retrieveUserController } from "../controllers/users/retrieveUser.controller";
import { updateUserController } from "../controllers/users/updateUser.controller";
import { deleteUserController } from "../controllers/users/deleteUser.controller";
import { ensureBodyVerifyMiddleware } from "../middlewares/ensureBodyVerify.middleware";

export const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get(
  "",
  retrieveUserController
);
userRoutes.patch(
  "/:id",
  ensureBodyVerifyMiddleware,
  updateUserController
);
userRoutes.delete(
  "/:id",
  deleteUserController
);
