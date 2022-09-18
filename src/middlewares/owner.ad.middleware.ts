import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import jwt from "jsonwebtoken";
import Ad from "../models/Ad";
import userCreateService from "../services/users/users.create.service";


const verifyIsAdOwner = async (request: Request, response: Response, next: NextFunction) => {
    const {ad_id} = request.params;
    const token  = request.headers.authorization?.split(' ')[1];

    const adRepository = AppDataSource.getRepository(Ad);
    const ad = await adRepository.findOne({where: {id: ad_id}});


    jwt.verify(token as string, "secret_key", (error:any, decoded:any) => {
        if(error){
            return response.status(401).json({error: "Invalid token."});
        }
        const { sub } =  decoded;
        console.log(sub, '<---------------------sub');
        console.log(ad, '<----------- ad user id');
        if( ad?.user.id === sub){
            next()
        }else{
            return response.status(400).json({error:"Unauthorized."})
        }

    })

};

export default verifyIsAdOwner;