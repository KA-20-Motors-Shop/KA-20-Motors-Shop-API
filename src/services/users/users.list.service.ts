import { AppDataSource } from "../../data-source";
import User from "../../models/User";

const userListService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  return users;
};

export default userListService;

