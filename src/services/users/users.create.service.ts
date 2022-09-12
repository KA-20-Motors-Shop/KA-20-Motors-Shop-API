import {
  IUserCreation,
  IUserResponse,
} from "../../interfaces/User/user.interface";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import User from "../../models/User";
import bcrypt from "bcrypt";

const userCreateService = async (
  requestObject: IUserCreation
): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { email: requestObject.email },
  });
  if (user) {
    throw new AppError("This user already exists", 409);
  }

  const hashedPassword = bcrypt.hashSync(requestObject.password, 8);

  const newUser = new User();
  newUser.name = requestObject.name;
  newUser.email = requestObject.email;
  newUser.cpf = requestObject.cpf;
  newUser.birthdate = requestObject.birthdate;
  newUser.celphone = requestObject.celphone;
  newUser.description = requestObject.description;
  newUser.state = requestObject.state;
  newUser.city = requestObject.city;
  newUser.CEP = requestObject.CEP;
  newUser.street = requestObject.street;
  newUser.number = requestObject.number;
  newUser.complement = requestObject.complement;
  newUser.accountType = requestObject.accountType;
  newUser.password = hashedPassword;

  userRepository.create(newUser);
  await userRepository.save(newUser);

  const { password, ...response } = newUser;

  return response;
};

export default userCreateService;
