import { Request, Response } from "express"
import { CreateEventService } from "../../services/event/createEvent.service"
import { DeleteEventService } from "../../services/event/deleteEvent.service"
import { ListEventService } from "../../services/event/listEvents.service"
import { UpdateEventService } from "../../services/event/updateEvent.service"

export class CreateEventController {
  static async create (req: Request, res: Response) {
    const { name, description, date } = req.newEvent
    const user = req.user.id
    
    const newEvent = await CreateEventService({name, description, date, user})

    return res.status(201).json(newEvent)
  }

  static async read (req: Request, res: Response) {
    const events = await ListEventService()

    return res.status(200).json(events)
  }

  static async update (req: Request, res: Response) {
    const { name, description, date } = req.body
    const id = req.params.id
    const user = req.user.id
    
    const newEvent = await UpdateEventService({name, description, date, id, user})

    return res.status(201).json(newEvent)
  }

  static async delete (req: Request, res: Response) {
    const { id } = req.params
    const user = req.user.id

    await DeleteEventService(id, user)

    return res.status(200).json({ message: "Event deleted!" })
  }
} 
