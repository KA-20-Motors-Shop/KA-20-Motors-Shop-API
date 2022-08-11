import { IIDObject } from "../../interfaces/User/user.interface";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import User from "../../models/User";


const userDeleteService = async ({user_id}:IIDObject) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({where: {id : user_id}});

  if (!user) {
    throw new AppError("User not found");
  }

  await userRepository.delete(user!.id);

  const {password, ...otherKeys} = user;
  
  return otherKeys;
};

export default userDeleteService;