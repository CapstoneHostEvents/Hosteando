import { AppDataSource } from "../../data-source";
import { Event } from "../../entities/Event";
import AppError from "../../errors/app-error";

export const ListOneEventService = async (id: string) => {

  if (id.length !== 36) {
    throw new AppError("Wrong event id", 404)
  }

  const eventRepository = AppDataSource.getRepository(Event)

  const event = await eventRepository.findOneBy({
    id: id
  })

  console.log(`Event: ${event}`)

  if (!event) throw new AppError("Event not found", 404)

  return event
}
