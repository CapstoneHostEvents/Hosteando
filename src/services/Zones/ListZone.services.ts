import { AppDataSource } from "../../data-source";
import { Zone } from "../../entities/Zone";
import AppError from "../../errors/app-error";

const ListZoneService = async (): Promise<Zone[]> => {
  const zoneRepository = AppDataSource.getRepository(Zone);

  const zones = await zoneRepository.find();

  if (zones.length === 0) throw new AppError("No zone found", 404);

  return zones;
};

export default ListZoneService;
