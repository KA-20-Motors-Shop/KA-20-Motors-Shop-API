import { IUpdateUser } from "../../interfaces/User/user.interface";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import User from "../../models/User";
import bcrypt from "bcrypt"


const userUpdateService =  async(user_id: string, dataObject: IUpdateUser) => {
    const userRepository = AppDataSource.getRepository(User);

    const user:any = await userRepository.findOne({where:{id:user_id}});
    
    if(!user){
        throw new AppError('User not found', 404);
    }

    if(dataObject.password){
        const hashedPassword = bcrypt.hashSync(dataObject.password, 8);   
        dataObject.password = hashedPassword;
    }

    const updatedUser = {
        ...user,
        ...dataObject,
    }

    await userRepository.update(user!.id, updatedUser);

    const {password, ...remaingKeys} = updatedUser
    return remaingKeys

}   

export default userUpdateService;