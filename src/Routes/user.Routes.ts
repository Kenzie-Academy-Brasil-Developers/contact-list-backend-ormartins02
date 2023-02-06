import { Router } from "express";
import { createUserController } from "../controllers/users/createUser.controller";
import { retrieveUserController } from "../controllers/users/retrieveUser.controller";
import { updateUserController } from "../controllers/users/updateUser.controller";
import { deleteUserController } from "../controllers/users/deleteUser.controller";
import { ensureBodyVerifyMiddleware } from "../middlewares/ensureBodyVerify.middleware";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureIsAdmMiddleware } from "../middlewares/ensureIsAdm.middleware";
import { retrieveMyUserController } from "../controllers/users/retrieveMyUser.controller";

export const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  retrieveUserController
);
userRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  retrieveMyUserController
);
userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  ensureBodyVerifyMiddleware,
  updateUserController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  deleteUserController
);
