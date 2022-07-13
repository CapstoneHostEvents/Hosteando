import { Request, Response } from "express"
import { CreateEventService } from "../services/createEvent.service"
import { ListEventService } from "../services/listEvents.service"

export class CreateEventController {
  static async create (req: Request, res: Response) {
    const { name, description, date } = req.body
    
    const newEvent = await CreateEventService({name, description, date})

    return res.status(200).json(newEvent)
  }

  static async read (req: Request, res: Response) {
    const events = await ListEventService()

    return res.json(events)
  }
} 