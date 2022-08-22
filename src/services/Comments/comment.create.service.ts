import { ICommentCreation } from "../../interfaces/Comment/comment.interface";
import { AppDataSource } from "../../data-source";
import Comment from "../../models/Comment";

const createCommentService = async (bodyContent: ICommentCreation) => {
  const commentRepo = AppDataSource.getRepository(Comment);

  const newComment = new Comment();
  newComment.description = bodyContent.description;
  newComment.ad = bodyContent.ad;
  newComment.user = bodyContent.user;

  commentRepo.create(newComment);
  await commentRepo.save(newComment);

  return newComment;
};

export default createCommentService;
