import { AppDataSource } from "../../data-source";
import { Event } from "../../entities/Event";

const listEventService = async (): Promise<Event[]> => {
  const eventRepository = AppDataSource.getRepository(Event);

  const events = await eventRepository.find();

  return events;
};

export default listEventService;
