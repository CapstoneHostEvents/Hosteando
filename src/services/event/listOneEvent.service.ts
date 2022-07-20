import { AppDataSource } from "../../data-source";
import { Event } from "../../entities/Event";
import AppError from "../../errors/app-error";
import { IEventList } from "../../interfaces/event";

const listOneEventService = async (id: string): Promise<IEventList> => {
  if (id.length !== 36) {
    throw new AppError("Wrong event id", 404);
  }

  const eventRepository = AppDataSource.getRepository(Event);

  const event = await eventRepository.findOneBy({
    id: id,
  });

  if (!event) throw new AppError("Event not found", 404);

  const returnedEvent: IEventList = {
    ...event,
    user: {
      id: event.user.id,
      name: event.user.name,
      email: event.user.email,
    },
  };

  return returnedEvent;
};

export default listOneEventService;
