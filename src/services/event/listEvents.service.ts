import { AppDataSource } from "../../data-source";
import { Event } from "../../entities/Event";
import { IEventList } from "../../interfaces/event";

const listEventService = async (): Promise<IEventList[]> => {
  const eventRepository = AppDataSource.getRepository(Event);

  const events = await eventRepository.find();

  const returnedEvent: IEventList[] = [];

  events.map((e) => {
    returnedEvent.push({
      id: e.id,
      description: e.description,
      name: e.name,
      date: e.date,
      created_at: e.created_at,
      user: {
        name: e.user.name,
        id: e.user.id,
        email: e.user.email,
      },
    });
  });

  return returnedEvent;
};

export default listEventService;
