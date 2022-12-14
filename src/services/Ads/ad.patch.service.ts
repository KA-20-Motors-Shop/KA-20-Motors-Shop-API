import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import { IAdUpdate } from "../../interfaces/Ad/ad.interface";
import Ad from "../../models/Ad";

const updateAdService = async ({
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
}: IAdUpdate) => {
  const adRepo = AppDataSource.getRepository(Ad);

  const foundAd = await adRepo.findOneBy({ id: id });

  if (!foundAd) {
    throw new AppError("Ad not found", 400);
  }

  adType ? (foundAd.adType = adType) : foundAd.adType;
  title ? (foundAd.title = title) : foundAd.title;
  year ? (foundAd.year = year) : foundAd.year;
  price ? (foundAd.price = price) : foundAd.price;
  description ? (foundAd.description = description) : foundAd.description;
  vehicleType ? (foundAd.vehicleType = vehicleType) : foundAd.vehicleType;
  image ? (foundAd.image = image) : foundAd.image;
  gallery ? (foundAd.gallery = gallery) : foundAd.gallery;
  isActive ? (foundAd.isActive = isActive) : foundAd.isActive;
  mileage ? (foundAd.mileage = mileage) : foundAd.mileage;

  return adRepo.save(foundAd);
};

export default updateAdService;
