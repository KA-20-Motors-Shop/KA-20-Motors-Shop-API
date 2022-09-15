import { Router } from "express";
import UserController from "../controllers/users.controller";
import { authUserMiddleware } from "../middlewares/auth.user.middleware";
import verifyIsOwnUser from "../middlewares/owner.user.middleware";

const routes = Router();

export const usersRoutes = () => {

    routes.post('/', UserController.store);
    routes.get('/', UserController.list);
    routes.get('/:user_id', UserController.index); 
    routes.patch('/:user_id', authUserMiddleware, verifyIsOwnUser, UserController.update); //add verifyownwer
    routes.delete('/:user_id', authUserMiddleware, verifyIsOwnUser, UserController.delete); //add verifyowner
    routes.post('/login', UserController.login);

    return routes;
}