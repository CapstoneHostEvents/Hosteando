import { AppDataSource } from "../../data-source";
import { Zone } from "../../entities/Zone";
import AppError from "../../errors/app-error";

const retrieveZoneService = async (zoneId: string): Promise<Zone> => {
  const zoneRepository = AppDataSource.getRepository(Zone);

  const zone = await zoneRepository.findOneBy({
    id: zoneId,
  });

  if (!zone) throw new AppError("Zone not found", 404);

  return zone;
};

export default retrieveZoneService;
