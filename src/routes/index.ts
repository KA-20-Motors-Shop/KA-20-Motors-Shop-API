import { Router, Express } from "express";

import { adsRoutes } from "./ads.routes";
import { usersRoutes } from "./users.routes";

export const appRoutes = (app: Express) => {
    app.use('/ads', adsRoutes());
    app.use('/users', usersRoutes());
}


