import { Router } from "express"
import { CreateEventController } from "../controllers/event/Event.controller"
import authMiddleware from "../middlewares/auth.middleware"
import isAdmUserMiddleware from "../middlewares/isAdmUser.middleware"
import { handleEventError, validateEventCreate } from "../middlewares/schemaValidationEvent.middleware"

export const EventRoutes = Router()

EventRoutes.post("/", authMiddleware, isAdmUserMiddleware, validateEventCreate(handleEventError), CreateEventController.create)
EventRoutes.get("/", CreateEventController.read)
EventRoutes.get("/:id", authMiddleware, isAdmUserMiddleware, CreateEventController.readOneEvent)
EventRoutes.patch("/:id", authMiddleware, isAdmUserMiddleware, CreateEventController.update)
EventRoutes.delete("/:id", authMiddleware, isAdmUserMiddleware, CreateEventController.delete)