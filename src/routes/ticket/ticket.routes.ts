import { Router } from "express";
import TicketController from "../../controllers/ticket/ticket.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import { handleTicketError, validateTicketCreate } from "../../middlewares/schemaValidationTicket.middleware";

const ticketRouter = Router();
const ticketController = new TicketController();

ticketRouter.post("", 
  validateTicketCreate(handleTicketError), 
  authMiddleware, 
  ticketController.store);
  
ticketRouter.get("", authMiddleware, ticketController.index);
ticketRouter.get("/:id", authMiddleware, ticketController.show);
ticketRouter.delete("/:id", authMiddleware, ticketController.delete);

export default ticketRouter;
