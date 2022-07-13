import { IEventRequest } from "../interfaces"
import { Event } from "../entities/event.entity"
import { AppDataSource } from "../data-source"

export const CreateEventService = async ({name, description, date } : IEventRequest) : Promise<IEventRequest>  => {
  const eventRepository = AppDataSource.getRepository(Event)   
   
  const event = eventRepository.create({
    name, 
    description, 
    date,
    created_at: Date()
  })

  await eventRepository.save(event)

  return event
}
