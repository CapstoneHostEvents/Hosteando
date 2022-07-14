import { Router } from "express";
import TicketController from "../../controllers/Ticket/ticket.controller";

const ticketRouter = Router();
const ticketController = new TicketController();

ticketRouter.post('', ticketController.store);
ticketRouter.get('', ticketController.index);

export default ticketRouter;