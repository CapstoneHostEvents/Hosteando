import { AppDataSource } from "../../data-source";
import { Event } from "../../entities/Event";
import AppError from "../../errors/app-error";
import { IEventUpdate } from "../../interfaces/event";

const updateEventService = async ({
  name,
  description,
  date,
  id,
  user,
}: IEventUpdate): Promise<Event> => {
  if (id.length !== 36) {
    throw new AppError("Wrong event id", 404);
  }

  const eventRepository = AppDataSource.getRepository(Event);

  const event = await eventRepository.findOneBy({
    id: id,
  });

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  if (event?.user.id !== user) {
    throw new AppError("No permission allowed", 403);
  }

  name ? (event.name = name) : event.name;
  description ? (event.description = description) : event.description;
  date ? (event.date = date) : event.date;

  await eventRepository.save(event);

  return event;
};

export default updateEventService;
