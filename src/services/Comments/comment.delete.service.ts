import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import Comment from "../../models/Comment";
import { ICommentID } from "../../interfaces/Comment/comment.interface";

const commentDeleteService = async({comment_id}: ICommentID) => {
    const commentRepository = AppDataSource.getRepository(Comment);
    const comment = await commentRepository.findOne({where:{id: comment_id}});

    if(!comment){
        throw new AppError('Comment not found.', 404);
    }

    await commentRepository.delete(comment!.id);

    return comment;
}

export default commentDeleteService;