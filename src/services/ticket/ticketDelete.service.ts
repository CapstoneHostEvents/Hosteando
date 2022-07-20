import { AppDataSource } from "../../data-source"
import { Ticket } from "../../entities/Tickets"
import { Zone } from "../../entities/Zone";
import AppError from "../../errors/app-error";

const ticketDeleteService = async (id: string, userId_fromToken: string): Promise<void> => {
  const ticketRepository = AppDataSource.getRepository(Ticket);
  const zoneRepository = AppDataSource.getRepository(Zone);
  
  const [ ticket ] = await ticketRepository    
    .createQueryBuilder()
    .select(["Ticket.id, Ticket.user, Ticket.zone"])
    .where("Ticket.id = :ticket_id", {ticket_id: id})
    .getRawMany();
    
    if (!ticket) {
      throw new AppError("Ticket not found", 404);
    }
    
    const zone = await zoneRepository
      .findOneBy({id:ticket.zoneId});

    if (zone?.event.user.id != userId_fromToken && ticket.userId != userId_fromToken){
      throw new AppError("Only the owner of ticket or owner of event can delete it", 403)
    }
  
  await ticketRepository.delete(ticket.id);
}

export default ticketDeleteService;
