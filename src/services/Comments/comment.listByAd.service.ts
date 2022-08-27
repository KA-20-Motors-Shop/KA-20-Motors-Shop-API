import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import { IAdID } from "../../interfaces/Ad/ad.interface";
import Ad from "../../models/Ad";
import Comment from "../../models/Comment";

const commentListByAdService = async ({ad_id}: IAdID) => {
    const adRespository = AppDataSource.getRepository(Ad);
    const selected_ad = await adRespository.findOne({where:{id:ad_id}});

    if(!selected_ad){
        throw new AppError('this ad does not exist', 404);
    }
    
    const commentRepository =  AppDataSource.getRepository(Comment);
    const comments = await commentRepository.find({where:{ad: selected_ad}});

    return comments

}

export default commentListByAdService;