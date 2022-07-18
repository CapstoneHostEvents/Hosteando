import { Ticket } from "../../entities/Tickets";
import { AppDataSource } from "../../data-source";

const ticketListService = async (): Promise<Ticket[]> => {
  const ticketRepository = AppDataSource.getRepository(Ticket);

  const ticketList = await ticketRepository
    .createQueryBuilder()
    .select('t.id, t.userId, t.zoneId, t.created_at')
    .from(Ticket, 't')
    .getRawMany()

  return ticketList;
}

export default ticketListService;