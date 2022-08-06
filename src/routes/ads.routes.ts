import { Router } from "express";
import AdsController from "../controllers/ads.controller";

const routes = Router();

export const adsRoutes = () => {

    routes.post('/', AdsController.store);
    routes.get('/', AdsController.list);
    routes.get('/:ads_id', AdsController.index); 
    routes.patch('/:ads_id', AdsController.update);
    routes.delete('/:ads_id', AdsController.delete); 

    return routes;
}