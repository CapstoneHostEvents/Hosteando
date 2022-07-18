import { Request, Response } from "express";
import CreateZoneService from "../../services/Zones/CreateZone.services";
import ListZoneService from "../../services/Zones/ListZone.services";
import RetrieveZoneService from "../../services/Zones/RetrieveZone.services";

export default class ZoneController {
  //Criando Zone
  async store(req: Request, res: Response) {
    const { name, price, total_tickets, eventId } = req.body;
    const userId = req.user.id;

    const zone = await CreateZoneService({
      name,
      price,
      total_tickets,
      eventId,
      userId,
    });

    return res.status(201).json(zone);
  }

  //Listando todos as Zones
  async index(req: Request, res: Response) {
    const zones = await ListZoneService();

    return res.status(200).json(zones);
  }

  //Listar Zone por Id
  async show(req: Request, res: Response) {
    const zoneId = req.params.zoneId;

    const zone = await RetrieveZoneService(zoneId);

    return res.status(200).json(zone);
  }
}
