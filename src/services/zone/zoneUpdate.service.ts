import { AppDataSource } from "../../data-source";
import { Zone } from "../../entities/Zone";
import AppError from "../../errors/app-error";
import { IZoneUpdate } from "../../interfaces/zones";

const zoneUpdateService = async ({
  name,
  price,
  total_tickets,
  eventId,
  zoneId,
}: IZoneUpdate): Promise<Zone> => {
  const zoneRepository = AppDataSource.getRepository(Zone);

  const zone = await zoneRepository.findOne({
    where: { id: zoneId },
  });

  if (!zone) {
    throw new AppError("Zone not found!", 404);
  }

  if (eventId) throw new AppError("Cannot change eventId for a zone", 403);

  if (zone.ticket.length > total_tickets)
    throw new AppError("More tickets issued than new total tickets", 403);

  const updatedZone = {
    ...zone,
    name,
    price,
    total_tickets,
  };

  return zoneRepository.save(updatedZone);
};
export default zoneUpdateService;
