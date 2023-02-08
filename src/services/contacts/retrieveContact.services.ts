import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entities";

export const retrieveContactService = async () => {
  const contactRespository = AppDataSource.getRepository(Contact);

  const contactList = await contactRespository.find();

  return contactList;
};
