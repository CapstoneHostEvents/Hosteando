import { Request, Response } from "express";
import userDeleteService from "../../services/user/userDelete.service";
import createZoneService from "../../services/zone/zoneCreate.services";
import zoneDeleteService from "../../services/zone/zoneDelete.service";
import listZoneService from "../../services/zone/zoneList.services";
import retrieveZoneService from "../../services/zone/zoneListIndex.services";
import zoneUpdateService from "../../services/zone/zoneUpdate.service";

export default class ZoneController {
  //Criando Zone
  async store(req: Request, res: Response) {
    const { name, price, total_tickets, eventId } = req.body;
    const userId = req.user.id;

    const zone = await createZoneService({
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
    const zones = await listZoneService();

    return res.status(200).json(zones);
  }

  //Listar Zone por Id
  async show(req: Request, res: Response) {
    const zoneId = req.params.zoneId;

    const zone = await retrieveZoneService(zoneId);

    return res.status(200).json(zone);
  }

  //Atualizar Zone por id
  async update(req: Request, res: Response) {
    const zoneId = req.params.zoneId;
    const { name, price, total_tickets, eventId } = req.body;

    const updateZone = await zoneUpdateService({
      name,
      price,
      total_tickets,
      eventId,
      zoneId,
    });
    return res.status(200).json({ message: "Zone updated!" });
  }

  //Deletando User
  async delete(req: Request, res: Response) {
    const zoneId = req.params.zoneId;

    const deleteUser = await zoneDeleteService(zoneId);
    return res.status(200).json({ message: "Zone deleted!" });
  }
}
