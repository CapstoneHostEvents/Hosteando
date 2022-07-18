import { IEventRequest, IEventResponse } from "../../interfaces/events"
import { Event } from "../../entities/Event"
import { AppDataSource } from "../../data-source"
import AppError from "../../errors/app-error"

export const CreateEventService = async ({name, description, date, user } : IEventRequest) : Promise<IEventResponse>  => {
  const eventRepository = AppDataSource.getRepository(Event)  

  const findEvent = await eventRepository.findOne({
    where: {
      name
    }
  })

  if (findEvent) {
    throw new AppError("This event already exists", 400)
  }
  
  const event = await eventRepository.create({
    name, 
    description, 
    date,
    user: user.id
  })

  await eventRepository.save(event)

  return event
}
