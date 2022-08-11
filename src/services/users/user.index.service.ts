import { IIDObject } from "../../interfaces/User/user.interface";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import User from "../../models/User";


const userIndexService = async ({user_id}:IIDObject) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({where: {id : user_id}});

  if (!user) {
    throw new AppError("User not found");
  }

  const {password, ...response} = user;
  return response;
};

export default userIndexService;

