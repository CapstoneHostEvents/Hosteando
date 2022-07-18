import { AppDataSource } from "../../data-source"
import { Event } from "../../entities/Event"

export const ListEventService = async (): Promise<Event[]> => {
  const eventRepository = AppDataSource.getRepository(Event)

  const event = await eventRepository.find()

  return event
}
