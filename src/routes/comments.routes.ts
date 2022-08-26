import { Router } from "express";
import CommentsController from "../controllers/comments.controller";

const routes = Router();

export const commentsRoutes = () => {

    routes.post('/', CommentsController.store);
    routes.get('/', CommentsController.list);
    routes.get('/:ads_id', CommentsController.index);
    // routes.get('/user/:user_id', CommentsController.listAdByUser); 
    routes.patch('/:ads_id', CommentsController.update);
    routes.delete('/:ads_id', CommentsController.delete); 

    return routes;
}