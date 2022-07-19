import { Router } from "express";
import TicketController from "../../controllers/ticket/ticket.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const ticketRouter = Router();
const ticketController = new TicketController();

ticketRouter.post("", authMiddleware, ticketController.store);
ticketRouter.get("", authMiddleware, ticketController.index);

export default ticketRouter;
