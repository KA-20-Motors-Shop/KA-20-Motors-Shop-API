import { IUserLogin } from "../../interfaces/User/user.interface";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userLoginService = async ({email, password}: IUserLogin ) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({where:{email:email}});

    if(!user){
        throw new AppError("Wrong email/password.", 403);
    }

    if(!bcrypt.compareSync(password, user.password)){
        throw new AppError("Wrong email/passoword.", 403)
    }

    const token = jwt.sign({email:email}, "secret_key",{expiresIn: '1d'})

    return {"token": token};
}

export default userLoginService;