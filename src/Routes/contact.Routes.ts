import { Router } from "express";
import { createContactController } from "../controllers/contacts/createContact.controller";
import { retrieveContactController } from "../controllers/contacts/retrieveContact.controller";
import { updateContactController } from "../controllers/contacts/updateContact.controller";
import { deleteContactController } from "../controllers/contacts/deleteContact.controller";
import { ensureBodyVerifyMiddleware } from "../middlewares/ensureBodyVerify.middleware";

export const contactRoutes = Router();

contactRoutes.post("", createContactController);
contactRoutes.get(
  "",
  retrieveContactController
);
contactRoutes.patch(
  "/:id",
  ensureBodyVerifyMiddleware,
  updateContactController
);
contactRoutes.delete(
  "/:id",
  deleteContactController
);
