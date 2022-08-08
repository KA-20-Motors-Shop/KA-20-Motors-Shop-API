import { AppDataSource } from "../../data-source";
import Ad from "../../models/Ad";

const listAdService = async () => {
  const adRepo = AppDataSource.getRepository(Ad);

  const ads = adRepo.find();

  return ads;
};

export default listAdService;
