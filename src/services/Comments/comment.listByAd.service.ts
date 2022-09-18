import { SimpleConsoleLogger } from "typeorm";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import { IAdID } from "../../interfaces/Ad/ad.interface";
import Ad from "../../models/Ad";
import Comment from "../../models/Comment";

const commentListByAdService = async ({ad_id}: IAdID) => {
    console.log('CHEGUEI AQUI')
    const adRespository = AppDataSource.getRepository(Ad);
    const selected_ad = await adRespository.findOne({where:{id:ad_id}});
    console.log(selected_ad, '<-------------- SELECTED AD');
    if(!selected_ad){
        throw new AppError('this ad does not exist', 404);
    }
    
    const commentRepository =  AppDataSource.getRepository(Comment);
    const comments = await commentRepository.find({where:{ad: selected_ad}, relations:['ad', 'user']});
    console.log(comments, '<------------- COMENTS')
    return comments

}

export default commentListByAdService;