import Router from "express";
import ZoneController from "../../controllers/Zones/zone.controller";

const zoneRoutes = Router();

const zoneController = new ZoneController();

zoneRoutes.post("", zoneController.store);
zoneRoutes.get("", zoneController.show);
zoneRoutes.get("/:zoneId", zoneController.index);
zoneRoutes.get("/event/:eventId", zoneController.indexEvent);

export default zoneRoutes;
