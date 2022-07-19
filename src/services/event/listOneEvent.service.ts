import { AppDataSource } from "../../data-source";
import { Event } from "../../entities/Event";
import AppError from "../../errors/app-error";

const listOneEventService = async (id: string): Promise<Event> => {
  if (id.length !== 36) {
    throw new AppError("Wrong event id", 404);
  }

  const eventRepository = AppDataSource.getRepository(Event);

  const event = await eventRepository.findOneBy({
    id: id,
  });

  if (!event) throw new AppError("Event not found", 404);

  return event;
};

export default listOneEventService;
