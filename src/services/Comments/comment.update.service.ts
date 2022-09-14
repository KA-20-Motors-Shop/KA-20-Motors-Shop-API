import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import { ICommentUpdate } from "../../interfaces/Comment/comment.interface";
import Comment from "../../models/Comment";

const commentUpdateService = async ({description, id}: ICommentUpdate) => {
    const commentRepository = AppDataSource.getRepository(Comment);
    const comment = await commentRepository.findOne({where:{id: id}});
    
    if(!comment) {
        throw new AppError('Comment not found', 404);
    }

    comment.description = description;

    await commentRepository.save(comment);

    return comment;
}

export default commentUpdateService;