import AdsController from "../../controllers/ads.controller";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import { IIDObject } from "../../interfaces/User/user.interface";
import Ad from "../../models/Ad";
import User from "../../models/User";

const adListByUserService = async ({user_id}: IIDObject) => {

    const userRepository = AppDataSource.getRepository(User);
    const selected_user = await userRepository.findOne({where:{id: user_id}})

    if(!selected_user) {
        throw new AppError('Thos user do not exist', 404);
    }

    const adRepository = AppDataSource.getRepository(Ad);
    const ads = await adRepository.find({where:{user: selected_user}});
  
    
    return ads;
};

export default adListByUserService;
