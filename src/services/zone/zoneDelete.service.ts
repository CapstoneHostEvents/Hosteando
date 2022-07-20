import { AppDataSource } from "../../data-source";
import { Zone } from "../../entities/Zone";
import AppError from "../../errors/app-error";
import { IZoneDelete } from "../../interfaces/zone";

const zoneDeleteService = async ({
  userId,
  zoneId,
}: IZoneDelete): Promise<void> => {
  const zoneRepository = AppDataSource.getRepository(Zone);

  const zone = await zoneRepository.findOne({
    where: { id: zoneId },
  });

  if (!zone) throw new AppError("Zone not found!", 404);

  if (zone.ticket.length > 0)
    throw new AppError("There are tickets for that zone", 403);

  if (zone.event.user.id !== userId)
    throw new AppError("No permission allowed", 403);

  await zoneRepository.remove(zone);
};
export default zoneDeleteService;
