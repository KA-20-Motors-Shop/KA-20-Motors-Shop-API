import { Request, Response } from "express";
import { cp } from "fs";
import createCommentService from "../services/Comments/comment.create.service";
import commentDeleteService from "../services/Comments/comment.delete.service";
import commentIndexService from "../services/Comments/comment.index.service";
import commentListService from "../services/Comments/comment.list.service";
import commentListByAdService from "../services/Comments/comment.listByAd.service";
import commentUpdateService from "../services/Comments/comment.update.service";

export default class CommentsController {
  static store = async (request: Request, response: Response) => {
    const { description, ad, user, createdOn  } = request.body;

    const createComment = await createCommentService({ createdOn, description, ad, user });
    return response.status(201).json(createComment);
  };
  static list = async (request: Request, response: Response) => {
    const comments = await commentListService()
    return response.json(comments)
  };

  static update = async (request: Request, response: Response) => {
    const {description} =  request.body;
    const {id} = request.params;

    const updatedComment = await commentUpdateService({description, id});

    return response.json(updatedComment);
  };

  static index = async (request: Request, response: Response) => {
    const {comment_id} = request.params;
    
    const comment = await commentIndexService({comment_id});
    
    return response.json(comment);
  };

  static delete = async (request: Request, response: Response) => {
    const {comment_id} = request.params;
    const deletedComment = await commentDeleteService({comment_id});

    return response.status(204).json();
  };

  static listByAd = async (request: Request, response: Response) => {
    const {ad_id} = request.params;
    const comments = await commentListByAdService({ad_id});
    return response.json(comments);
  };

}
