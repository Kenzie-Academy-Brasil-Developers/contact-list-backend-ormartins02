import { Router } from "express";
import { createUserController } from "../controllers/users/createUser.controller";
import { retrieveUserController } from "../controllers/users/retrieveUser.controller";
import { updateUserController } from "../controllers/users/updateUser.controller";
import { deleteUserController } from "../controllers/users/deleteUser.controller";
import { ensureBodyVerifyMiddleware } from "../middlewares/ensureBodyVerify.middleware";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureIsAdmMiddleware } from "../middlewares/ensureIsAdm.middleware";
import { retrieveMyUserController } from "../controllers/users/retrieveMyUser.controller";
import { ensureIdVerifyMiddleware } from "../middlewares/ensureIdVerify.middleware";

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
  ensureIdVerifyMiddleware,
  retrieveMyUserController
);
userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIdVerifyMiddleware,
  ensureBodyVerifyMiddleware,
  updateUserController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIdVerifyMiddleware,
  deleteUserController
);
