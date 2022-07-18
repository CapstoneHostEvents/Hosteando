import { Router } from "express";
import { CreateEventController } from "../../controllers/event/Event.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import isAdmUserMiddleware from "../../middlewares/isAdmUser.middleware";
import {
  handleEventError,
  validateEventCreate,
} from "../../middlewares/schemaValidationEvent.middleware";

export const eventRoutes = Router();

eventRoutes.post(
  "/",
  authMiddleware,
  isAdmUserMiddleware,
  validateEventCreate(handleEventError),
  CreateEventController.create
);
eventRoutes.get("/", authMiddleware, CreateEventController.read);
