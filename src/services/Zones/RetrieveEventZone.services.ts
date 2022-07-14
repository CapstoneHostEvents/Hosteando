import { AppDataSource } from "../../data-source";
import { Zone } from "../../entities/Zone";

export default class RetrieveEventZoneService {
  async execute(eventId: string) {
    const zoneRepository = AppDataSource.getRepository(Zone);

    const zones = await zoneRepository.find();

    const zonesEvents = zones.filter((z) => z.event.id == eventId);

    return zonesEvents;
  }
}
