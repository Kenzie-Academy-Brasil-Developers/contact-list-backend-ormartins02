import { Router } from "express";
import { createSessionsController } from "../controllers/session/createSessions.controller";

export const sessionRoutes = Router();

sessionRoutes.post("", createSessionsController);
