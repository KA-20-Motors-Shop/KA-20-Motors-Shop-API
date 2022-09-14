import { IAdCreation } from "../../interfaces/Ad/ad.interface";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import Ad from "../../models/Ad";
import User from "../../models/User";

const createAdService = async (bodyContent: IAdCreation) => {
  const adRepo = AppDataSource.getRepository(Ad);

  const ads = await adRepo.findOneBy({ title: bodyContent.title });

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: bodyContent.user.id },
  });

  if (ads) {
    throw new AppError("Ad already registered", 409);
  }

  if (!user) {
    throw new AppError("Invalid User", 400);
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
  newAd.createdOn = new Date();
  newAd.user = user;
  newAd.isActive = bodyContent.isActive;

  adRepo.create(newAd);
  await adRepo.save(newAd);

  return newAd;
};

export default createAdService;
