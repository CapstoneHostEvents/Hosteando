import Router from "express";
import ZoneController from "../../controllers/zones/zone.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import isAdmUserMiddleware from "../../middlewares/isAdmUser.middleware";
import validateZoneCreate, {
  handleZoneError,
} from "../../middlewares/schemaValidationZone.middleware";

const zoneRoutes = Router();

const zoneController = new ZoneController();

zoneRoutes.post(
  "",
  authMiddleware,
  isAdmUserMiddleware,
  validateZoneCreate(handleZoneError),
  zoneController.store
);
zoneRoutes.get("", authMiddleware, zoneController.show);
zoneRoutes.get("/:zoneId", authMiddleware, zoneController.index);

export default zoneRoutes;
