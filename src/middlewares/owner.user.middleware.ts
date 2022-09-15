import { AppDataSource } from "../data-source";
import Comment from "../models/Comment";
import User from "../models/User";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { json } from "stream/consumers";
import AppError from "../errors/AppError";

const verifyIsOwnUser = async (request: Request, response: Response, next: NextFunction) => {
    const {user_id} = request.params;
    const token  = request.headers.authorization?.split(' ')[1];

    jwt.verify(token as string, "secret_key", (error:any, decoded:any):any =>  {
        if(error){
            return response.status(401).json({error: "Invalid token."});
        }
        const { sub } =  decoded;

        console.log(user_id);
        console.log(sub);
        
        if(user_id === sub){
            next()
        }else {
            return response.status(403).json({message: 'unauthorized'})
        }
    })
    
};

export default verifyIsOwnUser;