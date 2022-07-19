import { AppDataSource } from "../../data-source";
import { Ticket } from "../../entities/Tickets";

const ticketListIndexService = async (id: string): Promise<Ticket[]> =>{
  const ticketRepository = AppDataSource.getRepository(Ticket);

  const ticketList = await ticketRepository
    .createQueryBuilder()
    .select(["Ticket.id, Ticket.user.id, Ticket.zone.id, Ticket.created_at"])
    .where("Ticket.userId = :user_id", {user_id: id})
    .getRawMany();

  return ticketList;
}

export default ticketListIndexService;