import Router from "express";
import ZoneController from "../controllers/Zones/zone.controller";

const zoneRoutes = Router();

const zoneController = new ZoneController();

zoneRoutes.post("", zoneController.store);
/*userRoutes.get("", ListUsersController);
userRoutes.get("/:id", ListOneUserController);
userRoutes.patch("/:id", UpdateUserController);
userRoutes.delete("/:id", DeleteUserController);*/

export default zoneRoutes;
