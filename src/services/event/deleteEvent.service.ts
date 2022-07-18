import { AppDataSource } from "../../data-source"
import { Event } from "../../entities/Event"
import AppError from "../../errors/app-error"

export const DeleteEventService = async (id: string, user: string) => {
  const eventRepository = AppDataSource.getRepository(Event)

  if (id.length !== 36) {
    throw new AppError("Wrong event id", 404)
  }

  const event = await eventRepository.findOneBy({
    id: id
  })

  if (!event) {
    throw new AppError("Event not found", 404)
  }

  if (event.user.id !== user) {
    throw new AppError("No permission allowed", 403)
  }

  await eventRepository.delete(event)

  return true
}
