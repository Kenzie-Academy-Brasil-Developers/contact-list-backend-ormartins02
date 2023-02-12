import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { retrieveProfileController } from "../controllers/profile/retrieveProfile.controller";

export const profileRoutes = Router();

profileRoutes.get(
  "",
  ensureAuthMiddleware,
  retrieveProfileController
);
