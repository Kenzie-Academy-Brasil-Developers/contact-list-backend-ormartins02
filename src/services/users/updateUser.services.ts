import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entities";
import { AppError } from "../../errors/appError";
import { IContactUpdate } from "../../interfaces/contactsInterfaces";

export const updateUserService = async (
  { name, email, phone }: IContactUpdate,
  id: string
): Promise<Contact> => {

  const contactRepository = AppDataSource.getRepository(Contact);

  const findUser = await contactRepository.findOneBy({
    id,
  });

  if (!findUser) {
    throw new AppError("User not Found", 404);
  }

  await contactRepository.update(id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    phone: phone ? phone : findUser.phone,
  });

  const updatedContact = await contactRepository.findOneBy({
    id,
  });

  return updatedContact!;
};
