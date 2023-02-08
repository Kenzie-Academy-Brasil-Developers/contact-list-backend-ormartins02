import { IContactRequest } from "../../interfaces/contactsInterfaces";
import { Contact } from "../../entities/contact.entities";
import AppDataSource from "../../data-source";
import AppError from "../../errors/appError";
import { User } from "../../entities/user.entities";

export const createNewContactService = async ({
  name,
  email,
  phone,
}: IContactRequest, id: any)=> {


  const contactRepository = AppDataSource.getRepository(Contact);

  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({id})

  const emailExist = await contactRepository.findOne({ where: {
    email
  },
  relations: {
    user: true,
  }, });

  if (emailExist){ 
    const userContactExist = emailExist.user.id

    const userRequired = user.id

    if (userContactExist === userRequired) {
      throw new AppError("You already have this contact", 409);
    }
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
