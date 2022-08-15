import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authUserMiddleware = (request: Request, response: Response, next: NextFunction) => {
    try{
        const token = request.headers.authorization?.split(' ')[1];

        jwt.verify(token as string, 'secret_key' as string, (err: any, decoded: any) => {
            request.body.email = decoded.email;
            next();
        })
    } catch (err) {
        return response.status(401).json({message: "Invalid token."})
    }    
}