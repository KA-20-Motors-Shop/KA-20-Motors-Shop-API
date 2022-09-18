import { Router } from "express";
import AdsController from "../controllers/ads.controller";
import { authUserMiddleware } from "../middlewares/auth.user.middleware";
import verifyIsAdOwner from "../middlewares/owner.ad.middleware";

const routes = Router();

export const adsRoutes = () => {

    routes.post('/', authUserMiddleware, AdsController.store);
    routes.get('/', AdsController.list);
    routes.get('/:ad_id', AdsController.index);
    routes.get('/byuser/:user_id', AdsController.listAdByUser); 
    routes.patch('/:id', authUserMiddleware, verifyIsAdOwner, AdsController.update); //incluir verifyOwner
    routes.delete('/:ad_id',authUserMiddleware, verifyIsAdOwner, AdsController.delete); //incluir verifyOwner 

    return routes;
}