import { Request, Response } from "express";
import listAdService from "../services/Ads/ad.list.service";
import updateAdService from "../services/Ads/ad.patch.service";

export default class AdsController {
  static store = async (request: Request, response: Response) => {
    const bodyContent = request.body;

    // preencher com o service equivalente e descomentar as seguintes linhas:

    // const created_ad = await -->createAdService<--(bodyContent);
    // return response.status(201).json(created_ad);
  };
  static list = async (request: Request, response: Response) => {
    const ads = await listAdService();

    return response.json(ads);
  };

  static index = async (request: Request, response: Response) => {};

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
      isActive,
    });

    return response.status(200).json(ad);
  };

  static delete = async (request: Request, response: Response) => {};
}
