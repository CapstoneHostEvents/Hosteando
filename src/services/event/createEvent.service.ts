import { IEventRequest, IEventResponse } from "../../interfaces/event";
import { Event } from "../../entities/Event";
import { User } from "../../entities/User";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/app-error";

const createEventService = async ({
  name,
  description,
  date,
  user,
}: IEventRequest): Promise<Event> => {
  const eventRepository = AppDataSource.getRepository(Event);
  const userRepository = AppDataSource.getRepository(User);

  const findEvent = await eventRepository.findOne({
    where: { name },
  });

  const userData = await userRepository.findOneBy({
    id: user,
  });

  if (userData?.id !== user) {
    throw new AppError("No permission allowed", 403);
  }

  if (findEvent) {
    throw new AppError("This event already exists", 403);
  }

  const event = await eventRepository.create({
    name,
    description,
    date,
    user: user,
  });

  await eventRepository.save(event);

  return event;
};

export default createEventService;
