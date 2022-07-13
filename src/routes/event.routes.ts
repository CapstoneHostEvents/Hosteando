import { Router } from "express"
import { CreateEventController } from "../controllers/Event.controller"

export const EventRoutes = Router()

EventRoutes.post("/", CreateEventController.create)
EventRoutes.get("/", CreateEventController.read)