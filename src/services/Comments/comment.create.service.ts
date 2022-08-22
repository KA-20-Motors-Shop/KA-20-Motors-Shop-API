import { ICommentCreation } from "../../interfaces/Comment/comment.interface";
import { AppDataSource } from "../../data-source";
import Comment from "../../models/Comment";

const createCommentService = async ({
  description,
  ad,
  user,
}: ICommentCreation) => {
  const commentRepo = AppDataSource.getRepository(Comment);

  const newComment = new Comment();
  newComment.description = description;
  newComment.ad = ad;
  newComment.user = user;

  commentRepo.create(newComment);
  await commentRepo.save(newComment);

  return newComment;
};

export default createCommentService;
