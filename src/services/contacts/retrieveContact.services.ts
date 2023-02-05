import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entities";

export const retrieveContactService = async (): Promise<Contact[]> => {
  const contactRespository = AppDataSource.getRepository(Contact);

  const contact = await contactRespository.find();

  return contact;
};
