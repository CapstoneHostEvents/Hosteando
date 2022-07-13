import { Request, Response } from "express";
import CreateZoneService from "../../services/Zones/zone.services";

/*export const ListUsersController = async (req: Request, res: Response) => {
  const users = await getListUsersService();
  return res.status(200).json(users);
};

export const ListOneUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await listOneUserService(id);
  return res.status(200).json(user);
};

export const DeleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  await DeleteUserService(id);
  return res.status(200).json({ message: "User deleted" });
};

export const UpdateUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const user = await UpdateUserService(id, body);
  return res.status(200).json({
    message: "User Updated",
    user: user,
  });
};*/

export default class ZoneController {
  async store(req: Request, res: Response) {
    const { name, price, total_tickets, eventId } = req.body;
    const createZoneService = new CreateZoneService();

    const zone = await createZoneService.execute({
      name,
      price,
      total_tickets,
      eventId,
    });

    console.log(zone);

    return res.status(201).json(zone);
  }
}
