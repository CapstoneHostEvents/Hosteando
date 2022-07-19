import { Router } from "express";
import EventController from "../../controllers/event/event.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import isAdmUserMiddleware from "../../middlewares/isAdmUser.middleware";
import {
  handleEventError,
  validateEventCreate,
} from "../../middlewares/schemaValidationEvent.middleware";

const eventRoutes = Router();

const eventController = new EventController();

eventRoutes.post(
  "/",
  authMiddleware,
  isAdmUserMiddleware,
  validateEventCreate(handleEventError),
  eventController.create
);
eventRoutes.get("/", eventController.read);
eventRoutes.get(
  "/:id",
  authMiddleware,
  isAdmUserMiddleware,
  eventController.readOneEvent
);
eventRoutes.patch(
  "/:id",
  authMiddleware,
  isAdmUserMiddleware,
  eventController.update
);
eventRoutes.delete(
  "/:id",
  authMiddleware,
  isAdmUserMiddleware,
  eventController.delete
);

export default eventRoutes;
