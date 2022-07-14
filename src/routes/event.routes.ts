import { Router } from "express"
import { CreateEventController } from "../controllers/event/Event.controller"
import authMiddleware from "../middlewares/auth.middleware"
import { handleEventError, validateEventCreate } from "../middlewares/schemaValidationEvent.middleware"

export const EventRoutes = Router()

EventRoutes.post("/", authMiddleware, validateEventCreate(handleEventError), CreateEventController.create)
EventRoutes.get("/", CreateEventController.read)