import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import { IIDObject } from "../../interfaces/User/user.interface";
import Ad from "../../models/Ad";
import User from "../../models/User";

const adListByUserService = async ({user_id}: IIDObject) => {
    const adRepository = AppDataSource.getRepository(Ad);
    const ads = await adRepository.find();

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({where:{id : user_id}});

    if(!user){
        throw new AppError('User not found')
    }

    const filteredAds = ads.filter(item => item.user.id === user.id);

    return filteredAds;
};

export default adListByUserService;
