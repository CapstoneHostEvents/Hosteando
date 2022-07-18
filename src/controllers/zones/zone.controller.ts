import { Request, Response } from "express";
import CreateZoneService from "../../services/zones/CreateZone.services";
import ListZoneService from "../../services/zones/ListZone.services";
import RetrieveEventZoneService from "../../services/zones/RetrieveEventZone.services";
import RetrieveZoneService from "../../services/zones/RetrieveZone.services";

export default class ZoneController {
  async store(req: Request, res: Response) {
    const { name, price, total_tickets, eventId } = req.body;
    const userId = req.user.id;

    const createZoneService = new CreateZoneService();

    const zone = await createZoneService.execute({
      name,
      price,
      total_tickets,
      eventId,
      userId,
    });

    return res.status(201).json(zone);
  }

  async show(req: Request, res: Response) {
    const listZoneService = new ListZoneService();

    const zones = await listZoneService.execute();

    return res.status(200).json(zones);
  }

  async index(req: Request, res: Response) {
    const retrieveZoneService = new RetrieveZoneService();
    const zoneId = req.params.zoneId;

    const zone = await retrieveZoneService.execute(zoneId);

    return res.status(200).json(zone);
  }

  async indexEvent(req: Request, res: Response) {
    const retrieveEventZoneService = new RetrieveEventZoneService();
    const eventId = req.params.eventId;

    const zones = await retrieveEventZoneService.execute(eventId);

    return res.status(200).json(zones);
  }
}
