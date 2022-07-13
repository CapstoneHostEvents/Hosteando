import { AppDataSource } from "../../data-source";
import { Zone } from "../../entities/Zone";

export default class RetrieveZoneService {
  async execute(zoneId: string) {
    const zoneRepository = AppDataSource.getRepository(Zone);

    const zone = await zoneRepository.findOneBy({
      id: zoneId,
    });

    return zone;
  }
}
