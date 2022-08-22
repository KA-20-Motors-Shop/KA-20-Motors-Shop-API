import { Request, Response } from "express";
import createCommentService from "../services/Comments/comment.create.service";

export default class CommentsController {
  static store = async (request: Request, response: Response) => {
    const { description, ad, user } = request.body;

    const createComment = await createCommentService({ description, ad, user });
    return response.status(201).json(createComment);
  };
  static list = async (request: Request, response: Response) => {};

  static index = async (request: Request, response: Response) => {};

  static update = async (request: Request, response: Response) => {};

  static delete = async (request: Request, response: Response) => {};
}
