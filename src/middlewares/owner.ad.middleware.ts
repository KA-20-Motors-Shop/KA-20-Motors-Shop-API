import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import jwt from "jsonwebtoken";
import Ad from "../models/Ad";


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
        console.log(sub, "<--------SUB ADOWNER")
        console.log(ad?.user.id, "<------------ AD USER ID ADOWNER")

        if( ad?.user.id === sub){
            next()
        }else{
            return response.status(400).json({error:"Unauthorized."})
        }

    })

};

export default verifyIsAdOwner;