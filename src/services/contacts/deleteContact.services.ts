import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entities";
import AppError from "../../errors/appError";

export const deleteContactService = async (id: string) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const findContact = await contactRepository.findOneBy({
    id,
  });

  if (!findContact) {
    throw new AppError("Contact not Found", 404);
  }

  return "Contact desactived";
};
