import { Router } from "express"
import { CreateEventController } from "../controllers/Event.controller"
import { handleEventError, validateEventCreate } from "../middlewares/schemaValidationEvent.middleware"

export const EventRoutes = Router()

EventRoutes.post("/", validateEventCreate(handleEventError), CreateEventController.create)
EventRoutes.get("/", CreateEventController.read)