import { Request, Response } from "express"
import { CreateEventService } from "../../services/event/createEvent.service"
import { ListEventService } from "../../services/event/listEvents.service"

export class CreateEventController {
  static async create (req: Request, res: Response) {
    const { name, description, date } = req.newEvent
    const user = req.user
    
    const newEvent = await CreateEventService({name, description, date, user})

    return res.json(newEvent)
  }

  static async read (req: Request, res: Response) {
    const events = await ListEventService()

    return res.status(200).json(events)
  }
} 
