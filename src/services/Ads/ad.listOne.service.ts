import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import Ad from "../../models/Ad";

const adIndexService = async (id: string) => {
  const adsRepository = AppDataSource.getRepository(Ad);

  const ad = await adsRepository.findOneBy({ id: id });

  if (!ad) {
    throw new AppError("Ad not found or doesn't exists");
  }

  return ad;
};

export default adIndexService;
