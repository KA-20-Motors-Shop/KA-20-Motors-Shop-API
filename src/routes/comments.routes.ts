import { Router } from "express";
import CommentsController from "../controllers/comments.controller";
import { authUserMiddleware } from "../middlewares/auth.user.middleware";
import verifyIsCommentOwner from "../middlewares/owner.comment.middleware";

const routes = Router();

export const commentsRoutes = () => {

    routes.post('/', authUserMiddleware, CommentsController.store);
    routes.get('/', CommentsController.list);
    routes.get('/:comment_id', CommentsController.index);
    routes.get('/ad/:ad_id', CommentsController.listByAd); 
    routes.patch('/:comment_id', authUserMiddleware, verifyIsCommentOwner, CommentsController.update); //add verifyOwner
    routes.delete('/:comment_id', authUserMiddleware,verifyIsCommentOwner,  CommentsController.delete); //add verifyOwnwer 

    return routes;
}