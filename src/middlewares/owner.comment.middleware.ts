import { AppDataSource } from "../data-source";
import Comment from "../models/Comment";
import User from "../models/User";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { json } from "stream/consumers";
import AppError from "../errors/AppError";

const verifyIsCommentOwner = async (request: Request, response: Response, next: NextFunction) => {
    const {comment_id} = request.params;
    const token  = request.headers.authorization?.split(' ')[1];

    console.log(comment_id, "<------------- REQUEST PARAM")

    const commentRepository = AppDataSource.getRepository(Comment);
    console.log('cheguei aqui')
    const comment: any= await commentRepository.findOne({where:{id:comment_id}});
    console.log('agora aqui')
    console.log(comment, " <----------------- COMENT USER ID")

   

    jwt.verify(token as string, "secret_key", (error:any, decoded:any) => {
        if(error){
            return response.status(401).json({error: "Invalid token."});
        }
        const { sub } =  decoded;  
        console.log(sub, "<--------------- SUB COMMOWNER");     
        
        if(comment?.user.id === sub){ //LINHA DO ERRO
            next()
        }else {
            return response.status(400).json({error: "Unauthorized"});
        }

    })

};

export default verifyIsCommentOwner;