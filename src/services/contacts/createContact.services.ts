import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entities";
import { AppError } from "../../errors/appError";
import { IUserRequest } from "../../interfaces/usersInterfaces";

export const createNewContactService = async ({
  name,
  email,
  phone,
}: IUserRequest): Promise<Contact> => {

  const contactRepository = AppDataSource.getRepository(Contact);

  const emailExist = await contactRepository.findOneBy({ email });

  if (emailExist) {
    throw new AppError("This email is already being used", 400);
  }

  const contact = contactRepository.create({
    name,
    email,
    phone,
  });

  await contactRepository.save(contact);

  return contact;
};
