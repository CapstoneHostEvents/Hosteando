import { AppDataSource } from "../../data-source";
import { IZoneCreate, IZoneList, IZoneRequest } from "../../interfaces/zone";
import { Zone } from "../../entities/Zone";
import { Event } from "../../entities/Event";
import AppError from "../../errors/app-error";

const createZoneService = async ({
  name,
  price,
  total_tickets,
  eventId,
  userId,
}: IZoneCreate): Promise<IZoneList> => {
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

  const zoneReturned: IZoneList = {
    ...zone,
    event: {
      created_at: zone.event.created_at,
      id: zone.event.id,
      date: zone.event.date,
      description: zone.event.description,
      name: zone.event.name,
      user: {
        id: zone.event.user.id,
        name: zone.event.user.name,
        email: zone.event.user.email,
      },
    },
  };

  return zoneReturned;
};

export default createZoneService;
