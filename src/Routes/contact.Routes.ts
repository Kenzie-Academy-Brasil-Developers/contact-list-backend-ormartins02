import { Router } from "express";
import { createContactController } from "../controllers/contacts/createContact.controller";
import { retrieveContactController } from "../controllers/contacts/retrieveContact.controller";
import { updateContactController } from "../controllers/contacts/updateContact.controller";
import { deleteContactController } from "../controllers/contacts/deleteContact.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureIsAdmMiddleware } from "../middlewares/ensureIsAdm.middleware";
import { ensureIdContactVerifyMiddleware } from "../middlewares/ensureIdContactVerify.middleware";
import { ensureIsAdmToUpdateContactMiddleware } from "../middlewares/ensureIsAdmToUpdateContact.middleware";

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
  ensureIdContactVerifyMiddleware,
  ensureIsAdmToUpdateContactMiddleware,
  updateContactController
);
contactRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIdContactVerifyMiddleware,
  ensureIsAdmToUpdateContactMiddleware,
  deleteContactController
);
