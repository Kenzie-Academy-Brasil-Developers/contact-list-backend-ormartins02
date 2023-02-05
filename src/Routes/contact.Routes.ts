import { Router } from "express";
import { createContactController } from "../controllers/contacts/createContact.controller";
import { retrieveContactController } from "../controllers/contacts/retrieveContact.controller";
import { updateContactController } from "../controllers/contacts/updateContact.controller";
import { deleteContactController } from "../controllers/contacts/deleteContact.controller";
import { ensureBodyVerifyMiddleware } from "../middlewares/ensureBodyVerify.middleware";

export const userRoutes = Router();

userRoutes.post("", createContactController);
userRoutes.get(
  "",
  retrieveContactController
);
userRoutes.patch(
  "/:id",
  ensureBodyVerifyMiddleware,
  updateContactController
);
userRoutes.delete(
  "/:id",
  deleteContactController
);
