import { AppDataSource } from "../../data-source";
import { Zone } from "../../entities/Zone";
import AppError from "../../errors/app-error";
import { IZoneList } from "../../interfaces/zone";

const retrieveZoneService = async (zoneId: string): Promise<IZoneList> => {
  const zoneRepository = AppDataSource.getRepository(Zone);

  const zone = await zoneRepository.findOneBy({
    id: zoneId,
  });

  if (!zone) throw new AppError("Zone not found", 404);

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

export default retrieveZoneService;
