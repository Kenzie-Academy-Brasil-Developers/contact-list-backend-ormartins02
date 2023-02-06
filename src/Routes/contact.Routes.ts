import { Router } from "express";
import { createContactController } from "../controllers/contacts/createContact.controller";
import { retrieveContactController } from "../controllers/contacts/retrieveContact.controller";
import { updateContactController } from "../controllers/contacts/updateContact.controller";
import { deleteContactController } from "../controllers/contacts/deleteContact.controller";
import { ensureBodyVerifyMiddleware } from "../middlewares/ensureBodyVerify.middleware";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureIdVerifyMiddleware } from "../middlewares/ensureIdVerify.middleware";
import { ensureIsAdmMiddleware } from "../middlewares/ensureIsAdm.middleware";

export const contactRoutes = Router();

contactRoutes.post("",
  ensureAuthMiddleware,
  createContactController
);

contactRoutes.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  retrieveContactController
);

contactRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureIdVerifyMiddleware,
  ensureBodyVerifyMiddleware,
  updateContactController
);
contactRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIdVerifyMiddleware,
  deleteContactController
);
