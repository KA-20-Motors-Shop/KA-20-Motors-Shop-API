import { IAdID } from "../../interfaces/Ad/ad.interface";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import Ad from "../../models/Ad";

const adDeleteService = async({ad_id}: IAdID) => {
    const adRepository = AppDataSource.getRepository(Ad);
    const ad = await adRepository.findOne({where:{id: ad_id}});

    if(!ad){
        throw new AppError('Ad not found.', 404);
    }

    await adRepository.delete(ad.id);

    return ad;
;}

export default adDeleteService;