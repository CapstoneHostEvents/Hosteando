import { AppDataSource } from "../../data-source";
import { IZoneCreate, IZoneRequest } from "../../interfaces/zones";
import { Zone } from "../../entities/Zone";
import { Event } from "../../entities/Event";
import AppError from "../../errors/app-error";

const createZoneService = async ({
  name,
  price,
  total_tickets,
  eventId,
  userId,
}: IZoneCreate): Promise<Zone> => {
  const zoneRepository = AppDataSource.getRepository(Zone);
  const eventRepository = AppDataSource.getRepository(Event);

  const zones = await zoneRepository.find();
  const event = await eventRepository.findOneBy({
    id: eventId,
  });

  if (!event) throw new AppError("Event not found", 404);

  if (event.user.id !== userId)
    throw new AppError("No permission allowed", 403);

  if (zones.find((z) => z.name === name && z.event.id === eventId))
    throw new AppError("Name alrealdy used for that event", 400);

  const zone = zoneRepository.create({
    name,
    price,
    total_tickets,
  });

  zone.event = event;

  await zoneRepository.save(zone);

  return zone;
};

export default createZoneService;
