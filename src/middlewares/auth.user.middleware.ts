import { verify } from "crypto";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";

export const authUserMiddleware = (request:Request, response:Response, next:NextFunction) => {
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Token is missing.", 401);
    }

    try {
        const [, token] = authHeader.split(' ');
        const secret = "secret_key";
        const decoded = jwt.verify(token, secret);
        // const {sub} = decoded;

        // request.user = {
        //     id: sub as string,
        // };
        return next();
    } catch(err){
         throw new AppError("Invalid Token", 403)
    }


}




// export const authUserMiddleware = (request: Request, response: Response, next: NextFunction) => {
//     try{
//         const token = request.headers.authorization?.split(' ')[1];

//         jwt.verify(token as string, 'secret_key' as string, (err: any, decoded: any) => {
//             // request.body.email = decoded.email
//             next();
//         })
//     } catch (err) {
//         return response.status(401).json({message: "Invalid token."})
//     }    
// }