import { Router, Express } from "express";

import { adsRoutes } from "./ads.routes";

export const appRoutes = (app: Express) => {
    app.use('/ads', adsRoutes());

}


