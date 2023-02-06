import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entities";
import { User } from "../../entities/user.entities";
import { AppError } from "../../errors/appError";
import { IContactRequest } from "../../interfaces/contactsInterfaces";

export const createNewContactService = async ({
  name,
  email,
  phone,
}: IContactRequest, id: any)=> {

  const contactRepository = AppDataSource.getRepository(Contact);

  const emailExist = await contactRepository.findOneBy({ email });

  if (emailExist) {
    throw new AppError("This email is already being used", 400);
  }

  const contact = contactRepository.create({
    name,
    email,
    phone,
    user: id
  });

  await contactRepository.save(contact);

  return contact;
};
