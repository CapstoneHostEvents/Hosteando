import { Request, Response } from "express";
import createEventService from "../../services/event/createEvent.service";
import deleteEventService from "../../services/event/deleteEvent.service";
import listEventService from "../../services/event/listEvents.service";
import listOneEventService from "../../services/event/listOneEvent.service";
import updateEventService from "../../services/event/updateEvent.service";

export default class EventController {
  async create(req: Request, res: Response) {
    const { name, description, date } = req.newEvent;
    const user = req.user.id;
    const newEvent = await createEventService({
      name,
      description,
      date,
      user,
    });
    return res.status(201).json(newEvent);
  }

  async read(req: Request, res: Response) {
    const events = await listEventService();
    return res.status(200).json(events);
  }

  async readOneEvent(req: Request, res: Response) {
    const id = req.params.id;
    const event = await listOneEventService(id);
    return res.status(200).json(event);
  }

  async update(req: Request, res: Response) {
    const { name, description, date } = req.body;
    const id = req.params.id;
    const user = req.user.id;
    const newEvent = await updateEventService({
      name,
      description,
      date,
      id,
      user,
    });

    return res.status(200).json(newEvent);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.user.id;
    await deleteEventService(id, user);
    return res.status(200).json({ message: "Event deleted!" });
  }
}
