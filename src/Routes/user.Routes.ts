import { Router } from "express";
import { createUserController } from "../controllers/users/createUser.controller";
import { retrieveUserController } from "../controllers/users/retrieveUser.controller";
import { updateUserController } from "../controllers/users/updateUser.controller";
import { deleteUserController } from "../controllers/users/deleteUser.controller";
import { ensureBodyVerifyMiddleware } from "../middlewares/ensureBodyVerify.middleware";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureIsAdmMiddleware } from "../middlewares/ensureIsAdm.middleware";
import { ensureIdVerifyMiddleware } from "../middlewares/ensureIdVerify.middleware";
import { ensureIsAdmToUpdateMiddleware } from "../middlewares/ensureIsAdmToUpdate.middleware";

export const userRoutes = Router();

userRoutes.post("", createUserController);
userRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  retrieveUserController
);
userRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIdVerifyMiddleware,
  ensureIsAdmToUpdateMiddleware,
  ensureBodyVerifyMiddleware,
  updateUserController
);
userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIdVerifyMiddleware,
  ensureIsAdmToUpdateMiddleware,
  deleteUserController
);
