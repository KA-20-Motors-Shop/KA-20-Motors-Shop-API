import { Request, Response } from "express";
import listAdService from "../services/Ads/ad.list.service";
import updateAdService from "../services/Ads/ad.patch.service";
import createAdService from "../services/Ads/ad.create.service";
import adListByUserService from "../services/Ads/ad.listbyuser.service";
import adIndexService from "../services/Ads/ad.listOne.service";
import adDeleteService from "../services/Ads/ad.delete.service";

export default class AdsController {
  static store = async (request: Request, response: Response) => {
    const bodyContent = request.body;
    
    const createdAd = await createAdService(bodyContent);
    return response.status(201).json(createdAd);
   
  };
  static list = async (request: Request, response: Response) => {
    const ads = await listAdService();

    return response.json(ads);
  };

  static index = async (request: Request, response: Response) => {
    const {ad_id} = request.params;
    const ad = await adIndexService(ad_id);

    return response.json(ad);
  };

  static listAdByUser = async (request: Request, response: Response) => {
    const { user_id } = request.params;

    try{
      const ads = await adListByUserService({ user_id });
      return response.json(ads);
    }catch(err) {
      return response.send(err)
    }

  };

  static update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const {
      adType,
      title,
      year,
      price,
      description,
      vehicleType,
      mileage,
      image,
      gallery,
      isActive,
    } = request.body;

    const ad = await updateAdService({
      id,
      adType,
      title,
      year,
      price,
      description,
      vehicleType,
      mileage,
      image,
      gallery,
      isActive
    });

    return response.status(200).json(ad);
  };

  static delete = async (request: Request, response: Response) => {
    const {ad_id} = request.params;
    
    const deletedAd = await adDeleteService({ad_id});
    return response.status(204).json()
  };
}
