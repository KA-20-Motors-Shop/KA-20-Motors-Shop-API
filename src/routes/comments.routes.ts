import { Router } from "express";
import CommentsController from "../controllers/comments.controller";

const routes = Router();

export const commentsRoutes = () => {

    routes.post('/', CommentsController.store);
    routes.get('/', CommentsController.list);
    routes.get('/:comment_id', CommentsController.index);
    routes.get('/ad/:ad_id', CommentsController.listByAd); 
    routes.patch('/:comment_id', CommentsController.update);
    routes.delete('/:comment_id', CommentsController.delete); 

    return routes;
}