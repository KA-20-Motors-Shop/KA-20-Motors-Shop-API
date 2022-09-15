import { ICommentCreation } from "../../interfaces/Comment/comment.interface";
import { AppDataSource } from "../../data-source";
import Comment from "../../models/Comment";
import User from "../../models/User";
import AppError from "../../errors/AppError";
import Ad from "../../models/Ad";

const createCommentService = async ({description, ad, user,}: ICommentCreation) => {
  const commentRepo = AppDataSource.getRepository(Comment);

  const userRepository = AppDataSource.getRepository(User);
  const selectedUser = await userRepository.findOne({where:{id: user.id}})
  
    if(!selectedUser){
      throw new AppError("User not found", 404);
    }

  const adRepository = AppDataSource.getRepository(Ad);
  const selectedAd = await adRepository.findOne({where:{id: ad.id}});
  
  if (!selectedAd){
    throw new AppError("Advertisement not found", 404);
  }

  const newComment = new Comment();
  newComment.description = description;
  newComment.createdOn = new Date();
  newComment.ad = selectedAd;
  newComment.user = selectedUser;

  commentRepo.create(newComment);
  await commentRepo.save(newComment);

  return newComment;
};

export default createCommentService;
