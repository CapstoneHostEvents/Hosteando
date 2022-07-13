import { AppDataSource } from "../../data-source";
import { Zone } from "../../entities/Zone";

export default class ListZoneService {
  async execute() {
    const zoneRepository = AppDataSource.getRepository(Zone);

    const zones = await zoneRepository.find();

    return zones;
  }
}
