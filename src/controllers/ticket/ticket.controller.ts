import { Request, Response } from "express";
import ticketCreateService from "../../services/ticket/ticketCreate.service";
import ticketListService from "../../services/ticket/ticketList.service";
import ticketListIndexService from "../../services/ticket/ticketListIndex.service";


export default class TicketController {
  // Create ticket
  async store(req: Request, res: Response) {
    const { userId, zoneId } = req.body;
    const newTicket = await ticketCreateService({userId, zoneId})

    return res.status(201).json(newTicket);
  }

  //List all tickets
  async index(req: Request, res: Response) {
    const ticketList = await ticketListService();
    return res.status(200).json(ticketList)
  }

  //List all tickets from Id 
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const ticketList = await ticketListIndexService(id)

    return res.status(200).json(ticketList);
  }
  
}
