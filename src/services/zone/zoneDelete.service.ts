import { AppDataSource } from "../../data-source";
import { Zone } from "../../entities/Zone";
import AppError from "../../errors/app-error";

const zoneDeleteService = async (zoneId: string): Promise<void> => {
  const zoneRepository = AppDataSource.getRepository(Zone);

  const zone = await zoneRepository.findOne({
    where: { id: zoneId },
  });

  if (!zone) throw new AppError("Zone not found!", 404);

  if (zone.ticket.length > 0)
    throw new AppError("There are tickets for that zone", 403);

  await zoneRepository.remove(zone);
};
export default zoneDeleteService;
