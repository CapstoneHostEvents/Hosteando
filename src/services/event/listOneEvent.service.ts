import { AppDataSource } from "../../data-source";
import { Event } from "../../entities/Event";
import AppError from "../../errors/app-error";

export default class ListOneEventService {
  async execute(id: string) {
    const eventRepository = AppDataSource.getRepository(Event)

    const event = await eventRepository.findOneBy({
      id: id
    });

    if (!event) throw new AppError("Zone not found", 404)

    return event
  }
}
