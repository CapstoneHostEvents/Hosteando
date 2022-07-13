import { IEventRequest } from "../interfaces/events"
import { Event } from "../entities/event.entity"
import { AppDataSource } from "../data-source"
import AppError from "../errors/app-error"

export const CreateEventService = async ({name, description, date } : IEventRequest) : Promise<IEventRequest>  => {
  const eventRepository = AppDataSource.getRepository(Event)   

  const findEvent = await eventRepository.findOne({
    where: {
      name: name
    }
  })

  if (findEvent) {
    throw new AppError("This event already exists")
  }
   
  const event = await eventRepository.create({
    name, 
    description, 
    date,
  })

  await eventRepository.save(event)

  return event
}
