import { Router } from "express";
import UserController from "../controllers/users.controller";
import { authUserMiddleware } from "../middlewares/auth.user.middleware";

const routes = Router();

export const usersRoutes = () => {

    routes.post('/', UserController.store);
    routes.get('/', UserController.list);
    routes.get('/:user_id', UserController.index); 
    routes.patch('/:user_id', UserController.update);
    routes.delete('/:user_id', UserController.delete); 
    routes.post('/login', UserController.login);

    return routes;
}