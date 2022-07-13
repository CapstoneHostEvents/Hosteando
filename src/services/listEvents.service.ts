import { AppDataSource } from "../data-source"
import { Event } from "../entities/event.entity"

export const ListEventService = async (): Promise<Event[]> => {
  const eventRepository = AppDataSource.getRepository(Event)

  const event = await eventRepository.find()

  return event
}
