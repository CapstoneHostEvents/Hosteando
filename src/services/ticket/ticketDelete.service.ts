import { AppDataSource } from "../../data-source"
import { Ticket } from "../../entities/Tickets"
import AppError from "../../errors/app-error";

const ticketDeleteService = async (id: string, userId_fromToken: string): Promise<void> => {
  const ticketRepository = AppDataSource.getRepository(Ticket);
  
  const [ ticket ] = await ticketRepository    
    .createQueryBuilder()
    .select(["Ticket.id, Ticket.user.id"])
    .where("Ticket.id = :ticket_id", {ticket_id: id})
    .getRawMany();
  
  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  if (ticket.userId != userId_fromToken){
    throw new AppError("Only the owner of ticket can delete it", 403)
  }
  
  await ticketRepository.delete(ticket.id);
}

export default ticketDeleteService;