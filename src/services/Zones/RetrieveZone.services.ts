import { AppDataSource } from "../../data-source";
import { Zone } from "../../entities/Zone";
import AppError from "../../errors/app-error";

export default class RetrieveZoneService {
  async execute(zoneId: string) {
    const zoneRepository = AppDataSource.getRepository(Zone);

    const zone = await zoneRepository.findOneBy({
      id: zoneId,
    });

    if (!zone) throw new AppError("Zone not found", 404);

    return zone;
  }
}
