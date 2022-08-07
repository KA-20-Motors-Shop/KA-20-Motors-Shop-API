import { IAdCreation } from "../../interfaces/Ad/ad.interface";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import Ad from "../../models/Ad";

const createDriverService = async (bodyContent: IAdCreation) => {
  const adRepo = AppDataSource.getRepository(Ad);

  const ads = await adRepo.find();

  const existentAd = ads.find((ad) => ad.title === bodyContent.title);

  if (existentAd) {
    throw new AppError("Ad already registered", 409);
  }

  const newAd = new Ad();
  newAd.adType = bodyContent.adType;
  newAd.title = bodyContent.title;
  newAd.year = bodyContent.year;
  newAd.mileage = bodyContent.mileage;
  newAd.price = bodyContent.price;
  newAd.description = bodyContent.description;
  newAd.vehicleType = bodyContent.vehicleType;
  newAd.image = bodyContent.image;
  newAd.gallery = bodyContent.gallery;
  newAd.createdOn = bodyContent.createdOn;
  newAd.user = bodyContent.user;

  adRepo.create(newAd);
  await adRepo.save(newAd);

  return newAd;
};

export default createDriverService;