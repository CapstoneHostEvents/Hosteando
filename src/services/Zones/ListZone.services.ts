import { AppDataSource } from "../../data-source";
import { Zone } from "../../entities/Zone";
import AppError from "../../errors/app-error";

export default class ListZoneService {
  async execute() {
    const zoneRepository = AppDataSource.getRepository(Zone);

    const zones = await zoneRepository.find();

    if (zones.length === 0) throw new AppError("No zone found", 404);

    return zones;
  }
}
