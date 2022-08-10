import { Request, Response } from "express";
import listAdService from "../services/Ads/ad.list.service";
import createAdService from "../services/Ads/ad.create.service";

export default class AdsController {
  static store = async (request: Request, response: Response) => {
    const bodyContent = request.body;

    const created_ad = await createAdService(bodyContent);
    return response.status(201).json(created_ad);
  };
  static list = async (request: Request, response: Response) => {
    const ads = await listAdService();

    return response.json(ads);
  };

  static index = async (request: Request, response: Response) => {};

  static update = async (request: Request, response: Response) => {};

  static delete = async (request: Request, response: Response) => {};
}
