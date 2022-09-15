import { IUpdateUser } from "../../interfaces/User/user.interface";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import User from "../../models/User";
import bcrypt from "bcrypt"


const userUpdateService =  async(dataObject: IUpdateUser) => {
    
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({where:{id:dataObject.user_id}});
    
    if(!user){
        throw new AppError('User not found', 404);
    }

    if(dataObject.password){
        const hashedPassword = bcrypt.hashSync(dataObject.password, 8);   
        dataObject.password = hashedPassword;
    }
    
    const {user_id, ...remainingDataObject} = dataObject

    const updatedUser = {
        ...user,
        ...remainingDataObject,
    }
    // console.log(dataObject);
    // console.log(user);
    // console.log(updatedUser);
    // await userRepository.update(user!.id, updatedUser); // ERROR LINE
    await userRepository.save(updatedUser);
    
    const {password, ...remaingKeys} = updatedUser;
    
    return remaingKeys;

}   

export default userUpdateService;