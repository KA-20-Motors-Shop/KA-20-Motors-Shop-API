import { AppDataSource } from "../../data-source";
import Comment from "../../models/Comment";
import { ICommentID } from "../../interfaces/Comment/comment.interface";
import AppError from "../../errors/AppError";
import { Equal } from "typeorm";

const commentIndexService = async ({comment_id} : ICommentID) => {
    const commentRepository = AppDataSource.getRepository(Comment);
    const comment = await commentRepository.findOne({where:{id:comment_id}, relations:['user', 'ad']});
    
    if(!comment){
        throw new AppError('Comment not found.', 404);
    }
    
    return comment;
};

export default commentIndexService;
